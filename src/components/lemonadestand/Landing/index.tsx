import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledComponents, StyledLanding } from './index.styles';
import Product from '../Product';
import { Formik } from 'formik';
import Review from '../Review';
import StepperFooter from '../StepperLayout/Footer';
import StepperHeader from '../StepperLayout/Header';
import Contact from '../Contact';

const steps = ['Place Order', 'Review Order'];
const comps = [React.createElement(Product), React.createElement(Contact), React.createElement(Review)];

type ListItems = {
    quantity: number,
    productId: number,
};

const Landing = () => {
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            //Todo send data to server
            //reroute user to confirmation page
            return;
        }
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
                <Formik
                    initialValues={{
                        location: 0 as number,
                        totalCost: '' as string,
                        listItems: [] as Array<ListItems>,
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    <>
                        <StepperHeader steps={steps} activeStep={activeStep} />
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
                </Formik>
            </Box>
        </StyledLanding >
    );
}

export default Landing;