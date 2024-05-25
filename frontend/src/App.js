import './App.css';
import UserRegister from './Components/UserRegistration';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import VerifyUser from './Components/EmailVerification';
import Login from './Components/UserLogin';
import ForgetPassword from './Components/ForgetPassword';
import ChangePassword from './Components/PasswordChangeForm';
import MainPage from './Components/MainPage';
import PropertyDetails from './Components/PropertyDetails';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SellerProperty from './Components/SellerProperty';
import EditSellerProperty from './Components/PostSellerProperty';
import EditProperty from './Components/EditProperty';
import LandingPage from './Components/LandingPage';

// import MainPage from './Components/MainPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRegister />,
  },
  {
    path: "/verify",
    element: <VerifyUser />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword/>,
  },
  {
    path:"/changepassword",
    element:<ChangePassword/>
  },
  {
    path:"/dashboard",
    element:<MainPage/>
  },
  {
    path:"/propertydetails",
    element:<><Navbar/><PropertyDetails/></>
  },
  {
    path:"/SellerProperty",
    element:<><Navbar/><SellerProperty/></>
  },
  {
    path:"/EditSellerProperty",
    element:<><Navbar/><EditSellerProperty/></>
  },
  {
    path:"/EditProperty",
    element:<><Navbar/><EditProperty/></>
  },
  {
    path:"/landingpage",
    element:<><Navbar/><LandingPage/></>
  }

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer /> {/* Add ToastContainer here */}
      {/* <MainPage/> */}
    </>
  );
}

export default App;
