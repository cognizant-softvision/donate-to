import { Action } from '@ngrx/store';
import { SampleModel } from '../../models/sampleModel';

export enum ActionTypes {
  ADD_SAMPLE = '[Sample] Add Sample',
  ADD_SAMPLE_SUCCESS = '[Sample] Add success',

  LOAD_SAMPLES = '[Sample] Load items from server',
  LOAD_SAMPLES_SUCCESS = '[Sample] Load success',
}

export class AddSample implements Action {
  readonly type = ActionTypes.ADD_SAMPLE;

  constructor(public payload: SampleModel) {}
}

export class AddSampleSuccess implements Action {
  readonly type = ActionTypes.ADD_SAMPLE_SUCCESS;

  constructor(public payload: SampleModel[]) {}
}

export class LoadSamples implements Action {
  readonly type = ActionTypes.LOAD_SAMPLES;
}

export class LoadSamplesSuccess implements Action {
  readonly type = ActionTypes.LOAD_SAMPLES_SUCCESS;

  constructor(public payload: SampleModel[]) {}
}

export type ActionsUnion = AddSample | AddSampleSuccess | LoadSamples | LoadSamplesSuccess;
