import logoImage from './../assets//logo.png'

// This is the footer for Travlr Getaways.
function  Footer() {
    return (
        <footer className="footer">
            <p> 
                {/* Logo image */}
                <img src={logoImage} alt="logo" width="150" height="100"/> &copy; {new Date().getFullYear()}
                 Travlr Getaways
            </p>
        </footer>
    );
}

export default Footer