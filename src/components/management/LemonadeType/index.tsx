import Box from '@mui/material/Box';
import { useState } from 'react';
import { GET_ALL_LEMONADE_TYPES } from 'src/graphql/queries/getAllLemonadeTypes';
import ManagementGrid from 'src/shared/DataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const LemonadeType = () => {
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();

	const handleUseEffect = (loading: boolean, data: any) => {
		const rowsArray = [] as any;
		if (!loading && data?.retrieveAllLemonadeTypes?.length > 0) {
			data?.retrieveAllLemonadeTypes?.map((item) => {
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
						Lemonade Types
					</Typography>
					<Grid item xs={12} md={6}>
						<Typography variant='subtitle1'>
							Here is all lemonade types.
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Button
				sx={{ my: 3 }}
				variant='contained'
				onClick={() => {
					navigate('/management/lemonadetype/details/0');
				}}>
				Add Lemonade Type
			</Button>
			<ManagementGrid
				rows={rows}
				columns={columns}
				query={GET_ALL_LEMONADE_TYPES}
				handleUseEffect={handleUseEffect}
				path='/management/lemonadetype/details/'
			/>
		</Box>
	);
};

export default LemonadeType;
