import React, { useState, lazy, Suspense, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getOdds } from './services/oddsApi'
import Filter from './components/Filter'
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setGames, openBetModal } from './store/slices/betSlice'
import { Game } from './types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BetModal = lazy(() => import('./components/BetModal'))

const App: React.FC = () => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const {
		modalOpen,
		selectedGameId,
		games: storedGames,
		bets,
	} = useSelector((state: RootState) => state.bet)
	const [selectedSport, setSelectedSport] = useState<string>('soccer')
	const [page, setPage] = useState<number>(1)
	const [selectedTeams, setSelectedTeams] = useState<{
		home: string
		away: string
	} | null>(null)

	useEffect(() => {
		setPage(1)
		queryClient.invalidateQueries(['odds', selectedSport])
	}, [selectedSport, queryClient])

	// Fetch odds data with React Query
	const { isLoading } = useQuery(
		['odds', selectedSport, page],
		() => getOdds(selectedSport),
		{
			keepPreviousData: true,
			staleTime: 60000,
			refetchOnWindowFocus: false,
			onSuccess: (data: Game[]) => {
				if (data && data.length > 0) {
					if (page === 1) {
						dispatch(setGames(data))
					} else {
						dispatch(setGames([...storedGames, ...data]))
					}
				}
			},
		}
	)

	// Infinite scroll logic
	const handleScroll = () => {
		if (
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 100
		) {
			setPage((prevPage) => prevPage + 1)
		}
	}

	// Reset page when changing sport filter
	const handleFilterChange = (sport: string) => {
		setSelectedSport(sport)
	}

	// Open the modal and set selected teams for the clicked game
	const handleOpenBetModal = (game: Game) => {
		setSelectedTeams({ home: game.home_team, away: game.away_team })
		dispatch(openBetModal(game.id))
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div>
			<Filter
				selectedSport={selectedSport}
				onFilterChange={handleFilterChange}
			/>
			<Dashboard
				games={storedGames}
				bets={bets}
				isLoading={isLoading}
				onCardClick={handleOpenBetModal}
				selectedSport={selectedSport}
			/>
			<Suspense fallback={<div>Loading modal...</div>}>
				{modalOpen && selectedGameId && selectedTeams && (
					<BetModal gameId={selectedGameId} teams={selectedTeams} />
				)}
			</Suspense>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
		</div>
	)
}

export default App
