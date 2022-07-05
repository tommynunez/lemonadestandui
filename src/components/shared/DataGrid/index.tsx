import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagementGrid = (props: any) => {
    const navigate = useNavigate();
    const { data, loading } = useQuery(props.query, {
        variables: {
            search: "",
            pageIndex: props?.pageIndex,
            pageSize: props?.pageSize,
            sortField: "",
        }
    });

    useEffect(() => {
        props?.handleUseEffect(loading, data);
    }, [loading]);

    useEffect(() => {
        console.log('asdf');
    }, []);

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={props?.rows}
                    columns={props?.columns}
                    pageSize={props?.pageSize}
                    rowsPerPageOptions={[props?.pageSize]}
                    onRowClick={(newSelection) => {
                        return navigate(props?.path + newSelection.id);
                    }}
                />
            </Box>
        </>
    );
};

export default ManagementGrid;