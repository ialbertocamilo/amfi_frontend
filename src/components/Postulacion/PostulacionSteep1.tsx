import Input from "@/components/inputs/Input";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import RequiredTag from "../Proyecto/RequiredTag";
import { toast } from "react-hot-toast";
import { createSectionValidator, createFormValidator } from "@/utils/validationUtils";
import { useEffect } from "react";
import { IDirector } from "@/interfaces/director.interface";
import { getAllDirectorByProductionHouse } from "@/api/directorApi";

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
  director?: IDirector
  directors?: IDirector[]
}

const PostulacionSteep1 = ({
  formData,
  handleChange,
  handleSubmit,
  activeTab,
  setactiveTab,directors,
  director
}: registroEntity) => {
  const router = useRouter();


  const validatePresupuesto = createSectionValidator(formData, 'presupuesto', {
    total: "Total del presupuesto",
    personal: "Personal",
    preYPro: "Pre y pro",
    talento: "Talento",
    equipo: "Equipo",
    setLocacion: "Set-locación",
    viajes: "Viajes",
    digital: "Digital",
    fotoFija: "Foto fija",
    postProduccion: "Post producción",
    markUp: "Mark up %"
  });

  const validateBidLetter = createSectionValidator(formData, 'bidLetter', {
    produccionDias: "Días de producción",
    produccionCiudad: "Ciudad de producción",
    produccionVersiones: "Versiones de producción",
    locacionDias: "Días de locación",
    locacionVersiones: "Versiones de locación",
    foroDias: "Días de foro",
    foraneoDias: "Días foráneos"
  });

  const validateCrew = createSectionValidator(formData, 'crew', {
    direccion: "Dirección",
    direccionFotografia: "Dirección de fotografía",
    produccionEjecutiva: "Producción ejecutiva",
    cantidadTotal: "Cantidad total"
  });

  const validateEquipo = createSectionValidator(formData, 'equipo', {
    camara: "Cámara",
    optica: "Óptica",
    general: "General",
    especializado: "Especializado"
  });

  const validateFields = createFormValidator([
    validatePresupuesto,
    validateBidLetter,
    validateCrew,
    validateEquipo
  ]);

  const handleNext = (nextTab: string) => {
    if (validateFields()) {
      handleSubmit(nextTab);
    }
  };

  const redirect = () => {
    router.push("/lista-de-proyectos");
  };

  const calculateTotal = () => {
    const {
      personal = 0,
      preYPro = 0,
      talento = 0,
      equipo = 0,
      setLocacion = 0,
      viajes = 0,
      digital = 0,
      fotoFija = 0,
      postProduccion = 0,
      markUp = 0
    } = formData.presupuesto;

    const subtotal = Number(personal) + Number(preYPro) + Number(talento) + 
                    Number(equipo) + Number(setLocacion) + Number(viajes) + 
                    Number(digital) + Number(fotoFija) + Number(postProduccion);
    
    const markupAmount = subtotal * (Number(markUp) / 100);
    return subtotal + markupAmount;
  };

  useEffect(() => {
    handleChange({
      target: {
        name: 'presupuesto.total',
        value: calculateTotal()
      }
    });
  }, [
    formData.presupuesto.personal,
    formData.presupuesto.preYPro,
    formData.presupuesto.talento,
    formData.presupuesto.equipo,
    formData.presupuesto.setLocacion,
    formData.presupuesto.viajes,
    formData.presupuesto.digital,
    formData.presupuesto.fotoFija,
    formData.presupuesto.postProduccion,
    formData.presupuesto.markUp
  ]);

  return (
    <div className="space-y-2">
      <div className="mb-8 bg-white shadow-md rounded  p-6">
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
            required
            disabled
          />
          <br />
          <div>
            <h2 className="text-1xl font-semibold mb-4">Rubros</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={"Personal"}
                type={"number"}
                name={"presupuesto.personal"}
                value={formData.presupuesto.personal}
                onChange={handleChange}
                required
              />

              <Input
                label={"Pre y pro"}
                type={"number"}
                name={"presupuesto.preYPro"}
                value={formData.presupuesto.preYPro}
                onChange={handleChange}
                required
              />
              <Input
                label={"Talento"}
                type={"number"}
                name={"presupuesto.talento"}
                value={formData.presupuesto.talento}
                onChange={handleChange}
                required
              />
              <Input
                label={"Equipo"}
                type={"number"}
                name={"presupuesto.equipo"}
                value={formData.presupuesto.equipo}
                onChange={handleChange}
                required
              />
              <Input
                label={"Set-locación"}
                type={"number"}
                name={"presupuesto.setLocacion"}
                value={formData.presupuesto.setLocacion}
                onChange={handleChange}
                required
              />
              <Input
                label={"Viajes"}
                type={"number"}
                name={"presupuesto.viajes"}
                value={formData.presupuesto.viajes}
                onChange={handleChange}
                required
              />
              <Input
                label={"Digital"}
                type={'number'}
                name={"presupuesto.digital"}
                value={formData.presupuesto.digital}
                onChange={handleChange}
                required
              />
              <Input
                label={"Foto fija"}
                type={"number"}
                name={"presupuesto.fotoFija"}
                value={formData.presupuesto.fotoFija}
                onChange={handleChange}
                required
              />
              <Input
                label={"Post producción"}
                type={"number"}
                name={"presupuesto.postProduccion"}
                value={formData.presupuesto.postProduccion}
                onChange={handleChange}
                required
              />
              <Input
                label={"Mark up %"}
                type={"percentage"}
                name={"presupuesto.markUp"}
                value={formData.presupuesto.markUp}
                onChange={handleChange}
                required
              />
            </div>

          </div>
        </div>
        <br />

        {/* Sección Proyecto */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Proyecto</h2>
          <h4 className="text-1xl font-semibold mb-4">Producción</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={"Días"}
              type={"text"}
              name={"bidLetter.produccionDias"}
              value={formData.bidLetter.produccionDias}
              onChange={handleChange}
              required
            />
            <Input
              label={"Ciudad"}
              type={"text"}
              name={"bidLetter.produccionCiudad"}
              value={formData.bidLetter.produccionCiudad}
              onChange={handleChange}
              required
            />
            <Input
              label={"Versiones"}
              type={"text"}
              name={"bidLetter.produccionVersiones"}
              value={formData.bidLetter.produccionVersiones}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <h4 className="text-1xl font-semibold mb-4">Locación</h4>
          <div className="grid grid-cols-2 gap-4">

            <Input
              label={"Días"}
              type={"text"}
              name={"bidLetter.locacionDias"}
              value={formData.bidLetter.locacionDias}
              onChange={handleChange}
              required
            />
            <Input
              label={"Versiones"}
              type={"text"}
              name={"bidLetter.locacionVersiones"}
              value={formData.bidLetter.locacionVersiones}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <h4 className="text-1xl font-semibold mb-4">Foro</h4>
          <div className="grid grid-cols-2 gap-4">

          <Input
              label={"Días"}
              type={"text"}
              name={"bidLetter.foroDias"}
              value={formData.bidLetter.foroDias}
              onChange={handleChange}
              required
            />
          </div>
          
          <br />
          <h4 className="text-1xl font-semibold mb-4">Foráneo</h4>
          <div className="grid grid-cols-2 gap-4">

          <Input
              label={"Días"}
              type={"text"}
              name={"bidLetter.foraneoDias"}
              value={formData.bidLetter.foraneoDias}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />

        {/* Sección Crew */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Crew</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Dirección <RequiredTag /></label>
              <select
                className="border p-2 w-full rounded-lg"
                name="crew.direccion"
                value={formData.crew.direccion?.id || ""}
                onChange={(e) => {
                  const selectedDirector = directors?.find(dir => dir.id === e.target.value);
                  handleChange({
                    target: {
                      name: "crew.direccion",
                      value: selectedDirector || ""
                    }
                  });
                }}
              >
                <option value="">Seleccione un director</option>
                {directors?.map((dir: IDirector) => (
                  <option key={dir.id} value={dir.id}>
                    {dir.name} {dir.lastname}
                  </option>
                ))}
              </select>
                <span className={`block text-sm ${
                formData.crew.direccion?.id === director?.id
                  ? 'text-green-500 font-medium flex items-center gap-1' 
                  : 'text-gray-500'
                }`}>
                Director sugerido: {director?.name} {director?.lastname}
                {formData.crew.direccion?.id === director?.id && 
                  <FaCheck className="inline-block" size={12} />
                }
                </span>
            </div>
            <div>
              <label>Dirección de fotografía <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.direccionFotografia"
                value={formData.crew.direccionFotografia}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Producción ejecutiva <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.produccionEjecutiva"
                value={formData.crew.produccionEjecutiva}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Descripción adicional </label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="crew.descripcionOpcional"
                value={formData.crew.descripcionOpcional}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Cantidad total <RequiredTag /></label>
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

        <br />
        {/* Sección Equipo */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Equipo</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Cámara <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.camara"
                value={formData.equipo.camara}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Óptica <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.optica"
                value={formData.equipo.optica}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>General <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.general"
                value={formData.equipo.general}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Especializado <RequiredTag /></label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg"
                name="equipo.especializado"
                value={formData.equipo.especializado}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <label>Descripción adicional </label>
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
              onClick={() => handleNext("2")}
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