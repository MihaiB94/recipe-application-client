// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Replace with your server URL

// const UserList = () => {
//    const [users, setUsers] = useState([]);
//    const [editableUser, setEditableUser] = useState(null);

//    const roles = ['admin', 'chef', 'user'];

//    useEffect(() => {
//       const getUsers = async () => {
//          try {
//             const res = await axios.get('/users', {
//                headers: {
//                   Authorization: `Bearer ${localStorage.getItem('token')}`
//                }
//             });
//             setUsers(res.data);
//          } catch (err) {
//             console.log(err);
//          }
//       };

//       // Call getUsers function to fetch initial user list
//       getUsers();

//       // Listen for 'user-updated' event and update state accordingly
//       socket.on('user-updated', ({ userId }) => {
//          getUsers();
//       });

//       // Clean up the event listener when component unmounts
//       return () => {
//          socket.off('user-updated');
//       };
//    }, []);

//    const handleSaveUser = async (user) => {
//       try {
//          console.log('User ID:', user._id);
//          const response = await axios.put(
//             `/users/${user._id}`,
//             {
//                username: user.username,
//                email: user.email,
//                permissions: user.permissions
//             },
//             {
//                headers: {
//                   Authorization: `Bearer ${localStorage.getItem('token')}`
//                }
//             }
//          );
//          console.log('Response:', response.data);
//          const updatedUser = response.data;

//          // Emit 'user-updated' event to the server
//          socket.emit('user-updated', { userId: updatedUser._id });

//          // Update state with updated user information
//          setUsers((prevUsers) => {
//             const index = prevUsers.findIndex((u) => u._id === updatedUser._id);
//             const newUsers = [...prevUsers];
//             newUsers[index] = updatedUser;
//             return newUsers;
//          });
//          setEditableUser(null);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const handleEditUser = (user) => {
//       setEditableUser(user);
//    };

//    const handleCancelEdit = () => {
//       setEditableUser(null);
//    };

//    return (
//       <table>
//          <thead>
//             <tr>
//                <th>ID</th>
//                <th>Username</th>
//                <th>Email</th>
//                <th>Role</th>
//                <th>Actions</th>
//             </tr>
//          </thead>
//          <tbody>
//             {users.map((user) => (
//                <tr key={user._id}>
//                   <td>{user._id}</td>
//                   <td>
//                      {editableUser && editableUser._id === user._id ? (
//                         <input
//                            type="text"
//                            value={editableUser.username}
//                            onChange={(e) =>
//                               setEditableUser((prevUser) => ({
//                                  ...prevUser,
//                                  username: e.target.value
//                               }))
//                            }
//                         />
//                      ) : (
//                         user.username
//                      )}
//                   </td>
//                   <td>
//                      {editableUser && editableUser._id === user._id ? (
//                         <input
//                            type="email"
//                            value={editableUser.email}
//                            onChange={(e) =>
//                               setEditableUser((prevUser) => ({
//                                  ...prevUser,
//                                  email: e.target.value
//                               }))
//                            }
//                         />
//                      ) : (
//                         user.email
//                      )}
//                   </td>
//                   <td>
//                      {editableUser && editableUser._id === user._id ? (
//                         <select
//                            value={editableUser.permissions}
//                            onChange={(e) =>
//                               setEditableUser((prevUser) => ({
//                                  ...prevUser,
//                                  permissions: e.target.value
//                               }))
//                            }
//                         >
//                            {roles.map((role) => (
//                               <option key={role} value={role}>
//                                  {role}
//                               </option>
//                            ))}
//                         </select>
//                      ) : (
//                         user.permissions
//                      )}
//                   </td>
//                   <td>
//                      {editableUser && editableUser._id === user._id ? (
//                         <>
//                            <button onClick={() => handleSaveUser(editableUser)}>
//                               Save
//                            </button>
//                            <button onClick={handleCancelEdit}>Cancel</button>
//                         </>
//                      ) : (
//                         <button onClick={() => handleEditUser(user)}>
//                            Edit
//                         </button>
//                      )}
//                   </td>
//                </tr>
//             ))}
//          </tbody>
//       </table>
//    );
// };

// export default UserList;
