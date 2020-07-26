import React from 'react';
import NewsContainer from './newsContainer';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from './navbar';
import Footer from './footer';
import Advertisement from './advertisement';

const useStyles = makeStyles(theme => ({
  layout: {
    fontFamily: 'Verdana, Geneva, sans-serif',
    color: '#828282',
    fontSize: '0.7rem',
    margin: theme.spacing(1),
    width: '98%',
  }
}));

// parent app component
const App = ({ match }) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <NavBar />
      <Advertisement />
      <NewsContainer page={(match && parseInt(match.params.page)) || 0} />
      <Footer />
    </div>
  );
}

export default App;