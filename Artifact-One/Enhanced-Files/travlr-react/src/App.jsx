/*
//============================================================================
// Name        : travlr-React
// Author      : Keegan Sevener
// Date        : May 24, 2025
// Version     : 1.0
// Description : Project for SNHU CS499 Capstone
//============================================================================
 ** App file pulls together the components and sets up the routing for the React application.
 */

import Header from './HeaderandFooter/HeaderCard';
import Footer from './HeaderandFooter/Footer';
import HomeComponent from './HomeComponent';
import LoginPage from './LoginComponent/LoginPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddListing from "./MoreInfoCard/AddListing";
import {createContext} from 'react';


// Use the context library from React to avoid unnecessary prop-drilling.
// Export the LoginContext for sub-components.
export const LoginContext = createContext();

function App() {

  // Create a login function for context pass.
  // Adds a JSON Web Token to local storage
  function loginSet (JWtoken) {
      localStorage.setItem("JWtoken", JWtoken)
  }

  return (
    // Declare Router function and routes for the pages.
    <Router>
      <Routes>
        {/*Route for the main page*/}
        <Route path="/" element={
          <>
            <Header/>
              <HomeComponent />
            {/* Import the AddListing component for creating new trip listings*/}
            <AddListing/>
            <Footer />
            </>
          }>
          </Route>
          {/*Route for the login page*/}
          <Route path="/login" element={ 
          <>
          {/* Wrap login and Header components in context provider for passing loginSet down the components*/}
            <LoginContext.Provider value={{loginSet}}>
              <Header/>
              <LoginPage/>
            </LoginContext.Provider>
          </>
          }>
          </Route>
      </Routes>
   </Router> 
   );
}


export default App
