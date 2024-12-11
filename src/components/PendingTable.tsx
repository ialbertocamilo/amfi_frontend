// components/PendingTable.tsx
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import PaginatedComponent from "@/components/PaginationComponent";

import moment from "moment";
import { getProjectBids } from "@/api/projectApi";
interface TableRow {
  advertiser: string;
  projectName: string;
  bidDate: string;
  biddingCompanies: number;
  status: string;
}

const PendingTable: React.FC = () => {
  const headers = [
    { key: "advertiser", label: "Anunciante" },
    { key: "projectName", label: "Proyecto" },
    {
      key: "bidDate",
      label: "Fecha de licitación",
    },
    { key: "biddingCompanies", label: "Empresas licitando" },
    {
      key: "status",
      label: "Status",
    },
  ];

  const [data, setData] = useState<any[] | undefined>([]);
  useEffect(() => {
    getProjectBids().then((response) => {
      const formatted = response?.map((row: any) => ({
        ...row,
        status: getStatusClass(row.status),
      }));
      setData(formatted);
    });
  }, []);
  return (
    <div className="">
      <PaginatedComponent items={data as any[]} itemsPerPage={5} headers={headers} />
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return (
        <span
          className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center  bg-[#D3D3D3] text-[#FFFFFF]`}
        >
          En borrador
        </span>
      );
    case "inprogress":
      return (
        <span
          className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center bg-[#CCCEFF] text-[#000AFF]`}
        >
          En proceso
        </span>
      );
    case "revision":
      return (
        <span
          className={`py-1 px-3 rounded-md  font-bold flex items-center justify-center bg-[#FFEDDD] text-[#FF9C41]`}
        >
          Pendiente de revisión
        </span>
      );
    case "finished":
      return (
        <span
          className={`py-1 px-3 rounded-md font-bold flex items-center justify-center bg-[#CCF0EB] text-[#00B69B]`}
        >
          Finalizado
        </span>
      );
    case "closed":
      return (
        <span
          className={`py-1 px-3 rounded-md font-bold flex items-center justify-center bg-[#FF0000] text-[#FFFFFF]`}
        >
          Cerrado
        </span>
      );
    case "paused":
      return (
        <span
          className={`py-1 px-3 rounded-md font-bold flex items-center justify-center bg-[#FFA500] text-[#FFFFFF]`}
        >
      Pausado
    </span>
      );
    default:
      return "";
  }
};

export default PendingTable;