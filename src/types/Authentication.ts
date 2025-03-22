export type AuthenticationType = {
	setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
	handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
	emailRef: React.RefObject<null>;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	handleClickShowPassword: () => void;
};
