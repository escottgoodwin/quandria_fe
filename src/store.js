import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const initialState = {login: {
  login_message:'',
  authenticated: false,
  teacher_id:1,
  loading:true,
  teacher_name:"Joe Smith"
}
};

const middleware = [thunk];

const store = createStore(
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;