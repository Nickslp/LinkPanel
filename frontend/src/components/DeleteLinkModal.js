import React from 'react';
import { FaTimes } from 'react-icons/fa';

const DeleteLinkModal = ({ showModal, password, setPassword, handleDelete, closeModal }) => (
  showModal && (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="modal-content" style={{ width: '40%', margin: '15% auto', backgroundColor: '#1e1f22', position: 'relative' }}>
        <span className="close" onClick={closeModal}>
          <FaTimes style={{ color: 'white', fontSize: '28px' }} />
        </span>
        <h2 className="text-white" style={{ margin: '0 0 20px 10px' }}>Delete Link</h2>
        <p className="text-white">Please enter your password to confirm the deletion.</p>
        <input type="password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleDelete} className="btn btn-danger">Delete Link</button>
      </div>
    </div>
  )
);

export default DeleteLinkModal;
