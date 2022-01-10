import React, { useState } from "react";

function Form(props) {
  //Используя хук  useState создаем начальное состояние и функцию-модификатор состояния setName
  const [name, setName] = useState("");
  //при изменении состояния ввода,вызывается setName
  function handleChange(e) {
    setName(e.target.value);
  }
  //функция handleSubmit срабатывает при отправке формы
  function handleSubmit(e) {
    if (name === "") {
      e.preventDefault();
      //props.addTask("You need to fill input!");
      setName("");
    }
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
