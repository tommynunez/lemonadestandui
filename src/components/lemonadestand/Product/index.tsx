import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/getAllProducts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField, FormControl, FormHelperText } from '@mui/material';
import { LineItem } from '../../../types/product/LineItem';
import { Product } from '../../../types/product/Product';
import { TFormFields } from '../../../types/TFormFields';

const ProductCard = (props: any) => (
    <Grid item md={6} sx={{ mt: 3 }}>
        <Card sx={{ border: ` ${(props?.item?.lemonadeType?.name === "Regular Lemonade") ? "1px solid yellow" : "1px solid pink"}` }}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    {props?.item?.lemonadeType?.name}
                </Typography>
                <Typography sx={{ mb: 1.5, ontSize: 14 }} color="text.secondary">
                    {props?.item?.size?.name}
                </Typography>
                <Typography variant="body2">
                    $ {props?.item?.amount}
                </Typography>
                <Typography variant="body2">
                    Total Cost: $ {!props?.lineItems[props?.index]?.cost ? '0.00' : props?.lineItems[props?.index]?.cost}
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl sx={{ m: 1, width: '8em' }}>
                    <TextField
                        id={`lemonade-quantity-${props?.index}`}
                        name={`lemonade-quantity-${props?.index}`}
                        error={props?.formhandler?.forms[props.activeStep]?.formFields[props?.index]?.isTouched
                            && (props?.lineItems[props?.index]?.quantity === '0'
                                || !props?.lineItems[props?.index]?.quantity)}
                        label="Quantity"
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 0, max: 25
                            }
                        }}
                        autoFocus={props?.index === 0}
                        defaultValue={props?.lineItems[props?.index]?.quantity}
                        onChange={(e: any) => {
                            const value = parseInt(e.target.value);
                            props?.handleSettingQuantity(value, props?.item, props?.index);
                            props?.handleSettingFormhandlerFields(props?.formhandler, props?.setFormHandler, props?.activeStep, props?.index);
                            const formsWithErrormessage = props?.formhandler?.forms[props?.activeStep]?.formFields.filter((item: TFormFields, index) => {
                                return item.isTouched === true
                            });

                            //only force all fields to clear error if erros exist in any field and if the vlaue is greater than 0
                            if (value > 0 && formsWithErrormessage.length > 0) {
                                props?.handleForcingIsTouchedonallFields(false)
                            }
                        }}
                    />
                    {props?.lineItems
                        && (props.lineItems[props?.index]?.quantity === '0'
                            || !props.lineItems[props?.index]?.quantity)
                        && props?.formhandler?.forms[props?.activeStep]?.formFields[props?.index]?.isTouched
                        ?
                        <FormHelperText id="component-helper-text" error>
                            {props?.item?.lemonadeType.name} {props?.item?.size.name} is Required
                        </FormHelperText>
                        : null
                    }
                </FormControl>
            </CardActions>
        </Card>
    </Grid>
);

const Products = (props: any) => {
    const { data, loading } = useQuery(GET_ALL_PRODUCTS);

    useEffect(() => {
        if (!loading && data && data?.products?.length > 0) {
            let lineItemArr = [] as Array<LineItem>;
            data?.products?.map((item: Product, index: number) => {
                let lineItemObject = {} as LineItem;
                lineItemObject.cost = parseFloat(item?.amount);
                lineItemObject.productId = item?.id;
                lineItemObject.quantity = props?.lineItems[index]?.quantity as number;
                lineItemArr.push(lineItemObject);
            });

            props.setLineItem(lineItemArr);
        }
    }, [loading]);

    useEffect(() => {
        //set formhasLoaded to true on component mount
        props?.setFormhasLoadedTrue(props?.formhandler, props?.activeStep);

        //set formhasLoaded to false on component unmount
        //this implementation helps with controlling the 
        //error handled to is only appears on the current
        //step in the stepper
        return () => {
            props?.setFormhasLoadedFalse(props?.formhandler, props?.activeStep);
        }
    }, []);

    const handleSettingLineItem = (quantity: number, product: Product) => {
        let lineItemObject = {} as LineItem;

        const costAmount = parseFloat(product.amount) * quantity;
        lineItemObject.cost = costAmount;
        lineItemObject.productId = product.id;
        lineItemObject.quantity = quantity;
        return lineItemObject;
    }

    const handleSettingQuantity = (quantity: number, product: Product, index: number) => {
        let lineItemObject = {} as LineItem;
        const lineItem = props?.lineItems?.filter((item, index) => {
            return product.id === item?.productId;
        });

        lineItemObject = handleSettingLineItem(quantity, product);
        if (lineItem.length > 0) {
            //update specific line item
            const lineItemIndex = props?.lineItems?.findIndex(x => x.productId === product?.id);
            const lineItemsCopy = [...props?.lineItems];
            lineItemsCopy[lineItemIndex] = lineItemObject;
            props?.setLineItem(lineItemsCopy);
        } else {
            //add new line item
            props?.setLineItem(prevState => ([
                ...prevState, lineItemObject
            ]));
        }

    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5} px={10}>
                    {
                        data?.products?.map((item, index) => (
                            <ProductCard
                                item={item}
                                key={index}
                                handleSettingQuantity={handleSettingQuantity}
                                lineItems={props?.lineItems}
                                index={index}
                                formhandler={props.formhandler}
                                activeStep={props?.activeStep}
                                setFormHandler={props.setFormHandler}
                                handleSettingFormhandlerFields={props?.handleSettingFormhandlerFields}
                                handleForcingIsTouchedonallFields={props?.handleForcingIsTouchedonallFields}
                            />
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Products;