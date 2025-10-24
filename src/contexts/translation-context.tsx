"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'bn';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'nav.features': 'Features',
    'nav.employers': 'Employers',
    'nav.about': 'About',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    
    // Hero Section
    'hero.badge': 'For a Self-Reliant India (Atmanirbhar Bharat)',
    'hero.title': 'Connecting India\'s Grassroots Talent to Digital Opportunities.',
    'hero.description': 'BharatLink is a digital bridge designed to connect rural skills to urban opportunities, creating a sustainable skill-to-work ecosystem for India.',
    'hero.explore': 'Explore Opportunities',
    'hero.learn': 'Learn More',
    'hero.subtitle': 'From the heart of Bharat to the edge of innovation.',
    
    // Features Section
    'features.title': 'A Platform for a Digital India',
    'features.subtitle': 'Empowering every skilled individual with the tools they need to thrive in the digital economy.',
    'features.skill_mapping.title': 'Skill Cluster Mapping',
    'features.skill_mapping.desc': 'Discover regional skill hotspots, from Channapatna toys to Assam handloom.',
    'features.voice.title': 'Voice-First Access',
    'features.voice.desc': 'Register and manage your profile using your local language with simple voice commands.',
    'features.trust.title': 'AI + Trust Verification',
    'features.trust.desc': 'Build your credibility with peer endorsements, turning word-of-mouth into digital trust.',
    'features.matchmaking.title': 'Smart Matchmaking',
    'features.matchmaking.desc': 'Get connected to verified jobs and projects that match your skills, location, and trust score.',
    'features.collaboration.title': 'Collaboration Hub',
    'features.collaboration.desc': 'A space for urban businesses to connect with and hire authentic rural talent directly.',
    'features.opportunities.title': 'Verified Opportunities',
    'features.opportunities.desc': 'Access a curated list of jobs from verified companies, reducing fraud and uncertainty.',
    
    // Employer Section
    'employers.title': 'For Employers & Businesses',
    'employers.subtitle': 'Connect with India\'s most skilled artisans and workers. Find the right talent for your projects, from traditional crafts to modern skills.',
    'employers.discovery.title': 'Smart Talent Discovery',
    'employers.discovery.desc': 'Find verified artisans and skilled workers using AI-powered search across skill clusters and regions.',
    'employers.hiring.title': 'Direct Hiring Platform',
    'employers.hiring.desc': 'Post jobs, review applications, and hire talent directly without intermediaries or high fees.',
    'employers.quality.title': 'Verified Quality',
    'employers.quality.desc': 'Access pre-verified talent with peer endorsements and skill assessments for guaranteed quality.',
    'employers.scale.title': 'Scalable Solutions',
    'employers.scale.desc': 'From single projects to large-scale operations, scale your workforce needs efficiently.',
    'employers.post_job': 'Post a Job',
    'employers.explore_map': 'Explore Talent Map',
    
    // Skill Clusters
    'clusters.title': 'Skill Cluster Mapping',
    'clusters.subtitle': 'Discover regional skill hotspots across India. Each cluster represents a concentration of traditional skills and modern capabilities.',
    'clusters.explore': 'Explore Full Skill Map',
    'clusters.artisans': 'artisans',
    'clusters.skills': 'Key Skills:',
    'clusters.view_details': 'View Details',
    
    // About Section
    'about.title': 'Empowering the Unseen Workforce',
    'about.desc1': 'Millions of skilled artisans, craftsmen, and workers in rural India have the talent but lack the digital visibility to connect with opportunities. BharatLink solves this by providing an accessible, voice-first platform that makes their skills discoverable.',
    'about.desc2': 'We\'re not just a job portal; we\'re a movement to build a verified, trusted, and inclusive economic network that honors and uplifts India\'s traditional skills.',
    'about.pottery': 'Pottery',
    'about.weaving': 'Weaving',
    'about.agriculture': 'Agriculture',
    
    // Footer
    'footer.copyright': 'All rights reserved.',
    'footer.project': 'A proud *Innovinkers* project.'
  },
  hi: {
    // Header
    'nav.features': 'विशेषताएं',
    'nav.employers': 'नियोक्ता',
    'nav.about': 'के बारे में',
    'nav.signin': 'साइन इन',
    'nav.signup': 'साइन अप',
    
    // Hero Section
    'hero.badge': 'आत्मनिर्भर भारत के लिए',
    'hero.title': 'भारत की जमीनी प्रतिभा को डिजिटल अवसरों से जोड़ना।',
    'hero.description': 'भारतलिंक एक डिजिटल पुल है जो ग्रामीण कौशल को शहरी अवसरों से जोड़ने के लिए डिज़ाइन किया गया है, भारत के लिए एक सतत कौशल-से-काम पारिस्थितिकी तंत्र बनाता है।',
    'hero.explore': 'अवसरों का अन्वेषण करें',
    'hero.learn': 'और जानें',
    'hero.subtitle': 'भारत के हृदय से नवाचार के किनारे तक।',
    
    // Features Section
    'features.title': 'डिजिटल भारत के लिए एक मंच',
    'features.subtitle': 'हर कुशल व्यक्ति को डिजिटल अर्थव्यवस्था में पनपने के लिए आवश्यक उपकरणों से सशक्त बनाना।',
    'features.skill_mapping.title': 'कौशल क्लस्टर मैपिंग',
    'features.skill_mapping.desc': 'क्षेत्रीय कौशल हॉटस्पॉट की खोज करें, चन्नापटना खिलौनों से लेकर असम हैंडलूम तक।',
    'features.voice.title': 'आवाज-प्रथम पहुंच',
    'features.voice.desc': 'सरल आवाज आदेशों के साथ अपनी स्थानीय भाषा का उपयोग करके अपना प्रोफाइल पंजीकृत और प्रबंधित करें।',
    'features.trust.title': 'AI + ट्रस्ट सत्यापन',
    'features.trust.desc': 'सहकर्मी समर्थन के साथ अपनी विश्वसनीयता बनाएं, मुंह की बात को डिजिटल ट्रस्ट में बदलें।',
    'features.matchmaking.title': 'स्मार्ट मैचमेकिंग',
    'features.matchmaking.desc': 'सत्यापित नौकरियों और परियोजनाओं से जुड़ें जो आपके कौशल, स्थान और ट्रस्ट स्कोर से मेल खाते हैं।',
    'features.collaboration.title': 'सहयोग केंद्र',
    'features.collaboration.desc': 'शहरी व्यवसायों के लिए प्रामाणिक ग्रामीण प्रतिभा से सीधे जुड़ने और काम पर रखने का स्थान।',
    'features.opportunities.title': 'सत्यापित अवसर',
    'features.opportunities.desc': 'सत्यापित कंपनियों की क्यूरेटेड नौकरियों की सूची तक पहुंचें, धोखाधड़ी और अनिश्चितता को कम करें।',
    
    // Employer Section
    'employers.title': 'नियोक्ताओं और व्यवसायों के लिए',
    'employers.subtitle': 'भारत के सबसे कुशल कारीगरों और श्रमिकों से जुड़ें। पारंपरिक शिल्प से लेकर आधुनिक कौशल तक, अपनी परियोजनाओं के लिए सही प्रतिभा खोजें।',
    'employers.discovery.title': 'स्मार्ट प्रतिभा खोज',
    'employers.discovery.desc': 'कौशल क्लस्टर और क्षेत्रों में AI-संचालित खोज का उपयोग करके सत्यापित कारीगरों और कुशल श्रमिकों को खोजें।',
    'employers.hiring.title': 'प्रत्यक्ष भर्ती मंच',
    'employers.hiring.desc': 'बिचौलियों या उच्च शुल्क के बिना सीधे नौकरियां पोस्ट करें, आवेदनों की समीक्षा करें और प्रतिभा को काम पर रखें।',
    'employers.quality.title': 'सत्यापित गुणवत्ता',
    'employers.quality.desc': 'गारंटीकृत गुणवत्ता के लिए सहकर्मी समर्थन और कौशल मूल्यांकन के साथ पूर्व-सत्यापित प्रतिभा तक पहुंचें।',
    'employers.scale.title': 'स्केलेबल समाधान',
    'employers.scale.desc': 'एकल परियोजनाओं से लेकर बड़े पैमाने के संचालन तक, अपनी कार्यबल आवश्यकताओं को कुशलतापूर्वक स्केल करें।',
    'employers.post_job': 'नौकरी पोस्ट करें',
    'employers.explore_map': 'प्रतिभा मानचित्र का अन्वेषण करें',
    
    // Skill Clusters
    'clusters.title': 'कौशल क्लस्टर मैपिंग',
    'clusters.subtitle': 'भारत भर में क्षेत्रीय कौशल हॉटस्पॉट की खोज करें। प्रत्येक क्लस्टर पारंपरिक कौशल और आधुनिक क्षमताओं की एकाग्रता का प्रतिनिधित्व करता है।',
    'clusters.explore': 'पूर्ण कौशल मानचित्र का अन्वेषण करें',
    'clusters.artisans': 'कारीगर',
    'clusters.skills': 'मुख्य कौशल:',
    'clusters.view_details': 'विवरण देखें',
    
    // About Section
    'about.title': 'अदृश्य कार्यबल को सशक्त बनाना',
    'about.desc1': 'ग्रामीण भारत में लाखों कुशल कारीगरों, शिल्पकारों और श्रमिकों के पास प्रतिभा है लेकिन अवसरों से जुड़ने के लिए डिजिटल दृश्यता की कमी है। भारतलिंक इसे एक सुलभ, आवाज-प्रथम मंच प्रदान करके हल करता है जो उनके कौशल को खोजने योग्य बनाता है।',
    'about.desc2': 'हम सिर्फ एक नौकरी पोर्टल नहीं हैं; हम भारत के पारंपरिक कौशलों का सम्मान और उत्थान करने वाले एक सत्यापित, भरोसेमंद और समावेशी आर्थिक नेटवर्क बनाने का आंदोलन हैं।',
    'about.pottery': 'मिट्टी के बर्तन',
    'about.weaving': 'बुनाई',
    'about.agriculture': 'कृषि',
    
    // Footer
    'footer.copyright': 'सभी अधिकार सुरक्षित।',
    'footer.project': 'एक गर्वित *इनोविंकर्स* परियोजना।'
  },
  kn: {
    // Header
    'nav.features': 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    'nav.employers': 'ನೌಕರಿದಾರರು',
    'nav.about': 'ಬಗ್ಗೆ',
    'nav.signin': 'ಸೈನ್ ಇನ್',
    'nav.signup': 'ಸೈನ್ ಅಪ್',
    
    // Hero Section
    'hero.badge': 'ಸ್ವಾವಲಂಬಿ ಭಾರತಕ್ಕಾಗಿ',
    'hero.title': 'ಭಾರತದ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಯನ್ನು ಡಿಜಿಟಲ್ ಅವಕಾಶಗಳಿಗೆ ಸಂಪರ್ಕಿಸುವುದು।',
    'hero.description': 'ಭಾರತಲಿಂಕ್ ಗ್ರಾಮೀಣ ಕೌಶಲ್ಯಗಳನ್ನು ನಗರದ ಅವಕಾಶಗಳಿಗೆ ಸಂಪರ್ಕಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಡಿಜಿಟಲ್ ಸೇತುವೆ, ಭಾರತಕ್ಕಾಗಿ ಸುಸ್ಥಿರ ಕೌಶಲ್ಯ-ಕೆಲಸ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ।',
    'hero.explore': 'ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.learn': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'hero.subtitle': 'ಭಾರತದ ಹೃದಯದಿಂದ ನಾವೀನ್ಯತೆಯ ಅಂಚಿಗೆ।',
    
    // Features Section
    'features.title': 'ಡಿಜಿಟಲ್ ಭಾರತಕ್ಕಾಗಿ ಒಂದು ವೇದಿಕೆ',
    'features.subtitle': 'ಡಿಜಿಟಲ್ ಆರ್ಥಿಕತೆಯಲ್ಲಿ ಉತ್ಕೃಷ್ಟವಾಗಲು ಅಗತ್ಯವಾದ ಸಾಧನಗಳೊಂದಿಗೆ ಪ್ರತಿ ಕುಶಲ ವ್ಯಕ್ತಿಯನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು।',
    'features.skill_mapping.title': 'ಕೌಶಲ್ಯ ಕ್ಲಸ್ಟರ್ ಮ್ಯಾಪಿಂಗ್',
    'features.skill_mapping.desc': 'ಚನ್ನಪಟ್ಟಣ ಬೊಂಬೆಗಳಿಂದ ಅಸ್ಸಾಮ್ ಹ್ಯಾಂಡ್ಲೂಮ್ ವರೆಗೆ ಪ್ರಾದೇಶಿಕ ಕೌಶಲ್ಯ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ।',
    'features.voice.title': 'ಧ್ವನಿ-ಮೊದಲ ಪ್ರವೇಶ',
    'features.voice.desc': 'ಸರಳ ಧ್ವನಿ ಆದೇಶಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯನ್ನು ಬಳಸಿಕೊಂಡು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ನೋಂದಾಯಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ।',
    'features.trust.title': 'AI + ನಂಬಿಕೆ ಪರಿಶೀಲನೆ',
    'features.trust.desc': 'ಸಹೋದ್ಯೋಗಿಗಳ ಅನುಮೋದನೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ನಿರ್ಮಿಸಿ, ಮಾತಿನ ಮಾತನ್ನು ಡಿಜಿಟಲ್ ನಂಬಿಕೆಯಾಗಿ ಪರಿವರ್ತಿಸಿ।',
    'features.matchmaking.title': 'ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚ್‌ಮೇಕಿಂಗ್',
    'features.matchmaking.desc': 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳು, ಸ್ಥಳ ಮತ್ತು ನಂಬಿಕೆ ಸ್ಕೋರ್‌ಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುವ ಪರಿಶೀಲಿತ ಉದ್ಯೋಗಗಳು ಮತ್ತು ಯೋಜನೆಗಳಿಗೆ ಸಂಪರ್ಕಗೊಳ್ಳಿ।',
    'features.collaboration.title': 'ಸಹಯೋಗ ಕೇಂದ್ರ',
    'features.collaboration.desc': 'ನಗರದ ವ್ಯವಹಾರಗಳು ಪ್ರಾಮಾಣಿಕ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಯೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಗೊಳ್ಳಲು ಮತ್ತು ನೇಮಿಸಲು ಸ್ಥಳ।',
    'features.opportunities.title': 'ಪರಿಶೀಲಿತ ಅವಕಾಶಗಳು',
    'features.opportunities.desc': 'ಪರಿಶೀಲಿತ ಕಂಪನಿಗಳ ಕ್ಯೂರೇಟೆಡ್ ಉದ್ಯೋಗಗಳ ಪಟ್ಟಿಗೆ ಪ್ರವೇಶಿಸಿ, ವಂಚನೆ ಮತ್ತು ಅನಿಶ್ಚಿತತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ।',
    
    // Employer Section
    'employers.title': 'ನೌಕರಿದಾರರು ಮತ್ತು ವ್ಯವಹಾರಗಳಿಗಾಗಿ',
    'employers.subtitle': 'ಭಾರತದ ಅತ್ಯಂತ ಕುಶಲ ಕಲಾಕಾರರು ಮತ್ತು ಕೆಲಸಗಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಗೊಳ್ಳಿ। ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲಗಳಿಂದ ಆಧುನಿಕ ಕೌಶಲ್ಯಗಳವರೆಗೆ, ನಿಮ್ಮ ಯೋಜನೆಗಳಿಗೆ ಸರಿಯಾದ ಪ್ರತಿಭೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ।',
    'employers.discovery.title': 'ಸ್ಮಾರ್ಟ್ ಪ್ರತಿಭೆ ಆವಿಷ್ಕಾರ',
    'employers.discovery.desc': 'ಕೌಶಲ್ಯ ಕ್ಲಸ್ಟರ್‌ಗಳು ಮತ್ತು ಪ್ರದೇಶಗಳಾದ್ಯಂತ AI-ಚಾಲಿತ ಹುಡುಕಾಟವನ್ನು ಬಳಸಿಕೊಂಡು ಪರಿಶೀಲಿತ ಕಲಾಕಾರರು ಮತ್ತು ಕುಶಲ ಕೆಲಸಗಾರರನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ।',
    'employers.hiring.title': 'ನೇರ ನೇಮಕಾತಿ ವೇದಿಕೆ',
    'employers.hiring.desc': 'ಮಧ್ಯಸ್ಥರ ಅಥವಾ ಹೆಚ್ಚಿನ ಶುಲ್ಕಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ಉದ್ಯೋಗಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ, ಅರ್ಜಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪ್ರತಿಭೆಯನ್ನು ನೇಮಿಸಿ।',
    'employers.quality.title': 'ಪರಿಶೀಲಿತ ಗುಣಮಟ್ಟ',
    'employers.quality.desc': 'ಅನುಮೋದಿತ ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ಸಹೋದ್ಯೋಗಿಗಳ ಅನುಮೋದನೆಗಳು ಮತ್ತು ಕೌಶಲ್ಯ ಮೌಲ್ಯಮಾಪನಗಳೊಂದಿಗೆ ಪೂರ್ವ-ಪರಿಶೀಲಿತ ಪ್ರತಿಭೆಗೆ ಪ್ರವೇಶಿಸಿ।',
    'employers.scale.title': 'ಸ್ಕೇಲಬಲ್ ಪರಿಹಾರಗಳು',
    'employers.scale.desc': 'ಏಕ ಯೋಜನೆಗಳಿಂದ ದೊಡ್ಡ ಪ್ರಮಾಣದ ಕಾರ್ಯಾಚರಣೆಗಳವರೆಗೆ, ನಿಮ್ಮ ಕಾರ್ಯಪಡೆಯ ಅಗತ್ಯಗಳನ್ನು ಸಮರ್ಥವಾಗಿ ಸ್ಕೇಲ್ ಮಾಡಿ।',
    'employers.post_job': 'ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಮಾಡಿ',
    'employers.explore_map': 'ಪ್ರತಿಭೆ ನಕ್ಷೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    
    // Skill Clusters
    'clusters.title': 'ಕೌಶಲ್ಯ ಕ್ಲಸ್ಟರ್ ಮ್ಯಾಪಿಂಗ್',
    'clusters.subtitle': 'ಭಾರತದಾದ್ಯಂತ ಪ್ರಾದೇಶಿಕ ಕೌಶಲ್ಯ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ। ಪ್ರತಿ ಕ್ಲಸ್ಟರ್ ಸಾಂಪ್ರದಾಯಿಕ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆಧುನಿಕ ಸಾಮರ್ಥ್ಯಗಳ ಸಾಂದ್ರತೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ।',
    'clusters.explore': 'ಪೂರ್ಣ ಕೌಶಲ್ಯ ನಕ್ಷೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'clusters.artisans': 'ಕಲಾಕಾರರು',
    'clusters.skills': 'ಮುಖ್ಯ ಕೌಶಲ್ಯಗಳು:',
    'clusters.view_details': 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    
    // About Section
    'about.title': 'ಅದೃಶ್ಯ ಕಾರ್ಯಪಡೆಯನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು',
    'about.desc1': 'ಗ್ರಾಮೀಣ ಭಾರತದಲ್ಲಿ ಲಕ್ಷಾಂತರ ಕುಶಲ ಕಲಾಕಾರರು, ಕರಕುಶಲಿಗರು ಮತ್ತು ಕೆಲಸಗಾರರಿಗೆ ಪ್ರತಿಭೆ ಇದೆ ಆದರೆ ಅವಕಾಶಗಳಿಗೆ ಸಂಪರ್ಕಗೊಳ್ಳಲು ಡಿಜಿಟಲ್ ಗೋಚರತೆ ಕಡಿಮೆ ಇದೆ। ಭಾರತಲಿಂಕ್ ಅವರ ಕೌಶಲ್ಯಗಳನ್ನು ಗೋಚರವಾಗಿಸುವ ಸುಲಭ, ಧ್ವನಿ-ಮೊದಲ ವೇದಿಕೆಯನ್ನು ಒದಗಿಸುವ ಮೂಲಕ ಇದನ್ನು ಪರಿಹರಿಸುತ್ತದೆ।',
    'about.desc2': 'ನಾವು ಕೇವಲ ಉದ್ಯೋಗ ಪೋರ್ಟಲ್ ಅಲ್ಲ; ಭಾರತದ ಸಾಂಪ್ರದಾಯಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಗೌರವಿಸುವ ಮತ್ತು ಉನ್ನತಿಗೊಳಿಸುವ ಪರಿಶೀಲಿತ, ನಂಬಲರ್ಹ ಮತ್ತು ಸಮಾವೇಶಿ ಆರ್ಥಿಕ ನೆಟ್‌ವರ್ಕ್ ನಿರ್ಮಿಸುವ ಚಳುವಳಿ ನಾವು।',
    'about.pottery': 'ಮಡಕೆ',
    'about.weaving': 'ನೇಯ್ಗೆ',
    'about.agriculture': 'ಕೃಷಿ',
    
    // Footer
    'footer.copyright': 'ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿವೆ.',
    'footer.project': 'ಒಂದು ಹೆಮ್ಮೆಯ *ಇನ್ನೋವಿಂಕರ್ಸ್* ಯೋಜನೆ.'
  },
  bn: {
    // Header
    'nav.features': 'বৈশিষ্ট্য',
    'nav.employers': 'নিয়োগকর্তা',
    'nav.about': 'সম্পর্কে',
    'nav.signin': 'সাইন ইন',
    'nav.signup': 'সাইন আপ',
    
    // Hero Section
    'hero.badge': 'আত্মনির্ভর ভারতের জন্য',
    'hero.title': 'ভারতের গ্রামীণ প্রতিভাকে ডিজিটাল সুযোগের সাথে সংযুক্ত করা।',
    'hero.description': 'ভারতলিংক একটি ডিজিটাল সেতু যা গ্রামীণ দক্ষতাকে শহুরে সুযোগের সাথে সংযুক্ত করার জন্য ডিজাইন করা হয়েছে, ভারতের জন্য একটি টেকসই দক্ষতা-থেকে-কাজের বাস্তুতন্ত্র তৈরি করে।',
    'hero.explore': 'সুযোগগুলি অন্বেষণ করুন',
    'hero.learn': 'আরও জানুন',
    'hero.subtitle': 'ভারতের হৃদয় থেকে উদ্ভাবনের প্রান্তে।',
    
    // Features Section
    'features.title': 'ডিজিটাল ভারতের জন্য একটি প্ল্যাটফর্ম',
    'features.subtitle': 'ডিজিটাল অর্থনীতিতে উন্নতি লাভের জন্য প্রয়োজনীয় সরঞ্জাম দিয়ে প্রতিটি দক্ষ ব্যক্তিকে ক্ষমতায়ন করা।',
    'features.skill_mapping.title': 'দক্ষতা ক্লাস্টার ম্যাপিং',
    'features.skill_mapping.desc': 'চান্নাপটনা খেলনা থেকে আসাম হ্যান্ডলুম পর্যন্ত আঞ্চলিক দক্ষতা হটস্পট আবিষ্কার করুন।',
    'features.voice.title': 'ভয়েস-ফার্স্ট অ্যাক্সেস',
    'features.voice.desc': 'সরল ভয়েস কমান্ড দিয়ে আপনার স্থানীয় ভাষা ব্যবহার করে আপনার প্রোফাইল নিবন্ধন এবং পরিচালনা করুন।',
    'features.trust.title': 'AI + ট্রাস্ট যাচাই',
    'features.trust.desc': 'সহকর্মীদের অনুমোদনের সাথে আপনার বিশ্বাসযোগ্যতা গড়ে তুলুন, মুখের কথাকে ডিজিটাল ট্রাস্টে রূপান্তরিত করুন।',
    'features.matchmaking.title': 'স্মার্ট ম্যাচমেকিং',
    'features.matchmaking.desc': 'যাচাইকৃত চাকরি এবং প্রকল্পের সাথে সংযুক্ত হন যা আপনার দক্ষতা, অবস্থান এবং ট্রাস্ট স্কোরের সাথে মিলে যায়।',
    'features.collaboration.title': 'সহযোগিতা কেন্দ্র',
    'features.collaboration.desc': 'শহুরে ব্যবসার জন্য প্রামাণিক গ্রামীণ প্রতিভার সাথে সরাসরি সংযোগ স্থাপন এবং নিয়োগের স্থান।',
    'features.opportunities.title': 'যাচাইকৃত সুযোগ',
    'features.opportunities.desc': 'যাচাইকৃত কোম্পানির কিউরেটেড চাকরির তালিকায় অ্যাক্সেস করুন, জালিয়াতি এবং অনিশ্চিততা কমিয়ে দিন।',
    
    // Employer Section
    'employers.title': 'নিয়োগকর্তা এবং ব্যবসার জন্য',
    'employers.subtitle': 'ভারতের সবচেয়ে দক্ষ কারিগর এবং কর্মীদের সাথে সংযুক্ত হন। ঐতিহ্যগত কারুশিল্প থেকে আধুনিক দক্ষতা পর্যন্ত, আপনার প্রকল্পের জন্য সঠিক প্রতিভা খুঁজুন।',
    'employers.discovery.title': 'স্মার্ট প্রতিভা আবিষ্কার',
    'employers.discovery.desc': 'দক্ষতা ক্লাস্টার এবং অঞ্চল জুড়ে AI-চালিত অনুসন্ধান ব্যবহার করে যাচাইকৃত কারিগর এবং দক্ষ কর্মীদের খুঁজুন।',
    'employers.hiring.title': 'প্রত্যক্ষ নিয়োগ প্ল্যাটফর্ম',
    'employers.hiring.desc': 'মধ্যস্থতাকারী বা উচ্চ ফি ছাড়াই সরাসরি চাকরি পোস্ট করুন, আবেদন পর্যালোচনা করুন এবং প্রতিভা নিয়োগ করুন।',
    'employers.quality.title': 'যাচাইকৃত গুণমান',
    'employers.quality.desc': 'গ্যারান্টিযুক্ত গুণমানের জন্য সহকর্মীদের অনুমোদন এবং দক্ষতা মূল্যায়নের সাথে প্রাক-যাচাইকৃত প্রতিভায় অ্যাক্সেস করুন।',
    'employers.scale.title': 'স্কেলেবল সমাধান',
    'employers.scale.desc': 'একক প্রকল্প থেকে বৃহৎ আকারের অপারেশন পর্যন্ত, আপনার কর্মশক্তির চাহিদা দক্ষতার সাথে স্কেল করুন।',
    'employers.post_job': 'চাকরি পোস্ট করুন',
    'employers.explore_map': 'প্রতিভা মানচিত্র অন্বেষণ করুন',
    
    // Skill Clusters
    'clusters.title': 'দক্ষতা ক্লাস্টার ম্যাপিং',
    'clusters.subtitle': 'ভারত জুড়ে আঞ্চলিক দক্ষতা হটস্পট আবিষ্কার করুন। প্রতিটি ক্লাস্টার ঐতিহ্যগত দক্ষতা এবং আধুনিক ক্ষমতার ঘনত্বের প্রতিনিধিত্ব করে।',
    'clusters.explore': 'সম্পূর্ণ দক্ষতা মানচিত্র অন্বেষণ করুন',
    'clusters.artisans': 'কারিগর',
    'clusters.skills': 'মূল দক্ষতা:',
    'clusters.view_details': 'বিস্তারিত দেখুন',
    
    // About Section
    'about.title': 'অদৃশ্য কর্মশক্তিকে ক্ষমতায়ন',
    'about.desc1': 'গ্রামীণ ভারতে লক্ষ লক্ষ দক্ষ কারিগর, কারুশিল্পী এবং কর্মীদের প্রতিভা আছে কিন্তু সুযোগের সাথে সংযোগের জন্য ডিজিটাল দৃশ্যমানতার অভাব রয়েছে। ভারতলিংক তাদের দক্ষতাকে আবিষ্কারযোগ্য করে তোলার জন্য একটি অ্যাক্সেসযোগ্য, ভয়েস-ফার্স্ট প্ল্যাটফর্ম প্রদান করে এটি সমাধান করে।',
    'about.desc2': 'আমরা শুধু একটি চাকরি পোর্টাল নই; আমরা ভারতের ঐতিহ্যগত দক্ষতাকে সম্মান এবং উন্নত করার জন্য একটি যাচাইকৃত, বিশ্বস্ত এবং অন্তর্ভুক্তিমূলক অর্থনৈতিক নেটওয়ার্ক গড়ে তোলার আন্দোলন।',
    'about.pottery': 'মৃৎশিল্প',
    'about.weaving': 'বুনন',
    'about.agriculture': 'কৃষি',
    
    // Footer
    'footer.copyright': 'সকল অধিকার সংরক্ষিত।',
    'footer.project': 'একটি গর্বিত *ইনোভিঙ্কার্স* প্রকল্প।'
  }
};

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('bharatlink-language') as Language;
    if (savedLanguage && ['en', 'hi', 'kn', 'bn'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('bharatlink-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
