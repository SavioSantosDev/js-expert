# JavaScript Lifecycle

## Notes

- Javascript WTF: Mostra coisa bizarras que dá pra fazer com Javascript

## Primitive

https://developer.mozilla.org/en-US/docs/Glossary/Primitive

In JavaScript, primitive values or data types, are data that is not an object. They are:

- string;
- number;
- boolean;
- bigint;
- undefined;
- null;
- symbol;

All primitives are immutable. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered. For example:

```typescript
let variable1 = 1;
let variable2 = variable1;

variable1 = variable1 + 1;

console.log({ variable1, variable2 }); // { variable1: 2, variable2: 1 }
```

1 - In above example, when `variable1` was created, JS allocated an address in memory (eg. **A001**) and stores the value at the allocated address.

2 - `variable2` receive the address memory of `variable1`: **A001**.

3 - When the `variable1` value has been changed, JS creates a new address in its memory **A002** and stored value 2 on it. It happened beacuse primitive data type are immutable!

```typescript
let obj1 = { a: 'a' };
let obj2 = obj1;

obj1.a = 'b';
console.log({ obj1, obj2 }); // { obj1: { a: 'b' }, obj2: { a: 'b' } }

obj1 = { c: 'c' };
console.log({ obj1, obj2 }); // { obj1: { c: 'c' }, obj2: { a: 'b' } }
```

## Call Stack and Memory Heap

https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4
https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

JavaScript is a single-threaded languge, which means it can only execute one task at a time. To manage this execution, JavaScript uses a call stack and a memory heap.

the call stack is a data structure that keeps track of where the program is in its execution. Every time a function is called, it is added to the top of the call stack. When the function returns, it is reoved from the stack. This process continues until the program completes.

The memory heap is the place whee objects and variables are stored in memory during runtime. Whenever a new variable or object is created, it is stored in the memory heap.

In summary, the call stack is a data structure that tracks the execution of functions in the program, while the memroy heap is a region of memory where objects and variables area during runtime.

## Garbage collection

- JavaScript uses automatic memory management, which means that it has a garbage collector that automatically frees up memory that is no longer being used by the program. The garbage collector runs periodically in the background to identify and remove unused objects and variables from the memory heap.

the garbage collector uses a [mark-and-sweep algorithm](https://commons.wikimedia.org/wiki/File:Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif) to identify unused memory:

1 - Mark: The garbage collector starts by marking all the objects and variables in the memory heap that are still being used by the program. It does this by starting with a set of known roots (such as global variables or active function calls) and tracing all the references from those roots to other objects and variables.

2 - Sweep: Once all the used objects and variables have been marked, the garbage collector sweeps through the memory heap, freeing up any memory that is not marked as in use. This means that ant objects or variables that are no longer referenced by the program will be removed from memory.

3 - Compact: After sweeping, the garbage collector may also choose to move objects and variables around in memory to minimize gragmentation and improve performance.

It's worth noting that the garbage collector in JavaScript is not perfect and can have some limitations. For example, it can be slower when dealing with large amounts or memory or complex data structure. Additionally, it may no always detect circular references. where objects reference each other in a loop, which an lead to memory leaks. Developers can mitigate these issues by being mindful of they code and avoiding creating unnecessary objects or keeping references to objects they no longer need.
