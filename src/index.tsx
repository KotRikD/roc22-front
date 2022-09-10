import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { MatchPool } from '@/pages/screens/MatchPool';

import { prepareGOSU } from './gosu';
import './index.css';
import { Screens } from './pages/screens';
import { CurrentPlay } from './pages/screens/currentPlay';
import { Schedule } from './pages/screens/schedule';
import { TestGQLMatches } from './pages/screens/testGQLMatches';
import { TestGQLMatchesPoller } from './pages/screens/testGQLMatches-polling';

const queryClient = new QueryClient();

// я не специально...
// правда...
prepareGOSU();
window.GOSU.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<HashRouter>
			<Routes>
				{/* <Route index element={<Home />} /> */}
				<Route path="screens">
					<Route path="schedule" element={<Schedule />} />
					<Route path="currentPlay" element={<CurrentPlay />} />
					<Route path="matchPool" element={<MatchPool />} />
					<Route index element={<Screens />} />
				</Route>
				<Route path="testGQL" element={<TestGQLMatches />} />
				<Route path="testGQLPoller" element={<TestGQLMatchesPoller />} />
			</Routes>
		</HashRouter>
	</QueryClientProvider>
);
