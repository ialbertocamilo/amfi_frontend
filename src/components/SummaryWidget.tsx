// components/SummaryWidget.tsx
import React from 'react';

interface SummaryWidgetProps {
  title: string;
  count: number;
  link: string;
  icon: string;
}

const SummaryWidget: React.FC<SummaryWidgetProps> = ({ title, count, link, icon }) => {
  return (

    <div className="bg-white rounded-lg h-200px w-100px p-4">
      <div className="flex h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-3xl font-bold">{count}</p>
                    <a href={link} className="text-black-500 no-underline">Ver todos</a>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <img src={icon} alt="Description" className="w-2/3 h-2/3 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default SummaryWidget;
