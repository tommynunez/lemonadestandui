import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<>
			<Box sx={{ flexGrow: 1, my: 10 }}>
				<Grid container spacing={5} px={{ xs: 5, mb: 10 }}>
					<Grid item xs>
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
					</Grid>
					<Grid item xs>
						<Paper variant='outlined' sx={{ minHeight: '200px', p: 2 }}>
							<Typography variant='h4'>
								To place an order, click the button below.
							</Typography>
							<Button
								sx={{ mt: { xs: 36, sm: 30, md: 15 } }}
								variant='contained'
								onClick={() => {
									navigate('/storefront');
								}}>
								Storefront
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Landing;
