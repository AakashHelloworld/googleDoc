const app = require("./app")

const port = 4000;
process.on("uncaughtException",(err)=>{
    console.log("error", err.message)
    process.exit(1);
} ) 
 

const server = app.listen(process.env.PORT || port, ()=>{
    console.log("Server is runing............ .")
})
// unhandle Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log("erro:", err.message );
    server.close(()=>{
        process.exit(1);
    })
}) 


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


  io.on("connection", (socket) => {
  console.log("Connected to socket.io");
    console.log(socket.id)
    socket.on("get-document", (paramId)=>{
        console.log( "DocId ::::::", paramId)
        socket.join(paramId)  
        socket.on("send-changes", data => {
                console.log(data)
            socket.broadcast.to(paramId).emit("receive-changes", data)
          })

        
    })

    });       