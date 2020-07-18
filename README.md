# Redux Put It Together

## Objectives

- Use the react-redux library and the redux library to build an application with
  multiple resources.

## Overview

In this lab we will be building an application for making quotes. This will
include creating a quote and updating the global Redux state.

In our `App` component we will render the components: `QuoteForm` & `Quotes`. We
will also need a reducer and actions file for our Quotes.

### Quotes Reducer

The quotes reducer should have an initial state of:

```javascript
[]
```

But when a Quote is added it should look like this
(we will be using the uuid node package for generating ids):

```javascript
[
  {
    id: '23423424242-42342423424242-fafdb',
    content: 'One Awesome Quote',
    author: 'Luke Ghenco'
  }
]
```

We will also need to extend out the Quotes Reducer to handle removing quotes,
upvoting quotes, and downvoting quotes as well. Check out the test specs for how
to build these.

### Quotes Actions

Build out several actions as specified in the tests that build Action Creators
for add, removing, upvoting and downvoting quotes.

### QuoteForm Component

Our Quote form will have a textarea for a quotes content and an input for a
quotes author. We will be using component state for updating the inputs so make
sure to have a state of `{ content: '', author: '' }` in your `QuoteForm`
constructor. You will make a dispatch action to Redux using an action you will
create called `addQuote()` that will take a quote as an argument and start the
reducer process.

### Quotes Component

The `Quotes` Component will render a list of individual `QuoteCard` components.
It needs to be connected to the `Redux` state so that it can render the quotes.
Also make sure to attach the remove, upvote, and downvote actions from the
Quotes Actions file to pass down as callback props to the `QuoteCard` component.

### QuoteCard Component

Make sure to connect the callback action props to the the Upvote, Downvote and
Delete buttons.

#### Example App

Here is an image of the example app, of what you are trying to build.

![quote app example](https://s3-us-west-2.amazonaws.com/curriculum-content/web-development/react/quote-app-image.png)

#### Note

We are using the `Node UUID` package for this to create random unique ids. Here
is the documentation for [Node UUID](https://github.com/kelektiv/node-uuid). To
use it just import it into your reducer and invoke it

```javascript
import uuid from 'uuid';

const id = uuid();
console.log(id) // '1fd3234'
```

