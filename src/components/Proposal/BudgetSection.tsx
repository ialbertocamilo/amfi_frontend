import { formatToMxn } from "@/lib/utils";

interface BudgetItemProps {
    label: string;
    value: string | number;
  }
  
  function BudgetItem({ label, value }: BudgetItemProps) {

    
    return (
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  }
  
  export function BudgetSection({data}:{data:any}) {

    return (
      <div className="p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Desglose de Presupuesto</h2>
        <div className="space-y-2">
          <div className="p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-500">{formatToMxn(data?.presupuesto?.total)}</span>
              </div>
            </div>
          </div>
          <BudgetItem label="Personal" value={data?.presupuesto?.personal} />
          <BudgetItem label="Pre y Pro" value={data?.presupuesto?.preYPro} />
          <BudgetItem label="Talento" value={data?.presupuesto?.talento} />
          <BudgetItem label="Equipo" value={data?.presupuesto?.equipo}/>
          <BudgetItem label="Set/Locación" value={data?.presupuesto?.setLocacion} />
          <BudgetItem label="Viajes" value={data?.presupuesto?.viajes}/>
          <BudgetItem label="Digital" value={data?.presupuesto?.digital} />
          <BudgetItem label="Foto Fija" value={data?.presupuesto?.fotoFija}/>
          <BudgetItem label="Post Producción" value={data?.presupuesto?.postProduccion} />
            <BudgetItem label="Mark Up (15%)" value={data?.presupuesto?.markUp} />
        </div>
      </div>
    );
  }