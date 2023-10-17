import { useState } from "react";
import { useSelector } from "react-redux";
import { getAll } from "redux/todos/selectors";
import { Modal } from "components/Modal/Modal";
import { DeleteTodo } from "components/Modal/DeleteTodo/DeleteTodo";
import { EditTodo } from "components/Modal/EditTodo/EditTodo";
import { TodoControls } from "components/TodoControls/TodoControls";
import styles from "./TodoList.module.css";

export const TodoList = ({ categoryValue }) => {
  const todos = useSelector(getAll);

  const [modalTitle, setModalTitle] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = (title, id) => {
    setModalTitle(title);
    setItemId(id);
    setIsModalOpen(!isModalOpen);
  };

  if (categoryValue !== "All") {
    const results = todos.filter((todo) => todo.category === categoryValue);

    return (
      <ul className={styles.list}>
        {results.map(
          ({ _id, cover, title, description, category, deadline }) => (
            <li key={_id} className={styles.item}>
              {cover && (
                <div className={styles.cover}>
                  <img
                    src={`http://localhost:4000/${cover}`}
                    height="180"
                    alt={title}
                  />
                </div>
              )}

              <div className={styles.info}>
                <h2>{title}</h2>

                <p>
                  Description: {description ? description : "No description"}
                </p>

                <p>Category: {category}</p>

                <p>Deadline: {deadline ? deadline : "No deadline"}</p>
              </div>

              <TodoControls handleModalClick={handleModalClick} id={_id} />
            </li>
          )
        )}

        {isModalOpen && (
          <Modal isModalOpen={isModalOpen} onClose={handleModalClick}>
            {modalTitle === "Delete" && (
              <DeleteTodo onClose={handleModalClick} />
            )}

            {modalTitle === "Edit" && <EditTodo onClose={handleModalClick} />}
          </Modal>
        )}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map(({ _id, cover, title, description, category, deadline }) => (
        <li key={_id} className={styles.item}>
          {cover && (
            <div className={styles.cover}>
              <img
                src={`http://localhost:4000/${cover}`}
                height="180"
                alt={title}
              />
            </div>
          )}

          <div className={styles.info}>
            <h2>{title}</h2>

            <p>Description: {description ? description : "No description"}</p>

            <p>Category: {category}</p>

            <p>Deadline: {deadline ? deadline : "No deadline"}</p>
          </div>

          <TodoControls handleModalClick={handleModalClick} id={_id} />
        </li>
      ))}

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleModalClick}>
          {modalTitle === "Delete" && (
            <DeleteTodo onClose={handleModalClick} id={itemId} />
          )}

          {modalTitle === "Edit" && (
            <EditTodo onClose={handleModalClick} id={itemId} />
          )}
        </Modal>
      )}
    </ul>
  );
};
