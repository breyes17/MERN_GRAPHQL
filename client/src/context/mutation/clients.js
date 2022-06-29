import { gql } from '@apollo/client';

export const DELETE_CLIENT = gql`
  mutation Delete_Client($id: ID!) {
    deleteClient(id: $id) {
      name
    }
  }
`;
