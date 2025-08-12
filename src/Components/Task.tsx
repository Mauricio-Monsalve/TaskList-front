import { useState } from "react";
import { useTask } from "../Contexts/TaskContext";
import type { TaskType } from "../types";

interface CheckBoxProps {
  completeHook: {
    completada: boolean;
    turnComplete: () => void;
  };
}

const CheckBox = ({
  completeHook: { completada, turnComplete },
}: CheckBoxProps) => {
  return (
    <div
      className="w-10 aspect-square bg-blue-100 flex border-2 border-blue-300 rounded-md cursor-pointer justify-center items-center overflow-hidden select-none"
      onClick={turnComplete}
    >
      {completada && (
        <img
          src="/icons/check.svg"
          alt="check"
          className="w-full bg-blue-300"
        />
      )}
    </div>
  );
};

interface TaskProps {
  tareaProp: TaskType;
};

function Task({ tareaProp }: TaskProps) {
  const { titulo, descripcion, completada, id } = tareaProp;
  const [more, setMore] = useState(false);
  const { checkTask, deleteTask } = useTask();

  const turnComplete = () => {
    checkTask(id);
  };

  const copyTask = async () => {
    const copiable = `${titulo}:\n${descripcion}`;
    try {
      await navigator.clipboard.writeText(copiable);
      alert("Tarea copiada en el portapapeles");
    } catch (error) {
      console.error(error)
      alert("Ocurrió un error al copiar en el portapapeles");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex space-x-4 items-center rounded-lg">
      <CheckBox completeHook={{ completada, turnComplete }} />
      <div
        className={`${
          completada ? "line-through opacity-50 " : ""
        }flex flex-col w-full select-none cursor-pointer`}
        onClick={() => setMore((prev) => !prev)}
      >
        <span className="font-bold text-xl">{titulo}</span>
        <p className={`text-sm ${more ? "line-clamp-none" : "line-clamp-2"}`}>
          {descripcion}
        </p>
      </div>
      <button
        type="button"
        className="w-10 p-1 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex justify-center items-center rounded-md select-none"
        onClick={() => deleteTask(id)}
      >
        <img src="/icons/trash.svg" className="w-full" alt="borrar" />
      </button>
      <button
        type="button"
        className="w-10 p-1 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex justify-center items-center rounded md select-none"
        onClick={copyTask}
      >
        <img src="/icons/copy.svg" className="w-full" alt="copiar" />
      </button>
    </div>
  );
}

export default Task;
