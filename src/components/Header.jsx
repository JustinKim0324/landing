import React from 'react';
import { Scale } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Scale className="w-7 h-7 text-blue-600" />
            <span className="text-gray-900">산재路</span>
          </div>
        </div>

        {/* Right: Company Name */}
        <div className="text-right">
          <p className="text-sm md:text-base font-semibold text-gray-700">
            법무법인 선인파트너스
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            산재특화센터
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
