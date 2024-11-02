import React, { useState } from 'react';
import { FaClipboardCheck, FaCopy, FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';

const LinkItem = ({ link, onCopy, onEdit, copiedLink, onSave, isEditMode, handleDeleteLink }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLink, setEditedLink] = useState(link);

  const handleSave = () => {
    onSave(editedLink);
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedLink.description}
            onChange={(e) => setEditedLink({ ...editedLink, description: e.target.value })}
            style={{ flex: '1 1 33%' }}
          />
          <input
            type="text"
            value={editedLink.url}
            onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
            style={{ flex: '1 1 33%' }}
          />
          <div style={{ flex: '1 1 33%', textAlign: 'right' }}>
            <FaSave className="icon-hover cursor-pointer" onClick={handleSave} title="Save changes" />
            <FaTimes className="icon-hover cursor-pointer" onClick={() => setIsEditing(false)} title="Cancel" style={{ marginLeft: '10px' }} />
          </div>
        </>
      ) : (
        <>
          <div style={{ flex: '1 1 33%' }}>{link.description}</div>
          <div style={{ flex: '1 1 33%', textAlign: 'left' }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              {link.url}
            </a>
          </div>
          <div style={{ flex: '1 1 33%', textAlign: 'right' }}>
            {isEditMode ? (
              <FaTrash className="icon-hover cursor-pointer" onClick={() => handleDeleteLink(link.id)} title="Delete link" />
            ) : (
              copiedLink === link.url ? (
                <FaClipboardCheck className="icon-hover cursor-pointer" title="Link copied" />
              ) : (
                <FaCopy className="icon-hover cursor-pointer" onClick={() => onCopy(link.url)} title="Copy link" />
              )
            )}
            {isEditMode && (
              <FaEdit className="icon-hover cursor-pointer" onClick={() => setIsEditing(true)} title="Edit link" style={{ marginLeft: '10px' }} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LinkItem;