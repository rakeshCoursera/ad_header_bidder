import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableRowElement, { StyledTableCell } from './tableRow';

const useStyles = makeStyles(theme => ({
    laylout: {
        width: '100%',
        maxHeight: 440,
    },
    header: {
        padding: 0,
    }
}));


// Table react-redux connected component to render table
const MakeTable = ({ page, headers }) => {
    const classes = useStyles();

    const newsData = useSelector(state => state.news);

    const headerRow = headers.map((val, index) => {
        if (index === headers.length - 1) {
            return <StyledTableCell key={index.toString()} className={classes.header} align="left" >{val}</StyledTableCell>
        }
        else {
            return <StyledTableCell key={index.toString()} align="center" >{val}</StyledTableCell>
        }
    });

    const rows = newsData.news.hits.map((val, index) =>
        <TableRowElement key={index.toString()} data={val} />);


    return (
        <TableContainer className={classes.laylout}>
            <Table stickyHeader size="small" aria-label="collapsible table" >
                <TableHead>
                    <TableRow>
                        {headerRow}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MakeTable;
