import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { GET_ALL_SIZES } from "../../../graphql/queries/getAllSizes";
import ManagementGrid from "../../shared/DataGrid";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    },
];


const Size = () => {
    const [rows, setRows] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleUseEffect = (loading: boolean, data: any) => {
        let rowsArray = [] as any;
        if (!loading && data?.retrieveAllSizes?.length > 0) {
            data?.retrieveAllSizes?.map((item, index) => {
                const rowObject = {
                    id: item.id,
                    name: item.name,
                };
                rowsArray?.push(rowObject);
            });
            setRows(rowsArray);
        }
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h4">
                Sizes
            </Typography>
            <ManagementGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                pageIndex={pageIndex}
                query={GET_ALL_SIZES}
                handleUseEffect={handleUseEffect}
            />
        </Box>
    );
};

export default Size;
