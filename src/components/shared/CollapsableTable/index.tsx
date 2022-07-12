import { TableRow, TableCell, IconButton, Collapse, Box, Typography, Table, TableHead, TableBody, Paper, TableContainer, Grid, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { LineItem } from "../../../types/product/LineItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQuery } from "@apollo/client";
import { getRowsStateFromCache } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";

function Row(props: { row: any, subRow: any, subRowCells: any, subRowElement: any, subTableTitle: string }) {
    const { row, subRow, subRowCells, subRowElement, subTableTitle } = props;
    const [open, setOpen] = React.useState(true);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {
                    Object.keys(row)?.map((item, index) => {
                        if (index === 0) {
                            return (
                                <TableCell key={index} component="th" scope="row">
                                    {row[item]}
                                </TableCell>
                            )
                        } else {
                            return (
                                <TableCell key={index} >{row[item]}</TableCell>
                            )
                        }
                    })
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="subRows">
                                <TableHead>
                                    <TableRow>
                                        {subRowCells.map((item, index) => {
                                            if (index === 0) {
                                                return (
                                                    <TableCell key={index} component="th" scope="row">
                                                        {item.name}
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={index} >{item.name}</TableCell>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                </TableHead>
                                {(subRowElement)
                                    ?
                                    React.cloneElement(subRowElement, { subRow })
                                    : <Typography>Please pass in an element returns a TableBody element with neccesary child components. </Typography>
                                }
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const CollapsableTable = (props: any) => {
    const theme = useTheme();
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

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsable table">
                    <TableHead sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                    }}>
                        <TableRow>
                            <TableCell />
                            {props?.rowscells.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <TableCell key={index} component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell key={index} >{item.name}</TableCell>
                                    )
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props?.rows.map((row, index) => (
                            <Row
                                key={index}
                                row={row}
                                subRow={props?.subRows[index]}
                                subRowCells={props.subRowcells}
                                subRowElement={props?.subRowElement}
                                subTableTitle={props?.subTableTitle}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default CollapsableTable;