export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  skills: string[];
  endorsements: string[];
  bio: string;
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skillsRequired: string[];
  trustScore: number;
};

export type Artisan = {
    id: string;
    name: string;
    craft: string;
    location: string;
    profileImageUrl: string;
    imageHint: string;
    rating: number;
    reviewCount: number;
    trustScore: number;
    completedProjects: number;
    yearsOfExperience: number;
}

export type SkillCluster = {
    id: string;
    name: string;
    description: string;
    coords: { top: string; left: string };
};

export const currentUser: User = {
  id: 'user-1',
  name: 'Ramesh Kumar',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  location: 'Jaipur, Rajasthan',
  skills: ['Block Printing', 'Natural Dyes', 'Textile Design', 'Handicraft Marketing'],
  bio: 'A passionate 4th generation artisan specializing in traditional Bagru and Sanganeri block printing. Seeking to collaborate with designers to bring ancient crafts to modern markets.',
  endorsements: [
    'Ramesh is a master of his craft. His attention to detail and knowledge of natural dyes is unparalleled. - Local NGO Head',
    'We collaborated with Ramesh for a new collection. He was professional, delivered on time, and the quality was exceptional. - Urban Designer',
    'Has a deep understanding of textile traditions. A valuable asset for anyone in the heritage craft space. - Fellow Artisan',
    'His work is not just craft, it is art. Truly authentic. - International Buyer',
  ],
};

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Textile Designer for Sustainable Fashion Brand',
    company: 'EcoVastra',
    location: 'Remote/Mumbai',
    description: 'Seeking a textile designer with knowledge of traditional Indian printing techniques for a new sustainable clothing line.',
    skillsRequired: ['Block Printing', 'Textile Design', 'Natural Dyes'],
    trustScore: 92,
  },
  {
    id: 'opp-2',
    title: 'Lead Artisan for Craft Workshop',
    company: 'Craft Connect Initiative',
    location: 'Jaipur, Rajasthan',
    description: 'Looking for an experienced artisan to lead workshops for tourists and design students on block printing.',
    skillsRequired: ['Block Printing', 'Communication', 'Teaching'],
    trustScore: 88,
  },
  {
    id: 'opp-3',
    title: 'Handicraft Sourcing Manager',
    company: 'Global Handicrafts Inc.',
    location: 'Remote/Delhi',
    description: 'We need a sourcing expert to identify and partner with high-quality handicraft artisans across Rajasthan.',
    skillsRequired: ['Handicraft Marketing', 'Negotiation', 'Quality Control'],
    trustScore: 85,
  },
    {
    id: 'opp-4',
    title: 'Pottery Consultant for Home Decor Brand',
    company: 'Modern Homes',
    location: 'Bengaluru, Karnataka',
    description: 'Consult on a new line of ceramic home goods, bringing traditional forms to a modern aesthetic.',
    skillsRequired: ['Pottery', 'Ceramics', 'Glazing'],
    trustScore: 95,
  },
];

