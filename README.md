# Redux Put It Together

## Objectives

Use the react-redux library and the redux library to build an application with multiple resources.

## Overview

In this lab we will be building an application for creating recipes. This will include creating a from for a new recipe with nested attributes for ingredients. 

In our `App` component we will render the components: `RecipeForm` & `Recipes`. We will also need a reducer for Recipes and Ingredients.

### RecipeForm Component 

Our Recipe form will have an input for a name and buttons for each available ingredient. When you click on the ingredient button it will associate that ingredient id to an array of ingredient ids within our recipe form data. i.e. `{ name: 'cookies', ingredientIds: [1,2,3] }`

### Recipes Component

The Recipes Component will render a list of individual recipes and their given ingredients. 

### Recipes Reducer 

The recipes reducer should have an initial state of:

```javascript 
[]
```

But when a Recipe is added it should look like.

```javascript 
[
  {
    id: 1,
    name: 'cookies',
    ingredientIds: [1,2,3]
  }
]
```

### Ingredients Reducer

The ingredients reducer should also have an initial state of: 

```javascript
[]
```

But when an Ingredient is added it should look like.

```javascript 
[
  {
    id: 1
    name: Flour
  }
]
```

#### Note 

We are using the `Node UUID` package for this to create random unique ids. Here is the documentation for [Node UUID](https://github.com/kelektiv/node-uuid). To use it just import it into your reducer and invoke it 

```javascript 
import uuid from 'uuid';

const id = uuid();
console.log(id) // '1fd3234'
```

<p class='util--hide'>View <a href='https://learn.co/lessons/cooking-with-redux'>Cooking With Redux</a> on Learn.co and start learning to code for free.</p>
