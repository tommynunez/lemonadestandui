import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/getAllProducts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField, FormControl } from '@mui/material';

type LineItem = {
    productId: number,
    quantity: number,
    cost: string,
};

type Size = {
    id: number,
    name: string,
};

type LemonadeType = {
    id: number,
    name: string,
};

type Product = {
    id: number,
    size: Size,
    lemonadeType: LemonadeType,
    amount: string,
};

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
                        id="lemonade-quantity"
                        label="Quantity"
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 0, max: 25
                            }
                        }}
                        autoFocus={props?.index === 0}
                        defaultValue={props?.lineItems[props?.index]?.quantity}
                        onChange={(e: any) => { props?.handleSettingQuantity(e.target.value, props?.item) }}
                    />
                </FormControl>
            </CardActions>
        </Card>
    </Grid>
);

const Product = (props: any) => {
    const { data, loading } = useQuery(GET_ALL_PRODUCTS);

    useEffect(() => {
        if (!loading && data && data?.products?.length > 0) {
            let lineItemArr = [] as Array<LineItem>;
            data?.products?.map((item: Product, index: number) => {
                let lineItemObject = {} as LineItem;
                lineItemObject.cost = item?.amount;
                lineItemObject.productId = item?.id;
                lineItemObject.quantity = 0;
                lineItemArr.push(lineItemObject);
            });

            props.setLineItem(lineItemArr);
        }
    }, [loading]);

    const handleSettingLineItem = (quantity: number, product: Product) => {
        let lineItemObject = {} as LineItem;

        const costAmount = parseFloat(product.amount) * quantity;
        lineItemObject.cost = costAmount.toString();
        lineItemObject.productId = product.id;
        lineItemObject.quantity = quantity;
        return lineItemObject;
    }

    const handleSettingQuantity = (quantity: number, product: Product) => {
        let lineItemObject = {} as LineItem;
        const lineItem = props?.lineItems?.filter((item, index) => {
            return product.id === item?.productId;
        });

        lineItemObject = handleSettingLineItem(quantity, product);
        if (lineItem.length > 0) {
            console.log('rrr', props?.lineItems);

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

        if (lineItemObject.quantity > 0) {
            props?.setHasErrors(false);
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
                            />
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Product;