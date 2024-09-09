# WNF Dashboard

## Overview

WNF Dashboard is a web application designed to track player statistics and game results for 5-a-side football matches played on Wednesday nights. This dashboard provides comprehensive insights into player performance, match outcomes, and overall league statistics.

## Features

- **Match Results**: View detailed results of each match, including team compositions, goal differences, and who picked the teams.
- **Player Statistics**: Access individual player stats, including total points, points per game, games played, and more.
- **Data Processing**: Raw match data is processed and presented in an easy-to-understand format.
- **Interactive UI**: User-friendly interface with sorting and filtering capabilities.
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices.

## Technology Stack

- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Fonts**: Geist Sans and Geist Mono (local fonts)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/wnf-dashboard.git
   cd wnf-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server (will use seeded data in app/lib/rawData.ts):

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code
  - `components/`: React components used throughout the app
  - `lib/`: Utility functions and type definitions
  - `fonts/`: Local font files (Geist Sans and Geist Mono)
- `public/`: Static assets

## Key Components

- `FootballDashboard`: Main component that renders the entire dashboard
- `MatchResults`: Displays individual match results
- `PlayerStats`: Shows detailed statistics for each player
- `DataProcessor`: Processes raw data into usable format for the dashboard

## Data Flow

1. Raw match data is input into the system
2. The `DataProcessor` component processes this data
3. Processed data is used to populate the `MatchResults` and `PlayerStats` components
4. The `FootballDashboard` component orchestrates the display of all information

## Customization

- To add new player statistics, modify the `ProcessedPlayer` interface in `app/lib/types.ts`
- To change the appearance of match results, update the `MatchResults` component in `app/components/MatchResults.tsx`

## Analytics

This project uses Vercel Analytics to track page views and user interactions. The Analytics component is included in the root layout file (`app/layout.tsx`).

## Deployment

This project is set up for easy deployment on Vercel. You can deploy your project using the following methods:

### Method 1: Vercel CLI

1. Install the Vercel CLI:

   ```
   npm i -g vercel
   ```

2. Run the following command in your project directory:

   ```
   vercel
   ```

3. Follow the prompts to deploy your project.

### Method 2: Vercel for GitHub

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
3. Click "Import Project" and select your repository.
4. Follow the prompts to deploy your project.

### Method 3: Manual Deployment

1. Build your project:

   ```
   npm run build
   ```

2. Deploy the `.next` folder to Vercel:

   ```
   vercel --prod
   ```

3. Run prod version
   ```
   npm start
   ```

After deployment, your project will be live on a Vercel URL. You can customize this URL in your Vercel project settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all the players who participate in the Wednesday Night Football matches
- Shadcn for the excellent UI component library
- Vercel for hosting and analytics solutions
