import React, { useState } from 'react';
import './Register.css';


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

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    image: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    city: '',
    streetName: '',
    streetNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onRegister(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    
    if (!data.username.match(/^[a-zA-Z0-9]+$/)) {
      errors.username = 'Username must contain only letters and numbers';
    } else if (data.username.length > 60) {
        errors.username = 'Username must be less than 60 characters';
      }
    if (
        data.password.length < 7 || 
        data.password.length > 12 || 
        !/[!@#$%^&*(),.?":{}|<>]/.test(data.password) || 
        !/[A-Z]/.test(data.password) || 
        !/\d/.test(data.password)
      ) {
      errors.password = 'Password must be between 7 and 12 characters long and contain at least one special character, one uppercase letter, and one number';
    }
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
    }
    if (!data.image || !data.image.name.match(/\.(jpg|jpeg)$/)) {
        errors.image = 'Please upload a JPEG image';
      }
      if (!data.firstName.match(/^[a-zA-Z]+$/)) {
        errors.firstName = 'First name must contain only letters';
      }
      if (!data.lastName.match(/^[a-zA-Z]+$/)) {
        errors.lastName = 'Last name must contain only letters';
      }
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Invalid email address';
      }
    return errors;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="register-button-container">
      
      <button onClick={openModal} className="register-button">Create an Account</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
              <label>Password Confirmation:</label>
              <input type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleChange} />
              {errors.passwordConfirmation && <span>{errors.passwordConfirmation}</span>}
            </div>
            <div>
              <label>Profile Image:</label>
              <input type="file" name="image" accept=".jpg,.jpeg" onChange={handleImageChange} />
              {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <label>Street Name:</label>
              <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} />
            </div>
            <div>
              <label>Street Number:</label>
              <input type="text" name="streetNumber" value={formData.streetNumber} onChange={handleChange} />
            </div>
            <button type="submit" style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '3px' }}>Register</button>
          </form>
        </div>
      </Modal>
    </div>
   
  );
};

export default Register;
