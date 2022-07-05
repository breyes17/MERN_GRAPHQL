import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT, UPDATE_CLIENT } from '../context/mutation/clients';
import { GET_CLIENTS } from '../context/queries/clients';

const TableRow = ({ name, email, age, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name,
    email,
    age,
    id,
  });

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

  const [Update_Client] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age, 10),
    },
    update(cache, { data: { updateClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      const updatedClient = clients.map((client) => {
        if (client.id === updateClient.id) {
          client = { ...updateClient };
        }
        return client;
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: updatedClient },
      });
    },
  });

  if (error) alert('Something went wrong while deleting a row');

  const handleOnEdit = () => {
    if (!isEdit) {
      setIsEdit((oldVal) => !oldVal);
      return;
    }

    Update_Client();
    setIsEdit((oldVal) => !oldVal);
  };

  return (
    <tr>
      <td>
        {isEdit ? (
          <input
            className="form-control"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((oldData) => ({ ...oldData, name: e.target.value }))
            }
          />
        ) : (
          name
        )}
      </td>
      <td>
        {' '}
        {isEdit ? (
          <input
            className="form-control"
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData((oldData) => ({ ...oldData, email: e.target.value }))
            }
          />
        ) : (
          email
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            className="form-control"
            type="text"
            value={formData.age}
            onChange={(e) =>
              setFormData((oldData) => ({ ...oldData, age: e.target.value }))
            }
          />
        ) : (
          age
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger me-1"
          onClick={Delete_Client}
          disabled={isEdit}
        >
          <i className="bi bi-trash"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary me-1"
          onClick={handleOnEdit}
        >
          {isEdit ? (
            <i className="bi bi-person-check"></i>
          ) : (
            <i className="bi bi-pencil-square"></i>
          )}
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
