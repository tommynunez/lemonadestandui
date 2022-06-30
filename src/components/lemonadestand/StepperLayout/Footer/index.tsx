import { Box, Button } from "@mui/material";

const StepperFooter = (props: any) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
            color="inherit"
            disabled={props.activeStep === 0}
            onClick={props.handleBack}
            sx={{ mr: 1 }}
        >
            Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={props.handleNext}>
            {props.activeStep === props.steps.length - 1 ? 'Submit Order' : 'Next'}
        </Button>
    </Box>
);

export default StepperFooter;