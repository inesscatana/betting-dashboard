export interface Game {
	id: string
	sport: string
	teams: [string, string]
	odds: [number, number]
	bets: [number, number]
}
