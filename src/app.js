import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const usersArray = [];
const tweetsArray = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar || !(typeof username == "string") || !(typeof avatar == "string")){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const novoUser = {username, avatar};
    usersArray.push(novoUser);
    res.status(201).send("OK");
    console.log(usersArray);
});

app.post("/tweets", (req, res) => {
    const {tweet} = req.body;
    const username = req.headers.user;
    const autorizacao = usersArray.find(user => user.username == username);
    if (!autorizacao){
        return res.status(401).send("UNAUTHORIZED");
    }; 
    if (!username || !tweet || !(typeof username == "string") || !(typeof tweet == "string")){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const novoTweet = {username, avatar: autorizacao.avatar, tweet};
    tweetsArray.unshift(novoTweet);
    res.status(201).send("OK");
    console.log(tweetsArray);
});

app.get("/tweets", (req, res) => {
    let  { page } = req.query; 
    if (page == undefined){
        page = 1;
    }
    const ultimos = []; 
    if (page < 1){
        return res.status(400).send("Informe uma página válida!");
    }
    for (let i=(page-1)*10; i < tweetsArray.length; i++){
        if (ultimos.length < 10){
            ultimos.push(tweetsArray[i]);
        } else{
            break;
        }
    }
    console.log('agora');
    console.log(page);
    console.log(ultimos);
    res.send(ultimos);
});

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params;
    const tweetsUser = tweetsArray.filter(tweet => {
        if (tweet.username == username){
            return true;
        }
    });
    res.send(tweetsUser);
})

const porta = 5005;
app.listen(porta, () => console.log(`Rodando em http://localhost:${porta}`));