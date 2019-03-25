import { FETCH_SURVEYS,FETCH_SINGLE_SURVEY } from "../actions/types";


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS: //if action type is FETCH_SURVEYS return action payload which is res.data that returns from axios request
      return action.payload;
    case FETCH_SINGLE_SURVEY: //replace the existing one or return the new one
      if(action.payload){
        const exists = state.filter(x=>x._id===action.payload._id);
        let new_surveys = [];
        if( exists.length !== 0 ){
          new_surveys = state.map(x => x._id === action.payload._id ? action.payload : x)
        }else{
          new_surveys.push(action.payload)
        }
        return new_surveys;
      }
      else
        return state;
    default:
      return state;
  }
}
