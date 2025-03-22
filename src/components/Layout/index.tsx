import { Breakpoint, Container } from '@mui/material';
import { StyledLayoutRootBox } from './index.styles';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
	element: any;
	disableGutters: boolean | undefined;
	maxWidth?: false | Breakpoint;
};

const Layout = (props: LayoutProps) => {
	return (
		<StyledLayoutRootBox>
			<Container disableGutters={true} maxWidth={false}>
				<Header />
				<Container
					disableGutters={props.disableGutters}
					sx={{ overflow: 'hidden' }}
					maxWidth={props.maxWidth}>
					{props?.element}
				</Container>
				<Footer
					description={'Welcome to Lemonade Stand'}
					title={'Lemonade Stand'}
				/>
			</Container>
		</StyledLayoutRootBox>
	);
};

export default Layout;
