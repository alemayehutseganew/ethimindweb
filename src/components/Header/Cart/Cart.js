import React, { useRef, useEffect } from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const {
    items,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();

  const handleToggleCart = () => toggleCart(!isOpen);

  const paymentPartners = [
    {
      name: 'TeleBirr',
      tagline: 'Instant mobile wallet checkout',
      url: 'https://telebirr.com',
      color: '#0c6adb'
    },
    {
      name: 'CBE Birr',
      tagline: 'Trusted banking partner for enterprise flows',
      url: 'https://cbe.com.et/birr',
      color: '#0369a1'
    },
    {
      name: 'Ethimind Wallet',
      tagline: 'Future-proof virtual currency and escrow',
      url: 'https://payments.ethimind.africa',
      color: '#16a34a'
    }
  ];

  const cartRef = useRef(null);

  // Sample product data for demonstration
  const sampleProducts = [
    {
      id: 'vision-lab-pass',
      name: 'Vision Lab Access Pass',
      price: 499,
      tagline: 'Hands-on prototyping with Ethimind strategists',
      image: '/api/placeholder/80/80',
      category: 'Vision Studio',
      inStock: true
    },
    {
      id: 'infrastructure-blueprint',
      name: 'AI Infrastructure Blueprint',
      price: 1299,
      tagline: 'Blueprint your smart city or responsible factory launch',
      image: '/api/placeholder/80/80',
      category: 'Infrastructure',
      inStock: true
    },
    {
      id: 'community-accelerator',
      name: 'Community Accelerator',
      price: 799,
      tagline: 'Programs that amplify African talent and partners',
      image: '/api/placeholder/80/80',
      category: 'Community',
      inStock: true
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        toggleCart(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout! This would redirect to checkout page in a real application.');
    // In a real app: navigate('/checkout');
  };

  const handleAddSampleProduct = (product) => {
    // For demo purposes - add sample product to cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    };
    // This would typically be called from a product page component
    // For now, we'll simulate adding to cart
    alert(`Added ${product.name} to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();

  return (
    <div className="cart-container" ref={cartRef}>
      {/* Cart Toggle Button */}
      <button
        className={`cart-toggle ${isOpen ? 'is-active' : ''}`}
        onClick={handleToggleCart}
        aria-label={`Shopping cart with ${cartItemsCount} items`}
      >
        <span className="cart-icon">🛒</span>
        {cartItemsCount > 0 && (
          <span className="cart-count">{cartItemsCount}</span>
        )}
      </button>

      {/* Cart Dropdown */}
        {isOpen && (
        <div className="cart-dropdown">
          {/* Cart Header */}
          <div className="cart-header">
            <h3>Shopping Cart ({cartItemsCount})</h3>
            {items.length > 0 && (
              <button
                className="clear-cart-btn"
                onClick={clearCart}
                aria-label="Clear all items from cart"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cart Content */}
          <div className="cart-content">
            {items.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛠️</div>
                <h4>Your cart is empty</h4>
                <p>Gather Ethimind experiences—vision, infrastructure, and community partners—to start building impact.</p>
                <div className="demo-products">
                  <h5>Explore these Ethimind-ready experiences:</h5>
                  <div className="demo-product-list">
                    {sampleProducts.map(product => (
                      <div key={product.id} className="demo-product">
                        <div className="demo-product-info">
                          <strong>{product.name}</strong>
                          <span>{formatPrice(product.price)}</span>
                          <small className="demo-product-tagline">{product.tagline}</small>
                        </div>
                        <button
                          className="btn btn-small"
                          onClick={() => handleAddSampleProduct(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Cart Items
              <>
                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <div className="image-placeholder">
                          {item.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      </div>
                      
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-category">{item.category}</p>
                        <div className="item-price">{formatPrice(item.price)}</div>
                      </div>

                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => handleDecrement(item.id, item.quantity)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleIncrement(item.id, item.quantity)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="item-total">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item from cart"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Impact Subtotal:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Logistics &amp; Support:</span>
                    <span>{cartTotal > 0 ? 'Calculated as part of Ethimind design' : 'Included within partnership'}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Projected Investment:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Cart Actions */}
                <div className="cart-actions">
                  <button
                    className="btn checkout-btn"
                    onClick={handleCheckout}
                  >
                    Activate Ethimind Support
                  </button>
                  <button
                    className="btn btn-outline continue-shopping-btn"
                    onClick={() => toggleCart(false)}
                  >
                    Explore More Vision Pillars
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Trust Badges */}
          {items.length > 0 && (
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="badge-icon">🌍</span>
                <span>Mission-aligned delivery</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">🤝</span>
                <span>Local partner collaboration</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">💡</span>
                <span>Impact-driven assurance</span>
              </div>
            </div>
          )}
          {items.length > 0 && (
            <div className="cart-payment-integration">
              <p>Choose the Ethimind payment partner that suits you.</p>
              <div className="payment-partners">
                {paymentPartners.map(partner => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className="payment-partner"
                    style={{ borderColor: partner.color }}
                  >
                    <span className="partner-name" style={{ color: partner.color }}>
                      {partner.name}
                    </span>
                    <span className="partner-tagline">{partner.tagline}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {isOpen && <div className="cart-overlay" onClick={() => toggleCart(false)} aria-hidden="true" />}
    </div>
  );
};

export default Cart;