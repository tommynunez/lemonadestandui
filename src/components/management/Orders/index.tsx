import { TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { useState } from 'react';
import { GET_ALL_ORDERS } from '../../../graphql/queries/getAllOrders';
import { LineItem } from '../../../types/product/LineItem';
import CollapsableTable from '../../shared/CollapsableTable';

const OrdersSubRows = (props: any) => (
    <TableBody>
        {props?.subRow.map((item: LineItem, index: number) => (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {item?.product?.lemonadeType?.name}
                </TableCell>
                <TableCell>{item?.product?.size?.name}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>{item?.product?.amount}</TableCell>
                <TableCell>{item?.cost}</TableCell>
            </TableRow>
        ))}
    </TableBody>
)

const Orders = () => {
    const [rows, setRows] = useState([]);
    const [subRows, setSubRows] = useState([]);

    const handleUseEffect = (loading: boolean, data: any) => {
        let rowsArray = [] as any;
        let subRowsarray = [] as any;
        if (!loading && data?.retrieveOrders?.length > 0) {
            data?.retrieveOrders?.map((item, index) => {
                const rowObject = {
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    phone: item.phone,
                    totalCost: item.totalCost,
                };
                rowsArray?.push(rowObject);
                subRowsarray?.push(item.lineItems);
            });
            setRows(rowsArray);
            setSubRows(subRowsarray);
        }
    };
    return (
        <>
            <Typography variant="h4" sx={{ my: 2 }}>
                Orders
            </Typography>
            <CollapsableTable
                rows={rows}
                subRows={subRows}
                subTableTitle="Line Items"
                query={GET_ALL_ORDERS}
                handleUseEffect={handleUseEffect}
                subRowElement={<OrdersSubRows />}
                rowscells={[
                    {
                        name: "First Name"
                    },
                    {
                        name: "Last Name"
                    },
                    {
                        name: "Email"
                    },
                    {
                        name: "Phone"
                    },
                    {
                        name: "Total Cost"
                    },
                ]}
                subRowcells={[
                    {
                        name: "Lemonade Type"
                    },
                    {
                        name: "Size"
                    },
                    {
                        name: "Quantity"
                    },
                    {
                        name: "Product Cost"
                    },
                    {
                        name: "Total Cost"
                    },
                ]}
            />
        </>
    );
};

export default Orders;