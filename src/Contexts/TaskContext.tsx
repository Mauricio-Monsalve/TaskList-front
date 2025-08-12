import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { TaskType } from '../types';

interface TaskContextType {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, 'id' | 'completada' | 'borrada'>) => Promise<void>;
  checkTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('http://localhost:3000/task');
      const loadedTasks = await response.json() as TaskType[];
      // const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    }
    fetchTasks();
  }, []);

  const addTask: TaskContextType['addTask'] = async (task) => {
    
    try {
      const response = await fetch('http://localhost:3000/task',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const newTask = await response.json() as TaskType
  
      const updatedTasks = [...tasks, newTask]
      setTasks(updatedTasks)
    } catch (error) {
      console.error(error)
      alert('Ocurrio un error al agregar la tarea')
    }
    
    // const newTask: TaskType = {
    //   id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
    //   titulo,
    //   descripcion,
    //   completada: false,
    //   borrada: false,
    // };
    // const updatedTasks = [...tasks, newTask];
    // setTasks(updatedTasks);
    // await saveTasks(updatedTasks);
  };

  const checkTask: TaskContextType['checkTask'] = async (id) => {

    try {
      const response = await fetch(`http://localhost:3000/task/${id}`,{
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      })
      const checkedTask = await response.json() as TaskType
  
      const updatedTask = tasks.map(task => task.id == checkedTask.id ? checkedTask : task)
  
      setTasks(updatedTask)
    } catch (error) {
      console.error(error)
      alert('Error al marcar la tarea')
    }


    // const index = tasks.findIndex((task) => task.id === id);
    // if (index === -1) return alert('Error al marcar la tarea');
    // const updatedTasks = [...tasks];
    // updatedTasks[index].completada = !updatedTasks[index].completada;
    // setTasks(updatedTasks);
    // await saveTasks(updatedTasks);
  };

  const deleteTask: TaskContextType['deleteTask'] = async (id) => {

    try {
      const response = await fetch(`http://localhost:3000/task/${id}`,{
        method: 'DELETE'
      })
      const tareaBorrada = await response.json() as TaskType

      const updatedTask = tasks.filter( tarea => tarea.id !== tareaBorrada.id )

      setTasks(updatedTask)

    } catch (error) {
      console.error(error)
      alert('Ocurrio un error al borrar la tarea')
    }

    // const index = tasks.findIndex((task) => task.id === id);
    // if (index === -1) return alert('Error al borrar la tarea');
    // const updatedTasks = [...tasks];
    // updatedTasks[index].borrada = true;
    // setTasks(updatedTasks);
    // await saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, checkTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('No puede usar useTask si no estas dentro del TaskProvider');
  return context;
}

export default TaskProvider;