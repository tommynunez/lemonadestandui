import { Fragment } from 'react';
import LandingPageBanner from './LandingPageBanner';
import { Box } from '@mui/material';

const Landing = () => {
	return (
		<Fragment>
			<LandingPageBanner />
			<Box
				padding='1em 0'
				sx={{
					position: 'absolute',
					width: '100%',
					height: '400px',
					backgroundImage:
						'linear-gradient(	rgba(230, 180, 0, 0),	rgb(253, 249, 215) 100%)',
				}}>
				test
			</Box>
			<Box></Box>
		</Fragment>
	);
};

export default Landing;
