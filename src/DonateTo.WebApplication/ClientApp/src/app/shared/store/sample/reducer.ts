import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
  items: []
};

export function SampleReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LOAD_SAMPLES_SUCCESS:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.ADD_SAMPLE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    default:
      return state;
  }
}