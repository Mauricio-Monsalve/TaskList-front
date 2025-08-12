import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'
import TaskProvider from './Contexts/TaskContext';
import TaskFormProvider from './Contexts/TaskFormContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <TaskFormProvider>
        <App />
      </TaskFormProvider>
    </TaskProvider>
  </StrictMode>
);