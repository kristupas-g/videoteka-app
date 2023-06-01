import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/esm/Image";
import { LoadingButton } from "../components/LoadingButton";
import { NavLink } from "react-router-dom";
import { palette } from "../config/palette";

export function WelcomePage() {
    return(
        
        <Container
            style={{
              width: "90vw",
              height: "85vh",
              objectFit: "fill",
              borderRadius: "15px",
              backgroundColor: palette.gray,
              backgroundSize: "cover",
              display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
              
            }}
            > <h1 style={{textAlign: "center", fontWeight: "bold", color:"white"}}> Access Lectures Anytime, Anywhere with VUTube</h1>
            <h3 style={{textAlign: "center", color:"white"}}>Ready To Join?</h3>
            <NavLink to="/signup">
                <Button >Get Started!</Button>
             </NavLink>

            </Container>
        
    );
}