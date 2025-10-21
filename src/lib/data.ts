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
    },
    {
        id: 'art-2',
        name: 'Arjun Singh',
        craft: 'Wood Carving',
        location: 'Saharanpur, UP',
        profileImageUrl: 'https://picsum.photos/seed/artisan2/400/300',
        imageHint: 'man carving wood',
    },
    {
        id: 'art-3',
        name: 'Lakshmiamma',
        craft: 'Channapatna Toys',
        location: 'Karnataka',
        profileImageUrl: 'https://picsum.photos/seed/artisan3/400/300',
        imageHint: 'wooden toys',
    },
     {
        id: 'art-4',
        name: 'Ibrahim Khatri',
        craft: 'Bandhani (Tie-Dye)',
        location: 'Kutch, Gujarat',
        profileImageUrl: 'https://picsum.photos/seed/artisan4/400/300',
        imageHint: 'colorful textiles',
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
