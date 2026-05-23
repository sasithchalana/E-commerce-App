import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        fill={i < Math.floor(rating) ? 'var(--gold-main)' : 'transparent'} 
        color={i < Math.floor(rating) ? 'var(--gold-main)' : 'var(--text-secondary)'} 
      />
    ));
  };

  return (
    <div className="glass-card product-card" style={{ 
      padding: 0, overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', height: '100%',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
       onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      
      <Link to={`/products/${product.id}`} style={{ display: 'block', height: '200px', overflow: 'hidden', background: '#fff' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </Link>

      <span style={{
        position: 'absolute', top: '10px', left: '10px',
        background: 'rgba(10, 10, 15, 0.8)', backdropFilter: 'blur(4px)',
        color: '#fff', fontSize: '0.7rem', fontWeight: 600,
        padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase'
      }}>
        {product.category}
      </span>

      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/products/${product.id}`}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'Inter' }}>
            {product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}
          </h3>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex' }}>{renderStars(product.rating)}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({product.reviewsCount})</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--gold-main)', fontSize: '1.2rem', fontWeight: 600 }}>
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, 1);
            }}
            className="btn btn-outline"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
