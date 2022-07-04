import { Container, Box, Typography } from '@mui/material';
import React from 'react';

const Confirmation = () => {
    return (
        <Container maxWidth="md" disableGutters={true}>
            <Box>
                <Typography mx={10} my={30} gutterBottom variant="h5">
                    Your order has been placed! You will receive your lemonade shortly.<br />
                    Thank you come again!
                </Typography>
            </Box>
        </Container>
    );
}

export default Confirmation;