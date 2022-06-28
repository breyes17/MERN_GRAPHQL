import React from 'react';

const TableRow = ({ name, email, age, id }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{age}</td>
    </tr>
  );
};

export default TableRow;
