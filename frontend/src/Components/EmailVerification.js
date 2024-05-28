import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EmailVerification()  {
  const navigate = useNavigate();
  const [token, setToken] = useState(0);

  // Handle input change for token
  const handleInputChange = (event) => {
    const { value } = event.target;
    setToken(value);
  }

  // Handle form submission for verifying email
  const handleSubmit = async () => {
    try {
      let response = await fetch(`https://rentifyappservice.azurewebsites.net/api/User/Verify?Otp=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        
        toast.success("Verified Successfully. You can now proceed to login.");
        navigate("/login");
      } else if (response.status === 400) {
        toast.error("Error")
      }
    } catch (error) {
      console.error('Error:', error);
    }
     
    
  }


  return (
    <>
      <div className="max-w-md mx-auto border max-w-sm mt-20 rounded">
        <form className="shadow-md px-4 py-6">
          <div className="flex justify-center gap-2 mb-6">
            <input
              className="w-full h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              type="text"
              name="token"
              id="token"
             
              required onChange={handleInputChange}
            />
            
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
           onClick={handleSubmit} >
              Verify
            </button>
            
          </div>
        </form>
      </div>
    </>
  );
}

export default EmailVerification;
