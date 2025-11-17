import React, { useEffect, useRef, useState } from 'react';
import './Tracking.css';
import { trackingAPI } from '../../services/api';

// Lightweight tracking component without map integration (map optional)
// - uses browser Geolocation to send pings to the backend
// - polls latest location for given delivery id

export default function Tracking({ deliveryId = null }) {
  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState(null);
  const watchIdRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    if (tracking) startWatching();
    return () => stopWatching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking]);

  const startWatching = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const coords = pos.coords;
        setPosition(coords);
        // send to backend
        if (deliveryId) {
          trackingAPI.sendPing({ delivery: deliveryId, latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy, speed: coords.speed, heading: coords.heading });
        }
      },
      (err) => {
        console.error('Geolocation error', err);
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    );

    // poll latest location for this delivery (if deliveryId provided)
    if (deliveryId) {
      // open a WebSocket to receive real-time updates if available
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const host = window.location.host;
        const wsUrl = `${protocol}://${host}/ws/tracking/deliveries/${deliveryId}/`;
        const ws = new WebSocket(wsUrl);
        ws.onopen = () => {
          console.debug('Tracking WS connected', wsUrl);
        };
        ws.onmessage = (ev) => {
          try {
            const payload = JSON.parse(ev.data);
            // message could be LocationPing or wrapper
            if (payload && payload.latitude && payload.longitude) {
              setPosition({ latitude: Number(payload.latitude), longitude: Number(payload.longitude), speed: payload.speed });
            }
          } catch (e) {
            console.error('Invalid WS message', e);
          }
        };
        ws.onerror = (err) => console.error('WS error', err);
        ws.onclose = () => console.debug('Tracking WS closed');
        pollRef.current = ws;
      } catch (e) {
        console.error('Failed to open tracking websocket', e);
      }
    }
  };

  const stopWatching = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (pollRef.current) {
      // if it's a WebSocket, close it
      try {
        if (pollRef.current instanceof WebSocket) {
          pollRef.current.close();
        } else {
          clearInterval(pollRef.current);
        }
      } catch (e) {}
      pollRef.current = null;
    }
  };

  const handleStart = () => setTracking(true);
  const handleStop = () => { setTracking(false); stopWatching(); };

  return (
    <div className="tracking-container">
      <div className="tracking-controls">
        <button className="btn-track" onClick={handleStart} disabled={tracking}>Start Tracking</button>
        <button className="btn-stop" onClick={handleStop} disabled={!tracking}>Stop</button>
        <div className="tracking-small">Delivery ID: {deliveryId || '—'}</div>
      </div>

      <div className="tracking-map" role="region" aria-label="Location preview">
        {position ? (
          <div>
            <div className="tracking-coords">Lat: {position.latitude.toFixed(6)}</div>
            <div className="tracking-coords">Lng: {position.longitude.toFixed(6)}</div>
            {position.speed != null && <div className="tracking-small">Speed: {position.speed}</div>}
          </div>
        ) : (
          <div className="tracking-small">No location yet — start tracking to send pings</div>
        )}
      </div>
    </div>
  );
}
