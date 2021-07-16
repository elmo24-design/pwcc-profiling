import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const columns = [
  { id: 'quantity', label: 'Quantity', minWidth: 170 },
  { id: 'amtPerKg', label: 'Amount (Per Kg)', minWidth: 100 },
  {
    id: 'variety',
    label: 'Variety',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
//   {
//     id: 'actions',
//     label: 'Actions',
//     minWidth: 170,
//     align: 'right',
//   },
];



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const DataTableItems = ({riceItems, setEditItemModal,handleDeleteItem}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = riceItems

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }} 
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {
             rows.length !== 0 ?
               <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                     return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                           {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                 <>
                                    <TableCell key={column.id} align={column.align}>
                                       {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                 </>
                              );
                           })}
                          <TableCell>
                              <div className='icon-actions'>
                                 <div className="icon-action" onClick={() => setEditItemModal(row)}>
                                    <EditIcon />
                                 </div>
                                 <div className="icon-action" onClick={() => handleDeleteItem(row)}>
                                    <DeleteIcon />
                                 </div>
                              </div>
                           </TableCell>
                        </TableRow>
                     );
                  })}
              </TableBody>
              :
              <TableBody>
                 <p className="items">No Items here yet</p>
              </TableBody>
          }
         
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTableItems;