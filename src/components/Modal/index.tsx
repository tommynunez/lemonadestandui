import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

type ErrorKnockOut = {
    open: boolean;
    setOpen: any;
    handleClose: any;
    title: string;
    description: string;
}

const ErrorKnockOutModal = (props: ErrorKnockOut) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #FF0000',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px',
    };


    return (
        <div>
            <Modal
                open={props?.open}
                onClose={() => props?.handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ color: '#FF0000' }} variant="h6" component="h2">
                        {props?.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, color: '#FF0000' }}>
                        {props?.description}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ErrorKnockOutModal;