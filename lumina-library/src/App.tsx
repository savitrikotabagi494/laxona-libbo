/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Library, 
  Search, 
  Plus, 
  Trash2, 
  BookOpen, 
  User as UserIcon, 
  Shield, 
  Briefcase,
  Layers,
  Home,
  BookMarked,
  ChevronRight,
  LogOut,
  X,
  Mic,
  MicOff,
  Volume2,
  MessageSquare,
  Send,
  Loader2,
  Sun,
  Moon,
  Camera,
  RotateCw,
  Award,
  QrCode,
  CheckCircle2,
  Trophy,
  Settings,
  Bell,
  Lock,
  Languages,
  Heart,
  Globe,
  Smartphone,
  Info,
  Trash,
  ChevronDown,
  ShieldCheck,
  Scan,
  Image as ImageIcon,
  Chrome,
  Eye,
  EyeOff,
  AlertCircle,
  Users,
  UserX,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, Book, Achievement, User, SessionUser } from './types';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,0,0,0.15)_0%,transparent_70%)]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(224,0,0,0.5)] mb-8">
          <Library className="text-white w-14 h-14" />
        </div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-bold tracking-[0.2em] text-white font-lexend mb-2"
        >
          LAXONA
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-0.5 w-48 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-slate-500 mt-4 uppercase tracking-[0.3em] text-[10px]"
        >
          Intelligence Redefined
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1, 
              delay: i * 0.2 
            }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        ))}
      </div>
    </motion.div>
  );
}

function LoginForm({ onLogin, onTrial }: { onLogin: (user: SessionUser) => void, onTrial: () => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: email.split('@')[0],
      email: email,
      role: selectedRole,
      isTrial: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
        {[Role.STUDENT, Role.EMPLOYEE, Role.ADMIN].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRole(r)}
            className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              selectedRole === r ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Email / Username</label>
          <div className="relative">
            <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              required
              type="text" 
              placeholder="e.g. rahul@laxona.edu"
              className="glass-input w-full pl-12 h-12 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              required
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="glass-input w-full pl-12 pr-12 h-12 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button 
            type="submit"
            className="w-full h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
          >
            Sign In to Portal
          </button>
          <button 
            type="button"
            onClick={onTrial}
            className="w-full h-12 bg-white/5 text-white/50 rounded-xl font-bold border border-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Zap size={16} className="text-yellow-500" />
            Try Demo (Trial Mode)
          </button>
        </div>
      </form>
    </div>
  );
}

