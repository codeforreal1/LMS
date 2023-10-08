import type { AccessTokenPayload } from '../libs/Authentication';
import withAccessTokenVerification from './withAccessTokenVerification';

export interface Middlewares {
  withAccessTokenVerification: AccessTokenPayload;
}

export { withAccessTokenVerification };
