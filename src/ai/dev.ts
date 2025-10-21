import { config } from 'dotenv';
config();

import '@/ai/flows/generate-endorsement-summary.ts';
import '@/ai/flows/suggest-relevant-opportunities.ts';
import '@/ai/flows/speech-to-text.ts';
