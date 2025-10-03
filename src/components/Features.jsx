import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Target, Users, CheckCircle, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: '변호사 + 노무사',
      description: '변호사와 공인노무사가 함께 사건을 진행합니다',
      color: 'blue'
    },
    {
      icon: Target,
      title: '15년 전문 경력',
      description: '산재 분야만 전문으로 15년간 연구해왔습니다',
      color: 'green'
    },
    {
      icon: CheckCircle,
      title: '높은 승인율',
      description: '체계적인 사건 관리로 높은 승인율을 자랑합니다',
      color: 'purple'
    },
    {
      icon: Zap,
      title: '성공보수제',
      description: '승인 전까지 비용 부담 없이 안심하고 진행하실 수 있습니다',
      color: 'orange'
    },
    {
      icon: Clock,
      title: '24시간 상담 접수',
      description: '언제든지 편하신 시간에 상담을 신청하실 수 있습니다',
      color: 'red'
    },
    {
      icon: Lock,
      title: '비밀 보장',
      description: '모든 상담 내용은 철저히 비밀로 보장됩니다',
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
            법무법인 선인파트너스 산재路를 선택해야 하는 이유
          </h2>
          <p className="section-subtitle">
            산재 전문가와 함께라면 승인 가능성이 높아집니다
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
            산재 승인까지 프로세스
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '무료 상담 신청', desc: '홈페이지 또는 전화 상담' },
              { step: '02', title: '사건 분석', desc: '승인 가능성 검토' },
              { step: '03', title: '서류 준비', desc: '전문가가 직접 작성' },
              { step: '04', title: '승인 완료', desc: '보상금 지급까지' }
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
