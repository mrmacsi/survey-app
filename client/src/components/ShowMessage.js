import React from "react";

const ShowMessage = ({title,type}) => {
  if(title== null) return null;

  let color = ""
  if(type==="error"){
    color = "red";
  }else if(type==="warning"){
    color = "orange";
  }else{
    color = "green";
  }
   
  return ( 
    <div style={{padding:"10px 20px",marginTop: "10px"}} className={color+" darken-1"}>
      <div className="col s12 m2">
      <span className="white-text text-darken-2">{title}</span>
      </div>
    </div>
  );
};

export default ShowMessage;