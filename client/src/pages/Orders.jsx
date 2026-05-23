import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { api } from '../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#fbbf24';
      case 'processing': return '#60a5fa';
      case 'shipped': return '#a78bfa';
      case 'delivered': return 'var(--success)';
      default: return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Order History</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3].map(i => <div key={i} className="shimmer glass-card" style={{ height: '100px' }}></div>)}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container flex-center flex-column animate-fade-in" style={{ padding: '5rem 1.5rem', minHeight: '60vh', textAlign: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(212,165,116,0.1)', padding: '2rem', borderRadius: '50%', color: 'var(--gold-main)' }}>
          <Package size={64} />
        </div>
        <h2 style={{ fontSize: '2rem' }}>No orders yet</h2>
        <p style={{ color: 'var(--text-secondary)' }}>When you place orders, they will appear here.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Order History</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map(order => (
          <Link key={order.id} to={`/orders/${order.id}`} className="glass-card" style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            padding: '1.5rem', transition: 'all 0.3s ease', cursor: 'pointer'
          }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-main)'}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                <Package size={24} color="var(--gold-main)" />
              </div>
              
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Order #{order.id}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {formatDate(order.createdAt)} • {order.itemCount} items
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>${order.total.toFixed(2)}</div>
                <div style={{ 
                  fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase',
                  color: getStatusColor(order.status),
                  background: `${getStatusColor(order.status)}20`,
                  padding: '0.2rem 0.5rem', borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  {order.status}
                </div>
              </div>
              <ChevronRight color="var(--text-secondary)" />
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
