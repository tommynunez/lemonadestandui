import {
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Grid2,
} from '@mui/material';
import { useState } from 'react';
import { GET_ALL_ORDERS } from 'graph/queries/getAllOrders';
import { LineItem } from 'types/product/LineItem';
import CollapsableTable from 'components/shared/CollapsableTable';

const OrdersSubRows = (props: any) => (
	<TableBody>
		{props?.subRow.map((item: LineItem, index: number) => (
			<TableRow key={index}>
				<TableCell component='th' scope='row'>
					{item?.product?.lemonadeType?.name}
				</TableCell>
				<TableCell>{item?.product?.size?.name}</TableCell>
				<TableCell>{item?.quantity}</TableCell>
				<TableCell>{item?.product?.amount}</TableCell>
				<TableCell>{item?.cost}</TableCell>
			</TableRow>
		))}
	</TableBody>
);

const Orders = () => {
	const [rows, setRows] = useState([]);
	const [subRows, setSubRows] = useState([]);

	const handleUseEffect = (loading: boolean, data: any) => {
		const rowsArray = [] as any;
		const subRowsarray = [] as any;
		if (!loading && data?.retrieveOrders?.length > 0) {
			data?.retrieveOrders?.map((item) => {
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
			<Grid2 container spacing={5} pb={5}>
				<Grid2>
					<Typography variant='h4' sx={{ my: 2 }}>
						Orders
					</Typography>
					<Grid2>
						<Typography variant='subtitle1'>
							Here is all orders. You will notice the first row demonstrate the
							customer information. Second row is collapsable demonstrating the
							list items (what the customer ordered)
						</Typography>
					</Grid2>
				</Grid2>
			</Grid2>
			<CollapsableTable
				rows={rows}
				subRows={subRows}
				subTableTitle='Line Items'
				query={GET_ALL_ORDERS}
				handleUseEffect={handleUseEffect}
				subRowElement={<OrdersSubRows />}
				rowscells={[
					{
						name: 'First Name',
					},
					{
						name: 'Last Name',
					},
					{
						name: 'Email',
					},
					{
						name: 'Phone',
					},
					{
						name: 'Total Cost',
					},
				]}
				subRowcells={[
					{
						name: 'Lemonade Type',
					},
					{
						name: 'Size',
					},
					{
						name: 'Quantity',
					},
					{
						name: 'Product Cost',
					},
					{
						name: 'Total Cost',
					},
				]}
			/>
		</>
	);
};

export default Orders;
