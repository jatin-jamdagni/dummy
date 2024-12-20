/**
 * An array of routes that are accessible to the public
 * These routes do not required authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes use to authenicate
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * This is for admin routes which can only be access by admin
 * @type {string}
 */
export const adminRoutes: string[] = ["/admin"];
