import { createTheme, ThemeProvider } from '@mui/material';
import Routing from './components/shared/Routes';

const theme = createTheme({
	palette: {
		primary: {
			main: '#fef861',
			contrastText: '#33332a',
			light: '#fff',
		},
		secondary: {
			main: '#eae7d8',
			contrastText: '#33332a',
		},
		text: {
			primary: '#33332a',
			secondary: '#33332a',
		},
	},
});

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Routing />
			</ThemeProvider>
		</>
	);
};

export default App;
