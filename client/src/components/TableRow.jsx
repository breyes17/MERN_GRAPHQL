import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../context/mutation/clients';
import { GET_CLIENTS } from '../context/queries/clients';

const TableRow = ({ name, email, age, id }) => {
  const [Delete_Client, { error }] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      const freshClients = clients.filter(
        (client) => client.id !== deleteClient.id
      );
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: freshClients },
      });
    },
  });

  if (error) alert('Something went wrong');

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{age}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger me-1"
          onClick={Delete_Client}
        >
          <i class="bi bi-trash"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={Delete_Client}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
