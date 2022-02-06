export interface Auth0EnableMultifactorOptions {
  /**
   * Determines if browser should be remembered such that the multifactor challenge can later be skipped.
   * Defaults to true.
   * @default true
   */
  allowRememberBrowser?: boolean;
}

export interface Auth0TokenCreationOptions {
  /**
   * Number of seconds before this token will expire
   *
   * @default 900 15 minutes.
   */
  expiresInSeconds?: number;

  /**
   * The data intended to be passed to the target of the redirect and whose authenticity and integrity must be provable.
   */
  payload: {
    [key: string]: unknown;
  };

  /**
   * A secret that will be used to sign a JWT that is shared with the redirect target.
   * The secret value should be stored as a secret and retrieved using event.secrets['<secret_name>'].
   */
  secret: string;
}

export interface Auth0SendUserToOptions {
  /**
   * An object representing additional query string parameters that should be appended to the redirect URL.
   */
  query?: {
    [key: string]: string;
  };
}

export interface Auth0ValidateSessionTokenOptions {
  secret: string;

  /**
   * The name of the query or body parameter that was sent to the /continue endpoint.
   * @default 'session_token'
   */
  tokenParameterName?: string;
}

/**
 * Modify the access of the user that is logging in, such as rejecting the login attempt.
 */
export interface Auth0AccessApi<Api> {
  /**
   * Mark the current login attempt as denied.
   * This will prevent the end-user from completing the login flow.
   * This will NOT cancel other user-related side-effects (such as metadata changes) requested by this Action.
   * The login flow will immediately stop following the completion of this action and no further Actions will be executed.
   *
   * @param reason — A human-readable explanation for rejecting the login. This may be presented directly in end-user interfaces.
   */
  deny: (reason: string) => Api;
}

/**
 * Request changes to the access token being issued.
 */
export interface Auth0AccessTokenApi<Api> {
  /**
   * Set a custom claim on the Access Token that will be issed upon completion of the login flow.,
   *
   * @param key — Name of the claim (note that this may need to be a fully-qualified url).
   * @param value — The value of the claim.
   */
  setCustomClaim: (key: string, value: unknown) => Api;
}

/**
 * Request changes to the ID token being issued.
 */
export interface Auth0IdTokenApi<Api> {
  /**
   * Set a custom claim on the ID Token that will be issed upon completion of the login flow.
   *
   * @param key — Name of the claim (note that this may need to be a fully-qualified url).
   * @param value — The value of the claim.
   */
  setCustomClaim: (key: string, value: unknown) => Api;
}

/**
 * Set or remove the requirement for multifactor authentication on the login attempt.
 */
export interface Auth0MultifactorApi<Api> {
  /**
   * Enable multifactor authentication for this login flow.
   * When enabled, users must complete the configured multifactor challenge.
   * The actual multifactor challenge will be deferred to the end of the login flow.
   *
   * @param provider — The name of the multifactor provider to use or the value "any" to use any of the configured providers.
   * @param options — Additional options for enabling multifactor challenges.
   */
  enable: (
    provider: 'any' | 'duo' | 'google-authenticator' | 'guardian' | 'none',
    options?: Auth0EnableMultifactorOptions,
  ) => Api;
}

/**
 * Make changes to the metadata of the user that is logging in.
 */
export interface Auth0UserApi<Api> {
  /**
   * Set application-specific metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks.
   * Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the changes and update the metadata at once before the flow is completed.
   *
   * @param key — The metadata property to be set.
   * @param value — The value of the metadata property. This may be set to null to remove the metadata property.
   */
  setAppMetadata: (key: string, value: unknown) => Api;

  /**
   * Set general metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks.
   * Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the changes and update the metadata at once before the flow is completed.
   *
   * @param key — The metadata property to be set.
   * @param value — The value of the metadata property. This may be set to null to remove the metadata property.
   */
  setUserMetadata: (key: string, value: unknown) => Api;
}

/**
 * Configure and initiate external redirects.
 */
export interface Auth0RedirectApi<Api> {
  /**
   * Create a session token suitable for using as a query string parameter redirect target (via sendUserTo) that contains data whose authenticity must be provable by the target endpoint. The target endpoint can verify the authenticity and integrity of the data by checking the JWT's signature using a shared secret.
   * The shared secret should be stored as a secret of the Action and will be readable at event.secrets['<secret_name>'].
   *
   * @param options — Configure how sensitive data is encoded into the query parameters of the resulting url.
   * @returns — A JWT string.
   */
  encodeToken: (options: Auth0TokenCreationOptions) => string;

  /**
   * Cause the login pipeline to trigger a browser redirect to the target url immediately after this action completes.
   * The createUrl helper method is provided to simplify encoding data as a query parameter in the target url such that the data's authenticity and integrity can be verified by the target endpoint.
   *
   * @param baseUrl — The url to which to redirect the user.
   */
  sendUserTo: (url: string, options?: Auth0SendUserToOptions) => Api;

  /**
   * Retrieve the data encoded in a JWT token passed to the /continue endpoint while verifying the authenticity and integrity of that data.
   *
   * @param options — Options for retrieving the data encoded in a JWT token passed to the /continue endpoint following a rediret.
   * @returns — The payload of the JWT token.
   */
  validateToken: (options: Auth0ValidateSessionTokenOptions) => any;
}

export interface Auth0PostLoginApi {
  access: Auth0AccessApi<Auth0PostLoginApi>;
  accessToken: Auth0AccessTokenApi<Auth0PostLoginApi>;
  idToken: Auth0IdTokenApi<Auth0PostLoginApi>;
  multifactor: Auth0MultifactorApi<Auth0PostLoginApi>;
  user: Auth0UserApi<Auth0PostLoginApi>;
  redirect: Auth0RedirectApi<Auth0PostLoginApi>;
}

export interface Auth0CredentialsExchangeAPI {
  access: Auth0AccessApi<Auth0CredentialsExchangeAPI>;
  accessToken: Auth0AccessTokenApi<Auth0CredentialsExchangeAPI>;
}

export interface Auth0PreUserRegistrationAPI {
  access: Auth0AccessApi<Auth0PreUserRegistrationAPI>;
  user: Auth0UserApi<Auth0PreUserRegistrationAPI>;
}
