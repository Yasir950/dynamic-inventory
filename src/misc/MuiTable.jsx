import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { EditIcon, DeleteIcon, EyeIcon, ExportIcon } from 'assets/images/users/Svg';
import { Divider, FormControl, InputAdornment, OutlinedInput, Stack } from '@mui/material';
import { ExportBtn } from 'styled/styled';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updatedData } from 'redux/slices/userSlice';
import { deleteItem } from 'apiservices';
import { toast } from 'react-toastify';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FCFCFD',
    color: '#667085',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

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



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, col } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {col.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  
  const { numSelected, nam, exportBtn , search} = props;
 
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', color: "#101828", fontSize: "18px", fontWeight: 500 }}
          id="tableTitle"
          component="div"
        >
          {nam}
        </Typography>
      )}
     
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction={'row'}>
        <Tooltip title="Filter list">
          <IconButton sx={{width:"100px"}}>
            <FilterListIcon />
            <Typography
              sx={{  color: "#101828", fontSize: "18px", fontWeight: 500 }}
              id="tableTitle"
              component="div"
            >
              Filter
            </Typography>
          </IconButton>
        </Tooltip>

          <ExportBtn
        onClick={exportBtn}
        
      >
        <Stack direction={'row'} alignContent={'center'} justifyContent={'center'} spacing={1}>
        <ExportIcon/>
       <Typography sx={{fontSize:'14px', fontWeight:500}}>
       Export
        </Typography> 
        </Stack>
       </ExportBtn>
       <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 210 }, height: '50px', background: '#ffffff' }}>
        <OutlinedInput
        onChange={search}
          size="small"
          id="header-search"
          sx={{ borderRadius: '6px'}}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          placeholder="Search"
        />
      </FormControl>
    </Box>
        </Stack>
      )}
       
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function MuiTable({ name, column, rows, view , url, getUsers }) {
  const dispatch = useDispatch()
  const [filteredRows, setFilteredRows] = React.useState([]); // Initialize as empty array

  React.useEffect(() => {
    setFilteredRows(rows); // Update filteredRows when rows change
  }, [rows]);
 
  const handleExport = () => {
    const headers = column.map((col) => col.label).join(',');
    const data = rows.map((row) =>
      Object.values(row)
        .filter((_, index) => index !== 0) // Skip 'id' if unnecessary
        .join(',')
    );
    const csvContent = [headers, ...data].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name.replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
      const filtered = rows.filter((row) => 
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query) // Adjust field names as necessary
        )
      );
      setFilteredRows(filtered); // Update state with filtered rows
    };
    
    const visibleRows = React.useMemo(
      () =>
        [...filteredRows]
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [filteredRows, order, orderBy, page, rowsPerPage]
    );
  
  const handleEdit = (row) => {
    dispatch(updatedData(row))
  };

  const handleDelete = async (id) => {
    console.log(url)
   let res= await deleteItem(url,id)
   if(res === 204){
    getUsers();
    toast.error("user deleted successfully");
   }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar numSelected={selected.length} nam={name} exportBtn={handleExport} search={handleSearch}/>
      <Divider/>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead
            col={column}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            rows={rows}
          />

          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = selected.includes(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  {Object.keys(row).map((key, keyIndex) => {
                     // Skip 'id' if it's used for selection only
                    return (
                      <>
                      <TableCell
                        key={keyIndex}
                      >
                  {key !== 'images' ?       row[key] : <img src='https://picsum.photos/seed/picsum/info' alt='' width={'35px'} height={'35px'}/>}
                      </TableCell>
                      
                      </>
                    );
                  })}
                  <TableCell>
                    <button className='cursor-pointer' onClick={() => handleDelete(row.id ? row.id : row.cid)} style={{ background: "none", border: '0px' }}>
                      <DeleteIcon />
                    </button>
                    {/* <button className='cursor-pointer' onClick={() => view()} style={{ background: "none", border: '0px' }}>
                      <EyeIcon />
                    </button> */}
                    <button className='cursor-pointer' onClick={() => handleEdit(row)} style={{ background: "none", border: '0px' }}>
                      <EditIcon />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Box>
  );
}