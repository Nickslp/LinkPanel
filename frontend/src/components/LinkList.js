import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import LinkItem from './LinkItem';
import './css/LinkList.css'; // Import the CSS file

const LinkList = ({ links, onCopy, onEdit, copiedLink, onSave, isEditMode, handleDeleteLink }) => (
  <ListGroup className="list-group-custom">
    {links.map(link => (
      <ListGroupItem key={link.id} className="list-group-item-custom">
        <LinkItem
          link={link}
          onCopy={onCopy}
          onEdit={onEdit}
          copiedLink={copiedLink}
          onSave={onSave}
          isEditMode={isEditMode} // Pass edit mode state
          handleDeleteLink={handleDeleteLink} // Pass delete handler
        />
      </ListGroupItem>
    ))}
  </ListGroup>
);

export default LinkList;