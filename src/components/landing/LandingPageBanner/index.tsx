import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import imgURL from '/images/icon-navbar-3.jpg';
import {
	StyledBanner,
	StyledBannerBackground,
	StyledBgBanner,
	StyledBox,
	StyledBoxFlexContainer,
	StyledLeftContainer,
	StyledRightContainer,
} from 'components/landing/index.styles';

const LandingPageBanner = () => {
	const navigate = useNavigate();

	return (
		<Fragment>
			<StyledBannerBackground>
				<StyledBanner>
					<StyledLeftContainer>
						<StyledBgBanner>
							<Typography variant='h2' margin={'0 0 .25em 0'}>
								Skip the line with online orders
							</Typography>
							<Typography variant='h6' margin={'0 0 1em 0'}>
								Place your first order today
							</Typography>
							<Button
								onClick={() => {
									navigate('/storefront');
								}}
								variant='contained'>
								Order now
							</Button>
						</StyledBgBanner>
					</StyledLeftContainer>
					<StyledRightContainer>
						<StyledBoxFlexContainer>
							<StyledBox>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
							</StyledBox>
							<StyledBox margin='-105px 0 0 0'>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
							</StyledBox>
							<StyledBox>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
								<Box>
									<img src={imgURL} />
								</Box>
							</StyledBox>
						</StyledBoxFlexContainer>
					</StyledRightContainer>
				</StyledBanner>
			</StyledBannerBackground>
		</Fragment>
	);
};

export default LandingPageBanner;
