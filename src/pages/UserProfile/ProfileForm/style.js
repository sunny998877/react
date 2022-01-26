import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  formContainer: {},
  btnWapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    height: 300,
    width: 250,
    background: '#ddd',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    cursor: 'pointer',
    '& input': {
      display: 'none'
    }
  },
  imagePreview: {
    height: 300,
    width: `100%`,
    objectFit: 'contain'
  }
});
