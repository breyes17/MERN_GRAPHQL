import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../context/mutation/clients';
import { GET_CLIENTS } from '../context/queries/clients';

const TableRow = ({ name, email, age, id }) => {
  const [Delete_Client, { error }] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CLIENTS }],
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
          className="btn btn-danger"
          onClick={Delete_Client}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
