import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import { toast } from "react-toastify";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      
      // Set cookie
      document.cookie = `token=${res.data.token}; path=/`; 
      console.log(res.data.token);

      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Invalid UserName or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}     
            required        
          />
          <div className={styles.eyeIcon} onClick={onShowPassword}>
                    {showPassword ? <FaEye /> : <IoEyeOffSharp />}
                  </div>
          
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className={styles.registerLink}>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}
