import React, { useState } from 'react';
import './Login.css';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.username, formData.password);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div  className="Login-button-container">
      
      <button onClick={handleOpenModal} className="Login-button"> Login </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '3px' }}>Login</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
