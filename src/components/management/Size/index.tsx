import { Box, Button, Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_SIZES } from 'src/graphql/queries/getAllSizes';
import ManagementGrid from 'src/components/shared/DataGrid';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Id',
		width: 90,
		editable: false,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 150,
		editable: false,
	},
];

const Size = () => {
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();

	const handleUseEffect = (loading: boolean, data: any) => {
		const rowsArray = [] as any;
		if (!loading && data?.retrieveAllSizes?.length > 0) {
			data?.retrieveAllSizes?.map((item) => {
				const rowObject = {
					id: item.id,
					name: item.name,
				};
				rowsArray?.push(rowObject);
			});
			setRows(rowsArray);
		}
	};

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Typography variant='h4' sx={{ my: 2 }}>
						Sizes
					</Typography>
					<Grid item xs={12} md={6}>
						<Typography variant='subtitle1'>Here is all sizes.</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Button
				sx={{ my: 3 }}
				variant='contained'
				onClick={() => {
					navigate('/management/size/details/0');
				}}>
				Add Size
			</Button>
			<ManagementGrid
				rows={rows}
				columns={columns}
				query={GET_ALL_SIZES}
				handleUseEffect={handleUseEffect}
				path='/management/size/details/'
			/>
		</Box>
	);
};

export default Size;
