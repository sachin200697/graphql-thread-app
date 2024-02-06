## Documentation

https://www.apollographql.com/docs/react

## Installation

npm i @apollo/server graphql

we can open qraphql UI:

## Query 

query SKQuery($getUserId: ID!) {
  getTodos {
    id,
    title,
    user {
      name, age, id
    }
  }
  getUsersFromServer {
    id, name, age
  }

  getUserFromServer(id: $getUserId) {
    id,name
  }
}


query SK {
  getMyTodos {
    name
  }
}

query TodoFromServer {
  getTodoFromServer {
    id, title, completed
  }
}


## Graphql client side

npm i @apollo/client graphql