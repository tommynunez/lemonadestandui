import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';
//import { StyledAppBarImage } from './index.styles';
import appBarLogo from '/images/logo-no-background-2.png';

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
						<img src={appBarLogo} width={'150px'} height={'40px'} />
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
