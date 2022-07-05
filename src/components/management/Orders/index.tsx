import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ManagementGrid from "../../shared/DataGrid";

const Order = () => {
    const [rows, setRows] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortField, setSortField] = useState("");

    // const { data, loading } = useQuery(, {
    //     variables: {
    //         search: "",
    //         pageIndex: pageIndex,
    //         pageSize: pageSize,
    //         sortField: sortField,
    //     }
    // });

    // useEffect(() => {
    //     let rowsArray = [] as any;
    //     if (!loading && data?.retrieveAllLemonadeTypes?.length > 0) {
    //         data?.retrieveAllLemonadeTypes?.map((item, index) => {
    //             const rowObject = {
    //                 id: index + 1,
    //                 name: item.name
    //             };
    //             rowsArray?.push(rowObject);
    //         });
    //         setRows(rowsArray);
    //     }
    // }, [loading]);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            {/* <ManagementGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                pageIndex={pageIndex}
                query={GET_ALL_LEMONADE_TYPES}
            /> */}
        </Box>
    );
};

export default Order;
