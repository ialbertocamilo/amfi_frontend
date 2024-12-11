import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Pagination } from '@mui/material';

interface PaginatedComponentProps {
  items?: any[];
  itemsPerPage: number;
  headers: { key: string; label: string }[];
  view?: (id: string) => void;

  [key: string]: any;
}

const PaginatedComponent: React.FC<PaginatedComponentProps> = ({
                                                                 items = [],
                                                                 itemsPerPage,
                                                                 headers,
                                                                 view,
                                                                 ...props
                                                               }) => {
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  useEffect(() => {
    const endOffset = (page + 1) * rowsPerPage;
    const startOffset = endOffset - rowsPerPage;
    setCurrentItems(items.slice(startOffset, endOffset));
  }, [page, items, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex-1">
      <Paper>
      <TableContainer className={''} component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow className="bg-gray-50">
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-700"
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow
                className=" cursor-pointer hover:bg-gray-100 "
                key={index}
              >
                {headers.map((header, headerIndex) => (
                  <TableCell
                    key={headerIndex}
                    onClick={header.key !== 'action' ? () => view && view(item.id) : undefined}
                  >
                    {item[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
        {/*<Pagination count={10} page={page} />*/}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /></Paper>
    </div>
  );
};

export default React.memo(PaginatedComponent);