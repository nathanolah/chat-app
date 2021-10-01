import React, { Component } from "react";
import "./ChatHistory.scss";

import Message from "../Message/Message"

class ChatHistory extends Component {
    
    // render() {
    //     console.log(this.props.chatHistory);
    //     const messages = this.props.chatHistory.map(msg => <Message key={msg.timeStamp} message={msg.data} />);
    
    //     return (
    //       <div className='ChatHistory'>
    //         <h2>Chat History</h2>
    //         {messages}
    //       </div>
    //     );
    // };

    
    render() {

        // Takes an array of chat messages from the 'App.js' function through its props
        // and render the messages one under the other.
        console.log(this.props.chatHistory);

        // const messages = this.props.chatHistory.map((msg, index) => (
        //     <p key={index}>{msg.data}</p>
        // ));

        const messages = this.props.chatHistory.map(msg => <Message key={msg.timeStamp} message={msg.data} />);

        return (
            <div className="ChatHistory">
                <h2>Chat History</h2>
                {messages}
            </div>
        );
    }
}

export default ChatHistory;
