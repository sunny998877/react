import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper
    backgroundColor: '#fff'
  },
  listWrapper: {},
  btnWapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));
