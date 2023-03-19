import React from "react";

function ReadOnlyRow({ candidate, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td>{candidate.fullName}</td>
      <td>{candidate.address}</td>
      <td>{candidate.progressState}</td>
      <td>{candidate.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, candidate)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(candidate.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReadOnlyRow;
