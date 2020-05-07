import { createAction, props } from '@ngrx/store';
import { SampleModel } from '../../models/sampleModel';

export const addSample = createAction('[Sample] Add Sample', props<{ payload: SampleModel }>());
export const addSampleSuccess = createAction('[Sample] Add success', props<{ sample: SampleModel }>());
export const addSampleFailed = createAction('[Sample] Add failed');
export const loadSamples = createAction('[Sample] Load items from server');
export const loadSamplesSuccess = createAction('[Sample] Load success', props<{ samples: SampleModel[] }>());
export const loadSamplesFailed = createAction('[Sample] Load failed');
