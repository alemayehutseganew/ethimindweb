import React, { useState } from 'react';
import './Products.css';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import { useCart } from '../Header/Cart/CartContext';
import ContactForm from '../Forms/ContactForm';

const Products = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const products = [
    {
      id: 1,
      name: "AI Infrastructure",
      description: "Building Ethiopia's backbone for AI innovation and research.",
      price: 9999,
      image: "ETHIOPIA • AI • FUTURE",
      features: ["AI", "HPC", "Machine Learning"],
      badge: "Hot Issue"
    },
    {
      id: 2,
      name: "Robotics and Automation",
      description: "Empowering industries with intelligent devices and systems.",
      price: 7500,
      image: "Devices & Robotics",
      features: ["Automation", "IOT", "Networking"],
    },
    {
      id: 3,
      name: "National Sectors",
      description: "Transforming agriculture, healthcare, and education with AI solutions.",
      price: 12000,
      image: "Empowering Sectors",
      features: ["AI Solutions", "Sector-specific", "Innovation"],
    },
  ];

  const handleContactUs = (product) => {
    setSelectedProduct(product);
    setShowContactForm(true);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: 'Technology'
    });
    alert(`${product.name} added to cart!`);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
    setSelectedProduct(null);
  };

  return (
    <section className="products">
      <div className="container">
        <div className="products-header">
          <h2 className="section-title">EthiMind Technology Ecosystem</h2>
          <p className="section-subtitle">
            Experience the next generation of automation and creation with unprecedented performance
          </p>
        </div>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <div className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                  {product.badge}
                </div>
              )}
              <div className="product-image">
                <div className="placeholder-image">{product.image}</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-features">
                  {product.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="product-price">${product.price.toLocaleString()}</div>
                <div className="product-actions">
                  <button className="btn" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => handleContactUs(product)}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="products-cta">
          <button 
            className="btn btn-secondary"
            onClick={() => window.location.href = '/checkout'}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm 
          product={selectedProduct}
          onClose={handleCloseContactForm}
        />
      )}
    </section>
  );
};

export default Products;