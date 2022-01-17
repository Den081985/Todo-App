import React, { useState, useRef, useEffect } from "react";
import { usePrevious } from "./utils";

export default function Todo(props) {
  //хук useState используем для хранения состояния редактируемых элементов, где
  //isEditing-первоначальное состояеие,равное false по умолчанию
  const [isEditing, setEditing] = useState(false);
  //хук для хранения состояния редактируемого поля
  const [newName, setNewName] = useState("");
  //функция,устанавливающая новое значение newName

  /*useRef возвращает изменяемый объект ref, .current свойство которого инициализируется переданным 
  аргументом ( initialValue). Возвращенный объект будет сохраняться в течение всего срока службы 
  компонента.*/
  //ссылки для кнопки «Редактировать» в шаблоне представления и  для поля редактирования в шаблоне редактирования.
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  //константа отслеживает предыдущее значение isEditing
  const wasEditting = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }
  //функция для обработки onSubmit события формы редактирования
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  //две структуры шаблонов — «редактирование» и «просмотр», — определенные внутри двух отдельных констант.
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  /* useEffect  запускается после того, как React отрисовывает данный компонент, и будет запускать
 любые побочные эффекты, которые мы хотели бы добавить в процесс рендеринга, которые мы не можем
  запустить внутри основного тела функции. */
  //useEffect()принимает функцию в качестве аргумента; эта функция выполняется после рендеринга компонента.
  /*Эти изменения делают так, что, если isEditingэто правда, React считывает текущее значение 
  editFieldRef и перемещает на него фокус браузера. Мы также передаем массив в useEffect()качестве
   второго аргумента. Этот массив представляет собой список значений , от которых useEffect()должно зависеть.  */
  useEffect(() => {
    if (!wasEditting && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditting && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditting, isEditing]);

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
