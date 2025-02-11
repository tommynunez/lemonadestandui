import { Box, Button, Grid2, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_PRODUCTS } from 'graph/queries/getAllProducts';
import ManagementGrid from 'components/shared/DataGrid';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Id',
		width: 50,
		editable: false,
	},
	{
		field: 'amount',
		headerName: 'Amount',
		width: 150,
		editable: false,
	},
	{
		field: 'lemonadetypename',
		headerName: 'Lemonade Type Name',
		width: 200,
		editable: false,
	},
	{
		field: 'sizename',
		headerName: 'Size Name',
		width: 150,
		editable: false,
	},
];

const ProductManagement = () => {
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();

	const handleUseEffect = (loading: boolean, data: any) => {
		const rowsArray = [] as any;
		if (!loading && data?.products?.length > 0) {
			data?.products?.map((item) => {
				const rowObject = {
					id: item.id,
					amount: item.amount,
					lemonadetypename: item.lemonadeType.name,
					sizename: item.size.name,
				};
				rowsArray?.push(rowObject);
			});
			setRows(rowsArray);
		}
	};

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<Grid2 container spacing={5}>
				<Grid2>
					<Typography variant='h4' sx={{ my: 2 }}>
						Products
					</Typography>
					<Grid2>
						<Typography variant='subtitle1'>Here is all products.</Typography>
					</Grid2>
				</Grid2>
			</Grid2>
			<Button
				sx={{ my: 3 }}
				variant='contained'
				onClick={() => {
					navigate('/management/product/details/0');
				}}>
				Add Product
			</Button>
			<ManagementGrid
				rows={rows}
				columns={columns}
				query={GET_ALL_PRODUCTS}
				handleUseEffect={handleUseEffect}
				path='/management/product/details/'
			/>
		</Box>
	);
};

export default ProductManagement;
