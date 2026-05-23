import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentSearch = searchParams.get('search') || '';
  
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await api.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (currentCategory) query.append('category', currentCategory);
        if (currentSort) query.append('sort', currentSort);
        if (currentSearch) query.append('search', currentSearch);
        
        const data = await api.getProducts(`?${query.toString()}`);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCategory, currentSort, currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) params.set('search', searchInput);
    else params.delete('search');
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === currentCategory) {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('sort', e.target.value);
    else params.delete('sort');
    setSearchParams(params);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        {currentCategory ? currentCategory : 'All Products'}
      </h1>

      <div style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '1rem', 
        justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '2rem', padding: '1.5rem',
        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
        borderRadius: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${!currentCategory ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleCategoryChange(currentCategory)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`btn ${currentCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleCategoryChange(cat)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ paddingRight: '2.5rem', width: '200px' }}
            />
            <button type="submit" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Search size={18} />
            </button>
          </form>

          <select value={currentSort} onChange={handleSortChange} style={{ width: 'auto', appearance: 'none', cursor: 'pointer' }}>
            <option value="">Default Sorting</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid-cols-4">
          {[...Array(8)].map((_, i) => <div key={i} className="glass-card shimmer" style={{ height: '350px' }}></div>)}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid-cols-4 animate-slide-up">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
