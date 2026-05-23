import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogOut, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { itemCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '80px',
      background: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(212, 165, 116, 0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          style={{ display: 'none' }} // Add media query in CSS later if needed, simple inline for now
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: '700', color: '#d4a574', letterSpacing: '2px' }}>
          LUXE
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">Home</Link>
          <Link to="/products" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">Shop</Link>
        </div>

        {/* Icons */}
        <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button style={{ color: '#fff' }}><Search size={20} /></button>
          
          <Link to="/cart" style={{ position: 'relative', color: '#fff' }}>
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px', right: '-8px',
                background: '#d4a574', color: '#0a0a0f',
                fontSize: '0.7rem', fontWeight: 'bold',
                width: '18px', height: '18px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}
              >
                <User size={20} />
              </button>
              
              {isUserMenuOpen && (
                <div className="glass-card" style={{
                  position: 'absolute',
                  top: '100%', right: 0,
                  marginTop: '1rem',
                  minWidth: '200px',
                  padding: '0.5rem',
                  display: 'flex', flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
                    <p style={{ fontWeight: 600 }}>{user?.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email}</p>
                  </div>
                  <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}>
                    <Package size={16} /> Orders
                  </Link>
                  <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', width: '100%', textAlign: 'left', color: '#ef4444' }}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
