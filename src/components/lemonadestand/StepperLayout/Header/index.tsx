import { Step, StepLabel, Stepper } from "@mui/material";

const StepperHeader = (props: any) => (
    <Stepper activeStep={props.activeStep}>
        {props.steps.map((label: any, index: any) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
                optional?: React.ReactNode;
            } = {};
            return (
                <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
        })}
    </Stepper>
)
export default StepperHeader;