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
  return suggestRelevantOpportunitiesFlow(input);
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
    const {output} = await prompt(input);
    return output!;
  }
);
