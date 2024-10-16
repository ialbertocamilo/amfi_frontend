// components/PendingTable.tsx
import React, {useEffect, useState} from 'react';
import {Column} from 'react-table';
import {api} from "@/lib/api";
import PaginatedComponent from "@/components/PaginationComponent";

interface TableRow {
    advertiser: string;
    projectName: string;
    bidDate: string;
    biddingCompanies: number;
    status: string;
}


const PendingTable: React.FC = () => {


    const headers = [{key: 'advertiser', label: 'Anunciante'}, {key: 'projectName', label: 'Proyecto'}, {
        key: 'bidDate', label: 'Fecha de licitación'
    }, {key: 'biddingCompanies', label: 'Empresas licitando'}, {
        key: 'status', label: 'Status'
    }];

    const [data, setData] = useState([])
    useEffect(() => {
        api.get('/project/bids').then(response => {
            const transformed = response.data.map((row: any) => ({...row, status: getStatusClass(row.status)}))

            setData(transformed)
        })
    }, []);
    return (<div className="overflow-x-auto">
        <PaginatedComponent items={data} itemsPerPage={5} headers={headers}/>
    </div>);
};

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'draft':
            return <span
                className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center bg-[#FFF0CC] text-[#D49500]`}>En borrador</span>
        case 'inprogress':
            return <span
                className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center bg-[#CCCEFF] text-[#000AFF]`}>En proceso</span>
        case 'revision':
            return <span
                className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center bg-[#FFEDDD] text-[#FF9C41]`}>Pendiente de revisión</span>
        case 'finished':
            return <span
                className={`py-1 px-3 rounded-md font-bold flex items-center justify-center bg-[#CCF0EB] text-[#00B69B]`}>Finalizado</span>
        case 'closed':
            return <span
                className={`py-1 px-3 rounded-md font-bold flex items-center justify-center bg-[#FF0000] text-[#FFFFFF]`}>Cerrado</span>
        default:
            return '';
    }
};

export default PendingTable;