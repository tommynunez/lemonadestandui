import { Container, Box, Typography, Button, Link, } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id || parseInt(id) === 0) {
            window.location.href = '/storefront';
        }
    }, []);

    return (
        <Container maxWidth="md" disableGutters={true}>
            <Box>
                <Typography mx={10} my={30} variant="h5">
                    Your order has been placed! You will receive your lemonade shortly.<br />
                    Thank you come again!
                    <br />
                    Your order number is #{id}
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