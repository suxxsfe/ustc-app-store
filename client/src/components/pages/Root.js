import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MessageBlock from "../modules/MessageBlock.js";

const showMessageContext = React.createContext();
const { Provider, Consumer } = showMessageContext;
function Root(){
  let location = useLocation();
  let [message, setMessage] = useState({show: false, type: "", content: ""});
  
  useEffect(() => {
    const st = location.state;
    console.log(st);
    if(st && st.message){
      setMessage({show: true, type: "success", content: st.message});
      setTimeout(() => {
        setShowMessage({show: false, type: "", content: ""});
      }, 2000);
    }
  }, [location]);
  
  
  const showMessage = (type, content, time) => {
    setMessage({show:true, type: type, content: content});
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

