const BASE_URL = process.env.BASE_URL;

export const noAccountFound = (to: string) => ({
  to,
  subject: "No account found",
  html: `
    No account found for this email address.
    You can <a href="${BASE_URL}/account/login/">try with a different email address here</a> 
    or <a href="${BASE_URL}/account/register/">create an account here.
  `,
});

export const magicLoginLink = (to: string, token: string) => ({
  to,
  subject: "Magic login link",
  html: `You can use the following <a href="${BASE_URL}/account/verify-token/${token}">magic link</a> to login.`,
});

export const alreadyUser = (to: string, token: string) => ({
  to,
  subject: "Magic login link",
  html: `
    An account was already found with this email address. 
    You can use the following 
    <a href="${BASE_URL}/account/verify-token/${token}">magic link</a>
    to login.
  `,
});

export const newUser = (to: string, token: string) => ({
  to,
  subject: "Magic login link",
  html: `
    An account was created for this email address. 
    You can use the following 
    <a href="${BASE_URL}/account/verify-token/${token}">magic link</a> 
    to login.
  `,
});
