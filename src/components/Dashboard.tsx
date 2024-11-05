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

interface DashboardProps {
	games: Game[]
	isLoading: boolean
	onCardClick: (game: Game) => void
}

const Dashboard: React.FC<DashboardProps> = ({
	games,
	isLoading,
	onCardClick,
}) => {
	if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>

	return (
		<DashboardContainer>
			{games.map((game) => (
				<GameCard key={game.id} game={game} onClick={() => onCardClick(game)} />
			))}
		</DashboardContainer>
	)
}

export default Dashboard
