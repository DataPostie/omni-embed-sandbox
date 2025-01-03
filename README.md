# Omni Embed Example

This is an example Next.js app that shows how we can combine the Omni embed API with the Omni query API to create more streamlined user experiences.

## Flow

The `src\embedConfig.json` file contains sample users and content. Each piece of content (e.g. an Omni dashboard) can have a "preload API call", which checks whether relevant data exists for that user and only shows a tab for that dashboard if it does.

## Getting Started

Run the development server:

1) Add the relevant API keys in the `.env` file as per `example.env`
2) Update `src\embedConfig.json` with the user and content examples you'd like to test
3) Run the app with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4) Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.