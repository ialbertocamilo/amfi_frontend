import { ICompany } from "@/interfaces/company.interface";

interface ReportHeaderProps {
  productionHouse: ICompany | undefined;
}

export function ReportHeader({ productionHouse }: ReportHeaderProps) {
  return (
    <div className="bg-gray-600 text-white p-6 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Propuesta de {productionHouse?.name}</h1>

        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">Reporte generado</p>
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
