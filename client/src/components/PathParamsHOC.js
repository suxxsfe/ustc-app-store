import React from "react";
import { useParams } from "react-router-dom";

export default function PathParamsHOC(props){
  const params = useParams();

  console.log(params);
  
  return (
    <props.component {...params} />
  );
}

