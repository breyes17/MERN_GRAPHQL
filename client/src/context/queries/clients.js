import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      name
      email
      age
      id
    }
  }
`;

export { GET_CLIENTS };
