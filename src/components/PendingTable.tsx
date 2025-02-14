// components/PendingTable.tsx
import { getProjectBids } from "@/api/projectApi";
import PaginatedComponent from "@/components/PaginationComponent";
import ProjectStatusText from "@/components/inputs/ProjectStatusText";
import { ProjectStatus } from "@/mappers/project.mapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface TableRow {
  id: string;
  advertiser: string;
  projectName: string;
  bidDate: string;
  biddingCompanies: number|string;
  status: React.ReactNode;
}

const PendingTable: React.FC = () => {
  const router = useRouter();
  const headers = [
    { key: "advertiser", label: "Anunciante" },
    { key: "agency", label: "Agencia" },
    { key: "projectName", label: "Proyecto" },
    {
      key: "bidDate",
      label: "Entrega de propuesta",
    },
    { key: "biddingCompanies", label: "Empresas licitando" },
    {
      key: "status",
      label: "Status",
    },
  ];

  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    getProjectBids().then((response) => {
      const inProgressBids = response?.filter((row: any) =>
        row.status.toLowerCase() === ProjectStatus.InProgress
      );

      const formatted = inProgressBids?.map((row: any) => ({
        id: row.id || "-",
        advertiser: row.advertiser || "-",
        agency: row.agency || "-",
        projectName: row.projectName || "-",
        bidDate: row.bidDate || "-",
        biddingCompanies: row.biddingCompanies || "-",
        status: getStatusClass(row.status),
      }));
      setData(formatted || []);
    });
  }, []);

  const handleView = (id: string) => {
    router.push(`/detalle-proyecto?id=${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <PaginatedComponent
        items={data}
        itemsPerPage={5}
        headers={headers}
      />
    </div>
  );
};

const getStatusClass = (status: string) => {
  return <ProjectStatusText status={status as ProjectStatus} />;
};

export default PendingTable;