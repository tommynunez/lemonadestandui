import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledComponents, StyledLanding } from './index.styles';
import Product from './Product';
import Review from './Review';
import StepperFooter from '../shared/Layout/StepperLayout/Footer';
import StepperHeader from '../shared/Layout/StepperLayout/Header';
import Contact from './Contact';
import ErrorKnockOutModal from '../shared/Modal';
import { ContactInformation } from 'types/contact/ContactInformation';
import { LineItem } from 'types/product/LineItem';
import { ErrorHandler } from 'types/Error';
import { FormHandler } from 'types/FormHandler';
import { TForm } from 'types/TForm';
import { useState } from 'react';
import { ADD_ORDER } from 'graph/mutations/addOrder';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { TFormFields } from 'types/TFormFields';

const emailRegex =
	// eslint-disable-next-line no-useless-escape
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneNumberRegex =
	// eslint-disable-next-line no-useless-escape
	/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;

const formsInitialstate: Array<TForm> = [
	{
		name: 'product',
		formHasLoaded: false,
		formFields: [],
	},
	{
		name: 'contact',
		formHasLoaded: false,
		formFields: [
			{
				formAttribute: {
					id: 'firstName',
					name: 'firstName',
					label: 'First Name',
				},
				isTouched: false,
			},
			{
				formAttribute: {
					id: 'lastName',
					name: 'lastName',
					label: 'Last Name',
				},
				isTouched: false,
			},
			{
				formAttribute: {
					id: 'email',
					name: 'email',
					label: 'Email',
				},
				isTouched: false,
			},
			{
				formAttribute: {
					id: 'phone',
					name: 'phone',
					label: 'Phone',
				},
				isTouched: false,
			},
		],
	},
];

const formhandlerIninitialState: FormHandler = {
	isDirty: false,
	forms: formsInitialstate,
};

const contactInformationIninitialState: ContactInformation = {
	firstName: undefined,
	lastName: undefined,
	email: undefined,
	phone: undefined,
};

