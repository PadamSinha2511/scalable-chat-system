import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host:'redis-3a9b3309-scaleable-chat-app.a.aivencloud.com',
    port:14820,
    username:'default',
    password:'AVNS_5eMB2JbsbXF4cYarl48'
});
const sub = new Redis({
    host:'redis-3a9b3309-scaleable-chat-app.a.aivencloud.com',
    port:14820,
    username:'default',
    password:'AVNS_5eMB2JbsbXF4cYarl48'
});


class SocketService{
    private _io:Server;

    constructor()
    {
        console.log("Init socket server")
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
        });

        sub.subscribe('MESSAGES')
    }

    public initListener()
    {
        const io = this._io;
        console.log("Init event listners")
        io.on('connect',(socket)=>{
            console.log("New user connected")

            socket.on("event:message",async ({message}:{message:string})=>{
                console.log(`messgae : ${message}`)
                //Publis this message to redis
                await pub.publish('MESSAGES',JSON.stringify({message}))
            })
        })

        sub.on('message',(channel,message)=>{
            if(channel==='MESSAGES')
            {
                io.emit('message',message)
            }
        })
    }



    get io()
    {
        return this._io
    }
}

export default SocketService;