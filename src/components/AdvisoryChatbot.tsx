import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  onOpenBooking: (serviceName?: string, notes?: string) => void;
}

export default function AdvisoryChatbot({ onOpenBooking }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Dubey Conglomerate. I am your Executive AI Ambassador. How may I assist with your corporate restructuring, working capital optimizations, or tactical growth strategies today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setApiError(null);
    const userMsg: Message = {
      role: 'user',
      content: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setMessageInput('');
    setIsLoading(true);

    try {
      // Keep only last 10 messages to limit prompt token load safely
      const historyPayload = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historyPayload })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned status ${res.status}`);
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      console.error("AI Communication error:", err);
      setApiError(err?.message || "Underlying corporate proxy pipeline is unavailable.");
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but our advisory telemetry channel is temporarily unavailable. This usually happens if the Gemini API key is not yet configured in Settings > Secrets. You may click 'Schedule a consultation' directly to connect with our human analysts.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuickAction = (topic: string) => {
    let prompt = '';
    if (topic === 'capital') {
      prompt = "How can Dubey Conglomerate help optimize my company's working capital cycle?";
    } else if (topic === 'ebitda') {
      prompt = "What strategies do you recommend for rapid EBITDA expansion?";
    } else if (topic === 'digital') {
      prompt = "Tell me about your custom Digital Transformation and SOP automation sprint.";
    } else if (topic === 'legacy') {
      prompt = "What is the mission of Dubey Conglomerate and Mr. Aniket Dubey?";
    }
    handleSendMessage(prompt);
  };

  // Human-like parsing for paragraph breaks and simple lists for premium output render
  const renderMessageContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Check if paragraph is listItems
      if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
        const items = paragraph.split('\n').map(item => item.replace(/^[-*]\s+/, '').trim());
        return (
          <ul key={index} className="list-disc pl-5 my-2 space-y-1">
            {items.map((item, i) => <li key={i} className="text-xs text-white/90 leading-relaxed font-light">{item}</li>)}
          </ul>
        );
      }
      return (
        <p key={index} className="text-xs leading-relaxed font-light mb-2 text-white/95">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Sparkle Action Orb */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="ai-chatbot-trigger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-tr from-[#9B2C2C] via-corp-navy-900 to-[#D4AF37] text-white p-4 rounded-full shadow-2xl hover:shadow-[#D4AF37]/20 border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
            aria-label="Open AI Strategy Advisor"
          >
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 animate-ping group-hover:animate-none pointer-events-none" />
            <MessageSquare className="w-5 h-5 text-white stroke-[2]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Container Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '48px' : '520px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[380px] bg-[#050B18]/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col glass-panel-glow"
          >
            {/* Elegant Header Banner */}
            <div className="bg-gradient-to-r from-corp-navy-950 via-corp-navy-900 to-[#D4AF37]/25 p-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-500 flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 text-corp-navy-950 stroke-[2.5]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-corp-navy-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center">
                    <span>DC STRATEGY ADVISOR</span>
                  </h4>
                  <p className="text-[9px] font-mono text-[#D4AF37]/90 tracking-wide uppercase">Gemini Generative Engine</p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center space-x-1.5 text-white/50">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:text-white hover:bg-white/5 rounded transition-colors"
                  title={isMinimized ? "Restore" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-white hover:bg-white/5 rounded transition-colors"
                  aria-label="Close Chat Window"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Body & History (Visible only when not minimized) */}
            {!isMinimized && (
              <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 min-h-0 bg-white/[0.02]">
                  {messages.map((message, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-[#D4AF37]" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs text-left shadow-sm ${
                        message.role === 'user' 
                          ? 'bg-[#D4AF37] text-corp-navy-950 font-medium rounded-tr-none' 
                          : 'bg-white/5 border border-white/5 rounded-tl-none'
                      }`}>
                        {message.role === 'user' ? (
                          <p className="leading-relaxed font-light whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          renderMessageContent(message.content)
                        )}
                        <span className={`block text-[8px] mt-1 font-mono text-right ${
                          message.role === 'user' ? 'text-corp-navy-950/60' : 'text-white/30'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing / Loading Indication */}
                  {isLoading && (
                    <div className="flex justify-start items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-xs w-[120px] flex items-center justify-center space-x-2">
                        <Loader2 className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                        <span className="text-[10px] font-mono text-white/50 tracking-wider animate-pulse">ANALYZING...</span>
                      </div>
                    </div>
                  )}

                  {/* Internal Error Callout */}
                  {apiError && (
                    <div className="p-3 bg-[#9B2C2C]/10 border border-[#9B2C2C]/30 rounded-xl flex items-start space-x-2 text-left">
                      <AlertTriangle className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#ef4444] uppercase block">Telemetry Warning</span>
                        <span className="text-[10px] text-white/50 leading-relaxed font-light">{apiError}</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Strategy Suggestion Chips */}
                <div className="p-2 border-t border-white/5 bg-corp-navy-950/30 flex items-center space-x-1.5 overflow-x-auto scrollbar-hide">
                  <button 
                    onClick={() => startQuickAction('capital')} 
                    className="flex-shrink-0 font-mono text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] rounded-full px-2.5 py-1 text-center transition-all cursor-pointer"
                  >
                    Working Capital
                  </button>
                  <button 
                    onClick={() => startQuickAction('ebitda')} 
                    className="flex-shrink-0 font-mono text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] rounded-full px-2.5 py-1 text-center transition-all cursor-pointer"
                  >
                    EBITDA Boost
                  </button>
                  <button 
                    onClick={() => startQuickAction('digital')} 
                    className="flex-shrink-0 font-mono text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] rounded-full px-2.5 py-1 text-center transition-all cursor-pointer"
                  >
                    Digital Sprints
                  </button>
                  <button 
                    onClick={() => startQuickAction('legacy')} 
                    className="flex-shrink-0 font-mono text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] rounded-full px-2.5 py-1 text-center transition-all cursor-pointer"
                  >
                    Firm Legacy
                  </button>
                </div>

                {/* Input Control Box */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (messageInput.trim()) {
                      handleSendMessage(messageInput);
                    }
                  }}
                  className="p-3 border-t border-white/10 bg-[#050B18]/90 flex items-center space-x-2"
                >
                  <input 
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Inquire about corporate integrations..."
                    disabled={isLoading}
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-50"
                  />
                  
                  {/* Send Button */}
                  <button 
                    type="submit"
                    disabled={isLoading || !messageInput.trim()}
                    className="bg-gradient-to-tr from-[#9B2C2C] to-[#D4AF37] hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-40 text-white p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Persistent CTA to call modal */}
                <div className="bg-white/5 border-t border-white/5 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-[9px] text-white/50 font-mono uppercase tracking-wider flex items-center">
                    <Calendar className="w-3 h-3 text-[#D4AF37] mr-1" /> Ready for Strategic Audit?
                  </span>
                  <button
                    onClick={() => {
                      onOpenBooking("AI Strategic Advisory Support", "Consultation compiled from AI Strategy Assistant conversation history.");
                    }}
                    className="text-[9px] font-mono font-bold text-[#D4AF37] uppercase hover:underline"
                  >
                    Schedule Now &rarr;
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
