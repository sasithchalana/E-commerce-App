import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, CreditCard, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: 'var(--bg-surface)', 
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="grid-cols-4" style={{ marginBottom: '3rem' }}>
          
          <div>
            <h3 style={{ color: 'var(--gold-main)', fontSize: '1.5rem', marginBottom: '1rem' }}>LUXE</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Curated premium lifestyle products for the modern individual. Quality meets elegance.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Shop</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Home%20%26%20Living">Home & Living</Link></li>
              <li><Link to="/products?category=Sports%20%26%20Outdoors">Sports & Outdoors</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Shipping Policy</Link></li>
              <li><Link to="#">Returns & Refunds</Link></li>
              <li><Link to="#">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Newsletter</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, padding: '0.5rem' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Mail size={16} /></button>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '2rem', borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)', fontSize: '0.8rem'
        }}>
          <p>&copy; {new Date().getFullYear()} LUXE Premium Store. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <CreditCard size={20} />
            <Shield size={20} />
            <Truck size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
