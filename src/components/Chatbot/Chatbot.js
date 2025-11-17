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
    home: {
      tagline: 'Project EthiMinD · Beyond Intelligence, With Your Future',
      headline: "Building Ethiopia's Intelligent Future",
      lead:
        'Ethimind is Africa’s future hub for inclusive innovation, combining digital infrastructure, engineering excellence, and transformative services so individuals, governments, and businesses thrive across the continent.',
      stats: [
        { label: 'Technology Prototypes', value: '9+' },
        { label: 'Jobs Catalyzed by 2030', value: '110,000+' },
        { label: 'Pan-African Reach', value: '54 Countries' },
      ],
      actions: [
        { label: 'Explore the Vision', link: '/vision' },
        { label: 'Partner With Us', link: '/partners' },
      ],
    },
    company: {
      description: "EthiMinD is building Ethiopia's end-to-end AI ecosystem spanning devices, infrastructure, education, and research - rooted in culture, powered by innovation.",
      mission: "Beyond Intelligence, With Your Future - Making AI accessible and building an intelligent civilization from Ethiopia.",
      vision: "To establish Ethiopia as Africa's pioneering AI-native civilization through sovereign innovation and human-centric technology."
    },
    pillars: {
      title: 'The EthiMinD Vision: More Than Technology',
      philosophy: [
        'Innovation · Rethinking and redesigning possibilities across Africa',
        'Excellence · Engineering world-class solutions with global rigor',
        'Integrity · Transparent, accountable, respectful collaboration',
        'Community · Lifting African talent, businesses, and institutions',
        'Impact · Building technology that changes lives, not just systems',
      ],
      layers: [
        'Digital Infrastructure · Building Africa’s center of technological excellence',
        'Automation & AI · Empowering businesses through modern tools',
        'Education & Training · Digital literacy for youth and professionals',
        'Research & Innovation · Robotics, electronics & sustainable engineering',
        'Partner Ecosystem · Government, academia, and enterprise alliances',
      ]
    },
    prototypes: [
      {
        title: 'Software Development & Engineering',
        highlights: [
          'Web, mobile, SaaS, and enterprise systems tailored for Africa',
          'API architecture, integrations, and secure platforms',
          'E-government, automation, and modernization programs',
        ],
      },
      {
        title: 'Machine Learning, Big Data & AI',
        highlights: [
          'Predictive analytics, NLP, computer vision, and recommender systems',
          'AI-powered automation and business intelligence across sectors',
          'Large-scale data platforms that unlock actionable insight',
        ],
      },
      {
        title: 'Cloud Computing & DevOps',
        highlights: [
          'Cloud infrastructure, IaC, containerization, and microservices',
          'CI/CD pipelines, cloud security, and scalable platforms',
          'Global-grade reliability with AWS, Azure, GCP expertise',
        ],
      },
      {
        title: 'Education, Training & Talent',
        highlights: [
          'Coding bootcamps, AI & data science academies, and cloud programs',
          'Robotics/STEM initiatives, UI/UX labs, and digital learning platforms',
          'Talent outsourcing, professional hiring, and capacity building',
        ],
      },
      {
        title: 'Robotics, Engineering & Media',
        highlights: [
          'Robotics, embedded systems, IoT, and drone innovation',
          'Graphic design, branding, marketing, and creative media production',
          'Photography, documentary, 3D animation, and motion design',
        ],
      },
    ],
    impact: [
      {
        title: 'Technology & Innovation',
        detail: 'Africa’s center for research, robotics, and sustainable engineering',
      },
      {
        title: 'People & Skills',
        detail: 'Digital literacy for millions and talent development across 54 nations',
      },
      {
        title: 'Economic Impact',
        detail: '$500M+ economic value, 10,000 direct jobs, 100,000 indirect by 2030',
      },
      {
        title: 'Governance & Sustainability',
        detail: 'Ethical AI frameworks, green compute, and continental partnerships',
      },
    ],
    join: {
      headline: "Join Ethiopia's AI Revolution",
      pitches: [
        'Invest in software, AI, cloud, and robotics innovation that scales across Africa',
        'Partner on research, manufacturing, and creative media to shape the continent’s narrative',
        'Access elite talent through hiring, training, and outsourcing programs',
        'Collaborate on policy, governance, and ethical frameworks for digital transformation',
      ],
      contact: 'partners@ethimind.et',
      careers: '/careers',
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
    const heroTriggers = ['project ethimind', 'beyond intelligence', 'intelligent future', 'home hero', 'inclusive innovation'];
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

    // Pillars & philosophy
    else if (lowerMessage.includes('pillars') || lowerMessage.includes('vision section') || lowerMessage.includes('philosophy')) {
      response = `**${ethiMindKnowledge.pillars.title}**\n\nPhilosophy:\n${ethiMindKnowledge.pillars.philosophy.map(p => `• ${p}`).join('\n')}\n\nLayers:\n${ethiMindKnowledge.pillars.layers.map(l => `• ${l}`).join('\n')}`;
      nextContext.lastTopic = 'pillars';
      responseType = 'pillars';
    }

    // Prototype programs
    else if (lowerMessage.includes('prototype') || lowerMessage.includes('pipeline') || lowerMessage.includes('portfolio')) {
      response = `**Prototype Portfolio**\n\nFlagship initiatives (iMind, iGrow, HealthAI, LearnAI) rely on these technical programs:\n${ethiMindKnowledge.prototypes.map(p => `• ${p.title}: ${p.highlights.join('; ')}`).join('\n')}`;
      nextContext.lastTopic = 'prototypes';
      responseType = 'prototypes';
    }

    // Hero / home summary
    else if (heroTriggers.some(trigger => lowerMessage.includes(trigger)) || (lowerMessage.includes('hero') && lowerMessage.includes('home'))) {
      response = `**${ethiMindKnowledge.home.tagline}**\n\n${ethiMindKnowledge.home.lead}\n\nStats:\n${ethiMindKnowledge.home.stats.map(stat => `• ${stat.label}: ${stat.value}`).join('\n')}\n\nNeed more context? Explore the vision or partner links to keep the momentum.`;
      nextContext.lastTopic = 'home';
      responseType = 'vision';
    }

    // Company and vision
    else if (lowerMessage.includes('company') || lowerMessage.includes('ethimind') || lowerMessage.includes('about')) {
      response = `**EthiMinD Vision**\n\n${ethiMindKnowledge.company.description}\n\n**Mission:** ${ethiMindKnowledge.company.mission}\n**Vision:** ${ethiMindKnowledge.company.vision}\n\nOur philosophy focuses on Innovation, Excellence, Integrity, Community, and Impact.`;
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

    // Impact and metrics
    else if (lowerMessage.includes('impact') || lowerMessage.includes('metrics') || lowerMessage.includes('success')) {
      response = `**Impact Assessment & Success Metrics**\n${ethiMindKnowledge.impact.map(item => `• **${item.title}** — ${item.detail}`).join('\n')}`;
      nextContext.lastTopic = 'impact';
      responseType = 'impact';
    }

    // Contact and next steps
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('join') || lowerMessage.includes('partners')) {
      response = `**${ethiMindKnowledge.join.headline}**\n${ethiMindKnowledge.join.pitches.map(p => `• ${p}`).join('\n')}\n\nContact: ${ethiMindKnowledge.join.contact}\nCareers: ${ethiMindKnowledge.join.careers}`;
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
    const heroTagline = ethiMindKnowledge.home.tagline;
    return `Thank you for your interest in "${message}". I'm your EthiMinD assistant, aligned with ${heroTagline}. Here's a quick guide:\n\n• **Home Hero**: Inclusive innovation, digital infrastructure, engineering excellence, and transformative services\n• **Products**: iMind, iGrow, HealthAI, LearnAI\n• **Pillars**: Innovation, Excellence, Integrity, Community, Impact\n• **Prototype Programs**: Software, ML/AI, Cloud, Education, Robotics\n• **Impact & Join**: Research centers, talent development, investment, policy partnerships\n\nWhere should we dive next?`;
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
    "What is Project EthiMinD's hero message?",
    "What are the EthiMinD pillars?",
    "How does the prototype pipeline work?",
    "How is EthiMinD measuring impact?",
    "How can I join Ethiopia's AI revolution?",
    "Tell me about the iMind AI-first phone",
    "How does iGrow help farmers?",
    "What does LearnAI teach students and teachers?"
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