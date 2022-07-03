import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Table from './components/Table';
import Nav from './components/Nav';
import Modal from './components/Modal';

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
        <Modal
          primaryButtonLabel={
            <>
              <i className="bi bi-person-plus"></i> Add client
            </>
          }
          primaryButtonClass="btn btn-dark mb-3"
        />
        <div className="row">
          <Table />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
