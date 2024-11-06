import styled from 'styled-components'

const FilterContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	margin: 1rem 0;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`

const FilterButton = styled.button<{ $isActive: boolean }>`
	padding: 0.5rem 1rem;
	background-color: ${(props) => (props.$isActive ? '#1976d2' : '#ddd')};
	color: ${(props) => (props.$isActive ? '#fff' : '#000')};
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => (props.$isActive ? '#1565c0' : '#ccc')};
	}
`

interface FilterProps {
	selectedSport: string
	onFilterChange: (sport: string) => void
}

const sportsMap: { [key: string]: string } = {
	Soccer: 'soccer',
	Basketball: 'basketball_nba',
	MMA: 'mma_mixed_martial_arts',
}

const Filter: React.FC<FilterProps> = ({ selectedSport, onFilterChange }) => {
	const sports = ['Soccer', 'Basketball', 'MMA']

	return (
		<FilterContainer>
			{sports.map((sport) => (
				<FilterButton
					key={sport}
					$isActive={selectedSport === sportsMap[sport]}
					onClick={() => {
						if (selectedSport !== sportsMap[sport]) {
							onFilterChange(sportsMap[sport])
						}
					}}
				>
					{sport}
				</FilterButton>
			))}
		</FilterContainer>
	)
}

export default Filter
