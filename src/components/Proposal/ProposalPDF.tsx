import React from 'react';
import './ProposalPDF.css';
import { ReportHeader } from './ReportHeader';
import { BudgetSection } from './BudgetSection';
import { BidLetterSection } from './BidLetterSection';
import { CrewSection } from './CrewSection';
import { EquipmentSection } from './EquipmentSection';

const ProposalPDF: React.FC<{data:any}> = ({data}:{data:any}) => (
  <div className="container">
    <div className="content w-3/4">
      <div className="card w-full">
      <ReportHeader />
      <div className="sections">
        <BudgetSection data={data}/>
        <BidLetterSection data={data}/>
        <CrewSection data={data}/>
        <EquipmentSection data={data}/>
      </div>
      </div>
    </div>
  </div>
);

export default ProposalPDF;