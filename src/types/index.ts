export interface Outcome {
	name: string
	price: number
}

export interface Market {
	key: string
	outcomes: Outcome[]
}

export interface Bookmaker {
	key: string
	markets: Market[]
}

export interface Game {
	id: string
	home_team: string
	away_team: string
	bookmakers: Bookmaker[]
}
