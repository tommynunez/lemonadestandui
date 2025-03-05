import { useLazyQuery, useMutation } from '@apollo/client';
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid2,
	Skeleton,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADD_LEMONADE_TYPE } from 'graph/mutations/addLemonadetype';
import { UPDATE_LEMONADE_TYPE } from 'graph/mutations/updateLemonadeType';
import { GET_LEMONADE_TYPE_ID } from 'graph/queries/getLemonadeTypeById';
import { LemonadeType } from 'types/product/LemonadeType';
import { TForm } from 'types/TForm';
import { TFormFields } from 'types/TFormFields';

const formsInitialstate: TForm = {
	name: 'lemonade type',
	formHasLoaded: false,
	formFields: [
		{
			formAttribute: {
				id: 'name',
				name: 'name',
				label: 'Name',
			},
			isTouched: false,
		},
	],
};

const LemonadeTypeDetail = () => {
	const [lemonadeType, setLemonadeType] = useState<LemonadeType>(
		{} as LemonadeType
	);
	const [lemonadeTypeform, setLemonadeTypeform] =
		useState<TForm>(formsInitialstate);
	const { id } = useParams();
	const [getLemonadetype, { loading }] = useLazyQuery(GET_LEMONADE_TYPE_ID);
	const [addLemonadeType] = useMutation(ADD_LEMONADE_TYPE);
	const [updateLemonadeType] = useMutation(UPDATE_LEMONADE_TYPE);
	const [doesRecordExist, setDoesRecordExist] = useState(false);

	useEffect(() => {
		if (id && parseInt(id) > 0 && !loading) {
			getLemonadetype({
				variables: {
					id: parseInt(id!),
				},
			})
				.then((response) => {
					if (
						!response?.data?.retrieveLemonadeTypeById?.id &&
						!response?.data?.retrieveLemonadeTypeById?.name
					) {
						setDoesRecordExist(true);
					}
					setLemonadeType(response?.data?.retrieveLemonadeTypeById);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id]);

	const handleSettingFormhandlerFields = (
		index: number,
		lemonadeTypeformField: TFormFields
	) => {
		const form = { ...lemonadeTypeform };
		lemonadeTypeformField.isTouched = true;
		form.formFields[index] = lemonadeTypeformField;
		setLemonadeTypeform(form);
	};

	const handleSubmittionValidation = (): boolean => {
		let hasErrors = false;
		if (
			lemonadeTypeform?.formHasLoaded &&
			Object.keys(lemonadeType).length === 0
		) {
			lemonadeTypeform?.formFields?.map((item, index) => {
				handleSettingFormhandlerFields(index, item);
			});
			hasErrors = true;
		} else {
			lemonadeTypeform?.formFields?.map((item, index) => {
				if (!lemonadeType[item?.formAttribute?.name]!) {
					handleSettingFormhandlerFields(index, item);
					hasErrors = true;
				}
			});
		}
		return hasErrors;
	};

	const handleSubmit = () => {
		const hasErrors = handleSubmittionValidation();
		if ((parseInt(id!) === 0 || !lemonadeType) && !hasErrors) {
			addLemonadeType({
				variables: {
					lemonadeType: {
						id: 0,
						name: lemonadeType?.name,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.insertLemonadeType) {
						window.location.href = '/management/lemonadeType';
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}

		if (parseInt(id!) > 0 && lemonadeType && !hasErrors) {
			updateLemonadeType({
				variables: {
					id: parseInt(id!),
					lemonadeType: {
						id: parseInt(id!),
						name: lemonadeType?.name,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.updateLemonadeType) {
						window.location.href = '/management/lemonadeType';
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<>
			{
				<Box sx={{ flexGrow: 1, my: 3 }}>
					<Grid2 container spacing={5} px={5}>
						<Grid2>
							<Typography variant='h4'>Lemonade Type Detail</Typography>
							<Grid2>
								<Typography variant='subtitle1'>
									Create a new or update an existing lemonade type. Lemonade
									Types along with sizes correlate to a product. A product will
									demonstrate what a customer can order.
								</Typography>
								{doesRecordExist ? (
									<Typography variant='subtitle2' sx={{ color: '#FF0000' }}>
										The record you are searching for does not exist, please
										enter a new record or click back to see all lemonade types.
									</Typography>
								) : (
									<></>
								)}
							</Grid2>
						</Grid2>
						{!loading && lemonadeType ? (
							lemonadeTypeform.formFields?.map(
								(item: TFormFields, index: number) => (
									<Grid2 size={{ xs: 12, md: 8 }} key={index}>
										<FormControl fullWidth sx={{ my: 1 }}>
											<TextField
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														handleSubmit();
													}
												}}
												required
												id={item?.formAttribute?.id}
												autoFocus={index === 0}
												name={item?.formAttribute?.name}
												label={item?.formAttribute?.label}
												value={
													lemonadeType![item?.formAttribute?.name]
														? lemonadeType![item?.formAttribute?.name]
														: ''
												}
												onChange={(e) => {
													const value = e.target.value;
													const lt = { ...lemonadeType };
													lt.name = value;
													setLemonadeType(lt);
													handleSettingFormhandlerFields(index, item);
												}}
												error={
													item?.isTouched &&
													!lemonadeType[item?.formAttribute?.name]!
												}
											/>
										</FormControl>
										{item?.isTouched &&
										!lemonadeType[item?.formAttribute?.name] ? (
											<FormHelperText id='component-helper-text' error>
												{item?.formAttribute?.label} is Required
											</FormHelperText>
										) : null}
									</Grid2>
								)
							)
						) : (
							<Grid2>
								<Box sx={{ width: 500 }}>
									<Skeleton />
									<Skeleton animation='wave' />
									<Skeleton animation={false} />
								</Box>
							</Grid2>
						)}
					</Grid2>
					<Grid2 container spacing={5} px={5} py={5}>
						<Grid2 size={{ xs: 12, md: 4 }}>
							<Button variant='contained' onClick={() => handleSubmit()}>
								Submit
							</Button>{' '}
							<Button
								variant='contained'
								color='secondary'
								onClick={() =>
									(window.location.href = '/management/lemonadetype/')
								}>
								Go Back
							</Button>
						</Grid2>
					</Grid2>
				</Box>
			}
		</>
	);
};

export default LemonadeTypeDetail;