const LemonadeStand = () => {
	//modal state
	const [open, setOpen] = React.useState(false);
	//stepper state
	const [activeStep, setActiveStep] = React.useState<number>(0);
	const steps = ['Place Order', 'Customer Information', 'Review Order'];
	//product step state
	const [lineItems, setLineItem] = useState<Array<LineItem>>([]);
	//contact step state
	const [contactInformation, setcontactInformation] =
		useState<ContactInformation>(contactInformationIninitialState);

	//Form handler state
	const [error, setErrors] = useState<ErrorHandler>({} as ErrorHandler);
	const [formhandler, setFormHandler] = useState<FormHandler>(
		formhandlerIninitialState
	);

	const [addOrder] = useMutation(ADD_ORDER);
	const navigate = useNavigate();

	const setFormhasLoadedTrue = (formhandler: any, formIndex: number) => {
		formhandler.forms[formIndex].formHasLoaded = true;
		setFormHandler(formhandler);
	};

	const setFormhasLoadedFalse = (formhandler: any, formIndex: number) => {
		formhandler.forms[formIndex].formHasLoaded = false;
		setFormHandler(formhandler);
	};

	const handleClose = () => {
		setOpen(false);
		handleForcingIsTouchedonallFields(true);
	};

	const handleSettingFormhandlerFields = (
		formhandler: FormHandler,
		setFormHandler: any,
		activeStep: number,
		index: number
	) => {
		formhandler.isDirty = true;
		const form = formhandler?.forms[activeStep];
		const fields = form?.formFields;
		fields[index].isTouched = true;
		form.formFields = fields;
		setFormHandler(formhandler);
	};

	const handleForcingIsTouchedonallFields = (value: boolean) => {
		const formFields = [] as Array<TFormFields>;
		formhandler.forms[activeStep].formFields.map((item: TFormFields, index) => {
			if (
				activeStep === 0 &&
				(!lineItems[index]?.quantity || lineItems[index]?.quantity === 0)
			) {
				item.isTouched = value;
				formFields.push(item);
			}

			if (activeStep === 1 && !contactInformation[index]) {
				item.isTouched = value;
				formFields.push(item);
			}
		});

		const productForm = { ...formhandler };
		productForm.forms[activeStep].formFields = formFields;
		setFormHandler(productForm);
	};

	const handleCheckinglineItem = () => {
		return (
			lineItems.filter((item) => {
				return item.quantity > 0;
			}).length === 0
		);
	};

	const handleValidatingcontactInformation = () => {
		const contactInformationkeys = Object.keys(
			contactInformation as ContactInformation
		);
		return (
			formhandler?.forms[activeStep]?.formFields?.filter((_item, index) => {
				return (
					!contactInformation[contactInformationkeys[index]] ||
					(contactInformationkeys[index] === 'email' &&
						!emailRegex.test(
							contactInformation[contactInformationkeys[index]]!
						)) ||
					(contactInformationkeys[index] === 'phone' &&
						!phoneNumberRegex.test(
							contactInformation[contactInformationkeys[index]]!
						))
				);
			}).length > 0
		);
	};

	const handleNext = () => {
		const form = formhandler?.forms[activeStep];

		if (activeStep === 0 && form.formHasLoaded && handleCheckinglineItem()) {
			setErrors({
				...error,
				isActive: true,
				message: 'Please enter a quantity to proceed.',
			});
			setOpen(true);
			return;
		} else if (
			activeStep === 1 &&
			form.formHasLoaded &&
			handleValidatingcontactInformation()
		) {
			setErrors({
				...error,
				isActive: true,
				message:
					'Please enter a value for the required fields in the correct format.',
			});

			setOpen(true);
			return;
		} else {
			setErrors({
				...error,
				isActive: false,
				message: '',
			});
		}

		if (activeStep === steps.length - 1) {
			const filteredLineitems = lineItems.filter((item: LineItem) => {
				return item.quantity && item.quantity > 0;
			});
			//Todo send data to server
			//reroute user to confirmation page

			const totalCost = filteredLineitems
				.map((item: LineItem, index: number) => {
					const quantity = isNaN(filteredLineitems[index]?.quantity)
						? 0
						: filteredLineitems[index]?.quantity;
					const totalAmount = quantity * item.cost;
					return totalAmount;
				})
				.reduce((acc, value) => acc + value)
				.toFixed(2);
			addOrder({
				variables: {
					order: {
						firstName: contactInformation.firstName,
						lastName: contactInformation.lastName,
						email: contactInformation.email,
						phone: contactInformation.phone,
						totalCost: parseFloat(totalCost),
						lineItems: filteredLineitems,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.insertOrder) {
						navigate(`/storefront/confirmation/${response?.data?.insertOrder}`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setErrors({
			...error,
			isActive: false,
			message: '',
		});
	};

	/*const handleReset = () => {
		setActiveStep(0);
	};*/

	const comps = [
		React.createElement(Product, {
			form: 'product',
			activeStep,
			lineItems,
			setLineItem,
			formhandler,
			setFormHandler,
			setFormhasLoadedTrue,
			setFormhasLoadedFalse,
			handleSettingFormhandlerFields,
			handleForcingIsTouchedonallFields,
			handleNext,
		}),
		React.createElement(Contact, {
			form: 'contact',
			activeStep,
			contactInformation,
			setcontactInformation,
			formhandler,
			setFormHandler,
			setFormhasLoadedTrue,
			setFormhasLoadedFalse,
			handleSettingFormhandlerFields,
		}),
		React.createElement(Review, {
			contactInformation,
			lineItems,
		}),
	];

	return (
		<StyledLanding>
			<Box sx={{ width: '100%' }}>
				<>
					<StepperHeader steps={steps} activeStep={activeStep} />
					{error.isActive ? (
						<ErrorKnockOutModal
							open={open}
							setOpen={setOpen}
							title='Error'
							description={error.message}
							handleClose={handleClose}
						/>
					) : null}
					{comps.map((item, index) => {
						if (index === activeStep) {
							return <StyledComponents key={index}>{item}</StyledComponents>;
						}
					})}
					<StepperFooter
						steps={steps}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
					/>
				</>
			</Box>
		</StyledLanding>
	);
};

export default LemonadeStand;
