import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { Button, useTheme } from '@mui/material';
//import { StyledAppBarImage } from './index.styles';
import appBarLogo from '/images/logo-no-background-2.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
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
					<Link
						href='/'
						sx={{ color: theme.palette.primary.contrastText, flexGrow: 1 }}>
						<img src={appBarLogo} width={'175px'} height={'40px'} />
					</Link>
					{location.pathname == '/' && (
						<>
							<Button
								onClick={() => {
									navigate('/login');
								}}
								sx={{ margin: '0 1em 0 0' }}
								variant='contained'>
								Login
							</Button>
							<Button
								onClick={() => {
									navigate('/storefront');
								}}
								variant='contained'>
								Signup
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
