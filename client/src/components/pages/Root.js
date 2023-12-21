import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MessageBlock from "../modules/MessageBlock.js";

const showMessageContext = React.createContext();
const { Provider, Consumer } = showMessageContext;
function Root(props){
  let location = useLocation();
  let [message, setMessage] = useState({show: false, type: "", content: ""});
  
  const setMessageAndCancelAfterUpdateWhoami = (mes) => {
    setMessage(mes);
    var __type = mes.type, __content = mes.content;
    setTimeout(() => {
      setMessage({show: false, type: __type, content: __content});
    }, 2000);
  }
  
  const setMessageAndCancel = (mes) => {
    console.log("in Root.js: mes.content = "+mes.content);
    setMessageAndCancelAfterUpdateWhoami(mes);
//    if(mes.content == "登陆成功"){//强制更新 whoami
//      props.updateWhoami().then(setMessageAndCancelAfterUpdateWhoami(mes));
//    }
//    else{
//      setMessageAndCancelAfterUpdateWhoami(mes);
//    }
  }
  
  useEffect(() => {
    const st = location.state;
    console.log(st);
    if(st && st.message){
      setMessageAndCancel({show: true, type: st.message.type, content: st.message.content});
      window.history.replaceState({}, document.title);
    }
    props.updateWhereAmI(location.pathname);
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

