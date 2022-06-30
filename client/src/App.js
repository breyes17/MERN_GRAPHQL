import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Table from './components/Table';
import Nav from './components/Nav';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <div className="container mt-5">
        <div className="row">
          <Table />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
