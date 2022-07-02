import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledComponents, StyledLanding } from './index.styles';
import Product from './Product';
import Review from './Review';
import StepperFooter from '../shared/Layout/StepperLayout/Footer';
import StepperHeader from '../shared/Layout/StepperLayout/Header';
import Contact from './Contact';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ErrorKnockOutModal from '../shared/Modal';

type LineItem = {
    productId: number,
    quantity: number,
    cost: string,
};

type ContactInformation = {
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    phone: string | undefined,
};

type Order = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    lineItems: Array<LineItem>;
};

type FormHandlerFields = {
    name: string,
    isTouched: boolean,
};

type FormHandler = {
    formHasLoaded: boolean,
    isDirty: boolean,
    formHandlerfields: Array<FormHandlerFields>,
};

const formHandlerIninitialState: FormHandler = {
    formHasLoaded: false,
    isDirty: false,
    formHandlerfields: [
        { name: "firstName", isTouched: false },
        { name: "lastName", isTouched: false },
        { name: "email", isTouched: false },
        { name: "phone", isTouched: false }
    ]
};

const contactInformationIninitialState: ContactInformation = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
};

type Error = {
    isActive: boolean;
    message: string;
}

const LemonadeStand = () => {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [lineItems, setLineItem] = useState<Array<LineItem>>([]);
    const [contactInformation, setcontactInformation] = useState<ContactInformation>(contactInformationIninitialState);
    const [error, setErrors] = useState<Error>({} as Error);
    const [formhandler, setFormHandler] = useState<FormHandler>(formHandlerIninitialState);
    const steps = ['Place Order', 'Customer Information', 'Review Order'];
    const setFormhasLoadedTrue = () => {
        formhandler.formHasLoaded = true;
        setFormHandler(formhandler);
    };

    const setFormhasLoadedFalse = () => {
        formhandler.formHasLoaded = false;
        setFormHandler(formhandler);
    };

    const handleClose = () => {
        setOpen(false);
        handleForcingerrorsonFields();
    };

    const comps = [
        React.createElement(Product, { lineItems, setLineItem, error, setErrors }),
        React.createElement(Contact,
            {
                contactInformation,
                setcontactInformation,
                formhandler,
                setFormHandler,
                setFormhasLoadedTrue,
                setFormhasLoadedFalse,
                activeStep,
            }),
        React.createElement(Review)
    ];

    const handleCheckinglineItem = () => {
        return lineItems.filter((item, index) => {
            return item.quantity > 0;
        }).length === 0;
    }

    const handleCheckingcontactInformationononIsTouched = () => {
        const contactInformationkeys = Object.keys(contactInformation as ContactInformation);
        return formhandler?.formHandlerfields?.filter((item, index) => {
            return (item.isTouched === true
                && !contactInformation[contactInformationkeys[index]]);
        }).length > 0;
    }

    const handleCheckingcontactInformation = () => {
        const contactInformationkeys = Object.keys(contactInformation as ContactInformation);
        return formhandler?.formHandlerfields?.filter((item, index) => {
            return (item.isTouched === false && !contactInformation[contactInformationkeys[index]]);
        }).length > 0;
    }

    const handleForcingerrorsonFields = () => {
        var copyFormhandler = { ...formhandler };
        Object.keys(contactInformation as ContactInformation).map((item, index) => {
            if (!contactInformation[item]) {
                copyFormhandler.formHandlerfields[index].isTouched = true;
            }
        });

        setFormHandler(copyFormhandler);
    }

    const handleNext = () => {
        console.log(lineItems);
        console.log(contactInformation);
        console.log(formhandler);

        if (handleCheckinglineItem()) {
            setErrors({
                ...error,
                isActive: true,
                message: 'Please enter a quantity to proceed.'
            });
            setOpen(true);
            return;
        } else if (formhandler?.formHasLoaded && handleCheckingcontactInformationononIsTouched()) {
            setErrors({
                ...error,
                isActive: true,
                message: 'Please enter the required contact information.'
            });

            setOpen(true);
            return;
        } else if (formhandler?.formHasLoaded && handleCheckingcontactInformation()) {
            setErrors({
                ...error,
                isActive: true,
                message: 'Please enter the required contact information.'
            });

            setOpen(true);
            return;
        } else {
            setErrors({
                ...error,
                isActive: false,
                message: ''
            });
        };

        if (activeStep === steps.length - 1) {
            //Todo send data to server
            //reroute user to confirmation page
            return;
        };
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        const lastActiveStep = activeStep;
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setErrors({
            ...error,
            isActive: false,
            message: ''
        });

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
                        (error.isActive)
                            ?
                            <ErrorKnockOutModal
                                open={open}
                                setOpen={setOpen}
                                title='Error'
                                description={error.message}
                                handleClose={handleClose}
                            />
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

export default LemonadeStand;