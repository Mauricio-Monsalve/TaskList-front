import type { TaskType } from '../types';

const STORAGE_KEY = 'tasks';

export async function getTasks(): Promise<TaskType[]> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer tareas de localStorage:', error);
    return [];
  }
}

export async function saveTasks(tasks: TaskType[]): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar tareas en localStorage:', error);
  }
}
