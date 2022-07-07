import { useQuery } from "@apollo/client";
import { Box, Button, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_PRODUCTS } from "../../../graphql/queries/getAllProducts";
import ManagementGrid from "../../shared/DataGrid";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 50,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        editable: false,
    },
    {
        field: 'lemonadetypename',
        headerName: 'Lemonade Type Name',
        width: 200,
        editable: false,
    },
    {
        field: 'sizename',
        headerName: 'Size Name',
        width: 150,
        editable: false,
    },
];

const ProductManagement = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const handleUseEffect = (loading: boolean, data: any) => {
        let rowsArray = [] as any;
        if (!loading && data?.products?.length > 0) {
            data?.products?.map((item, index) => {
                const rowObject = {
                    id: item.id,
                    amount: item.amount,
                    lemonadetypename: item.lemonadeType.name,
                    sizename: item.size.name
                };
                rowsArray?.push(rowObject);
            });
            setRows(rowsArray);
        }
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ my: 2 }}>
                        Products
                    </Typography>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">
                            Here is all products.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Button
                sx={{ my: 3 }}
                variant="contained"
                onClick={() => { navigate("/management/product/details/0") }}>
                Add Product
            </Button>
            <ManagementGrid
                rows={rows}
                columns={columns}
                query={GET_ALL_PRODUCTS}
                handleUseEffect={handleUseEffect}
                path="/management/product/details/"
            />
        </Box>
    );
};

export default ProductManagement;
