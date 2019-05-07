import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// This just gives us access to the Redux DevTools
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'simple-react-redux' })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}