import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const messagesEndRef = useRef(null);

  // Enhanced EthiMinD knowledge base
  const ethiMindKnowledge = {
    company: {
      description: "EthiMinD is building Ethiopia's end-to-end AI ecosystem spanning devices, infrastructure, education, and research - rooted in culture, powered by innovation.",
      mission: "Beyond Intelligence, With Your Future - Making AI accessible and building an intelligent civilization from Ethiopia.",
      vision: "To establish Ethiopia as Africa's pioneering AI-native civilization through sovereign innovation and human-centric technology."
    },
    products: {
      imind: {
        name: "iMind AI-First Phone",
        description: "An AI-first smartphone with on-device models, private assistants, and local language support. Features solar charging and modular design.",
        status: "Prototype Completed",
        features: ["On-device AI processing", "Amharic/Tigrigna/Afan Oromo support", "Solar charging", "Privacy-first design"]
      },
      igrow: {
        name: "iGrow Agricultural Intelligence",
        description: "Smart irrigation and crop health insights for farmers using IoT sensors and computer vision.",
        status: "Prototype Developed",
        features: ["Crop health monitoring", "Smart irrigation", "Yield prediction", "Supply chain optimization"]
      },
      healthai: {
        name: "HealthAI Medical Intelligence",
        description: "Decision support for clinics with offline capability, diagnostic assistance, and telemedicine platform.",
        status: "Prototype Developed",
        features: ["Offline functionality", "Medical imaging analysis", "Telemedicine", "Predictive analytics"]
      },
      learnai: {
        name: "LearnAI Education Platform",
        description: "Amharic-first coding and AI curriculum for schools with adaptive learning and teacher support tools.",
        status: "Prototype Developed",
        features: ["Amharic coding curriculum", "Adaptive learning", "Teacher dashboards", "Vocational training"]
      }
    },
    sectors: {
      agriculture: "Transforming agriculture with AI-powered precision farming, supply chain optimization, and climate resilience solutions.",
      healthcare: "Revolutionizing healthcare through diagnostic support, telemedicine, and predictive analytics for public health.",
      education: "Creating Africa's digital native generation through localized AI education and adaptive learning platforms.",
      security: "Developing AI solutions for national security including surveillance, fraud detection, and emergency response."
    },
    infrastructure: {
      compute: "Building Ethiopia's AI backbone with green compute infrastructure, edge networks, and sovereign cloud solutions.",
      research: "Establishing open research hubs and the Ethiopian AI Research Institute for local innovation.",
      language: "Developing comprehensive NLP tools for Amharic, Tigrigna, Afan Oromo and other Ethiopian languages."
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm your EthiMinD Assistant. I can help you learn about our AI ecosystem, products, and vision for Ethiopia's technological future. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'welcome'
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced AI response generation
  const generateAIResponse = async (userMessage, context) => {
    setIsTyping(true);
    
    try {
      // First, try to get response from our enhanced knowledge base
      const knowledgeResponse = getEnhancedResponse(userMessage, context);
      
      // If we have a good match from knowledge base, use it
      if (knowledgeResponse.confidence > 0.8) {
        return knowledgeResponse;
      }
      
      // Otherwise, try external AI API with EthiMinD context
      const aiResponse = await getExternalAIResponse(userMessage, context);
      return aiResponse;
      
    } catch (error) {
      console.error('AI Response error:', error);
      return {
        text: getFallbackResponse(userMessage),
        context: context,
        confidence: 0.5,
        type: 'general'
      };
    } finally {
      setIsTyping(false);
    }
  };

  const getEnhancedResponse = (message, context) => {
    const lowerMessage = message.toLowerCase();
    let response = null;
    let confidence = 0.9;
    let responseType = 'information';
    let nextContext = { ...context };

    // Product inquiries
    if (lowerMessage.includes('imind') || lowerMessage.includes('phone') || lowerMessage.includes('device')) {
      response = `**${ethiMindKnowledge.products.imind.name}**\n\n${ethiMindKnowledge.products.imind.description}\n\n**Status:** ${ethiMindKnowledge.products.imind.status}\n**Key Features:**\n${ethiMindKnowledge.products.imind.features.map(f => `• ${f}`).join('\n')}\n\nWould you like to know about our other products or specific technical details?`;
      nextContext.lastTopic = 'imind';
      responseType = 'product';
    }
    else if (lowerMessage.includes('igrow') || lowerMessage.includes('agriculture') || lowerMessage.includes('farm')) {
      response = `**${ethiMindKnowledge.products.igrow.name}**\n\n${ethiMindKnowledge.products.igrow.description}\n\n**Status:** ${ethiMindKnowledge.products.igrow.status}\n**Key Features:**\n${ethiMindKnowledge.products.igrow.features.map(f => `• ${f}`).join('\n')}\n\nThis system helps farmers increase yields by 30-50% while reducing water usage by 40%.`;
      nextContext.lastTopic = 'igrow';
      responseType = 'product';
    }
    else if (lowerMessage.includes('healthai') || lowerMessage.includes('medical') || lowerMessage.includes('clinic')) {
      response = `**${ethiMindKnowledge.products.healthai.name}**\n\n${ethiMindKnowledge.products.healthai.description}\n\n**Status:** ${ethiMindKnowledge.products.healthai.status}\n**Key Features:**\n${ethiMindKnowledge.products.healthai.features.map(f => `• ${f}`).join('\n')}\n\nDesigned specifically for Ethiopian healthcare challenges with offline capability.`;
      nextContext.lastTopic = 'healthai';
      responseType = 'product';
    }
    else if (lowerMessage.includes('learnai') || lowerMessage.includes('education') || lowerMessage.includes('school')) {
      response = `**${ethiMindKnowledge.products.learnai.name}**\n\n${ethiMindKnowledge.products.learnai.description}\n\n**Status:** ${ethiMindKnowledge.products.learnai.status}\n**Key Features:**\n${ethiMindKnowledge.products.learnai.features.map(f => `• ${f}`).join('\n')}\n\nWe're training 1 million students in AI fundamentals within 5 years.`;
      nextContext.lastTopic = 'learnai';
      responseType = 'product';
    }

    // Company and vision
    else if (lowerMessage.includes('company') || lowerMessage.includes('ethimind') || lowerMessage.includes('about')) {
      response = `**EthiMinD Vision**\n\n${ethiMindKnowledge.company.description}\n\n**Mission:** ${ethiMindKnowledge.company.mission}\n**Vision:** ${ethiMindKnowledge.company.vision}\n\nWe're building four key pillars:\n• AI Infrastructure & Sovereignty\n• Robotics & Automation\n• National Sector Transformation\n• Privacy-First AI & Local Language Focus`;
      nextContext.lastTopic = 'company';
      responseType = 'vision';
    }

    // Infrastructure
    else if (lowerMessage.includes('infrastructure') || lowerMessage.includes('compute') || lowerMessage.includes('green')) {
      response = `**AI Infrastructure Initiative**\n\n${ethiMindKnowledge.infrastructure.compute}\n\n**Key Projects:**\n• Addis AI Hub (100+ petaflops capacity)\n• Regional Edge Nodes (12 locations)\n• National AI Grid\n• Green Compute with solar power\n\nWe're building Ethiopia's digital backbone for AI innovation.`;
      nextContext.lastTopic = 'infrastructure';
      responseType = 'infrastructure';
    }

    // Language support
    else if (lowerMessage.includes('language') || lowerMessage.includes('amharic') || lowerMessage.includes('tigrigna') || lowerMessage.includes('oromo')) {
      response = `**Local Language AI**\n\n${ethiMindKnowledge.infrastructure.language}\n\n**Current Focus:**\n• Amharic NLP Suite\n• Tigrigna AI Tools\n• Afan Oromo Platform\n• Voice Ethiopia (10+ languages)\n\nWe're creating the largest collection of Ethiopian language data for AI training.`;
      nextContext.lastTopic = 'language';
      responseType = 'language';
    }

    // Contact and next steps
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('join')) {
      response = `**Get Involved with EthiMinD**\n\nWe're always looking for partners, investors, and talented individuals to join our mission.\n\n**Contact:** leadership@ethimind.et\n**Website:** ethimind.et\n**Careers:** careers@ethimind.et\n\nAre you interested in partnership opportunities, investment, or career positions?`;
      nextContext.lastTopic = 'contact';
      responseType = 'contact';
    }

    // Fallback to general response
    else {
      confidence = 0.3;
      response = getFallbackResponse(message);
      responseType = 'general';
    }

    return {
      text: response,
      context: nextContext,
      confidence: confidence,
      type: responseType
    };
  };

  const getExternalAIResponse = async (message, context) => {
    // You can integrate with Hugging Face, OpenAI, or other APIs here
    // For now, we'll use our enhanced knowledge base
    return getEnhancedResponse(message, context);
  };

  const getFallbackResponse = (message) => {
    return `Thank you for your interest in "${message}". I'm your EthiMinD assistant, specializing in our AI ecosystem:\n\n• **Products**: iMind, iGrow, HealthAI, LearnAI\n• **Sectors**: Agriculture, Healthcare, Education, Security\n• **Infrastructure**: AI compute, Local language tools, Green technology\n• **Company Vision**: Building Ethiopia's intelligent future\n\nWhat specific area would you like to explore?`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Generate AI response
    const aiResponse = await generateAIResponse(inputMessage, conversationContext);
    
    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse.text,
      sender: 'bot',
      timestamp: new Date(),
      type: aiResponse.type
    };

    setMessages(prev => [...prev, botMessage]);
    setConversationContext(aiResponse.context);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const quickQuestions = [
    "Tell me about EthiMinD's vision",
    "What is the iMind phone?",
    "How does iGrow help farmers?",
    "Tell me about HealthAI",
    "LearnAI education platform",
    "Local language AI support",
    "Investment opportunities",
    "Career positions available"
  ];

  const getMessageClassName = (message) => {
    let className = `message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`;
    if (message.type) {
      className += ` message-${message.type}`;
    }
    return className;
  };

  return (
    <>
      {/* Chatbot Button */}
      <div className={`chatbot-button ${isOpen ? 'hidden' : ''}`}>
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open EthiMinD chat"
        >
          <span className="chat-icon">🤖</span>
          <span className="notification-dot"></span>
        </button>
      </div>

      {/* Chatbot Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-info">
            <div className="chatbot-avatar">E</div>
            <div className="chatbot-details">
              <h3>EthiMinD Assistant</h3>
              <span className="status online">AI Specialist</span>
            </div>
          </div>
          <button 
            className="close-chat"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={getMessageClassName(message)}
            >
              <div className="message-content">
                {message.text.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span>EthiMinD AI is thinking</span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 3 && (
          <div className="quick-questions">
            <p>Ask about EthiMinD:</p>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about EthiMinD AI ecosystem..."
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={!inputMessage.trim() || isTyping}
            className="send-button"
          >
            <span className="send-icon">↑</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;