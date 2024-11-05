import React from 'react'
import styled from 'styled-components'
import { Game } from '../types'

const Card = styled.div`
	padding: 1.5rem;
	border: 1px solid #ddd;
	border-radius: 10px;
	background-color: #f9f9f9;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Poppins', sans-serif;
	transition: transform 0.2s;
	cursor: pointer;

	&:hover {
		transform: scale(1.03);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}
`

const TeamName = styled.h3`
	font-size: 1.2rem;
	color: #333;
	margin: 0.5rem 0;
	text-align: center;
`

const OddsText = styled.p`
	color: #555;
	font-size: 1rem;
	margin: 0.2rem 0;
`

const BetButton = styled.button`
	padding: 0.6rem 1.2rem;
	background-color: #1976d2;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	margin-top: 1rem;
	text-align: center;
	transition: background-color 0.3s;
	width: 100%;

	&:hover {
		background-color: #1565c0;
	}
`

interface GameCardProps {
	game: Game
	onClick: () => void
}

const GameCard: React.FC<GameCardProps> = React.memo(({ game, onClick }) => {
	return (
		<Card onClick={onClick}>
			<TeamName>
				{game.home_team} vs {game.away_team}
			</TeamName>
			<OddsText>
				Home: {game.bookmakers[0]?.markets[0]?.outcomes[0]?.price ?? 'N/A'}
			</OddsText>
			<OddsText>
				Away: {game.bookmakers[0]?.markets[0]?.outcomes[1]?.price ?? 'N/A'}
			</OddsText>
			<BetButton
				onClick={(e) => {
					e.stopPropagation()
					onClick()
				}}
			>
				Place a Bet
			</BetButton>
		</Card>
	)
})

export default GameCard
