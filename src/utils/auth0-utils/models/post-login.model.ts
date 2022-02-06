import { Auth0PostLoginEvent } from '../../../interfaces';

export class Auth0UtilsPostLogin {
  /**
   * Verifies whether the login is a regular username / password login.
   * Shortcut for verifying if the strategy is 'auth0'.
   *
   * @param event Auth0PostLoginEvent
   */
  static isRegularLogin(event: Auth0PostLoginEvent): boolean {
    return event.connection.strategy === 'auth0';
  }

  /**
   * Verifies whether the login is a social login.
   * Shortcut for verifying if the connections' strategy is the same as the connections' name.
   *
   * @param event Auth0PostLoginEvent
   */
  static isSocialLogin(event: Auth0PostLoginEvent): boolean {
    return event.connection.strategy === event.connection.name;
  }

  /**
   * Verifies whether the user has a multifactor authentication method configured.
   *
   * @param event Auth0PostLoginEvent
   */
  static isMultifactorAuthenticationConfigured(
    event: Auth0PostLoginEvent,
  ): boolean {
    return (event.user.multifactor || []).length > 0;
  }
}
