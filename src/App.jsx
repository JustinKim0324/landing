import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import Security from './components/Security';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <Features />
      <Security />
      <LeadForm />
      <Footer />
    </div>
  );
}

export default App;
