import {
  FETCH_PANELS,
  FETCH_TEST_PANELS,
  ADD_PANELS_TEST,
  UPLOAD_PANELS,
  UPLOAD_PROGRESS,
  DELETE_PANEL
} from '../actions/types';

const initialState = {
    panels:[],
    test_panels:[],
    panel_message:'',
    panels_selected:'',
    panels_uploaded:0,
    panels_progress:0,
    loading:true
}
//assign downloaded questions to 'questions', loading to false, and qid 0 for restarts in store
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PANELS:
      return {
        ...state,
        panels: action.payload,
        loading:false,
      };
      // reassign updated questions array with +/- to questions and add 1 to qid to advance to the next question
    case FETCH_TEST_PANELS:
      return {
        ...state,
        test_panels: action.payload,
        loading:false,
      };
    case ADD_PANELS_TEST:
      return {
        ...state,
        panels_selected:  1
      };
    case UPLOAD_PANELS:
      return {
        ...state,
        panels_uploaded: state.panels_uploaded + 1
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        panels_progress:  action.payload
      };
    case DELETE_PANEL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
