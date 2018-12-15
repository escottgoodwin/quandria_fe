import {
  FETCH_TESTS,
  FETCH_TEST,
  ADD_TEST,
  EDIT_TEST,
  DELETE_TEST,
  RELEASE_ALL_QUESTIONS
} from '../actions/types';

const initialState = {
    tests:[],
    test:{},
    test_message:'',
    loading: false
  }
//assign downloaded questions to 'questions', loading to false, and qid 0 for restarts in store
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTS:
      return {
        ...state,
        tests: action.payload,
        test_message:'',
        loading:false,
      };
      // reassign updated questions array with +/- to questions and add 1 to qid to advance to the next question
    case FETCH_TEST:
      return {
        ...state,
        test: action.payload,
        test_message:'',
        loading:false,
      };
    case ADD_TEST:
      return {
        ...state,
        test_message: action.payload,
        loading:false,
      };
    case EDIT_TEST:
      return {
        ...state,
        test_message: action.payload,
        loading:false,
      };
    case DELETE_TEST:
      return {
        ...state,
        test_message: action.payload,
        loading:false,
      };
      case RELEASE_ALL_QUESTIONS:
        return {
          ...state,
          test_message: action.payload.message,
          release_date: action.payload.release_date,
          loading:false,
        };
    default:
      return state;
  }
}
