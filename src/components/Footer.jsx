import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">법무법인 선인파트너스</h3>
            <p className="text-blue-400 font-semibold mb-6">산재路 산재특화센터</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">상호명</p>
                  <p className="text-white font-semibold">법무법인 선인파트너스</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">전문 분야</p>
                  <p className="text-white font-semibold">산재 전문 (15년 경력)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">사업장 소재지</p>
                  <p className="text-white">서울특별시 강남구</p>
                  <p className="text-white">선인빌딩 12층</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">연락처</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">상담 전화</p>
                  <a href="tel:02-1234-5678" className="text-white font-semibold hover:text-blue-400 transition-colors text-xl">
                    02-1234-5678
                  </a>
                  <p className="text-green-400 text-sm mt-1">📞 24시간 상담 접수</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">이메일</p>
                  <a href="mailto:contact@seonin-law.com" className="text-white font-semibold hover:text-blue-400 transition-colors">
                    contact@seonin-law.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">영업시간</p>
                  <p className="text-white">평일 09:00 - 18:00</p>
                  <p className="text-green-400 text-sm">24시간 접수 가능</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-gray-700 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">사업자등록번호:</span>
              <span className="text-white ml-2">123-45-67890</span>
            </div>
            <div>
              <span className="text-gray-400">통신판매업신고:</span>
              <span className="text-white ml-2">제2024-서울강남-1234호</span>
            </div>
            <div>
              <span className="text-gray-400">광고책임자:</span>
              <span className="text-white ml-2">홍길동</span>
            </div>
            <div>
              <span className="text-gray-400">개인정보보호책임자:</span>
              <span className="text-white ml-2">김철수</span>
            </div>
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            이용약관
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="text-sm text-white font-semibold hover:text-blue-400 transition-colors">
            개인정보처리방침
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            채무조정안내
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            법률상담
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/50 rounded-2xl p-6 mb-8"
        >
          <p className="text-xs text-gray-400 leading-relaxed">
            ※ 본 서비스는 산재보험 관련 법률 상담 서비스를 제공하는 법무법인입니다.<br />
            ※ 산재 승인 여부는 개별 사안의 사실관계 및 증거에 따라 달라질 수 있습니다.<br />
            ※ 상담 내용은 법적 효력을 갖지 않으며, 공단의 최종 결정에 따릅니다.<br />
            ※ 산재 신청 기한은 사고일로부터 3년이며, 시효 경과 시 권리가 소멸될 수 있습니다.<br />
            ※ 성공보수제는 승인 후 보상금 수령 시에만 발생합니다.
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-gray-500"
        >
          <p>© 2024 법무법인 선인파트너스 산재路. All rights reserved.</p>
          <p className="mt-2">
            본 웹사이트는 산재 상담 안내 목적으로만 사용되며, 법률 자문을 대체하지 않습니다.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Import User and Clock icons that were missing
import { User, Clock } from 'lucide-react';

export default Footer;
