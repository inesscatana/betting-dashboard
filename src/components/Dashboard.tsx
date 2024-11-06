import styled from 'styled-components'
import GameCard from './GameCard'
import { Game } from '../types'

const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1rem;
	padding: 1rem;
`

const LoadingMessage = styled.div`
	text-align: center;
	font-size: 1.2rem;
	color: #1976d2;
`

const Title = styled.h2`
	text-align: center;
	font-size: 1.8rem;
	color: #333;
	margin-bottom: 1rem;
	font-family: 'Poppins', sans-serif;
`

interface DashboardProps {
	games: Game[]
	bets: { [gameId: string]: { [team: string]: number } }
	isLoading: boolean
	onCardClick: (game: Game) => void
	selectedSport: string
}

const sportNamesMap: { [key: string]: string } = {
	soccer: 'Soccer',
	basketball_nba: 'Basketball',
	tennis_atp: 'Tennis',
	mma_mixed_martial_arts: 'MMA',
}
const Dashboard: React.FC<DashboardProps> = ({
	games,
	bets,
	isLoading,
	onCardClick,
	selectedSport,
}) => {
	if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>

	return (
		<>
			<Title>{sportNamesMap[selectedSport]} Betting</Title>
			<DashboardContainer>
				{games.map((game) => (
					<GameCard
						key={game.id}
						game={game}
						bets={bets}
						onClick={() => onCardClick(game)}
					/>
				))}
			</DashboardContainer>
		</>
	)
}

export default Dashboard
