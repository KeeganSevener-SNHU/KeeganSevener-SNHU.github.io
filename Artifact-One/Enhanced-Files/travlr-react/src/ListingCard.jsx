/* 
** ListingCard component for the trip listings. This creates the previews seen on the home page.
** ListingCard imports a MoreInfoCard into each listing for the popup modals that provide a greater amount of
** listing information and the edit functions.
*/
import MoreInfoCard from "./MoreInfoCard";
import EditListing from "./MoreInfoCard/EditListing";
import { jwtDecode } from "jwt-decode";

function ListingCard (props) {

    // Setup image link
    const imageLink = "/src/assets/"+props.image+".jpg";

    // Function for button click.
    const onclick = (event, id) => {
        // Get infoCard element and update the display.
        const infoCard = document.getElementById(id);
        infoCard.style.display = "block";
        
        // switch case decide what functions are made available based on user role
        switch(jwtDecode(localStorage.getItem('JWtoken')).roles[0]) {
            case "reactAdmin":
                document.getElementById(`deleteBtn${id}`).style.marginTop = "30vh";
                document.getElementById(`deleteBtn${id}`).style.backgroundColor = "rgb(201, 60, 60)";
                document.getElementById(`deleteBtn${id}`).style.display = "block";
            case "writer":
                document.getElementById(`addBtn${id}`).style.marginTop = "0vh";
                document.getElementById(`addBtn${id}`).style.backgroundColor = "rgb(35, 163, 87)";
                document.getElementById(`addBtn${id}`).style.display = "block";
                
                document.getElementById(`editBtn${id}`).style.marginTop = "15vh";
                document.getElementById(`editBtn${id}`).style.backgroundColor = "rgb(85, 88, 87);";
                document.getElementById(`editBtn${id}`).style.display = "block";

                document.getElementById(`listing${id}`).style.display = "block";
                break;
            default:
                document.getElementByClassName("listingFunctions").style.display = "none";
                break;
            }
        }

    // Component to return.
    return (
        
        <div className="listingCard">
            {/* Image, title, and short description */}
            <img className='listingImage' src={imageLink} alt="reef image"></img>
            <h2 className='listingTitle'> {props.title} </h2>
            <p id="previewDescrip"> {props.descrip} </p>
            
            {/* Button to active that popup modal*/}
            <div className="ButtonBlock">
                <button onClick={(event)=>onclick(event, props.id)} className="listingButton">
                    More Info
                </button>
            </div>

            {/* Pass information onto the detail card for the popup modal box */}
            <MoreInfoCard 
                ID={props.id}
                description={props.description}
                image={props.image}
                title={props.title}
                date={props.date}
                range={props.range}
                amenity={props.amenity}
                price={props.price}
                />
            {/* Pass information onto the edit listing form */}
            <EditListing
                    ID={props.id}
                    sku={props.sku}
                    descrip={props.descrip}
                    description={props.description}
                    image={props.image}
                    title={props.title}
                    date={props.date}
                    range={props.range}
                    amenity={props.amenity}
                    price={props.price}
                />
        </div>
    );
}

export default ListingCard