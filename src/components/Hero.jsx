import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Award, Scale, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6"
          >
            <Scale className="w-4 h-4" />
            <span className="text-sm font-semibold">법무법인 선인파트너스 산재특화센터</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              산재 승인
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="block"
            >
              거부당하셨나요?
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              포기하지 마세요
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-3xl text-gray-700 font-semibold mb-4"
          >
            5년 이상 근무 → 승인 가능성 <span className="text-accent-600">85%</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            <span className="text-accent-600 font-semibold">전문가 상담으로 승인 여부를 확인하세요</span>
            <br />
            15년 전문 경력의 변호사·노무사가 함께합니다
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-accent-600" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">15년</p>
              <p className="text-sm text-gray-600">전문 경력</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">변호사</p>
              <p className="text-sm text-gray-600">+노무사</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">24시간</p>
              <p className="text-sm text-gray-600">접수 가능</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="btn-primary text-lg md:text-xl inline-flex items-center gap-2"
          >
            💬 무료 상담 신청하기
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-4 text-sm text-gray-500"
          >
            ⚠️ 산재 신청 기한은 <strong className="text-red-600">3년</strong>입니다. 시효 만료 전 지금 바로 상담받으세요
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
