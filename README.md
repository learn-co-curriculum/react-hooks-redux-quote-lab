# Redux Put It Together

## Objectives

Use the react-redux library and the redux library to build an application with multiple resources.

## Overview

In this lab we will be building an application for creating recipes.  One reducer will build out a resource of ingredients. Another reducer will be used for a resource of recipes.  

To add ingredients to a recipe, each recipe will have a button for every available ingredient.  To add an ingredient, click on the button and see the ingredient added to the recipe immediately.  

As you may imagine, recipes will have many ingredients.  To represent this, we will have something like:

`{recipes: {name: 'cookies', ingredients: [1, 2, 3]} }` where the ingredients array holds the foreign key of the list of ingredients.

<p class='util--hide'>View <a href='https://learn.co/lessons/cooking-with-redux'>Cooking With Redux</a> on Learn.co and start learning to code for free.</p>
