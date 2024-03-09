import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/TNavbar';
function UserInfo() {
  const [isEdit, setIsEdit] = useState(true);
  const [userData, setUserData] = useState({
    displayName: 'John Doe',
    iffcNumber: '12345678',
    bankAccount: '1234567890',
    bankName: 'My Bank',
  });

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const renderInfo = () => (
    <div className="mx-40 form-container">
      <form className="edit-form">
      <h2 className='content-center mb-4'>User Profile</h2>
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          className='my-4'
          name="displayName"
          value={userData.displayName}
        />
        <TextField
          label="IFFC Number"
          variant="outlined"
          fullWidth
          className='my-4'
          name="iffcNumber"
          value={userData.iffcNumber}
        />
        <TextField
          label="Bank Account"
          variant="outlined"
          fullWidth
          className='my-4'
          name="bankAccount"
          value={userData.bankAccount}
        />
        <TextField
          label="Bank Name"
          variant="outlined"
          fullWidth
          className='my-4'
          name="bankName"
          value={userData.bankName}
        />
      </form>
    </div>
  );

  const renderEditForm = () => (
    <div className="mx-40 form-container">

      <form className="edit-form">
        <h2 className='content-center mb-4'>User Profile</h2>
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          className='my-4'
          name="displayName"
          value={userData.displayName}
          onChange={handleChange}
        />
        <TextField
          label="IFFC Number"
          variant="outlined"
          fullWidth
          className='my-4'
          name="iffcNumber"
          value={userData.iffcNumber}
          onChange={handleChange}
        />
        <TextField
          label="Bank Account"
          variant="outlined"
          fullWidth
          className='my-4'
          name="bankAccount"
          value={userData.bankAccount}
          onChange={handleChange}
        />
        <TextField
          label="Bank Name"
          variant="outlined"
          fullWidth
          className='my-4'
          name="bankName"
          value={userData.bankName}
          onChange={handleChange}
        />
        <Button
          className='mt-4'
          variant="contained"
          color="primary"
          onClick={() => setIsEdit(false)}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );

  return (
    <div className="user-info">
      <Navbar/>
      {isEdit ? renderEditForm() : renderInfo()}
      <Button
      className='ml-10'
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        
      >
        {isEdit ? 'Close Edit' : 'Edit'}
      </Button>
    </div>
  );
}

export default UserInfo;




