import React, { useState, lazy, Suspense, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getOdds } from './services/oddsApi'
import Filter from './components/Filter'
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setGames } from './store/slices/betSlice'
import { Game } from './types'

const BetModal = lazy(() => import('./components/BetModal'))

const App: React.FC = () => {
	const dispatch = useDispatch()
	const {
		modalOpen,
		selectedGameId,
		games: storedGames,
	} = useSelector((state: RootState) => state.bet)
	const [selectedSport, setSelectedSport] = useState<string>('soccer')
	const [page, setPage] = useState<number>(1)

	// Fetch odds data with React Query
	const { isLoading } = useQuery(
		['odds', selectedSport, page],
		() => getOdds(selectedSport),
		{
			keepPreviousData: true,
			staleTime: 60000,
			refetchOnWindowFocus: false,
			onSuccess: (data: Game[]) => {
				if (page === 1) {
					dispatch(setGames(data))
				} else {
					dispatch(setGames([...storedGames, ...data]))
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
		setPage(1) // Reset page for new sport
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
			<Dashboard games={storedGames} isLoading={isLoading} />
			<Suspense fallback={<div>Loading modal...</div>}>
				{modalOpen && selectedGameId && <BetModal gameId={selectedGameId} />}
			</Suspense>
		</div>
	)
}

export default App
