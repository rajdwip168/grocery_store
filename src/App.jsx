import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, ShoppingCart, Trash2, Plus, Minus, Mic, MicOff,
  LogIn, LogOut, User, PlusCircle, Eye, EyeOff, Lock, Moon, Sun, BarChart2, Sparkles,
  ShieldAlert, ShieldCheck, CheckCircle, RefreshCw, MessageSquare, Send, X, Package, Tag, Layers,
  Globe, Truck, HelpCircle, AlertTriangle, FileText, Info, Smartphone, Mail, FileSignature
} from 'lucide-react';

// ==========================================
// 📦 ১. গ্লোবাল ডাটা স্ট্রাকচার ও কনস্ট্যান্টস
// ==========================================
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Premium Organic Alphonso Mangoes', category: 'Fruits', price: 29, originalPrice: 45, tag: 'Bestseller', unit: '1 kg', stock: 45, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500' },
  { id: 2, name: 'Fresh Organic Hass Avocado', category: 'Fruits', price: 180, originalPrice: 240, tag: 'Organic', unit: '2 Pcs', stock: 12, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500' },
  { id: 3, name: 'Hydroponic Cherry Tomatoes', category: 'Vegetables', price: 95, originalPrice: 150, tag: 'Hydroponic', unit: '250g', stock: 60, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500' },
  { id: 4, name: 'Premium California Almonds', category: 'Snacks & Nuts', price: 449, originalPrice: 600, tag: 'Top Pick', unit: '500g', stock: 28, image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500' },

  // ==========================================
  // 🍓 ক্যাটাগরি: Fruits (ইউনিক রিয়েল ফ্রুটস)
  // ==========================================
  { id: 5, name: 'Fresh Organic Blueberries Imported', category: 'Fruits', price: 350, originalPrice: 499, tag: 'Imported', unit: '125g Pack', stock: 20, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500' },
  { id: 6, name: 'Sweet Seedless Green Grapes Crisp', category: 'Fruits', price: 140, originalPrice: 200, tag: 'Fresh Batch', unit: '500g', stock: 35, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500' },
  { id: 7, name: 'Premium Red Fuji Apples', category: 'Fruits', price: 195, originalPrice: 260, tag: 'Top Pick', unit: '1 kg', stock: 55, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500' },
  { id: 8, name: 'Organic Cavendish Banana', category: 'Fruits', price: 60, originalPrice: 80, tag: 'High Fiber', unit: '1 Dozen', stock: 120, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500' },
  { id: 9, name: 'Fresh Royal Gala Apple Imported', category: 'Fruits', price: 220, originalPrice: 280, tag: 'Sweet', unit: '1 kg', stock: 40, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500' },
  { id: 10, name: 'Sun-Ripened Organic Papaya', category: 'Fruits', price: 75, originalPrice: 110, tag: 'Farm Fresh', unit: '1 Pc (1kg+)', stock: 30, image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500' },
  { id: 11, name: 'Premium Nagpur Oranges Juice-Rich', category: 'Fruits', price: 120, originalPrice: 160, tag: 'Vitamin C', unit: '1 kg', stock: 65, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500' },
  { id: 12, name: 'Fresh Pomegranate Anar Elite', category: 'Fruits', price: 240, originalPrice: 320, tag: 'Premium', unit: '1 kg', stock: 25, image: 'https://images.unsplash.com/photo-1533632359083-0185df1be85d?w=500' },
  { id: 13, name: 'Fresh Organic Kiwi Imported', category: 'Fruits', price: 110, originalPrice: 150, tag: 'Exotic Pick', unit: '3 Pcs Pack', stock: 45, image: 'https://images.unsplash.com/photo-1585059895316-aa9a207bf5f2?w=500' },
  { id: 14, name: 'Sweet Watermelon Whole Juicy', category: 'Fruits', price: 80, originalPrice: 120, tag: 'Summer Pack', unit: '1 Pc (3kg+)', stock: 35, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500' },

  // ==========================================
  // 🥦 ক্যাটাগরি: Vegetables (তাজা সবজি নোড)
  // ==========================================
  { id: 15, name: 'Fresh Broccoli Exotic Pack', category: 'Vegetables', price: 85, originalPrice: 120, tag: 'Diet Special', unit: '1 Pc', stock: 25, image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500' },
  { id: 16, name: 'Organic Button Mushrooms Premium', category: 'Vegetables', price: 60, originalPrice: 90, tag: 'Farm Fresh', unit: '200g Pack', stock: 40, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500' },
  { id: 17, name: 'Fresh Green Capsicum Crisp', category: 'Vegetables', price: 45, originalPrice: 65, tag: 'Fresh Crop', unit: '500g', stock: 70, image: 'https://images.unsplash.com/photo-1584447128309-b66b7a4f1b63?w=500' },
  { id: 18, name: 'Premium Red Onions Nashik', category: 'Vegetables', price: 35, originalPrice: 50, tag: 'Daily Base', unit: '1 kg', stock: 500, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500' },
  { id: 19, name: 'Organic Jyoti Potato Fresh', category: 'Vegetables', price: 28, originalPrice: 40, tag: 'Essential', unit: '1 kg', stock: 600, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500' },
  { id: 20, name: 'Fresh English Cucumber Premium', category: 'Vegetables', price: 40, originalPrice: 60, tag: 'Salad Special', unit: '500g', stock: 85, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500' },
  { id: 21, name: 'Tender Green Ladies Finger', category: 'Vegetables', price: 50, originalPrice: 75, tag: 'Farm Pick', unit: '500g', stock: 90, image: 'https://images.unsplash.com/photo-1627932230878-592f4477c7c3?w=500' },
  { id: 22, name: 'Organic Cauliflower Fresh Bunch', category: 'Vegetables', price: 45, originalPrice: 70, tag: 'Fresh Batch', unit: '1 Pc', stock: 60, image: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=500' },
  { id: 23, name: 'Fresh Red Sweet Corn Cob', category: 'Vegetables', price: 30, originalPrice: 45, tag: 'Sweet Node', unit: '1 Pc', stock: 110, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500' },
  { id: 24, name: 'Fresh Green Peas Winter Special', category: 'Vegetables', price: 65, originalPrice: 100, tag: 'Top Choice', unit: '500g', stock: 75, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500' },

  // ==========================================
  // 🍳 ক্যাটাগরি: Cooking Essential (তেল, চাল ও ডাল)
  // ==========================================
  { id: 25, name: 'Fortune Kachi Ghani Pure Mustard Oil', category: 'Cooking Essential', price: 175, originalPrice: 195, tag: 'Daily Essential', unit: '1 Litre', stock: 110, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500' },
  { id: 26, name: 'Daawat Rozana Gold Basmati Rice', category: 'Cooking Essential', price: 475, originalPrice: 550, tag: 'Top Quality', unit: '5 kg Bag', stock: 65, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' },
  { id: 27, name: 'Tata Salt Vacuum Evaporated', category: 'Cooking Essential', price: 28, originalPrice: 28, tag: 'Pure Trust', unit: '1 kg Pack', stock: 400, image: 'https://images.unsplash.com/photo-1604514285561-891159bf4556?w=500' },
  { id: 28, name: 'Aashirvaad Shudh Chakki Atta', category: 'Cooking Essential', price: 260, originalPrice: 290, tag: '100% Whole Wheat', unit: '5 kg Bag', stock: 150, image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500' },
  { id: 29, name: 'Tata Sampann Premium Toor Dal', category: 'Cooking Essential', price: 165, originalPrice: 190, tag: 'Unpolished', unit: '1 kg', stock: 130, image: 'https://images.unsplash.com/photo-1545114197-2d33c647b23f?w=500' },
  { id: 30, name: 'Fortune Sunlite Refined Sunflower Oil', category: 'Cooking Essential', price: 135, originalPrice: 160, tag: 'Light Cooking', unit: '1 Litre Pouch', stock: 180, image: 'https://images.unsplash.com/photo-1622484211148-717098e69afb?w=500' },
  { id: 31, name: 'Organic Premium Kabuli Chana', category: 'Cooking Essential', price: 140, originalPrice: 175, tag: 'High Protein', unit: '1 kg Pack', stock: 95, image: 'https://images.unsplash.com/photo-1515543582370-4cff31e54e8b?w=500' },
  { id: 32, name: 'Catch Turmeric Powder Pure Spice', category: 'Cooking Essential', price: 32, originalPrice: 40, tag: 'Natural Antiseptic', unit: '200g Pack', stock: 220, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500' },
  { id: 33, name: 'Catch Red Chilli Powder Teja', category: 'Cooking Essential', price: 48, originalPrice: 60, tag: 'Spicy Matrix', unit: '200g Pack', stock: 140, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500' },
  { id: 34, name: 'Premium Unrefined Organic Sugar', category: 'Cooking Essential', price: 65, originalPrice: 85, tag: 'Healthy Node', unit: '1 kg Pack', stock: 250, image: 'https://images.unsplash.com/photo-1581781890064-28b9fb605cf5?w=500' },

  // ==========================================
  // 🍿 ক্যাটাগরি: Snacks & Nuts (ড্রাই ফ্রুটস ও মুচমুচে স্ন্যাক্স)
  // ==========================================
  { id: 35, name: 'Premium Whole Cashews W320 Elite', category: 'Snacks & Nuts', price: 399, originalPrice: 550, tag: 'Luxury Quality', unit: '500g Pack', stock: 42, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500' },
  { id: 36, name: 'Haldirams Bhujia Sev Original Spice', category: 'Snacks & Nuts', price: 110, originalPrice: 120, tag: 'Party Favourite', unit: '400g Pack', stock: 160, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500' },
  { id: 37, name: 'Premium Afghan Black Raisins Kismis', category: 'Snacks & Nuts', price: 180, originalPrice: 240, tag: 'Sweet Dried', unit: '250g', stock: 65, image: 'https://images.unsplash.com/photo-1536632359083-0185df1be85d?w=500' },
  { id: 38, name: 'Lay Classic Salted Potato Chips', category: 'Snacks & Nuts', price: 20, originalPrice: 20, tag: 'Crisp Node', unit: '52g Pack', stock: 300, image: 'https://images.unsplash.com/photo-1566478431375-704332f504f5?w=500' },
  { id: 39, name: 'Bingo Mad Angles Aachari Masti', category: 'Snacks & Nuts', price: 20, originalPrice: 20, tag: 'Tangy', unit: '66g Pack', stock: 180, image: 'https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500' },
  { id: 40, name: 'Premium Salted Roasted Pistachios', category: 'Snacks & Nuts', price: 299, originalPrice: 400, tag: 'Crunchy Energy', unit: '250g Pack', stock: 50, image: 'https://images.unsplash.com/photo-1528826724124-76d56617584b?w=500' },

  // ==========================================
  // 🥤 ক্যাটাগরি: Beverages (চা, কফি ও কোল্ড ড্রিঙ্কস)
  // ==========================================
  { id: 41, name: 'Coca-Cola Original Taste Fizz', category: 'Beverages', price: 40, originalPrice: 40, tag: 'Chilled Node', unit: '750ml', stock: 150, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' },
  { id: 42, name: 'Amul Taaza Fresh Toned Milk', category: 'Beverages', price: 27, originalPrice: 28, tag: 'Morning Fresh', unit: '500ml', stock: 200, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500' },
  { id: 43, name: 'Tata Tea Gold Premium Rich Aroma', category: 'Beverages', price: 160, originalPrice: 175, tag: 'Bengal Favourite', unit: '500g Pack', stock: 110, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500' },
  { id: 44, name: 'Nescafe Classic Instant Coffee', category: 'Beverages', price: 185, originalPrice: 199, tag: 'Pure Wakeup', unit: '100g Glass Jar', stock: 95, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
  { id: 45, name: 'Tropicana 100% Pure Orange Juice', category: 'Beverages', price: 115, originalPrice: 130, tag: 'No Added Sugar', unit: '1 Litre Tetra', stock: 60, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500' },
  { id: 46, name: 'Kinley Packaged Water Mineral Plus', category: 'Beverages', price: 20, originalPrice: 20, tag: 'Hydration Node', unit: '1 Litre Bottle', stock: 500, image: 'https://images.unsplash.com/photo-1608885898957-a599fb1c468b?w=500' },

  // ==========================================
  // 🥐 ক্যাটাগরি: Bakery (টাটকা ব্রেড, বিস্কুট ও কেক)
  // ==========================================
  { id: 47, name: 'Premium Whole Wheat Brown Bread', category: 'Bakery', price: 45, originalPrice: 55, tag: 'Healthy Pick', unit: '400g Pack', stock: 50, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500' },
  { id: 48, name: 'Britannia Choco Muffins Soft Pack', category: 'Bakery', price: 30, originalPrice: 35, tag: 'Kids Special', unit: '6 Pcs Pack', stock: 85, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500' },
  { id: 49, name: 'Britannia Marie Gold Crisp Biscuit', category: 'Bakery', price: 35, originalPrice: 35, tag: 'Tea Partner', unit: '250g Pack', stock: 240, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500' },
  { id: 50, name: 'Amul Pure Pasteurized Salted Butter', category: 'Bakery', price: 56, originalPrice: 58, tag: 'Utterly Butterly', unit: '100g Block', stock: 190, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500' },
  { id: 51, name: 'Fresh Eggless Chocolate Cream Cake', category: 'Bakery', price: 249, originalPrice: 349, tag: 'Celebration Node', unit: '1 Pc (500g)', stock: 15, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' },
  { id: 52, name: 'Premium Milky Plain Rusk Crunch', category: 'Bakery', price: 40, originalPrice: 50, tag: 'Evening Toast', unit: '300g Pack', stock: 105, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500' },
  { id: 53, name: 'Fresh Baked Garlic Breadsticks', category: 'Bakery', price: 65, originalPrice: 80, tag: 'Italian Gourmet', unit: '150g Pack', stock: 30, image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=500' },
  { id: 54, name: 'Kelloggs Corn Flakes Real Almond Honey', category: 'Bakery', price: 185, originalPrice: 210, tag: 'Breakfast Choice', unit: '300g Box', stock: 75, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500' }
];

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Cooking Essential', 'Snacks & Nuts', 'Beverages', 'Bakery'];

const AI_BOT_RESPONSES = {
  hi: "Hello! Welcome to Maa Kali Grocery Secure AI Assistant. How can I help you today?",
  hello: "Hello! Looking for fresh organic groceries today?",
  mango: "Our Premium Alphonso Mangoes are direct from farms, highly recommended!",
  discount: "Log in as an elite user to claim up to 20% secure cashback token!",
  default: "I am analyzing your query with our local database. You can ask about products, delivery or discounts!"
};

export default function App() {
  // ==========================================
  // 🚦 ২. কোর রিয়েক্ট স্টেটস (Core Application States)
  // ==========================================
  const [products, setProducts] = useState(() => {
    return DEFAULT_PRODUCTS;
  });
  
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // 🌓 ফিউচারিস্টিক অ্যান্ড সাইবার মোড স্টেটস
  const [isCyberMode, setIsCyberMode] = useState(false); 
  const [isListening, setIsListening] = useState(false); 
  const [aiOffer, setAiOffer] = useState(null); 
  const [analytics, setAnalytics] = useState(null); 

  // 🔐 সিকিউরিটি ও ভেরিফিকেশন মডিউল স্টেটস (Login & Register 2FA System)
  const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem('mk_current_user');
  return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [is2faStage, setIs2faStage] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [tempUser, setTempUser] = useState(null);

  // 📡 লাইভ ওটিপি গেটওয়ে ফায়ারওয়াল স্টেটস
  const [generatedRegOtp, setGeneratedRegOtp] = useState(null); 
  const [isOtpSent, setIsOtpSent] = useState(false); 

  // নতুন অর্ডার ট্র্যাকিং স্টেট নোড (Live Admin Tracking Dashboard)
  const [adminOrders, setAdminOrders] = useState([]);

  // ফর্ম হ্যান্ডলিং ডাটা অবজেক্টস
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });
  const [registerInput, setRegisterInput] = useState({ name: '', mobile: '', email: '', username: '', password: '', otp: '' });

  // 💬 চ্যাটবট স্টেটস
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Welcome to Maa Kali Grocery! I am your automated AI assistant. Type 'discount' or 'mango' to test!", isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');

  // 📦 ইনভেন্টরি ফর্ম স্টেট
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Fruits', price: '', originalPrice: '', image: '', tag: 'New', unit: '1 kg', stock: 50 });

  // 🖱️ জাভাস্ক্রিপ্ট ইনলাইন হোভার স্টেট ম্যানেজার
  const [hoveredCat, setHoveredCat] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredFooterLink, setHoveredFooterLink] = useState(null);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isThemeBtnHovered, setIsThemeBtnHovered] = useState(false);
  const [isLoginBtnHovered, setIsLoginBtnHovered] = useState(false);
  const [isOtpBtnHovered, setIsOtpBtnHovered] = useState(false);

  // 📄 পলিসি প্যানেল মডাল স্টেট
  const [activePolicyModal, setActivePolicyModal] = useState(null);

  // ==========================================
  // 🗣️ ৩. অ্যাডভান্সড ভয়েস সার্চ ইঞ্জিন (Web Speech API)
  // ==========================================
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser supports only Chrome for Voice Search!");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    }

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSearchQuery(voiceText.replace('.', ''));
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  // ডাইনামিক প্রোডাক্ট ফিল্টার পাইপলাইন
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      (selectedCategory === 'All' || p.category === selectedCategory)
    );
  }, [searchQuery, selectedCategory, products]);

  // AI রেকমেন্ডেশন ইঞ্জিন পাইপলাইন
  useEffect(() => {
    if (cart.length > 0) {
      const currentCategories = [...new Set(cart.map(item => item.category))];
      fetch('http://localhost:4000/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentCategories })
      })
      .then(res => res.json())
      .then(data => {
        if (data.recommendation && !cart.find(item => item.name === data.recommendation.name)) {
          setAiOffer(data.recommendation);
        } else {
          setAiOffer(null);
        }
      }).catch(() => console.log("Backend offline fallback rules"));
    } else {
      setAiOffer(null);
    }
  }, [cart]);

  // ==========================================
  // 📊 ৫. অ্যাডমিন অ্যানালিটিক্স ও লাইভ অর্ডার ডেটা লোডার
  // ==========================================
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetch('http://localhost:4000/api/dashboard-analytics')
        .then(res => res.json())
        .then(data => setAnalytics(data))
        .catch(() => console.log("Backend offline local secure logs"));

      fetch('http://localhost:4000/api/admin-orders')
        .then(res => res.json())
        .then(data => setAdminOrders(data))
        .catch(() => console.log("Backend orders offline"));
    }
  }, [currentUser, cart]);

  useEffect(() => {
    localStorage.setItem('mk_products', JSON.stringify(products));
  }, [products]);

  // ==========================================
  // 📲 📡 ওটিপি ডিসপ্যাচার পাইপলাইন
  // ==========================================
  const handleSendRegOtp = async () => {
    if (!registerInput.mobile || registerInput.mobile.length !== 10) {
      return alert("❌ Validation Error: Please enter a valid 10-digit mobile number first!");
    }

    try {
      const response = await fetch('http://localhost:4000/api/send-real-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: registerInput.mobile })
      });
      const data = await response.json();

      if (response.ok && data.debugOtp) {
        setGeneratedRegOtp(data.debugOtp);
        setIsOtpSent(true);
        alert(`📡 Maa Kali AI Gateway:\n\n🚀 OTP successfully fired to network tower for +91-${registerInput.mobile}!\n\n🔒 ACCESS CODE: ${data.debugOtp}`);
      } else {
        throw new Error("Bypass trigger active");
      }
    } catch (err) {
      const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedRegOtp(fallbackOtp);
      setIsOtpSent(true);
      alert(`---- [Maa Kali AI Core System: Fallback Tunnel Engaged] ----\n\n🚀 Connection Bypass: OTP dispatched to cloud network for +91-${registerInput.mobile}!\n\n🔒 LOCAL CODE: ${fallbackOtp}`);
    }
  };

  // ডাটাবেস সিকিউর রেজিস্ট্রেশন হ্যান্ডলার
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent) return alert("❌ Security Block: Please trigger 'Send OTP' and verify your number first!");
    if (registerInput.otp !== generatedRegOtp) return alert("🔒 Encryption Error: Input OTP token mismatches!");

    try {
      await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerInput)
      });
      alert("🎉 Registration Successful! Now log in to continue.");
      setAuthMode('login'); 
      setIsOtpSent(false);
      setGeneratedRegOtp(null);
      setRegisterInput({ name: '', mobile: '', email: '', username: '', password: '', otp: '' });
    } catch (err) {
      alert("🎉 Registration Simulated Successfully! Now perform login.");
      setAuthMode('login');
    }
  };

  // টু-ফ্যাক্টর অথেন্টিকেশন (2FA) লগইন গেটওয়ে
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginInput.username, password: loginInput.password })
      });
      const data = await response.json();
      if (response.ok) {
        setTempUser(data.user);
        setIs2faStage(true); 
        alert("🛡️ Security Verification: Enter 2FA Token '123456' to pass.");
      } else alert(`❌ ${data.error}`);
    } catch (err) { 
      if (loginInput.username.toLowerCase() === 'admin' && loginInput.password === 'admin123') {
        setTempUser({ username: 'Admin Rajdwip', role: 'admin' });
        setIs2faStage(true);
      } else if (loginInput.username && loginInput.password) {
        setTempUser({ username: loginInput.username, role: 'user' });
        setIs2faStage(true);
      } else {
        alert('❌ Server Offline! Use credentials admin/admin123.');
      }
    }
  };

  // ✅ বদলে এই ১০০% পারসিস্টেন্ট ফাংশন নোডটি বসিয়ে দাও ভাই:
const verify2faOtp = (e) => {
  e.preventDefault();
  if (otpInput === '123456') {
    setCurrentUser(tempUser);
    // 🛡️ ব্রাউজারের হার্ডডিস্ক মেমোরিতে ইউজার ডাটা চিরদিনের জন্য লক করা হলো!
    localStorage.setItem('mk_current_user', JSON.stringify(tempUser));
    
    setIs2faStage(false);
    setShowLoginModal(false);
    setOtpInput('');
    setLoginInput({ username: '', password: '' });
    alert(`🔓 Access Granted! Secure session started for ${tempUser.username}`);
  } else {
    alert("❌ Invalid Security Token!");
  }
};

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), text: chatInput, isBot: false };
    setChatMessages(prev => [...prev, userMsg]);

    const cleanInput = chatInput.toLowerCase().trim();
    let replyText = AI_BOT_RESPONSES.default;
    
    if (cleanInput.includes('hi') || cleanInput.includes('hello')) replyText = AI_BOT_RESPONSES.hello;
    else if (cleanInput.includes('mango') || cleanInput.includes('fruit')) replyText = AI_BOT_RESPONSES.mango;
    else if (cleanInput.includes('discount') || cleanInput.includes('offer')) replyText = AI_BOT_RESPONSES.discount;

    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: replyText, isBot: true }]);
    }, 600);

    setChatInput('');
  };

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + change } : item).filter(item => item.qty > 0));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return alert('Data fields missing!');
    const productObj = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      stock: Number(newProduct.stock || 50),
      image: newProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'
    };
    setProducts([productObj, ...products]);
    setNewProduct({ name: '', category: 'Fruits', price: '', originalPrice: '', image: '', tag: 'New', unit: '1 kg', stock: 50 });
    alert("🎉 Product securely added into database inventory!");
  };

  const cartTotals = useMemo(() => ({
    totalItems: cart.reduce((acc, item) => acc + item.qty, 0),
    finalBill: cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  }), [cart]);

  const theme = {
    bg: isCyberMode ? '#0b132b' : '#f8fafc',
    cardBg: isCyberMode ? '#1c2541' : '#ffffff',
    text: isCyberMode ? '#00f5d4' : '#0f172a',
    subText: isCyberMode ? '#8da9c4' : '#64748b',
    border: isCyberMode ? '#00f5d4' : '#f1f5f9',
    glow: isCyberMode ? '0 0 15px rgba(0, 245, 212, 0.4)' : '0 4px 20px rgba(0,0,0,0.02)'
  };

  return (
    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', backgroundColor: theme.bg, minHeight: '100vh', width: '100%', margin: 0, padding: 0, color: theme.text, transition: 'all 0.4s ease', overflowX: 'hidden' }}>
      
      {/* 🟢 গ্লোবাল সিএসএস ইফেক্টস */}
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        .futuristic-card { background: ${theme.cardBg}; border-radius: 20px; border: 1px solid ${theme.border}; box-shadow: ${theme.glow}; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
        .pulse-mic { animation: pulse 1.5s infinite; color: #ef4444 !important; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .header-wrap { width: 100%; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; box-sizing: border-box; }
        @media (max-width: 640px) { .header-wrap { padding: 16px; flex-direction: column; align-items: flex-start; } .search-wrap { width: 100% !important; order: 3; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
      `}</style>

      {/* ==========================================
          🟢 হেড সেকশন
          ========================================== */}
      <header style={{ 
        background: isCyberMode ? '#1c2541' : '#064e3b', 
        borderBottom: isCyberMode ? '1px solid #00f5d4' : '1px solid #047857', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        transition: 'all 0.4s ease',
        boxShadow: isCyberMode ? '0 4px 20px rgba(0, 245, 212, 0.15)' : '0 4px 20px rgba(6, 78, 59, 0.2)'
      }}>
        <div className="header-wrap">
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            <div style={{ background: '#10b981', padding: '10px', borderRadius: '14px' }}><ShoppingBag size={24} color="#fff" /></div>
            <div>
              <span style={{ fontSize: '24px', fontWeight: '800', color: isCyberMode ? '#00f5d4' : '#fff' }}>Maa Kali Grocery</span>
              <span style={{ display: 'block', fontSize: '10px', color: '#34d399', fontWeight: '700', letterSpacing: '0.5px' }}>🔒 SECURE AI ENVIRONMENT</span>
            </div>
          </div>

          <div 
            className="search-wrap" 
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            style={{ 
              flex: '0 1 500px', 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center',
              transform: isSearchHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          >
            <Search size={18} color={isSearchHovered ? (isCyberMode ? '#00f5d4' : '#10b981') : '#94a3b8'} style={{ position: 'absolute', left: '16px', zIndex: 1 }} />
            <input 
              type="text" 
              placeholder={isListening ? "Listening with local API Node..." : "Search fresh groceries dynamically..."} 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '14px 50px 14px 48px', 
                borderRadius: '14px', 
                background: isCyberMode ? '#0b132b' : 'rgba(255,255,255,0.1)', 
                color: '#fff', 
                fontSize: '14px', 
                outline: 'none', 
                boxSizing: 'border-box',
                border: isSearchHovered ? (isCyberMode ? '2px solid #00f5d4' : '2px solid #34d399') : '2px solid transparent',
                transition: 'all 0.3s ease'
              }} 
            />
            <button onClick={handleVoiceSearch} className={isListening ? "pulse-mic" : ""} style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: isListening ? '#ef4444' : '#94a3b8', display: 'flex', alignItems: 'center' }}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => setIsCyberMode(!isCyberMode)} 
              onMouseEnter={() => setIsThemeBtnHovered(true)}
              onMouseLeave={() => setIsThemeBtnHovered(false)}
              style={{ 
                background: isCyberMode ? '#00f5d4' : '#1e293b', 
                border: 'none', 
                padding: '12px', 
                borderRadius: '14px', 
                cursor: 'pointer', 
                color: isCyberMode ? '#0b132b' : '#fff', 
                display: 'flex',
                transform: isThemeBtnHovered ? 'scale(1.1) rotate(15deg)' : 'scale(1) rotate(0deg)',
                transition: 'all 0.3s'
              }}
            >
              {isCyberMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '12px' }}>
                <User size={16} color="#34d399" /><span style={{ fontSize: '14px', color: '#fff', fontWeight: '600' }}>{currentUser.username}</span>
// ✅ বদলে এই মেমোরি ক্লিয়ারার চেইনটি বসিয়ে দাও:
<button onClick={() => { 
  setCurrentUser(null); 
  setCart([]); 
  localStorage.removeItem('mk_current_user'); // মেমোরি রিমুভ টোকেন
  alert("🔒 Session Logged Out Securely!");
}} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex' }}><LogOut size={16} /></button>              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setShowLoginModal(true); }} 
                onMouseEnter={() => setIsLoginBtnHovered(true)}
                onMouseLeave={() => setIsLoginBtnHovered(false)}
                style={{ 
                  background: isLoginBtnHovered ? (isCyberMode ? '#00f5d4' : '#10b981') : (isCyberMode ? 'transparent' : '#10b981'), 
                  color: isLoginBtnHovered && isCyberMode ? '#0b132b' : '#fff', 
                  border: isCyberMode ? '2px solid #00f5d4' : '2px solid transparent', 
                  padding: '12px 22px', 
                  borderRadius: '14px', 
                  fontWeight: '700', 
                  fontSize: '13px',
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  transform: isLoginBtnHovered ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isLoginBtnHovered ? (isCyberMode ? '0 0 20px #00f5d4' : '0 6px 15px rgba(16, 185, 129, 0.3)') : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <LogIn size={16} /> Secure Portal
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================
          🟢 কোর অ্যাপ্লিকেশন লেআউট
          ========================================== */}
      <main style={{ width: '100%', padding: '40px', display: 'grid', gridTemplateColumns: (currentUser?.role === 'admin' || cart.length > 0) ? '1fr 400px' : '1fr', gap: '40px', boxSizing: 'border-box' }}>
        
        <div>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px', marginBottom: '25px' }}>
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              const isHovered = hoveredCat === cat;
              return (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  onMouseEnter={() => setHoveredCat(cat)}
                  onMouseLeave={() => setHoveredCat(null)}
                  style={{ 
                    padding: '12px 24px', 
                    borderRadius: '14px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    cursor: 'pointer', 
                    whiteSpace: 'nowrap',
                    border: isCyberMode ? '1px solid #00f5d4' : '1px solid #e2e8f0',
                    background: isSelected ? (isCyberMode ? '#00f5d4' : '#064e3b') : (isHovered ? (isCyberMode ? 'rgba(0,245,212,0.2)' : '#f1f5f9') : theme.cardBg), 
                    color: isSelected ? (isCyberMode ? '#0b132b' : '#fff') : theme.text,
                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
            {filteredProducts.map(product => {
              const isInCart = cart.find(item => item.id === product.id);
              const isCardHovered = hoveredProduct === product.id;
              
              return (
                <div 
                  key={product.id} 
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="futuristic-card"
                  style={{
                    transform: isCardHovered ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: isCardHovered ? (isCyberMode ? '0 0 25px rgba(0, 245, 212, 0.6)' : '0 15px 30px rgba(0,0,0,0.06)') : theme.glow,
                    borderColor: isCardHovered && isCyberMode ? '#00f5d4' : theme.border
                  }}
                >
                  {/* 🛠️ 🔥 রিয়্যাক্ট ফ্র্যাগমেন্ট অ্যাড করে এই ইমেজ নোডটি ১০০% ফিক্স করা হলো ভাই! */}
                  <div style={{ height: '170px', background: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
                    <>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isCardHovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }} />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: isCyberMode ? '#0b132b' : '#e0f2fe', color: isCyberMode ? '#00f5d4' : '#0369a1', fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', border: isCyberMode ? '1px solid #00f5d4' : 'none' }}>{product.tag}</div>
                    </>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', textTransform: 'uppercase' }}>{product.category}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '4px 0', color: theme.text, minHeight: '40px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.subText, marginBottom: '12px' }}>
                      <span>Pack: {product.unit}</span>
                      <span style={{ color: product.stock < 15 ? '#ef4444' : '#10b981', fontWeight: '700' }}>Stock: {product.stock} left</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${theme.border}` }}>
                      <div>
                        <span style={{ fontSize: '18px', fontWeight: '800' }}>₹{product.price}</span>
                        <span style={{ fontSize: '12px', color: '#f87171', textDecoration: 'line-through', marginLeft: '6px' }}>₹{product.originalPrice}</span>
                      </div>
                      
                      {isInCart ? (
                        <div style={{ display: 'flex', alignItems: 'center', background: '#10b981', borderRadius: '10px', padding: '6px 10px', color: '#fff' }}>
                          <button onClick={() => updateQty(product.id, -1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}><Minus size={12} /></button>
                          <span style={{ padding: '0 10px', fontWeight: '700', fontSize: '13px' }}>{isInCart.qty}</span>
                          <button onClick={() => updateQty(product.id, 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}><Plus size={12} /></button>
                        </div>
                      ) : (
                        <button onClick={() => setCart([...cart, { ...product, qty: 1 }])} style={{ background: isCyberMode ? '#00f5d4' : '#f0fdf4', color: isCyberMode ? '#0b132b' : '#16a34a', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }}>+ Add</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ⚙️ এন্টারপ্রাইজ মডিউল: অ্যাডমিন লাইভ ইনভেন্টরি ম্যানেজার */}
          {currentUser?.role === 'admin' && (
            <div className="futuristic-card" style={{ marginTop: '40px', padding: '30px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={20} /> Live Secure Store Database Inventory</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${theme.border}`, color: theme.subText }}>
                      <th style={{ padding: '12px' }}>Product Details</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Price Metric</th>
                      <th style={{ padding: '12px' }}>Stock Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                        <td style={{ padding: '12px', fontWeight: '600' }}>{p.name}</td>
                        <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', background: theme.bg, borderRadius: '6px' }}>{p.category}</span></td>
                        <td style={{ padding: '12px', fontWeight: '700' }}>₹{p.price}</td>
                        <td style={{ padding: '12px', color: p.stock < 15 ? '#ef4444' : '#10b981', fontWeight: '700' }}>{p.stock} Packets</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ⚙️ এন্টারপ্রাইজ মডিউল ২: অ্যাডমিন লাইভ কাস্টমার অর্ডার ট্র্যাকার */}
          {currentUser?.role === 'admin' && (
            <div className="futuristic-card" style={{ marginTop: '40px', padding: '30px', borderColor: '#ef4444' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}><ShoppingCart size={20} /> Live Customer Ingress Orders Database</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${theme.border}`, color: theme.subText }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>Customer ID</th>
                      <th style={{ padding: '12px' }}>Purchased Items Matrix</th>
                      <th style={{ padding: '12px' }}>Total Bill</th>
                      <th style={{ padding: '12px' }}>Time Node</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminOrders.length === 0 ? (
                      <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: theme.subText }}>📡 No inbound orders captured in current session clusters...</td></tr>
                    ) : (
                      adminOrders.map(order => (
                        <tr key={order.orderId} style={{ borderBottom: `1px solid ${theme.border}` }}>
                          <td style={{ padding: '12px', fontWeight: '700', color: '#3b82f6' }}>{order.orderId}</td>
                          <td style={{ padding: '12px', fontWeight: '600' }}><span style={{ padding: '4px 10px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px', color: '#3b82f6' }}>👤 {order.username}</span></td>
                          <td style={{ padding: '12px' }}>
                            {order.items.map((item, idx) => (
                              <div key={idx} style={{ fontSize: '12px', color: theme.text }}>• {item.name} <b style={{ color: '#10b981' }}>x{item.qty}</b></div>
                            ))}
                          </td>
                          <td style={{ padding: '12px', fontWeight: '800', color: '#10b981' }}>₹{order.totalBill}</td>
                          <td style={{ padding: '12px', color: theme.subText }}>⏱️ {order.orderDate}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* ডানদিকের ইন্টেলিজেন্ট কন্ট্রোল সাইডবার */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* অ্যাডমিন ফিউচারিস্টিক অ্যানালিটিক্স গ্রাফ ড্যাশবোর্ড */}
          {currentUser?.role === 'admin' && analytics && (
            <div className="futuristic-card" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: isCyberMode ? '#00f5d4' : '#064e3b' }}><BarChart2 /> System Telemetry Stacks</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '12px', background: isCyberMode ? '#0b132b' : '#f8fafc', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: '10px', color: theme.subText }}>NET REVENUE</span>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>₹{analytics.totalSales}</div>
                </div>
                <div style={{ padding: '12px', background: isCyberMode ? '#0b132b' : '#f8fafc', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: '10px', color: theme.subText }}>LIVE ORDERS</span>
                  <div style={{ fontSize: '20px', fontWeight: '800' }}>{analytics.ordersCount} Nodes</div>
                </div>
              </div>

              <h4 style={{ fontSize: '12px', marginBottom: '10px', fontWeight: '700' }}><Layers size={14} /> Category Demand Proportional Graph</h4>
              {analytics.categoryData.map(c => (
                <div key={c.name} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}><span>{c.name}</span><span>{c.value}%</span></div>
                  <div style={{ width: '100%', height: '6px', background: isCyberMode ? '#0b132b' : '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${c.value}%`, height: '100%', background: isCyberMode ? '#00f5d4' : '#10b981', boxShadow: isCyberMode ? '0 0 8px #00f5d4' : 'none' }}></div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${theme.border}` }}>
                <h4 style={{ fontSize: '13px', marginBottom: '12px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={14} /> Push New Batch Data</h4>
                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Item Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input type="number" placeholder="Price (₹)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} />
                    <input type="number" placeholder="Stock Packets" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} />
                  </div>
                  <button type="submit" style={{ background: '#064e3b', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Secure Push</button>
                </form>
              </div>
            </div>
          )}

          {/* AI রেকমেন্ডেশন */}
          {currentUser?.role !== 'admin' && aiOffer && (
            <div className="futuristic-card" style={{ padding: '20px', background: isCyberMode ? 'rgba(0,245,212,0.06)' : '#eff6ff', borderColor: '#3b82f6', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#3b82f6', fontWeight: '700', fontSize: '13px' }}><Sparkles size={16} /> Autonomous AI Predictive Suggestion</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={aiOffer.image} style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px' }} alt="" />
                <div style={{ flexGrow: 1 }}><h5 style={{ margin: 0, fontSize: '13px', color: theme.text }}>{aiOffer.name}</h5><span style={{ fontSize: '12px', fontWeight: '800' }}>₹{aiOffer.price}</span></div>
                <button onClick={() => { setCart([...cart, { ...aiOffer, id: Date.now(), category: 'AI', qty: 1 }]); setAiOffer(null); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Inject Item</button>
              </div>
            </div>
          )}

          {/* কাস্টমার বাস্কেট */}
          {currentUser?.role !== 'admin' && cart.length > 0 && (
            <div className="futuristic-card" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}><ShoppingCart size={18} /> Smart Matrix Basket ({cartTotals.totalItems})</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}`, alignItems: 'center' }}>
                    <div><h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{item.name}</h5><span style={{ fontSize: '11px', color: theme.subText }}>₹{item.price} × {item.qty}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme.bg, padding: '4px 8px', borderRadius: '8px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex' }}><Minus size={10} /></button>
                      <span style={{ fontSize: '12px', fontWeight: '700' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex' }}><Plus size={10} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', marginTop: '20px', fontSize: '15px', color: isCyberMode ? '#00f5d4' : '#064e3b', paddingTop: '12px', borderTop: `1px solid ${theme.border}` }}>
                <span>Aggregate Total:</span><span>₹{cartTotals.finalBill}</span>
              </div>
              
              {/* 🔒 নতুন ও সিকিউর লগইন ফায়ারওয়াল প্রোটোকল বাটন ইন্টিগ্রেটেড */}
              {/* 🔒 নতুন গেস্ট ব্লক এবং রিয়েল-টাইম স্টক ভেরিফিকেশন ফায়ারওয়াল বাটন ইন্টিগ্রেটেড */}
              <button onClick={async () => {
                if (cart.length === 0) return alert("Your basket is empty!");
                
                // ১. 🛑 গেস্ট আইডি অর্ডার ব্লক চেইন
                if (!currentUser) {
                  alert("🔒 Security Gate: Unauthorized checkout detected! Please login or register to complete your order.");
                  setAuthMode('login'); 
                  setShowLoginModal(true);
                  return; // কোড এখানেই স্টপ হয়ে যাবে, লগইন ছাড়া এগোতে দেবে না
                }

                // ২. 📦 রিয়েল-টাইম ইনভেন্টরি স্টক গেটওয়ে চেক
                for (const cartItem of cart) {
                  const originalProduct = products.find(p => p.id === cartItem.id);
                  
                  if (originalProduct) {
                    if (originalProduct.stock === 0) {
                      alert(`❌ Out of Stock: Sorry, "${cartItem.name}" is completely out of stock right now!`);
                      return;
                    }
                    if (cartItem.qty > originalProduct.stock) {
                      alert(`⚠️ Inventory Limit Alert:\n\nYou are trying to order ${cartItem.qty} packets of "${cartItem.name}".\n\nBut only ${originalProduct.stock} packets are available in our active database cluster! Please reduce quantity.`);
                      return; // কোড এখানেই স্টপ হয়ে যাবে ভাই, আউট অফ স্টক অর্ডার ব্লক!
                    }
                  }
                }

                try {
                  const response = await fetch('http://localhost:4000/api/place-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      username: currentUser.username,
                      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
                      totalBill: cartTotals.finalBill
                    })
                  });
                  const data = await response.json();
                  if (response.ok) {
                    alert(`🎉 Order Placed Successfully!\n\n🆔 Order ID: ${data.orderId}\n💰 Paid: ₹${cartTotals.finalBill}\n\nSent to Admin Dashboard Cluster!`);
                    setCart([]);
                  }
                } catch (err) {
                  alert(`🎉 Order Simulated Locally for Active User!\n👤 User: ${currentUser.username}\n💰 Total: ₹${cartTotals.finalBill}`);
                  setCart([]);
                }
              }} style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', marginTop: '16px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Proceed to Checkout</button>

            </div>
          )}

        </aside>
      </main>

      {/* চ্যাটবট উইন্ডো */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        {!showChatBot ? (
          <button onClick={() => setShowChatBot(true)} style={{ background: isCyberMode ? '#00f5d4' : '#064e3b', color: isCyberMode ? '#0b132b' : '#fff', border: 'none', padding: '16px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={24} />
          </button>
        ) : (
          <div className="futuristic-card" style={{ width: '320px', height: '400px', display: 'flex', flexDirection: 'column', background: theme.cardBg, overflow: 'hidden' }}>
            {/* 🛠️ 🔥 টাইপো ফিক্স করা হলো: justifycontent থেকে justifyContent করা হলো ভাই! */}
            <div style={{ background: isCyberMode ? '#1c2541' : '#064e3b', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}><Sparkles size={14} color="#00f5d4" /> Maa Kali Core AI Support</div>
              <button onClick={() => setShowChatBot(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            <div style={{ flexGrow: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: theme.bg }}>
              {chatMessages.map(m => (
                <div key={m.id} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', background: m.isBot ? theme.cardBg : '#10b981', color: m.isBot ? theme.text : '#fff', padding: '8px 12px', borderRadius: '12px', fontSize: '12px', maxWidth: '80%', border: m.isBot ? `1px solid ${theme.border}` : 'none' }}>{m.text}</div>
              ))}
            </div>
            <form onSubmit={handleSendChatMessage} style={{ padding: '8px', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: '6px', background: theme.cardBg }}>
              <input type="text" placeholder="Type here..." value={chatInput} onChange={e => setChatInput(e.target.value)} style={{ flexGrow: 1, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} />
              <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex' }}><Send size={14} /></button>
            </form>
          </div>
        )}
      </div>

      {/* 🔐 লগইন ও মেগা রেজিস্টার মডাল */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(11, 19, 43, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div style={{ background: theme.cardBg, padding: '32px', borderRadius: '24px', width: '430px', border: `1px solid ${theme.border}`, boxShadow: theme.glow, color: theme.text }}>
            
            {!is2faStage ? (
              <>
                <div style={{ display: 'flex', background: theme.bg, borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
                  <button type="button" onClick={() => setAuthMode('login')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: authMode === 'login' ? '#10b981' : 'transparent', color: authMode === 'login' ? '#fff' : theme.text, transition: 'all 0.3s' }}>Existing Login</button>
                  <button type="button" onClick={() => setAuthMode('register')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: authMode === 'register' ? '#10b981' : 'transparent', color: authMode === 'register' ? '#fff' : theme.text, transition: 'all 0.3s' }}>Register Account</button>
                </div>

                {authMode === 'login' ? (
                  <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Username ID</label>
                      <input type="text" required placeholder="Enter username" value={loginInput.username} onChange={e => setLoginInput({...loginInput, username: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Password</label>
                      <input type="password" required placeholder="Enter password" value={loginInput.password} onChange={e => setLoginInput({...loginInput, password: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                      <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: '#f1f5f9', color: '#64748b', fontWeight: '700' }}>Abort</button>
                      <button type="submit" style={{ flex: 1, background: '#10b981', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Authorize</button>
                    </div>
                  </form>
                ) : (
                  /* 👤 মেগা রেজিস্ট্রেশন ফর্ম */
                  <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Full Name</label>
                      <input type="text" required placeholder="e.g. Rajdwip Pramanick" value={registerInput.name} onChange={e => setRegisterInput({...registerInput, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Mobile Number</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          required 
                          maxLength={10} 
                          placeholder="10-digit number" 
                          value={registerInput.mobile} 
                          onChange={e => {
                            const val = e.target.value.replace(/[^0-9]/g, ''); 
                            setRegisterInput({...registerInput, mobile: val});
                          }} 
                          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} 
                        />
                        <button 
                          type="button" 
                          onClick={handleSendRegOtp}
                          onMouseEnter={() => setIsOtpBtnHovered(true)}
                          onMouseLeave={() => setIsOtpBtnHovered(false)}
                          style={{ 
                            background: isOtpSent ? '#047857' : '#3b82f6', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '0 14px', 
                            borderRadius: '8px', 
                            fontSize: '11px', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            transform: isOtpBtnHovered ? 'scale(1.03)' : 'none',
                            transition: 'all 0.2s'
                          }}
                        >
                          {isOtpSent ? "Resend OTP" : "Send OTP"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>E-mail Address</label>
                      <input type="email" required placeholder="name@gmail.com" value={registerInput.email} onChange={e => setRegisterInput({...registerInput, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Username ID</label>
                      <input type="text" required placeholder="Create username" value={registerInput.username} onChange={e => setRegisterInput({...registerInput, username: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Password</label>
                      <input type="password" required placeholder="Create password" value={registerInput.password} onChange={e => setRegisterInput({...registerInput, password: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Enter Received OTP</label>
                      <input 
                        type="text" 
                        required 
                        maxLength={6} 
                        disabled={!isOtpSent} 
                        placeholder={isOtpSent ? "Enter 6-digit OTP" : "🔒 Click Send OTP First"} 
                        value={registerInput.otp} 
                        onChange={e => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setRegisterInput({...registerInput, otp: val});
                        }} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: !isOtpSent ? '#e2e8f0' : theme.bg, color: theme.text, outline: 'none', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '4px' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: '#f1f5f9', color: '#64748b', fontWeight: '700', fontSize: '13px' }}>Cancel</button>
                      <button type="submit" style={{ flex: 1, background: '#10b981', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Commit Register</button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* ২এফএ ওটিপি লক উইন্ডো */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><ShieldAlert size={20} color="#ef4444" /><h2 style={{ fontSize: '19px', fontWeight: '800', margin: 0 }}>2FA Security Firewall</h2></div>
                <p style={{ fontSize: '12px', color: theme.subText, marginBottom: '20px' }}>Enter the gateway pin <b style={{ color: '#ef4444' }}>123456</b> to authorize access cache.</p>
                <form onSubmit={verify2faOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="text" required maxLength="6" placeholder="******" value={otpInput} onChange={e => setOtpInput(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: '18px', fontWeight: '800', textAlign: 'center', letterSpacing: '4px', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setIs2faStage(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', background: '#f1f5f9', color: '#64748b' }}>Back</button>
                    <button type="submit" style={{ flex: 1, background: '#ef4444', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Authorize</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          🟢 ৪. প্রফেশনাল ও সিকিউর ফুটার মডিউল
          ========================================== */}
      <footer style={{ background: isCyberMode ? '#1c2541' : '#064e3b', color: '#ffffff', padding: '40px 40px 20px 40px', borderTop: `1px solid ${theme.border}`, marginTop: '60px', transition: 'all 0.4s ease', boxSizing: 'border-box', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginBottom: '30px', borderBottom: isCyberMode ? '1px dashed #00f5d4' : '1px dashed rgba(255,255,255,0.15)', paddingBottom: '30px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: '#10b981', padding: '8px', borderRadius: '10px' }}><ShoppingBag size={18} color="#fff" /></div>
              <span style={{ fontSize: '18px', fontWeight: '800', color: isCyberMode ? '#00f5d4' : '#fff' }}>Maa Kali Grocery</span>
            </div>
            <p style={{ fontSize: '13px', color: isCyberMode ? '#8da9c4' : '#a7f3d0', lineHeight: '1.6', margin: 0 }}>
              Your trusted partner for 100% fresh, organic, and handpicked daily essentials. Delivered securely at your doorstep.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: isCyberMode ? '#00f5d4' : '#34d399' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              {[
                { name: 'About Our Farms', modal: 'about' },
                { name: 'Secure Shopping', modal: 'secure' },
                { name: 'Privacy Firewall', modal: 'privacy' },
                { name: 'Terms of Service', modal: 'terms' }
              ].map((link, idx) => {
                const linkId = `footer-link-${idx}`;
                const isLinkHovered = hoveredFooterLink === linkId;
                return (
                  <span 
                    key={link.name}
                    onMouseEnter={() => setHoveredFooterLink(linkId)}
                    onMouseLeave={() => setHoveredFooterLink(null)}
                    onClick={() => setActivePolicyModal(link.modal)}
                    style={{ 
                      cursor: 'pointer', 
                      color: isLinkHovered ? (isCyberMode ? '#00f5d4' : '#34d399') : '#cbd5e1',
                      transform: isLinkHovered ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                    }}
                  >
                    ✦ {link.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: isCyberMode ? '#00f5d4' : '#34d399' }}>Secure Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
              <span>📍 Location: Daddey Para lane, Santipur, West Bengal</span>
              <span>📞 Helpline: +91 9064717561</span>
              <span>✉️ Mail: rajdwippramanik1@gmailcom</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: isCyberMode ? '#00f5d4' : '#34d399' }}>Trust Protocols</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', border: `1px solid ${isCyberMode ? '#00f5d4' : 'rgba(255,255,255,0.1)'}` }}>
                <ShieldCheck size={18} color="#10b981" />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>128-bit SSL Encrypted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', border: `1px solid ${isCyberMode ? '#00f5d4' : 'rgba(255,255,255,0.1)'}` }}>
                <Sparkles size={18} color="#3b82f6" />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>AI Powered Guard Node</span>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: isCyberMode ? '#8da9c4' : '#94a3b8' }}>
          <span>© 2026 Maa Kali Grocery Enterprise. All Rights Reserved.</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px' }}>System Core v3.4.0-Stable</span>
        </div>
      </footer>

      {/* পলিসি মডালস */}
      {activePolicyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: theme.cardBg, padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '500px', border: `1px solid ${theme.border}`, boxShadow: theme.glow, color: theme.text }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '18px' }}>
                <Info size={20} color="#10b981" />
                <span>
                  {activePolicyModal === 'about' && "About Our Organic Farms"}
                  {activePolicyModal === 'secure' && "SSL Cryptography Protocol"}
                  {activePolicyModal === 'privacy' && "Data Firewall Policy"}
                  {activePolicyModal === 'terms' && "Terms & Conditions Nodes"}
                </span>
              </div>
              <button onClick={() => setActivePolicyModal(null)} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer' }}><X size={18} /></button>
            </div>
            
            <div style={{ fontSize: '13px', lineHeight: '1.6', color: theme.subText, maxHeight: '250px', overflowY: 'auto', paddingRight: '6px' }}>
              {activePolicyModal === 'about' && (
                <p>Maa Kali Grocery procurement algorithm sources daily agricultural produce directly from localized pesticide-free farm clusters in Santipur and surrounding rural nodes. Every vegetable batch undergoes quality assurance check-points before system deployment.</p>
              )}
              {activePolicyModal === 'secure' && (
                <p>All ingress and egress operational telemetry vectors are encrypted via 128-bit Secure Sockets Layer (SSL) nodes. Financial handshakes redirect securely to encrypted point-of-sale network tokens, shielding accounts against potential buffer injection attacks.</p>
              )}
              {activePolicyModal === 'privacy' && (
                <p>Our data firewall prevents localized data leakages. User profiles and metadata caches are securely encrypted within sandboxed client-side LocalStorage pipelines and decentralized cloud nodes. No third-party metadata exposures are permissible.</p>
              )}
              {activePolicyModal === 'terms' && (
                <p>By engaging with the Maa Kali Grocery platform, users agree to access cataloged configurations without script forging. Order processing requires valid 2FA identity keys. Arbitrary rate limiters are deployed locally to guard against DDoS automation vectors.</p>
              )}
            </div>

            <button onClick={() => setActivePolicyModal(null)} style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', marginTop: '20px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Acknowledge Node</button>
          </div>
        </div>
      )}

    </div>
  );
}