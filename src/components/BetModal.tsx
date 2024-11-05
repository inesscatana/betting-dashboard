import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { placeBet, closeBetModal } from '../store/slices/betSlice'

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`

const ModalContent = styled.div`
	background: #ffffff;
	padding: 2rem;
	border-radius: 12px;
	width: 350px;
	max-width: 90%;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	text-align: center;
	font-family: 'Poppins', sans-serif;
`

const Title = styled.h2`
	font-size: 1.5rem;
	color: #333;
	margin-bottom: 1.5rem;
`

const FormControl = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
`

const Select = styled.select`
	width: 100%;
	padding: 0.8rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 1rem;
	color: #555;
	outline: none;
	box-sizing: border-box;
`

const Input = styled.input`
	width: 100%;
	padding: 0.8rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 1rem;
	color: #555;
	outline: none;
	box-sizing: border-box;
	&::placeholder {
		color: #999;
	}
`

const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	width: 100%;
	margin-top: 1rem;
`

const Button = styled.button<{ $primary?: boolean }>`
	padding: 0.6rem 1.2rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
	width: 45%;

	background-color: ${(props) => (props.$primary ? '#1976d2' : '#ddd')};
	color: ${(props) => (props.$primary ? '#fff' : '#333')};

	&:hover {
		background-color: ${(props) => (props.$primary ? '#1565c0' : '#ccc')};
	}
`

interface BetModalProps {
	gameId: string
	teams: { home: string; away: string }
}

const BetModal: React.FC<BetModalProps> = ({ gameId, teams }) => {
	const [team, setTeam] = useState('')
	const [amount, setAmount] = useState<number>(0)
	const dispatch = useDispatch()

	const handleBet = () => {
		if (team && amount > 0) {
			// console.log('Dispatching placeBet:', { gameId, team, amount })
			dispatch(placeBet({ gameId, team, amount }))
			dispatch(closeBetModal())
		} else {
			alert('Please select a team and enter a valid amount.')
		}
	}

	return (
		<ModalContainer>
			<ModalContent>
				<Title>Place Your Bet</Title>
				<FormControl>
					<Select onChange={(e) => setTeam(e.target.value)} value={team}>
						<option value="" disabled>
							Select Team
						</option>
						<option value={teams.home}>{teams.home}</option>
						<option value={teams.away}>{teams.away}</option>
					</Select>
					<Input
						type="number"
						placeholder="Bet Amount"
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
					/>
				</FormControl>
				<ButtonGroup>
					<Button $primary onClick={handleBet}>
						Submit Bet
					</Button>
					<Button onClick={() => dispatch(closeBetModal())}>Cancel</Button>
				</ButtonGroup>
			</ModalContent>
		</ModalContainer>
	)
}

export default BetModal
