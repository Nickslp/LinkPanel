import React from 'react';
import { Button } from 'reactstrap';
import './css/Header.css'; // Import the CSS file

const Header = ({ onAddLink, onEdit }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-center mb-3 mt-5 ml-5 mr-5">
      <h1>LinkPanel</h1>
    </div>
    <div className="d-flex justify-content-end">
      <Button color="primary" onClick={onAddLink} className="margin-custom">Add Link</Button>
      <Button color="secondary" onClick={onEdit} className="margin-custom">Edit</Button>
    </div>
  </div>
);

export default Header;