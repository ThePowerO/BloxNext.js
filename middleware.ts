import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt', 'fr', 'de', 'it', 'jp', 'kr', 'cn'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|fr|de|it|jp|kr|en|cn)/:path*']
};