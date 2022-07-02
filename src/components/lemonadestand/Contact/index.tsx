import { Box, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useEffect } from "react";

const contactFields = [
    {
        id: "firstName",
        name: "firstName",
        label: "First Name",
    },
    {
        id: "lastName",
        name: "lastName",
        label: "Last Name",
    },
    {
        id: "email",
        name: "email",
        label: "Email",
    },
    {
        id: "phone",
        name: "phone",
        label: "Phone",
    },
]

const Contact = (props: any) => {
    useEffect(() => {
        props?.setFormhasLoadedTrue();
        return () => {
            props?.setFormhasLoadedFalse();
        }
        console.log('asdf', props?.formhandler);
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, my: 10 }}>
                <Grid container spacing={5} px={10}>
                    {
                        contactFields?.map((item, index) => (
                            <Grid item md={6} key={index}>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        autoFocus={index === 1}
                                        error={props?.formhandler?.formHandlerfields[index]?.isTouched && !props?.contactInformation[item.name]}
                                        required
                                        id={item?.id}
                                        label={item?.label}
                                        name={item?.name}
                                        onChange={(e) => {
                                            props?.setcontactInformation({ ...props?.contactInformation, [e.target.name]: e.target.value });
                                            let fm = props?.formhandler;
                                            fm.isDirty = true;
                                            let fml = fm.formHandlerfields;
                                            fml[index].isTouched = true;
                                            fm.formHandlerfields = fml;
                                            props?.setFormHandler(fm);
                                        }}
                                        defaultValue={props?.contactInformation[item.name]}
                                    />
                                    {props.contactInformation
                                        && !props?.contactInformation[item?.name]
                                        && props?.formhandler?.formHandlerfields[index]?.isTouched
                                        ?
                                        <FormHelperText id="component-helper-text" error>
                                            {item.label} is Required
                                        </FormHelperText>
                                        : null
                                    }
                                </FormControl>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Contact;