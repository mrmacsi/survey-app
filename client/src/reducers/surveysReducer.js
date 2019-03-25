import { FETCH_SURVEYS,FETCH_SINGLE_SURVEY } from "../actions/types";


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS: //if action type is FETCH_SURVEYS return action payload which is res.data that returns from axios request
      return action.payload;
    case FETCH_SINGLE_SURVEY: 
      if(action.payload)
        return [...state, action.payload];
      else
        return state;
    default:
      return state;
  }
}
