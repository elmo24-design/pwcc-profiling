import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  paper: {
     width: 600
  },
  total: {
     color: 'red'
  }
});


const DataTableSales = (
   { riceItems,
     v1Total,
     v2Total,
     v3Total,
     v4Total,
     v5Total,
     v6Total,
     v7Total,
     v8Total,
     v9Total,
     v10Total,
     v11Total,
     v12Total,
     v13Total
   }
   ) => {

  const classes = useStyles();

  function createData(variety, total) {
      return { variety, total };
  }
 
   const rows = [
      createData('Unli Rice', v1Total.toFixed(2)),
      createData('Chezka', v2Total.toFixed(2)),
      createData('Butter Cup', v3Total.toFixed(2)),
      createData('Gandang Dinurado', v4Total.toFixed(2)),
      createData('24 Hours', v5Total.toFixed(2)),
      createData('Gandang Buhay', v6Total.toFixed(2)),
      createData('Star Gazer', v7Total.toFixed(2)),
      createData('Sinandomeng', v8Total.toFixed(2)),
      createData('Gold Cup', v9Total.toFixed(2)),
      createData('Malagkit', v10Total.toFixed(2)),
      createData('Thailand', v11Total.toFixed(2)),
      createData('Smart Choice', v12Total.toFixed(2)),
      createData('Don Frank', v13Total.toFixed(2))
   ];

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Variety</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.variety}
              </TableCell>
              <TableCell align="right" className={classes.total}>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTableSales