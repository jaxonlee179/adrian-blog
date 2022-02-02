import { getRefreshTokenService } from "./get-refresh-token.service";

export interface IRevokeTokenService {
  token: string;
  ipAddress: string;
}

export async function revokeTokenService ( { token, ipAddress }: IRevokeTokenService ) {
  const refreshToken = await getRefreshTokenService( token );

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}
