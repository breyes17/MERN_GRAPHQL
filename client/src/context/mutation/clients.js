import { gql } from '@apollo/client';

export const DELETE_CLIENT = gql`
  mutation Delete_Client($id: ID!) {
    deleteClient(id: $id) {
      name
      id
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation Add_Client($name: String!, $email: String!, $age: Int!) {
    addClient(name: $name, email: $email, age: $age) {
      name
      email
      age
      id
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation Update_Client(
    $id: ID!
    $name: String!
    $email: String!
    $age: Int!
  ) {
    updateClient(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;
