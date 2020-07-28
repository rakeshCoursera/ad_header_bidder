import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

import { fetchAds, recordConversions } from '../../redux/index';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        textAlign: "center"
    },
}));

export default function MediaCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const adsData = useSelector(state => state.ads)
    const sortedAdsData = adsData.ads.sort((a, b) => parseFloat(b.cpi) - parseFloat(a.cpi)).slice(0, 2);

    useEffect(() => {
        dispatch(fetchAds());
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={2}>
                { sortedAdsData.map((obj, index) => 
                    <Grid item xs={12} sm={6} key={index.toString()}>
                        <Paper variant="outlined" onClick={() => dispatch(recordConversions(obj._id))}>
                            <CardMedia
                                component="img"
                                alt={`${obj.company} advertisement`}
                                height="150"
                                image={obj.adImage}
                                title={`advertisement ${index+1}`}
                            />
                            <Button color="default" fullWidth={true}>
                                {`advertisement ${index+1}`}
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
