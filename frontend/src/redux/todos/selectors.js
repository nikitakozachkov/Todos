export const getAll = (state) => {
  if (state.filter !== "") {
    const normalizedFilter = state.todos.filter.toLowerCase();

    return state.todos.items.filter((todo) =>
      todo.title.toLowerCase().includes(normalizedFilter)
    );
  }

  return state.items;
};

export const getIsLoading = (state) => state.todos.isLoading;
