import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import store from './store'

// Initialize a QueryClient instance
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>
)
