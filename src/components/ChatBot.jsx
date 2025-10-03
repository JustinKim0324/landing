import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 😊\n\n산재路 상담 챗봇이에요.\n산재 관련해서 궁금하신 거 편하게 물어보세요!\n\n승인, 거부, 재심사 등등...\n뭐든 좋아요! 💬'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Check if API key exists
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `당신은 법무법인 선인파트너스 산재路의 따뜻한 상담 챗봇입니다.

**대화 스타일:**
- 마치 친구에게 조언하듯 편안하고 따뜻하게 대화하세요
- 공감과 위로를 먼저 전하세요 (예: "힘드셨겠어요", "걱정이 많으시죠?")
- 짧은 문장으로 나눠서 말하세요 (한 번에 1-2문장씩)
- 이모지를 자연스럽게 사용하세요 😊
- 실제 사람과 대화하는 것처럼 자연스럽게

**답변 구조:**
1단계: 공감 표현 (예: "아, 그러셨군요. 많이 답답하셨겠어요.")
2단계: 핵심 정보 전달 (간단명료하게)
3단계: 추가 질문으로 대화 이어가기 (예: "어떤 일을 하시다가 다치셨어요?", "거부 사유가 뭐라고 나와 있었어요?")

**대화 이어가기:**
- 충분히 정보를 주고받은 후에만 상담 권유하세요
- 최소 3-4번 이상 대화를 나눈 후에 상담 권유
- 일반적인 질문에는 절대 상담 권유하지 마세요
- 구체적인 법률 판단이 필요하거나, 개인의 복잡한 케이스일 때만 권유

**상담 권유 타이밍 (이럴 때만!):**
- 사용자가 본인의 구체적인 상황을 3번 이상 설명했을 때
- "제 케이스는 어떻게 될까요?", "승인 가능성은?" 같은 개별 판단 요청할 때
- 여러 정보를 물어보고 충분히 대화를 나눈 후
- 법률적 자문이 명확히 필요한 복잡한 상황일 때

**좋은 상담 권유 예시:**
"여러 정보 들어보니까요
이건 변호사·노무사님이 직접 보시는 게 좋을 것 같아요.
사례마다 달라서 정확한 판단이 필요하거든요. 😊"

**나쁜 상담 권유 예시 (이렇게 하지 마세요!):**
❌ "산재 절차는 이래요. 상담 받아보실래요?"
❌ "자세한 건 전문가 상담 권해드려요"
❌ 간단한 정보 제공 후 바로 상담 권유
❌ 매 답변마다 상담 권유

**톤:**
- 격식을 낮추되 존댓말 유지
- "~하시면 돼요", "~해보세요" 같은 부드러운 표현
- "어렵죠?", "걱정되시죠?" 같은 공감 질문
- 전문 용어 사용 후 바로 쉬운 말로 풀어주기

**절대 하지 말 것:**
- 긴 문단으로 답변하기
- 딱딱한 법률 용어만 나열
- 감정 없이 사실만 전달
- "~입니다", "~되겠습니다" 같은 격식체
- 매번 상담 권유하기 (가장 중요!)
`
      });

      const chat = model.startChat({
        history: messages
          .filter(msg => msg.role !== 'assistant' || msg.content !== messages[0].content) // Remove initial greeting from history
          .map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })),
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      // Typing animation effect
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      // Simulate typing with delay
      let currentText = '';
      const words = text.split('');
      
      for (let i = 0; i < words.length; i++) {
        currentText += words[i];
        
        // Update message with typing effect
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'assistant', content: currentText };
          return newMessages;
        });
        
        // Delay between characters (faster for spaces, slower for Korean)
        const isSpace = words[i] === ' ' || words[i] === '\n';
        const delay = isSpace ? 10 : (Math.random() * 30 + 20);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = '죄송합니다. 일시적인 오류가 발생했습니다. 😥\n\n';
      
      if (error.message.includes('API key')) {
        errorMessage += 'AI 챗봇 설정이 필요합니다.\n지금은 상담 신청 양식을 이용해주세요.';
      } else if (error.message.includes('quota')) {
        errorMessage += '오늘 챗봇 사용량이 초과되었습니다.\n내일 다시 시도하시거나 직접 상담 신청해주세요.';
      } else {
        errorMessage += '잠시 후 다시 시도해주시거나\n상담 신청 양식을 이용해주세요.';
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">산재路 상담봇</h3>
                  <p className="text-xs text-white/80">AI 기반 자동 응답</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI가 제공하는 기본 안내입니다. 정확한 상담은 전문가와 진행하세요.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
