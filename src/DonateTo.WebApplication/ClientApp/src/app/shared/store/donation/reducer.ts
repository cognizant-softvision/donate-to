import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
  items: [],
  order: []
};

export function DonationReducer(state = initialState, action: ActionsUnion) {
  console.log(action);
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.ADD:
      return {
        ...state,
        order: [...state.order, action.payload]
      };

    case ActionTypes.REMOVE:
      return {
        ...state,
        order: [...state.order.filter(item => item.id !== action.payload.id)]
      };

    default:
      return state;
  }
}