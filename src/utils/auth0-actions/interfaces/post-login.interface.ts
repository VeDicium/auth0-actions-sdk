import { Auth0EnableMultifactorOptions } from '../../../interfaces';

export interface Auth0ActionsPostLoginLinkSocialConnectionsByEmailOptions {
  /**
   * Namespace used to set custom claim.
   * @default https://auth0.vedicium.io
   */
  namespace?: string;

  /**
   * Set the custom claim 'user_id' of the primary user to the access or ID token, or disable it.
   * @default access_token
   */
  setCustomClaims?: 'access_token' | 'id_token' | false;
}

export interface Auth0ActionsPostLoginForceMultifactorAuthenticationIfConfiguredOptions
  extends Auth0EnableMultifactorOptions {
  /**
   * Disable forcing Multifactor Authentication when logged in via a social connection.
   * @default false
   */
  disableOnSocialLogin?: boolean;
}
