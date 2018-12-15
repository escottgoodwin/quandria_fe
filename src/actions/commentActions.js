import {
  FETCH_COMMENTS,
  FETCH_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from './types';

export const fetchTest = () => dispatch =>
  //fetch questions from server and set them to payload
  fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
  .then(response => response.json())
  .then(parsedJson =>
    dispatch({
      type: FETCH_COMMENT,
      payload: parsedJson.results
    })
  )
  .catch(error => console.log('error getting data',error))

  export const fetchTests = () => dispatch =>
    //fetch questions from server and set them to payload
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then(response => response.json())
    .then(parsedJson =>
      dispatch({
        type: FETCH_COMMENTS,
        payload: parsedJson.results
      })
    )
    .catch(error => console.log('error getting data',error))

export const addTest = () => dispatch =>
  //fetch questions from server and set them to payload
  fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
  .then(response => response.json())
  .then(parsedJson =>
    dispatch({
      type: ADD_COMMENT,
      payload: parsedJson.results
    })
  )
  .catch(error => console.log('error getting data',error))

export const editTest = () => dispatch =>
  //fetch questions from server and set them to payload
  fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
  .then(response => response.json())
  .then(parsedJson =>
    dispatch({
      type: EDIT_COMMENT,
      payload: parsedJson.results
    })
  )
  .catch(error => console.log('error getting data',error))

export const deleteTest = () => dispatch =>
  //fetch questions from server and set them to payload
  fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
  .then(response => response.json())
  .then(parsedJson =>
    dispatch({
      type: DELETE_TEST,
      payload: parsedJson.results
    })
  )
  .catch(error => console.log('error getting data',error))

export const answerUpdate = answer_update => dispatch =>
      dispatch({
      type: ANSWER_UPDATE,
      payload: answer_update
    })
