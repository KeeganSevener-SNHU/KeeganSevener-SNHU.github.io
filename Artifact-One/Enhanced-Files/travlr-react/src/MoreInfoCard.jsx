
/* 
** Subcard for the all the listing details.
** When this modal is visible, Users will also see options to delete, edit, or create a new listing.
*/

// Import custom emojis
import bar from './assets/bar.png';
import desk from './assets/desk.png';
import gym from './assets/gym.png';
import mug from './assets/mug.png';
import resort from './assets/resort.png';
import spa from './assets/spa.png';
import axios from "axios";

function MoreInfoCard ({ID="1", description="sample", image="", title="", date="", range="", amenity=[], price=""}) {

    // Setup image link
    const imageLink = "/src/assets/"+image+".jpg";
    
    // Make the screen invisible again upon X click
    const xClick = (passID) => {
        // Get the div's ID and set its CSS display value to none to close the window.
        document.getElementById(passID).style.display = "none";
    }

    // Make the screen invisible upon ADD click and bring up add listing screen.
    const addClick = (passID) => {
        // Get the div's ID and set its CSS display value to none to close the window.
        document.getElementById(passID).style.display = "none";
        document.getElementById("AddListingForm").style.display = "block";
    }

    // Make the screen invisible upon EDIT click and bring up edit listing screen.
    const editClick = (passID) => {
        // Get the div's ID and set its CSS display value to none to close the window.
        document.getElementById(passID).style.display = "none";
        document.getElementById("EditListingForm"+passID).style.display = "block";
    }

    // Lets the user close the window be pressing the esc key.
    const escPress = (e, passID) => {
        // Only exit if the user presses "esc"
        if (e.key === "Escape") {
            document.getElementById(passID).style.display = "none";
        }
    }


    // DELETE function from axios to delete a listing from the server.
    function handleDelete () {
        // Variable for the server response
        var response;
        // Call delete using axios
        const sendDelete = async() => {
        try {
            response = await axios.delete(`http://localhost:3000/api/trips/${ID}`);
        }
        catch (error) {
            console.log("Error with delete operation.");
        }
        console.log(response);
        }
        sendDelete();
    }


    
    // Return the HTML details
    return (
        <div id={ID} className="MoreInfoCard" tabIndex="0" onKeyDown={(e) => escPress(e, ID)}>
            {/* onKeyDown calls the escPress function. */}
            
            {/* Side box for listing options */}
            <div className="listingFunctions" id={`listing${ID}`}>
                <button className="funcBtns" id={`addBtn${ID}`} onClick={() => addClick(ID)}> ADD </button>
                <br/>
                <button className="funcBtns" id={`editBtn${ID}`} onClick={() => editClick(ID)}> EDIT </button>
                <br/>
                <button className="funcBtns" id={`deleteBtn${ID}`} onClick={() => handleDelete()}> DELETE </button>
            </div>
            
            {/* Box for listing content */}
            <div className="moreInfoContent" >

                {/* x symbol for closing the box */}
                <span onClick={() => xClick(ID)} className="xClose" >&times;</span>

                <header className="moreInfoHead">
                    <h2>{title}</h2>
                </header>
                
                <img className="detailImage" src={imageLink} alt="Image of coral Reef"/>
                 
                    <p className="moreInfoDescription">
                        {description}
                    </p>
                    <br/>
                    {/* Division for the travel packages amenities. */}
                    <div>
                        {/* First column of amenities */}
                        <dl className="amenities">
                            <dt><b>Amenities</b></dt>
                            <dd className="amenDets">
                                <img className="amenImage" src={bar} alt="image"/>
                                &nbsp;&nbsp;&nbsp;Bar : {amenity[0]}</dd>
                            <dd className="amenDets">
                                <img className="amenImage" src={resort} alt="image"/>
                                &nbsp;&nbsp;&nbsp;Resort : {amenity[1]}</dd>
                            <dd className="amenDets">
                                <img className="amenImage" src={desk} alt="image"/>
                                &nbsp;&nbsp;&nbsp;24/7 Desk : {amenity[2]}</dd>
                        </dl>
                        {/* Second column of amenities */}
                        <dl className="amenities2">
                            <dt></dt>
                            <dd className="amenDets"> 
                                <img className="amenImage" src={spa} alt="image"/>
                                &nbsp;&nbsp;&nbsp;Spa : {amenity[3]}</dd>
                            <dd className="amenDets">
                                <img className="amenImage" src={mug} alt="image"/>
                                &nbsp;&nbsp;&nbsp;Breakfast : {amenity[4]}</dd>
                            <dd className="amenDets">
                                <img className="amenImage" src={gym} alt="image"/>
                                &nbsp;&nbsp;&nbsp;Gym : {amenity[5]}</dd>
                        </dl>
                    </div>
                    {/* Pricing info and date ranges and duration */}
                    <div className="pricingInfo">
                        <p>Price Per Person : ${price}</p>
                        <p>Date Range : {date}</p>
                        <p>Days: {range}</p>
                    </div>
            </div>
        </div>
    );
}

export default MoreInfoCard