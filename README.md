# Pexels image gallery exercise

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Node Version

Run the `nvm use` command to set the default node version found in the `.nvmrc`
file. Similarly, if the specified node version is not installed simply run
`nvm install`.

### Install the project dependencies:

```bash
npm i
# or
yarn
```

### Create and setup necessary environment variables:

```bash
cp .env.local.default .env.local
```

Add your [Pexels API key](https://www.pexels.com/onboarding) value to
`NEXT_PUBLIC_PEXELS_API_KEY` in `.env.local`

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

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
