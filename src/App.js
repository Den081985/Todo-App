// import logo from "./logo.svg";
// import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FIlterButton";
/*Объект для связи имен фильтров с поведением
Значения FILTER_MAP-это функции, которые мы будем использовать для фильтрации tasks массива данных:
В All фильтре показывает все задачи, поэтому мы возвращаем true для всех задач,
В Active фильтре показаны задачи , у которых completed реквизит false
В Completed фильтре показаны задачи , у которых completed реквизит true*/
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
//FILTER_NAMES-массив, который можно использовать для рендеринга всех трех фильтров.
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  //useState(props.tasks) сохранит начальное состояние tasks
  const [tasks, setTasks] = useState(props.tasks);

  //хук, который считывает и устанавливает фильтр
  const [filter, setFilter] = useState("All");

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

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  // taskList формируется из элементов,отфильтрованных по именам объекта FILTER_MAP[filter],которые соответствуют ключу состояния фильтра
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  //filterList-константа для сопоставления массива имен и возврата FilterButton компонента
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
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
      <div className="filters btn-group stack-exception">{filterList}</div>
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
