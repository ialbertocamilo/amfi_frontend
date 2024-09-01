// components/PendingTable.tsx
import React from 'react';
import { useTable, Column } from 'react-table';

interface TableRow {
  anunciante: string;
  proyecto: string;
  fecha: string;
  empresas: number;
  status: string;
}

const data: TableRow[] = [
  { anunciante: 'Gloria', proyecto: '6096 Marjolaine Landing', fecha: '12.09.2019 - 12:53 PM', empresas: 42, status: 'Completado' },
  { anunciante: 'Coca Cola', proyecto: '6096 Marjolaine Landing', fecha: '12.09.2019 - 12:53 PM', empresas: 13, status: 'Pendiente' },
  { anunciante: 'Mr. Beans', proyecto: '6096 Marjolaine Landing', fecha: '12.09.2019 - 12:53 PM', empresas: 23, status: 'Proceso' },
  { anunciante: 'Backus', proyecto: '6096 Marjolaine Landing', fecha: '12.09.2019 - 12:53 PM', empresas: 23, status: 'Creado' },
];

const columns: Column<TableRow>[] = [
  {
    Header: 'Anunciante',
    accessor: 'anunciante',
  },
  {
    Header: 'Proyecto',
    accessor: 'proyecto',
  },
  {
    Header: 'Fecha de licitación',
    accessor: 'fecha',
  },
  {
    Header: 'Empresas licitando',
    accessor: 'empresas',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <span className={`py-1 px-3 rounded-md text-white font-bold flex items-center justify-center ${getStatusClass(value)}`}>{value}</span>
    ),
  },
];

const PendingTable: React.FC = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead className="bg-[#F1F4F9]">
          {headerGroups.map((headerGroup: any) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th key={column.id} {...column.getHeaderProps()} className="py-2 px-4 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td key={cell.column.id} {...cell.getCellProps()} className="py-2 px-4 border-b">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completado':
      return 'bg-[#CCF0EB] text-[#00B69B]';
    case 'pendiente':
      return 'bg-[#FFF0CC] text-[#D49500]';
    case 'proceso':
      return 'bg-[#FFEDDD] text-[#FF9C41]';
    case 'creado':
      return 'bg-[#CCCEFF] text-[#000AFF]';
    default:
      return '';
  }
};

export default PendingTable;