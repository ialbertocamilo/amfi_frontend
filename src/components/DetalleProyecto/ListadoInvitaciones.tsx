import { Evaluation, InvitedDirectorsResponse } from "@/api/interface/api.interface";

interface ListadoInvitacionesProps {
  invitationData: InvitedDirectorsResponse;
  setEvaluation: React.Dispatch<React.SetStateAction<Evaluation | null>>;
  setBidId: React.Dispatch<React.SetStateAction<string | null>>;
  showComponent: (componentName: "list" | "evaluation" | "comparison") => void;
  formData: any;
  handleItemClick: () => void;
  sendReminder: () => void;
  closeProject: () => void;
}

const ListadoInvitaciones = ({
  invitationData,
  setEvaluation,
  setBidId,
  showComponent,
  formData,
  handleItemClick,
  sendReminder,
  closeProject,
}: ListadoInvitacionesProps) => {
  const getStatusColor = (status: boolean | null) => {
    switch (status) {
      case false:
        return "bg-red-200 text-red-800";
      case true:
        return "bg-green-200 text-green-800";
      default:
        return "bg-teal-200 text-teal-800";
    }
  };
  const getStatusName = (status: boolean | null) => {
    switch (status) {
      case false:
        return "Rechazado";
      case true:
        return "Aceptado";
      default:
        return "Pendiente";
    }
  };

  return (
    <>
      <div className="pb-4">
        <h2 className="text-lg font-medium mb-4">
          Casas Productoras invitadas
        </h2>
        <ul>
          {invitationData.result?.map((casa, index) => (
            <div
              key={index}
              className={`h-24 flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-300 mt-4 ${
                casa.proposalUploaded ? "cursor-pointer" : ""
              }`}
              onClick={casa.proposalUploaded ? handleItemClick : undefined}
            >
              <span className="text-gray-800 font-medium">
                {" "}
                {casa.productionHouse?.name}
              </span>
              <div className="flex items-center space-x-20">
                <span
                  className={`pl-5text-sm font-semibold px-3 py-1 rounded-md ${getStatusColor(
                    casa?.accepted
                  )}`}
                >
                  {getStatusName(casa?.accepted)}
                </span>
                <button
                  onClick={() => {handleItemClick(), setEvaluation(casa.evaluation), setBidId(casa.id)}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &gt;
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Notification Section */}
      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg flex justify-between items-center">
        <p className="text-xs">
          Se enviará un correo electrónico recordando a los participantes que no
          hayan aceptado aún su participación o los que no hayan completado la
          postulación.
        </p>
        <button
          className="text-xs text-red-500 hover:text-red-600 font-semibold"
          onClick={() => sendReminder()}
        >
          Enviar recordatorio
        </button>
      </div>

      {/* Close Call Section */}
      <div className="flex justify-start pt-4">
        {formData?.estado !== "Cerrado" && (
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
            onClick={() => closeProject()}
          >
            Cerrar Convocatoria
          </button>
        )}
      </div>
    </>
  );
};

export default ListadoInvitaciones;
