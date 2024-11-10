# Betting Dashboard

This is a web application that provides betting information for various sports games. Users can view odds, filter games by sport, and place simulated bets on their preferred teams. Built with modern technologies, this project emphasizes responsiveness, interactivity, and code quality.

## Features

- **Responsive Dashboard**: A grid-based dashboard that displays games as cards.
- **Game Information**: Each game card displays the teams, odds, and bet count for each team.
- **Simulated Betting**: Users can place a simulated bet on a team. The bet count will increase visually on the game card.
- **Filter by Sport**: Users can filter games by sport, such as Soccer, Basketball and MMA.
- **Infinite Scroll**: Automatically loads more games as the user scrolls.
- **Toast Notifications**: Visual feedback for betting actions (using `react-toastify`).

## Technologies Used

- **React**: UI Library
- **Vite**: Fast development server and build tool
- **Redux Toolkit**: State management for games and bets
- **React Query**: Data fetching and caching
- **Styled Components**: Styling solution for React
- **TypeScript**: Typed JavaScript for better maintainability
- **React-Toastify**: Toast notifications for user feedback

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/betting-dashboard.git
   cd betting-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a .env file in the root directory and add your API key from [The Odds API](https://the-odds-api.com/):

   ```plaintext
   VITE_ODDS_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

Open your browser and go to http://localhost:5173 to view the app.

## Usage

- **Viewing Games**: The default view displays Soccer games. Use the filter buttons to switch between different sports.
- **Placing a Bet**: Click on "Place a Bet" for a game. Select a team and enter the bet amount. The bet count will increase, and a success notification will appear.
- **Infinite Scrolling**: Scroll down to automatically load more games.

## Folder Structure

```plaintext
betting-dashboard/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable components (Dashboard, Filter, GameCard, etc.)
│ ├── services/ # API calls and related utilities
│ ├── store/ # Redux store, slices, and configuration
│ ├── types/ # TypeScript type definitions
│ ├── App.tsx # Main app component
│ └── index.tsx # ReactDOM rendering
├── .env # Environment variables (API key)
├── README.md # Project documentation
└── package.json # Project dependencies and scripts
```

## Environment Variables

This project requires an API key from [The Odds API](https://the-odds-api.com/). Add your key to a `.env` file in the root directory:

```plaintext
VITE_ODDS_API_KEY=your_api_key_here
```

## Important Components

- **App.tsx**: The main component that manages the layout, filter functionality, data fetching, and infinite scroll logic.
- **Dashboard**: Displays a grid of game cards. Dynamically updates based on selected sport and fetched data.
- **GameCard**: Shows details for each game, including odds, team names, and the "Place a Bet" button.
- **BetModal**: A modal component for placing a bet, allowing users to select a team and enter a bet amount.
- **Filter**: Allows users to select a sport category, triggering a data fetch based on the selected filter.

## Known Issues

- **API Rate Limits**: The Odds API may have rate limits for free accounts, which can cause 401 errors if the limit is exceeded.
- **Limited Sports Data**: Not all sports may have available data at all times.

## Future Improvements

- **Real Betting Integration**: Connect to a real backend for placing and tracking actual bets.
- **Detailed Game Statistics**: Add more information for each game, such as player stats and recent team performance.
- **User Authentication**: Allow users to create accounts and save their betting history.
