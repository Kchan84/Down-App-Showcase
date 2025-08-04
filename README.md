# Down Auth Showcase

This is a stripped-down, showcase-ready version of the authentication logic used in my "Down" app.  
It demonstrates how to implement user sign-in using **AWS Cognito**, with support for both **Apple Sign-In** and **Google Sign-In**, built using **Expo Router** and **React Native**.

---
## Tech Stack
- The name ("Down Auth Showcase")
- The `Tech Stack` list:
   React Native (via Expo)
   AWS Amplify (Auth)
   Apple & Google OAuth
   Expo Router

- Learned how to configure and manage users in aws cognito. Also learned how to configure social provider platforms for authentication(e.g sign in with apple and Sign in with google)

## Features

- OAuth login using **Google** and **Apple**
- AWS Cognito Hosted UI integration
- Deep linking support (`yourapp://`)
- Configuration handled via `aws-exports.js` and `amplifyconfiguration.json` (sanitized)
- Written with modern React (hooks + Expo Router)

---

## Project Structure

- `app/login.tsx` – Auth screen with login buttons and Console log log in success
- `app/_layout.tsx` – Root layout, handles navigation and auth context, aws configuration here
- `aws-exports.js` – Amplify-generated config (all sensitive values replaced)
- `amplifyconfiguration.json` – Advanced Auth config (also sanitized)
- `package.json` – Shows required libraries for Amplify, AuthSession, and React Native

---

## Run the Project

Install dependencies:

```bash
npm install
