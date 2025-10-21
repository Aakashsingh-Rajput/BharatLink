'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing user endorsements.
 *
 * It takes in a list of endorsement texts and outputs a concise summary of the user's skills and strengths.
 * - generateEndorsementSummary - A function that generates the summary of endorsements.
 * - GenerateEndorsementSummaryInput - The input type for the generateEndorsementSummary function.
 * - GenerateEndorsementSummaryOutput - The return type for the generateEndorsementSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEndorsementSummaryInputSchema = z.object({
  endorsements: z
    .array(z.string())
    .describe('An array of endorsement texts for a user.'),
});
export type GenerateEndorsementSummaryInput = z.infer<
  typeof GenerateEndorsementSummaryInputSchema
>;

const GenerateEndorsementSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the user endorsements.'),
});
export type GenerateEndorsementSummaryOutput = z.infer<
  typeof GenerateEndorsementSummaryOutputSchema
>;

export async function generateEndorsementSummary(
  input: GenerateEndorsementSummaryInput
): Promise<GenerateEndorsementSummaryOutput> {
  return generateEndorsementSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEndorsementSummaryPrompt',
  input: {schema: GenerateEndorsementSummaryInputSchema},
  output: {schema: GenerateEndorsementSummaryOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing user endorsements to highlight their key skills and strengths for potential employers.

  Given the following endorsements, create a concise summary (maximum 150 words) that captures the essence of the user's capabilities.

  Endorsements:
  {{#each endorsements}}
  - {{{this}}}
  {{/each}}`,
});

const generateEndorsementSummaryFlow = ai.defineFlow(
  {
    name: 'generateEndorsementSummaryFlow',
    inputSchema: GenerateEndorsementSummaryInputSchema,
    outputSchema: GenerateEndorsementSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
