import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledComponents, StyledLanding } from './index.styles';
import Product from '../Product';
import Review from '../Review';
import StepperFooter from '../../shared/Layout/StepperLayout/Footer';
import StepperHeader from '../../shared/Layout/StepperLayout/Header';
import Contact from '../Contact';
import { useState } from 'react';
import { Typography } from '@mui/material';

type LineItem = {
    productId: number,
    quantity: number,
    cost: string,
};

type ContactInformation = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

type Order = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    lineItems: Array<LineItem>;
}

const Landing = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [lineItems, setLineItem] = useState([] as Array<LineItem>);
    const [contactInformation, setcontactInformation] = useState({} as ContactInformation);
    const steps = ['Place Order', 'Customer Information', 'Review Order'];
    const comps = [
        React.createElement(Product, { lineItems, setLineItem }),
        React.createElement(Contact, { contactInformation, setcontactInformation }),
        React.createElement(Review)
    ];

    const handleNext = () => {
        console.log(lineItems);
        console.log(contactInformation);

        const filteredLineitems = lineItems.filter((item, index) => {
            return item.quantity > 0;
        });

        if (filteredLineitems.length === 0) {
            return;
        };

        if (activeStep === steps.length - 1) {
            //Todo send data to server
            //reroute user to confirmation page
            return;
        };
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <StyledLanding>
            <Box sx={{ width: '100%' }}>
                <>
                    <StepperHeader steps={steps} activeStep={activeStep} />
                    {
                        (lineItems.length === 0 && lineItems?.filter((item, index) => {
                            return item?.quantity?.toString() === '0'
                        }).length > 0)
                            ?
                            <Typography variant="button" color="#FF0000" display="block" gutterBottom align="center" mt={3}>
                                Please enter a quantity to proceed.
                            </Typography>
                            : null
                    }
                    {
                        comps.map((item, index) => {
                            if (index === activeStep) {
                                return (
                                    <StyledComponents key={index}>
                                        {item}
                                    </StyledComponents>
                                )
                            }
                        })
                    }
                    <StepperFooter
                        steps={steps}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        handleNext={handleNext}
                    />
                </>
            </Box>
        </StyledLanding >
    );
}

export default Landing;