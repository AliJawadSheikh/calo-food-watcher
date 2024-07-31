/**
 * Extracts the token from the authorization header.
 *
 * @param authToken - The authorization header string.
 * @returns The extracted token.
 */
export const extractToken = (authToken: string): string => {
  const tokenMatch = authToken.match(/^(Bearer )?(.*)$/);
  return !tokenMatch || tokenMatch.length < 3 || tokenMatch[1] !== 'Bearer '
    ? authToken
    : tokenMatch[2];
};
