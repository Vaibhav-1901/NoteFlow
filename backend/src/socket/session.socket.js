import {Server} from 'socket.io';
import { nanoid } from 'nanoid';

const initializeSocket=(server)=>{
    const io=new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    io.on("connection",(socket)=>{
        console.log("New client connected: ", socket.id);
        //create session
        socket.on("createSession",({userId,username})=>{
            try {
                const sessionId=nanoid(8);
                socket.join(sessionId);
                socket.emit("sessionCreated",{sessionId});  
            } catch (error) {
                console.error("Error creating session:", error);
            }      
        })
    });

    

}


export {initializeSocket}
