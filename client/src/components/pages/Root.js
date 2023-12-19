import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MessageBlock from "../modules/MessageBlock.js";

const showMessageContext = React.createContext();
const { Provider, Consumer } = showMessageContext;
function Root(){
  let location = useLocation();
  let [message, setMessage] = useState({show: false, type: "", content: ""});
  
  const setMessageAndCancel = (mes) => {
    setMessage(mes);
    setTimeout(() => {
      setMessage({show: false, type: message.type, content: message.content});
    }, 2000);
  }
  
  useEffect(() => {
    const st = location.state;
    console.log(st);
    if(st && st.message){
      setMessageAndCancel({show: true, type: "success", content: st.message});
    }
  }, [location]);
  
  
  const showMessage = (type, content, time) => {
    setMessageAndCancel({show:true, type: type, content: content});
  }

  return (
    <>
      <MessageBlock show={message.show}
                    type={message.type} content={message.content}
      />
      <Provider value={showMessage} >
        <Outlet />
      </Provider>
    </>
  );
}

export default Root;
export { Consumer };

