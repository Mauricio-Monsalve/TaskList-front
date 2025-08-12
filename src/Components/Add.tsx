import { useTaskForm } from "../Contexts/TaskFormContext";
import Form from "./Form";

function Add() {
  const { viewForm, turnViewForm } = useTaskForm();

  return (
    <>
      <button
        type="button"
        className="bg-blue-400 self-start px-4 py-2 text-xl rounded-lg font-bold text-white hover:bg-blue-400/90 transition-colors cursor-pointer"
        onClick={turnViewForm}
      >
        Agregar
      </button>
      {viewForm && <Form />}
    </>
  );
}

export default Add;
