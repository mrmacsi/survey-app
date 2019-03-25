import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEYS_ERROR, FETCH_SINGLE_SURVEY } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/me");
  //console.log(res)
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys"); //rediirect to thisi action
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const editSurvey = (surveyId, values) => async dispatch => {
  return await axios.put("/api/survey/"+surveyId,values).then(response =>{
    //console.log(response.data);
    dispatch(fetchSurveySuccess(response.data))
    
    return response.data;
  }).catch(err =>{
    console.log(err);
    throw err
  })
};

export function fetchSurveySuccess(surveys) {
	return {
		type: FETCH_SINGLE_SURVEY,
		payload: surveys
	};
}

export function fetchSurveysError(error) {
	return {
		type: FETCH_SURVEYS_ERROR,
		payload: error
	};
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  //console.log(res);
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSingleSurvey = (surveyId) => async dispatch => {
  return await axios.get("/api/survey/"+surveyId).then(response =>{
    //console.log(response.data);
    dispatch(fetchSurveySuccess(response.data))
    return response.data;
  }).catch(err =>{
    console.log(err);
    throw err
  })
};
