import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
import images from '../assets/images/index';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  // return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
  return <Box component="img" src={images.common.mainLogo} sx={{ width: 40, height: 40, ...sx }} />;
}
