import { useEffect, useState } from 'react';

/**
 * Componente App - Gestor de tareas
 * 
 * Componente principal que permite crear, visualizar y eliminar tareas.
 * Se conecta con una API REST en el backend para persistir los datos.
 * 
 * @component
 * @returns {JSX.Element} Interfaz de gestión de tareas
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  /** @constant {string} API_URL - URL base de la API de tareas */
  const API_URL = 'http://localhost:3000/tasks';

  /**
   * Obtiene todas las tareas del servidor
   * 
   * Realiza una solicitud GET a la API para recuperar la lista completa
   * de tareas y actualiza el estado local con los datos recibidos.
   * 
   * @async
   * @function getTasks
   * @returns {Promise<void>}
   */
  const getTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  /**
   * Crea una nueva tarea en el servidor
   * 
   * Valida que el título no esté vacío, envía una solicitud POST a la API
   * con los datos de la nueva tarea, limpia el campo de entrada y actualiza
   * la lista de tareas.
   * 
   * @async
   * @function createTask
   * @returns {Promise<void>}
   */
  const createTask = async () => {
    if (!title) return;

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    setTitle('');
    getTasks();
  };

  /**
   * Elimina una tarea del servidor
   * 
   * Realiza una solicitud DELETE a la API para eliminar la tarea con el ID
   * especificado y actualiza la lista de tareas local.
   * 
   * @async
   * @function deleteTask
   * @param {string|number} id - ID único de la tarea a eliminar
   * @returns {Promise<void>}
   */
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    getTasks(); // refresca lista
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      {/* Campo de entrada para el título de la nueva tarea */}
      <input
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Botón para agregar la nueva tarea */}
      <button onClick={createTask}>Agregar</button>

      {/* Lista de tareas */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? '✅' : '❌'}
            
            {/* Botón para eliminar la tarea */}
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: 10 }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;