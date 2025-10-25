"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'bn';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
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
    'footer.project': 'A proud *Innovinkers* project.',
    
    // Auth Pages
    'auth.welcome_back': 'Welcome back to India\'s skill-to-work network',
    'auth.join_network': 'Join India\'s skill-to-work network',
    'auth.signin': 'Sign In',
    'auth.signup': 'Create Account',
    'auth.access_account': 'Access your account to continue your journey',
    'auth.start_journey': 'Start your journey to connect skills with opportunities',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.full_name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.location': 'Location',
    'auth.confirm_password': 'Confirm Password',
    'auth.remember_me': 'Remember me',
    'auth.forgot_password': 'Forgot password?',
    'auth.signing_in': 'Signing in...',
    'auth.creating_account': 'Creating account...',
    'auth.dont_have_account': 'Don\'t have an account?',
    'auth.create_one': 'Create one now',
    'auth.already_have_account': 'Already have an account?',
    'auth.sign_in_here': 'Sign in here',
    'auth.continue_with': 'Or continue with',
    'auth.back_to_home': '← Back to home',
    'auth.artisan_worker': 'Artisan/Skilled Worker',
    'auth.employer_business': 'Employer/Business',
    'auth.terms_agree': 'I agree to the',
    'auth.terms_service': 'Terms of Service',
    'auth.privacy_policy': 'Privacy Policy',
    'auth.enter_email': 'Enter your email',
    'auth.enter_password': 'Enter your password',
    'auth.enter_name': 'Enter your full name',
    'auth.enter_phone': 'Enter your phone number',
    'auth.enter_location': 'City, State',
    'auth.create_password': 'Create a password',
    'auth.confirm_your_password': 'Confirm your password',
    'auth.fill_all_fields': 'Please fill in all fields',
    'auth.fill_required_fields': 'Please fill in all required fields',
    'auth.passwords_no_match': 'Passwords do not match',
    'auth.password_length': 'Password must be at least 6 characters long',
    'auth.invalid_credentials': 'Invalid credentials. Please try again.',
    'auth.failed_create': 'Failed to create account. Please try again.',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.gateway': 'Here\'s your gateway to new opportunities and collaborations.',
    'dashboard.profile_strength': 'Profile Strength',
    'dashboard.strong': 'Strong',
    'dashboard.based_on_skills': 'Based on your skills and endorsements',
    'dashboard.total_endorsements': 'Total Endorsements',
    'dashboard.from_peers': 'From peers and employers',
    'dashboard.skill_hotspot': 'Skill Hotspot',
    'dashboard.top_region': 'Top region for your skills',
    'dashboard.collaboration_requests': 'Collaboration Requests',
    'dashboard.new_inquiries': 'New inquiries this month',
    'dashboard.recommended_opportunities': 'Recommended Opportunities',
    'dashboard.ai_matches': 'AI-powered matches based on your profile.',
    'dashboard.view_all_opportunities': 'View All Opportunities',
    'dashboard.skill_endorsements': 'Skill Endorsements',
    'dashboard.visual_breakdown': 'A visual breakdown of your endorsements by skill.',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.opportunities': 'Opportunities',
    'nav.map': 'Map',
    'nav.collaboration': 'Collaboration',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.employer': 'Employer',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.apply': 'Apply',
    'common.clear': 'Clear',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    // Opportunities
    'opportunities.title': 'Find Your Next Opportunity',
    'opportunities.subtitle': 'Browse jobs, projects, and collaboration requests tailored for you.',
    'opportunities.search_placeholder': 'Search by title or skill...',
    'opportunities.filter': 'Filter',
    'opportunities.filter_by': 'Filter by',
    'opportunities.full_time': 'Full-time',
    'opportunities.part_time': 'Part-time',
    'opportunities.contract': 'Contract',
    // Employer Dashboard
    'employer.dashboard_title': 'Employer Dashboard',
    'employer.welcome_message': 'Welcome back to {company}! Manage your job posts and applicants.',
    'employer.post_new_job': 'Post New Job',
    'employer.overview': 'Overview',
    'employer.job_posts': 'Job Posts',
    'employer.applicants': 'Applicants',
    'employer.analytics': 'Analytics',
    'employer.recent_job_posts': 'Recent Job Posts',
    'employer.recent_job_posts_desc': 'Your latest job postings and their performance',
    // Profile
    'profile.contact': 'Contact',
    'profile.share': 'Share',
    'profile.about': 'About',
    'profile.skills': 'Skills',
    'profile.add_skills_voice': 'Add Skills with Voice',
    'profile.no_skills_yet': 'No skills added yet. Use the voice input to add your skills!',
    'profile.endorsements': 'Endorsements',
    'profile.no_endorsements_yet': 'No endorsements yet. Build your network to get endorsements!'
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
    'footer.project': 'एक गर्वित *इनोविंकर्स* परियोजना।',
    
    // Auth Pages
    'auth.welcome_back': 'भारत के कौशल-से-काम नेटवर्क में वापस स्वागत है',
    'auth.join_network': 'भारत के कौशल-से-काम नेटवर्क में शामिल हों',
    'auth.signin': 'साइन इन',
    'auth.signup': 'खाता बनाएं',
    'auth.access_account': 'अपनी यात्रा जारी रखने के लिए अपने खाते तक पहुंचें',
    'auth.start_journey': 'कौशल को अवसरों से जोड़ने की अपनी यात्रा शुरू करें',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.full_name': 'पूरा नाम',
    'auth.phone': 'फोन नंबर',
    'auth.location': 'स्थान',
    'auth.confirm_password': 'पासवर्ड की पुष्टि करें',
    'auth.remember_me': 'मुझे याद रखें',
    'auth.forgot_password': 'पासवर्ड भूल गए?',
    'auth.signing_in': 'साइन इन हो रहे हैं...',
    'auth.creating_account': 'खाता बनाया जा रहा है...',
    'auth.dont_have_account': 'खाता नहीं है?',
    'auth.create_one': 'अभी बनाएं',
    'auth.already_have_account': 'पहले से खाता है?',
    'auth.sign_in_here': 'यहां साइन इन करें',
    'auth.continue_with': 'या इसके साथ जारी रखें',
    'auth.back_to_home': '← होम पर वापस जाएं',
    'auth.artisan_worker': 'कारीगर/कुशल कर्मचारी',
    'auth.employer_business': 'नियोक्ता/व्यवसाय',
    'auth.terms_agree': 'मैं सहमत हूं',
    'auth.terms_service': 'सेवा की शर्तें',
    'auth.privacy_policy': 'गोपनीयता नीति',
    'auth.enter_email': 'अपना ईमेल दर्ज करें',
    'auth.enter_password': 'अपना पासवर्ड दर्ज करें',
    'auth.enter_name': 'अपना पूरा नाम दर्ज करें',
    'auth.enter_phone': 'अपना फोन नंबर दर्ज करें',
    'auth.enter_location': 'शहर, राज्य',
    'auth.create_password': 'पासवर्ड बनाएं',
    'auth.confirm_your_password': 'अपने पासवर्ड की पुष्टि करें',
    'auth.fill_all_fields': 'कृपया सभी फ़ील्ड भरें',
    'auth.fill_required_fields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
    'auth.passwords_no_match': 'पासवर्ड मेल नहीं खाते',
    'auth.password_length': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    'auth.invalid_credentials': 'अमान्य क्रेडेंशियल। कृपया फिर से कोशिश करें।',
    'auth.failed_create': 'खाता बनाने में विफल। कृपया फिर से कोशिश करें।',
    
    // Dashboard
    'dashboard.welcome': 'वापस स्वागत है',
    'dashboard.gateway': 'यहां नए अवसरों और सहयोग के लिए आपका प्रवेश द्वार है।',
    'dashboard.profile_strength': 'प्रोफ़ाइल शक्ति',
    'dashboard.strong': 'मजबूत',
    'dashboard.based_on_skills': 'आपके कौशल और समर्थन के आधार पर',
    'dashboard.total_endorsements': 'कुल समर्थन',
    'dashboard.from_peers': 'सहकर्मियों और नियोक्ताओं से',
    'dashboard.skill_hotspot': 'कौशल हॉटस्पॉट',
    'dashboard.top_region': 'आपके कौशल के लिए शीर्ष क्षेत्र',
    'dashboard.collaboration_requests': 'सहयोग अनुरोध',
    'dashboard.new_inquiries': 'इस महीने नए पूछताछ',
    'dashboard.recommended_opportunities': 'अनुशंसित अवसर',
    'dashboard.ai_matches': 'आपके प्रोफ़ाइल के आधार पर AI-संचालित मैच।',
    'dashboard.view_all_opportunities': 'सभी अवसर देखें',
    'dashboard.skill_endorsements': 'कौशल समर्थन',
    'dashboard.visual_breakdown': 'कौशल के अनुसार आपके समर्थन का दृश्य विभाजन।',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.opportunities': 'अवसर',
    'nav.map': 'नक्शा',
    'nav.collaboration': 'सहयोग',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.settings': 'सेटिंग्स',
    'nav.employer': 'नियोक्ता',
    'nav.logout': 'लॉगआउट',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.sort': 'क्रमबद्ध करें',
    'common.apply': 'लागू करें',
    'common.clear': 'साफ़ करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.submit': 'जमा करें',
    'common.close': 'बंद करें',
    'common.open': 'खोलें',
    'common.yes': 'हाँ',
    'common.no': 'नहीं',
    'common.ok': 'ठीक है',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    // Opportunities
    'opportunities.title': 'अपना अगला अवसर खोजें',
    'opportunities.subtitle': 'आपके लिए तैयार नौकरियों, परियोजनाओं और सहयोग अनुरोधों को ब्राउज़ करें।',
    'opportunities.search_placeholder': 'शीर्षक या कौशल से खोजें...',
    'opportunities.filter': 'फ़िल्टर',
    'opportunities.filter_by': 'फ़िल्टर करें',
    'opportunities.full_time': 'पूर्णकालिक',
    'opportunities.part_time': 'अंशकालिक',
    'opportunities.contract': 'अनुबंध',
    // Employer Dashboard
    'employer.dashboard_title': 'नियोक्ता डैशबोर्ड',
    'employer.welcome_message': '{company} में वापस स्वागत है! अपनी नौकरी पोस्ट और आवेदकों का प्रबंधन करें।',
    'employer.post_new_job': 'नई नौकरी पोस्ट करें',
    'employer.overview': 'अवलोकन',
    'employer.job_posts': 'नौकरी पोस्ट',
    'employer.applicants': 'आवेदक',
    'employer.analytics': 'विश्लेषण',
    'employer.recent_job_posts': 'हाल की नौकरी पोस्ट',
    'employer.recent_job_posts_desc': 'आपकी नवीनतम नौकरी पोस्टिंग और उनका प्रदर्शन',
    // Profile
    'profile.contact': 'संपर्क',
    'profile.share': 'साझा करें',
    'profile.about': 'के बारे में',
    'profile.skills': 'कौशल',
    'profile.add_skills_voice': 'आवाज़ से कौशल जोड़ें',
    'profile.no_skills_yet': 'अभी तक कोई कौशल नहीं जोड़े गए। अपने कौशल जोड़ने के लिए आवाज़ इनपुट का उपयोग करें!',
    'profile.endorsements': 'समर्थन',
    'profile.no_endorsements_yet': 'अभी तक कोई समर्थन नहीं। समर्थन पाने के लिए अपना नेटवर्क बनाएं!'
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
    'footer.project': 'ಒಂದು ಹೆಮ್ಮೆಯ *ಇನ್ನೋವಿಂಕರ್ಸ್* ಯೋಜನೆ.',
    
    // Auth Pages
    'auth.welcome_back': 'ಭಾರತದ ಕೌಶಲ್ಯ-ಇಂದ-ಕೆಲಸ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಮತ್ತೆ ಸ್ವಾಗತ',
    'auth.join_network': 'ಭಾರತದ ಕೌಶಲ್ಯ-ಇಂದ-ಕೆಲಸ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸೇರಿ',
    'auth.signin': 'ಸೈನ್ ಇನ್',
    'auth.signup': 'ಖಾತೆ ರಚಿಸಿ',
    'auth.access_account': 'ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಖಾತೆಗೆ ಪ್ರವೇಶಿಸಿ',
    'auth.start_journey': 'ಕೌಶಲ್ಯಗಳನ್ನು ಅವಕಾಶಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲು ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'auth.email': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'auth.password': 'ಪಾಸ್‌ವರ್ಡ್',
    'auth.full_name': 'ಪೂರ್ಣ ಹೆಸರು',
    'auth.phone': 'ಫೋನ್ ಸಂಖ್ಯೆ',
    'auth.location': 'ಸ್ಥಳ',
    'auth.confirm_password': 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    'auth.remember_me': 'ನನ್ನನ್ನು ನೆನಪಿಡಿ',
    'auth.forgot_password': 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    'auth.signing_in': 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
    'auth.creating_account': 'ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...',
    'auth.dont_have_account': 'ಖಾತೆ ಇಲ್ಲವೇ?',
    'auth.create_one': 'ಈಗ ರಚಿಸಿ',
    'auth.already_have_account': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    'auth.sign_in_here': 'ಇಲ್ಲಿ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'auth.continue_with': 'ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಸಿ',
    'auth.back_to_home': '← ಮನೆಗೆ ಹಿಂತಿರುಗಿ',
    'auth.artisan_worker': 'ಕಲಾಕಾರ/ಕುಶಲ ಕೆಲಸಗಾರ',
    'auth.employer_business': 'ನೌಕರಿದಾರ/ವ್ಯವಹಾರ',
    'auth.terms_agree': 'ನಾನು ಒಪ್ಪುತ್ತೇನೆ',
    'auth.terms_service': 'ಸೇವಾ ನಿಯಮಗಳು',
    'auth.privacy_policy': 'ಗೌಪ್ಯತೆ ನೀತಿ',
    'auth.enter_email': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    'auth.enter_password': 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    'auth.enter_name': 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ',
    'auth.enter_phone': 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
    'auth.enter_location': 'ನಗರ, ರಾಜ್ಯ',
    'auth.create_password': 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
    'auth.confirm_your_password': 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    'auth.fill_all_fields': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ',
    'auth.fill_required_fields': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ',
    'auth.passwords_no_match': 'ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುವುದಿಲ್ಲ',
    'auth.password_length': 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು ಇರಬೇಕು',
    'auth.invalid_credentials': 'ಅಮಾನ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'auth.failed_create': 'ಖಾತೆ ರಚಿಸಲು ವಿಫಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    
    // Dashboard
    'dashboard.welcome': 'ಮತ್ತೆ ಸ್ವಾಗತ',
    'dashboard.gateway': 'ಇಲ್ಲಿ ಹೊಸ ಅವಕಾಶಗಳು ಮತ್ತು ಸಹಯೋಗಗಳಿಗೆ ನಿಮ್ಮ ಪ್ರವೇಶದ್ವಾರ.',
    'dashboard.profile_strength': 'ಪ್ರೊಫೈಲ್ ಶಕ್ತಿ',
    'dashboard.strong': 'ಬಲವಾದ',
    'dashboard.based_on_skills': 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಅನುಮೋದನೆಗಳ ಆಧಾರದ ಮೇಲೆ',
    'dashboard.total_endorsements': 'ಒಟ್ಟು ಅನುಮೋದನೆಗಳು',
    'dashboard.from_peers': 'ಸಹೋದ್ಯೋಗಿಗಳು ಮತ್ತು ನೌಕರಿದಾರರಿಂದ',
    'dashboard.skill_hotspot': 'ಕೌಶಲ್ಯ ಹಾಟ್‌ಸ್ಪಾಟ್',
    'dashboard.top_region': 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳಿಗೆ ಉನ್ನತ ಪ್ರದೇಶ',
    'dashboard.collaboration_requests': 'ಸಹಯೋಗ ವಿನಂತಿಗಳು',
    'dashboard.new_inquiries': 'ಈ ತಿಂಗಳ ಹೊಸ ವಿಚಾರಣೆಗಳು',
    'dashboard.recommended_opportunities': 'ಶಿಫಾರಸು ಮಾಡಿದ ಅವಕಾಶಗಳು',
    'dashboard.ai_matches': 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಧಾರದ ಮೇಲೆ AI-ಚಾಲಿತ ಹೊಂದಾಣಿಕೆಗಳು.',
    'dashboard.view_all_opportunities': 'ಎಲ್ಲಾ ಅವಕಾಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'dashboard.skill_endorsements': 'ಕೌಶಲ್ಯ ಅನುಮೋದನೆಗಳು',
    'dashboard.visual_breakdown': 'ಕೌಶಲ್ಯದ ಪ್ರಕಾರ ನಿಮ್ಮ ಅನುಮೋದನೆಗಳ ದೃಶ್ಯ ವಿಭಜನೆ.',
    
    // Navigation
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.opportunities': 'ಅವಕಾಶಗಳು',
    'nav.map': 'ನಕ್ಷೆ',
    'nav.collaboration': 'ಸಹಯೋಗ',
    'nav.profile': 'ಪ್ರೊಫೈಲ್',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav.employer': 'ನೌಕರಿದಾರ',
    'nav.logout': 'ಲಾಗ್‌ಔಟ್',
    
    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.save': 'ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.view': 'ವೀಕ್ಷಿಸಿ',
    'common.search': 'ಹುಡುಕಿ',
    'common.filter': 'ಫಿಲ್ಟರ್',
    'common.sort': 'ವಿಂಗಡಿಸಿ',
    'common.apply': 'ಅನ್ವಯಿಸಿ',
    'common.clear': 'ಸ್ಪಷ್ಟಗೊಳಿಸಿ',
    'common.back': 'ಹಿಂದಕ್ಕೆ',
    'common.next': 'ಮುಂದೆ',
    'common.previous': 'ಹಿಂದಿನ',
    'common.submit': 'ಸಲ್ಲಿಸಿ',
    'common.close': 'ಮುಚ್ಚಿ',
    'common.open': 'ತೆರೆಯಿರಿ',
    'common.yes': 'ಹೌದು',
    'common.no': 'ಇಲ್ಲ',
    'common.ok': 'ಸರಿ',
    'common.error': 'ದೋಷ',
    'common.success': 'ಯಶಸ್ಸು',
    'common.warning': 'ಎಚ್ಚರಿಕೆ',
    'common.info': 'ಮಾಹಿತಿ',
    // Opportunities
    'opportunities.title': 'ನಿಮ್ಮ ಮುಂದಿನ ಅವಕಾಶವನ್ನು ಹುಡುಕಿ',
    'opportunities.subtitle': 'ನಿಮಗಾಗಿ ಹೊಂದಿಸಲಾದ ಉದ್ಯೋಗಗಳು, ಯೋಜನೆಗಳು ಮತ್ತು ಸಹಯೋಗ ವಿನಂತಿಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.',
    'opportunities.search_placeholder': 'ಶೀರ್ಷಿಕೆ ಅಥವಾ ಕೌಶಲ್ಯದಿಂದ ಹುಡುಕಿ...',
    'opportunities.filter': 'ಫಿಲ್ಟರ್',
    'opportunities.filter_by': 'ಫಿಲ್ಟರ್ ಮಾಡಿ',
    'opportunities.full_time': 'ಪೂರ್ಣ ಸಮಯ',
    'opportunities.part_time': 'ಅಂಶಕಾಲಿಕ',
    'opportunities.contract': 'ಒಪ್ಪಂದ',
    // Employer Dashboard
    'employer.dashboard_title': 'ನೌಕರಿದಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'employer.welcome_message': '{company} ಗೆ ಸ್ವಾಗತ! ನಿಮ್ಮ ಉದ್ಯೋಗ ಪೋಸ್ಟ್‌ಗಳು ಮತ್ತು ಅರ್ಜಿದಾರರನ್ನು ನಿರ್ವಹಿಸಿ.',
    'employer.post_new_job': 'ಹೊಸ ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಮಾಡಿ',
    'employer.overview': 'ಅವಲೋಕನ',
    'employer.job_posts': 'ಉದ್ಯೋಗ ಪೋಸ್ಟ್‌ಗಳು',
    'employer.applicants': 'ಅರ್ಜಿದಾರರು',
    'employer.analytics': 'ವಿಶ್ಲೇಷಣೆ',
    'employer.recent_job_posts': 'ಇತ್ತೀಚಿನ ಉದ್ಯೋಗ ಪೋಸ್ಟ್‌ಗಳು',
    'employer.recent_job_posts_desc': 'ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಉದ್ಯೋಗ ಪೋಸ್ಟ್‌ಗಳು ಮತ್ತು ಅವುಗಳ ಕಾರ್ಯಕ್ಷಮತೆ',
    // Profile
    'profile.contact': 'ಸಂಪರ್ಕ',
    'profile.share': 'ಹಂಚಿಕೊಳ್ಳಿ',
    'profile.about': 'ಬಗ್ಗೆ',
    'profile.skills': 'ಕೌಶಲ್ಯಗಳು',
    'profile.add_skills_voice': 'ಧ್ವನಿಯೊಂದಿಗೆ ಕೌಶಲ್ಯಗಳನ್ನು ಸೇರಿಸಿ',
    'profile.no_skills_yet': 'ಇನ್ನೂ ಯಾವುದೇ ಕೌಶಲ್ಯಗಳು ಸೇರಿಸಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳನ್ನು ಸೇರಿಸಲು ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಿ!',
    'profile.endorsements': 'ಬೆಂಬಲಗಳು',
    'profile.no_endorsements_yet': 'ಇನ್ನೂ ಯಾವುದೇ ಬೆಂಬಲಗಳಿಲ್ಲ. ಬೆಂಬಲಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ನಿರ್ಮಿಸಿ!'
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
    'footer.project': 'একটি গর্বিত *ইনোভিঙ্কার্স* প্রকল্প।',
    
    // Auth Pages
    'auth.welcome_back': 'ভারতের দক্ষতা-থেকে-কাজের নেটওয়ার্কে ফিরে স্বাগতম',
    'auth.join_network': 'ভারতের দক্ষতা-থেকে-কাজের নেটওয়ার্কে যোগ দিন',
    'auth.signin': 'সাইন ইন',
    'auth.signup': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.access_account': 'আপনার যাত্রা চালিয়ে যেতে আপনার অ্যাকাউন্টে অ্যাক্সেস করুন',
    'auth.start_journey': 'দক্ষতাকে সুযোগের সাথে সংযুক্ত করার আপনার যাত্রা শুরু করুন',
    'auth.email': 'ইমেইল ঠিকানা',
    'auth.password': 'পাসওয়ার্ড',
    'auth.full_name': 'পূর্ণ নাম',
    'auth.phone': 'ফোন নম্বর',
    'auth.location': 'অবস্থান',
    'auth.confirm_password': 'পাসওয়ার্ড নিশ্চিত করুন',
    'auth.remember_me': 'আমাকে মনে রাখুন',
    'auth.forgot_password': 'পাসওয়ার্ড ভুলে গেছেন?',
    'auth.signing_in': 'সাইন ইন হচ্ছে...',
    'auth.creating_account': 'অ্যাকাউন্ট তৈরি হচ্ছে...',
    'auth.dont_have_account': 'অ্যাকাউন্ট নেই?',
    'auth.create_one': 'এখনই তৈরি করুন',
    'auth.already_have_account': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    'auth.sign_in_here': 'এখানে সাইন ইন করুন',
    'auth.continue_with': 'অথবা এর সাথে চালিয়ে যান',
    'auth.back_to_home': '← বাড়িতে ফিরুন',
    'auth.artisan_worker': 'কারিগর/দক্ষ কর্মী',
    'auth.employer_business': 'নিয়োগকর্তা/ব্যবসা',
    'auth.terms_agree': 'আমি সম্মত',
    'auth.terms_service': 'সেবার শর্তাবলী',
    'auth.privacy_policy': 'গোপনীয়তা নীতি',
    'auth.enter_email': 'আপনার ইমেইল লিখুন',
    'auth.enter_password': 'আপনার পাসওয়ার্ড লিখুন',
    'auth.enter_name': 'আপনার পূর্ণ নাম লিখুন',
    'auth.enter_phone': 'আপনার ফোন নম্বর লিখুন',
    'auth.enter_location': 'শহর, রাজ্য',
    'auth.create_password': 'পাসওয়ার্ড তৈরি করুন',
    'auth.confirm_your_password': 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
    'auth.fill_all_fields': 'অনুগ্রহ করে সব ফিল্ড পূরণ করুন',
    'auth.fill_required_fields': 'অনুগ্রহ করে সব প্রয়োজনীয় ফিল্ড পূরণ করুন',
    'auth.passwords_no_match': 'পাসওয়ার্ড মিলছে না',
    'auth.password_length': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    'auth.invalid_credentials': 'অবৈধ পরিচয়। অনুগ্রহ করে আবার চেষ্টা করুন।',
    'auth.failed_create': 'অ্যাকাউন্ট তৈরি করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
    
    // Dashboard
    'dashboard.welcome': 'ফিরে স্বাগতম',
    'dashboard.gateway': 'এখানে নতুন সুযোগ এবং সহযোগিতার জন্য আপনার প্রবেশদ্বার।',
    'dashboard.profile_strength': 'প্রোফাইল শক্তি',
    'dashboard.strong': 'শক্তিশালী',
    'dashboard.based_on_skills': 'আপনার দক্ষতা এবং অনুমোদনের ভিত্তিতে',
    'dashboard.total_endorsements': 'মোট অনুমোদন',
    'dashboard.from_peers': 'সহকর্মী এবং নিয়োগকর্তাদের কাছ থেকে',
    'dashboard.skill_hotspot': 'দক্ষতা হটস্পট',
    'dashboard.top_region': 'আপনার দক্ষতার জন্য শীর্ষ অঞ্চল',
    'dashboard.collaboration_requests': 'সহযোগিতা অনুরোধ',
    'dashboard.new_inquiries': 'এই মাসের নতুন অনুসন্ধান',
    'dashboard.recommended_opportunities': 'প্রস্তাবিত সুযোগ',
    'dashboard.ai_matches': 'আপনার প্রোফাইলের ভিত্তিতে AI-চালিত ম্যাচ।',
    'dashboard.view_all_opportunities': 'সব সুযোগ দেখুন',
    'dashboard.skill_endorsements': 'দক্ষতা অনুমোদন',
    'dashboard.visual_breakdown': 'দক্ষতা অনুযায়ী আপনার অনুমোদনের ভিজ্যুয়াল বিভাজন।',
    
    // Navigation
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.opportunities': 'সুযোগ',
    'nav.map': 'মানচিত্র',
    'nav.collaboration': 'সহযোগিতা',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    'nav.employer': 'নিয়োগকর্তা',
    'nav.logout': 'লগআউট',
    
    // Common
    'common.loading': 'লোড হচ্ছে...',
    'common.save': 'সংরক্ষণ',
    'common.cancel': 'বাতিল',
    'common.edit': 'সম্পাদনা',
    'common.delete': 'মুছে ফেলুন',
    'common.view': 'দেখুন',
    'common.search': 'অনুসন্ধান',
    'common.filter': 'ফিল্টার',
    'common.sort': 'সাজান',
    'common.apply': 'প্রয়োগ',
    'common.clear': 'পরিষ্কার',
    'common.back': 'ফিরে',
    'common.next': 'পরবর্তী',
    'common.previous': 'পূর্ববর্তী',
    'common.submit': 'জমা দিন',
    'common.close': 'বন্ধ',
    'common.open': 'খুলুন',
    'common.yes': 'হ্যাঁ',
    'common.no': 'না',
    'common.ok': 'ঠিক আছে',
    'common.error': 'ত্রুটি',
    'common.success': 'সফল',
    'common.warning': 'সতর্কতা',
    'common.info': 'তথ্য',
    // Opportunities
    'opportunities.title': 'আপনার পরবর্তী সুযোগ খুঁজুন',
    'opportunities.subtitle': 'আপনার জন্য তৈরি করা চাকরি, প্রকল্প এবং সহযোগিতা অনুরোধ ব্রাউজ করুন।',
    'opportunities.search_placeholder': 'শিরোনাম বা দক্ষতা দিয়ে অনুসন্ধান করুন...',
    'opportunities.filter': 'ফিল্টার',
    'opportunities.filter_by': 'ফিল্টার করুন',
    'opportunities.full_time': 'পূর্ণকালীন',
    'opportunities.part_time': 'খণ্ডকালীন',
    'opportunities.contract': 'চুক্তি',
    // Employer Dashboard
    'employer.dashboard_title': 'নিয়োগকর্তা ড্যাশবোর্ড',
    'employer.welcome_message': '{company} এ ফিরে স্বাগতম! আপনার চাকরির পোস্ট এবং আবেদনকারীদের পরিচালনা করুন।',
    'employer.post_new_job': 'নতুন চাকরি পোস্ট করুন',
    'employer.overview': 'সংক্ষিপ্ত বিবরণ',
    'employer.job_posts': 'চাকরির পোস্ট',
    'employer.applicants': 'আবেদনকারী',
    'employer.analytics': 'বিশ্লেষণ',
    'employer.recent_job_posts': 'সাম্প্রতিক চাকরির পোস্ট',
    'employer.recent_job_posts_desc': 'আপনার সর্বশেষ চাকরি পোস্টিং এবং তাদের কর্মক্ষমতা',
    // Profile
    'profile.contact': 'যোগাযোগ',
    'profile.share': 'শেয়ার করুন',
    'profile.about': 'সম্পর্কে',
    'profile.skills': 'দক্ষতা',
    'profile.add_skills_voice': 'কণ্ঠ দিয়ে দক্ষতা যোগ করুন',
    'profile.no_skills_yet': 'এখনও কোন দক্ষতা যোগ করা হয়নি। আপনার দক্ষতা যোগ করতে কণ্ঠ ইনপুট ব্যবহার করুন!',
    'profile.endorsements': 'সহায়তা',
    'profile.no_endorsements_yet': 'এখনও কোন সহায়তা নেই। সহায়তা পেতে আপনার নেটওয়ার্ক তৈরি করুন!'
  }
};

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('bharatlink-language') as Language;
      if (savedLanguage && ['en', 'hi', 'kn', 'bn'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
      setIsHydrated(true);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      localStorage.setItem('bharatlink-language', language);
    }
  }, [language, isHydrated]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isHydrated }}>
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
