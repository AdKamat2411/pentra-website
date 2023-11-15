import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { Box, TextField, Avatar } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5000);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const [user, setUser] = useState(null);

  const handleClick = (event, name, row) => {
    setUser(row);
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleClickRoute = () => {
    window.location.href=`/influencer?influencer=$`
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h3">Conversations</Typography>

        <Card sx= {{ height: 60, width: 150, pt: 1.3, pl: 1.7, }} justifyContent="center" alignItems="center">
         
        <Stack direction="row" spacing={0} >
        
        <Avatar cursor="pointer" src={user?.avatarUrl} onClick={() => handleClickRoute()}/>

        <Stack sx={{ width: '100%' }} justifyContent="center" direction="row" spacing={1} alignItems="center" justifyContent="center">
            <a
            href="https://www.instagram.com/henrycavill/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
            <Iconify icon="mdi-instagram" style={{ color: 'black' }} />
            </a>
            <a
            href="https://www.youtube.com/@oliviarodrigo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
            <Iconify icon="mdi-youtube" style={{ color: 'black', width: 24, height: 24 }} />
            </a>
          </Stack>
          </Stack>
        </Card>

      </Stack>

      <Stack direction="row" spacing={3}>

      <Card sx={{ width: '35%', height: 600 }}>
        

        <Scrollbar>
    <TableContainer sx={{ overflow: 'auto', maxHeight: 'calc(100% - 52px)' }}> {/* Adjust the maxHeight according to your needs */}
            <Table sx={{  }}>
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name, row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Card sx={{ height: 600, width: '65%' }}>
 
          <Card sx = {{ width: '100%', height: 470}}>

          {/* CHAT PANEL  */}

            </Card>

          <Card sx={{ width: '100%', height: '130px', bgcolor: '#fffafa', borderRadius: '0 0 4px 4px'  }}>
      {/* The Box component here works as a flex container for the content inside the Card */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          '& > *': { // Targeting all immediate children of the Box
            flex: '1 0 auto', // This means "don't shrink, don't grow, and use auto basis"
          },
        }}
        
      >
          <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >
          
          

          <TextField 
      sx={{ 
        width: '80%', 
        '& .MuiOutlinedInput-root': { // targeting the outline of the input
          '& fieldset': { // targeting the fieldset element
            borderColor: 'primary.light', // assigning the color from the theme
          },
          '&:hover fieldset': {
            borderColor: 'primary.dark', // similar color manipulation for hover state
          },
          '&.Mui-focused fieldset': { // targeting the fieldset when input is focused
            borderColor: 'primary.main', // assigning a color when the field is in focus
          },
        },
      }}
      id="outlined-multiline-flexible"
      label=""
      multiline
      minRows={2}
      maxRows={3}
      variant="outlined" // ensure the variant is outlined to have a border to style
      mt={10}
    />
                    
          <Stack spacing={1}>
          
          <Button
        sx={{
          width: '42px', // Specified width
          minWidth: '90px', // Ensures the minimum width is respected
          height: '38px',
          backgroundColor: 'primary.dark',
          color: 'white',
          borderRadius: '10%',
          flexGrow: 0, // Added to prevent button growth
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        fontSize="28px"
        fontWeight={0}
        mt={5}
        mb={2}
        fontFamily="Old Standard TT"
      >
        Send
      </Button>

                    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: 'center', // Centers the content horizontally
        flexWrap: 'nowrap', // Prevents the buttons from wrapping
      }}
    >
      <Button
        sx={{
          width: '42px', // Specified width
          minWidth: '30px', // Ensures the minimum width is respected
          height: '30px',
          backgroundColor: 'white', // Set background color to white
          color: 'primary.light', // Set text color to primary color
          border: '1px solid', // Specify border thickness
          borderColor: 'primary.main', // Set border color to primary color
          borderRadius: '10%',
          flexGrow: 0, // Added to prevent button growth
          '&:hover': {
            backgroundColor: 'primary.main', // Optional: you can adjust for hover state color (lighter shade of primary color)
            // Remove the line below if you don't want to change the text color on hover
            color: 'white',
          },
        }}
        fontSize="24px"
        fontWeight={100}
        mt={5}
        mb={2}
        fontFamily="Old Standard TT"
      >
        📌
      </Button>

      <Button
        sx={{
          width: '42px', // Specified width
          minWidth: '30px', // Ensures the minimum width is respected
          height: '30px',
          backgroundColor: 'white', // Set background color to white
          color: 'primary.main', // Set text color to primary color
          border: '1.0px solid', // Specify border thickness
          borderColor: 'primary.main', // Set border color to primary color
          borderRadius: '10%',
          flexGrow: 0, // Added to prevent button growth
          '&:hover': {
            backgroundColor: 'primary.main', // Optional: you can adjust for hover state color (lighter shade of primary color)
            // Remove the line below if you don't want to change the text color on hover
            color: 'white',
          },
        }}
        fontSize="24px"
        fontWeight={100}
        mt={5}
        mb={2}
        fontFamily="Old Standard TT"
      >
        💸
      </Button>
    </Stack>

                    </Stack>
                    </Stack>  
                    </Box>

            </Card>



          </Card>
          </Stack>

    </Container>
  );
}
