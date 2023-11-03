import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateTodo } from "redux/todos/actions";
import { getTodo } from "services/todo-api";
import styles from "./EditTodo.module.css";

export const EditTodo = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const [currentValues, setCurrentValues] = useState({});
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await getTodo(id);

        setCurrentValues(todo);
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    };

    fetchTodo();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      const formData = new FormData();

      formData.append("cover", form.elements.cover.files[0]);
      formData.append("title", form.elements.title.value.trim());
      formData.append("description", form.elements.description.value.trim());
      formData.append("category", form.elements.category.value.trim());
      formData.append("deadline", form.elements.deadline.value.trim());

      form.reset();

      const data = { id, formData };

      toast.success("Successfully updated")
      dispatch(updateTodo(data));
      onClose();
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleFileInputChange = (event) => {
    setFileName(event.currentTarget.files[0].name);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label>
        Cover
        <div className={styles.cover}>
          {fileName ? fileName : "Select image"}
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="cover"
          onChange={handleFileInputChange}
        />
      </label>

      <label>
        Title
        <input
          type="text"
          maxLength="20"
          name="title"
          defaultValue={currentValues.title}
          required
        />
      </label>

      <label>
        Description
        <textarea
          maxLength="63"
          name="description"
          defaultValue={currentValues.description}
        />
      </label>

      <label>
        Category
        <input
          type="text"
          maxLength="20"
          name="category"
          defaultValue={currentValues.category}
          required
        />
      </label>

      <label>
        Deadline
        <input
          type="date"
          name="deadline"
          defaultValue={currentValues.deadline}
        />
      </label>

      <div className={styles.controls}>
        <button type="submit">Continue</button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
