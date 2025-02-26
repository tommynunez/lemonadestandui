import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';
//import { StyledAppBarImage } from './index.styles';

const Header = () => {
	const theme = useTheme();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={{
					backgroundColor: theme.palette.primary.light,
					zIndex: 1200,
					position: 'sticky',
				}}
				elevation={0}>
				<Toolbar>
					{/*                   
					<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
					{/*<StyledAppBarImage width='40em' height='40em' />*/}
					<Link href='/' sx={{ color: theme.palette.primary.contrastText }}>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							Lemonade Stand
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
