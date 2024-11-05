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
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`

const ModalContent = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	width: 300px;
	text-align: center;
`

const BetModal: React.FC<{ gameId: string }> = ({ gameId }) => {
	const [team, setTeam] = useState('')
	const [amount, setAmount] = useState<number>(0)
	const dispatch = useDispatch()

	const handleBet = () => {
		dispatch(placeBet({ gameId, team, amount }))
		dispatch(closeBetModal())
	}

	return (
		<ModalContainer>
			<ModalContent>
				<h2>Place Your Bet</h2>
				<select onChange={(e) => setTeam(e.target.value)} value={team}>
					<option value="" disabled>
						Select Team
					</option>
					<option value="team1">Team 1</option>
					<option value="team2">Team 2</option>
				</select>
				<input
					type="number"
					placeholder="Bet Amount"
					value={amount}
					onChange={(e) => setAmount(+e.target.value)}
				/>
				<button onClick={handleBet}>Submit Bet</button>
				<button onClick={() => dispatch(closeBetModal())}>Cancel</button>
			</ModalContent>
		</ModalContainer>
	)
}

export default BetModal
