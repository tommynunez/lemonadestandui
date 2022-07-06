import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Button, FormControl, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_SIZE } from "../../../../graphql/mutations/addSize";
import { UPDATE_SIZE } from "../../../../graphql/mutations/updateSize";
import { GET_SIZE_ID } from "../../../../graphql/queries/getSizeById";
import { Size } from "../../../../types/product/Size";
import { TForm } from "../../../../types/TForm";
import { TFormFields } from "../../../../types/TFormFields";

const formsInitialstate: TForm = {
    name: "Size",
    formHasLoaded: false,
    formFields: [
        {
            formAttribute:
            {
                id: "name",
                name: "name",
                label: "Name",
            },
            isTouched: false,
        },
    ],
};

const SizeDetail = () => {
    const [size, setSize] = useState<Size>({} as Size);
    const [sizeform, setSizeform] = useState<TForm>(formsInitialstate);
    const { id } = useParams();
    const [getSizebyID, { loading }] = useLazyQuery(GET_SIZE_ID);
    const [addSize, { loading: loadingAddOrder }] = useMutation(ADD_SIZE);
    const [updateSize, { loading: loadingUpdateOrder }] = useMutation(UPDATE_SIZE);

    useEffect(() => {
        if (id && parseInt(id) > 0 && !loading) {
            getSizebyID({
                variables: {
                    id: parseInt(id!),
                }
            }).then((response) => {
                setSize(response?.data?.retrieveSizeTypeById);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    useEffect(() => {
        console.log(size)
    }, [size]);

    const handleSubmit = () => {
        if (parseInt(id!) === 0 || !size) {
            addSize(
                {
                    variables:
                    {
                        "size": {
                            id: 0,
                            "name": size?.name,
                        },
                    },
                }
            ).then((response) => {
                console.log(response);
                if (response?.data?.insertSize) {
                    window.location.href = "/management/size";
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            updateSize(
                {
                    variables:
                    {
                        "id": parseInt(id!),
                        "size": {
                            "id": parseInt(id!),
                            "name": size?.name
                        },
                    },
                }
            ).then((response) => {
                console.log(response);
                if (response?.data?.updateSize) {
                    window.location.href = "/management/size";
                }
            }).catch((error) => {
                console.log(error);
            });
        }

    };

    return (
        <>
            {
                <Box sx={{ flexGrow: 1, my: 3 }}>
                    <Grid container spacing={5} px={5}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                Size Detail
                            </Typography>
                        </Grid>
                        {

                            (!loading && size)
                                ?
                                sizeform.formFields?.map((item: TFormFields, index: number) => (
                                    <Grid item md={6} key={index}>
                                        <FormControl fullWidth sx={{ my: 1 }}>
                                            <TextField
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSubmit();
                                                    }
                                                }}
                                                required
                                                id={item?.formAttribute?.id}
                                                autoFocus={index === 0}
                                                name={item?.formAttribute?.name}
                                                label={item?.formAttribute?.label}
                                                value={(size![item?.formAttribute?.name]) ? size![item?.formAttribute?.name] : ''}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    let sz = { ...size };
                                                    sz.name = value;
                                                    setSize(sz);
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                ))
                                :
                                <Grid item md={6}>
                                    <Box sx={{ width: 500 }}>
                                        <Skeleton />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation={false} />
                                    </Box>
                                </Grid>
                        }
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={() => handleSubmit()}>
                                Submit
                            </Button>
                            {" "}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => window.location.href = "/management/size/"}>
                                Go Back
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            }
        </>

    );
};

export default SizeDetail;