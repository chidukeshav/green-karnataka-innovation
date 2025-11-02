
import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '@google/genai';
import { geminiService } from '../services/geminiService';
import type { ChatMessage } from '../types';

interface ProjectsScreenProps {
  onNavigateBack: () => void;
}

const ProjectHighlight: React.FC<{ title: string, description: string, icon: string }> = ({ title, description, icon }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex items-start space-x-4">
        <span className="text-3xl mt-1">{icon}</span>
        <div>
            <h4 className="font-bold text-brand-green">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
);

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex justify-end mb-4">
        <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs lg:max-w-md">
            {text}
        </div>
    </div>
);

const ModelMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex justify-start mb-4">
        <div className="bg-gray-700 text-gray-200 rounded-lg py-2 px-4 max-w-xs lg:max-w-md">
            {text}
        </div>
    </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex justify-start mb-4">
        <div className="bg-gray-700 text-gray-400 rounded-lg py-2 px-4">
            <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
            </div>
        </div>
    </div>
);


export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onNavigateBack }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatInstance = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        chatInstance.current = geminiService.startChat();
        setChatHistory([{
            role: 'model',
            text: "Hello! I'm GreenBot. Ask me anything about Karnataka's green initiatives."
        }]);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: userInput };
        setChatHistory(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        setUserInput('');
        
        try {
            if (chatInstance.current) {
                const response = await chatInstance.current.sendMessage({ message: userInput });
                const modelMessage: ChatMessage = { role: 'model', text: response.text };
                setChatHistory(prev => [...prev, modelMessage]);
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickQuery = (query: string) => {
        if (isLoading) return;
        setUserInput(query);
        // We manually trigger form submission after setting state
        // This is a simple way to reuse the handleSendMessage logic
        // A more complex implementation might directly call the send logic
        setTimeout(() => {
            const form = document.getElementById('chat-form') as HTMLFormElement;
            if (form) {
               form.requestSubmit();
            }
        }, 50);
    }
    
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col h-[95vh]">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    Major Green Initiatives <span className="text-brand-green">🛠🌿</span>
                </h1>
                <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                    Explore impactful green technology projects across Karnataka and ask GreenBot for more details.
                </p>
            </header>

            <div className="flex-grow flex flex-col lg:flex-row gap-8 overflow-hidden">
                {/* Left Panel: Info */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                   <ProjectHighlight title="Solar Power Parks" icon="🌞" description="Karnataka hosts India's largest solar farms, supplying clean energy to industries and homes." />
                   <ProjectHighlight title="Wind Energy Corridors" icon="🌬️" description="Coastal and northern regions boost large-scale wind power production." />
                   <ProjectHighlight title="Namma Metro & EV Push" icon="🚇" description="Bengaluru leads with EV startups, metro expansion & battery innovation hubs." />
                   <ProjectHighlight title="Smart Waste Management" icon="♻️" description="Cities use automated waste segregation and waste-to-energy technology." />
                   <ProjectHighlight title="Smart Farming & Water Tech" icon="💧" description="AI-based irrigation, IoT sensors & rainwater harvesting aid farmers and conserve water." />
                </div>

                {/* Right Panel: Chat */}
                <div className="lg:w-1/2 flex flex-col bg-gray-900/70 rounded-lg shadow-2xl h-full">
                    <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {chatHistory.map((msg, index) => 
                            msg.role === 'user' ? <UserMessage key={index} text={msg.text} /> : <ModelMessage key={index} text={msg.text} />
                        )}
                        {isLoading && <TypingIndicator />}
                    </div>
                     <div className="p-2 border-t border-gray-700">
                        <div className="flex gap-2 justify-center flex-wrap px-2 py-1">
                            <button onClick={() => handleQuickQuery("What about solar energy?")} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-2 rounded-full transition-colors">Solar?</button>
                            <button onClick={() => handleQuickQuery("Tell me about EV startups")} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-2 rounded-full transition-colors">EV Startups?</button>
                            <button onClick={() => handleQuickQuery("How does waste-to-energy work?")} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-2 rounded-full transition-colors">Waste-to-energy?</button>
                        </div>
                        <form id="chat-form" onSubmit={handleSendMessage} className="flex items-center p-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask about green tech..."
                                className="flex-grow bg-gray-800 text-white rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-green"
                                disabled={isLoading}
                            />
                            <button type="submit" className="bg-brand-green text-white rounded-r-full p-2 hover:bg-emerald-600 disabled:bg-gray-600" disabled={isLoading}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-8">
                <button
                    onClick={onNavigateBack}
                    className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};
