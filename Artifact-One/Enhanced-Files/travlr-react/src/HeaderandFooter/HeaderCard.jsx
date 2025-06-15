import { useNavigate } from 'react-router-dom';
import axios from "axios";

// This is the header for Travlr Getaways admin app.
function Header () {

    // Set axios authorization header to default with user token
    // This ensures the JWT is sent with each CRUD request as the server needs.
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWtoken")}`;

    // Create a React useNavigate variable.
    const navigate = useNavigate();

    // Logout function
    const logOutUser = () => {
        // remove storage, navigate to login page,
        localStorage.removeItem('JWtoken');
        navigate('/login');
    }

    // Function to navigate to home screen when clicking title.
    const navHome = () => {
        navigate('/');
    }

    return (
        <header className="Header">
            <h1 className="headerH1" onClick={navHome}>Travlr Getaways</h1>
            <button id="logOutBtn" onClick={() => logOutUser()}>Logout</button>
        </header>
        );
}

// Export the header.
export default Header;