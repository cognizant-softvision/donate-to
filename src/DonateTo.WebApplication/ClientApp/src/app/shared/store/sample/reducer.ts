import { ActionsUnion, ActionTypes } from './actions';
import { SampleModel } from '../../models/sampleModel';

class InitialState implements SampleState {
  loading: boolean;
  failed: boolean;
  items: SampleModel[];
}

export function SampleReducer(state = InitialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LOAD_SAMPLES:
      return {
        ...state,
        loading: true,
        failed: false,
        items: action.payload,
      };

    case ActionTypes.LOAD_SAMPLES_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        items: action.payload,
      };

    case ActionTypes.LOAD_SAMPLES_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
      };

    case ActionTypes.ADD_SAMPLE_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        // items: [...state.items, action.payload]
      };

    case ActionTypes.ADD_SAMPLE_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        items: action.payload,
      };

    default:
      return state;
  }
}

export interface SampleState {
  loading: boolean;
  failed: boolean;
  items: SampleModel[];
}
