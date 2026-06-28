// src/components/Chatbot.tsx
'use client'; 

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://contentmanagementsystem-portfolio.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();
      setMessages([...newMessages, { role: 'bot', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'bot', text: 'Sorry, I am offline right now!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      <div 
        className={`transition-all duration-300 origin-bottom-right flex flex-col bg-slate-900/85 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden w-[340px] sm:w-[380px] h-[500px] max-h-[80vh] ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none absolute bottom-16 right-0'
        }`}
      >
        <div className="bg-slate-800/80 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="font-semibold text-slate-100">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        {/* Chat History Area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <p className="text-slate-400 text-sm">Hi! I'm JE's AI assistant. Ask me anything about his skills or projects!</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white self-end rounded-br-sm' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700/50 self-start rounded-bl-sm prose prose-sm prose-invert max-w-none'
              }`}
            >
              {msg.role === 'bot' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
          {isLoading && (
            <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-bl-sm self-start flex gap-1 items-center max-w-[85%] border border-slate-700/50">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="p-3 border-t border-slate-700 bg-slate-900/50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-all disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg shadow-blue-900/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {isOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-90"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
}