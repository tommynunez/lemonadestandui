import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Layout from './components/shared/Layout'
import Routing from './components/shared/Routes'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffee58',
      contrastText: '#000',
    },
    secondary: {
      main: '#bdbdbd',
      contrastText: '#fff',
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
  )
};

export default App;