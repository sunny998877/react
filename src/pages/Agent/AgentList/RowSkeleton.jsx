import React from 'react';
import { Skeleton, Typography, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const array = new Array(5).fill(1).map((value, index) => ({
  id: index + 1
}));

const RowSkeleton = () => {
  const classes = useStyles();
  const skeletons = array.map((id) => (
    <TableRow key={id}>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography component="div">
          <Skeleton animation="wave" className={classes.skeleton} />
        </Typography>
      </TableCell>
    </TableRow>
  ));

  return skeletons;
};
export default RowSkeleton;

export const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: '100%',
    height: 50
  }
}));
