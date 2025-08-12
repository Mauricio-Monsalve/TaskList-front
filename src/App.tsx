import Add from "./Components/Add";
import Task from "./Components/Task";
import { useTask } from "./Contexts/TaskContext";

function App() {
  const { tasks } = useTask();

  return (
    <div className="p-10 flex flex-col space-y-6">
      <h1 className="font-bold text-5xl self-center text-blue-500">TaskList</h1>
      <Add />
      <ul className="flex flex-col space-y-2">
        {tasks.map((tareaDato, index) => {
          return (
            <li key={index}>
              <Task tareaProp={tareaDato} />
            </li>
          );
          // if (!tareaDato.borrada)
        })}
      </ul>
    </div>
  );
}

export default App;
