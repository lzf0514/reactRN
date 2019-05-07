import constants from './constants';

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [constants.TEST_ACTION_TYPE]: state => {
    return {
      ...state,
      num: state.num + 1,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  num: 0,
};

export const mainReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};