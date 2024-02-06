import express from 'express';
import cors from 'cors';

const app = express();


app.get('/users', (req, res)=>{
    const todos = [
        {
            id: 1, 
            name: "Sachin",
            age: 19
        },
        {
            id: 2, 
            name: "Pradeep",
            age: 18
        },
        {
            id: 3, 
            name: "Naman",
            age: 16
        }
    ]
    res.json(todos);
});


app.get('/users/:id', (req, res)=>{
    const todos = [
        {
            id: 1, 
            name: "Sachin",
            age: 19
        },
        {
            id: 2, 
            name: "Pradeep",
            age: 18
        },
        {
            id: 3, 
            name: "Naman",
            age: 16
        }
    ]    
    let user = todos.filter(todo=>(todo.id==req.params.id))[0];    
    res.json(user);
});

app.listen(7000, ()=>console.log('listening on port 7000'));