import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const usersArray = [];
const tweetsArray = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;
    const novoUser = {username, avatar};
    usersArray.push(novoUser);
    res.send("OK");
    console.log(usersArray);
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const autorizacao = usersArray.find(user => user.username == username);
    if (!autorizacao){
        return res.send("UNAUTHORIZED");
    }; 
    const novoTweet = {username, avatar: autorizacao.avatar, tweet};
    tweetsArray.push(novoTweet);
    res.send("OK");
    console.log(tweetsArray);
});

app.get("/tweets", (req, res) => {
    const ultimos = []; 
    for (let i = tweetsArray.length-1; i>=0; i--){
        if (ultimos.length < 10){
            ultimos.push(tweetsArray[i]);
        } else{
            break;
        }
    }
    res.send(ultimos);
});

const porta = 5005
app.listen(porta, () => console.log(`Rodando em http://localhost:${porta}`));