// pages/auth/signup.js
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Signup() {
  const { data: session, status } = useSession(); // Fixed syntax
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match'); // Fixed variable name from setErrors
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error || 'Error occurred during signup');
        setTimeout(() => setError(''), 3000);
      } else {
        router.push('/auth/signin');
      }
    } catch (error) {
      setError('Signup failed, please try again');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className='flex flex-center full-h'>
      <div className='loginform'>
        <div className='heading'>
          Sign Up Create Admin
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type="email"
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Enter email address'
            className='input'
          />
          <input
            type="password"
            name='password'
            value={form.password}
            onChange={handleChange} // Fixed: was handleSubmit
            placeholder='Enter password'
            className='input'
          />
          <input
            type="password"
            name='confirmPassword' // Fixed case to match state
            value={form.confirmPassword}
            onChange={handleChange} // Fixed: was handleSubmit
            placeholder='Confirm password'
            className='input'
          />
          <button className='login-button' type='submit'>
            Sign Up
          </button>
          <div className='signupask'>
            Already have an account  <Link href='/auth/signin'><p>Click here</p></Link>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}