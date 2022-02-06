import {
  ManagementClient as Auth0ManagementClient,
  User as Auth0User,
} from 'auth0';
import { CUSTOM_CLAIM_DEFAULT_NAMESPACE } from '../auth0-actions.constants';
import { Auth0PostLoginApi, Auth0PostLoginEvent } from '../../../interfaces';
import { Auth0ActionsPostLoginLinkSocialConnectionsByEmailOptions } from '../interfaces';

export class Auth0ActionsPostLogin {
  /**
   * This will link all social identities with the same email address to a primary user.
   *
   * @param event Auth0PostLoginEvent
   * @param api Auth0PostLoginApi
   * @param managementClient Auth0ManagementClient
   * @returns Primary user
   */
  static async linkSocialConnectionsByEmail(
    event: Auth0PostLoginEvent,
    api: Auth0PostLoginApi,
    managementClient: Auth0ManagementClient,
    options?: Auth0ActionsPostLoginLinkSocialConnectionsByEmailOptions,
  ): Promise<Auth0User> {
    // Set the primary user
    let primaryUser: Auth0User = event.user;

    // Get users with same email as current user
    // When there are 2 or more users found, we'll link all users to the first one
    const users = await managementClient.getUsersByEmail(event.user.email);
    if (users.length >= 2) {
      // Set first found user to primary user
      // We're going to link the other found users to this one
      primaryUser = users[0];

      // Loop through all users (except primary) and link them to the primary user
      for (const user of users.filter(
        (user) => user.user_id !== primaryUser.user_id,
        [],
      )) {
        // Link user to primary user
        event.user.identities = await managementClient.linkUsers(
          primaryUser.user_id,
          {
            provider: user.identities[0].provider,
            user_id: user.user_id,
          },
        );
      }
    }

    // Set custom claim
    if (options?.setCustomClaims !== false) {
      api[
        options?.setCustomClaims === 'id_token' ? 'idToken' : 'accessToken'
      ].setCustomClaim(
        `${options?.namespace || CUSTOM_CLAIM_DEFAULT_NAMESPACE}/user_id`,
        primaryUser.user_id,
      );
    }

    return primaryUser;
  }

  /**
   * Disable multifactor authentication.
   *
   * @param event Auth0PostLoginEvent
   * @param api Auth0PostLoginApi
   */
  static async disableMultifactorAuthentication(
    _event: Auth0PostLoginEvent,
    api: Auth0PostLoginApi,
  ): Promise<void> {
    api.multifactor.enable('none');
  }
}
