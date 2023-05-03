import React from "react";
import Cam from "../img/camera.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const {data} = useContext(ChatContext);
    return (
        <div className="chat">
           <div className="chatInfo">
            <span>{data.user?.name}</span>
            <div className="chatIcons">
            <img src={Cam} alt=""/>
            <img src={Add} alt=""/>
            <img src={More} alt=""/>
            </div>
            </div>
            <Messages/>
            <Input/>
           
        </div>
    )
};

export default Chat;