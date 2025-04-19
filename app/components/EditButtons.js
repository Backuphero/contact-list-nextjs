"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { RiEditLine, RiDeleteBinLine, RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

function EditButtons({ contact, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    if (typeof contact.id === 'number') {
      router.push(`/contacts/${contact.id}/edit`);
    } else {
      console.error('Invalid contact ID:', contact.id);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteInProgress(true);
      await onDelete(contact);
      setShowConfirmation(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete contact:', error);
    } finally {
      setDeleteInProgress(false);
    }
  };

  return (
    <div className="edit-buttons-container">
      <button className="secondary-button" onClick={handleEdit}>
        <RiEditLine size="1.3em" style={{ marginRight: '4px' }} />
        Edit
      </button>
      
      {!showConfirmation ? (
        <button 
          className="delete-button" 
          onClick={() => setShowConfirmation(true)}
          disabled={deleteInProgress}
        >
          <RiDeleteBinLine size="1.3em" style={{ marginRight: '4px' }} />
          {deleteInProgress ? 'Deleting...' : 'Delete'}
        </button>
      ) : (
        <div className="delete-confirmation">
          <span className="confirmation-text">
            Delete <strong>{contact.name}</strong>?
          </span>
          <button
            className="confirm-button"
            onClick={handleDelete}
            disabled={deleteInProgress}
          >
            {deleteInProgress ? 'Deleting...' : 'Confirm'}
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowConfirmation(false)}
            disabled={deleteInProgress}
            aria-label="Cancel delete"
          >
            <RiCloseLine size="1.5em" color="#dc2626" />
          </button>
        </div>
      )}
    </div>
  );
}

EditButtons.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditButtons;