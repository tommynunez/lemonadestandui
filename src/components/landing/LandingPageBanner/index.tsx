import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImg from '/images/banner-1.jpg';
import bannerImg2 from '/images/banner-2.jpg';
import {
	StyledBanner,
	StyledBannerBackground,
	StyledBgBanner,
	StyledImage,
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
								Skip the line.
							</Typography>
							<Typography variant='h6' margin={'0 0 1em 0'}>
								Place your first order today.
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
							<Box margin='0 .25em 0 0'>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
								<Box>
									<StyledImage src={bannerImg2} />
								</Box>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
							</Box>
							<Box margin='-105px .25em 0 0'>
								<Box>
									<StyledImage src={bannerImg2} />
								</Box>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
								<Box>
									<StyledImage src={bannerImg2} />
								</Box>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
							</Box>
							<Box>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
								<Box>
									<StyledImage src={bannerImg2} />
								</Box>
								<Box>
									<StyledImage src={bannerImg} />
								</Box>
								<Box>
									<StyledImage src={bannerImg2} />
								</Box>
							</Box>
						</StyledBoxFlexContainer>
					</StyledRightContainer>
				</StyledBanner>
			</StyledBannerBackground>
		</Fragment>
	);
};

export default LandingPageBanner;
