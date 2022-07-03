import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../context/mutation/clients';
import { GET_CLIENTS } from '../context/queries/clients';

const defaultValue = { name: '', email: '', age: 0 };

const Modal = () => {
  const [formData, setFormData] = useState(defaultValue);
  const [isError, setIsError] = useState(false);
  const [Add_Client, { error }] = useMutation(ADD_CLIENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age, 10),
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [setIsError, error]);

  const onCancel = () => {
    setIsError(false);
  };
  const onSubmit = () => {
    if (!formData.name || !formData.email || !formData.age) return;

    Add_Client();

    setFormData(defaultValue);
  };

  const showError =
    error && isError ? (
      <div className="alert alert-danger mt-3" role="alert">
        {error.message}
      </div>
    ) : (
      <></>
    );

  return (
    <>
      <button
        type="button"
        className="btn btn-dark mb-3 pl-0"
        data-bs-toggle="modal"
        data-bs-target="#clientModal"
      >
        Add client
      </button>

      <div
        className="modal fade"
        id="clientModal"
        aria-labelledby="clientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientModalLabel">
                Add client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              {showError}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((oldData) => ({
                      ...oldData,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((oldData) => ({
                      ...oldData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((oldData) => ({
                      ...oldData,
                      age: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCancel}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
