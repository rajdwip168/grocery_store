import React, { useState, useMemo } from 'react';
import { 
  Search, ShoppingCart, Filter, ChevronRight, Star, 
  MapPin, Percent, ShoppingBag, Plus, Minus, Trash2, 
  CheckCircle, ArrowLeft, ShieldCheck, Truck, RefreshCw 
} from 'lucide-react';

// ==========================================
// 1. FLIPKART STYLE REAL-TIME DATA ARCHETYPE
// ==========================================
const FLIPKART_OFFERS = [
  { id: 1, text: "🍉 Summer Grocery Bonanza: Up to 50% Off!", bg: "#0f52ba", color: "#fff" },
  { id: 2, text: "🪙 Use Flipkart SuperCoins to get extra ₹50 discount!", bg: "#2874f0", color: "#fff" },
  { id: 3, text: "💳 10% Instant Discount on SBI Credit Cards", bg: "#ffd814", color: "#111" }
];

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '🛒' },
  { id: 'staples', name: 'Ghee, Oil & Staples', icon: '🌾' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'snacks', name: 'Snacks & Beverages', icon: '🍪' },
  { id: 'packaged', name: 'Packaged Foods', icon: '🍜' },
  { id: 'household', name: 'Household Care', icon: '🧼' }
];

const MOCK_INVENTORY = [
  { id: 101, name: 'Aashirvaad Shudh Chakki Atta', pack: '5 kg', price: 255, originalPrice: 290, rating: 4.5, reviews: '12,450', category: 'staples', tags: ['Best Seller'], image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 102, name: 'Fortune Premium Kachi Ghani Mustard Oil', pack: '1 L', price: 168, originalPrice: 195, rating: 4.4, reviews: '8,920', category: 'staples', tags: ['Top Deal'], image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { id: 103, name: 'Amul Pasteurised Salted Butter', pack: '500 g', price: 275, originalPrice: 285, rating: 4.7, reviews: '24,110', category: 'dairy', tags: ['Trending'], image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { id: 104, name: 'Amul Taaza Fresh Toned Milk', pack: '1 L', price: 66, originalPrice: 68, rating: 4.3, reviews: '5,340', category: 'dairy', tags: [], image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { id: 105, name: 'Surf Excel Easy Wash Detergent Powder', pack: '1 kg', price: 140, originalPrice: 170, rating: 4.5, reviews: '16,700', category: 'household', tags: ['Value Pack'], image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400' },
  { id: 106, name: 'Maggi 2-Minute Masala Noodles', pack: '420 g', price: 92, originalPrice: 96, rating: 4.6, reviews: '42,000', category: 'packaged', tags: ['Super Deal'], image: 'https://images.unsplash.com/photo-1612966608997-30024d6903e1?w=400' },
  { id: 107, name: 'Tata Salt Iodized Vacuum Evaporated Salt', pack: '1 kg', price: 28, originalPrice: 30, rating: 4.8, reviews: '31,500', category: 'staples', tags: [], image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400' },
  { id: 108, name: 'Good Day Cashew Cookies Pack', pack: '600 g', price: 120, originalPrice: 150, rating: 4.2, reviews: '9,120', category: 'snacks', tags: ['Buy 1 Get 1'], image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' }
];

export default function ProductStore() {
  // Global States
  const [products] = useState(MOCK_INVENTORY);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState(500);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOffer, setActiveOffer] = useState(0);
  const [orderStep, setOrderStep] = useState('browsing'); // browsing -> checkout -> success
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', detail: '' });

  // Carousel Next Button Simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveOffer((prev) => (prev + 1) % FLIPKART_OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // 2. SEARCH & FILTERING ENGINE (DYNAMICS)
  // ==========================================
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceFilter;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceFilter]);

  // ==========================================
  // 3. CART ACTIONS & CORE LOGIC
  // ==========================================
  const handleAddToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Pricing Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalMarketPrice = cart.reduce((acc, item) => acc + (item.originalPrice * item.qty), 0);
  const totalSellingPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalDiscount = totalMarketPrice - totalSellingPrice;
  const deliveryCharges = totalSellingPrice > 500 || totalSellingPrice === 0 ? 0 : 40;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.pincode || !address.detail) {
      alert("Please fill up all address details format correctly!");
      return;
    }
    setOrderStep('success');
    setCart([]);
  };

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', fontFamily: 'Roboto, Arial, sans-serif', color: '#212121', paddingBottom: '5px' }}>
      
      {/* ==========================================
          HEADER: FLIPKART BLUE NAV SYSTEM
          ========================================== */}
      <header style={{ backgroundColor: '#2874f0', padding: '12px 10%', position: 'sticky', top: 0, zIndex: 1000, color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1240px', margin: '0 auto', gap: '20px' }}>
          
          {/* Logo Brand Title */}
          <div style={{ cursor: 'pointer' }} onClick={() => { setOrderStep('browsing'); setIsCartOpen(false); }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', italic: 'true', display: 'flex', alignItems: 'center', gap: '5px', letterSpacing: '0.5px' }}>
              Flipkart <span style={{ color: '#ffe500', fontStyle: 'italic', fontSize: '18px' }}>grocery</span>
            </h1>
            <div style={{ fontSize: '11px', color: '#f0f0f0', display: 'flex', alignItems: 'center', marginTop: '-2px' }}>
              Explore <span style={{ color: '#ffe500', fontWeight: 'bold', marginLeft: '3px' }}>Plus ✨</span>
            </div>
          </div>

          {/* Search Aggregator Engine */}
          <div style={{ flex: 1, maxWidth: '560px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 40px 10px 15px', border: 'none', borderRadius: '2px', fontSize: '14px', outline: 'none', color: '#212121', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)' }}
            />
            <Search style={{ position: 'absolute', right: '12px', color: '#2874f0', cursor: 'pointer' }} size={20} />
          </div>

          {/* Right Floating Actions Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
              <MapPin size={16} color="#ffe500" />
              <span>Deliver to <strong style={{ borderBottom: '1px dashed' }}>Berhampore</strong></span>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              style={{ background: '#fff', color: '#2874f0', border: '1px solid #dbdbdb', padding: '7px 25px', borderRadius: '2px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {totalItemsCount > 0 && (
                <span style={{ backgroundColor: '#ff4343', color: '#fff', borderRadius: '50%', padding: '2px 7px', fontSize: '11px', marginLeft: '2px' }}>{totalItemsCount}</span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ==========================================
          DYNAMIC BANNER SLIDER SYSTEM
          ========================================== */}
      {orderStep === 'browsing' && (
        <div style={{ background: FLIPKART_OFFERS[activeOffer].bg, color: FLIPKART_OFFERS[activeOffer].color, textAlign: 'center', padding: '10px 5%', fontSize: '14px', fontWeight: '500', transition: 'all 0.5s ease-in-out', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.1)' }}>
          <Percent size={16} />
          <span>{FLIPKART_OFFERS[activeOffer].text}</span>
        </div>
      )}

      {/* ==========================================
          MAIN AREA LAYOUT SWITCHER
          ========================================== */}
      <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 15px' }}>
        
        {orderStep === 'browsing' && (
          <>
            {/* 4. SUPERMARKET TOP SUB-CATEGORIES BAR */}
            <div style={{ display: 'flex', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '4px', gap: '12px', overflowX: 'auto', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: selectedCategory === cat.id ? '#f2f7ff' : '#f9f9f9', border: selectedCategory === cat.id ? '1px solid #2874f0' : '1px solid #e0e0e0', borderRadius: '25px', color: selectedCategory === cat.id ? '#2874f0' : '#444', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whitespace: 'nowrap', transition: 'all 0.2s' }}
                >
                  <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* 5. SIDEBAR CONTROLS & DUAL CORE FILTERS */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              
              {/* Left Filters Panel */}
              <aside style={{ width: '280px', backgroundColor: '#fff', borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: '80px' }}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Filter size={16}/> Filters</h3>
                  { (selectedCategory !== 'all' || searchQuery !== '' || priceFilter !== 500) && (
                    <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setPriceFilter(500); }} style={{ background: 'none', border: 'none', color: '#2874f0', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>CLEAR ALL</button>
                  )}
                </div>

                {/* Price Budget Slider Filter */}
                <div style={{ padding: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#212121', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Price Budget Range</h4>
                  <input 
                    type="range" 
                    min="20" 
                    max="500" 
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#2874f0', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px', color: '#878787' }}>
                    <span>Min: ₹20</span>
                    <span>Max: <strong style={{ color: '#212121' }}>₹{priceFilter}</strong></span>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div style={{ padding: '20px', backgroundColor: '#fcfcfc', borderTop: '1px solid #f0f0f0', fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#388e3c"/> <span>100% Original Assurance</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16} color="#388e3c"/> <span>Lightning Local Slot Delivery</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><RefreshCw size={16} color="#388e3c"/> <span>Easy No-Questions Returns</span></div>
                </div>
              </aside>

              {/* 6. PRODUCT GRID SECTION */}
              <section style={{ flex: 1 }}>
                <div style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '15px' }}>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Top Supermarket Essential Values'} 
                    <span style={{ fontSize: '13px', color: '#878787', marginLeft: '10px' }}>({filteredProducts.length} items found)</span>
                  </h2>
                </div>

                {/* Responsive Grid Map */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                  {filteredProducts.map(product => {
                    const cartItem = cart.find(item => item.id === product.id);
                    return (
                      <div key={product.id} style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '4px', padding: '15px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}>
                        
                        {/* Dynamic Floating Tag Label */}
                        {product.tags.length > 0 && (
                          <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#388e3c', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '2px', zIndex: 5 }}>
                            {product.tags[0]}
                          </span>
                        )}

                        <div>
                          {/* Image Wrapper */}
                          <div style={{ width: '100%', height: '150px', textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                          </div>

                          {/* Info Segment */}
                          <h4 style={{ margin: '5px 0', fontSize: '14px', fontWeight: '500', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{product.name}</h4>
                          <div style={{ color: '#878787', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>{product.pack}</div>
                          
                          {/* Rating Row badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                            <span style={{ backgroundColor: '#388e3c', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              {product.rating} <Star size={10} fill="#fff"/>
                            </span>
                            <span style={{ color: '#878787', fontSize: '11px' }}>({product.reviews})</span>
                          </div>
                        </div>

                        {/* Pricing and Action Control Block */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#212121' }}>₹{product.price}</span>
                            <span style={{ fontSize: '13px', color: '#878787', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                            <span style={{ fontSize: '12px', color: '#388e3c', fontWeight: 'bold' }}>
                              {Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}% off
                            </span>
                          </div>

                          {/* Advanced Dynamic Cart Button Toggle Component */}
                          {cartItem ? (
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2874f0', borderRadius: '2px', width: '100%', height: '35px', boxSizing: 'border-box' }}>
                              <button onClick={() => updateQty(product.id, -1)} style={{ flex: 1, height: '100%', background: '#fff', border: 'none', color: '#2874f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14}/></button>
                              <span style={{ flex: 1, textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#2874f0' }}>{cartItem.qty}</span>
                              <button onClick={() => updateQty(product.id, 1)} style={{ flex: 1, height: '100%', background: '#fff', border: 'none', color: '#2874f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14}/></button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleAddToCart(product)}
                              style={{ width: '100%', height: '35px', backgroundColor: '#fff', color: '#2874f0', border: '1px solid #e0e0e0', fontWeight: 'bold', fontSize: '13px', borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'all 0.1s' }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2874f0'; e.currentTarget.style.backgroundColor = '#f2f7ff'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.backgroundColor = '#fff'; }}
                            >
                              <Plus size={14} /> ADD TO CART
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

                {filteredProducts.length === 0 && (
                  <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '4px', textAlign: 'center', color: '#666', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <ShoppingBag size={48} style={{ color: '#ccc', marginBottom: '15px' }} />
                    <h3>No products match your specific pricing filter requirements.</h3>
                    <p style={{ fontSize: '14px', color: '#878787' }}>Try expanding the slider or resetting selected parameters above.</p>
                  </div>
                )}
              </section>

            </div>
          </>
        )}

        {/* ==========================================
            7. MULTI-STEP CHECKOUT FORM MANAGEMENT
            ========================================== */}
        {orderStep === 'checkout' && (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '10px' }}>
            
            {/* Left Box: Form Entry fields */}
            <div style={{ flex: 2, backgroundColor: '#fff', borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ backgroundColor: '#2874f0', color: '#fff', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '3px 3px 0 0' }}>
                <button onClick={() => setOrderStep('browsing')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><ArrowLeft size={20}/></button>
                <h3 style={{ margin: 0, fontSize: '16px', textTransform: 'uppercase' }}>Delivery Address Configuration</h3>
              </div>
              
              <form onSubmit={handlePlaceOrder} style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#878787', marginBottom: '6px', fontWeight: '500' }}>Customer Full Name</label>
                    <input required type="text" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #c2c2c2', borderRadius: '2px', outline: 'none' }} placeholder="e.g. Rajdip Pramanick" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#878787', marginBottom: '6px', fontWeight: '500' }}>10-Digit Mobile Number</label>
                    <input required type="tel" pattern="[0-9]{10}" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #c2c2c2', borderRadius: '2px', outline: 'none' }} placeholder="e.g. 9876543210" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#878787', marginBottom: '6px', fontWeight: '500' }}>Delivery Area Pincode</label>
                  <input required type="text" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} style={{ width: '30%', padding: '10px', border: '1px solid #c2c2c2', borderRadius: '2px', outline: 'none' }} placeholder="742101" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#878787', marginBottom: '6px', fontWeight: '500' }}>Complete Street Address, Flat/House No.</label>
                  <textarea required rows="4" value={address.detail} onChange={(e) => setAddress({...address, detail: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #c2c2c2', borderRadius: '2px', outline: 'none', resize: 'none' }} placeholder="Enter complete home locality details for swift verification..."></textarea>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" style={{ backgroundColor: '#fb641b', color: '#fff', border: 'none', padding: '12px 40px', fontSize: '15px', fontWeight: 'bold', borderRadius: '2px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>CONFIRM & ORDER VIA COD</button>
                </div>
              </form>
            </div>

            {/* Right Box: Dynamic Bill Overview Summary */}
            <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: '80px' }}>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', color: '#878787', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Price Details Block</div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Price ({totalItemsCount} items)</span><span>Price: ₹{totalMarketPrice}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Discount Bundle Reduction</span><span style={{ color: '#388e3c' }}>- ₹{totalDiscount}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery Charges Line</span><span>{deliveryCharges === 0 ? <strong style={{ color: '#388e3c' }}>FREE</strong> : `₹${deliveryCharges}`}</span></div>
                <hr style={{ border: 'none', borderTop: '1px dashed #e0e0e0', margin: '5px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}><span>Total Amount Payable</span><span>₹{totalSellingPrice + deliveryCharges}</span></div>
                <div style={{ color: '#388e3c', fontSize: '13px', fontWeight: '500', backgroundColor: '#f5fafd', padding: '10px', borderRadius: '4px', textAlign: 'center', marginTop: '10px', border: '1px dashed #bce0fd' }}>You will save ₹{totalDiscount} on this dynamic order pipeline!</div>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            8. TRANSACTION COMPLETE SUCCESS SCREEN
            ========================================== */}
        {orderStep === 'success' && (
          <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '4px', textAlign: 'center', maxWidth: '600px', margin: '40px auto', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <CheckCircle size={72} color="#388e3c" style={{ marginBottom: '20px', display: 'inline-block' }} />
            <h2 style={{ margin: '0 0 10px 0', color: '#212121', fontSize: '26px' }}>Order Placed Successfully!</h2>
            <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>Thank you for shopping at our digital grocery! Your pipeline order has been registered via Cash on Delivery (COD). Our local delivery agent will contact you shortly.</p>
            
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', margin: '25px 0', textAlign: 'left', fontSize: '13px', color: '#555' }}>
              <strong>Delivery Destination:</strong> {address.name} ({address.phone}), {address.detail}, PIN - {address.pincode}
            </div>

            <button 
              onClick={() => setOrderStep('browsing')} 
              style={{ backgroundColor: '#2874f0', color: '#fff', border: 'none', padding: '12px 30px', fontSize: '14px', fontWeight: 'bold', borderRadius: '2px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}

      </div>

      {/* ==========================================
          9. FLIPKART STYLE SLIDE-IN CART DRAWER SYSTEM
          ========================================== */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh', backgroundColor: '#fff', zIndex: 5000, boxShadow: '-5px 0 15px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease-out' }}>
          
          {/* Drawer Header */}
          <div style={{ padding: '20px', backgroundColor: '#2874f0', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><ShoppingCart size={18}/> My Shopping Cart ({totalItemsCount})</h3>
            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
          </div>

          {/* Drawer Items Loop List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '100px', color: '#878787' }}>
                <ShoppingBag size={48} style={{ color: '#ccc', marginBottom: '10px' }} />
                <p style={{ fontSize: '14px' }}>Your cart is feeling dynamic-ly light!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '500' }}>{item.name}</h5>
                      <div style={{ fontSize: '11px', color: '#878787', marginBottom: '5px' }}>Pack Size: {item.pack}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Useful: ₹{item.price}</span>
                        <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#878787' }}>₹{item.originalPrice}</span>
                      </div>
                    </div>
                    {/* Increments Box control */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dbdbdb', borderRadius: '2px', height: '26px' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ width: '24px', background: '#fff', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ padding: '0 8px', fontSize: '12px', fontWeight: 'bold' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ width: '24px', background: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ff4343', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px' }}><Trash2 size={12}/> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Sticky Footer Checkout Pipeline button */}
          {cart.length > 0 && (
            <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fcfcfc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px' }}>
                <span>Subtotal Amount:</span>
                <strong style={{ fontSize: '18px', color: '#212121' }}>₹{totalSellingPrice}</strong>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setOrderStep('checkout'); }}
                style={{ width: '100%', backgroundColor: '#fb641b', color: '#fff', border: 'none', padding: '12px', fontSize: '15px', fontWeight: 'bold', borderRadius: '2px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}
              >
                PROCEED TO CHECKOUT (COD)
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}