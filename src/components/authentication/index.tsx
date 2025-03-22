import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { Signup } from './Signup';
import { Login } from './Login';

const Authentication = () => {
	const [isSignup, setIsSignup] = useState(false);
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
					flex: '1 1',
					maxWidth: '400px',
					margin: '1.5em auto',
					flexDirection: 'column',
					rowGap: '1em',
					border: '1px solid',
					padding: '24px',
					borderRadius: '12px',
				}}>
				{isSignup ? (
					<Signup
						setIsSignup={setIsSignup}
						handleMouseDownPassword={handleMouseDownPassword}
						handleMouseUpPassword={handleMouseUpPassword}
						emailRef={emailRef}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						handleClickShowPassword={handleClickShowPassword}
					/>
				) : (
					<Login
						setIsSignup={setIsSignup}
						handleMouseDownPassword={handleMouseDownPassword}
						handleMouseUpPassword={handleMouseUpPassword}
						emailRef={emailRef}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						handleClickShowPassword={handleClickShowPassword}
					/>
				)}
			</Box>
		</>
	);
};

export default Authentication;
