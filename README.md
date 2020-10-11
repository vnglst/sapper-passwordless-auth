# Passwordless Authentication Starter for Sapper

## Using

- Sapper/Svelte (frontend)
- TypeScript
- Express (api)
- Prisma (ORM/database)
- Nodemailer (mail)
- yup (validation)

## Getting started

Make sure you have postgresql and redis up and running.

To test the email service don't forget to create a test account on https://ethereal.email/ (or use your own smtp server)

```bash
npm install
node setup.js # create tables
node seed.js # add some example users
npm run dev # ready!
```
