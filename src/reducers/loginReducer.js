import {
  LOGIN,
  LOGOUT
} from '../actions/types';

const initialState = {
    login_message:'',
    authenticated: false,
    teacher:0,
    teacher_name:'',
    loading:true
}
//assign downloaded questions to 'questions', loading to false, and qid 0 for restarts in store
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('login')
      return {
        ...state,
        login_message: action.payload,
        authenticated:true,
        loading:false,
      };
      // reassign updated questions array with +/- to questions and add 1 to qid to advance to the next question
    case LOGOUT:
      return {
        ...state,
        login_message: action.payload,
        authenticated: false,
        loading:false,
      };
    default:
      return state;
  }
}
