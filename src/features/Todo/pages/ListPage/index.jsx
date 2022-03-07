import TodoForm from 'features/Todo/components/TodoForm';
import React, { useState } from 'react';

function ListPage(props) {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: 'a',
      status: 'new',
    },
    {
      id: 2,
      title: 'b',
      status: 'new',
    },
    {
      id: 3,
      title: 'b',
      status: 'new',
    },
  ]);

  const handleSubmit = (data) => {
    const newTodo = {
      id: todoList.length + 1,
      title: data.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };
  return (
    <>
      <TodoForm onSubmit={handleSubmit} />

      <ul>
        {todoList.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

ListPage.propTypes = {};

export default ListPage;
