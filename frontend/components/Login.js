import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { toast } from "react-toastify";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useLoginMutation } from "../store/slices/api/authApiSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ email, password }).unwrap();
      toast.success("Logged in successfully!");
      dispatch(setCredentials(token));
      router.push("/");
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  const onChangeEmail = (email) => {
    setEmail(email.target.value);
  };

  const onChangePassword = (password) => {
    setPassword(password.target.value);
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
            onChange={(e) => onChangeEmail(e)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onChangePassword(e)}
            required
          />
          <div className={styles.eyeIcon} onClick={onShowPassword}>
            {showPassword ? <FaEye /> : <IoEyeOffSharp />}
          </div>
        </div>
        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
      <div className={styles.registerLink}>
        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
