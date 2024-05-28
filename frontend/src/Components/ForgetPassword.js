import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    // Retrieve email from localStorage on component mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    // Update email state on input change
    const handleInputChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send request to server to send token
            let response = await fetch(`https://rentifyappservice.azurewebsites.net/api/User/ForgetPassword?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Notify user that token has been sent
                toast.success("Token sent to your email address");
                navigate("/changepassword");
            } else if (response.status === 400) {
                console.log(await response.text()); // Log error message
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto border max-w-sm mt-20 rounded">
                <form className="shadow-md px-4 py-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-6">
                        <input
                            className="w-full h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            required
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send OTP
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4"
                            href="/"
                        >
                            Resend OTP
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgotPassword;
