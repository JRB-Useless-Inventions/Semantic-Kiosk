import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection, AfterInsert, Entity} from "typeorm";
import {Semantics} from "./entity/Semantics";
import * as cors from 'cors'
const words = ["LOUD", "QUIET", "SOFT", "HARD", "LOVELY", "BAD", "GOOD"]
import * as WebSocket from 'ws'
import emitter from './emitters'


const wss = new WebSocket.Server({ port: 8080 });
 


createConnection().then(async connection => {
    const semanticRepo = connection.getRepository(Semantics);
    for(var index in words){
        let wrd = await semanticRepo.findOne({label: words[index]});
        if(!wrd){
            wrd = new Semantics()
        }
        
        wrd.label = words[index]
        wrd.hits = 0
        await semanticRepo.save(wrd);
    }
    
    wss.on('connection', async function connection(ws) {
        var data = await semanticRepo.find({ order: {
            label: "ASC"
        }})
        
        ws.send(JSON.stringify(data))
        
        emitter.on('update', async function (args) {
            var data = await semanticRepo.find({order : {
                label: "ASC"
            }})
            ws.send(JSON.stringify(data))
    
        });
    });

    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())

    const timber = semanticRepo.find()
    // register routes

    app.get("/api/v1", async function(req: Request, res: Response) {
        const buttons = await semanticRepo.find({ order: {
            label: "ASC"
        }});
        
        res.json(buttons);
    });

    app.post("/api/v1", async function(req: Request, res: Response) {
                
        const hit = await semanticRepo.findOne({where : {label : req.body.label}});
        console.log(hit);
        
        
        if(!hit){
            res.sendStatus(404)
        }else{
            hit.hits++;
            semanticRepo.save(hit)            
            res.sendStatus(200);
        }

    });

    // start express server
    app.listen(4000);
});