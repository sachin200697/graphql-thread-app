import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Todo from './Todo';

const getTodoWithUser = gql`
    query SKQuery {
        getTodos {
            id,
            title,
            user {
                name, age, id
            }
        }
    }
`;

export default function GraphQL() {
    const {loading, error, data} = useQuery(getTodoWithUser);

    if(loading) return <div><h4>...loading</h4></div>;
    if(error) return <div><h4>Some error occured {error.message}</h4></div>;

    console.log(data);
  return (
    <div>
      <Todo todos={data.getTodos} />
    </div>
  );
}
