import React from 'react';
import moment from 'moment';
import {useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {hideNews, incrementVote} from '../redux/index'

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#ff742b', 
        color: theme.palette.common.white,
        padding: theme.spacing(0.5),
    },
    body: {
        fontSize: 12,
        padding: theme.spacing(0),
        width: 'auto',
    },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#e6e6e6',
        },
        "&:hover": {
            backgroundColor: "#ddd !important"
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    light: {
        color: "#828282",
    }
}));

// component to render the table row
const TableRowElement = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const newsDomain = (props.data.story_url || props.data.url) ? (props.data.story_url || props.data.url).split('/').filter(val => val)[1] : 'none';
    const timediff = moment.unix(props.data.created_at_i).fromNow();
    return (
        <StyledTableRow hover>
            <StyledTableCell align="center"><b>{props.data.num_comments || 0}</b></StyledTableCell>
            <StyledTableCell align="center"><b>{props.data.points || 0}</b></StyledTableCell>
            <StyledTableCell align="center" onClick={() => dispatch(incrementVote(props.data.objectID))} ><ArrowDropUpIcon fontSize="large" color="action" /></StyledTableCell>
            <StyledTableCell align="left">
                {props.data.story_title || props.data.title}&nbsp;
                <span className={classes.light}>(</span>
                <a rel="noopener noreferrer" href={props.data.story_url || props.data.url} target="_blank">{newsDomain}</a>
                <span className={classes.light}>) by &nbsp;</span>
                {props.data.author}&nbsp; 
                <span className={classes.light}>{timediff}&nbsp; [</span>
                <span onClick={() => dispatch(hideNews(props.data.objectID))}>hide</span>
                <span className={classes.light}>]</span>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default TableRowElement;

