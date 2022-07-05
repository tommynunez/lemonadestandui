import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => { navigate("/management"); }}>Management</Button>
            <Button onClick={() => { navigate("/storefront"); }}>Storefront</Button>
        </>
    );
}

export default Landing;