export const artisans: Artisan[] = [
    {
        id: 'art-1',
        name: 'Sita Devi',
        craft: 'Madhubani Painting',
        location: 'Bihar',
        profileImageUrl: 'https://picsum.photos/seed/artisan1/400/300',
        imageHint: 'woman painting',
        rating: 4.8,
        reviewCount: 127,
        trustScore: 95,
        completedProjects: 89,
        yearsOfExperience: 15,
    },
    {
        id: 'art-2',
        name: 'Arjun Singh',
        craft: 'Wood Carving',
        location: 'Saharanpur, UP',
        profileImageUrl: 'https://picsum.photos/seed/artisan2/400/300',
        imageHint: 'man carving wood',
        rating: 4.6,
        reviewCount: 94,
        trustScore: 92,
        completedProjects: 67,
        yearsOfExperience: 12,
    },
    {
        id: 'art-3',
        name: 'Lakshmiamma',
        craft: 'Channapatna Toys',
        location: 'Karnataka',
        profileImageUrl: 'https://picsum.photos/seed/artisan3/400/300',
        imageHint: 'wooden toys',
        rating: 4.9,
        reviewCount: 156,
        trustScore: 98,
        completedProjects: 112,
        yearsOfExperience: 20,
    },
     {
        id: 'art-4',
        name: 'Ibrahim Khatri',
        craft: 'Bandhani (Tie-Dye)',
        location: 'Kutch, Gujarat',
        profileImageUrl: 'https://picsum.photos/seed/artisan4/400/300',
        imageHint: 'colorful textiles',
        rating: 4.7,
        reviewCount: 78,
        trustScore: 89,
        completedProjects: 54,
        yearsOfExperience: 8,
    },
    {
        id: 'art-5',
        name: 'Priya Sharma',
        craft: 'Blue Pottery',
        location: 'Jaipur, Rajasthan',
        profileImageUrl: 'https://picsum.photos/seed/artisan5/400/300',
        imageHint: 'blue pottery ceramics',
        rating: 4.9,
        reviewCount: 203,
        trustScore: 97,
        completedProjects: 145,
        yearsOfExperience: 18,
    },
    {
        id: 'art-6',
        name: 'Rajesh Kumar',
        craft: 'Pattachitra Painting',
        location: 'Odisha',
        profileImageUrl: 'https://picsum.photos/seed/artisan6/400/300',
        imageHint: 'traditional painting',
        rating: 4.3,
        reviewCount: 45,
        trustScore: 82,
        completedProjects: 32,
        yearsOfExperience: 6,
    },
    {
        id: 'art-7',
        name: 'Meera Patel',
        craft: 'Kutch Embroidery',
        location: 'Gujarat',
        profileImageUrl: 'https://picsum.photos/seed/artisan7/400/300',
        imageHint: 'intricate embroidery',
        rating: 4.8,
        reviewCount: 134,
        trustScore: 94,
        completedProjects: 98,
        yearsOfExperience: 14,
    },
     {
         id: 'art-8',
         name: 'Vikram Singh',
         craft: 'Handloom Weaving',
         location: 'Assam',
         profileImageUrl: 'https://picsum.photos/seed/artisan8/400/300',
         imageHint: 'silk weaving',
         rating: 4.5,
         reviewCount: 67,
         trustScore: 87,
         completedProjects: 41,
         yearsOfExperience: 10,
     },
     {
         id: 'art-9',
         name: 'Anita Kumari',
         craft: 'Pottery',
         location: 'Khurja, UP',
         profileImageUrl: 'https://picsum.photos/seed/artisan9/400/300',
         imageHint: 'pottery ceramics',
         rating: 4.6,
         reviewCount: 89,
         trustScore: 91,
         completedProjects: 76,
         yearsOfExperience: 13,
     },
     {
         id: 'art-10',
         name: 'Ravi Verma',
         craft: 'Wood Carving',
         location: 'Saharanpur, UP',
         profileImageUrl: 'https://picsum.photos/seed/artisan10/400/300',
         imageHint: 'wood carving sculpture',
         rating: 4.4,
         reviewCount: 56,
         trustScore: 85,
         completedProjects: 38,
         yearsOfExperience: 9,
     },
     {
         id: 'art-11',
         name: 'Sunita Devi',
         craft: 'Weaving',
         location: 'Varanasi, UP',
         profileImageUrl: 'https://picsum.photos/seed/artisan11/400/300',
         imageHint: 'silk weaving',
         rating: 4.7,
         reviewCount: 112,
         trustScore: 93,
         completedProjects: 84,
         yearsOfExperience: 16,
     },
     {
         id: 'art-12',
         name: 'Manoj Kumar',
         craft: 'Pottery',
         location: 'Bikaner, Rajasthan',
         profileImageUrl: 'https://picsum.photos/seed/artisan12/400/300',
         imageHint: 'traditional pottery',
         rating: 4.8,
         reviewCount: 145,
         trustScore: 96,
         completedProjects: 102,
         yearsOfExperience: 19,
     },
     {
         id: 'art-13',
         name: 'Kavita Sharma',
         craft: 'Madhubani Painting',
         location: 'Bihar',
         profileImageUrl: 'https://picsum.photos/seed/artisan13/400/300',
         imageHint: 'folk painting',
         rating: 4.5,
         reviewCount: 73,
         trustScore: 88,
         completedProjects: 49,
         yearsOfExperience: 11,
     },
     {
         id: 'art-14',
         name: 'Deepak Singh',
         craft: 'Channapatna Toys',
         location: 'Karnataka',
         profileImageUrl: 'https://picsum.photos/seed/artisan14/400/300',
         imageHint: 'wooden toys',
         rating: 4.6,
         reviewCount: 98,
         trustScore: 90,
         completedProjects: 71,
         yearsOfExperience: 12,
     },
     {
         id: 'art-15',
         name: 'Rekha Patel',
         craft: 'Bandhani (Tie-Dye)',
         location: 'Kutch, Gujarat',
         profileImageUrl: 'https://picsum.photos/seed/artisan15/400/300',
         imageHint: 'tie dye textiles',
         rating: 4.4,
         reviewCount: 62,
         trustScore: 86,
         completedProjects: 43,
         yearsOfExperience: 8,
     },
     {
         id: 'art-16',
         name: 'Suresh Yadav',
         craft: 'Blue Pottery',
         location: 'Jaipur, Rajasthan',
         profileImageUrl: 'https://picsum.photos/seed/artisan16/400/300',
         imageHint: 'blue ceramics',
         rating: 4.3,
         reviewCount: 51,
         trustScore: 83,
         completedProjects: 35,
         yearsOfExperience: 7,
     },
     {
         id: 'art-17',
         name: 'Pooja Mehta',
         craft: 'Kutch Embroidery',
         location: 'Gujarat',
         profileImageUrl: 'https://picsum.photos/seed/artisan17/400/300',
         imageHint: 'embroidery work',
         rating: 4.7,
         reviewCount: 108,
         trustScore: 92,
         completedProjects: 79,
         yearsOfExperience: 15,
     },
     {
         id: 'art-18',
         name: 'Amit Kumar',
         craft: 'Pattachitra Painting',
         location: 'Odisha',
         profileImageUrl: 'https://picsum.photos/seed/artisan18/400/300',
         imageHint: 'scroll painting',
         rating: 4.2,
         reviewCount: 39,
         trustScore: 81,
         completedProjects: 28,
         yearsOfExperience: 6,
     },
     {
         id: 'art-19',
         name: 'Geeta Singh',
         craft: 'Weaving',
         location: 'West Bengal',
         profileImageUrl: 'https://picsum.photos/seed/artisan19/400/300',
         imageHint: 'handloom weaving',
         rating: 4.9,
         reviewCount: 167,
         trustScore: 97,
         completedProjects: 128,
         yearsOfExperience: 22,
     },
     {
         id: 'art-20',
         name: 'Rajesh Tiwari',
         craft: 'Wood Carving',
         location: 'Madhya Pradesh',
         profileImageUrl: 'https://picsum.photos/seed/artisan20/400/300',
         imageHint: 'wooden crafts',
         rating: 4.1,
         reviewCount: 34,
         trustScore: 79,
         completedProjects: 24,
         yearsOfExperience: 5,
     },
];

export const skillClusters: SkillCluster[] = [
    { id: 'cluster-1', name: 'Blue Pottery', description: 'Traditional Turko-Persian art form of blue pottery.', coords: { top: '35%', left: '35%' } },
    { id: 'cluster-2', name: 'Handloom Weaving', description: 'Famous for its Muga and Eri silk.', coords: { top: '38%', left: '85%' } },
    { id: 'cluster-3', name: 'Channapatna Toys', description: 'Eco-friendly lacquered wooden toys.', coords: { top: '75%', left: '40%' } },
    { id: 'cluster-4', name: 'Pattachitra Painting', description: 'Traditional cloth-based scroll painting.', coords: { top: '55%', left: '68%' } },
    { id: 'cluster-5', name: 'Kutch Embroidery', description: 'Intricate and colorful embroidery work.', coords: { top: '42%', left: '20%' } },
    { id: 'cluster-6', name: 'Madhubani Art', description: 'Folk paintings from the Mithila region.', coords: { top: '40%', left: '68%' } },
];
