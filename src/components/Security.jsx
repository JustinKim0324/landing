import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck, Award, CheckCircle2 } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: '산재보험 공단 인정',
      description: '근로복지공단이 인정하는 정식 법무법인입니다'
    },
    {
      icon: Lock,
      title: '비밀 보장',
      description: '모든 상담 내용은 철저히 비밀로 보장되며 외부 유출되지 않습니다'
    },
    {
      icon: Eye,
      title: '투명한 진행',
      description: '사건 진행 상황을 실시간으로 투명하게 공유해드립니다'
    },
    {
      icon: FileCheck,
      title: '법무법인 운영',
      description: '변호사와 공인노무사가 함께하는 전문 법무법인입니다'
    }
  ];

  const badges = [
    { icon: Award, text: '15년 전문 경력' },
    { icon: Shield, text: '비밀 보장' },
    { icon: CheckCircle2, text: '무료 상담' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.5) 35px, rgba(59, 130, 246, 0.5) 70px)`
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">법무법인 선인파트너스 산재路</span>
          </div>
          <h2 className="section-title">
            산재 승인 거부, <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              포기하지 마세요!
            </span>
          </h2>
          <p className="section-subtitle">
            15년 경력의 전문가가 함께하면 승인 가능성이 높아집니다
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200"
              >
                <Icon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Reassurance Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            산재 승인 거부, 보상금 부족으로 고민이신가요?
          </h3>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            변호사·노무사가 함께하는<br className="md:hidden" />
            산재 전문 법무법인이 도와드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span>무료 상담</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span>성공보수제</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span>높은 승인율</span>
            </div>
          </div>
        </motion.div>

        {/* Final Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ⚖️ 산재路가 함께합니다 ⚖️
          </p>
          <p className="text-lg text-gray-600">
            지금 바로 무료 상담으로 정확한 진단을 받아보세요
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
