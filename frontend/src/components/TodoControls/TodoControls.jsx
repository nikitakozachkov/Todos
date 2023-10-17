import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodoStatus } from "redux/todos/actions";
import { getTodo } from "services/todo-api";
import styles from "./TodoControls.module.css";

export const TodoControls = ({ handleModalClick, id }) => {
  const dispatch = useDispatch();

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await getTodo(id);

        setIsButtonActive(todo.isDone);
      } catch {
        return alert("Something went wrong, please try later");
      }
    };

    fetchTodo();
  }, [id]);

  const handleModalButtonClick = (event) => {
    handleModalClick(event.currentTarget.innerHTML, id);
  };

  const handleActiveButtonClick = async () => {
    try {
      setIsButtonActive(!isButtonActive);

      const status = {
        isDone: !isButtonActive,
      };

      dispatch(updateTodoStatus({ id, status }));
    } catch {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <div className={styles.controls}>
      <button type="button" className={styles.button} onClick={handleModalButtonClick}>
        Delete
      </button>

      <button type="button" className={styles.button} onClick={handleModalButtonClick}>
        Edit
      </button>

      <button
        type="button"
        onClick={handleActiveButtonClick}
        className={isButtonActive ? `${styles.button} ${styles.active}` : styles.button}
      >
        Mark as done
      </button>
    </div>
  );
};
