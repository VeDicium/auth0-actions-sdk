import { Organization as Auth0Organization, User as Auth0User } from 'auth0';

export interface Auth0AuthenticationMethod {
  name: 'federated' | 'pwd' | 'ses' | 'email' | 'mfa' | 'mock';
  timestamp: string;
}

/**
 * Information about the access token to be issued.
 */
export interface Auth0AccessTokenInfo {
  customClaims: {
    [claim: string]: any;
  };

  scope: Array<string>;
}

/**
 * Details about authentication signals obtained during the login flow.
 */
export interface Auth0AuthenticationInfo {
  /**
   * Contains the authentication methods a user has completed during their session.
   */
  methods: Array<Auth0AuthenticationMethod>;
}

/**
 * An object containing information describing the authorization granted to the user that is logging in.
 */
export interface Auth0AuthorizationInfo {
  /**
   * An array containing the names of a user's assigned roles.
   */
  roles: Array<string>;
}

/**
 * Information about the Client with which this login transaction was initiated.
 */
export interface Auth0Client {
  /**
   * The client id of the application the user is logging in to.
   */
  client_id: string;

  /**
   * An object for holding other application properties.
   */
  metadata: {
    [additionalProperties: string]: string;
  };

  /**
   * The name of the application (as defined on the dashboard).
   */
  name: string;
}

/**
 * Details about the Connection that was used to authenticate the user.
 */
export interface Auth0Connection {
  /**
   * The connection's unique identifier.
   */
  id: string;

  /**
   * Metadata associated with the connection.
   */
  metadata?: {
    [additionalProperties: string]: string;
  };

  /**
   * The name of the connection used to authenticate the user (such as: twitter or some-g-suite-domain).
   */
  name: string;

  /**
   * The type of connection.
   * For social connection connectionStrategy === connection. For enterprise connections, the strategy will be waad (Windows Azure AD), ad (Active Directory/LDAP), auth0 (database connections), and so on.
   */
  strategy: string;
}

/**
 * Details about the message that is sent to the user.
 */
export interface Auth0PhoneMessageOptions {
  action: 'enrollment' | 'second-factor-authentication';

  /**
   * One-time password that the user needs to use to enter in the form.
   */
  code: string;

  message_type: 'sms' | 'voice';

  /**
   * Phone number where the message will be sent.
   */
  recipient: string;

  /**
   * Content of the message to be sent.
   */
  text: string;
}

/**
 * Details about the request that initiated the transaction
 */
export interface Auth0Request {
  /**
   * The body of the POST request. This data will only be available during Refresh Token and Client Credential Exchange flows.
   */
  body: {
    [additionalProperties: string]: string;
  };

  geoip: {
    cityName?: string;
    continentCode?: string;
    countryCode?: string;
    countryCode3?: string;
    countryName?: string;
    latitude?: number;
    longitude?: number;
    timeZone?: string;
  };

  /**
   * The hostname that is being used for the authentication flow.
   */
  hostname?: string;

  /**
   * The language requested by the browser.
   */
  language?: string;

  /**
   * The HTTP method used for the request.
   */
  method: string;

  /**
   * The query string parameters sent to the authorization request.
   */
  query: {
    [additionalProperties: string]: any;
  };

  /**
   * The value of the User-Agent header received when initiating the transaction.
   */
  user_agent?: string;
}

/**
 * Details about the resource server to which the access is being requested.
 */
export interface Auth0ResourceServer {
  /**
   * The identifier of the resource server. For example: https://your-api.example.com
   */
  identifier: string;
}

/**
 * Login statistics for the current user.
 */
export interface Auth0LoginStatsV2 {
  /**
   * The number of times this user has logged in.
   */
  logins_count: number;
}

/**
 * Details about the Tenant associated with the current transaction.
 */
export interface Auth0Tenant {
  /**
   * The name of the tenant.
   */
  id: string;
}

/**
 * Details about the current transaction.
 */
export interface Auth0Transaction {
  /**
   * Any acr_values provided in the original authentication request.
   */
  acr_values: Array<string>;

  /**
   * The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings.
   */
  locale: string;

  protocol?:
    | 'oidc-basic-profile'
    | 'oidc-implicit-profile'
    | 'oauth2-device-code'
    | 'oauth2-resource-owner'
    | 'oauth2-resource-owner-jwt-bearer'
    | 'oauth2-password'
    | 'oauth2-access-token'
    | 'oauth2-refresh-token'
    | 'oauth2-token-exchange'
    | 'oidc-hybrid-profile'
    | 'samlp'
    | 'wsfed'
    | 'wstrust-usernamemixed';

  /**
   * The scopes requested (if any) when starting this authentication flow.
   */
  requested_scopes: Array<string>;

  /**
   * The ui_locales provided in the original authentication request.
   */
  ui_locales: Array<string>;
}

/**
 * Details about the user and the context in which they are logging in.
 */
export interface Auth0PostLoginEvent {
  authentication?: Auth0AuthenticationInfo;
  authorization?: Auth0AuthorizationInfo;
  client: Auth0Client;
  connection: Auth0Connection;
  organization?: Auth0Organization;
  request: Auth0Request;
  resource_server?: Auth0ResourceServer;
  stats: Auth0LoginStatsV2;
  tenant: Auth0Tenant;
  transaction: Auth0Transaction;
  user: Auth0User;
}

export interface Auth0CredentialsExchangeEvent {
  accessToken: Auth0AccessTokenInfo;
  client: Auth0Client;
  request: Auth0Request;
  resource_server: Auth0ResourceServer;
  tenant: Auth0Tenant;
  transaction: {
    requested_scopes: Auth0Transaction['requested_scopes'];
  };
}

export interface Auth0PreUserRegistrationEvent {
  client?: Auth0Client;
  connection: Auth0Connection;
  request: Auth0Request;
  tenant: Auth0Tenant;
  transaction?: Auth0Transaction;
  user: Auth0User;
}

export interface Auth0PostUserRegistrationEvent {
  connection: Auth0Connection;
  request?: Auth0Request;
  tenant: Auth0Tenant;
  transaction?: Auth0Transaction;
  user: Auth0User;
}

export interface Auth0PostChangePasswordEvent {
  connection: Auth0Connection;
  request: Auth0Request;
  tenant: Auth0Tenant;
  user: Auth0User;
}

export interface Auth0SendPhoneMessageEvent {
  client?: Auth0Client;
  message_options: Auth0SendPhoneMessageEvent;
  request: Auth0Request;
  tenant: Auth0Tenant;
  user: Auth0User;
}
