import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../types'

interface BetState {
	games: Game[]
	modalOpen: boolean
	selectedGameId?: string
}

const initialState: BetState = {
	games: [],
	modalOpen: false,
}

const betSlice = createSlice({
	name: 'bet',
	initialState,
	reducers: {
		setGames(state, action: PayloadAction<Game[]>) {
			state.games = action.payload
		},
		openBetModal(state, action: PayloadAction<string>) {
			state.modalOpen = true
			state.selectedGameId = action.payload
		},
		closeBetModal(state) {
			state.modalOpen = false
			state.selectedGameId = undefined
		},
		placeBet(
			state,
			action: PayloadAction<{ gameId: string; team: string; amount: number }>
		) {
			const game = state.games.find((g) => g.id === action.payload.gameId)
			if (game) {
				game.bets[action.payload.team] += 1 // Increment simulated bet count
			}
		},
	},
})

export const { setGames, openBetModal, closeBetModal, placeBet } =
	betSlice.actions
export default betSlice.reducer
