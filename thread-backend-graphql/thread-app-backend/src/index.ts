import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'

async function init() {
    const app = express();    
    const gqlServer = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!,
                name: String,                
            }

            type Query {
                getUser(id: Int): [User]
            }
        `,
        resolvers: {
            Query: {
                getUser: (_, {id}: {id: Number})=>{
                    /*
                    query Thread($id: Int) {
                        getUser(id: $id) {
                            id, name
                        }
                    }
                    */
                    return [{id: 1, name: 'hello'}, {id:2, name:'naman'}].filter(item=>item.id===id);
                }
            }
        }
    });

    const port = Number(process.env.PORT) || 9000;
    await gqlServer.start();    

    app.use(express.json());
    app.use('/graphql', expressMiddleware(gqlServer));
    app.get('/', (req, res)=>{
        res.send("Server is up and running");
    })
    
    app.listen(port, ()=>{
        console.log('Listening at port', port);
        
    })
}

init();