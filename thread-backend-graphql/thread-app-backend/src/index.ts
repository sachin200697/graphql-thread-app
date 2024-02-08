import express from 'express';
import {expressMiddleware} from '@apollo/server/express4'
import createAndStartGraphqlServer from './graphql/server';
import prismaClient from './lib/db';
import { UserService } from './graphql/services/UserService';

async function init() {
    const app = express();  
    const gqlServer = await createAndStartGraphqlServer();  
   
    const port = Number(process.env.PORT) || 9000;
    app.use(express.json());
    app.use('/graphql', expressMiddleware(gqlServer, {context: async ({req})=>{
        // @ts-ignore
        const token = req.headers["token"] as string;                            
        const user = UserService.decodeJWTToken(token);
        return user;
    }}));
    app.get('/', (req, res)=>{
        res.send("Server is up and running");
    })
    
    app.listen(port, ()=>{
        console.log('Listening at port', port);
        
    })
}

init();