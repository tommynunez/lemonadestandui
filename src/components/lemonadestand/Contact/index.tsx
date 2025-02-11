import {
	Box,
	FormControl,
	FormHelperText,
	Grid2,
	TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { TFormFields } from 'src/types/TFormFields';

const Contact = (props: any) => {
	const emailRegex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const phoneNumberRegex =
		/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
	const lettersOnlyRegex = /^[A-Za-z]+$/;

	useEffect(() => {
		//set formhasLoaded to true on component mount
		props?.setFormhasLoadedTrue(props?.formhandler, props?.activeStep);

		//set formhasLoaded to false on component unmount
		//this implementation helps with controlling the
		//error handled to is only appears on the current
		//step in the stepper
		return () => {
			props?.setFormhasLoadedFalse(props?.formhandler, props?.activeStep);
		};
	}, []);

	/*const handleErrors = (formField) => {
        switch (formField) {
            case 'firstName':
                break;
            default:
                break;
        }
    }*/

	return (
		<>
			<Box sx={{ flexGrow: 1, my: 10 }}>
				<Grid2 container spacing={5} px={{ xs: 5, md: 10 }}>
					{props?.formhandler?.forms[props.activeStep]?.formFields?.map(
						(item: TFormFields, index) => (
							<Grid2 key={index}>
								<FormControl fullWidth sx={{ m: 1 }}>
									<TextField
										autoFocus={index === 1}
										error={
											(props?.formhandler?.forms[props?.activeStep]?.formFields[
												index
											]?.isTouched &&
												!props?.contactInformation[item.formAttribute.name]) ||
											(item.formAttribute.name === 'email' &&
												props?.contactInformation[item.formAttribute.name] &&
												!emailRegex.test(
													props?.contactInformation[item?.formAttribute?.name]
												)) ||
											(item.formAttribute.name === 'phone' &&
												props?.contactInformation[item.formAttribute.name] &&
												!phoneNumberRegex.test(
													props?.contactInformation[item?.formAttribute?.name]
												))
										}
										required
										id={item?.formAttribute?.id}
										label={item?.formAttribute?.label}
										name={item?.formAttribute?.name}
										onChange={(e) => {
											if (
												item?.formAttribute?.name === 'phone' &&
												!lettersOnlyRegex.test(e.target.value)
											) {
												props?.setcontactInformation({
													...props?.contactInformation,
													[e.target.name]: e.target.value,
												});
											}

											if (item?.formAttribute?.name !== 'phone') {
												props?.setcontactInformation({
													...props?.contactInformation,
													[e.target.name]: e.target.value,
												});
											}
											props?.handleSettingFormhandlerFields(
												props?.formhandler,
												props?.setFormHandler,
												props?.activeStep,
												index
											);
										}}
										color='secondary'
										defaultValue={
											props?.contactInformation[item.formAttribute.name]
										}
									/>
									{props?.contactInformation &&
									!props?.contactInformation[item?.formAttribute?.name] &&
									props?.formhandler?.forms[props?.activeStep]?.formFields[
										index
									]?.isTouched ? (
										<FormHelperText id='component-helper-text' error>
											{item?.formAttribute?.label} is Required
										</FormHelperText>
									) : null}
									{item.formAttribute.name === 'email' &&
									props?.contactInformation &&
									props?.contactInformation[item?.formAttribute?.name] &&
									!emailRegex.test(
										props?.contactInformation[item?.formAttribute?.name]
									) &&
									props?.formhandler?.forms[props?.activeStep]?.formFields[
										index
									]?.isTouched ? (
										<FormHelperText id='component-helper-text' error>
											Please enter a proper email
										</FormHelperText>
									) : null}
									{item.formAttribute.name === 'phone' &&
									props?.contactInformation &&
									props?.contactInformation[item?.formAttribute?.name] &&
									!phoneNumberRegex.test(
										props?.contactInformation[item?.formAttribute?.name]
									) &&
									props?.formhandler?.forms[props?.activeStep]?.formFields[
										index
									]?.isTouched ? (
										<FormHelperText id='component-helper-text' error>
											Please enter a proper phone number xxx xxx-xxxx
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid2>
						)
					)}
				</Grid2>
			</Box>
		</>
	);
};

export default Contact;
