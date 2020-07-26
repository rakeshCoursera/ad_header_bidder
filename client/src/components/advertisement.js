import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        textAlign: "center"
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140
    },
}));

export default function MediaCard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper variant="outlined">
                        <h1>ad 1</h1>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Paper variant="outlined">
                        <h1>ad 2</h1>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}
