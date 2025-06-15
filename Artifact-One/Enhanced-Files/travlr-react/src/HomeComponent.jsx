/*
** This Home Component is used to put together the listing cards for the home page and handle high-level functions
** for the home page such as the redirect to the login page in case the user is not signed in.
 */
import ListingCard from './ListingCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Home Componenet for handling some of the high level functions like redirects.
function HomeComponent () {

    // useState variables for the GET request.
    const [tripData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Create a React useNavigate variable.
    const navigate = useNavigate();



    // useEffect will be called on each render and ensure the user is logged in.
    useEffect(() => {
        if (!(localStorage.getItem('JWtoken'))) {
                navigate('/login', {replace: true});
            }
    });




    // Only render if user is logged in.
    if (localStorage.getItem('JWtoken')) {
        
        // Make GET request to fetch trip data from the MongoDB database
        useEffect(() => {
        axios
            .get("http://localhost:3000/api/trips")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);



    // Display this if data has not been returned yet
    if (loading) return <div>Loading coral trip listing data...</div>;
    // Display the error in case of error
    if (error) return <div>Error: {error}</div>;
    


    // Return listings.
    return(
            <>
            {/* Loop through JSON content to create the appropriate amount of listing cards */}
            {/* NOTE: 'id' gets assigned the SKU so that the document's sku can be updated but still found in the 
            database prior to the update */}
            {tripData.map( card =>
                    <ListingCard
                    key={card.sku}

                    id={card.sku}
                    sku={card.sku}
                    title={card.title}
                    descrip={card.descrip}
                    image={card.image}
                    date={card.date}
                    range={card.range}
                    amenity={card.amenity}
                    price={card.price}
                    description={card.description}
                      />
                  ) }
            </>
        );
    }
}

export default HomeComponent