/* eslint-disable camelcase */
import { filter } from 'lodash';

import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box
} from '@material-ui/core';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// components
import { useDispatch, connect } from 'react-redux';
import { deleteAgent, getAgentListing } from '../../../actions/agent/agent';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../components/_dashboard/user';

import dummy from '../data';
import { useStyles } from './style';
import RowSkeleton from './RowSkeleton';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array = [], comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: '' }
];

const AgentList = ({
  handleAgentModal,
  agents: {
    loading,
    data: { rows: agents, count, total_page }
  }
}) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentListing(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = agents.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - agents?.length) : 0;

  const filteredUsers = applySortFilter(agents, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleDelete = (id) => {
    console.log(`id`, id);
    const updatedList = agents.filter((agent) => agent.id !== id);
    dispatch(deleteAgent(id, updatedList));
  };

  // if (loading) return <p>Loading</p>;
  // console.log(`filteredUsers`, filteredUsers);
  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Agents
        </Typography>
        <Button variant="contained" onClick={handleAgentModal} startIcon={<Icon icon={plusFill} />}>
          New Agent
        </Button>
      </Stack>
      <Card className={classes.card}>
        {/* <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={agents?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {loading ? (
                  <RowSkeleton />
                ) : (
                  // filteredUsers
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  agents &&
                  agents.map((row, index) => {
                    const { id, name, user_name, email, phone, phone_country_id } = row;
                    const { avatar } = dummy[1];
                    const isItemSelected = selected.indexOf(name) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, name)}
                          /> */}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{user_name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          +{phone_country_id}-{phone}
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu onClickDelete={() => handleDelete(id)} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Page>
  );
};

AgentList.propTypes = {
  agents: PropTypes.object,
  handleAgentModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: state.agents
});

export default connect(mapStateToProps)(AgentList);