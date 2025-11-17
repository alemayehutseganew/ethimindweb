import React, { useState } from 'react';
import { useCart } from '../Header/Cart/CartContext';
import { ordersAPI } from '../../services/api';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import './OrderForm.css';

const OrderForm = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Ethiopia'
    },
    billingAddress: {
      sameAsShipping: true,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Ethiopia'
    },
    paymentMethod: 'bank_transfer',
    customerNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        shipping_address: formData.shippingAddress,
        billing_address: formData.billingAddress.sameAsShipping 
          ? formData.shippingAddress 
          : formData.billingAddress,
        payment_method: formData.paymentMethod,
        customer_notes: formData.customerNotes
      };

      const { data, error } = await ordersAPI.createOrder(orderData);
      
      if (error) {
        throw new Error(error);
      }

      setOrderStatus('success');
      setPaymentUrl(data?.payment_url || null);
      clearCart();
    } catch (error) {
      console.error('Order failed:', error);
      setOrderStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping for Ethiopia
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;

  if (orderStatus === 'success') {
    return (
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h2>{t('orderSuccess')}</h2>
        <p>{t('orderSuccessMessage')}</p>
        <div className="success-actions">
          <button className="btn" onClick={() => window.location.href = '/'}>
            {t('continueShopping')}
          </button>
          <button className="btn btn-outline" onClick={() => window.print()}>
            {t('printReceipt')}
          </button>
        </div>
        {paymentUrl && (
          <div className="payment-cta">
            <p>{t('paymentRedirectMessage')}</p>
            <a className="btn btn-primary" href={paymentUrl} target="_blank" rel="noreferrer">
              {t('completePayment')}
            </a>
          </div>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart-message">
        <h2>{t('cartEmpty')}</h2>
        <p>{t('addItemsToCheckout')}</p>
        <button className="btn" onClick={() => window.location.href = '/products'}>
          {t('shopNow')}
        </button>
      </div>
    );
  }

  return (
    <div className="order-form-container">
      <h1>{t('checkout')}</h1>
      
      <div className="order-layout">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>{t('orderSummary')}</h3>
          <div className="order-items">
            {items.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <div className="image-placeholder">
                    {item.name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price} x {item.quantity}</p>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>{t('subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>{t('shipping')}</span>
              <span>{shipping === 0 ? t('free') : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>{t('tax')} (15%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>{t('total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-section">
            <h3>{t('personalInformation')}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{t('email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('firstName')} *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('lastName')} *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="form-section">
            <h3>{t('shippingAddress')}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{t('streetAddress')} *</label>
                <input
                  type="text"
                  name="shippingAddress.street"
                  value={formData.shippingAddress.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('city')} *</label>
                <input
                  type="text"
                  name="shippingAddress.city"
                  value={formData.shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('state')} *</label>
                <input
                  type="text"
                  name="shippingAddress.state"
                  value={formData.shippingAddress.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('postalCode')} *</label>
                <input
                  type="text"
                  name="shippingAddress.postalCode"
                  value={formData.shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('country')} *</label>
                <select
                  name="shippingAddress.country"
                  value={formData.shippingAddress.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="form-section">
            <h3>{t('billingAddress')}</h3>
            <div className="form-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="billingAddress.sameAsShipping"
                  checked={formData.billingAddress.sameAsShipping}
                  onChange={handleInputChange}
                />
                {t('sameAsShipping')}
              </label>
            </div>

            {!formData.billingAddress.sameAsShipping && (
              <div className="billing-address-fields">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('streetAddress')} *</label>
                    <input
                      type="text"
                      name="billingAddress.street"
                      value={formData.billingAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('city')} *</label>
                    <input
                      type="text"
                      name="billingAddress.city"
                      value={formData.billingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('state')} *</label>
                    <input
                      type="text"
                      name="billingAddress.state"
                      value={formData.billingAddress.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('postalCode')} *</label>
                    <input
                      type="text"
                      name="billingAddress.postalCode"
                      value={formData.billingAddress.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('country')} *</label>
                    <select
                      name="billingAddress.country"
                      value={formData.billingAddress.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="form-section">
            <h3>{t('paymentMethod')}</h3>
            <div className="payment-methods">
              <div className="payment-option">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="tele_birr"
                    checked={formData.paymentMethod === 'tele_birr'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-name">TeleBirr</span>
                    <span className="payment-desc">{t('mobilePayment')}</span>
                  </div>
                </label>
              </div>
              
              <div className="payment-option">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cbe_birr"
                    checked={formData.paymentMethod === 'cbe_birr'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-name">CBE Birr</span>
                    <span className="payment-desc">{t('mobilePayment')}</span>
                  </div>
                </label>
              </div>
              
              <div className="payment-option">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-name">{t('bankTransfer')}</span>
                    <span className="payment-desc">{t('bankTransferDesc')}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-section">
            <h3>{t('additionalNotes')}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{t('orderNotes')}</label>
                <textarea
                  name="customerNotes"
                  value={formData.customerNotes}
                  onChange={handleInputChange}
                  placeholder={t('notesPlaceholder')}
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? t('processing') : `${t('placeOrder')} - $${total.toFixed(2)}`}
            </button>
          </div>

          {orderStatus === 'error' && (
            <div className="error-message">
              {t('orderError')}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;