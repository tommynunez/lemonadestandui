/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from 'graph/queries/getAllProducts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
	Grid2,
	TextField,
	FormControl,
	FormHelperText,
	Button,
	useTheme,
} from '@mui/material';
import { LineItem } from 'types/product/LineItem';
import { Product } from 'types/product/Product';
import { TFormFields } from 'types/TFormFields';
import { TFormAttribute } from 'types/FormAttributes';

const ProductCard = (props: any) => (
	<Grid2 my={2}>
		<Card sx={{ border: `1px solid ${props?.theme?.palette?.primary.main}` }}>
			<CardContent>
				<Typography color='text.secondary' gutterBottom>
					{props?.item?.lemonadeType?.name}
				</Typography>
				<Typography color='text.secondary' sx={{ mb: 1.5, ontSize: 14 }}>
					{props?.item?.size?.name}
				</Typography>
				<Typography color='text.secondary' variant='body2'>
					$ {props?.item?.amount}
				</Typography>
				<Typography color='text.secondary' variant='body2'>
					Total Cost: ${' '}
					{!props?.lineItems[props?.index]?.cost
						? '0.00'
						: props?.lineItems[props?.index]?.cost}
				</Typography>
			</CardContent>
			<CardActions>
				<FormControl
					sx={{ m: 1, width: '8em' }}
					color={props?.theme?.palette?.secondary.contrastText}>
					<TextField
						id={`lemonade-quantity-${props?.index}`}
						name={`lemonade-quantity-${props?.index}`}
						error={
							props?.formhandler?.forms[props.activeStep]?.formFields[
								props?.index
							]?.isTouched &&
							(props?.lineItems[props?.index]?.quantity === '0' ||
								!props?.lineItems[props?.index]?.quantity)
						}
						label='Quantity'
						type='number'
						InputProps={{
							inputProps: {
								min: 0,
								max: 25,
							},
						}}
						color='secondary'
						autoFocus={props?.index === 0}
						defaultValue={props?.lineItems[props?.index]?.quantity}
						onChange={(e: any) => {
							const value = parseInt(e.target.value);
							props?.handleSettingQuantity(value, props?.item, props?.index);
							props?.handleSettingFormhandlerFields(
								props?.formhandler,
								props?.setFormHandler,
								props?.activeStep,
								props?.index
							);
							const formsWithErrormessage = props?.formhandler?.forms[
								props?.activeStep
							]?.formFields.filter((item: TFormFields) => {
								return item.isTouched === true;
							});

							//only force all fields to clear error if erros exist in any field and if the vlaue is greater than 0
							if (value > 0 && formsWithErrormessage.length > 0) {
								props?.handleForcingIsTouchedonallFields(false);
							}
						}}
					/>
					{props?.lineItems &&
					(props.lineItems[props?.index]?.quantity === '0' ||
						!props.lineItems[props?.index]?.quantity) &&
					props?.formhandler?.forms[props?.activeStep]?.formFields[props?.index]
						?.isTouched ? (
						<FormHelperText id='component-helper-text' error>
							{props?.item?.lemonadeType.name} {props?.item?.size.name} is
							Required
						</FormHelperText>
					) : null}
				</FormControl>
			</CardActions>
		</Card>
	</Grid2>
);

