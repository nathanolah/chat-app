package main

import (
	"fmt"
	//"log"
	"net/http"

	//"github.com/gorilla/websocket"

	"github.com/nathanolah/chat-app/pkg/websocket"
)

// // We'll need to define an Upgrader
// // this will require a Read and Write buffer size
// var upgrader = websocket.Upgrader {
// 	ReadBufferSize: 1024,
// 	WriteBufferSize: 1024,

// 	// Check the origin of our connection
// 	// this will allow us to make requests from our React development server to here
// 	// For now, we'll do no checking and just allow any connection
// 	CheckOrigin: func(r *http.Request) bool { return true },
// }

// func reader(conn *websocket.Conn) {
// 	for {
// 		// read in a message
// 		messageType, p, err := conn.ReadMessage()

// 		if err != nil {
// 			log.Println(err)
// 			return
// 		}

// 		// print out that message
// 		fmt.Println(string(p))

// 		if err := conn.WriteMessage(messageType, p); err != nil {
// 			log.Println(err)
// 			return
// 		}

		
// 	}
// }


/*
	Create a new Client on every connection,
	and to register that client with a Pool
*/

// define our WebSocket endpoint
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)

	if err != nil {
		fmt.Fprintln(w, "%+V\n", err)
	}

	client := &websocket.Client {
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
	

	//go websocket.Writer(ws);
	//websocket.Reader(ws)


	// fmt.Println(r.Host)

	// // upgrade this connection to a WebSocket
	// // connection
	// ws, err := upgrader.Upgrade(w, r, nil) 

	// if err != nil {
	// 	log.Println(r.Host)
	// }

	// // listen for new messages coming
	// // through the WebSocket connection
	// reader(ws)
}

func setupRoutes() {
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintf(w, "Simple server")
	// })

	// maps our "/ws" endpoint to the "serveWs" function
	//http.HandleFunc("/ws", serveWs)

	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}