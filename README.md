# BharatLink - Rural Skill-to-Work Network

Connecting India's Grassroots Talent to Digital Opportunities.

## Features

- **Skill Cluster Mapping**: Interactive map showing regional skill concentrations
- **Employer Dashboard**: Tools for businesses to find and hire skilled artisans
- **AI-Powered Matching**: Smart recommendations for opportunities and talent
- **Voice-First Access**: Multilingual support for rural users
- **Trust Verification**: Peer endorsements and skill assessments

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser

### AI Features (Optional)

To enable AI-powered features like smart opportunity matching:

1. Get a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

**Note**: The application works without AI features - it will use mock data for demonstration purposes.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **AI**: Google Genkit, Gemini AI
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── ai/                  # AI flows and configurations
├── data/               # Mock data and configurations
└── lib/                # Utility functions
```
