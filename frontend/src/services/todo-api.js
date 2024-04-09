import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.baseURL = "https://todos-server-dm0p6zjbq-nikitakozachkovs-projects.vercel.app/api";

export async function getTodos() {
  const { data } = await axios.get("/todos");
  return data;
}

export async function getTodo(id) {
  const { data } = await axios.get(`/todos/${id}`);
  return data;
}

export async function addTodo(todo) {
  const { data } = await axios.post("/todos", todo);
  return data;
}

export async function deleteTodo(id) {
  const { data } = await axios.delete(`/todos/${id}`);
  return data;
}

export async function updateTodo(todo) {
  const { data } = await axios.put(`/todos/${todo.id}`, todo.formData);
  return data;
}

export async function updateTodoStatus(id, status) {
  const { data } = await axios.patch(`/todos/${id}`, status);
  return data;
}
