import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Typography,
} from '@mui/material';
import { StyledTextField, SyledOutlinedInput } from 'components/styles';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const emailRef = useRef(null);

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					width: '400px',
					height: '500px',
					margin: '0 auto',
					flexDirection: 'column',
					rowGap: '1em',
				}}>
				<Typography variant='h5' textAlign='center' fontWeight='700'>
					Welcome to LemonadeStand
				</Typography>
				<FormControl>
					<StyledTextField
						ref={emailRef}
						variant='outlined'
						label='Email'
						type='email'
					/>
				</FormControl>
				<FormControl variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-password'>
						Password
					</InputLabel>
					<SyledOutlinedInput
						id='outlined-adornment-password'
						type={showPassword ? 'text' : 'password'}
						sx={{ input: { color: 'black' } }}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label={
										showPassword ? 'hide the password' : 'display the password'
									}
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									edge='end'>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label='Password'
					/>
				</FormControl>
				<Link to=''>Forgot your password?</Link>
				<Button variant='contained'>Log in</Button>
				<Button sx={{ backgroundColor: '#f7faff' }} variant='contained'>
					Continue with Google
				</Button>
			</Box>
		</>
	);
};

export default Login;
