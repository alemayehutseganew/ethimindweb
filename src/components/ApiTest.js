import React, { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';

export default function ApiTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await productsAPI.getProducts();
      if (!mounted) return;
      if (res.error) {
        // res.error is now an object: { message, status, body }
        setError(res.error);
      } else {
        setData(res.data);
      }
      setLoading(false);
    };

    fetchData();
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>API Test — /api/products/</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error.message || 'Unknown error'}
          {error.status && <div>Status: {error.status}</div>}
          {error.body && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
              <summary>Response body (click to expand)</summary>
              <pre style={{ maxHeight: 300, overflow: 'auto', background: '#f6f6f6', padding: 10 }}>
                {typeof error.body === 'string' ? error.body : JSON.stringify(error.body, null, 2)}
              </pre>
            </details>
          )}
          <p>Ensure the backend is running and `REACT_APP_API_BASE_URL` (if set) points to it.</p>
        </div>
      )}
      {data && (
        <div>
          <p>Received {Array.isArray(data) ? data.length : Object.keys(data).length} items (truncated):</p>
          <pre style={{ maxHeight: 300, overflow: 'auto', background: '#f6f6f6', padding: 10 }}>
            {JSON.stringify(Array.isArray(data) ? data.slice(0, 5) : data, null, 2)}
          </pre>
        </div>
      )}
      {!loading && !error && !data && <p>No data returned.</p>}
    </div>
  );
}
