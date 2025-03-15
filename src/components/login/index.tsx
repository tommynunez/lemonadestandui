import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material';
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
				<TextField
					ref={emailRef}
					variant='outlined'
					label='Email'
					type='email'
				/>
				<FormControl variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-password'>
						Password
					</InputLabel>
					<OutlinedInput
						id='outlined-adornment-password'
						type={showPassword ? 'text' : 'password'}
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
			</Box>
		</>
	);
};

export default Login;
