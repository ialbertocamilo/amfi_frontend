import React, { useCallback, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ContextMenu from "@/components/ContextMenu";

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
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const endOffset = page * itemsPerPage;
        const startOffset = endOffset - itemsPerPage;
        setCurrentItems(items.slice(startOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [page, items, itemsPerPage]);

    const handlePageChange = useCallback(
        (event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
        },
        []
    );

    return (
        <div className="flex-1 overflow-auto">
            <div className="flex-1 overflow-auto z-50">
                <TableContainer component={Paper} className="sm:h-screen h-screen">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-50">
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((item, index) => (
                                    <TableRow className="cursor-pointer hover:bg-gray-100" key={index}>
                                        {headers.map((header, headerIndex) => (
                                            <TableCell
                                                key={headerIndex}
                                                onClick={header.key !== "action" ? () => view && view(item.id) : undefined}
                                            >
                                                {item[header.key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Stack spacing={4} alignItems="center" className="m-2 p-2" marginTop={4}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                />
            </Stack>
        </div>
    );
};

export default React.memo(PaginatedComponent);