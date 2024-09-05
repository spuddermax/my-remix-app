# Welcome to Remix!

-   [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev -- --host
```

This starts your app in development mode, rebuilding assets on file changes. -- --host cause the dev server to listen on all hosts so you can connect from other clients on the network.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

-   `build/server`
-   `build/client`
