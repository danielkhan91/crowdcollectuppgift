import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Table = ({searchData, allCandidates}) => {

    console.log(searchData);
  const [candidates, setCandidates] = useState(allCandidates);

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    progressState: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    progressState: "",
    email: "",
  });

  const [editCandidateId, setEditCandidateId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newCandidate = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      progressState: addFormData.progressState,
      email: addFormData.email,
    };

    const newCandidates = [...candidates, newCandidate];
    setCandidates(newCandidates);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCandidate = {
      id: editCandidateId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      progressState: editFormData.progressState,
      email: editFormData.email,
    };

    const newCandidates = [...candidates];

    const index = candidates.findIndex((candidate) => candidate.id === editCandidateId);

    newCandidates[index] = editedCandidate;

    setCandidates(newCandidates);
    setEditCandidateId(null);
  };

  const handleEditClick = (event, candidate) => {
    event.preventDefault();
    setEditCandidateId(candidate.id);

    const formValues = {
      fullName: candidate.fullName,
      address: candidate.address,
      progressState: candidate.progressState,
      email: candidate.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditCandidateId(null);
  };

  const handleDeleteClick = (candidateId) => {
    const newCandidates = [...candidates];

    const index = candidates.findIndex((candidate) => candidate.id === candidateId);

    newCandidates.splice(index, 1);

    setCandidates(newCandidates);
  };

  return (
    <div className="app-wrapper">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Progress State</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <Fragment>
                {editCandidateId === candidate.id? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    candidate={candidate}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Candidate</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="progressState"
          required="required"
          placeholder="Enter a progress state..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Table;