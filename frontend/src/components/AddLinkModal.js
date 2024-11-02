import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AddLinkModal = ({ showModal, newLink, setNewLink, handleSubmit, closeModal }) => (
  showModal && (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="modal-content" style={{ width: '40%', margin: '15% auto', backgroundColor: '#1e1f22', position: 'relative' }}>
        <span className="close" onClick={closeModal}>
          <FaTimes style={{ color: 'white', fontSize: '28px' }} />
        </span>
        <h2 className="text-white" style={{ margin: '0 0 20px 10px' }}>Add New Link</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description (optional)</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={newLink.description}
              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Link</button>
        </form>
      </div>
    </div>
  )
);

export default AddLinkModal;