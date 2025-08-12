import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface TaskFormContextType {
  viewForm: boolean;
  turnViewForm: () => void;
}

const TaskFormContext = createContext<TaskFormContextType | undefined>(
  undefined
);

function TaskFormProvider({ children }: { children: ReactNode }) {
  const [viewForm, setViewForm] = useState(false);

  const turnViewForm = () => setViewForm((prev) => !prev);

  return (
    <TaskFormContext.Provider value={{ viewForm, turnViewForm }}>
      {children}
    </TaskFormContext.Provider>
  );
}

export function useTaskForm() {
  const context = useContext(TaskFormContext);
  if (!context)
    throw new Error("No puedes usar useTaskForm fuera de su provider");
  return context;
}

export default TaskFormProvider;
