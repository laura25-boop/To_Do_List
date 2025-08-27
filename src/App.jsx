import { useState } from 'react';
import './App.css';

const ToDo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Nuevo estado para saber qué tarea se edita

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnClick = () => {
    if (inputValue.trim() === "") return; 

    if (editIndex !== null) {
      // Si estamos editando, actualizamos la tarea
      const updatedTodos = todos.map((todo, i) =>
        i === editIndex ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null); // Salir del modo edición
    } else {
      // Si no estamos editando, añadimos nueva tarea
      setTodos([...todos, { text: inputValue, done: false }]);
    }

    setInputValue("");
  };

  const handleDelete = (index) => {
    const updateTodos = todos.filter((todo, i) => i !== index);
    setTodos(updateTodos);
    if (editIndex === index) {
      setInputValue("");
      setEditIndex(null);
    }
  };

  const toggleDone = (index) => {
    const updateTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updateTodos);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].text); // Cargar el texto en el input
    setEditIndex(index); // Guardar qué tarea estamos editando
  };

  return (
    <div className='container'>
      <h2>Lista de Tareas</h2>
      <div className='container__input'>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleOnChange} 
        />
        <button className='btn-add' onClick={handleOnClick}>
          {editIndex !== null ? "Actualizar" : "Añadir"}
        </button>
      </div>

      <ul>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <li 
              key={index} 
              className={todo.done ? "done" : ""}
              onClick={() => toggleDone(index)}
            >
              {todo.done ? "✔ " : "○ "} {todo.text}
              
              <button 
                className='btn-edit'
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(index);
                }}
              >
                Editar
              </button>

              <button 
                className='btn-delete' 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDelete(index); 
                }}
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay tareas aún</p>
        )}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;