import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

import Header from './components/Header';
import LinkList from './components/LinkList';
import AddLinkModal from './components/AddLinkModal';
import DeleteLinkModal from './components/DeleteLinkModal';
import PasswordModal from './components/PasswordModal';
import PasswordInputModal from './components/PasswordInputModal';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the base URL as a constant
const loc = window.location;
const BASE_URL = loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '');

function App() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ url: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Add state for edit mode
  const [showPasswordInputModal, setShowPasswordInputModal] = useState(false); // Add state for showing password input modal

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/links`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Failed to fetch links:', error);
      }
    };

    fetchLinks();
  }, []);

  const handlePasswordSubmit = async () => {
    console.log('password:', password);
    try {
      const response = await fetch(`${BASE_URL}/api/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Password is valid') {
          setIsPasswordValid(true);
          setIsEditMode(true); // Activate edit mode
          setShowPasswordModal(false);
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Failed to validate password:', error);
      alert('Failed to validate password');
    }
  };

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => setShowPasswordModal(false);

  const handleAddLink = async (e) => {
    e.preventDefault();
    const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/.*)?$/;

    if (!urlPattern.test(newLink.url)) {
      alert('Invalid URL');
      return;
    }

    let url = newLink.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    const payload = { ...newLink, url, password };
    console.log('Request payload:', payload); // Log the request payload

    try {
      const response = await fetch(`${BASE_URL}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLinks((prevLinks) => [...prevLinks, data]);
      setNewLink({ url: '', description: '' }); // Reset the newLink state
      closeModal(); // Close the modal after successfully adding the link
    } catch (error) {
      console.error('Failed to add link:', error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/links/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete link: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to delete link:', error);
      alert('Failed to delete link');
    }
  };

  const handleSaveLink = async (editedLink) => {
    try {
      const response = await fetch(`${BASE_URL}/api/links/${editedLink.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editedLink, password }),
      });

      if (response.ok) {
        setLinks((prevLinks) => prevLinks.map(link => (link.id === editedLink.id ? editedLink : link)));
      } else {
        alert('Failed to update link');
      }
    } catch (error) {
      console.error('Failed to update link:', error);
      alert('Failed to update link');
    }
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const closeModal = () => setShowModal(false);
  const closeDeleteModal = () => setDeleteId(null);
  const closePasswordInputModal = () => setShowPasswordInputModal(false);

  const onAddLink = () => {
    if (!password) {
      setShowPasswordInputModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handlePasswordInputSubmit = () => {
    if (password) {
      setShowPasswordInputModal(false);
      setShowModal(true);
    } else {
      alert('Password is required');
    }
  };

  return (
    <Container>
      <Header onAddLink={onAddLink} onEdit={openPasswordModal} password={password} setPassword={setPassword} />
      <LinkList
        links={links}
        onCopy={handleCopy}
        onEdit={isPasswordValid ? setDeleteId : null}
        copiedLink={copiedLink}
        onSave={handleSaveLink}
        isEditMode={isEditMode} // Pass edit mode state
        handleDeleteLink={handleDeleteLink} // Pass delete handler
      />
      <AddLinkModal
        showModal={showModal}
        newLink={newLink}
        setNewLink={setNewLink}
        handleSubmit={handleAddLink}
        closeModal={closeModal}
      />
      <DeleteLinkModal
        showModal={deleteId !== null}
        password={password}
        setPassword={setPassword}
        handleDelete={handleDeleteLink}
        closeModal={closeDeleteModal}
      />
      <PasswordModal
        showModal={showPasswordModal}
        password={password}
        setPassword={setPassword}
        handleSubmit={handlePasswordSubmit}
        closeModal={closePasswordModal}
      />
      <PasswordInputModal
        showModal={showPasswordInputModal}
        password={password}
        setPassword={setPassword}
        handleSubmit={handlePasswordInputSubmit}
        closeModal={closePasswordInputModal}
      />
    </Container>
  );
}

export default App;