# Forbes code challenge

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Node Version

Run the `nvm use` command to set the default node version found in the `.nvmrc`
file. Similarly, if the specified node version is not installed simply run
`nvm install`.

### Install the dependencies:

```bash
npm i
# or
yarn
```

## Getting a Pexels API Key

To run the app, you need an API key. To get a key:

- Create a free Pexels account
  - Go to: https://www.pexels.com/onboarding
  - Follow _"I want to download"_
  - Complete the form. _Make sure you use a valid email address_
- Confirm your email
- Visit the Image & Video API section of your account
- Provide a description and a URL. _These can be fake, feel free to use the
  examples below or write your own:_
  - Example description: _"I'm using the API for a code challenge"_
  - Example URL: https://example.com

### Create and setup necessary environment variables:

```bash
cp .env.local.default .env.local
```

Add your [Pexels API key](https://www.pexels.com/onboarding) value to
`NEXT_PUBLIC_PEXELS_API_KEY` in `.env.local`

```bash
NEXT_PUBLIC_PEXELS_API_KEY=<YOUR_API_KEY_HERE>
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

**OR**

### Build and run the server:

```bash
npm run build && npm run start
# or
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Deployed version

The app is also deployed here: https://forbes-code-challenge.vercel.app/

## Useful Commands

- `yarn dev`: starts the application in development mode with hot-code
  reloading, error reporting, and more
- `yarn format`: formats the code with prettier
- `yarn lint`: runs eslint, tsc, and stylelint
- `yarn lint:js`: runs eslint
- `yarn lint:styles`: runs stylelint
- `yarn lint:ts`: runs tsc
- `yarn lint:ts:watch`: runs tsc in watch mode
- `yarn build`: creates an optimized production build
- `yarn build && yarn start`: builds & starts the application in production
  mode. for production & starts the application in production mode
