import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, User, Phone, DollarSign, Calendar, CheckCircle } from 'lucide-react';

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Here you would normally send data to your backend
    setSubmitted(true);
    reset();
    
    // Reset submitted state after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="lead-form" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            무료 상담 신청<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              지금 바로 전문가와 상담하세요
            </span>
          </h2>
          <p className="section-subtitle">
            간단한 정보만으로 30초 안에 상담 신청 가능합니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  이름
                </label>
                <input
                  {...register('name', { 
                    required: '이름을 입력해주세요',
                    minLength: { value: 2, message: '최소 2글자 이상 입력해주세요' }
                  })}
                  type="text"
                  placeholder="홍길동"
                  className={`w-full px-4 py-4 rounded-xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-500 focus:outline-none transition-colors text-lg`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  연락처
                </label>
                <input
                  {...register('phone', { 
                    required: '연락처를 입력해주세요',
                    pattern: {
                      value: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
                      message: '올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)'
                    }
                  })}
                  type="tel"
                  placeholder="010-1234-5678"
                  className={`w-full px-4 py-4 rounded-xl border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-500 focus:outline-none transition-colors text-lg`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Injury Type Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  산재 유형 (선택)
                </label>
                <select
                  {...register('injuryType')}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="musculoskeletal">근골격계 질환</option>
                  <option value="cerebrovascular">뇌심혈관계 질환</option>
                  <option value="mental_illness">정신질환</option>
                  <option value="occupational_cancer">직업성 암</option>
                  <option value="respiratory_disease">호흡기 질환</option>
                  <option value="accident">업무상 사고</option>
                  <option value="commute">출퇴근 재해</option>
                  <option value="other">기타</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  현재 상황 (선택)
                </label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="rejected">산재 승인 거부됨</option>
                  <option value="insufficient">보상금이 부족함</option>
                  <option value="considering">산재 신청 고민 중</option>
                  <option value="grade_dispute">장해등급 불만족</option>
                  <option value="other">기타 상담</option>
                </select>
              </div>

              {/* Privacy Agreement */}
              <div className="bg-blue-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('privacy', { required: '개인정보 처리방침에 동의해주세요' })}
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                    <br />
                    <span className="text-xs text-gray-500">
                      입력하신 정보는 상담 목적으로만 사용되며, 상담 후 안전하게 폐기됩니다.
                    </span>
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-red-500 text-sm mt-2 ml-8">{errors.privacy.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary text-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                💬 무료 상담 신청하기
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                ※ 상담은 무료이며, 24시간 접수 가능합니다. 전문가가 빠르게 연락드립니다
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                상담 신청이 완료되었습니다!
              </h3>
              <p className="text-lg text-gray-600 mb-2">
                산재 전문 노무사·변호사가 빠르게 연락드리겠습니다.
              </p>
              <p className="text-sm text-gray-500">
                24시간 접수 가능 | 영업시간: 평일 09:00 - 18:00
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>SSL 보안 연결로 안전하게 보호됩니다</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
