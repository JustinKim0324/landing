import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Target, Users, CheckCircle, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: '10초 간편 조회',
      description: '복잡한 절차 없이 간단한 정보만으로 빠르게 확인',
      color: 'blue'
    },
    {
      icon: Lock,
      title: '안전한 정보보호',
      description: '모든 개인정보는 암호화되어 안전하게 보관 후 즉시 폐기',
      color: 'green'
    },
    {
      icon: Target,
      title: '맞춤형 제도 추천',
      description: '나의 상황에 딱 맞는 정부 지원제도를 찾아드립니다',
      color: 'purple'
    },
    {
      icon: Users,
      title: '전문가 상담',
      description: '법무법인 소속 전문가가 친절하게 상담해드립니다',
      color: 'orange'
    },
    {
      icon: CheckCircle,
      title: '정부 공인 제도',
      description: '국가에서 인정한 공식 채무조정 프로그램',
      color: 'red'
    },
    {
      icon: Zap,
      title: '빠른 처리',
      description: '신청부터 승인까지 최단기간 내 진행',
      color: 'indigo'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            왜 우리 서비스를 선택해야 할까요?
          </h2>
          <p className="section-subtitle">
            간단하고 안전하게, 당신의 새 출발을 응원합니다
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${getColorClasses(feature.color)} mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            이용 절차
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '정보 입력', desc: '간단한 정보 입력' },
              { step: '02', title: '제도 조회', desc: '맞춤 제도 확인' },
              { step: '03', title: '전문가 상담', desc: '무료 상담 진행' },
              { step: '04', title: '신청 완료', desc: '빠른 처리 시작' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl font-bold text-blue-100 opacity-50">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4 font-bold">
                      {item.step}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">→</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
