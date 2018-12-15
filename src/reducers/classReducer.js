import {
  FETCH_CLASSES,
  FETCH_CLASS,
  ADD_CLASS,
  EDIT_CLASS,
  DELETE_CLASS
} from '../actions/types';

const initialState = {
    courses:[],
    sel_course:{},
    course_message:'',
    loading: false
  }

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLASSES:
      return {
        ...state,
        courses: action.payload,
        loading:false,
      }

    case FETCH_CLASS:
      return {
        ...state,
        sel_course: action.payload,
        loading:false,
      }
    case ADD_CLASS:
      return {
        ...state,
        course_message: action.payload,
        loading:false,
      }
    case EDIT_CLASS:
      return {
        ...state,
        course_message: action.payload,
        loading:false,
      }
    case DELETE_CLASS:
      return {
        ...state,
        course_message: action.payload,
        loading:false,
      }
    default:
      return state;
  }
}
