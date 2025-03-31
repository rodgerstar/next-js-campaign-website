// pages/auth/signin.js
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

export default function signin() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!result?.error) {
        router.push('/');
      } else {
        setError('Invalid email or password');
        setTimeout(() => setError(''), 4000);
      }
    } catch (error) {
      setError('Sign in failed, please try again');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-center full-h'>
      <div className='loginform'>
        <div className='heading'>
          Sign In
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type="email"
            name='email'
            value={form.email}
            onChange={handleChange} // Fixed: was handleSubmit
            placeholder='Enter email address'
            className='input'
            disabled={loading}
          />
          <input
            type="password"
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='input'
            disabled={loading}
          />
          <button
            className='login-button'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}