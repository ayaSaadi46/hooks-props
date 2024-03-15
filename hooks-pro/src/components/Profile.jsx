import React from 'react';

const Profile = ({ user, handleLogout, handleUpdateDetails }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
      <h2>Profile</h2>
      <p>Profile Image:</p>
      {user.image && <img src={URL.createObjectURL(user.image)} alt="Profile" style={{ width: '100px', height: 'auto' }} />}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Date of Birth: {user.dateOfBirth}</p>
      <p>City: {user.city}</p>
      <p>Street Name: {user.streetName}</p>
      <p>Street Number: {user.streetNumber}</p>
     
      <button onClick={handleUpdateDetails} style={{ backgroundColor: '#ffc107', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '3px', marginRight: '10px' }}>Update Details</button> 
      <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '3px' }}>Logout</button> 
    
    </div>
  );
};

export default Profile;

