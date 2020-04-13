
const LOAD = 'redux-form/account/LOAD';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
// export const load = data => ({
//   type: LOAD,
//   data
// });
export function load(data) {
  return {
    type: LOAD,
    data
  }
};

export default reducer;
