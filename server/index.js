import express, { json } from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import axios from 'axios';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        // we need to give the Schema defenition
        // id is type of ID and it is mandatory(using ! we can mark it mandatory),
        typeDefs: `                          
            type User {
                id: ID!, 
                name: String,
                age: Int
            }

            type Todo {
                id: ID!, 
                title: String,
                completed: Boolean,
                userId: ID!
                user: User
            }  

            type Query {
                getTodos: [Todo],                
                getUsersFromServer: [User],
                getUserFromServer(id: ID!): User
            }           
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    const response = await axios.get(`http://localhost:7000/users/${todo.userId}`);
                    return response.data;
                }
            },
            Query: {
                getTodos: ()=>[{id:1, title:'Play cricket', completed: false, userId: 2}],                
                getUsersFromServer: async ()=>{
                    const response = await axios.get('http://localhost:7000/users');
                    return response.data;
                },
                getUserFromServer: async (parent, {id}) => {
                    const response = await axios.get(`http://localhost:7000/users/${id}`);
                    return response.data;
                }
            },            
        }
    });
    app.use(express.json());
    app.use(cors());

    await server.start();

    // when we type localhost:9000/graphql -> it gives graphql UI to run queries
    app.use("/graphql", expressMiddleware(server));

    app.listen(9000, ()=>{
        console.log('Server started at 9000');
    })
}

startServer();


