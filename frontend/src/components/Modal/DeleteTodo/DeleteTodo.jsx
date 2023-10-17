import { useDispatch } from "react-redux";
import { deleteTodo } from "redux/todos/actions";
import styles from "./DeleteTodo.module.css";

export const DeleteTodo = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    try {
      onClose();
      dispatch(deleteTodo(id));
    } catch {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <p className={styles.text}>
        Are you sure that you want to delete this todo?
      </p>

      <div className={styles.controls}>
        <button type="button" onClick={handleButtonClick}>
          Continue
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};
