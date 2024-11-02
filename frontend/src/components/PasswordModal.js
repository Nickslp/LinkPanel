import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the close and eye icons from React Icons
import './css/PasswordModal.css'; // Import the custom CSS

const PasswordModal = ({ showModal, password, setPassword, handleSubmit, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={showModal} toggle={closeModal} className="custom-modal">
      <ModalHeader className="custom-modal-header">
        Enter Password
        <button type="button" className="custom-close-button" aria-label="Close" onClick={closeModal}>
          <FaTimes />
        </button>
      </ModalHeader>
      <ModalBody className="custom-modal-body">
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="custom-input"
          />
          <InputGroupText className="custom-input-group-text" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroupText>
        </InputGroup>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
        <Button color="secondary" onClick={closeModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PasswordModal;