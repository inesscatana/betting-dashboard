import axios from 'axios'

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY
const BASE_URL = 'https://api.the-odds-api.com/v4/sports'

export const getOdds = async (sport: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/${sport}/odds`, {
			params: {
				apiKey: ODDS_API_KEY,
				regions: 'us',
				markets: 'h2h',
				oddsFormat: 'decimal',
			},
		})
		return response.data
	} catch (error) {
		console.error('Error fetching odds:', error)
		return []
	}
}
