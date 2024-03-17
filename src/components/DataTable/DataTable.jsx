import { useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper
} from '@mui/material';
import PropTypes from 'prop-types';
import ActionButtons from "./ActionButtons";
function DataTable({
    listTitles,
    listKeys,
    dataList,
    listButtons,
    id
}){
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return(
        <>
            <Paper sx={{
                    boxShadow:5,
                    marginTop:'0.5rem',
                    width: '100%',
                    overflow: 'hidden',
                    paddingTop:"0.5rem"
                }}>
                <TableContainer sx={{  maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {listTitles.map((title, index) => (
                                    <TableCell align="center" key={`${title}-${index}`}>
                                        {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row,index) => (
                                <TableRow hover key={`${id}-${index}`} tabIndex={-1}>
                                    {listKeys.map((key, index) => (
                                        <TableCell align="center" key={`${key}-${index}`}>
                                            {row[key]}
                                        </TableCell>
                                    ))}
                                    {listButtons && (
                                        <ActionButtons 
                                            row={row}
                                            listButtons={listButtons}
                                            id={id}
                                        />
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={dataList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

DataTable.propTypes = {
    dataList: PropTypes.array.isRequired,
    listKeys: PropTypes.array.isRequired,
    listTitles: PropTypes.array.isRequired,
    listButtons: PropTypes.array.isRequired,
    id: PropTypes.string
};
export default DataTable;