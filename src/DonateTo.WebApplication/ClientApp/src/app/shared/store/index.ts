import * as auth from './auth';
import * as donationRequest from './donation-request';
import * as organization from './organization';
import * as settings from './settings';

export interface State {
  settings: settings.SettingsState;
  auth: auth.AuthState;
}

export const fromSettings = settings;
export const fromAuth = auth;
export const fromDonationRequest = donationRequest;
export const fromOrganization = organization;
