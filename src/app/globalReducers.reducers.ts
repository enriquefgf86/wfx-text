import { ActionReducerMap } from '@ngrx/store';
import * as globalPostReducer from './redux/postReducers.reducers';

export interface GlobalAppState {
  postReducers: globalPostReducer.StatePosts;
}

export const globalReducer: ActionReducerMap<GlobalAppState> = {
  postReducers: globalPostReducer.PostReducer,
};
