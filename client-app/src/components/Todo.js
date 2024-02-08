import React from 'react';
import User from './User';

export default function Todo({todos}) {
    const renderTodo = () => {
        return todos.map(todo=>{
            return (<div key={todo.id}>
                <h1>{todo.title}</h1>
                <User user={todo.user} />
            </div>);
        })
    }
  return (
    <div>
      {renderTodo()}
    </div>
  );
}
