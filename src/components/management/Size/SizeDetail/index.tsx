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
import { UPDATE_SIZE } from 'graph/mutations/updateSize';
import { GET_SIZE_ID } from 'graph/queries/getSizeById';
import { Size } from 'types/product/Size';
import { TForm } from 'types/TForm';
import { TFormFields } from 'types/TFormFields';
import { ADD_SIZE } from 'graph/mutations/addSize';

const formsInitialstate: TForm = {
	name: 'Size',
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

const SizeDetail = () => {
	const [size, setSize] = useState<Size>({} as Size);
	const [sizeform, setSizeform] = useState<TForm>(formsInitialstate);
	const { id } = useParams();
	const [getSizebyID, { loading }] = useLazyQuery(GET_SIZE_ID);
	const [addSize] = useMutation(ADD_SIZE);
	const [updateSize] = useMutation(UPDATE_SIZE);
	const [doesRecordExist, setDoesRecordExist] = useState(false);

	useEffect(() => {
		if (id && parseInt(id) > 0 && !loading) {
			getSizebyID({
				variables: {
					id: parseInt(id!),
				},
			})
				.then((response) => {
					if (
						!response?.data?.retrieveSizeTypeById?.id &&
						!response?.data?.retrieveSizeTypeById?.name
					) {
						setDoesRecordExist(true);
					}
					setSize(response?.data?.retrieveSizeTypeById);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id]);

	const handleSettingFormhandlerFields = (
		index: number,
		sizeFormfield: TFormFields
	) => {
		const form = { ...sizeform };
		sizeFormfield.isTouched = true;
		form.formFields[index] = sizeFormfield;
		setSizeform(form);
	};

	const handleSubmittionValidation = (): boolean => {
		let hasErrors = false;
		if (sizeform?.formHasLoaded && Object.keys(size).length === 0) {
			sizeform?.formFields?.map((item, index) => {
				handleSettingFormhandlerFields(index, item);
			});
			hasErrors = true;
		} else {
			sizeform?.formFields?.map((item, index) => {
				if (!size[item?.formAttribute?.name]!) {
					handleSettingFormhandlerFields(index, item);
					hasErrors = true;
				}
			});
		}
		return hasErrors;
	};

	const handleSubmit = () => {
		const hasErrors = handleSubmittionValidation();
		if ((parseInt(id!) === 0 || !size) && !hasErrors) {
			addSize({
				variables: {
					size: {
						id: 0,
						name: size?.name,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.insertSize) {
						window.location.href = '/management/size';
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}

		if (parseInt(id!) > 0 && size && !hasErrors) {
			updateSize({
				variables: {
					id: parseInt(id!),
					size: {
						id: parseInt(id!),
						name: size?.name,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.updateSize) {
						window.location.href = '/management/size';
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
							<Typography variant='h4'>Size Detail</Typography>
							<Grid2>
								<Typography variant='subtitle1'>
									Create a new or update an existing size. Sizes along with
									lemoande types correlate to a product. A product will
									demonstrate what a customer can order.
								</Typography>
								{doesRecordExist ? (
									<Typography variant='subtitle2' sx={{ color: '#FF0000' }}>
										The record you are searching for does not exist, please
										enter a new record or click back to see all sizes.
									</Typography>
								) : (
									<></>
								)}
							</Grid2>
						</Grid2>
						{!loading && size ? (
							sizeform.formFields?.map((item: TFormFields, index: number) => (
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
												size![item?.formAttribute?.name]
													? size![item?.formAttribute?.name]
													: ''
											}
											onChange={(e) => {
												const value = e.target.value;
												const sz = { ...size };
												sz.name = value;
												setSize(sz);
												handleSettingFormhandlerFields(index, item);
											}}
											error={
												item?.isTouched && !size[item?.formAttribute?.name]!
											}
										/>
									</FormControl>
									{item?.isTouched && !size[item?.formAttribute?.name] ? (
										<FormHelperText id='component-helper-text' error>
											{item?.formAttribute?.label} is Required
										</FormHelperText>
									) : null}
								</Grid2>
							))
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
								onClick={() => (window.location.href = '/management/size/')}>
								Go Back
							</Button>
						</Grid2>
					</Grid2>
				</Box>
			}
		</>
	);
};

export default SizeDetail;
