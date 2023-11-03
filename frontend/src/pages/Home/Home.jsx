import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getIsLoading, getAll } from "redux/todos/selectors";
import { getTodos } from "redux/todos/actions";
import { setFilter } from "redux/todos/slice";
import { Modal } from "components/Modal/Modal";
import { TodoList } from "components/TodoList/TodoList";
import { AddTodo } from "components/Modal/AddTodo/AddTodo";
import { Loading } from "components/Loading/Loading";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();

  const todos = useSelector(getAll);
  const isLoading = useSelector(getIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch(getTodos());
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = async (event) => {
    try {
      dispatch(setFilter(event.currentTarget.value));
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleFilterChange = (event) => {
    setCategoryValue(event.currentTarget.value);
  };

  const categories = [];

  todos.map(({ category }) => {
    if (!categories.includes(category)) {
      categories.push(category);
    }

    return false;
  });

  return (
    <>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="enter the title"
          onChange={handleInputChange}
          className={styles.item}
        />

        <select className={styles.item} onChange={handleFilterChange}>
          <option value="All">All</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={styles.item}
          onClick={handleClickModal}
        >
          Add todo
        </button>
      </div>

      {isLoading && <Loading />}

      {todos.length !== 0 ? (
        <TodoList categoryValue={categoryValue} />
      ) : (
        <p className={styles.text}>There is no todos yet.</p>
      )}

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleClickModal}>
          <AddTodo onClose={handleClickModal} />
        </Modal>
      )}
    </>
  );
}

export default Home;
