import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.getProducts('?sort=rating');
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="animate-slide-up" style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #d4a574)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Discover Premium Lifestyle
          </h1>
          <p className="animate-slide-up" style={{ 
            fontSize: '1.2rem', color: 'var(--text-secondary)', 
            maxWidth: '600px', margin: '0 auto 2rem auto',
            animationDelay: '0.2s', animationFillMode: 'both'
          }}>
            Elevate your everyday with our curated collection of luxury products, designed for those who appreciate the finer things.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Shop Collection
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(212,165,116,0.1)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(212,165,116,0.05)', filter: 'blur(120px)', borderRadius: '50%' }}></div>
      </section>

      {/* Featured Categories */}
      <section className="container" style={{ padding: '5rem 1.5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Shop by Category</h2>
        <div className="grid-cols-4">
          {['Electronics', 'Fashion', 'Home & Living', 'Sports & Outdoors'].map((cat, i) => (
            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="glass-card" style={{ 
              textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '150px'
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--gold-main)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-main)' }}>{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '0 1.5rem 5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Top Rated</h2>
          <Link to="/products" className="btn btn-ghost" style={{ borderBottom: '1px solid var(--gold-main)', borderRadius: 0, padding: '0 0 0.2rem 0' }}>View All</Link>
        </div>
        
        {loading ? (
          <div className="grid-cols-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="glass-card shimmer" style={{ height: '350px' }}></div>)}
          </div>
        ) : (
          <div className="grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Value Props */}
      <section style={{ background: 'var(--bg-surface)', padding: '5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container grid-cols-4">
          {[
            { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On orders over $100' },
            { icon: <Shield size={32} />, title: 'Secure Payment', desc: '100% secure checkout' },
            { icon: <Heart size={32} />, title: 'Premium Quality', desc: 'Curated luxury items' },
            { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Dedicated support team' }
          ].map((prop, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ color: 'var(--gold-main)', background: 'rgba(212,165,116,0.1)', padding: '1rem', borderRadius: '50%' }}>
                {prop.icon}
              </div>
              <h4 style={{ fontSize: '1.1rem' }}>{prop.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
