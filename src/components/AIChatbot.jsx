import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { portfolioData } from '../config/portfolioData';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const buildSystemPrompt = () => {
  const { personalInfo, skills, projects, experience, education, certificates } = portfolioData;

  return `You are Shivan's AI Portfolio Assistant. You help visitors learn about Shivan Mishra by answering their questions based on the following portfolio data.

IMPORTANT RULES:
- Speak in third person about Shivan (e.g., "Shivan has experience in...")
- Be friendly, professional, and concise
- Only answer questions related to Shivan's portfolio, skills, projects, experience, and education
- If asked something unrelated, politely redirect to portfolio topics
- Use markdown formatting for lists and bold text when helpful
- Keep responses under 150 words unless more detail is specifically asked for

PORTFOLIO DATA:

NAME: ${personalInfo.name}
TITLE: ${personalInfo.title}
LOCATION: ${personalInfo.location}
EMAIL: ${personalInfo.email}

BIO:
${Array.isArray(personalInfo.bio) ? personalInfo.bio.join('\n') : personalInfo.bio}

SKILLS:
${skills.map(cat => `${cat.category}: ${cat.items.map(s => `${s.name} (${s.level}%)`).join(', ')}`).join('\n')}

PROJECTS:
${projects.map(p => `- ${p.title} (${p.category}): ${p.shortDescription}. Tech: ${p.tech.join(', ')}`).join('\n')}

EXPERIENCE:
${experience.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join('\n')}

EDUCATION:
${education.map(e => `- ${e.degree} at ${e.institution} (${e.duration})${e.CGPA ? `, CGPA: ${e.CGPA}` : ''}${e.percentage ? `, Score: ${e.percentage}` : ''}`).join('\n')}

CERTIFICATIONS:
${certificates.map(c => `- ${c.title} by ${c.issuer} (${c.date})`).join('\n')}`;
};

const suggestedQuestions = [
  "What are Shivan's top skills?",
  "Tell me about his projects",
  "What's his work experience?"
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm Shivan's AI assistant. Ask me anything about his skills, projects, experience, or education!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Check if API key is configured
      if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_api_key_here') {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "⚠️ OpenRouter API key is not configured. Please add a valid key to the .env file as VITE_OPENROUTER_API_KEY." }
        ]);
        setIsTyping(false);
        return;
      }

      // Build OpenAI-compatible messages array (skip welcome message)
      const chatMessages = [
        { role: 'system', content: buildSystemPrompt() },
        ...newMessages
          .filter((_, idx) => idx > 0) // skip welcome message
          .map((msg) => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          }))
      ];

      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Shivan Portfolio Chatbot'
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data?.error?.message || `API returned status ${response.status}`;
        console.error('OpenRouter API error:', errorMsg, data);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `⚠️ API Error: ${errorMsg}` }
        ]);
        setIsTyping(false);
        return;
      }

      const aiText = data?.choices?.[0]?.message?.content
        || "Sorry, I couldn't process that. Please try again!";

      setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error('OpenRouter API error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Oops! Network error. Please check your internet connection and try again." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Simple markdown-like rendering for bold and lists
  const renderMessage = (text) => {
    return text.split('\n').map((line, i) => {
      let processed = line.trim();
      if (!processed) return <span key={i} className="d-block">&nbsp;</span>;

      // Bold text formatting
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Check for bullet points (- or *)
      if (processed.startsWith('- ') || processed.startsWith('* ')) {
        processed = processed.slice(2);
        return (
          <span
            key={i}
            className="chatbot-list-item d-block"
            dangerouslySetInnerHTML={{ __html: processed }}
          />
        );
      }

      // Check for numbered lists (e.g. "1. ")
      const numberedMatch = processed.match(/^(\d+)\.\s(.*)/);
      if (numberedMatch) {
        processed = numberedMatch[2];
        return (
          <span
            key={i}
            className="chatbot-list-item d-block"
            dangerouslySetInnerHTML={{ __html: `<strong>${numberedMatch[1]}.</strong> ${processed}` }}
          />
        );
      }

      return (
        <span
          key={i}
          className="d-block"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="chatbot-bubble"
            aria-label="Open AI Chat"
          >
            <Sparkles size={26} />
            <span className="chatbot-bubble-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="chatbot-panel"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="d-flex align-items-center gap-2.5">
                <div className="chatbot-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[14px] text-slate-800 dark:text-white mb-0">
                    Shivan's AI Assistant
                  </h4>
                  <span className="d-flex align-items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
                    <span className="chatbot-online-dot" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border-0 bg-transparent transition-all"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chatbot-msg ${msg.role === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-ai'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="chatbot-msg-avatar">
                      <Sparkles size={12} />
                    </div>
                  )}
                  <div className={`chatbot-msg-bubble ${msg.role === 'user' ? 'chatbot-msg-bubble-user' : 'chatbot-msg-bubble-ai'}`}>
                    {renderMessage(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chatbot-msg chatbot-msg-ai">
                  <div className="chatbot-msg-avatar">
                    <Sparkles size={12} />
                  </div>
                  <div className="chatbot-msg-bubble chatbot-msg-bubble-ai">
                    <div className="chatbot-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions (only show if only welcome message) */}
              {messages.length === 1 && !isTyping && (
                <div className="chatbot-suggestions">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      className="chatbot-suggestion-btn"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="chatbot-input-bar">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Shivan..."
                className="chatbot-input"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="chatbot-send-btn"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
