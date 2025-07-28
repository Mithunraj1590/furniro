import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './checkoutForm.module.scss';

const CheckoutForm = () => {
  const { items: cartItems, total } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    city: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('direct-transfer');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const calculateTotal = () => {
    const subtotal = total;
    const tax = subtotal * 0.1;
    return subtotal + tax;
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className="container">
        <div className={styles.checkoutContent}>
          {/* Billing Details Form */}
          <div className={styles.billingForm}>
            <h2 className={styles.formTitle}>Billing details</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name (Optional)</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country">Country / Region *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="streetAddress">Street address *</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="House number and street name"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">Town / City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="province">Province *</label>
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="North Western Province">North Western Province</option>
                    <option value="North Central Province">North Central Province</option>
                    <option value="Uva Province">Uva Province</option>
                    <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode">ZIP code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="additionalInfo">Additional information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </div>
            </form>
          </div>

          {/* Order Summary and Payment */}
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Your order</h3>
            
            <div className={styles.productList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.productItem}>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{item.name}</span>
                    <span className={styles.productQuantity}>x {item.quantity}</span>
                  </div>
                  <span className={styles.productPrice}>
                    Rs. {(item.price * item.quantity).toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString()}.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>Rs. {(total * 0.1).toLocaleString()}.00</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>Rs. {calculateTotal().toLocaleString()}.00</span>
              </div>
            </div>

            <div className={styles.paymentMethods}>
              <h4>Payment</h4>
              
              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="direct-transfer"
                  name="paymentMethod"
                  value="direct-transfer"
                  checked={paymentMethod === 'direct-transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="direct-transfer">
                  <span className={styles.paymentTitle}>Direct Bank Transfer</span>
                  <p className={styles.paymentDescription}>
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </label>
              </div>

              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="direct-transfer-2"
                  name="paymentMethod"
                  value="direct-transfer-2"
                  checked={paymentMethod === 'direct-transfer-2'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="direct-transfer-2">
                  <span className={styles.paymentTitle}>Direct Bank Transfer</span>
                </label>
              </div>

              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="cash-delivery"
                  name="paymentMethod"
                  value="cash-delivery"
                  checked={paymentMethod === 'cash-delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash-delivery">
                  <span className={styles.paymentTitle}>Cash On Delivery</span>
                </label>
              </div>
            </div>

            <div className={styles.privacyNotice}>
              <p>
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <a href="/privacy-policy" className={styles.privacyLink}>privacy policy.</a>
              </p>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-lg w-100 ${styles.placeOrderBtn}`}
              onClick={handleSubmit}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 