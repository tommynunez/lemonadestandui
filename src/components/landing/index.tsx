import { Box, Button, Grid2, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Box sx={{ flexGrow: 1, my: 10 }}>
				<Grid2 container spacing={1} px={{ xs: 5, mb: 10 }}>
					<Grid2 size={{ sm: 12, md: 6, lg: 6 }}>
						<Paper variant='outlined' sx={{ minHeight: '200px', p: 2 }}>
							<Typography variant='h4'>
								To view orders and add new products, lemonade types and sizes
								click the button below.
							</Typography>
							<Button
								sx={{ mt: 10 }}
								variant='contained'
								onClick={() => {
									navigate('/management');
								}}>
								Management
							</Button>
						</Paper>
					</Grid2>
					<Grid2 size={{ sm: 12, md: 6, lg: 6 }}>
						<Paper variant='outlined' sx={{ minHeight: '200px', p: 2 }}>
							<Typography variant='h4'>
								To place an order, click the button below.
							</Typography>
							<Button
								sx={{ mt: { xs: 36, sm: 25, md: 15 } }}
								variant='contained'
								onClick={() => {
									navigate('/storefront');
								}}>
								Storefront
							</Button>
						</Paper>
					</Grid2>
				</Grid2>
			</Box>
		</Fragment>
	);
};

export default Landing;
