import { Container } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

const Layout = (props: any) => {
	return (
		<Container disableGutters={true} maxWidth={false}>
			<Header />
			<Container>{props?.element}</Container>
			<Footer
				description={'Welcome to Lemonade Stand'}
				title={'Lemonade Stand'}
			/>
		</Container>
	);
};

export default Layout;