const Products = (props: any) => {
	const { data, loading } = useQuery(GET_ALL_PRODUCTS);
	const theme = useTheme();

	useEffect(() => {
		if (!loading && data && data?.products?.length > 0) {
			const lineItemArr = [] as Array<LineItem>;
			const formFields = [] as Array<TFormFields>;
			data?.products?.map((item: Product, index: number) => {
				// set line item
				const lineItemObject = {} as LineItem;
				lineItemObject.cost = parseFloat(item?.amount!);
				lineItemObject.productId = item?.id!;
				lineItemObject.quantity = props?.lineItems[index]?.quantity as number;
				lineItemArr.push(lineItemObject);

				// set form fields
				const formField = {} as TFormFields;
				formField.formAttribute = {} as TFormAttribute;
				formField.formAttribute.id = 'product-' + item.id;
				formField.formAttribute.name = 'product-' + item.id;
				formField.formAttribute.label = 'Quantity';
				formField.isTouched = false;
				formFields.push(formField);
			});

			const productForm = { ...props.formhandler };
			productForm.forms[0].formFields = formFields;
			props.setFormHandler(productForm);

			props.setLineItem(lineItemArr);

			// set form fields for product dynamically so we can error handle correctly
		}
	});

	useEffect(() => {
		// set formhasLoaded to true on component mount
		props?.setFormhasLoadedTrue(props?.formhandler, props?.activeStep);

		// set formhasLoaded to false on component unmount
		// this implementation helps with controlling the
		// error handled to is only appears on the current
		// step in the stepper
		return () => {
			props?.setFormhasLoadedFalse(props?.formhandler, props?.activeStep);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSettingLineItem = (quantity: number, product: Product) => {
		const lineItemObject = {} as LineItem;

		const costAmount = parseFloat(product?.amount!) * quantity;
		lineItemObject.cost = costAmount;
		lineItemObject.productId = product?.id!;
		lineItemObject.quantity = quantity;
		return lineItemObject;
	};

	const handleSettingQuantity = (quantity: number, product: Product) => {
		let lineItemObject = {} as LineItem;
		const lineItem = props?.lineItems?.filter((item) => {
			return product.id === item?.productId;
		});

		lineItemObject = handleSettingLineItem(quantity, product);
		if (lineItem.length > 0) {
			// update specific line item
			const lineItemIndex = props?.lineItems?.findIndex(
				(x) => x.productId === product?.id
			);
			// eslint-disable-next-line no-unsafe-optional-chaining
			const lineItemsCopy = [...props?.lineItems];
			lineItemsCopy[lineItemIndex] = lineItemObject;
			props?.setLineItem(lineItemsCopy);
		} else {
			// add new line item
			props?.setLineItem((prevState) => [...prevState, lineItemObject]);
		}
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid2 container spacing={5} px={{ xs: 5, md: 10 }}>
					<Grid2 size={{ xs: 12, md: 8 }} px={{ xs: 5, md: 10 }}>
						{data?.products?.map((item, index) => (
							<ProductCard
								item={item}
								key={index}
								handleSettingQuantity={handleSettingQuantity}
								lineItems={props?.lineItems}
								index={index}
								formhandler={props.formhandler}
								activeStep={props?.activeStep}
								setFormHandler={props.setFormHandler}
								handleSettingFormhandlerFields={
									props?.handleSettingFormhandlerFields
								}
								handleForcingIsTouchedonallFields={
									props?.handleForcingIsTouchedonallFields
								}
								theme={theme}
							/>
						))}
					</Grid2>
					<Grid2 py={2} size={{ xs: 12, md: 4 }} px={{ xs: 5, md: 10 }}>
						<Card sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}>
							<Typography
								variant='h6'
								color={theme?.palette?.secondary?.main}
								py={{ xs: 5, md: 5 }}
								px={{ xs: 2 }}>
								Your total amount will be $
								{props?.lineItems && props?.lineItems.length > 0
									? props?.lineItems
											.map((_item: LineItem, index: number) => {
												const quantity = isNaN(
													props?.lineItems[index]?.quantity
												)
													? 0
													: props?.lineItems[index]?.quantity;
												const totalAmount =
													quantity * parseFloat(data?.products[index]?.amount);
												console.log('totalAmount', totalAmount);
												return totalAmount;
											})
											.reduce((acc, value) => acc + value)
											.toFixed(2)
									: '$ 0.00'}{' '}
							</Typography>
							<CardActions>
								<Button
									variant='contained'
									color='primary'
									onClick={props?.handleNext}>
									Order Now
								</Button>
							</CardActions>
						</Card>
					</Grid2>
				</Grid2>
			</Box>
		</>
	);
};

export default Products;
