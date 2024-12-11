import Input from "@/components/inputs/Input";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
}

const PostulacionSteep1 = ({
  formData,
  handleChange,
  handleSubmit,
  activeTab,
  setactiveTab,
}: registroEntity) => {
  const router = useRouter();
  const redirect = () => {
    router.push("/lista-de-proyectos");
  };


  return (
    <div className="space-y-8 p-4">
      <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
        <div className="tabs flex justify-center space-x-10">
          <button
            onClick={() => setactiveTab("1")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 1 ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {Number(activeTab) >= 1 ? <FaCheck /> : "1"}
          </button>
          <button
            onClick={() => setactiveTab("2")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 2 ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {Number(activeTab) >= 2 ? <FaCheck /> : "2"}
          </button>

          <button
            onClick={() => setactiveTab("3")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 3 ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {Number(activeTab) >= 3 ? <FaCheck /> : "3"}
          </button>

          <button
            onClick={() => setactiveTab("4")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 4 ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {Number(activeTab) >= 4 ? <FaCheck /> : "4"}
          </button>
        </div>
<br />
        {/* Sección Presupuesto */}
        <div>
          <h2 className="text-2xl flex font-semibold mb-4">Presupuesto</h2>
          <Input
            label={"Total"}
            type={"number"}
            name={"presupuesto.total"}
            value={formData.presupuesto.total}
            onChange={handleChange}
          />
          <br />
          <div>
            <h2 className="text-1xl font-semibold mb-4">Rubros</h2>

            <div className="grid grid-cols-4 gap-4">
              <Input
                label={"Personal"}
                type={"number"}
                name={"presupuesto.personal"}
                value={formData.presupuesto.personal}
                onChange={handleChange}
              />

              <Input
                label={"Pre y pro"}
                type={"number"}
                name={"presupuesto.preYPro"}
                value={formData.presupuesto.preYPro}
                onChange={handleChange}
              />
              <Input
                label={"Talento"}
                type={"number"}
                name={"presupuesto.talento"}
                value={formData.presupuesto.talento}
                onChange={handleChange}
              />
              <Input
                label={"Equipo"}
                type={"number"}
                name={"presupuesto.equipo"}
                value={formData.presupuesto.equipo}
                onChange={handleChange}
              />
              <Input
                label={"Set-locación"}
                type={"number"}
                name={"presupuesto.setLocacion"}
                value={formData.presupuesto.setLocacion}
                onChange={handleChange}
              />
              <Input
                label={"Viajes"}
                type={"number"}
                name={"presupuesto.viajes"}
                value={formData.presupuesto.viajes}
                onChange={handleChange}
              />
              <Input
                label={"Digital"}
                type={'number'}
                name={"presupuesto.digital"}
                value={formData.presupuesto.digital}
                onChange={handleChange}
              />
              <Input
                label={"Foto fija"}
                type={"number"}
                name={"presupuesto.fotoFija"}
                value={formData.presupuesto.fotoFija}
                onChange={handleChange}
              />
              <Input
                label={"Post producción"}
                type={"number"}
                name={"presupuesto.postProduccion"}
                value={formData.presupuesto.postProduccion}
                onChange={handleChange}
              />
              <Input
                label={"Mark up %"}
                type={"number"}
                name={"presupuesto.markUp"}
                value={formData.presupuesto.markUp}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
        <br />

        {/* Sección Bid Letter */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Bid Letter</h2>
          <h2 className="text-1xl font-semibold mb-4">Dias</h2>
          <div className="grid grid-cols-4 gap-4">
            <Input
              label={"Producción"}
              type={"text"}
              name={"bidLetter.produccion"}
              value={formData.bidLetter.produccion}
              onChange={handleChange}
            />
            <Input
              label={"Locación"}
              name={"bidLetter.locacion"}
              value={formData.bidLetter.locacion}
              onChange={handleChange}
            />
            <Input
              label={"Foro"}
              name={"bidLetter.foro"}
              value={formData.bidLetter.foro}
              onChange={handleChange}
            />
            <Input
              label={"Foráneo"}
              type={"text"}
              name={"bidLetter.foraneo"}
              value={formData.bidLetter.foraneo}
              onChange={handleChange}
            />
            <Input
              label={"Ciudad"}
              type={"text"}
              name={"bidLetter.ciudad"}
              value={formData.bidLetter.ciudad}
              onChange={handleChange}
            />
            <Input
              label={"Versiones"}
              type={"text"}
              name={"bidLetter.version"}
              value={formData.bidLetter.version}
              onChange={handleChange}
            />
            <Input
              label={"Descripción"}
              type={"text"}
              name={"bidLetter.descripcion"}
              value={formData.bidLetter.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Sección Crew */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Crew</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Dirección</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.direccion"
                value={formData.crew.direccion}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Dirección de fotografía</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.direccionFotografia"
                value={formData.crew.direccionFotografia}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Producción ejecutiva</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.produccionEjecutiva"
                value={formData.crew.produccionEjecutiva}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-3">
              <label>Descripción (Opcional)</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.descripcionOpcional"
                value={formData.crew.descripcionOpcional}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Cantidad total</label>
              <input
                type="number"
                className="border p-2 w-full rounded-lg"
                name="crew.cantidadTotal"
                value={formData.crew.cantidadTotal}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Sección Equipo */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Equipo</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Cámara</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.camara"
                value={formData.equipo.camara}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Óptica</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.optica"
                value={formData.equipo.optica}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>General</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.general"
                value={formData.equipo.general}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Especializado</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.especializado"
                value={formData.equipo.especializado}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <label>Descripción adicional</label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.descripcionAdicional"
                value={formData.equipo.descripcionAdicional}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              onClick={() => redirect()}
            >
              Atras
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => handleSubmit("2")}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostulacionSteep1;