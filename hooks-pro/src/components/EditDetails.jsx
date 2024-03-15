import React, { useState } from 'react';
import './EditDetails.css';

const EditDetails = ({ user, onEdit }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
    setErrors({ ...errors, [name]: null });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedUser({ ...updatedUser, image: file });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(updatedUser);
    if (Object.keys(validationErrors).length === 0) {
      onEdit(updatedUser);
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

  return (
    <div className="EditDetails-container">
      <div className="Card">
        <div className="Card-header">
          <h2 className="Card-title">Edit Details</h2>
        </div>
        <div className="Card-body">
          <form className="EditDetails-form" onSubmit={handleSubmit}>
            <div className="Form-group">
              <label>Username:</label>
              <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
              {errors.username && <span className="EditDetails-error">{errors.username}</span>}
            </div>
            <div className="Form-group">
              <label>Password:</label>
              <input type="password" name="password" value={updatedUser.password} onChange={handleChange} />
              {errors.password && <span className="EditDetails-error">{errors.password}</span>}
            </div>
            <div className="Form-group">
              <label>Password Confirmation:</label>
              <input type="password" name="passwordConfirmation" value={updatedUser.passwordConfirmation} onChange={handleChange} />
              {errors.passwordConfirmation && <span className="EditDetails-error">{errors.passwordConfirmation}</span>}
            </div>
            <div className="Form-group">
              <label>Profile Image:</label>
              <input type="file" name="image" onChange={handleImageChange} />
              {errors.image && <span className="EditDetails-error">{errors.image}</span>}
            </div>
            <div className="Form-group">
              <label>First Name:</label>
              <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
              {errors.firstName && <span className="EditDetails-error">{errors.firstName}</span>}
            </div>
            <div className="Form-group">
              <label>Last Name:</label>
              <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
              {errors.lastName && <span className="EditDetails-error">{errors.lastName}</span>}
            </div>
            <div className="Form-group">
              <label>City:</label>
              <input type="text" name="city" value={updatedUser.city} onChange={handleChange} />
              {errors.city && <span className="EditDetails-error">{errors.city}</span>}
            </div>
            <div className="Form-group">
              <label>Street Name:</label>
              <input type="text" name="streetName" value={updatedUser.streetName} onChange={handleChange} />
              {errors.streetName && <span className="EditDetails-error">{errors.streetName}</span>}
            </div>
            <div className="Form-group">
              <label>Street Number:</label>
              <input type="number" name="streetNumber" value={updatedUser.streetNumber} onChange={handleChange} />
              {errors.streetNumber && <span className="EditDetails-error">{errors.streetNumber}</span>}
            </div>
            <button type="submit" className="Card-button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
