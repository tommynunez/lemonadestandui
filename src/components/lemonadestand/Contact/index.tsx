import { Box, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useState } from "react";

const Contact = (props: any) => {
    return (
        <>
            <Box sx={{ flexGrow: 1, my: 10 }}>
                <Grid container spacing={5} px={10}>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                error={!props?.contactInformation?.firstName}
                                required
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                onChange={(e) => props?.setcontactInformation({ ...props.contactInformation, [e.target.name]: e.target.value })}
                            />
                            {!props?.contactInformation?.firstName
                                ?
                                <FormHelperText id="component-helper-text">
                                    First Name is Required
                                </FormHelperText>
                                : null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                error={!props?.contactInformation?.lastName}
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={(e) => props?.setcontactInformation({ ...props.contactInformation, [e.target.name]: e.target.value })}
                            />
                            {!props?.contactInformation?.lastName
                                ?
                                <FormHelperText id="component-helper-text">
                                    Last Name is Required
                                </FormHelperText>
                                : null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                error={!props?.contactInformation?.email}
                                required
                                id="email"
                                label="Email"
                                name="email"
                                onChange={(e) => props?.setcontactInformation({ ...props.contactInformation, [e.target.name]: e.target.value })}
                            />
                            {!props?.contactInformation?.email
                                ?
                                <FormHelperText id="component-helper-text">
                                    Email is Required
                                </FormHelperText>
                                : null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                error={!props?.contactInformation?.phone}
                                required
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                onChange={(e) => {
                                    props?.setcontactInformation({ ...props.contactInformation, [e.target.name]: e.target.value })
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                            {!props?.contactInformation?.phone
                                ?
                                <FormHelperText id="component-helper-text">
                                    Phone is Required
                                </FormHelperText>
                                : null
                            }
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Contact;