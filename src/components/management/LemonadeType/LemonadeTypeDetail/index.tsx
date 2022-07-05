import { useMutation, useQuery } from "@apollo/client";
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_LEMONADE_TYPE } from "../../../../graphql/mutations/AddSize";
import { UPDATE_LEMONADE_TYPE } from "../../../../graphql/mutations/updateLemonadeType";
import { GET_LEMONADE_TYPE_ID } from "../../../../graphql/queries/getLemonadeTypeById";
import { LemonadeType } from "../../../../types/product/LemonadeType";
import { TForm } from "../../../../types/TForm";
import { TFormFields } from "../../../../types/TFormFields";

const formsInitialstate: TForm = {
    name: "lemonade type",
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

const LemonadeTypeDetail = () => {
    const [lemonadeType, setLemonadeType] = useState<LemonadeType>();
    const [lemonadeTypeform, setLemonadeTypeform] = useState<TForm>(formsInitialstate);
    const { id } = useParams();
    const { data, loading } = useQuery(GET_LEMONADE_TYPE_ID, {
        variables: {
            id: parseInt(id!),
        },
    });
    const [addLemonadeType, { loading: loadingAddOrder }] = useMutation(ADD_LEMONADE_TYPE);
    const [updateLemonadeType, { loading: loadingUpdateOrder }] = useMutation(UPDATE_LEMONADE_TYPE);
    const navigate = useNavigate();

    useEffect(() => {
        if (id && parseInt(id) > 0 && !loading
            && data?.retrieveLemonadeTypeById) {
            setLemonadeType(data.retrieveLemonadeTypeById);
        }
    }, [id, data]);
    console.log(id)
    const handleSubmit = () => {
        if (parseInt(id!) === 0 || !lemonadeType) {
            addLemonadeType(
                {
                    variables:
                    {
                        "lemonadeType": {
                            id: 0,
                            "name": lemonadeType?.name,
                        },
                    },
                }
            ).then((response) => {
                console.log(response);
                if (response?.data?.insertLemonadeType) {
                    navigate("/management/lemonadeType");
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            updateLemonadeType(
                {
                    variables:
                    {
                        "id": parseInt(id!),
                        "lemonadeType": {
                            "id": parseInt(id!),
                            "name": lemonadeType?.name
                        },
                    },
                }
            ).then((response) => {
                console.log(response);
                if (response?.data?.updateLemonadeType) {
                    navigate("/management/lemonadeType");
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
                                Lemonade Type Detail
                            </Typography>
                        </Grid>
                        {

                            (parseInt(id!) > 0 && !loading && lemonadeType)
                                ?
                                lemonadeTypeform.formFields?.map((item: TFormFields, index: number) => (
                                    <Grid item md={6} key={index}>
                                        <FormControl fullWidth sx={{ my: 1 }}>
                                            <TextField
                                                required
                                                id={item?.formAttribute?.id}
                                                autoFocus={index === 0}
                                                name={item?.formAttribute?.name}
                                                label={item?.formAttribute?.label}
                                                defaultValue={lemonadeType![item?.formAttribute?.name]}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    let lt = { ...lemonadeType };
                                                    lt.name = value;
                                                    setLemonadeType(lt);
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
                                onClick={() => navigate("/management/lemonadetype/")}>
                                Go Back
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            }
        </>

    );
};

export default LemonadeTypeDetail;