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

export const StyledH4Span = styled.span`
	h4 {
		display: flex;
		flex-direction: row;
	}
	h4:before,
	h4:after {
		content: '';
		flex: 1 1;
		border-bottom: 1px solid;
		margin: auto;
	}
	h4:before {
		margin-right: 10px;
	}
	h4:after {
		margin-left: 10px;
	}
`;
