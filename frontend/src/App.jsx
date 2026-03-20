import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import LostAndFound from './pages/LostAndFound';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Wrapped routes */}
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/notices" element={<Layout><Notices /></Layout>} />
        <Route path="/lost-and-found" element={<Layout><LostAndFound /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
