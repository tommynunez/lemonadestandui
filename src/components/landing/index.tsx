import { Fragment } from 'react';
import LandingPageBanner from './LandingPageBanner';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SavingsIcon from '@mui/icons-material/Savings';

const Landing = (props: any) => {
	return (
		<Fragment>
			<LandingPageBanner />
			<Box
				sx={{
					display: 'flex',
					borderRadius: '0 4em',
				}}>
				<Box
					padding='1em 0'
					sx={{
						position: 'relative',
						width: '100%',
						height: '400px',
						backgroundColor: '#fff',
						backgroundImage:
							'linear-gradient(rgb(253, 249, 215),rgba(230, 180, 0, 0) 75%)',
						padding: '9em 0 9em 0',
					}}>
					<Typography
						variant='h4'
						margin='0 0 16px 0'
						sx={{ textAlign: 'center' }}>
						Order anywhere, anytime
					</Typography>
					<Typography variant='h6' sx={{ textAlign: 'center' }}>
						Save time, order from different locations, save money with our
						rewards
					</Typography>
					<Box
						sx={{
							height: '100%',
							width: '1200px',
							display: 'flex',
							margin: '0 auto',
							padding: '1em 0',
							alignItems: 'center',
							flexDirection: 'row',
						}}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								flexGrow: '0',
								flexBasis: '50%',
								padding: '0 5em',
							}}>
							<Avatar
								sx={{
									backgroundColor: props?.theme?.palette?.primary,
								}}>
								<LocalDrinkIcon />
							</Avatar>
							<Typography variant='h6'>We offer different flavors </Typography>
							<Typography variant='body1' sx={{ textAlign: 'center' }}>
								We've made it easier for you to order your favorite flavor from
								any of our locations
							</Typography>
						</Box>
						<Divider orientation='vertical' />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								flexGrow: '0',
								flexBasis: '50%',
								padding: '0 5em',
							}}>
							<Avatar sx={{ backgroundColor: props?.theme?.palette?.primary }}>
								<SavingsIcon />
							</Avatar>
							<Typography variant='h6'>Save Money</Typography>
							<Typography variant='body1' sx={{ textAlign: 'center' }}>
								We offer 1 free lemonade for every 10 purchases regardless of
								size and flavor.
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box></Box>
		</Fragment>
	);
};

export default Landing;
