/* 
** Form for adding a new listing to the database.
*/
import { useState } from "react";
import axios from "axios";

function AddListing () {

    // div ID for add form
    const addFormID = "AddListingForm";

    // State variable for server response
    var [serverResponse, setResponseMessage] = useState("");

    // Initialize variables for the staet objects.
    const initialTripState = {
        sku: "",
        price: "",
        title: "",
        descrip: "",
        description: "",
        date: "",
        image: "",
        range: ""
    };
    const initialAmenityState = {
        amnArr0: "",
        amnArr1: "",
        amnArr2: "",
        amnArr3: "",
        amnArr4: "",
        amnArr5: "",
    };

    // Setup state variable objects for the new listing
    // useState objects store the data needed for the API call later
    const [tripDetails, setNewTrip] = useState(initialTripState);
    const [amenityArr, setAmenityArr] = useState(initialAmenityState);
    
    // Functions for updating the state
    function changeSku (event) {
        setNewTrip({...tripDetails, sku: event.target.value });
    }
    function changePrice (event) {
        setNewTrip({...tripDetails, price: event.target.value });
    }
    function changeTitle (event) {
        setNewTrip({...tripDetails, title: event.target.value });
    }
    function changeDescrip (event) {
        setNewTrip({...tripDetails, descrip: event.target.value });
    }
    function changeDescription (event) {
        setNewTrip({...tripDetails, description: event.target.value });
    }
    function changeDate (event) {
        setNewTrip({...tripDetails, date: event.target.value });
    }
    function changeImage (event) {
        setNewTrip({...tripDetails, image: event.target.value });
    }
    function changeRange (event) {
        setNewTrip({...tripDetails, range: event.target.value });
    }
    // Updaters for amenities
    function changeAmenity0 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr0: event.target.value}));
    }
    function changeAmenity1 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr1: event.target.value}));
    }
    function changeAmenity2 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr2: event.target.value}));
    }
    function changeAmenity3 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr3: event.target.value}));
    }
    function changeAmenity4 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr4: event.target.value}));
    }
    function changeAmenity5 (event) {
        setAmenityArr(prevAmn => ({...prevAmn, amnArr5: event.target.value}));
    }


    // Function for the PUT call
    function handleSubmit (event) {

        // Prevents premature refreshing from the submit button.
        event.preventDefault();
        // Check if any fields are empty
        if (
            tripDetails.sku === "" ||
            tripDetails.price === "" ||
            tripDetails.title === "" ||
            tripDetails.descrip === "" ||
            tripDetails.description === "" ||
            tripDetails.date === "" ||
            tripDetails.image === "" ||
            tripDetails.range === "" ||
            amenityArr.amnArr0 === "" ||
            amenityArr.amnArr1 === "" ||
            amenityArr.amnArr2 === "" ||
            amenityArr.amnArr3 === "" ||
            amenityArr.amnArr4 === "" ||
            amenityArr.amnArr5 === ""
            )
        {    
            alert("Please ensure all fields are filled out.")
            return;
        }
        else {
            // Set up data for JSON object
            var sku = tripDetails.sku;
            var price = tripDetails.price;
            var title = tripDetails.title;
            var descrip = tripDetails.descrip;
            var description = tripDetails.description;
            var date = tripDetails.date;
            var image = tripDetails.image;
            var range = tripDetails.range;
            var amenity = [
                amenityArr.amnArr0, 
                amenityArr.amnArr1,
                amenityArr.amnArr2,
                amenityArr.amnArr3,
                amenityArr.amnArr4,
                amenityArr.amnArr5
            ];
        
            // Setup new JSON object for the POST request
            const newTrip = {
                sku,
                price,
                title,
                descrip,
                description,
                date,
                image,
                range,
                amenity
            };

        
            // Function for POST request
            const sendPost = async() => {
                try {
                    // Make POST request with user provided data
                    serverResponse = await axios.post("http://localhost:3000/api/trips", newTrip);
                    setResponseMessage(serverResponse);
                }
                catch (error) {
                    setResponseMessage("Error creating post");
                }
            }
            // Call function
            sendPost();
            // Refresh the page to display updates
            window.location.reload();
        }
    }





    // Make the screen invisible again upon X click
    const xClick = (passID) => {
        // Get the div's ID and set its CSS display value to none to close the window.
        document.getElementById(passID).style.display = "none";;
        document.getElementById("newForm").reset();
    }

    // Lets the user close the window be pressing the esc key.
    const escPress = (e, passID) => {
        // Only exit if the user presses "esc"
        if (e.key === "Escape") {
            // Hide the element.
            document.getElementById(passID).style.display = "none";
            document.getElementById("newForm").reset();
        }
    }

    return(
        <div className="ListingForm" id={addFormID} tabIndex="0" onKeyDown={(e) => escPress(e, addFormID)}>
        
        <div id="formDiv">
            <form id="newForm" action="">
                {/* First column for forum. */}
                <div className="column1">
                    <label className="fieldLabel" htmlFor="sku">Trip SKU:</label>
                    <input className="inputField" type="text" id="sku" onChange={changeSku}></input>

                    <label className="fieldLabel" htmlFor="title">Trip Title:</label>
                    <input className="inputField" type="text" id="title" onChange={changeTitle}></input>

                    <label className="fieldLabel" htmlFor="image">Trip Image Name:</label>
                    <input className="inputField" type="text" id="image" onChange={changeImage}></input>
                    
                    <label className="fieldLabel" htmlFor="descrip">Trip Preview:</label>
                    <textarea className="inputField" type="text" id="descrip" onChange={changeDescrip}></textarea>

                    <label className="fieldLabel" htmlFor="description">Trip Description:</label>
                    <textarea className="inputField" cols="40" rows="5" id="description" 
                                                onChange={changeDescription}></textarea>
                </div>
                
                {/* Secound column for forum. */}
                <div className="column2">
                    
                    <label className="fieldLabel2" htmlFor="date">Trip Date Range:</label>
                    <input className="inputField2" type="text" id="date" onChange={changeDate}></input>
                    
                    <label className="fieldLabel2" htmlFor="range">Trip Days/Nights:</label>
                    <input className="inputField2" type="text" id="range" onChange={changeRange}></input>
                    
                    <label className="fieldLabel2" htmlFor="price">Trip Price per Person:</label>
                    <input className="inputField2" type="text" id="price" onChange={changePrice}></input>
                    
                    <label className="fieldLabel2" htmlFor="amenities">Trip Amenities:</label>
                    
                    {/* Selection menus for possible amenities */}
                    <label>Bar&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="bar" onChange={changeAmenity0}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    
                    <br/>
                    <label>Resort&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="resort" onChange={changeAmenity1}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>24/7 Desk&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="desk" onChange={changeAmenity2}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>Spa&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="spa" onChange={changeAmenity3}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>Breakfast&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="breakfast" onChange={changeAmenity4}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    
                    <br/>
                    <label>Gym&nbsp;&nbsp;</label>
                    <select defaultValue="" className="amenities" id="gym" onChange={changeAmenity5}>
                        <option value=""></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <input id="submitBtn" type="submit" value="Submit" 
                    onClick={(e) => handleSubmit(e)}></input>
            </form>
            {/* X button that closes the window.*/}
            <span className="xClose" onClick={() => xClick(addFormID)} >&times;</span>
        </div>
        </div>
    );
}

export default AddListing