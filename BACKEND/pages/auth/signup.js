import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Signup() {
    const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState('');

   const router = useRouter();

   // authenticate
    useEffect(() => {

    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirmPassword) {
            setErrors('Passwords do not match');
            return;

        }
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        const data = await res.json();

        if (data.error) {
            setError('Error happened here')
            setTimeout(() => {
                setError('')
            }, 3000)
        } else {
            router.push('/auth/signin');
        }
    }

  return (
    <>
        <div className='flex flex-center full-h'>

            <div className='loginform'>
                <div className='heading'>
                    Sign Up Create Admin
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <input type="email" name='email' onChange={handleChange} placeholder='Enter email address' className='input'/>
                    <input type="password" name='password' placeholder='Enter password' className='input'/>
                    <input type="password" name='confirmpassword' placeholder='Confirm password' className='input'/>
                    <button className='login-button' type='submit'>Sign Up</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>

    </>
  );
}