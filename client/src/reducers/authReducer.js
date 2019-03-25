import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      if(action.payload){
        return action.payload;
      }else if(action.payload===""){
        return null;
      }else{
        return false;
      }
    default:
      return state;
  }
};
