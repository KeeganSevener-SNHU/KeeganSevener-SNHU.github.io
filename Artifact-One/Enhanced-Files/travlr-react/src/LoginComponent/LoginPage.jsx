/**
 ** This function component creates the Login Page for the Travlr Getaways Admin application.
 */

import {useContext} from 'react';
import { LoginContext } from "./../App";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Login page function
function LoginPage () {

  // Server message for processing server responses
  let serverMessage;
  // Error message for incorrect credentials
  var errorMessage = "Incorrect credentials or credentials are incomplete";
  // navigate value for redirect.
  const navigate = useNavigate();
  // Import the LoginContext
  const {loginSet} = useContext(LoginContext);



  // Update login status with this function call.
  const updateLogin = () => {
    // Get the username and password from the input fields.
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // Format user doc for API call
    const user = {
      name,
      email,
      password,
    }
    

    // Function creates API call for login
    const sendUserLogin = async() => {
      
      // Call server login 
      try {
        serverMessage = await axios.post(`http://localhost:3000/api/login`, user)
      }
      catch (error) {
        alert("Error with server connection");
      }
      // If server response is valid, store JWT and navigate to the main page.
      if (serverMessage.status === 200) {
        loginSet(serverMessage.data.JWtoken)
        navigate("/");
      }
      // Otherwise, inform user of error
      else {
        document.getElementById("errorMessage").style.display = "inline";
      }

    }
    // Call the function.
      sendUserLogin();
  }


  // Create new user and update login status with this function call.
  const sendRegister = () => {
    // Get the username and password from the input fields.
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // Format user doc for API call
    const newUser = {
      name,
      email,
      password,
    }
    
    // Function to send the register call to the API
    const sendUserRegister = async() => {
      
      // Call server register API
      try {
        serverMessage = await axios.post(`http://localhost:3000/api/register`, newUser)
      }
      catch (error) {
        alert("Error with server connection");
      }
      // If server response is valid, store JWT and navigate to the main page.
      if (serverMessage.status === 200) {
        loginSet(serverMessage.data.JWtoken)
        navigate("/");
      }
      // Otherwise, inform user of error
      else {
        document.getElementById("errorMessage").style.display = "inline";
      }
    }
    // Call the function.
      sendUserRegister();
  }



  // User login form
  return (
    <>
    {/* Create Login page div */}
     <div className="loginPage">
      <h2 id="header2">Welcome to Travlr Getaways Admin</h2>
        <div className="loginBox">
            {/* Input for email */}
            <input className="userInput" type="email" placeholder="email@email.com" id="email"></input>
            <br/>
            {/* Input for username */}
            <input className="userInput" type="text" placeholder="username" id="username"></input>
            <br/>
            {/* Input for password */}
            <input className="userInput" type="password" placeholder="password" id="password" ></input>
            <br/>
            {/* Login button */}
            <button className="loginButtons" id="logBtn" onClick={updateLogin}> Login </button>
            {/* Register button */}
            <button className="loginButtons" id="regBtn" onClick={sendRegister}> Register </button>
         </div>
         <h2 id="errorMessage"><i>{errorMessage}</i></h2>
     </div>
    </>
  );
}

// Export the LoginPage function
export default LoginPage;