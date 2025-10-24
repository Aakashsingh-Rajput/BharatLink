'use server';

/**
 * @fileOverview An AI agent for suggesting relevant job opportunities or projects based on user skills, location, and endorsements.
 *
 * - suggestRelevantOpportunities - A function that suggests relevant opportunities.
 * - RelevantOpportunitiesInput - The input type for the suggestRelevantOpportunities function.
 * - RelevantOpportunitiesOutput - The return type for the suggestRelevantOpportunities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelevantOpportunitiesInputSchema = z.object({
  skills: z.array(z.string()).describe('List of skills possessed by the job seeker.'),
  location: z.string().describe('The preferred location for job opportunities.'),
  endorsements: z.number().describe('The number of endorsements received by the job seeker.'),
  jobTypes: z.array(z.string()).optional().describe('Preferred job types (e.g., full-time, part-time, contract).'),
  industry: z.string().optional().describe('The industry the job seeker is interested in.')
});
export type RelevantOpportunitiesInput = z.infer<typeof RelevantOpportunitiesInputSchema>;

const RelevantOpportunitiesOutputSchema = z.object({
  opportunities: z.array(z.object({
    title: z.string().describe('The title of the job opportunity or project.'),
    description: z.string().describe('A brief description of the opportunity.'),
    location: z.string().describe('The location of the job opportunity.'),
    skillsRequired: z.array(z.string()).describe('The skills required for the job opportunity.'),
    trustScore: z.number().describe('A score indicating the trustworthiness or reliability of the opportunity.'),
  })).describe('A list of relevant job opportunities or projects.'),
});
export type RelevantOpportunitiesOutput = z.infer<typeof RelevantOpportunitiesOutputSchema>;

export async function suggestRelevantOpportunities(input: RelevantOpportunitiesInput): Promise<RelevantOpportunitiesOutput> {
  // Check if AI is available
  const hasApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  
  if (!hasApiKey) {
    // Return mock data when AI is not available
    return getMockOpportunities(input);
  }
  
  try {
    return await suggestRelevantOpportunitiesFlow(input);
  } catch (error) {
    console.warn('AI service unavailable, falling back to mock data:', error);
    return getMockOpportunities(input);
  }
}

function getMockOpportunities(input: RelevantOpportunitiesInput): RelevantOpportunitiesOutput {
  const mockOpportunities = [
    {
      title: "Traditional Handicraft Designer",
      description: "Create innovative designs for traditional Indian handicrafts, combining modern aesthetics with traditional techniques. Work with local artisans to develop new product lines.",
      location: input.location || "Remote",
      skillsRequired: input.skills.slice(0, 3),
      trustScore: 85,
    },
    {
      title: "Artisan Collaboration Coordinator",
      description: "Bridge the gap between urban businesses and rural artisans. Help coordinate projects, manage quality control, and facilitate communication between stakeholders.",
      location: input.location || "Hybrid",
      skillsRequired: ["Project Management", "Communication", "Quality Control"],
      trustScore: 78,
    },
    {
      title: "Cultural Heritage Consultant",
      description: "Advise organizations on preserving and promoting traditional crafts. Develop strategies for cultural preservation and economic sustainability.",
      location: input.location || "On-site",
      skillsRequired: input.skills.slice(0, 2).concat(["Cultural Studies", "Research"]),
      trustScore: 92,
    },
    {
      title: "E-commerce Specialist for Handicrafts",
      description: "Help artisans and craft businesses establish and grow their online presence. Manage digital marketing, product photography, and online sales.",
      location: "Remote",
      skillsRequired: ["Digital Marketing", "E-commerce", "Photography"],
      trustScore: 80,
    },
    {
      title: "Sustainable Craft Workshop Instructor",
      description: "Teach traditional crafting techniques to urban audiences. Conduct workshops on pottery, weaving, and other traditional skills.",
      location: input.location || "Various Locations",
      skillsRequired: input.skills.slice(0, 2).concat(["Teaching", "Public Speaking"]),
      trustScore: 88,
    }
  ];

  return {
    opportunities: mockOpportunities.filter(opp => 
      opp.skillsRequired.some(skill => 
        input.skills.some(inputSkill => 
          inputSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(inputSkill.toLowerCase())
        )
      )
    ).slice(0, 4) // Return top 4 matches
  };
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantOpportunitiesPrompt',
  input: {schema: RelevantOpportunitiesInputSchema},
  output: {schema: RelevantOpportunitiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant job opportunities or projects to job seekers.

  Based on the job seeker's skills, location, endorsements, preferred job types and industry, provide a list of relevant opportunities.
  Each opportunity should include a title, description, location, skills required, and a trust score.

  Skills: {{skills}}
  Location: {{location}}
  Endorsements: {{endorsements}}
  Job Types: {{jobTypes}}
  Industry: {{industry}}
  
  Consider the job seeker's skills, location, and endorsements to find the most suitable opportunities.
  The trust score should be based on the number of endorsements and the reputation of the source.
  `,
});

const suggestRelevantOpportunitiesFlow = ai.defineFlow(
  {
    name: 'suggestRelevantOpportunitiesFlow',
    inputSchema: RelevantOpportunitiesInputSchema,
    outputSchema: RelevantOpportunitiesOutputSchema,
  },
  async input => {
    const hasApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    
    if (!hasApiKey) {
      return getMockOpportunities(input);
    }
    
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.warn('AI prompt failed, falling back to mock data:', error);
      return getMockOpportunities(input);
    }
  }
);
