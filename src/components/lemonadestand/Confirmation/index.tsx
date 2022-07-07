import { Container, Box, Typography, Button, Link, } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" disableGutters={true}>
            <Box>
                <Typography mx={10} my={30} variant="h5">
                    Your order has been placed! You will receive your lemonade shortly.<br />
                    Thank you come again!
                    <br />
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            navigate("/storefront");
                        }}
                    >
                        Order More!
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Confirmation;