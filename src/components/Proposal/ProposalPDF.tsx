import { ICompany } from '@/interfaces/company.interface';
import React from 'react';
import { BidLetterSection } from './BidLetterSection';
import { BudgetSection } from './BudgetSection';
import { CrewSection } from './CrewSection';
import { DeliverableSection } from './DeliverableSection';
import { EquipmentSection } from './EquipmentSection';
import './ProposalPDF.css';
import { ReportHeader } from './ReportHeader';

const ProposalPDF: React.FC<{ data: any, productionHouse: ICompany | undefined }> = ({ data, productionHouse }) => (
  <div className="content ">
    <div className="w-full border border-gray-200 rounded-md ">
      <ReportHeader productionHouse={productionHouse} />
      <div className="sections">
      <BudgetSection data={data} />
      <BidLetterSection data={data} />
      <CrewSection data={data} />
      <EquipmentSection data={data} />
      <DeliverableSection data={data} />
      </div>
    </div>
  </div>
);

export default ProposalPDF;