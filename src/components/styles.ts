import styled from 'styled-components';
import { OutlinedInput, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
	& label.Mui-focused {
		color: #33332a;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: #33332a;
		}
	}
`;

export const SyledOutlinedInput = styled(OutlinedInput)`
	& label.MuiInputLabel-formControl {
		color: #33332a;
	}
	& .MuiInputLabel-outlined {
		&.Mui-focused fieldset {
			border-color: #33332a;
		}
	}
`;
