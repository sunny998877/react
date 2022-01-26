import React from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// components
import Page from '../../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfilePasswordChange from './ProfilePasswordChange/ProfilePasswordChange';

const UserProfile = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Button variant="contained">Edit</Button>
        </Stack> */}

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Profile</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileForm />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfilePasswordChange />
          </AccordionDetails>
        </Accordion>
      </Container>
    </Page>
  );
};

export default UserProfile;
