import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container flex-center flex-column animate-fade-in" style={{ padding: '5rem 1.5rem', minHeight: '70vh', textAlign: 'center', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--gold-main)', fontSize: '5rem', marginBottom: '0', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '2rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
