Project List:

#### initialize lerna repo for maintaining and isolating codebase

#### initialize template renderer app:

-should accept a template argument

given a specific route:

route: /products

get config from route

```
{
  templateId: 3,
  clients: [
    {
      target: 'product-feature',
      bundle: 'http://localhost:3000/client',
      ssr: true
    },
    ...more clients
  ]
}

```

- grab the template
- for each client
  - fetch bundle, if ssr is true inclue in request
  - inject string in template at target

#### Initialize client apps (product, checkout, I don't like that example)

Each app has product domain focus, and can develop independently even using different client side rendering libraries.

#### Initialize Event management system

- do we use native apis
- do we use redux?
- how do we prevent naming collision, memory leaks, etc.

### allow client applications to control their own SSR implementation
-right now we simply call ReactDOM.renderToString
-should be framework agnostic

### include vanilla js client
- why not?? :)
