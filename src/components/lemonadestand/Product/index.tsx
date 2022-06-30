import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/getAllProducts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Container, TextField } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const ProductCard = (props: any) => (
    <Grid item md={6} sx={{ mt: 3 }}>
        <Card sx={{ border: ` ${(props.item.lemonadeType.name === "Regular Lemonade") ? "1px solid yellow" : "1px solid pink"}` }}>
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
            </CardContent>
            <CardActions>
                <TextField
                    id="lemonade-quantity"
                    label="Quantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </CardActions>
        </Card>
    </Grid>
);

const Product = () => {
    const { data, loading } = useQuery(GET_ALL_PRODUCTS);
    const [lineItems, setLineItem] = useState([] as any);

    handleSettingQuantity = (product: any) => {
        setProduct({ ...})
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5} px={10}>
                    {
                        data?.products?.map((item, index) => (
                            <ProductCard item={item} key={index} />
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Product;