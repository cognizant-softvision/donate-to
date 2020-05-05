import { Action } from '@ngrx/store';
import { SampleModel } from '../../models/sampleModel';

export enum ActionTypes {
  ADD_SAMPLE = '[Sample] Add Sample',
  ADD_SAMPLE_SUCCESS = '[Sample] Add success',
  ADD_SAMPLE_FAILED = '[Sample] Add failed',

  LOAD_SAMPLES = '[Sample] Load items from server',
  LOAD_SAMPLES_SUCCESS = '[Sample] Load success',
  LOAD_SAMPLES_FAILED = '[Sample] Load failed',
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

  constructor(public payload: any = null) {}
}

export class LoadSamplesSuccess implements Action {
  readonly type = ActionTypes.LOAD_SAMPLES_SUCCESS;

  constructor(public payload: SampleModel[]) {}
}

export class LoadSamplesFailed implements Action {
  readonly type = ActionTypes.LOAD_SAMPLES_FAILED;
}

export class AddSampleFailed implements Action {
  readonly type = ActionTypes.ADD_SAMPLE_FAILED;

  constructor(public payload: SampleModel[]) {}
}

export type ActionsUnion =
  | AddSample
  | AddSampleSuccess
  | LoadSamples
  | LoadSamplesSuccess
  | LoadSamplesFailed
  | AddSampleFailed;
