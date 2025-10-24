'use server';
/**
 * @fileOverview A Genkit flow for converting speech to text.
 * - speechToText - A function that handles the speech-to-text conversion.
 * - SpeechToTextInput - The input type for the speechToText function.
 * - SpeechToTextOutput - The return type for the speechToText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Get the model from environment or use default
const getModel = () => {
  const hasApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  return hasApiKey ? 'googleai/gemini-2.5-flash' : 'googleai/gemini-2.5-flash';
};

const SpeechToTextInputSchema = z.object({
  audio: z
    .string()
    .describe(
      "A data URI of the audio to be transcribed. Must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z
    .string()
    .describe(
      'A text prompt to guide the transcription and provide context.'
    ),
});
export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;

const SpeechToTextOutputSchema = z.object({
  text: z.string().describe('The transcribed text.'),
});
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  return speechToTextFlow(input);
}

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async ({audio, prompt}) => {
    try {
      const {text} = await ai.generate({
        model: getModel(),
        prompt: [
          {media: {url: audio}},
          {text: prompt},
        ],
      });
      return {text};
    } catch (error) {
      console.error('Speech-to-text error:', error);
      // Return a fallback message if AI fails
      return {text: 'Sorry, I could not process the audio. Please try again.'};
    }
  }
);
