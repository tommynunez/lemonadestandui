import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagementGrid = (props: any) => {
    const navigate = useNavigate();
    const { data, loading } = useQuery(props.query);

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
                        if (props?.path) {
                            return navigate(props?.path + newSelection.id);
                        }

                        return;
                    }}
                />
            </Box>
        </>
    );
};

export default ManagementGrid;