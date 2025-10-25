import { NextRequest, NextResponse } from 'next/server';

const PREDEFINED_RESPONSES: Record<string, string> = {
  "hello": "Hello! I'm here to help you navigate BharatLink and make the most of your skills. How can I assist you today?",
  "hi": "Hi there! Welcome to BharatLink. I can help you with platform navigation, skill guidance, and finding opportunities. What would you like to know?",
  
  // Platform Navigation Responses
  "platform navigation": "BharatLink has several key sections to explore:\n\n📍 **Dashboard**: Your central hub showing opportunities, messages, and profile stats\n🗺️ **Map View**: Interactive skill cluster map showing regional crafts across India\n👥 **Collaboration**: Connect with urban businesses and fellow artisans\n📋 **Opportunities**: Browse verified job postings with advanced filters\n👤 **Profile**: Showcase your skills, portfolio, and build your digital presence\n⚙️ **Settings**: Manage notifications, language preferences, and account details\n\nEach section is designed to help you connect your traditional skills with modern opportunities!",
  
  "navigate platform": "Here's how to navigate BharatLink effectively:\n\n🎯 **Start with your Profile**: Complete all sections including skills, location, and portfolio\n🔍 **Use the Map**: Click on skill clusters to see regional opportunities (e.g., Rajasthan for Blue Pottery, Karnataka for Channapatna Toys)\n📱 **Voice Input**: Use the microphone icon to update your profile in your local language\n🔔 **Set Notifications**: Enable alerts for new opportunities matching your skills\n📊 **Check Dashboard**: Monitor your trust score, endorsements, and application status\n🌐 **Explore Collaboration**: Visit the collaboration section to find urban businesses seeking rural talent\n\nPro tip: The platform works best when you keep your profile updated and respond quickly to messages!",
  
  // Profile Setup Responses
  "profile setup": "Creating a compelling profile on BharatLink:\n\n📝 **Personal Information**: Add your name, location (be specific - city, state), and contact details\n🎨 **Skills Section**: List all your traditional skills (e.g., 'Block Printing', 'Madhubani Painting', 'Wood Carving')\n📸 **Portfolio Gallery**: Upload 5-10 high-quality photos of your best work\n🎤 **Voice Bio**: Use voice input to describe your craft in your local language\n⭐ **Endorsements**: Ask previous clients to write testimonials about your work\n📊 **Availability Status**: Set to 'Available for Work' when seeking opportunities\n🏆 **Certifications**: Add any training certificates or awards you've received\n\nRemember: A complete profile increases your trust score and attracts more employers!",
  
  "create profile": "Step-by-step profile creation:\n\n1️⃣ **Basic Info**: Name, location (include state for better matching), phone number\n2️⃣ **Skill Categories**: Choose from Textiles, Pottery, Woodwork, Painting, Jewelry, or Bamboo Craft\n3️⃣ **Detailed Skills**: Add specific techniques (e.g., 'Bagru Block Printing', 'Kutch Embroidery', 'Terracotta Pottery')\n4️⃣ **Portfolio Upload**: Add photos showing different aspects of your work\n5️⃣ **Bio Writing**: Describe your experience, specializations, and what makes your work unique\n6️⃣ **Voice Description**: Use microphone to add voice notes in your regional language\n7️⃣ **Availability**: Set your work status and preferred project types\n8️⃣ **Social Proof**: Add endorsements from customers or fellow artisans\n\nA well-crafted profile can increase your opportunities by 300%!",
  
  // Finding Opportunities Responses
  "find opportunities": "Multiple ways to discover opportunities on BharatLink:\n\n🔍 **Search & Filter**: Use the search bar with keywords like 'textile design', 'pottery', 'wood carving'\n📍 **Location-Based**: Filter by your state or nearby cities for local opportunities\n🗺️ **Map Exploration**: Click on skill clusters in different states to see regional opportunities\n📱 **Mobile Notifications**: Enable push notifications for new matching jobs\n🏢 **Employer Profiles**: Browse verified companies looking for rural talent\n🤝 **Collaboration Hub**: Connect with urban businesses seeking authentic crafts\n📊 **Dashboard Alerts**: Check your dashboard for personalized opportunity recommendations\n\nPro tip: Set up saved searches for your key skills to get instant notifications!",
  
  "where opportunities": "Opportunities are available across multiple channels:\n\n📋 **Main Opportunities Page**: Browse all verified job postings with detailed descriptions\n🗺️ **Interactive Map**: Click on states like Rajasthan (Blue Pottery), Gujarat (Kutch Embroidery), Karnataka (Channapatna Toys)\n🔍 **Advanced Search**: Filter by skill type, salary range, location, and work type\n📱 **Mobile App**: Get notifications for opportunities matching your profile\n🏢 **Employer Directories**: Browse companies actively seeking rural artisans\n🤝 **Collaboration Section**: Connect with urban designers, startups, and NGOs\n📊 **Personalized Feed**: Your dashboard shows opportunities based on your skills and location\n\nDifferent regions have different opportunities - explore the map to find what's available in your area!",
  
  // Skill Guidance Responses
  "skill guidance": "Comprehensive skill development guidance:\n\n🎨 **Traditional Crafts**: Focus on regional specialties like Madhubani (Bihar), Blue Pottery (Rajasthan), Channapatna Toys (Karnataka)\n📚 **Skill Enhancement**: Learn complementary skills like digital marketing, photography, or basic computer skills\n🏆 **Certification**: Consider getting certified in your craft through government schemes\n📱 **Digital Skills**: Learn to use smartphones for better platform engagement\n🤝 **Networking**: Connect with fellow artisans in your region for knowledge sharing\n📈 **Market Trends**: Stay updated on what's in demand through the platform's insights\n💰 **Pricing**: Research market rates for your skills in different regions\n\nRemember: Combining traditional skills with modern knowledge increases your opportunities!",
  
  "skill development": "Developing your skills for better opportunities:\n\n🔧 **Master Your Craft**: Perfect traditional techniques like Bagru printing, Kutch embroidery, or wood carving\n📖 **Learn New Techniques**: Explore variations of your skill (e.g., different embroidery styles)\n💻 **Digital Literacy**: Learn basic computer skills, photo editing, and social media\n📱 **Platform Skills**: Master BharatLink features like voice input, portfolio management\n🤝 **Soft Skills**: Develop communication, customer service, and project management\n📊 **Business Skills**: Learn pricing, negotiation, and basic accounting\n🌐 **Language Skills**: Improve Hindi/English for better communication with urban clients\n📈 **Market Awareness**: Stay updated on trends in your craft category\n\nPro tip: The platform offers skill development resources and connects you with training opportunities!",
  
  // Regional Specific Responses
  "rajasthan skills": "Rajasthan offers incredible opportunities for traditional crafts:\n\n🏺 **Blue Pottery** (Jaipur): High demand for home decor and art pieces\n💎 **Kundan Jewelry** (Jaipur/Jodhpur): Premium market with ₹35,000-₹70,000 salary range\n🎨 **Block Printing** (Bagru/Sanganer): Sustainable fashion brands seeking authentic prints\n🎭 **Miniature Painting**: Art galleries and collectors value traditional techniques\n🏺 **Terracotta**: Growing market for eco-friendly pottery\n\n**Top Cities**: Jaipur, Jodhpur, Udaipur, Bikaner\n**Average Salary**: ₹25,000-₹50,000\n**Key Employers**: Luxury brands, home decor companies, art galleries\n\nUse the map to explore Rajasthan-specific opportunities!",
  
  "gujarat skills": "Gujarat is a powerhouse for traditional textiles and crafts:\n\n🧵 **Kutch Embroidery**: Intricate work in high demand for fashion and home decor\n🎨 **Bandhani (Tie-Dye)**: Sustainable fashion brands love authentic techniques\n🏺 **Pottery**: Traditional and contemporary ceramics for various markets\n🎭 **Wood Carving**: Furniture and decorative pieces for urban markets\n\n**Top Cities**: Ahmedabad, Kutch, Surat, Vadodara\n**Average Salary**: ₹22,000-₹45,000\n**Key Employers**: Textile companies, fashion brands, home decor businesses\n\nGujarat artisans are highly sought after for their authentic techniques!",
  
  "karnataka skills": "Karnataka offers unique opportunities in traditional crafts:\n\n🧸 **Channapatna Toys**: Eco-friendly wooden toys in high demand globally\n🪵 **Wood Carving**: Traditional Mysore woodwork for furniture and art\n🎨 **Silk Weaving**: Mysore silk and traditional weaving techniques\n🏺 **Pottery**: Traditional and contemporary ceramics\n\n**Top Cities**: Bangalore, Mysore, Channapatna\n**Average Salary**: ₹16,000-₹32,000\n**Key Employers**: Toy companies, furniture makers, textile brands\n\nChannapatna toys are especially popular with eco-conscious consumers!",
  
  "bihar skills": "Bihar's traditional arts are gaining global recognition:\n\n🎨 **Madhubani Painting**: Folk art in high demand for home decor and fashion\n🏺 **Pottery**: Traditional terracotta and contemporary ceramics\n🧵 **Textiles**: Traditional weaving and embroidery\n\n**Top Cities**: Patna, Madhubani, Darbhanga\n**Average Salary**: ₹20,000-₹45,000\n**Key Employers**: Art galleries, home decor companies, cultural organizations\n\nMadhubani art is experiencing a revival with modern applications!",
  
  "odisha skills": "Odisha offers unique opportunities in traditional crafts:\n\n🎨 **Pattachitra Painting**: Traditional scroll paintings for art collectors\n💎 **Filigree Work**: Delicate silver jewelry and decorative items\n🏺 **Pottery**: Traditional terracotta and contemporary ceramics\n\n**Top Cities**: Bhubaneswar, Puri, Cuttack\n**Average Salary**: ₹18,000-₹38,000\n**Key Employers**: Art galleries, jewelry companies, cultural institutions\n\nOdisha's crafts are known for their intricate detail and cultural significance!",
  
  // Job Finding Responses
  "find job": "To find jobs on BharatLink:\n1. Go to the 'Opportunities' page\n2. Use the search bar to look for specific skills or job types\n3. Apply filters by location, skill type, or job category\n4. Browse through verified job postings\n5. Check the map view to see local opportunities\n6. Set up notifications for new job postings in your area",
  
  "apply job": "To apply for a job:\n1. Find a job that matches your skills in the Opportunities section\n2. Click on the job posting to see full details\n3. Review the requirements and your qualifications\n4. Click 'Apply Now' button\n5. Fill out the application form with your details\n6. Upload any required documents or portfolio samples\n7. Submit your application and wait for employer response",
  
  "who value skills": "Your skills are valued by:\n• Urban startups looking for authentic rural talent\n• Design companies seeking traditional crafts\n• E-commerce platforms needing local artisans\n• NGOs working on skill development projects\n• Government initiatives promoting rural entrepreneurship\n• Individual customers wanting handmade products\n\nFind them in the 'Collaboration' section and 'Employer' profiles!",
  
  "let people know need job": "To let people know you need a job:\n1. Complete your profile with all skills and experience\n2. Set your availability status to 'Available for Work'\n3. Upload portfolio images showcasing your best work\n4. Write a compelling bio describing your expertise\n5. Ask for endorsements from previous clients\n6. Participate in community discussions\n7. Share your profile on social media\n8. Respond quickly to employer messages",
  
  "let people know skills": "To showcase your skills effectively:\n1. Add detailed skill descriptions in your profile\n2. Upload high-quality photos/videos of your work\n3. Include before/after project comparisons\n4. Add customer testimonials and endorsements\n5. Use voice input to describe your skills in local language\n6. Participate in skill-based discussions\n7. Create a portfolio with different project types\n8. Update your profile regularly with new work",
  
  "use bharatlink": "Here's how to use BharatLink effectively:\n1. Create a complete profile with your skills and location\n2. Use voice input for easy profile updates in your language\n3. Browse opportunities using search and filters\n4. Apply to jobs that match your skills\n5. Connect with employers in the collaboration section\n6. Build your trust score through endorsements\n7. Use the map to find local opportunities\n8. Keep your availability status updated",
  
  "bharatlink benefits": "BharatLink benefits you by:\n• Connecting rural skills to urban opportunities\n• Providing voice-based access in local languages\n• Building digital trust through peer endorsements\n• Offering AI-powered job matching\n• Creating direct connections with employers\n• Preserving and promoting traditional skills\n• Generating sustainable income from your expertise\n• Building a digital presence for your craft",
  
  "what should post": "You should post:\n• High-quality photos of your completed work\n• Videos showing your skills in action\n• Before/after project comparisons\n• Customer testimonials and reviews\n• Detailed descriptions of your techniques\n• Pricing information for your services\n• Availability and location details\n• Certifications or training you've received\n• Examples of different project types you can handle",
  
  "profile": "To create your profile:\n1. Go to the Profile section\n2. Add your personal information\n3. Upload your skills and certifications\n4. Add portfolio images/videos\n5. Write a compelling bio\n6. Set your availability status",
  
  "help": "I can help you with:\n• Platform navigation\n• Profile creation tips\n• Finding opportunities\n• Skill development guidance\n• Connecting with employers\n• Showcasing your work\n\nJust ask me anything!",
  
  "default": "I understand you're looking for help with BharatLink. I can assist with platform navigation, profile setup, finding opportunities, and skill guidance. Could you be more specific about what you need help with?"
};

function getResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Check for exact matches first
  if (PREDEFINED_RESPONSES[lowerMessage]) {
    return PREDEFINED_RESPONSES[lowerMessage];
  }
  
  // Platform Navigation Patterns
  if (lowerMessage.includes('navigate') || lowerMessage.includes('platform') || lowerMessage.includes('how to use')) {
    return PREDEFINED_RESPONSES['navigate platform'];
  }
  if (lowerMessage.includes('platform') && lowerMessage.includes('navigation')) {
    return PREDEFINED_RESPONSES['platform navigation'];
  }
  
  // Profile Setup Patterns
  if (lowerMessage.includes('profile') && (lowerMessage.includes('setup') || lowerMessage.includes('create'))) {
    return PREDEFINED_RESPONSES['profile setup'];
  }
  if (lowerMessage.includes('create') && lowerMessage.includes('profile')) {
    return PREDEFINED_RESPONSES['create profile'];
  }
  
  // Finding Opportunities Patterns
  if (lowerMessage.includes('find') && (lowerMessage.includes('opportunities') || lowerMessage.includes('jobs'))) {
    return PREDEFINED_RESPONSES['find opportunities'];
  }
  if (lowerMessage.includes('where') && (lowerMessage.includes('opportunities') || lowerMessage.includes('jobs'))) {
    return PREDEFINED_RESPONSES['where opportunities'];
  }
  
  // Skill Guidance Patterns
  if (lowerMessage.includes('skill') && (lowerMessage.includes('guidance') || lowerMessage.includes('help'))) {
    return PREDEFINED_RESPONSES['skill guidance'];
  }
  if (lowerMessage.includes('skill') && lowerMessage.includes('development')) {
    return PREDEFINED_RESPONSES['skill development'];
  }
  
  // Regional Specific Patterns
  if (lowerMessage.includes('rajasthan') || lowerMessage.includes('jaipur') || lowerMessage.includes('jodhpur')) {
    return PREDEFINED_RESPONSES['rajasthan skills'];
  }
  if (lowerMessage.includes('gujarat') || lowerMessage.includes('kutch') || lowerMessage.includes('ahmedabad')) {
    return PREDEFINED_RESPONSES['gujarat skills'];
  }
  if (lowerMessage.includes('karnataka') || lowerMessage.includes('bangalore') || lowerMessage.includes('mysore') || lowerMessage.includes('channapatna')) {
    return PREDEFINED_RESPONSES['karnataka skills'];
  }
  if (lowerMessage.includes('bihar') || lowerMessage.includes('patna') || lowerMessage.includes('madhubani')) {
    return PREDEFINED_RESPONSES['bihar skills'];
  }
  if (lowerMessage.includes('odisha') || lowerMessage.includes('bhubaneswar') || lowerMessage.includes('puri')) {
    return PREDEFINED_RESPONSES['odisha skills'];
  }
  
  // Job Finding Patterns
  if (lowerMessage.includes('find') && (lowerMessage.includes('job') || lowerMessage.includes('work'))) {
    return PREDEFINED_RESPONSES['find job'];
  }
  if (lowerMessage.includes('apply') && (lowerMessage.includes('job') || lowerMessage.includes('work'))) {
    return PREDEFINED_RESPONSES['apply job'];
  }
  if (lowerMessage.includes('who') && (lowerMessage.includes('value') || lowerMessage.includes('skills'))) {
    return PREDEFINED_RESPONSES['who value skills'];
  }
  if (lowerMessage.includes('let people know') && lowerMessage.includes('need job')) {
    return PREDEFINED_RESPONSES['let people know need job'];
  }
  if (lowerMessage.includes('let people know') && lowerMessage.includes('skills')) {
    return PREDEFINED_RESPONSES['let people know skills'];
  }
  if (lowerMessage.includes('use bharatlink') || lowerMessage.includes('how to use')) {
    return PREDEFINED_RESPONSES['use bharatlink'];
  }
  if (lowerMessage.includes('benefits') || lowerMessage.includes('benefit me')) {
    return PREDEFINED_RESPONSES['bharatlink benefits'];
  }
  if (lowerMessage.includes('what should i post') || lowerMessage.includes('what to post')) {
    return PREDEFINED_RESPONSES['what should post'];
  }
  if (lowerMessage.includes('profile') || lowerMessage.includes('create profile')) {
    return PREDEFINED_RESPONSES['profile'];
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
    return PREDEFINED_RESPONSES['help'];
  }
  
  return PREDEFINED_RESPONSES['default'];
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = getResponse(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
