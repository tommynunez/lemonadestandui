/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADD_PRODUCT } from 'graph/mutations/addProduct';
import { UPDATE_PRODUCT } from 'graph/mutations/updateProduct';
import { GET_ALL_LEMONADE_TYPES } from 'graph/queries/getAllLemonadeTypes';
import { GET_ALL_SIZES } from 'graph/queries/getAllSizes';
import { GET_PRODUCT_BY_ID } from 'graph/queries/getProductById';
import { Product } from 'types/product/Product';
import { ProductMutationType } from 'types/product/ProductMutationType';
import { TForm } from 'types/TForm';
import { TFormFields } from 'types/TFormFields';

const formsInitialstate: TForm = {
	name: 'product',
	formHasLoaded: false,
	formFields: [
		{
			formAttribute: {
				id: 'amount',
				name: 'amount',
				label: 'Amount',
				type: 'number',
			},
			isTouched: false,
		},
		{
			formAttribute: {
				id: 'size',
				name: 'size',
				label: 'Size',
				type: 'select',
			},
			isTouched: false,
		},
		{
			formAttribute: {
				id: 'lemonadeType',
				name: 'lemonadeType',
				label: 'Lemonade Type',
				type: 'select',
			},
			isTouched: false,
		},
	],
};

const ProductManagementDetails = () => {
	const [product, setProduct] = useState<Product>({} as Product);
	const [productMutation] = useState<ProductMutationType>(
		{} as ProductMutationType
	);
	const [productform, setproductform] = useState<TForm>(formsInitialstate);
	const { id } = useParams();
	const [getProductsById, { loading }] = useLazyQuery(GET_PRODUCT_BY_ID);
	const { data: lemonadeTypedata, loading: loadingLemonadeTypes } = useQuery(
		GET_ALL_LEMONADE_TYPES
	);
	const { data: sizeData, loading: loadingSizes } = useQuery(GET_ALL_SIZES);
	const [addProduct] = useMutation(ADD_PRODUCT);
	const [updateProduct] = useMutation(UPDATE_PRODUCT);
	const [doesRecordExist, setDoesRecordExist] = useState(false);

	useEffect(() => {
		if (id && parseInt(id) > 0 && !loading) {
			getProductsById({
				variables: {
					id: parseInt(id!),
				},
			})
				.then((response) => {
					if (
						!response?.data?.retrieveProductById?.id &&
						!response?.data?.retrieveProductById?.name
					) {
						setDoesRecordExist(true);
					}
					setProduct(response?.data?.retrieveProductById);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setproductform({ ...productform, formHasLoaded: true });
	}, [id]);

	const handleSettingFormhandlerFields = (
		index: number,
		productFormfield: TFormFields
	) => {
		const form = { ...productform };
		productFormfield.isTouched = true;
		form.formFields[index] = productFormfield;
		setproductform(form);
	};

	const handleSubmittionValidation = (): boolean => {
		let hasErrors = false;
		if (productform?.formHasLoaded && Object.keys(product).length === 0) {
			productform?.formFields?.map((item, index) => {
				handleSettingFormhandlerFields(index, item);
			});
			hasErrors = true;
		} else {
			productform?.formFields?.map((item, index) => {
				if (!product[item?.formAttribute?.name]!) {
					handleSettingFormhandlerFields(index, item);
					hasErrors = true;
				}
				if (product[item?.formAttribute?.name]! === '0') {
					handleSettingFormhandlerFields(index, item);
					hasErrors = true;
				}
			});
		}
		return hasErrors;
	};

	const handleSubmit = () => {
		const hasErrors = handleSubmittionValidation();

		if ((parseInt(id!) === 0 || !productMutation) && !hasErrors) {
			addProduct({
				variables: {
					product: {
						id: 0,
						amount: parseFloat(product?.amount!),
						sizeId: product?.size?.id!,
						lemonadeTypeId: product?.lemonadeType?.id!,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.insertProduct) {
						window.location.href = '/management/product';
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}

		if ((parseInt(id!) > 0 || productMutation) && !hasErrors) {
			updateProduct({
				variables: {
					id: parseInt(id!),
					product: {
						id: parseInt(id!),
						amount: parseFloat(product?.amount!),
						sizeId: product?.size?.id!,
						lemonadeTypeId: product?.lemonadeType?.id!,
					},
				},
			})
				.then((response) => {
					console.log(response);
					if (response?.data?.updateProduct) {
						window.location.href = '/management/product';
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleDisplaySelectData = (item: TFormFields) => {
		if (item?.formAttribute?.name === 'size') {
			return sizeData?.retrieveAllSizes?.map((item, index) => (
				<MenuItem key={index} value={item?.id}>
					{item?.name}
				</MenuItem>
			));
		}

		if (item.formAttribute.name === 'lemonadeType') {
			return lemonadeTypedata?.retrieveAllLemonadeTypes?.map((item, index) => (
				<MenuItem key={index} value={item?.id}>
					{item?.name}
				</MenuItem>
			));
		}
	};

	return (
		<>
			{
				<Box sx={{ flexGrow: 1, my: 3 }}>
					<Grid2 container spacing={5} px={5}>
						<Grid2>
							<Typography variant='h4'>Product Detail</Typography>
							<Grid2>
								<Typography variant='subtitle1'>
									Create a new or update an existing product. Products contain a
									lemonade type along with a size. Product information changes
									will automatically display on the store front when created or
									updated.
								</Typography>
								{doesRecordExist ? (
									<Typography variant='subtitle2' sx={{ color: '#FF0000' }}>
										The record you are searching for does not exist, please
										enter a new record or click back to see all products.
									</Typography>
								) : (
									<></>
								)}
							</Grid2>
						</Grid2>
						{!loading && !loadingLemonadeTypes && !loadingSizes && product ? (
							productform.formFields?.map(
								(item: TFormFields, index: number) => (
									<Grid2 size={{ xs: 12, md: 8 }} key={index}>
										<FormControl fullWidth sx={{ my: 1 }}>
											{item.formAttribute.type === 'number' ? (
												<TextField
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															handleSubmit();
														}
													}}
													type={item?.formAttribute?.type}
													required
													id={item?.formAttribute?.id}
													autoFocus={index === 0}
													name={item?.formAttribute?.name}
													label={item?.formAttribute?.label}
													value={product![item?.formAttribute?.name]}
													InputProps={{
														inputProps: {
															min: 0,
															max: 25,
														},
													}}
													error={
														item?.isTouched &&
														(product?.amount === '0' || !product?.amount)
													}
													onChange={(e) => {
														const re = /^-?\d+(\.\d{1,2})?$/;
														const value = e.target.value;
														if (re.test(value) || !value) {
															const lt = { ...product };
															lt.amount = value;
															setProduct(lt);
															handleSettingFormhandlerFields(index, item);
														}
													}}
												/>
											) : (
												<>
													<InputLabel id={item?.formAttribute?.id}>
														{item?.formAttribute?.label}
													</InputLabel>
													<Select
														sx={{ minWidth: 130 }}
														labelId={item?.formAttribute?.label}
														id={item?.formAttribute?.id}
														value={
															product[item?.formAttribute.name]?.id
																? product[item?.formAttribute.name]?.id
																: ''
														}
														label={item.formAttribute.label}
														autoWidth
														error={
															item?.isTouched &&
															(product[item.formAttribute.name]! === 0 ||
																!product[item.formAttribute.name]!)
														}
														onChange={(e) => {
															const value = e.target.value;
															if (item?.formAttribute.name === 'size') {
																setProduct({
																	...product,
																	size: {
																		id: value,
																		name: sizeData?.retrieveAllSizes[value]
																			?.name,
																	},
																});
															} else if (
																item?.formAttribute.name === 'lemonadeType'
															) {
																setProduct({
																	...product,
																	lemonadeType: {
																		id: value,
																		name: lemonadeTypedata
																			?.retrieveAllLemonadeTypes[value]?.name,
																	},
																});
															}
															handleSettingFormhandlerFields(index, item);
														}}
														onClose={() => {
															handleSettingFormhandlerFields(index, item);
														}}>
														{handleDisplaySelectData(item)}
													</Select>
												</>
											)}
											{item?.isTouched &&
											(product[item?.formAttribute?.name]! === '0' ||
												!product[item?.formAttribute?.name]) ? (
												<FormHelperText id='component-helper-text' error>
													{item?.formAttribute?.label} is Required
												</FormHelperText>
											) : null}
										</FormControl>
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
						<Grid2>
							<Button variant='contained' onClick={() => handleSubmit()}>
								Submit
							</Button>{' '}
							<Button
								variant='contained'
								color='secondary'
								onClick={() => (window.location.href = '/management/product/')}>
								Go Back
							</Button>
						</Grid2>
					</Grid2>
				</Box>
			}
		</>
	);
};

export default ProductManagementDetails;
