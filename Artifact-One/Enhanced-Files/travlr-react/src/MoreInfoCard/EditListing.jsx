/* 
** This function returns a form for the user to edit the content of the current listing.
*/
import { useState } from "react";
import axios from "axios";


function EditListing (props) {
    
    // div ID for edit form
    const editFormID = "EditListingForm" + props.ID;

    // State variable for server response
    var [serverResponse, setResponseMessage] = useState("");
    
        // Initialize variables for the useState objects.
        const initialTripState = {
            sku: props.sku,
            price: props.price,
            title: props.title,
            descrip: props.descrip,
            description: props.description,
            date: props.date,
            image: props.image,
            range: props.range
        };
        const initialAmenityState = {
            amnArr0: props.amenity[0],
            amnArr1: props.amenity[1],
            amnArr2: props.amenity[2],
            amnArr3: props.amenity[3],
            amnArr4: props.amenity[4],
            amnArr5: props.amenity[5],
        };

    // Setup useState variable objects
    const [tripDetails, setNewTrip] = useState(initialTripState);
    const [amenityArr, setAmenityArr] = useState(initialAmenityState);
    
    // Functions for updating the states
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
            // Function for PUT request
            const sendPut = async() => {
                try {
                // Make POST request to send data
                serverResponse = await axios.put(`http://localhost:3000/api/trips/${props.ID}`, newTrip);
                setResponseMessage(serverResponse);
                props.ID = newTrip.sku;
            }
            catch (error) {
                setResponseMessage("Error creating post");
            }
            }
            // Call function
            sendPut();
            // Refresh the page to display changes.
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
            document.getElementById(passID).style.display = "none";
            document.getElementById("newForm").reset();
        }
    }

    // Return edit listing form.
    return(
        <div  className="ListingForm" id={editFormID} tabIndex="0" onKeyDown={(e) => escPress(e, editFormID)}>
        
        <div id="formDiv">
            
            <form id="newForm" action="">
                {/* First column for form. */}
                <div className="column1">
                    <label className="fieldLabel" htmlFor="sku">Trip SKU:</label>
                    <input className="inputField" type="text" id="sku" defaultValue={props.sku}
                    onChange={changeSku}></input>

                    <label className="fieldLabel" htmlFor="title">Trip Title:</label>
                    <input className="inputField" type="text" id="title" defaultValue={props.title}
                    onChange={changeTitle}></input>

                    <label className="fieldLabel" htmlFor="image">Trip Image Name:</label>
                    <input className="inputField" type="text" id="image" defaultValue={props.image}
                    onChange={changeImage}></input>
                    
                    <label className="fieldLabel" htmlFor="descrip">Trip Preview:</label>
                    <textarea className="inputField" type="text" id="descrip" defaultValue={props.descrip}
                    onChange={changeDescrip}></textarea>

                    <label className="fieldLabel" htmlFor="description">Trip Description:</label>
                    <textarea className="inputField" cols="40" rows="5" id="description" defaultValue={props.description}
                    onChange={changeDescription}></textarea>
                </div>
                
                {/* Secound column for form. */}
                <div className="column2">
                    
                    <label className="fieldLabel2" htmlFor="calendar">Trip Date Range:</label>
                    <input className="inputField2" type="text" id="calendar"  defaultValue={props.range}
                    onChange={changeRange}></input>
                    
                    <label className="fieldLabel2" htmlFor="duration">Trip Days/Nights:</label>
                    <input className="inputField2" type="text" id="duration" defaultValue={props.date}
                    onChange={changeDate}></input>
                    
                    <label className="fieldLabel2" htmlFor="price">Trip Price per Person:</label>
                    <input className="inputField2" type="text" id="price" defaultValue={props.price}
                    onChange={changePrice}></input>
                    
                    <label className="fieldLabel2" htmlFor="amenities">Trip Amenities:</label>
                    
                    {/* Selection menus for possible amenities */}
                    <label>Bar&nbsp;&nbsp;</label>
                    <select className="amenities" id="bar" defaultValue="Yes"
                        onChange={changeAmenity0}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    
                    <br/>
                    <label>Resort&nbsp;&nbsp;</label>
                    <select className="amenities" id="resort" defaultValue={props.amenity[1]}
                        onChange={changeAmenity1}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>24/7 Desk&nbsp;&nbsp;</label>
                    <select className="amenities" id="desk" defaultValue={props.amenity[2]}
                        onChange={changeAmenity2}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>Spa&nbsp;&nbsp;</label>
                    <select className="amenities" id="spa" defaultValue={props.amenity[3]}
                        onChange={changeAmenity3}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <br/>
                    <label>Breakfast&nbsp;&nbsp;</label>
                    <select className="amenities" id="breakfast" defaultValue={props.amenity[4]}
                        onChange={changeAmenity4}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    
                    <br/>
                    <label>Gym&nbsp;&nbsp;</label>
                    <select className="amenities" id="gym" defaultValue={props.amenity[5]}
                        onChange={changeAmenity5}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                {/* Button for submission */}
                <input id="submitBtn" type="submit" value="Submit"
                    onClick={(e) => handleSubmit(e)}></input>
            </form>
            {/* X button that closes the window.*/}
            <span className="xClose" onClick={() => xClick(editFormID)} >&times;</span>
        </div>
        </div>
    );
}

export default EditListing