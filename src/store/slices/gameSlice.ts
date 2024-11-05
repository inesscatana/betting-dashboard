import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../types/game'

interface GameState {
	games: Game[]
	filteredGames: Game[]
	selectedSport: string | null
}

const initialState: GameState = {
	games: [
		{
			id: '1',
			sport: 'Football',
			teams: ['Team A', 'Team B'],
			odds: [1.5, 2.5],
			bets: [10, 20],
		},
		{
			id: '2',
			sport: 'Basketball',
			teams: ['Team C', 'Team D'],
			odds: [1.8, 2.2],
			bets: [15, 25],
		},
	],
	filteredGames: [],
	selectedSport: null,
}

const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		placeBet(
			state,
			action: PayloadAction<{
				gameId: string
				teamIndex: number
				betAmount: number
			}>
		) {
			const game = state.games.find((game) => game.id === action.payload.gameId)
			if (game) {
				game.bets[action.payload.teamIndex] += 1
			}
		},
		filterBySport(state, action: PayloadAction<string | null>) {
			state.selectedSport = action.payload
			state.filteredGames = action.payload
				? state.games.filter((game) => game.sport === action.payload)
				: state.games
		},
	},
})

export const { placeBet, filterBySport } = gamesSlice.actions
export default gamesSlice.reducer
