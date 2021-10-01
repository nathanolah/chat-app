import React, { Component } from "react";
import './App.css';

import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/ChatInput/ChatInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
  }

  componentDidMount() {

    connect((msg) => {
      console.log('New message');

      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      // this.setState(prevState => ({
      //   chatHistory: [...prevState.chatHistory, msg]
      // }))

      console.log(this.state);
    }); 

  }

  send(event) {
    if (event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }

    // console.log("hello from send()");
    // sendMsg("hello");
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send} />
        {/* <button onClick={this.send}>Hit</button> */}
      </div>
    );
  }

}





// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
