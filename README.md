# placespace

Multi-level spatial scheduling algorithm.

## Scene

> SQL Database

- a order list and have a field for order.
- list supports inserting a or more element to any position.
- list supports removing a or more element to any position.
- list supports changing position of any one element exist to any position.
- support pagination.

## Idea

Because of pagination, we can't adopt linked list. So we need adopt order index.

If we adopt self-increasing order index when we insert element and change position of element it will always trigger full adjustment(reset order index of all elements). It is inefficient.

We leave some space between two neighber elements for inserting. For example, we set the order field of first element to `2**6`(0~`2**16` also should be blank space), the second is `2**6*2` and so on.

But because of Scene 2, inserting variable number of elements will have a high probability to trigger full adjustment. So we need do something else. We set the blank space in multi-level. These levels distinguish with amount of element. For example, we set the order field of first element to `2**6`, the second is `2**6*2`. This is the frist level for expandation. But the No.`2**6+1` is `2**6*2**6*2+2**6` not `2**6*2**6+2**6`. Where is the difference? After the No.`2**6`, we set the blank space with length of `2**6*2**6`. This space is set for expandation of the previous `2**6` elements. This is the second level. And so on. There will be third, forth, fifith,...level with different size space for expandation.

## Action abstract

1. add new elements to any position

   **input**: new elements, order index of previous element, order index of next element

   **output**: order indexs of new elements, if need full adjustment, range of full adjustment

2. remove elements

   Don't need calculate

3. move one element to any position

   like add new elements

## Add new elements to any position

> **input**: new elements, order index of previous element, order index of next element

1. calculate the space of this position(level 1), judge whether there are enough space to place new elements
2. if there are enough space goto 3 else goto 4
3. calculate the order index of new elements with maximal sparsity
4. calculate the space of higher leveljudge whether there are enough space to place new elements and exist elements
5. if there are enough space goto 6 else goto 4
6. calculate the order index of new elements and exist elements with maximal sparsity

> **something else we need**: the range(spaces) of current level, the amount of exist elements of current level, the range of next level

## Programmatic

Variables:

- ic: the amount of new elements
- ir: the initial range
- l: level
- c: the amount of elements
- r: the range of current level

Pseudocode:

```txt
// ic = xxx
// ir = xxx

r = ir
c = ic
l = 0

while() {
  if (r > c) {
    // higher level
    l += 1
    // get range of next/higher level
    r = getNextLevelRange(r, l)
    // get amount of exist elements of next/higher level
    c = getNextLevelAmount(l) + ic
  } else {
    // success
    calculateOrderIndex(r, ir, c)
    break
  }
}
```

## TODO

- expand forward
