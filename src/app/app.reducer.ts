// THIS IS WILL REPLACE THE BOOLEAN SUBJECT IN ISLOADING IN UISERVICE COMPONENT
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { from } from 'rxjs';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer, 
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAtuhState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAtuhState, fromAuth.getIsAuth);

