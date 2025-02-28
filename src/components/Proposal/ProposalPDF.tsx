import { ICompany } from '@/interfaces/company.interface';
import React from 'react';
import { ProjectSection } from './BidLetterSection';
import { BudgetSection } from './BudgetSection';
import { CrewSection } from './CrewSection';
import { DeliverableSection } from './DeliverableSection';
import { EquipmentSection } from './EquipmentSection';
import { FilesSection } from './FilesSection';
import './ProposalPDF.css';
import { ReportHeader } from './ReportHeader';

const ProposalPDF: React.FC<{ data: any, productionHouse: ICompany | undefined, files?: any }> = ({ data, productionHouse, files }) => (
  <div className="content ">
    <div className="w-full border border-gray-200 rounded-md ">
      <ReportHeader productionHouse={productionHouse} />
      <div className="sections">
        <BudgetSection data={data} />
        <ProjectSection data={data} />
        <CrewSection data={data} />
        <EquipmentSection data={data} />
        <DeliverableSection data={data} />
        <FilesSection data={files} />
      </div>
    </div>
  </div>
);

export default ProposalPDF;