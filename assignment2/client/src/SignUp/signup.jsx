import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    const strength = getPasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (name === "password") {
        const strength = getPasswordStrength(value);
        setPasswordStrength(strength); // <-- update here
      }
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
  
    if (score <= 1) return 'Weak';
    if (score === 2) return 'Moderate';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("All fields are required!");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    const strength = getPasswordStrength(formData.password);
    if (strength === 'Weak') {
      toast.error("Password is too weak. Please choose a stronger password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: formData.email,
            username: formData.name,
            password: formData.password
        })
      });;

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });

        setTimeout(() => {
            navigate('/'); 
        }, 3000);
      } else {
        toast.error(result.error || 'Signup failed');
      }
    } catch (err) {
        console.error(err);
        toast.error('Server error')
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center font-nunito"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/loginimg3.jpg)` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900">
              <img className="w-11 h-11 mb-2" src="/logo (2).png" alt="logo" />
              <span className="font-bold">Shoplify</span>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 text-left px-2">Username</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full rounded-xl px-2 bg-white text-gray-800 border border-gray-300" placeholder="John Doe" required />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 text-left px-2">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full rounded-xl px-2 bg-white text-gray-800 border border-gray-300" placeholder="name@company.com" required />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 text-left px-2">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="input input-bordered w-full rounded-xl px-2 pr-10 bg-white text-gray-800 border border-gray-300"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.06 10.06 0 012.51-4.043M6.84 6.84A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.423 5.61M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                        </svg>
                        )}
                    </button>
                    {formData.password && (
                    <p
                        className={`text-sm px-2 mt-1 text-left font-nunito ${
                        passwordStrength === 'Strong'
                            ? 'text-green-600'
                            : passwordStrength === 'Moderate'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                    >
                        Password Strength: {passwordStrength}
                    </p>
                    )}
                </div>


                <div className="relative">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700 text-left px-2">
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="input input-bordered w-full rounded-xl px-2 pr-10 bg-white text-gray-800 border border-gray-300"
                        required
                    />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-500"
                    tabIndex={-1}
                >
                    {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.06 10.06 0 012.51-4.043M6.84 6.84A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.423 5.61M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                    )}
                </button>
               </div>

               <div className="flex justify-end">
                    <Link
                        to="/"
                        className="text-sm text-gray-800 hover:text-primary-600 hover:underline transition-all duration-200"
                    >
                        Already have an account?
                    </Link>
                </div>

                <button type="submit" className="w-full text-gray-800 rounded-xl py-1 hover:bg-gray-500 hover:text-white transition-colors duration-300">
                    Sign up
                </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Signup;
