import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { ThemeConsumer } from 'styled-components';
import { useTheme } from '@mui/material';

const Header = () => {
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/*                   <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link href="/" sx={{ color: theme.palette.primary.contrastText }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Lemonade Stand
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;