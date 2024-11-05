import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../types'

interface BetState {
	games: Game[]
	modalOpen: boolean
	selectedGameId?: string
	bets: { [gameId: string]: { [team: string]: number } }
}

const initialState: BetState = {
	games: [],
	modalOpen: false,
	bets: {},
}

const betSlice = createSlice({
	name: 'bet',
	initialState,
	reducers: {
		setGames(state, action: PayloadAction<Game[]>) {
			state.games = action.payload
			action.payload.forEach((game) => {
				state.bets[game.id] = { [game.home_team]: 0, [game.away_team]: 0 }
			})
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
			const { gameId, team } = action.payload
			if (!state.bets[gameId]) {
				state.bets[gameId] = { [team]: 1 }
			} else {
				state.bets[gameId][team] = (state.bets[gameId][team] || 0) + 1
			}
		},
	},
})

export const { setGames, openBetModal, closeBetModal, placeBet } =
	betSlice.actions
export default betSlice.reducer