function ScannerView({ onCapture, isScanning, mode = 'environment' }: { onCapture: (data: string) => void, isScanning: boolean, mode?: 'user' | 'environment' }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        // Try with requested facing mode first
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: mode } 
          });
        } catch (e) {
          console.warn("Retrying with default video constraints...");
          // Fallback to any video device
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: true 
          });
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Search overlay/guides */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-80 border-2 border-primary/50 rounded-2xl relative shadow-[0_0_0_100vmax_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <button 
          onClick={capture}
          disabled={isScanning}
          className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group active:scale-95 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-white group-hover:bg-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTrial, setIsTrial] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [removedEmails, setRemovedEmails] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('laxona_blocked') || '[]');
  });

  const [activeUsers, setActiveUsers] = useState<User[]>([
    { id: 'u1', name: 'Rahul Sharma', email: 'rahul@laxona.edu', role: Role.STUDENT, lastLogin: '2 mins ago', isActive: true },
    { id: 'u2', name: 'Anita Desai', email: 'anita@laxona.edu', role: Role.STUDENT, lastLogin: '10 mins ago', isActive: true },
    { id: 'u3', name: 'Vikram Singh', email: 'vikram@laxona.com', role: Role.EMPLOYEE, lastLogin: 'Active', isActive: true },
    { id: 'u4', name: 'Priya Patel', email: 'priya@laxona.edu', role: Role.STUDENT, lastLogin: '1 hour ago', isActive: false },
  ]);

  const [role, setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem('laxona_role') as Role;
    return savedRole || Role.STUDENT;
  });

  // Action Restriction Guard
  const checkAccess = (action: string) => {
    if (isTrial) {
      setAiResponse(`Guest Mode Active: Please login to ${action}. / गेस्ट मोड सक्रिय है: ${action} के लिए कृपया लॉगिन करें। / ಅತಿಥಿ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ: ${action} ಗಾಗಿ ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.`);
      setTimeout(() => setAiResponse(null), 5000);
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkAccess("edit profile")) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        setIsPhotoSheetOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowserSearch = () => {
    const searchUrl = 'https://www.google.com/search?q=modern+library+profile+picture&tbm=isch';
    const newWindow = window.open(searchUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      alert("Popup was blocked! / पॉपअप ब्लॉक हो गया! / ಪಾಪ್-ಅಪ್ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ! \n\nPlease visit: " + searchUrl);
    }

    const imageUrl = prompt("Please enter the image URL you found on the browser: / कृपया ब्राउज़र पर मिले इमेज का यूआरएल दर्ज करें: / ದಯವಿಟ್ಟು ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕಂಡುಬಂದ ಚಿತ್ರದ ಲಿಂಕ್ ಅನ್ನು ನಮೂದಿಸಿ:");
    if (imageUrl && imageUrl.trim()) {
      setProfilePic(imageUrl);
      setIsPhotoSheetOpen(false);
      updateAchievement('2');
    }
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAISearching, setIsAISearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'Available' | 'Reserved'>('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<string[] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [reservedBookIds, setReservedBookIds] = useState<string[]>([]);
  const [isReservedModalOpen, setIsReservedModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isReserved, setIsReserved] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [lastSpeechStatus, setLastSpeechStatus] = useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);

  const handleHome = () => {
    setSelectedBook(null);
    setIsReservedModalOpen(false);
    setIsAchievementsOpen(false);
    setIsChatOpen(false);
    setSearchQuery('');
    setCategoryFilter('All');
    setAvailabilityFilter('All');
    setIsReserved(false);
    setIsReading(false);
    setIsScannerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'user' | 'environment'>('environment');
  const [isScanning, setIsScanning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isQrMode, setIsQrMode] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', name: 'Book Worm', description: 'Reserve your first 5 books', icon: '🐛', level: 'Bronze', unlocked: false, progress: 0, maxProgress: 5 },
    { id: '2', name: 'Night Reader', description: 'Search for books after 10 PM', icon: '🌙', level: 'Silver', unlocked: false, progress: 0, maxProgress: 1 },
    { id: '3', name: 'Top Scholar', description: 'Read 10 technology books', icon: '🎓', level: 'Gold', unlocked: false, progress: 0, maxProgress: 10 },
    { id: '4', name: 'AI Pioneer', description: 'Use voice search 5 times', icon: '🤖', level: 'Bronze', unlocked: false, progress: 0, maxProgress: 5 },
  ]);

  // Timer effect for voice recording
  useEffect(() => {
    let interval: any;
    if (isListening) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { 
      role: 'ai', 
      content: `Hello! I am your professional AI librarian. How can I assist you today?
---
नमस्ते! मैं आपकी पेशेवर एआई लाइब्रेरियन हूं। मैं आज आपकी क्या सहायता कर सकती हूं?
---
ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವೃತ್ತಿಪರ ಎಐ ಗ್ರಂಥಪಾಲಕಿ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?` 
    }
  ]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    coverImage: ''
  });

  // Fetch books
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error fetching books:', err));
  }, []);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const filteredBooks = useMemo(() => {
    let result = books;

    // Apply Filters
    if (categoryFilter !== 'All') {
      result = result.filter(b => b.category === categoryFilter);
    }
    if (availabilityFilter !== 'All') {
      result = result.filter(b => availabilityFilter === 'Available' ? b.available : !b.available);
    }

    // Apply Search
    if (!searchQuery.trim()) return result;

    if (aiSearchResults) {
      // If we have AI results, prioritize them but still match the base query
      return result.filter(book => aiSearchResults.includes(book.id));
    }

    const query = searchQuery.toLowerCase();
    return result.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query) ||
      book.category.toLowerCase().includes(query)
    );
  }, [books, searchQuery, categoryFilter, availabilityFilter, aiSearchResults]);

  // AI Semantic Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 3 && !isAISearching) {
        setIsAISearching(true);
        try {
          const bookContext = books.map(b => ({ id: b.id, title: b.title, author: b.author, category: b.category }));
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Identify the IDs of books that best match this semantic search query: "${searchQuery}".
Catalog: ${JSON.stringify(bookContext)}
Return ONLY a JSON array of matching book IDs. If no semantic match, return an empty array [].`,
            config: { responseMimeType: "application/json" }
          });
          const ids = JSON.parse(response.text);
          if (Array.isArray(ids)) {
            setAiSearchResults(ids);
          }
        } catch (err) {
          console.error("AI Search Error:", err);
        } finally {
          setIsAISearching(false);
        }
      } else if (searchQuery.length <= 3) {
        setAiSearchResults(null);
      }
    }, 800); // Debounce AI search

    return () => clearTimeout(timer);
  }, [searchQuery, books]);

  // Track search history
  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => [query, ...prev.filter(h => h !== query)].slice(0, 5));
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const updateAchievement = (id: string, amount: number = 1) => {
    setAchievements(prev => prev.map(a => {
      if (a.id === id && !a.unlocked) {
        const newProgress = Math.min(a.progress + amount, a.maxProgress);
        return { ...a, progress: newProgress, unlocked: newProgress >= a.maxProgress };
      }
      return a;
    }));
  };

  // Check for Night Reader
  useEffect(() => {
    if (searchQuery.length > 0) {
      const hour = new Date().getUTCHours();
      if (hour >= 20 || hour <= 4) { // Night hours (approx 10PM - 4AM depending on TZ)
        updateAchievement('2');
      }
    }
  }, [searchQuery]);

  const handleReserve = () => {
    if (!checkAccess("reserve books")) return;
    if (selectedBook && !reservedBookIds.includes(selectedBook.id)) {
      setReservedBookIds(prev => [...prev, selectedBook.id]);
      setBooks(prev => prev.map(b => b.id === selectedBook.id ? { ...b, available: false } : b));
      setSelectedBook({ ...selectedBook, available: false });
      
      // Update Achievements
      updateAchievement('1');
      if (selectedBook.category.toLowerCase().includes('tech')) {
        updateAchievement('3');
      }
    }
    setIsReserved(true);
  };

  const handleRemoveReservation = (id: string) => {
    setReservedBookIds(prev => prev.filter(bid => bid !== id));
    setBooks(prev => prev.map(b => b.id === id ? { ...b, available: true } : b));
    if (selectedBook?.id === id) {
      setSelectedBook(prev => prev ? { ...prev, available: true } : null);
    }
  };

  const handleStartReading = () => {
    setIsReading(true);
  };

  const closeModals = () => {
    setSelectedBook(null);
    setIsReserved(false);
    setIsReading(false);
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAccess("add books")) return;
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBook, available: true })
      });
      const addedBook = await res.json();
      setBooks([...books, addedBook]);
      setIsAddModalOpen(false);
      setNewBook({ title: '', author: '', isbn: '', category: '', coverImage: '' });
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!checkAccess("delete books")) return;
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAccess("update books")) return;
    if (!editingBook) return;

    try {
      const res = await fetch(`/api/books/${editingBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBook)
      });
      
      if (res.ok) {
        setBooks(books.map(b => b.id === editingBook.id ? editingBook : b));
        setIsEditModalOpen(false);
        setEditingBook(null);
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  const canManage = role === Role.EMPLOYEE || role === Role.ADMIN;

  const handleVoiceCommand = async (command: string) => {
    try {
      const bookContext = books.map(b => ({ title: b.title, available: b.available, category: b.category }));
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `User command: "${command}"\nCurrent books: ${JSON.stringify(bookContext)}\n\nAct as a multilingual AI voice assistant for a smart library application called Laxona.
Understand the user's intent. If they want to search for books, return the search query and a friendly response. If they ask about availability, answer based on the context.

CRITICAL: Translate your "response" text into English, Hindi, and Kannada. Format as "English text / Hindi text / Kannada text".
Reply in the following JSON format:
{
  "search": "string, the search term to apply to the search bar (if any)",
  "response": "string, the translated response in English / Hindi / Kannada",
  "action": "string, optional action like 'open_reserved' or 'change_role_admin'"
}`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text);
      if (result.search !== undefined) {
        setSearchQuery(result.search);
        addToHistory(result.search);
        updateAchievement('4'); // Voice Search
      }
      setAiResponse(result.response);
      
      // Auto-clear response after 5 seconds
      setTimeout(() => setAiResponse(null), 5000);

      if (result.action === 'open_reserved') setIsReservedModalOpen(true);
      if (result.action === 'change_role_admin') setRole(Role.ADMIN);
      if (result.action === 'change_role_student') setRole(Role.STUDENT);
      
    } catch (err) {
      console.error("AI Error:", err);
      setAiResponse("Sorry, I had trouble processing that.");
    }
  };

  const handleProfilePhotoCapture = (imageData: string) => {
    setProfilePic(imageData);
    setIsScannerOpen(false);
    updateAchievement('2'); // Profile Updated achievement
  };

  const handleAnalyzeBookCover = async (imageData: string) => {
    setIsScanning(true);
    setAiResponse(isQrMode ? "Scanning QR Code..." : "Analyzing book cover...");
    try {
      let promptText = `Analyze this book cover image. Extract the following details in JSON format:
{
  "title": "Book title",
  "author": "Author name",
  "isbn": "ISBN number (if visible)",
  "publisher": "Publisher name",
  "category": "Book category/genre",
  "summary": "Short 1-sentence summary"
}
If a field is not visible, use null. Return ONLY the JSON.`;

      if (isQrMode) {
        promptText = `Analyze this image which should contain a QR code or barcode for a library book. Decode the information and identify the library book title. Return ONLY a JSON object: { "title": "Book Title", "id": "optional match ID" }. If no code is visible, return an object with title: null.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              data: imageData.split(',')[1],
              mimeType: "image/jpeg"
            }
          },
          {
            text: promptText
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text);
      if (result.title) {
        setSearchQuery(result.title);
        const localizedMsg = isQrMode 
          ? `QR Scan Success! Found: ${result.title}. Accessing book... / क्यूआर स्कैन सफल! ${result.title} मिला। / ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಯಶಸ್ವಿಯಾಗಿದೆ! ${result.title} ಸಿಕ್ಕಿದೆ.`
          : `Found: ${result.title} by ${result.author || 'Unknown'} / ${result.title} मिल गया / ${result.title} ಸಿಕ್ಕಿದೆ`;
        setAiResponse(localizedMsg);
        
        if (isQrMode) {
          const book = books.find(b => b.title.toLowerCase().includes(result.title.toLowerCase()) || b.id === result.id);
          if (book) {
            setSelectedBook(book);
          }
        }
      } else {
        setAiResponse("Could not identify the book title. / पुस्तक की पहचान नहीं हो सकी। / ಪುಸ್ತಕದ ಶೀರ್ಷಿಕೆಯನ್ನು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.");
      }
      setIsScannerOpen(false);
    } catch (err) {
      console.error("Scanning Error:", err);
      setAiResponse("Error analyzing image.");
    } finally {
      setIsScanning(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setLastSpeechStatus("Recording Stopped");
      setTimeout(() => setLastSpeechStatus(null), 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Clear previous state before starting
    setAiResponse(null);
    setLastSpeechStatus(null);

    recognition.onstart = () => {
      setIsListening(true);
      setLastSpeechStatus("Listening...");
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript;
      handleVoiceCommand(command);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setLastSpeechStatus("Microphone access denied. Please check site permissions.");
      } else if (event.error !== 'aborted') {
        setLastSpeechStatus(`Speech Error: ${event.error}`);
      }
      setTimeout(() => setLastSpeechStatus(null), 5000);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const bookContext = books.map(b => ({ title: b.title, author: b.author, available: b.available, category: b.category }));
      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Librarian'}: ${m.content}`).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a professional multilingual AI librarian for Laxona Library.
Context:
Current Library Catalog: ${JSON.stringify(bookContext)}
Standard Library Hours: Mon-Fri 8am-8pm, Sat 10am-4pm, Sun Closed.
Standard Loan Period: 14 days.
Late Fines: $0.50 per day.

CRITICAL: You MUST provide your response in three languages: English, Hindi, and Kannada.
Format your response as:
[English Response]
---
[Hindi Translation]
---
[Kannada Translation]

Conversation History:
${chatHistory}

User: ${userMessage}`,
      });

      const aiText = response.text;
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I encountered an error. Please try again in a moment." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRemoveEmployee = (email: string) => {
    if (role !== Role.ADMIN) return;
    
    // Add to blocked list
    const updatedBlocked = [...removedEmails, email];
    setRemovedEmails(updatedBlocked);
    localStorage.setItem('laxona_blocked', JSON.stringify(updatedBlocked));
    
    // Remove from active users
    setActiveUsers(prev => prev.filter(u => u.email !== email));
    
    setAiResponse(`Security Protocol: Access revoked for ${email}. / सुरक्षा प्रोटोकॉल: ${email} के लिए एक्सेस रद्द कर दिया गया है। / ಭದ್ರತಾ ಪ್ರೋಟೋಕಾಲ್: ${email} ಗಾಗಿ ಪ್ರವೇಶವನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ.`);
    setTimeout(() => setAiResponse(null), 5000);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="atmosphere-bg opacity-30" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative glass-card w-full max-w-[900px] flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(224,0,0,0.1)] border border-white/5 rounded-[2.5rem]"
        >
          {/* Left Side - Visual */}
          <div className="w-full md:w-1/2 p-12 bg-gradient-to-br from-primary/20 to-black/80 flex flex-col justify-between border-r border-white/5">
             <div>
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-6">
                  <Library className="text-white" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome to Laxona</h1>
                <p className="text-slate-400 text-sm leading-relaxed">The premier choice for smart library management. Secure, powerful, and intelligent.</p>
             </div>
             <div>
                <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-primary flex items-center justify-center text-white text-xs font-bold">
                    +2k
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Trusted by top academic institutions</p>
             </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-12 flex flex-col">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-1">Account Login</h2>
              <p className="text-slate-500 text-sm">Select your portal and enter details</p>
            </div>

            <LoginForm 
              onLogin={(user) => {
                if (removedEmails.includes(user.email || '')) {
                   alert("ACCESS BLOCKED: Admin has removed your access. / एक्सेस ब्लॉक: एडमिन ने आपका एक्सेस हटा दिया है। / ಪ್ರವೇಶ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ: ನಿರ್ವಾಹಕರು ನಿಮ್ಮ ಪ್ರವೇಶವನ್ನು ತೆಗೆದುಹಾಕಿದ್ದಾರೆ.");
                   return;
                }
                setRole(user.role);
                setSessionUser(user);
                setIsLoggedIn(true);
                setIsTrial(false);
                updateAchievement('1', 0); // Trigger session start
              }}
              onTrial={() => {
                setRole(Role.STUDENT);
                setSessionUser({ name: 'Guest User', role: Role.STUDENT, isTrial: true });
                setIsLoggedIn(true);
                setIsTrial(true);
              }}
            />

            <div className="mt-auto pt-8 flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" />
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Enterprise Encrypted Tunnel</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="atmosphere-bg" />

      {/* Header */}
      <header className="sticky top-0 z-[150] py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleHome}
            className="w-12 h-12 glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all text-[var(--text-secondary)] border border-white/10 rounded-xl group"
            title="Home"
          >
            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-[1px] h-8 bg-white/10 mx-1" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Library className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 
                className="text-3xl font-bold tracking-tight font-lexend bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, var(--title-gradient-from), var(--title-gradient-to))' }}
              >
                Laxona
              </h1>
              <p className="text-[var(--text-secondary)] text-sm">Empowering Knowledge & Innovation</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="glass-card p-1 flex gap-1">
            {[Role.STUDENT, Role.EMPLOYEE, Role.ADMIN].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  role === r 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {r === Role.STUDENT && <UserIcon size={14} />}
                  {r === Role.EMPLOYEE && <Briefcase size={14} />}
                  {r === Role.ADMIN && <Shield size={14} />}
                  {r}
                </span>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 hover:text-white border border-white/10 rounded-xl group"
            title="Settings"
          >
            <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </header>

      {/* Slogan & Category Filters */}
      <div className="mb-10 px-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-xl md:text-2xl font-light text-[var(--text-secondary)] italic">
            “Where Books Meet <span className="text-primary font-medium not-italic">Technology</span>”
          </span>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" />
        </motion.div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAchievementsOpen(true)}
            className="glass-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-yellow-500 hover:bg-yellow-500/5 transition-all flex items-center gap-2 relative border border-white/10 rounded-xl"
            title="Your Achievements"
          >
            <Trophy size={16} className="text-yellow-500" />
            Badges
            {achievements.filter(a => a.unlocked).length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-black text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg border-2 border-[var(--bg-primary)]">
                {achievements.filter(a => a.unlocked).length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsReservedModalOpen(true)}
            className="glass-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all flex items-center gap-2 relative border border-white/10 rounded-xl"
          >
            <BookMarked size={16} className="text-primary" />
            Book Bag
            {reservedBookIds.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-[10px] flex items-center justify-center rounded-full shadow-lg border-2 border-[var(--bg-primary)]">
                {reservedBookIds.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="glass-card p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all flex items-center justify-center relative overflow-hidden group border border-white/10 rounded-xl"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ y: 20, opacity: 0, rotate: 45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: 20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Main Controls & Search Dropdown */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div 
            animate={{ 
              scale: isSearchFocused ? 1.02 : 1,
              boxShadow: isSearchFocused ? '0 0 40px rgba(139, 92, 246, 0.15)' : 'none'
            }}
            className="relative flex-grow transition-all"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              {isAISearching ? (
                <Loader2 className="text-primary animate-spin" size={18} />
              ) : (
                <Search className={`${isSearchFocused ? 'text-primary' : 'text-slate-500'} transition-colors`} size={20} />
              )}
            </div>
            <input
              ref={inputRef}
              id="search-input"
              type="search"
              inputMode="search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search semantically: 'books about coding' or 'java'..."
              className={`glass-input w-full pl-12 pr-12 h-16 text-lg appearance-none transition-all ${
                isSearchFocused ? 'border-primary/50' : ''
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addToHistory(searchQuery)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={startListening}
                className={`p-2 rounded-lg transition-all relative overflow-hidden group ${
                  isListening 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : 'text-slate-500 hover:text-primary hover:bg-white/5'
                }`}
                title={isListening ? "Stop listening" : "Search by voice"}
              >
                {isListening ? (
                  <MicOff size={20} className="relative z-10 animate-pulse" />
                ) : (
                  <Mic size={20} className="relative z-10" />
                )}
                <AnimatePresence>
                  {isListening && (
                    <motion.div
                      layoutId="mic-ripple"
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-red-400 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </button>
              <div className="w-[1px] h-6 bg-white/10 mx-1" />
              <button
                onClick={() => {
                  setIsQrMode(true);
                  setIsScannerOpen(true);
                }}
                className="text-slate-500 hover:text-primary hover:bg-white/5 transition-colors p-2 rounded-lg"
                title="Scan QR to Borrow"
              >
                <QrCode size={20} />
              </button>
              <div className="w-[1px] h-6 bg-white/10 mx-1" />
              <button
                onClick={() => {
                  setIsQrMode(false);
                  setIsScannerOpen(true);
                }}
                className="text-slate-500 hover:text-primary hover:bg-white/5 transition-colors p-2 rounded-lg"
                title="Search by image"
              >
                <Camera size={20} />
              </button>
            </div>
          </motion.div>

          {canManage && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="h-16 px-8 bg-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/80 transition-all shadow-lg shadow-accent/20"
            >
              <Plus size={20} />
              Add New Book
            </button>
          )}
        </div>

        <AnimatePresence>
          {isSearchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-3 p-6 glass-card z-50 shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="mb-6">
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4 flex items-center gap-2">
                  <Layers size={12} /> Browse Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Technology', 'Fiction', 'Science', 'Productivity'].map(cat => (
                    <button
                      key={cat}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur when clicking filter
                        setCategoryFilter(cat);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        categoryFilter === cat 
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                          : 'bg-white/5 border-white/10 text-[var(--text-secondary)] hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {!searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-2">
                        <RotateCw size={12} /> Recent Searches
                      </h4>
                      {searchHistory.length > 0 && (
                        <button 
                          onMouseDown={(e) => { e.preventDefault(); setSearchHistory([]); }}
                          className="text-[10px] text-primary hover:underline font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {searchHistory.length > 0 ? (
                      <div className="space-y-2">
                        {searchHistory.map((h, i) => (
                          <button
                            key={i}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSearchQuery(h);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-[var(--text-secondary)]"
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 italic">No search history yet</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4 flex items-center gap-2">
                      <Library size={12} /> Trending Now
                    </h4>
                    <div className="space-y-2">
                      {books.slice(0, 3).map(b => (
                        <button
                          key={b.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(b.title);
                            addToHistory(b.title);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-8 h-10 rounded bg-slate-800 overflow-hidden flex-shrink-0">
                            <img src={b.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-[var(--text-primary)]">{b.title}</p>
                            <p className="text-[10px] text-slate-500">{b.author}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Availability Filter & Results Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ 
                backgroundColor: role === Role.STUDENT ? '#22c55e' : '#8b5cf6',
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full" 
            />
            <div className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-[var(--text-secondary)]">
              <span>{role} Session</span>
              <span className="mx-2 opacity-30">|</span>
              <span className="text-primary">{filteredBooks.length} Books Found</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
          {['All', 'Available', 'Reserved'].map((status) => (
            <button
              key={status}
              onClick={() => setAvailabilityFilter(status as any)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                availabilityFilter === status 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="glass-card p-4 group hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-slate-800 relative ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500">
                {book.coverImage ? (
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="text-slate-700 w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full backdrop-blur-md ${book.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {book.available ? 'Available' : 'Reserved'}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-primary text-[10px] uppercase tracking-widest font-bold">{book.category}</p>
                <h3 className="font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{book.author}</p>
                <p className="text-[var(--text-secondary)] opacity-60 text-[10px] font-mono mt-2">ISBN: {book.isbn}</p>
              </div>

              {canManage && (
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBook(book);
                      setIsEditModalOpen(true);
                    }}
                    className="flex-grow py-2 rounded-lg bg-white/5 text-white/50 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all"
                  >
                    Edit Details
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(book.id);
                    }}
                    className="p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredBooks.length === 0 && (
          <div className="col-span-full py-24 text-center glass-card border-dashed border-white/5">
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                y: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Library className="mx-auto text-primary/20 w-24 h-24 mb-6" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">No Matching Books Found</h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
              We couldn't find any books matching your search. Try using broader terms or semantic queries like "modern technology books".
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter('All'); setAvailabilityFilter('All'); }}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-[var(--text-primary)] transition-all"
              >
                Clear All Filters
              </button>
              <button 
                onClick={() => setCategoryFilter('Technology')}
                className="px-6 py-2 bg-primary/10 hover:bg-primary/20 rounded-xl text-sm font-bold text-primary transition-all underline decoration-primary/30"
              >
                Browse Technology
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card w-full max-w-lg p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Edit Book Details</h2>
              
              <form onSubmit={handleEditBook} className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-1 block">Book Title</label>
                  <input 
                    required
                    className="glass-input w-full"
                    placeholder="e.g. The Art of War"
                    value={editingBook.title}
                    onChange={e => setEditingBook({...editingBook, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-1 block">Author</label>
                    <input 
                      required
                      className="glass-input w-full"
                      placeholder="Sun Tzu"
                      value={editingBook.author}
                      onChange={e => setEditingBook({...editingBook, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-1 block">Category</label>
                    <input 
                      required
                      className="glass-input w-full"
                      placeholder="Classic"
                      value={editingBook.category}
                      onChange={e => setEditingBook({...editingBook, category: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-1 block">ISBN</label>
                  <input 
                    required
                    className="glass-input w-full"
                    placeholder="13-digit code"
                    value={editingBook.isbn}
                    onChange={e => setEditingBook({...editingBook, isbn: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-1 block">Cover Image URL</label>
                  <input 
                    className="glass-input w-full text-sm"
                    placeholder="https://images.unsplash.com/..."
                    value={editingBook.coverImage}
                    onChange={e => setEditingBook({...editingBook, coverImage: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="edit-available"
                    checked={editingBook.available}
                    onChange={e => setEditingBook({...editingBook, available: e.target.checked})}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                  />
                  <label htmlFor="edit-available" className="text-sm text-[var(--text-secondary)]">Available in Library</label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-all mt-4"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card w-full max-w-lg p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">Register New Book</h2>
              
              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Book Title</label>
                  <input 
                    required
                    className="glass-input w-full"
                    placeholder="e.g. The Art of War"
                    value={newBook.title}
                    onChange={e => setNewBook({...newBook, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Author</label>
                    <input 
                      required
                      className="glass-input w-full"
                      placeholder="Sun Tzu"
                      value={newBook.author}
                      onChange={e => setNewBook({...newBook, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Category</label>
                    <input 
                      required
                      className="glass-input w-full"
                      placeholder="Classic"
                      value={newBook.category}
                      onChange={e => setNewBook({...newBook, category: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">ISBN</label>
                  <input 
                    required
                    className="glass-input w-full"
                    placeholder="13-digit code"
                    value={newBook.isbn}
                    onChange={e => setNewBook({...newBook, isbn: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Cover Image URL (Optional)</label>
                  <input 
                    className="glass-input w-full text-sm"
                    placeholder="https://images.unsplash.com/..."
                    value={newBook.coverImage}
                    onChange={e => setNewBook({...newBook, coverImage: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-all mt-4"
                >
                  <Plus size={20} />
                  Add to Collection
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dashboard Lists Section */}
      <AnimatePresence>
        {(role === Role.EMPLOYEE || role === Role.ADMIN) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 p-8 glass-card border border-white/5 rounded-[2.5rem]"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Users className="text-primary" />
                  {role === Role.ADMIN ? 'User Management' : 'Active Students'}
                </h3>
                <p className="text-slate-500 text-sm mt-1">Real-time oversight of current library inhabitants.</p>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-xl text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                {activeUsers.filter(u => u.isActive).length} Live Now
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeUsers
                .filter(user => role === Role.ADMIN || user.role === Role.STUDENT)
                .map((user) => (
                  <div key={user.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                        </div>
                        {user.isActive && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-primary)]" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{user.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className={`text-[8px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded ${
                             user.role === Role.ADMIN ? 'bg-red-500/20 text-red-500' :
                             user.role === Role.EMPLOYEE ? 'bg-blue-500/20 text-blue-500' :
                             'bg-green-500/20 text-green-500'
                           }`}>
                             {user.role}
                           </span>
                           <span className="text-[10px] text-slate-500">• {user.lastLogin}</span>
                        </div>
                      </div>
                    </div>

                    {role === Role.ADMIN && user.role === Role.EMPLOYEE && (
                      <button 
                        onClick={() => handleRemoveEmployee(user.email)}
                        className="p-2 opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        title="Remove Employee"
                      >
                        <UserX size={16} />
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScannerOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
              onClick={() => setIsScannerOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card w-full max-w-2xl h-full sm:h-auto sm:aspect-video overflow-hidden shadow-2xl flex flex-col border border-white/10 sm:rounded-[2.5rem]"
            >
              <div className="absolute top-6 left-8 z-10">
                <h3 className="text-white text-xl font-bold flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-red-500 animate-pulse' : 'bg-primary'}`} />
                  {scannerMode === 'user' ? 'Take Profile Photo' : (isQrMode ? 'QR Code Scanner' : 'AI Book Identifier')}
                </h3>
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mt-1">
                  {scannerMode === 'user' ? 'Center your face in the frame' : (isQrMode ? 'Place code within guides' : 'Center the book cover')}
                </p>
              </div>

              <button 
                onClick={() => setIsScannerOpen(false)}
                className="absolute top-6 right-8 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex-grow">
                <ScannerView 
                  mode={scannerMode}
                  onCapture={scannerMode === 'user' ? handleProfilePhotoCapture : handleAnalyzeBookCover} 
                  isScanning={isScanning} 
                />
              </div>
              
              {isScanning && (
                <div className="absolute inset-0 z-[600] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-white font-bold text-sm tracking-widest uppercase">Processing...</p>
                   </div>
                </div>
              )}

              {scannerMode === 'environment' && (
                <div className="absolute bottom-10 left-8 z-10">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                    <button 
                      onClick={() => setIsQrMode(false)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${!isQrMode ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      Visual
                    </button>
                    <button 
                      onClick={() => setIsQrMode(true)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${isQrMode ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      QR Code
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedBook(null)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={closeModals}
                className="absolute top-6 right-6 z-10 p-2 glass-card hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isReserved ? (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row w-full"
                  >
                    {/* Cover Image Section */}
                    <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto bg-slate-900 overflow-hidden shrink-0">
                      {selectedBook.coverImage ? (
                        <img 
                          src={selectedBook.coverImage} 
                          alt={selectedBook.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={80} className="text-slate-800" />
                        </div>
                      )}
                    </div>

              {/* Info Section */}
                    <div className="p-8 md:p-12 overflow-y-auto flex-grow flex flex-col">
                      <div className="mb-8">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                          {selectedBook.category}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tighter">{selectedBook.title}</h2>
                        <p className="text-2xl text-slate-400 font-medium">by {selectedBook.author}</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 pb-8 border-b border-white/5">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Status</p>
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${selectedBook.available ? 'bg-green-500' : 'bg-red-500'}`} />
                             <span className={`font-bold text-sm ${selectedBook.available ? 'text-green-400' : 'text-red-400'}`}>
                               {selectedBook.available ? 'Available' : 'Reserved'}
                             </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">ISBN-13</p>
                          <p className="font-mono text-sm text-slate-300 font-bold">{selectedBook.isbn}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Publisher</p>
                          <p className="text-sm text-slate-300 font-bold">{selectedBook.publisher || 'Lumina Press'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Total Pages</p>
                          <p className="text-sm text-slate-300 font-bold">{selectedBook.pages || '240'} Pages</p>
                        </div>
                      </div>

                      <div className="space-y-8 flex-grow">
                        <div>
                           <h4 className="text-sm font-bold text-white mb-3">About this Book</h4>
                           <p className="text-slate-400 leading-relaxed text-lg italic">
                             "{selectedBook.description || 'This book is a significant contribution to its genre, offering deep insights and a compelling narrative that resonates with readers across generations.'}"
                           </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Library Information</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
                             <li className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                               14-day checkout period
                             </li>
                             <li className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                               Digital access permitted
                             </li>
                             <li className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                               Available in Wing {['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}
                             </li>
                             <li className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                               RFID Tagged for security
                             </li>
                          </ul>
                        </div>
                        
                        <div className="flex gap-4 pt-6 mt-auto">
                          {!canManage ? (
                            selectedBook.available ? (
                              <button 
                                onClick={handleReserve}
                                className="flex-grow h-16 bg-primary text-white rounded-2xl font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                              >
                                 <Plus size={24} />
                                 Reserve Now
                              </button>
                            ) : reservedBookIds.includes(selectedBook.id) ? (
                              <button 
                                onClick={() => handleRemoveReservation(selectedBook.id)}
                                className="flex-grow h-16 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-red-500/20"
                              >
                                 <Trash2 size={24} />
                                 Remove Reservation
                              </button>
                            ) : (
                              <button className="flex-grow h-16 bg-white/5 text-slate-500 rounded-2xl font-bold cursor-not-allowed flex items-center justify-center gap-2 text-lg border border-white/5">
                                 <Lock size={20} />
                                 Already Reserved
                              </button>
                            )
                          ) : (
                            <div className="flex gap-2 flex-grow">
                              <button 
                                onClick={() => {
                                  setEditingBook(selectedBook);
                                  setIsEditModalOpen(true);
                                }}
                                className="flex-grow h-12 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                              >
                                 Edit Details
                              </button>
                              <button 
                                onClick={() => {
                                  handleDeleteBook(selectedBook.id);
                                  setSelectedBook(null);
                                }}
                                className="h-12 w-12 bg-danger/20 text-danger rounded-xl font-bold hover:bg-danger hover:text-white transition-all flex items-center justify-center"
                              >
                                 <Trash2 size={20} />
                              </button>
                            </div>
                          )}
                          <button className="p-3 glass-card hover:bg-white/10 transition-all">
                            <ChevronRight size={20} className="rotate-90" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : isReading ? (
                  <motion.div 
                    key="reader"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full p-12 flex flex-col items-center justify-center text-center bg-slate-950"
                  >
                    <BookOpen size={64} className="text-primary mb-6 animate-pulse" />
                    <h2 className="text-4xl font-serif mb-4">Reading: {selectedBook.title}</h2>
                    <div className="w-full max-w-2xl bg-white/5 p-8 rounded-2xl text-left font-serif text-slate-300 space-y-6 overflow-y-auto max-h-[50vh]">
                      <p className="text-2xl first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                        It was the best of times, it was the worst of times...
                      </p>
                      <p>Entering digital reading mode. This environment provides full access to Lumina's digital catalog. You can use the buttons below to navigate pages.</p>
                      <p>Page 1 of 320</p>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button className="px-8 h-12 glass-card hover:bg-white/10">Previous</button>
                      <button className="px-8 h-12 bg-primary text-white rounded-xl font-bold">Next Page</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full p-12 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <ChevronRight className="text-green-500 w-10 h-10 rotate-90" />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">Reservation Confirmed</h2>
                    <p className="text-slate-400 mb-10">Lumina Reservation Document #LM-{(Math.random() * 10000).toFixed(0)}</p>

                    <div className="w-full max-w-md glass-card p-6 border-dashed border-white/20 relative mb-10">
                      <div className="flex gap-4 items-center text-left">
                        <img src={selectedBook.coverImage} className="w-20 h-28 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Book Details</p>
                          <h3 className="font-bold text-lg">{selectedBook.title}</h3>
                          <p className="text-slate-400 text-sm">{selectedBook.author}</p>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Expiry Date</p>
                          <p className="text-sm font-medium">May 26, 2026</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Location</p>
                          <p className="text-sm font-medium">Digital Access / Wing A</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full max-w-xs">
                      <button 
                        onClick={handleStartReading}
                        className="h-14 bg-accent text-white rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-2"
                      >
                         <BookOpen size={20} />
                         Open
                      </button>
                      <button 
                        onClick={closeModals}
                        className="h-12 text-slate-400 hover:text-white transition-colors"
                      >
                        Back to Library
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Voice Assistant Status Display */}
      <div className="fixed bottom-24 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
        <AnimatePresence>
          {(isListening || lastSpeechStatus || aiResponse) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, y: 10, filter: 'blur(10px)' }}
              className={`px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-2xl border pointer-events-auto min-w-[280px] max-w-[400px] ${
                isListening 
                  ? 'bg-red-500/10 border-red-500/20 shadow-red-500/20' 
                  : 'bg-primary/10 border-white/10 shadow-primary/20'
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isListening ? 'bg-red-500 text-white ai-glow' : 'bg-primary text-white'
                    }`}>
                      {isListening ? <Mic size={18} /> : <Volume2 size={18} />}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-[var(--text-primary)]">
                        {isListening ? 'AI Voice Mode' : 'AI Assistant'}
                      </p>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">
                        {isListening ? 'Listening...' : (lastSpeechStatus || 'Assistant Ready')}
                      </h4>
                    </div>
                  </div>
                  {isListening && (
                    <div className="font-mono text-xs font-bold text-red-500 bg-red-500/20 px-2 py-1 rounded-lg">
                      {formatTime(recordingTime)}
                    </div>
                  )}
                </div>

                {isListening && (
                  <div className="h-4 flex items-center justify-center gap-1.5">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: [4, 16, 4],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.6, 
                          delay: i * 0.05 
                        }}
                        className="w-1 bg-red-500 rounded-full"
                      />
                    ))}
                  </div>
                )}

                {aiResponse && !isListening && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed italic whitespace-pre-line"
                  >
                    "{aiResponse}"
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Settings Modal */}

      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl h-[85vh] glass-card overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-[0_0_100px_rgba(239,68,68,0.15)]"
            >
              {/* Settings Sidebar */}
              <div className="w-full md:w-72 bg-black/40 border-r border-white/5 p-6 flex flex-col h-auto md:h-full overflow-y-auto">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Settings className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Settings</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Laxona Center</p>
                  </div>
                </div>

                 <nav className="space-y-2 flex-grow">
                   {[
                     { id: 'profile', label: 'Profile Settings', icon: <UserIcon size={18} /> },
                     { id: 'security', label: 'Security', icon: <Lock size={18} /> },
                     { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, hidden: role !== Role.STUDENT },
                     { id: 'language', label: 'Language', icon: <Languages size={18} /> },
                     { id: 'preferences', label: 'Reading Preferences', icon: <Heart size={18} />, hidden: role !== Role.STUDENT },
                     { id: 'scanner', label: 'QR Scanner Settings', icon: <QrCode size={18} />, hidden: role !== Role.STUDENT },
                     { id: 'achievements', label: 'Achievements', icon: <Award size={18} />, hidden: role !== Role.STUDENT },
                     { id: 'system_ops', label: 'System Controls', icon: <ShieldCheck size={18} />, hidden: role !== Role.ADMIN },
                     { id: 'reports', label: 'Reports & Analytics', icon: <Plus size={18} />, hidden: role !== Role.ADMIN },
                     { id: 'privacy', label: 'Data & Privacy', icon: <Shield size={18} /> },
                     { id: 'about', label: 'About Laxona', icon: <Info size={18} /> },
                   ].filter(tab => !tab.hidden).map((tab) => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveSettingsTab(tab.id)}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                         activeSettingsTab === tab.id 
                           ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                           : 'text-slate-400 hover:text-white hover:bg-white/5'
                       }`}
                     >
                       {tab.icon}
                       {tab.label}
                     </button>
                   ))}
                 </nav>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => {
                      setIsSettingsOpen(false);
                      setIsLoggedIn(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                  >
                    <LogOut size={18} />
                    Logout & Portal
                  </button>
                </div>

              </div>

              {/* Settings Content Area */}
              <div className="flex-grow flex flex-col h-full bg-slate-950/20">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white capitalize">{activeSettingsTab.replace('_', ' ')}</h3>
                  <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                    <X size={22} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 lg:p-12">
                  <AnimatePresence mode="wait">
                    {activeSettingsTab === 'profile' && (
                      <motion.div 
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-8"
                      >
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                          <div className="relative group">
                            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-primary/50 flex items-center justify-center overflow-hidden ring-4 ring-primary/10">
                              {profilePic ? (
                                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <UserIcon size={40} className="text-slate-400" />
                              )}
                            </div>
                            <button 
                              onClick={() => setIsPhotoSheetOpen(true)}
                              className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                              <Camera size={14} />
                            </button>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileChange} 
                              accept="image/*" 
                              className="hidden" 
                            />
                          </div>
                          <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold text-white capitalize">{role} User Profile</h4>
                            <p className="text-sm text-slate-500">Update your personal photo and {role}-specific library settings.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                            <input type="text" className="glass-input w-full" defaultValue={role === Role.STUDENT ? "Savitri Kotabagi" : role === Role.EMPLOYEE ? "John Librarian" : "Super Admin"} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                            <input type="email" className="glass-input w-full" defaultValue={role === Role.STUDENT ? "savitrikotabagi494@gmail.com" : role === Role.EMPLOYEE ? "employee@laxona.edu" : "admin@laxona.edu"} />
                          </div>
                          
                          {role === Role.STUDENT && (
                            <>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Course / Department</label>
                                <input type="text" className="glass-input w-full" defaultValue="Computer Science Engineering" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student ID</label>
                                <input type="text" className="glass-input w-full bg-slate-900/50 cursor-not-allowed" value="STU-2026-081" readOnly />
                              </div>
                            </>
                          )}

                          {role === Role.EMPLOYEE && (
                            <>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Designation</label>
                                <input type="text" className="glass-input w-full" defaultValue="Senior Librarian" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Staff ID</label>
                                <input type="text" className="glass-input w-full bg-slate-900/50 cursor-not-allowed" value="EMP-L-442" readOnly />
                              </div>
                            </>
                          )}

                          {role === Role.ADMIN && (
                            <>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Access Level</label>
                                <input type="text" className="glass-input w-full bg-slate-900/50 cursor-not-allowed" value="Root Administrator" readOnly />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Admin Token</label>
                                <input type="text" className="glass-input w-full bg-slate-900/50 cursor-not-allowed" value="LXN-SECURE-882" readOnly />
                              </div>
                            </>
                          )}
                        </div>

                        {/* Role Specific Stats Section */}
                        <div className="mt-8 p-6 glass-card border border-white/5 bg-white/[0.02] rounded-3xl">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            {role === Role.STUDENT ? "My Borrowing Status" : role === Role.EMPLOYEE ? "Duty Overview" : "System Health"}
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {role === Role.STUDENT && (
                              <>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                  <p className="text-xl font-bold text-white">4</p>
                                  <p className="text-[10px] text-slate-500 uppercase">Borrowed</p>
                                </div>
                                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/10 text-center">
                                  <p className="text-xl font-bold text-red-500">1</p>
                                  <p className="text-[10px] text-red-500/60 uppercase">Overdue</p>
                                </div>
                                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/10 text-center">
                                  <p className="text-xl font-bold text-green-500">₹0</p>
                                  <p className="text-[10px] text-green-500/60 uppercase">Fines</p>
                                </div>
                              </>
                            )}
                            {role === Role.EMPLOYEE && (
                              <>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                  <p className="text-xl font-bold text-white">128</p>
                                  <p className="text-[10px] text-slate-500 uppercase">Issues Handled</p>
                                </div>
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/10 text-center">
                                  <p className="text-xl font-bold text-primary">12</p>
                                  <p className="text-[10px] text-primary/60 uppercase">Pen. Approvals</p>
                                </div>
                                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/10 text-center">
                                  <p className="text-xl font-bold text-blue-500">8h</p>
                                  <p className="text-[10px] text-blue-500/60 uppercase">Today Shift</p>
                                </div>
                              </>
                            )}
                            {role === Role.ADMIN && (
                              <>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                  <p className="text-xl font-bold text-white">1.2k</p>
                                  <p className="text-[10px] text-slate-500 uppercase">Total Users</p>
                                </div>
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/10 text-center">
                                  <p className="text-xl font-bold text-primary">99.9%</p>
                                  <p className="text-[10px] text-primary/60 uppercase">Uptime</p>
                                </div>
                                <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/10 text-center">
                                  <p className="text-xl font-bold text-yellow-500">22</p>
                                  <p className="text-[10px] text-yellow-500/60 uppercase">System Alerts</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="pt-6">
                          <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Save Changes
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'security' && (
                      <motion.div 
                        key="security"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-8"
                      >
                        <div className="space-y-6">
                          <div className="p-6 glass-card border border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Lock size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-white">Change Password</h4>
                                <p className="text-xs text-slate-500">Update your account password regularly.</p>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                          </div>

                          <div className="p-6 glass-card border border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Smartphone size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                                <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                              </div>
                            </div>
                            <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full shadow-sm" />
                            </div>
                          </div>

                          <div className="p-6 glass-card border border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-500">
                                <Shield size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-white">Session History</h4>
                                <p className="text-xs text-slate-500">View and manage all active sessions.</p>
                              </div>
                            </div>
                            <button className="text-[10px] text-primary font-bold uppercase tracking-wider py-1 px-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">View All</button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'notifications' && (
                      <motion.div 
                        key="notifications"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-6"
                      >
                        {[
                          { title: 'Due Date Alerts', desc: 'Get notified when a book is due in 48 hours.', enabled: true },
                          { title: 'New Arrival Notifications', desc: 'Notification for books in your favorite genres.', enabled: false },
                          { title: 'Library Announcements', desc: 'Updates about hours, events, and maintenance.', enabled: true },
                          { title: 'Fine Reminders', desc: 'Daily alerts for overdue items with active fines.', enabled: true },
                          { title: 'Reservation Ready', desc: 'Alert when a reserved physical book is available.', enabled: true },
                        ].map((n, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/50 group-hover:text-primary transition-colors">
                                <Bell size={18} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{n.title}</h4>
                                <p className="text-xs text-slate-500">{n.desc}</p>
                              </div>
                            </div>
                            <div className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${n.enabled ? 'bg-primary' : 'bg-slate-800'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${n.enabled ? 'right-1' : 'left-1'}`} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeSettingsTab === 'language' && (
                      <motion.div 
                        key="language"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-8"
                      >
                        <div className="flex flex-col gap-6">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             <Globe size={14} /> System Interface Language
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { label: 'English (US)', flag: '🇺🇸', sub: 'Global Standard' },
                              { label: 'हिन्दी (Hindi)', flag: '🇮🇳', sub: 'प्रशासनिक विकल्प' },
                              { label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', sub: 'ಪ್ರಸಾದಿತ ಭಾಷೆ' },
                              { label: 'Spanish (ESP)', flag: '🇪🇸', sub: 'Coming Soon', disabled: true },
                            ].map((l, i) => (
                              <button key={i} className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                                i === 0 ? 'bg-primary/10 border-primary text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                              } ${l.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
                                <div className="flex items-center gap-4">
                                  <span className="text-2xl">{l.flag}</span>
                                  <div>
                                    <p className="font-bold text-sm">{l.label}</p>
                                    <p className="text-[10px] text-slate-500 font-medium">{l.sub}</p>
                                  </div>
                                </div>
                                {i === 0 && <CheckCircle2 size={16} className="text-primary" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'preferences' && (
                      <motion.div 
                        key="preferences"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-8"
                      >
                        <div className="space-y-8">
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Favorite Research Genres</label>
                            <div className="flex flex-wrap gap-2">
                              {['Technology', 'Science Fiction', 'Cybersecurity', 'AI & Machine Learning', 'UI/UX Design', 'Entrepreneurship', 'Quantum Physics', 'Software Engineering'].map((g, i) => (
                                <button key={i} className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                                  [0, 1, 3, 5].includes(i) ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10'
                                }`}>
                                  {g}
                                </button>
                              ))}
                              <button className="px-5 py-2 rounded-full text-xs font-bold bg-white/5 border border-dashed border-white/20 text-slate-600 hover:text-white hover:border-white/40 transition-all">
                                + Add More
                              </button>
                            </div>
                          </div>

                          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Sun size={16} className="text-primary" /> AI Smart Recommendations
                              </h4>
                              <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Allow our advanced library AI to analyze your borrowing history to suggest books tailored specially to your interests.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'scanner' && (
                      <motion.div 
                        key="scanner"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-8"
                      >
                         <div className="space-y-6">
                          <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Smartphone size={18} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">Full Resolution Processing</h4>
                                <p className="text-xs text-slate-500">Scan book covers at highest available quality.</p>
                              </div>
                            </div>
                            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <QrCode size={18} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">Immediate Borrow Action</h4>
                                <p className="text-xs text-slate-500">Automatically reserve book after a successful QR scan.</p>
                              </div>
                            </div>
                            <div className="w-11 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                          </div>

                          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Default Scan Mode</label>
                            <div className="flex gap-2">
                              {['Auto', 'Visual', 'Classic'].map(opt => (
                                <button key={opt} className={`flex-grow py-3 rounded-xl text-xs font-bold border transition-all ${
                                  opt === 'Auto' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'
                                }`}>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                         </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'achievements' && (
                       <motion.div 
                        key="achievements"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-6"
                       >
                        <div className="p-10 rounded-[2rem] bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/10 text-center flex flex-col items-center">
                          <div className="w-20 h-20 rounded-3xl bg-yellow-500 flex items-center justify-center shadow-2xl shadow-yellow-500/40 mb-8 relative">
                             <Trophy size={40} className="text-black" />
                             <motion.div 
                              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute inset-0 bg-yellow-500 rounded-3xl"
                             />
                          </div>
                          <h4 className="text-3xl font-bold text-white mb-3">Gamify Your Library</h4>
                          <p className="text-slate-400 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                            Complete reading challenges, use search features, and explore new categories to unlock premium badges.
                          </p>
                          <button 
                            onClick={() => { setIsSettingsOpen(false); setIsAchievementsOpen(true); }}
                            className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all text-sm shadow-xl shadow-white/5"
                          >
                            Explore Badges
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'privacy' && (
                      <motion.div 
                        key="privacy"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl space-y-10"
                      >
                        <div className="space-y-6">
                          <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative overflow-hidden group">
                            <div className="relative z-10">
                              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                <ShieldCheck size={24} className="text-primary" /> Data Residency
                              </h4>
                              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                Laxona uses distributed cloud systems to ensure your reading data is encrypted and geographically distributed for maximum safety.
                              </p>
                              <div className="flex gap-4">
                                <button className="text-xs text-primary font-bold hover:underline">Privacy Policy</button>
                                <button className="text-xs text-primary font-bold hover:underline">Data Usage Log</button>
                              </div>
                            </div>
                            <Shield className="absolute -bottom-10 -right-10 text-white/[0.02] w-64 h-64 group-hover:scale-110 transition-transform duration-1000" />
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1 h-4 bg-red-500 rounded-full" />
                              <h4 className="text-[10px] uppercase font-bold text-red-500 tracking-widest">Account Management</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <button className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-left group hover:bg-red-600 transition-all overflow-hidden relative">
                                <div className="relative z-10">
                                  <h5 className="font-bold text-red-500 group-hover:text-white transition-colors flex items-center gap-2 mb-1">
                                    <Trash size={16} /> Clear History
                                  </h5>
                                  <p className="text-[10px] text-red-500/60 group-hover:text-white/70">Wipe all search results and logs.</p>
                                </div>
                              </button>
                              <button className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-left group hover:bg-red-600 transition-all overflow-hidden relative">
                                <div className="relative z-10">
                                  <h5 className="font-bold text-red-500 group-hover:text-white transition-colors flex items-center gap-2 mb-1">
                                    <X size={16} /> Delete Account
                                  </h5>
                                  <p className="text-[10px] text-red-500/60 group-hover:text-white/70">Remove profile permanently from Laxona.</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSettingsTab === 'about' && (
                      <motion.div 
                        key="about"
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl text-center space-y-12 py-10"
                      >
                         <div className="flex flex-col items-center">
                            <motion.div 
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(239,68,68,0.3)] mb-8"
                            >
                              <Library size={48} className="text-white" />
                            </motion.div>
                            <h2 className="text-5xl font-bold tracking-tighter text-white mb-2">Laxona Center</h2>
                            <p className="text-sm text-slate-500 font-mono tracking-widest uppercase">Professional Edition v2.8.4</p>
                         </div>

                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-2">Developer</p>
                              <p className="text-sm text-white font-bold">SAV TRI</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-2">Intelligence</p>
                              <p className="text-sm text-white font-bold">Gemini 3.0</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-2">Status</p>
                              <p className="text-sm text-green-500 font-bold">Enterprise</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-2">Update</p>
                              <p className="text-sm text-white font-bold">May 2026</p>
                            </div>
                         </div>

                         <div className="max-w-lg mx-auto space-y-4">
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Laxona is redefining the digital library experience. Our mission is to democratize knowledge through seamless AI integration and world-class user experiences.
                            </p>
                            <div className="flex justify-center gap-6">
                              <button className="text-xs text-primary font-bold hover:underline">System Status</button>
                              <button className="text-xs text-primary font-bold hover:underline">Contributors</button>
                              <button className="text-xs text-primary font-bold hover:underline">GitHub Pro</button>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Photo Bottom Sheet */}
      <AnimatePresence>
        {isPhotoSheetOpen && (
          <div className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhotoSheetOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-[var(--bg-primary)] rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="p-1 my-2 mx-auto w-10 h-1.5 bg-white/20 rounded-full sm:hidden" />
              <div className="p-6 pb-8 space-y-3">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white">Change Profile Photo</h3>
                  <p className="text-xs text-slate-500">Update how you appear to librarians</p>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        setScannerMode('user');
                        setIsScannerOpen(true);
                        setIsPhotoSheetOpen(false);
                      } else {
                        alert("Camera not supported on this device.");
                      }
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Camera size={20} />
                    </div>
                    <span className="font-bold text-sm">Open Camera</span>
                  </button>

                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <ImageIcon size={20} />
                    </div>
                    <span className="font-bold text-sm">Choose from Gallery</span>
                  </button>

                  <button 
                    onClick={handleBrowserSearch}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                      <Chrome size={20} />
                    </div>
                    <span className="font-bold text-sm">Search on Browser</span>
                  </button>
                </div>

                <button 
                  onClick={() => setIsPhotoSheetOpen(false)}
                  className="w-full mt-4 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Achievements Modal */}
      <AnimatePresence>
        {isAchievementsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAchievementsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-card overflow-hidden flex flex-col max-h-[85vh] border border-white/10"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-yellow-500/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <Trophy className="text-black" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Reading Achievements</h2>
                    <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest">Level Up Your Knowledge</p>
                  </div>
                </div>
                <button onClick={() => setIsAchievementsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((a) => (
                    <motion.div
                      key={a.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-2xl border transition-all relative overflow-hidden group ${
                        a.unlocked 
                          ? 'bg-white/5 border-yellow-500/30' 
                          : 'bg-white/[0.02] border-white/5 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`text-4xl filter drop-shadow-lg ${a.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                          {a.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-bold ${a.unlocked ? 'text-white' : 'text-slate-400'}`}>{a.name}</h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              a.level === 'Gold' ? 'bg-yellow-500/20 text-yellow-500' :
                              a.level === 'Silver' ? 'bg-slate-300/20 text-slate-300' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {a.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">{a.description}</p>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                              <span className={a.unlocked ? 'text-yellow-500' : 'text-slate-600'}>
                                {a.unlocked ? 'Achievement Unlocked' : 'In Progress'}
                              </span>
                              <span className="text-slate-500">{a.progress}/{a.maxProgress}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(a.progress / a.maxProgress) * 100}%` }}
                                className={`h-full ${a.unlocked ? 'bg-yellow-500' : 'bg-primary'}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {a.unlocked && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 size={14} className="text-yellow-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/20 relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl relative">
                      <Award className="text-white" size={40} />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-white mb-2">Unlock More Rewards</h4>
                      <p className="text-sm text-slate-400">Every reservation and search adds to your rank. Become a Legendary Librarian!</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-8 text-primary/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Trophy size={160} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[90] pointer-events-none"
        />
      )}

      {/* AI Librarian Chatboard */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              className="pointer-events-auto w-80 md:w-96 glass-card shadow-2xl flex flex-col overflow-hidden mb-4 border border-white/10"
              style={{ maxHeight: '500px' }}
            >
              {/* Chat Header */}
              <div className="p-4 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <UserIcon size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI Librarian</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-950/40">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-200 rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-slate-400 px-4 py-2 rounded-2xl rounded-tl-none text-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Librarian is typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form 
                onSubmit={handleSendChatMessage}
                className="p-3 bg-white/5 border-t border-white/5 flex gap-2"
              >
                <input 
                  type="text"
                  placeholder="Ask a question..."
                  className="bg-transparent text-sm text-white flex-grow focus:outline-none px-2 h-10"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    chatInput.trim() && !isChatLoading 
                      ? 'bg-primary text-white hover:scale-105' 
                      : 'bg-white/5 text-slate-600'
                  }`}
                >
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isChatOpen ? 'bg-primary shadow-primary/50 rotate-90' : 'bg-accent shadow-accent/50'
          }`}
        >
          {isChatOpen ? (
            <X className="text-white w-7 h-7" />
          ) : (
            <MessageSquare className="text-white w-7 h-7" />
          )}
        </motion.button>
      </div>

      {/* Reserved Books Portal */}
      <AnimatePresence>
        {isReservedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservedModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-card w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layers className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold">My Reserved Books</h2>
                </div>
                <button 
                  onClick={() => setIsReservedModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6">
                {reservedBookIds.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <BookOpen size={48} className="text-slate-800 mb-4" />
                    <p className="text-slate-500">You haven't reserved any books yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {books.filter(b => reservedBookIds.includes(b.id)).map(book => (
                      <div key={book.id} className="glass-card p-4 flex gap-4 items-center group">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-16 h-24 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
                          <p className="text-slate-400 text-sm">{book.author}</p>
                          <div className="flex gap-2 mt-2">
                             <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                               Digital Access
                             </span>
                             <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                               Verified
                             </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              setSelectedBook(book);
                              setIsReservedModalOpen(false);
                            }}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                          <button 
                            onClick={() => handleRemoveReservation(book.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/50 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <p className="text-xs text-slate-500 italic">Reserved items are held for 48 hours for physical pickup or available instantly for digital reading.</p>
                <button 
                  onClick={() => setIsReservedModalOpen(false)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-slate-500 text-sm">
        <p>© 2026 Lumina Library Management System. Professional Campus Edition.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Usage Guidelines</a>
          <a href="#" className="hover:text-white transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
