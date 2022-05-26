import React from 'react';

const Blog = () => {
    return (
        <div>
            
<div class="max-w-screen-xl mx-auto p-8">
    <h2 class="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12">
        FAQs
    </h2>
    <ul class="flex items-start gap-8 flex-wrap">
        <li class="w-2/5">
            <p class="text-lg font-medium leading-6 text-gray-900">
            How will you improve the performance of a React Application?
            </p>
            <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                Keeping component state local where necessary.
Memoizing React components to prevent unnecessary re-renders.
Code-splitting in React using dynamic import()
Windowing or list virtualization in React.
Lazy loading images in React.
                </p>
            </p>
        </li>
        <li class="w-2/5">
            <p class="text-lg font-medium leading-6 text-gray-900">
            What are the different ways to manage a state in a React application?
            </p>
            <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                When we talk about state in our applications, it’s important to be clear about what types of state actually matter.

There are four main types of state you need to properly manage in your React apps:

Local state
Global state
Server state
URL state
                </p>
            </p>
        </li>
        <li class="w-2/5">
            <p class="text-lg font-medium leading-6 text-gray-900">
            How does prototypical inheritance work?
            </p>
            <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.J
                </p>
            </p>
        </li>
        <li class="w-2/5">
            <p class="text-lg font-medium leading-6 text-gray-900">
            What is a unit test? Why should write unit tests?
            </p>
            <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                    TUnit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure.
                </p>
            </p>
        </li>
        <li class="w-2/5">
            <p class="text-lg font-medium leading-6 text-gray-900">
            You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?
            </p>
            <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                Create two extra space, i.e. two extra arrays to store the product of all the array elements from start, up to that index and another array to store the product of all the array elements from the end of the array to that index. 
To get the product excluding that index, multiply the prefix product up to index i-1 with the suffix product up to index i+1.

Algorithm: 

Create two array prefix and suffix of length n, i.e length of the original array, initialize prefix[0] = 1 and suffix[n-1] = 1 and also another array to store the product.
Traverse the array from second index to end.
For every index i update prefix[i] as prefix[i] = prefix[i-1] * array[i-1], i.e store the product upto i-1 index from the start of array.
Traverse the array from second last index to start.
For every index i update suffix[i] as suffix[i] = suffix[i+1] * array[i+1], i.e store the product upto i+1 index from the end of array
Traverse the array from start to end.
For every index i the output will be prefix[i] * suffix[i], the product of the array element except that element.
                </p>
            </p>
        </li>
        
    </ul>
</div>

        </div>
    );
};

export default Blog;