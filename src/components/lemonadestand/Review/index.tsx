import * as React from 'react';
import { LineItem } from '../../../types/product/LineItem';
import { ContactInformation } from '../../../types/contact/ContactInformation';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, withStyles } from '@mui/material';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/getAllProducts';
import { useQuery } from '@apollo/client';
import { Product } from '../../../types/product/Product';

type ReviewProps = {
    lineItems: Array<LineItem>;
    contactInformation: ContactInformation;
}

const Review = (props: ReviewProps) => {
    const { data, loading } = useQuery(GET_ALL_PRODUCTS);
    const theme = useTheme();

    return (
        <Container maxWidth="md" disableGutters={true}>
            <h2 style={{ textAlign: "center" }}>Review your order</h2>
            <Paper>
                <Typography mx={2} gutterBottom variant="h5">
                    First Name:{' '}
                    {props?.contactInformation.firstName}
                </Typography>
                <Typography mx={2} gutterBottom variant="h5">
                    Last Name:{' '}
                    {props?.contactInformation.lastName}
                </Typography>

                <Typography mx={2} gutterBottom variant="h5">
                    Email Address:{' '}
                    {props?.contactInformation.email}
                </Typography>

                <Typography mx={2} gutterBottom variant="h5">
                    Phone Number:{' '}
                    {props?.contactInformation.phone}
                </Typography>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: theme.palette.primary.main }}>Lemonade Type</TableCell>
                                <TableCell sx={{ backgroundColor: theme.palette.primary.main }} align="right">
                                    Size
                                </TableCell >
                                <TableCell sx={{ backgroundColor: theme.palette.primary.main }} align="right">
                                    Quantity
                                </TableCell>
                                <TableCell sx={{ backgroundColor: theme.palette.primary.main }} align="right">
                                    Price
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.products?.map((item: Product, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item?.lemonadeType?.name}</TableCell>
                                        <TableCell align="right">{item?.size?.name} </TableCell>
                                        <TableCell align="right">
                                            {" "}
                                            {(isNaN(props?.lineItems[index]?.quantity))
                                                ? 0
                                                : props?.lineItems[index]?.quantity}{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            {(isNaN(props?.lineItems[index]?.quantity * parseFloat(item?.amount!))
                                                ? 0
                                                : (props?.lineItems[index]?.quantity * parseFloat(item?.amount!)).toFixed(2)
                                            )}{" "}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">
                                    <b>Total Amount</b>
                                </TableCell>
                                <TableCell align="right">
                                    {props?.lineItems
                                        .map((item: LineItem, index: number) => {
                                            const quantity = isNaN(props?.lineItems[index]?.quantity) ? 0 : props?.lineItems[index]?.quantity;
                                            const totalAmount = quantity * parseFloat(data?.products[index]?.amount);
                                            console.log("totalAmount", totalAmount);
                                            return (totalAmount);
                                        }).reduce((acc, value) => acc + value)
                                        .toFixed(2)
                                    }{" "}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default Review;