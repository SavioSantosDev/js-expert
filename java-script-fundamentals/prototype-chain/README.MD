# JavaScript Prototype Chain

In JavaScript, the prototype chain is a mechanism that allows objects to inherit properties and methods from other objects. It is a fundamental part of the langage's object-oriented programming paradigm.

Every object in JavaScript has an internal property called `[[Prototype]]`, which can be accessed using the `__proto__` property (although using `__proto__` directly is considered deprecated). The `[[Prototype]]` property refers to another object, often referred to as the object's prototype. When you try to access a property or method on an object, JavaScript first checks if the object itself has that property. If it doesn't, it looks up the prototype chain by following the `[[Prototype]]` link to find the property or method in the prototype object. This process continues recursively until the property is found or until the end of the prototype chain is reached (where `[[Prototype]]` is null).

Here's an example to illustrate the prototype chain:

```javascript
// Create a parent object
var parent = {
  property1: 'value1',
};

// Create a child object
var child = Object.create(parent);
child.property2 = 'value2';

// Access properties
console.log(child.property1); // Output: value1
console.log(child.property2); // Output: value2

// Modify parent property
parent.property1 = 'new value';

// Access properties again
console.log(child.property1); // Output: new value (inherited from the prototype chain)
console.log(child.property2); // Output: value2 (defined directly on the child)
```

In this example, parent is the prototype of child. When child is accessed for a property, such as child.property1, JavaScript first checks if child itself has that property. Since it doesn't, it follows the prototype chain to find property1 in the parent object.

The prototype chain allows for inheritance and property/method sharing between objects, enabling object-oriented programming concepts in JavaScript.