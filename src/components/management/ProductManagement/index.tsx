import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS } from "../../../graphql/queries/getAllProducts";
import ManagementGrid from "../../shared/DataGrid";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
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
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

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
            <Typography variant="h4">
                Products
            </Typography>
            <ManagementGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                pageIndex={pageIndex}
                query={GET_ALL_PRODUCTS}
                handleUseEffect={handleUseEffect}
            />
        </Box>
    );
};

export default ProductManagement;
