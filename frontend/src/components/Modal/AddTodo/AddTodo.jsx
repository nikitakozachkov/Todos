import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "redux/todos/actions";
import toast from "react-hot-toast";
import styles from "./AddTodo.module.css";

export const AddTodo = ({ onClose }) => {
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState(null);

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

      toast.success("Successfully added");
      dispatch(addTodo(formData));
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
        <input type="text" maxLength="20" required name="title" />
      </label>

      <label>
        Description
        <textarea maxLength="63" name="description" />
      </label>

      <label>
        Category
        <input type="text" maxLength="20" required name="category" />
      </label>

      <label>
        Deadline
        <input type="date" name="deadline" />
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
