import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Management = () => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h5" color="primary">
                Welcome to the management side of your lemonade stand!
            </Typography>
            <Typography variant="subtitle1" color="secondary">
                Here you can create products that customers will see on the store front and view orders submitted.
            </Typography>
        </>
    );
}

export default Management;