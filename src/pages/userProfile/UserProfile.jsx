import { useContext, useState } from 'react';
import axiosInstance from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import './userProfile.css';

export default function UserSettings() {
   const { user, dispatch } = useContext(ContextAPI);
   const [profilePic, setProfilePic] = useState(user.profilePic);
   const [username, setUsername] = useState(user.username);
   const [email, setEmail] = useState(user.email);
   const [password, setPassword] = useState('');
   const [success, setSuccess] = useState(false);
   const [showChangePassword, setShowChangePassword] = useState(false);
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [passwordMismatch, setPasswordMismatch] = useState(false);

   console.log(user.id);
   console.log(localStorage.getItem('token'));
   const token = localStorage.getItem('token');
   const userId = JSON.parse(atob(token.split('.')[1])).id;
   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: 'UPDATE_START' });

      const updatedUser = {
         userId,
         profilePic,
         username,
         email,
         password
      };

      try {
         const res = await axiosInstance.put(`/users/${user.id}`, updatedUser, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
         setSuccess(true);

         dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      } catch (error) {
         dispatch({ type: 'UPDATE_FAILURE' });
      }
   };

   const handleChangePassword = async (e) => {
      e.preventDefault();
      setPasswordError('');
      if (newPassword !== confirmPassword) {
         setPasswordError('Passwords do not match.');
         return;
      }
      const updatedUser = {
         userId: user.id,
         password: newPassword
      };
      try {
         const res = await axiosInstance.put(`/users/${user.id}`, updatedUser, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
         setShowChangePassword(false);
         setSuccess(true);
         dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      } catch (error) {
         dispatch({ type: 'UPDATE_FAILURE' });
      }
   };

   const handleShowChangePassword = () => {
      setShowChangePassword(true);
   };

   return (
      <div className="user-settings">
         <div className="user-settings-wrapper">
            <div className="settings-title">
               <span className="settings-update-title">
                  Update Your Account
               </span>
               <span className="settings-delete-title">Delete Account</span>
            </div>
            <form className="user-settings-form" onSubmit={handleSubmit}>
               <label>Profile Picture</label>
               <div className="settings-profile-pic">
                  <img src={user.profilePic} alt="" />
                  <div>
                     {' '}
                     <textarea
                        required
                        type="text"
                        cols="30"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                     ></textarea>
                  </div>
               </div>

               <label>Username</label>
               <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />

               <label>Email</label>
               <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />

               <label>Password</label>
               <input
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
               />
               {passwordMismatch && (
                  <span className="error-txt">
                     Current password is incorrect.
                  </span>
               )}

               <button className="settings-submit" type="submit">
                  Update
               </button>
               {success && <span className="success-txt">Profile Updated</span>}
            </form>

            <button
               className="settings-password"
               onClick={handleShowChangePassword}
            >
               Change Password
            </button>
            {showChangePassword && (
               <form
                  className="change-password-form"
                  onSubmit={handleChangePassword}
               >
                  <label>Old Password</label>
                  <input
                     required
                     type="password"
                     value={oldPassword}
                     onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label>New Password</label>
                  <input
                     required
                     type="password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label>Confirm New Password</label>
                  <input
                     required
                     type="password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordError && (
                     <span className="error-txt">{passwordError}</span>
                  )}
                  <button className="settings-submit" type="submit">
                     Change Password
                  </button>
               </form>
            )}
         </div>
      </div>
   );
}
