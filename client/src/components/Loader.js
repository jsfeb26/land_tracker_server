import React from 'react';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, LinearProgress } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullPage: {
    height: '200px'
  },
  progress: {
    width: '100%'
  }
};

export const Linear = withStyles(styles)(({ classes }) => (
  <div className={classes.container}>
    <LinearProgress color="secondary" className={classes.progress} />
  </div>
));

export const Circular = withStyles(styles)(
  ({ classes, fullPage, large, small }) => {
    let size = 40;
    if (large) size = 100;
    if (small) size = 20;

    return (
      <div
        className={classnames(classes.container, {
          [classes.fullPage]: fullPage
        })}
      >
        <CircularProgress
          color="secondary"
          size={size}
          className={classes.progress}
        />
      </div>
    );
  }
);
