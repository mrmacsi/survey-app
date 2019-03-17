import { FETCH_SURVEYS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS: //if action type is FETCH_SURVEYS return action payload which is res.data that returns from axios request
      return action.payload;
    default:
      return state;
  }
}
