export const CookieOptions = {
  httpOnly: true,
  secure: true,        // Render = HTTPS only
  sameSite: 'none',    // REQUIRED for cross-domain
  maxAge: 24 * 60 * 60 * 1000,
};
