import { GraphQLClient } from 'graphql-request';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { prepareGOSU } from './gosu';
import { Screens } from './pages/screens';
import { CurrentPlay } from './pages/screens/currentPlay';
import { TestGQLMatches } from './pages/screens/testGQLMatches';
import { TestGQLMatchesPoller } from './pages/screens/testGQLMatches-polling';

const queryClient = new QueryClient();
export const graphqlClient = new GraphQLClient("https://roc22-admin.kotworks.cyou/gql")

// я не специально...
// правда...
prepareGOSU();
window.GOSU.start();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="screens">
          <Route path="currentPlay" element={<CurrentPlay />} />
          <Route index element={<Screens />} />
        </Route>
        <Route path="testGQL" element={<TestGQLMatches />} />
        <Route path="testGQLPoller" element={<TestGQLMatchesPoller />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);