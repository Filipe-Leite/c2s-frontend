import React, { useState } from 'react';
import './createModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    onSubmit(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Task</h2>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateModal;