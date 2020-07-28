import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { fetchNews } from '../../redux/index';
import Chart from './lineChart';
import MakeTable from './table';
import Pagination from './pagination';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  newsdiv: {},
  pagination: {
    fontSize: 14,
    color: "#ff742b",
    textAlign: "right",
    paddingRight: "2%",
  },
  chart: {
    width: "100%",
    textAlign: "center",
    borderTop: "1px solid rgb(126, 123, 123)",
    maxHeight: 305,
  }
}));

// The react-redux parent connected component to fetch news, containes child 
// component Table, Pagination, Line Chart
function NewsContainer({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.news);

  useEffect(() => {
    if (newsData.news && newsData.news.page !== page) {
      dispatch(fetchNews(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchNews, page]);

  return newsData.loading ? (<h2><CircularProgress size={36} /></h2>) : newsData.error ? (
    <h2>{newsData.error.message}</h2>
  ) : newsData && newsData.news && newsData.news.hits ? (
    <div className={classes.root}>
      <MakeTable className={classes.newsdiv} headers={['Comments', 'Vote Count', 'UpVote', 'News Details']} />

      <div className={classes.pagination}>
        <Pagination page={page} />
      </div>

      <div className={classes.chart}>
        <Chart />
      </div>
    </div>
  ) : (
        <div>
          <h2>No data to display</h2>
        </div>
      );
}

export default NewsContainer;