// import logo from "./logo.svg";
// import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FIlterButton";
function App(props) {
  //useState(props.tasks) сохранит начальное состояние tasks
  const [tasks, setTasks] = useState(props.tasks);
  //toggleTaskCompleted функция-реквизит служит для обновления состояния массива задач при переключении флажков инпутов
  function toggleTaskCompleted(id) {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTask);
  }

  //deleteTask - функция-реквизит для удаления задач из списка
  //формирует массив с помощью filter из тех задач id которых не равен переданному в параметр
  function deleteTask(id) {
    const remainigTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainigTasks);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));
  //функция addTask-функция-реквизит обратного вызова,используется как реквизит в Form для добавления новой задачи
  //nanoid -библиотека для генерации случайных идентификаторов,добавлена для того чтобы id не совпадали
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  //headingText - для отображения актуального количества задач
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
