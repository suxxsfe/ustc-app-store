import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MessageBlock from "../modules/MessageBlock.js";

function Root(){
  let location = useLocation();
  let [showMessage, setShowMessage] = useState(false);
  let [messageType ,setMessageType] = useState("");
  let [messageContent, setMessageContent] = useState("");
  
  useEffect(() => {
    const st = location.state;
    console.log(st);
    if(st && st.message){
      setShowMessage(true);
      setMessageType("success");
      setMessageContent(st.message);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [location]);

  return (
    <>
      <MessageBlock show={showMessage}
                    type={messageType} content={messageContent}
      />
      <Outlet />
    </>
  );
}

export default Root;

