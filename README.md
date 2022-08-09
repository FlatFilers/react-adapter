# The Flatfile Component - @flatfile/react

We've made it really simple for you to get started with Flatfile with our new Flatfile Component. Here's what you'll need to know to get started.

> NOTE: If you upgrading from previous versions, v3+ comes with some updates & breaking changes

#### BREAKING CHANGES:

Note that the latest version of `@flatfile/react` 3+ uses the new `@flatfile/sdk` underneath which changes the API surface of interacting with the flatfile adapter entirely.

[Read more about these changes here](https://flatfile.com/docs/implementing-embeds/)

There is now only 1 required input, and that is `[token]` (which you must receive from your backend).

[Read more about generating a Token here](https://flatfile.com/docs/sdk/)

## Getting started with Flatfile Portal

First, create a Portal in the [Flatfile dashboard](https://app.flatfile.io/). Next, install the dependency via npm:

`npm install @flatfile/react --save`

### The FlatfileButton usage

```js
import { FlatfileButton } from '@flatfile/react'

<FlatfileButton
  token={'YOUR_JWT'}
  onInit={({ batchId }) => console.log(`Flatfile importer is launched with batchId: ${batchId}`)}
  onComplete={async (payload) => {
    const SAMPLE_DATA = true
    console.log(JSON.stringify(await payload.data(SAMPLE_DATA), null, 4))
  }}
  onError={(err) => console.error(err)}
/>

```
