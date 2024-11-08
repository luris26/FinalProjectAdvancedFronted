

// import React, { useState } from 'react';
// import { loginUser } from '../api/authApi';
// import { useAuth } from '../context/AuthContext';

// const Login: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { token } = await loginUser(username, password);
//       login(token);
//       alert('Welcome back!');
//     } catch (error) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20">
//       <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//         className="mb-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//         className="mb-6 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;
