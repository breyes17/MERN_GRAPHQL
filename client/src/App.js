import { useQuery } from '@apollo/client';
import TableRow from './components/TableRow';
import { GET_CLIENTS } from './context/queries/clients';

function App() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <TableRow
                name={client.name}
                email={client.email}
                age={client.age}
                id={client.id}
                key={client.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
