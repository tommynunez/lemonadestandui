import styled from 'styled-components';
import imgURL from '/images/icon-navbar-3.jpg';
import { Box } from '@mui/material';

/**background-image:linear-gradient( rgba(255, 255, 255, 0), rgba(255, 227, 0, 0.41) 100% ) */
/**background-image: linear-gradient(rgba(230, 180, 0, 0),	rgb(253, 250, 226) 100%);*/
export const StyledBannerBackground = styled.div`
	position: relative;
	background-image: linear-gradient(
		rgba(230, 180, 0, 0),
		rgb(253, 249, 215) 100%
	);
	background-repeat: repeat-x;

	border-radius: 0 4em;

	@media (min-width: 900px) {
		padding: 8rem 0;
	}
`;

export const StyledBanner = styled(Box)``;

export const StyledBgBanner = styled(Box)`
	max-width: 50%;
`;

export const StyledAppBarImage = styled.img`
	background: transparent;
	background-color: #fff;
	background: transparent url(${imgURL}) no-repeat center cover;
`;

export const StyledLeftContainer = styled(Box)`
	width: 100%;
	padding: 0 4em;
`;

export const StyledRightContainer = styled(Box)`
	transform: rotate(-20deg);
`;

export const StyledBoxFlexContainer = styled(Box)`
	display: flex;
	position: absolute;
	left: 50%;
	top: 0px;
	transform: translate3d(20%, -50%, 0px);
	height: 50em;
`;

export const StyledImage = styled.img`
	border-radius: 8px;
	width: 225px;
	height: 225px;
`;
