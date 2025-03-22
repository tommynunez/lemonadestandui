import { useQuery } from '@apollo/client';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManagementGrid = (props: any) => {
	const navigate = useNavigate();
	const { data, loading } = useQuery(props.query);
	const theme = useTheme();

	useEffect(() => {
		props?.handleUseEffect(loading, data);
	}, [loading]);

	return (
		<>
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={props?.rows}
					columns={props?.columns}
					autoPageSize={props?.pageSize}
					onRowClick={(newSelection) => {
						if (props?.path) {
							return navigate(props?.path + newSelection.id);
						}

						return;
					}}
					sx={{
						'.MuiDataGrid-columnHeaders': {
							backgroundColor: `${theme.palette.primary.main}`,
						},
					}}
				/>
			</Box>
		</>
	);
};

export default ManagementGrid;
