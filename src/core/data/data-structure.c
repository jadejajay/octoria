// Data Management concepts,
//  Data types – primitive and non-primitive,
//  Performance Analysis and Measurement (Time and space analysis of algorithms-Average, best and worst case analysis),
//  Types of Data Structures- Linear & Non Linear Data Structures.

// Array: Representation of arrays,
//  Applications of arrays,
// sparse matrix and its representation Stack: Stack-Definitions & Concepts,
//  Operations On Stacks,
//  Applications of Stacks,
// Polish Expression,
//  Reverse Polish Expression And Their Compilation,
//  Recursion,
// Tower of Hanoi Queue: Representation Of Queue,
//  Operations On Queue,
// Circular Queue,
//  Priority Queue,
// Array representation of Priority Queue,
//  Double Ended Queue,
// Applications of Queue Linked List: Singly Linked List, 
// Doubly Linked list,
// Circular linked list ,
// Linked implementation of Stack,
// Linked implementation of Queue,
//  Applications of linked list.


// what is Data Management concepts?
//Data Management concepts is the process of ingesting, storing, organizing and maintaining the data created and collected by an organization.
// Effective data management is a crucial piece of deploying the IT systems that run business applications and provide
// analytical information to help drive operational decision-making and strategic planning by corporate executives,
// business managers and other end users.

// what is Data types – primitive and non-primitive?
// Primitive data types are predefined data types.
// They are supported by the programming language.
// For example, integer, character, and string are all primitive data types.
// Non-primitive data types are not defined by the programming language,
// but are instead created by the programmer.
// For example, arrays, lists, classes, etc. are non-primitive data types.

// what is Performance Analysis and Measurement (Time and space analysis of algorithms-Average, best and worst case analysis)?
// Time complexity is a function describing the amount of time an algorithm takes in terms of the amount of input to the algorithm.
// Space complexity is a function describing the amount of memory (space) an algorithm takes in terms of the amount of input to the algorithm.

// what is Types of Data Structures- Linear & Non Linear Data Structures?
// Linear data structures: A data structure is said to be linear if its elements form a sequence or a linear list.
// Examples of linear data structure include arrays, linked lists, stacks, and queues.
// Non-linear data structures: A data structure is said to be non-linear if traversal of nodes is nonlinear in nature.
// Examples of nonlinear data structure include trees and graphs.

// what is Array: Representation of arrays?
// An array is a collection of items stored at contiguous memory locations.
// The idea is to store multiple items of the same type together.
// This makes it easier to calculate the position of each element by simply adding an offset to a base value,
// i.e., the memory location of the first element of the array (generally denoted by the name of the array).
//Ex. int arr[10]; // an array of 10 integers

// what is Applications of arrays?
// Arrays are used to implement mathematical vectors and matrices, as well as other kinds of rectangular tables.
// Many databases, small and large, consist of (or include) one-dimensional arrays whose elements are records.
// Arrays are used to implement other data structures, such as lists, heaps, hash tables, deques, queues, stacks, strings, and VLists.

// what is sparse matrix and its representation?
// A sparse matrix is a matrix in which most of the elements are zero.
// By contrast, if most of the elements are nonzero, then the matrix is considered dense.
// The number of zero-valued elements divided by the total number of elements (e.g., m × n for an m × n matrix) is called the sparsity of the matrix (which is equal to 1 minus the density of the matrix).
// Using those definitions, a matrix will be sparse when its sparsity is greater than 0.5.
// The sparsity of a matrix can vary from 0 (a dense matrix) to 1 (a truly sparse matrix).
// Sparse matrices are used in specific ways to improve efficiency.
// The sparsity of a matrix is useful in algorithms that are designed to work with sparse matrices, because it affects the time needed for operations such as addition, multiplication, inversion, and so on.
// The sparsity is also useful in that it can be used to set an appropriate threshold for rounding error in iterative methods such as relaxation methods: if the matrix is sparse, then the error is unlikely to grow beyond the threshold, and so the iteration can be stopped.
// Ex. 0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0
//     0 0 0 0 0 0 0 0 0

// what is Stack: Stack-Definitions & Concepts?
// A stack is an abstract data type that serves as a collection of elements, with two main principal operations:
// push, which adds an element to the collection, and
// pop, which removes the most recently added element that was not yet removed.
// The order in which elements come off a stack gives rise to its alternative name, LIFO (last in, first out).
// Additionally, a peek operation may give access to the top without modifying the stack.
// The name "stack" for this type of structure comes from the analogy to a set of physical items stacked on top of each other,
// which makes it easy to take an item off the top of the stack, while getting to an item deeper in the stack may require taking off multiple other items first.
// Considered as a linear data structure, or more abstractly a sequential collection, the push and pop operations occur only at one end of the structure,
// referred to as the top of the stack.

// what is Operations On Stacks?
// push: Adds an item in the stack. If the stack is full, then it is said to be an Overflow condition.
// pop: Removes an item from the stack. The items are popped in the reversed order in which they are pushed.
// If the stack is empty, then it is said to be an Underflow condition.
// peek or top: Returns top element of stack.
// isEmpty: Returns true if stack is empty, else false.

// implementation of stack in c
#include <stdio.h>
#include <stdlib.h>
typedef struct stack
{
    int size;
    int top; // ---> This is the index of the topmost element of the stack
    int *arr; // ---> This is the pointer to an array which is going to be created dynamically
} Stack;
int isEmpty(Stack *ptr) // ---> This function will return 1 if the stack is empty, else it will return 0
{
    if (ptr->top == -1) // ---> This means that the stack is empty as the top is -1
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
int isFull(Stack *ptr)
{
    if (ptr->top == ptr->size - 1) // ---> This means that the stack is full as the top is equal to the size of the stack - 1
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
void push(Stack *ptr, int val)
{
    if (isFull(ptr))
    {
        printf("Stack Overflow! Cannot push %d to the stack\n", val);
    }
    else
    {
        ptr->top++;
        ptr->arr[ptr->top] = val; // ---> This is the value which is going to be pushed into the stack
    }
}
int pop(Stack *ptr)
{
    if (isEmpty(ptr))
    {
        printf("Stack Underflow! Cannot pop from the stack\n");
        return -1;
    }
    else
    {
        int val = ptr->arr[ptr->top]; // ---> This is the value which is going to be popped out
        ptr->top--;
        return val;
    }
}
int peek(Stack *sp, int i)
{
    int arrayInd = sp->top - i + 1; // ---> This is the formula to find the index of the element which is going to be peeked
    if (arrayInd < 0)
    {
        printf("Not a valid position for the stack\n");
        return -1;
    }
    else
    {
        return sp->arr[arrayInd]; // ---> This is the value which is going to be peeked
    }
}
int stackTop(Stack *sp)
{
    return sp->arr[sp->top]; // ---> This is the value which is going to be returned
}
int stackBottom(Stack *sp)
{
    return sp->arr[0]; // ---> This is the value which is going to be returned
}
int main()
{
    Stack *sp = (Stack *)malloc(sizeof(Stack)); // ---> This is the pointer to the stack which is going to be created dynamically
    sp->size = 10;
    sp->top = -1;
    sp->arr = (int *)malloc(sp->size * sizeof(int)); // ---> This is the pointer to an array which is going to be created dynamically
    printf("Stack has been created successfully\n");
    printf("Before pushing, Full: %d\n", isFull(sp));
    printf("Before pushing, Empty: %d\n", isEmpty(sp));
    push(sp, 1);
    push(sp, 23);
    push(sp, 99);
    push(sp, 75);
    push(sp, 3);
    push(sp, 64);
    push(sp, 57);
    push(sp, 46);
    push(sp, 89);
    push(sp, 9); // ---> Pushed 10 values
    // push(sp, 109); // Stack Overflow since the size of the stack is 10
    printf("After pushing, Full: %d\n", isFull(sp));
    printf("After pushing, Empty: %d\n", isEmpty(sp));
    printf("Popped %d from the stack\n", pop(sp)); // --> Last in first out!
    printf("Popped %d from the stack\n", pop(sp)); // --> Last in first out!
    printf("Popped %d from the stack\n", pop(sp)); // --> Last in first out!
    printf("After popping, Full: %d\n", isFull(sp));
    printf("After popping, Empty: %d\n", isEmpty(sp));
    printf("Peeked %d from the stack\n", peek(sp, 5));
    printf("The top most element of this stack is %d\n", stackTop(sp));
    printf("The bottom most element of this stack is %d\n", stackBottom(sp));
    return 0;
}

// what is Applications of Stacks?
// Stacks are used to implement functions, parsers, expression evaluation, and backtracking algorithms.
// A pile of books, a stack of plates, a box in a pile of boxes, a deck of cards are all examples of stacks in real life.
// A stack is a data structure that stores items in an Last-In/First-Out (LIFO) or First-In/Last-Out (FILO) manner.
// In stack, a new element is added at one end and an element is removed from that end only.
// The insert and delete operations are often called push and pop.

// what is Polish Expression?
// In computer science, a Polish notation, also known as Polish prefix notation, is a notational system for logic, arithmetic, and algebra.
// Its distinguishing feature is that it places operators to the left of their operands.
// If the arity of the operators is fixed, the result is a syntax lacking parentheses or other brackets that can still be parsed without ambiguity.
// The Polish logician Jan Łukasiewicz invented this notation in 1924 in order to simplify sentential logic and reduce logical expressions to their simplest forms.
// The notation is distinguished from the reverse Polish notation (RPN), in which operators are placed after their operands.
// Since Polish notation is fully parenthesized, the usual rules of operator precedence are not needed.
// Due to the Polish prefix notation, expressions can be parsed using a simple stack-based algorithm; this property is also shared by postfix notations (RPN).
// The following rules apply to expressions written in Polish notation:
// 1. The Polish notation form of an expression places operators to the left of their operands.
// 2. The Polish notation form of an expression places a binary operator before its operands.
// 3. The Polish notation form of an expression places a unary operator before its operand.
// 4. No parentheses are required in Polish notation.
// 5. The order of evaluation does not need to be specified in Polish notation, as it is unambiguous.
// 6. The Polish notation form of an expression is easy to evaluate using a stack.
// 7. The Polish notation form of an expression is easy to convert into other notations.
// 8. The Polish notation form of an expression is easy to evaluate using a tree.
// 9. The Polish notation form of an expression is easy to evaluate using recursion.
// 10. The Polish notation form of an expression is easy to evaluate using a linked list.
// 11. The Polish notation form of an expression is easy to evaluate using a queue.
// 12. The Polish notation form of an expression is easy to evaluate using a heap.
// 13. The Polish notation form of an expression is easy to evaluate using a hash table.
// 14. The Polish notation form of an expression is easy to evaluate using a priority queue.
// 15. The Polish notation form of an expression is easy to evaluate using a graph.
// 16. The Polish notation form of an expression is easy to evaluate using a set.
// 17. The Polish notation form of an expression is easy to evaluate using a dynamic array.
// 18. The Polish notation form of an expression is easy to evaluate using a binary search tree.
// 19. The Polish notation form of an expression is easy to evaluate using a binary tree.
// ex 1. Infix: (A + B) * (C + D)
//     Prefix: * + A B + C D
//     Postfix: A B + C D + *


// what is Reverse Polish Expression And Their Compilation?
// Reverse Polish notation (RPN), also known as Polish postfix notation or simply postfix notation, is a mathematical notation in which operators follow their operands, in contrast to Polish notation (PN), in which operators precede their operands.
// It does not need any parentheses as long as each operator has a fixed number of operands.

// what is Recursion?
// Recursion is the process of repeating items in a self-similar way.
// In programming languages, if a program allows you to call a function inside the same function, then it is called a recursive call of the function.
// The C programming language supports recursion, i.e., a function to call itself.
// But while using recursion, programmers need to be careful to define an exit condition from the function, otherwise it will go into an infinite loop.
// ex. 
int factorial(int n)
{
    if (n == 0)
        return 1;
    else
        return (n * factorial(n - 1));
}

// what is Tower of Hanoi?
// The Tower of Hanoi is a mathematical game or puzzle.
// It consists of three rods and a number of disks of different sizes, which can slide onto any rod.
// The puzzle starts with the disks stacked on one rod in order of decreasing size, the smallest at the top, thus approximating a conical shape.
// The objective of the puzzle is to move the entire stack to another rod, obeying the following rules:
// 1. Only one disk may be moved at a time.
// 2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
// 3. No larger disk may be placed on top of a smaller disk.
// With three disks, the puzzle can be solved in seven moves.
// The minimum number of moves required to solve a Tower of Hanoi puzzle is 2n − 1, where n is the number of disks.
// The puzzle was invented by the French mathematician Édouard Lucas in 1883.
// There is a story about an Indian temple in Kashi Vishwanath which contains a large room with three time-worn posts in it surrounded by 64 golden disks.
// Brahmin priests, acting out the command of an ancient prophecy, have been moving these disks, in accordance with the immutable rules of the Brahma, since that time.
// The puzzle is therefore also known as the Tower of Brahma puzzle.
// According to the legend, when the last move of the puzzle will be completed, the world will end.
// It is not clear whether Lucas invented this legend or was inspired by it.
// There is another legend about an Indian temple in Kashi Vishwanath which contains a large room with three time-worn posts in it surrounded by 64 golden disks.
// Brahmin priests, acting out the command of an ancient prophecy, have been moving these disks, in accordance with the immutable rules of the Brahma, since that time.
// The puzzle is therefore also known as the Tower of Brahma puzzle.
// According to the legend, when the last move of the puzzle will be completed, the world will end.
// It is not clear whether Lucas invented this legend or was inspired by it.
// ex. void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod)
// {
//     if (n == 1)
//     {
//         printf("Move disk 1 from rod %c to rod %c\n", from_rod, to_rod);
//         return;
//     }
//     towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
//     printf("Move disk %d from rod %c to rod %c\n", n, from_rod, to_rod);
//     towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
// }

// what is Queue: Representation Of Queue?
// A queue is a linear data structure that stores items in First In First Out (FIFO) manner.
// With a queue the least recently added item is removed first.
// A good example of queue is any queue of consumers for a resource where the consumer that came first is served first. 
// The difference between stacks and queues is in removing.
// In a stack we remove the item the most recently added; in a queue, we remove the item the least recently added.

// what is Operations On Queue?
// enqueue: Adds an item to the queue. If the queue is full, then it is said to be an Overflow condition.
// dequeue: Removes an item from the queue. The items are popped in the same order in which they are pushed.
// If the queue is empty, then it is said to be an Underflow condition.
// front: Get the front item from queue.
// rear: Get the last item from queue.
// isEmpty: Checks if the queue is empty or not.
// isFull: Checks if the queue is full or not.

// implementation of queue in c
#include <stdio.h>
#include <stdlib.h>

typedef struct queue
{
    int size;
    int f; // ---> This is the index of the frontmost element of the queue
    int r; // ---> This is the index of the rearmost element of the queue
    int *arr; // ---> This is the pointer to an array which is going to be created dynamically
} Queue;

int isEmpty(Queue *q) // ---> This function will return 1 if the queue is empty, else it will return 0
{
    if (q->r == q->f) // ---> This means that the queue is empty as the rearmost element is equal to the frontmost element
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

int isFull(Queue *q) // ---> This function will return 1 if the queue is full, else it will return 0
{
    if (q->r == q->size - 1) // ---> This means that the queue is full as the rearmost element is equal to the size of the queue - 1
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

void enqueue(Queue *q, int val)
{
    if (isFull(q))
    {
        printf("Queue Overflow! Cannot enqueue %d to the queue\n", val);
    }
    else
    {
        q->r++;
        q->arr[q->r] = val; // ---> This is the value which is going to be enqueued into the queue
    }
}

int dequeue(Queue *q)
{
    if (isEmpty(q))
    {
        printf("Queue Underflow! Cannot dequeue from the queue\n");
        return -1;
    }
    else
    {
        q->f++;
        int val = q->arr[q->f]; // ---> This is the value which is going to be dequeued
        return val;
    }
}

int main()
{
    Queue *q = (Queue *)malloc(sizeof(Queue)); // ---> This is the pointer to the queue which is going to be created dynamically
    q->size = 10;
    q->f = q->r = -1;
    q->arr = (int *)malloc(q->size * sizeof(int)); // ---> This is the pointer to an array which is going to be created dynamically
    printf("Queue has been created successfully\n");
    printf("Before enqueueing, Full: %d\n", isFull(q));
    printf("Before enqueueing, Empty: %d\n", isEmpty(q));
    enqueue(q, 1);
    enqueue(q, 23);
    enqueue(q, 99);
    enqueue(q, 75);
    enqueue(q, 3);
    enqueue(q, 64);
    enqueue(q, 57);
    enqueue(q, 46);
    enqueue(q, 89);
    enqueue(q, 9); // ---> Enqueued 10 values
    // enqueue(q, 109); // Queue Overflow since the size of the queue is 10
    printf("After enqueueing, Full: %d\n", isFull(q));
    printf("After enqueueing, Empty: %d\n", isEmpty(q));
    printf("Dequeued %d from the queue\n", dequeue(q)); // --> First in first out!
    printf("Dequeued %d from the queue\n", dequeue(q)); // --> First in first out!
    printf("Dequeued %d from the queue\n", dequeue(q)); // --> First in first out!
    printf("After dequeueing, Full: %d\n", isFull(q));
    printf("After dequeueing, Empty: %d\n", isEmpty(q));
    return 0;
}

// what is Circular Queue?
// A circular queue is a data structure that uses a single, fixed-size buffer as if it were connected end-to-end.
// This structure lends itself easily to buffering data streams.
// ex. 
void enqueue(int val)
{
    if ((r == size - 1 && f == 0) || (r == f - 1))
    {
        printf("Queue Overflow! Cannot enqueue %d to the queue\n", val);
    }
    else
    {
        if (r == size - 1 && f != 0)
        {
            r = 0;
        }
        else
        {
            r++;
        }
        arr[r] = val; // ---> This is the value which is going to be enqueued into the queue
    }
}

// what is Priority Queue?
// A priority queue is a special type of queue in which each element is associated with a priority and is served according to its priority.
// If elements with the same priority occur, they are served according to their order in the queue.
// Priority Queue is an extension of the queue with following properties.
// 1. Every item has a priority associated with it.
// 2. An element with high priority is dequeued before an element with low priority.
// 3. If two elements have the same priority, they are served according to their order in the queue.
// A typical priority queue supports following operations.
// 1. insert(item, priority): Inserts an item with given priority.
// 2. getHighestPriority(): Returns the highest priority item.
// 3. deleteHighestPriority(): Removes the highest priority item.
// ex. struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};
struct Queue *createQueue(unsigned capacity)
{
    struct Queue *queue = (struct Queue *)malloc(sizeof(struct Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}
int isFull(struct Queue *queue)
{
    return (queue->size == queue->capacity);
}
int isEmpty(struct Queue *queue)
{
    return (queue->size == 0);
}
void enqueue(struct Queue *queue, int item)
{
    if (isFull(queue))
        return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\n", item);
}
int dequeue(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}
int front(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->front];
}
int rear(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->rear];
}

// what is Array representation of Priority Queue?
// A priority queue can be implemented using an array.
// Operations on Priority Queue:
// 1. getHighestPriority(): O(n)
// 2. deleteHighestPriority(): O(n)
// 3. insert(): O(n)
// 4. delete(): O(n)
// ex. struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};
struct Queue *createQueue(unsigned capacity)
{
    struct Queue *queue = (struct Queue *)malloc(sizeof(struct Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}
int isFull(struct Queue *queue)
{
    return (queue->size == queue->capacity);
}
int isEmpty(struct Queue *queue)
{
    return (queue->size == 0);
}
void enqueue(struct Queue *queue, int item)
{
    if (isFull(queue))
        return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\n", item);
}
int dequeue(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}  
int front(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->front];
}
int rear(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->rear];
}

// what is Double Ended Queue?
// A double-ended queue is an abstract data type that generalizes a queue, for which elements can be added to or removed from either the front (head) or back (tail).
// It is also often called a head-tail linked list, though properly this refers to a specific data structure implementation of a deque (see below).
// Double-ended queues are often referred to by their acronym, deque.
// Double-ended queues can be implemented using various data structures, such as dynamic arrays or linked lists.
// They can have a capacity (an upper bound on the number of elements that can be stored) or not.
// If the capacity is zero, we call it an unbounded deque.
// If the capacity is fixed, we call it a bounded deque.
// ex. struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};
struct Queue *createQueue(unsigned capacity)
{
    struct Queue *queue = (struct Queue *)malloc(sizeof(struct Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}
int isFull(struct Queue *queue)
{
    return (queue->size == queue->capacity);
}
int isEmpty(struct Queue *queue)
{
    return (queue->size == 0);
}
void enqueue(struct Queue *queue, int item)
{
    if (isFull(queue))
        return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\n", item);
}
int dequeue(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}
int front(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->front];
}
int rear(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->rear];
}

// what is Applications of Queue?
// Queue is used when things don’t have to be processed immediately, but have to be processed in First In First Out order like Breadth First Search.
// This property of Queue makes it also useful in following kind of scenarios.
// 1. When a resource is shared among multiple consumers. Examples include CPU scheduling, Disk Scheduling.
// 2. When data is transferred asynchronously (data not necessarily received at same rate as sent) between two processes.
// Examples include IO Buffers, pipes, file IO, etc.
// ex. struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};
struct Queue *createQueue(unsigned capacity)
{
    struct Queue *queue = (struct Queue *)malloc(sizeof(struct Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}
int isFull(struct Queue *queue)
{
    return (queue->size == queue->capacity);
}
int isEmpty(struct Queue *queue)
{
    return (queue->size == 0);
}
void enqueue(struct Queue *queue, int item)
{
    if (isFull(queue))
        return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\n", item);
}
int dequeue(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}
int front(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->front];
}
int rear(struct Queue *queue)
{
    if (isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->rear];
}

// what is Linked List: Singly Linked List?
// A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations.
// The elements in a linked list are linked using pointers.
// In simple words, a linked list consists of nodes where each node contains a data field and a reference(link) to the next node in the list. 
// ex. struct Node
{
    int data;
    struct Node *next;
};
void linkedListTraversal(struct Node *ptr)
{
    while (ptr != NULL)
    {
        printf("Element: %d\n", ptr->data);
        ptr = ptr->next;
    }
}
int main()
{
    struct Node *head;
    struct Node *second;
    struct Node *third;
    struct Node *fourth;
    // Allocate memory for nodes in the linked list in Heap
    head = (struct Node *)malloc(sizeof(struct Node));
    second = (struct Node *)malloc(sizeof(struct Node));
    third = (struct Node *)malloc(sizeof(struct Node));
    fourth = (struct Node *)malloc(sizeof(struct Node));
    // Link first and second nodes
    head->data = 7;
    head->next = second;
    // Link second and third nodes
    second->data = 11;
    second->next = third;
    // Link third and fourth nodes
    third->data = 41;
    third->next = fourth;
    // Terminate the list at the third node
    fourth->data = 66;
    fourth->next = NULL;
    linkedListTraversal(head);
    return 0;
}

// what is Circular Linked List?
// Circular Linked List is a variation of Linked list in which the first element points to the last element and the last element points to the first element.
// Both Singly Linked List and Doubly Linked List can be made into a circular linked list.
// ex. 
struct Node
{
    int data;
    struct Node *next;
};

void linkedListTraversal(struct Node *head)
{
    struct Node *ptr = head;
    do
    {
        printf("Element: %d\n", ptr->data);
        ptr = ptr->next;
    } while (ptr != head);
}

int main()
{
    struct Node *head;
    struct Node *second;
    struct Node *third;
    struct Node *fourth;
    // Allocate memory for nodes in the linked list in Heap
    head = (struct Node *)malloc(sizeof(struct Node));
    second = (struct Node *)malloc(sizeof(struct Node));
    third = (struct Node *)malloc(sizeof(struct Node));
    fourth = (struct Node *)malloc(sizeof(struct Node));
    // Link first and second nodes
    head->data = 7;
    head->next = second;
    // Link second and third nodes
    second->data = 11;
    second->next = third;
    // Link third and fourth nodes
    third->data = 41;
    third->next = fourth;
    // Terminate the list at the third node
    fourth->data = 66;
    fourth->next = head;
    linkedListTraversal(head);
    return 0;
}

// what is Doubly Linked List?
// A Doubly Linked List (DLL) contains an extra pointer, typically called previous pointer, together with next pointer and data which are there in singly linked list.
// Advantages over singly linked list
// 1. A DLL can be traversed in both forward and backward direction.
// 2. The delete operation in DLL is more efficient if pointer to the node to be deleted is given.
// 3. We can quickly insert a new node before a given node.
// In singly linked list, to delete a node, pointer to the previous node is needed.
// To get this previous node, sometimes the list is traversed.
// In DLL, we can get the previous node using previous pointer.
// ex.
struct Node
{
    int data;
    struct Node *next;
    struct Node *prev;
};

void linkedListTraversal(struct Node *head)
{
    struct Node *ptr = head;
    do
    {
        printf("Element: %d\n", ptr->data);
        ptr = ptr->next;
    } while (ptr != NULL);
}

int main()
{
    struct Node *head;
    struct Node *second;
    struct Node *third;
    struct Node *fourth;
    // Allocate memory for nodes in the linked list in Heap
    head = (struct Node *)malloc(sizeof(struct Node));
    second = (struct Node *)malloc(sizeof(struct Node));
    third = (struct Node *)malloc(sizeof(struct Node));
    fourth = (struct Node *)malloc(sizeof(struct Node));
    // Link first and second nodes
    head->data = 7;
    head->next = second;
    head->prev = NULL;
    // Link second and third nodes
    second->data = 11;
    second->next = third;
    second->prev = head;
    // Link third and fourth nodes
    third->data = 41;
    third->next = fourth;
    third->prev = second;
    // Terminate the list at the third node
    fourth->data = 66;
    fourth->next = NULL;
    fourth->prev = third;
    linkedListTraversal(head);
    return 0;
}

// Linked implementation of Stack
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *top = NULL;

void linkedListTraversal(struct Node *ptr)
{
    while (ptr != NULL)
    {
        printf("Element: %d\n", ptr->data);
        ptr = ptr->next;
    }
}

int isEmpty(struct Node *top)
{
    if (top == NULL)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

int isFull(struct Node *top)
{
    struct Node *p = (struct Node *)malloc(sizeof(struct Node));
    if (p == NULL)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

struct Node *push(struct Node *top, int x)
{
    if (isFull(top))
    {
        printf("Stack Overflow\n");
    }
    else
    {
        struct Node *n = (struct Node *)malloc(sizeof(struct Node));
        n->data = x;
        n->next = top;
        top = n;
        return top;
    }
}

int pop(struct Node *tp)
{
    if (isEmpty(tp))
    {
        printf("Stack Underflow\n");
    }
    else
    {
        struct Node *n = tp;
        top = (tp)->next;
        int x = n->data;
        free(n);
        return x;
    }
}

int peek(int pos)
{
    struct Node *ptr = top;
    for (int i = 0; (i < pos - 1 && ptr != NULL); i++)
    {
        ptr = ptr->next;
    }
    if (ptr != NULL)
    {
        return ptr->data;
    }
    else
    {
        return -1;
    }
}

int stackTop(struct Node *top)
{
    return top->data;
}

int stackBottom(struct Node *top)
{
    struct Node *ptr = top;
    while (ptr->next != NULL)
    {
        ptr = ptr->next;
    }
    return ptr->data;
}

int main()
{
    top = push(top, 78);
    top = push(top, 7);
    top = push(top, 8);
    top = push(top, 9);
    top = push(top, 11);
    linkedListTraversal(top);
    for (int j = 1; j <= 5; j++)
    {
        printf("The value at position %d is %d\n", j, peek(j));
    }
    printf("The topmost element of this stack is %d\n", stackTop(top));
    printf("The bottommost element of this stack is %d\n", stackBottom(top));
    return 0;
}

// Linked implementation of Queue
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *front = NULL;

struct Node *rear = NULL;

void linkedListTraversal(struct Node *ptr)
{
    while (ptr != NULL)
    {
        printf("Element: %d\n", ptr->data);
        ptr = ptr->next;
    }
}

int isEmpty(struct Node *front)
{
    if (front == NULL)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

int isFull(struct Node *rear)
{
    struct Node *p = (struct Node *)malloc(sizeof(struct Node));
    if (p == NULL)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

struct Node *enqueue(struct Node *rear, int x)
{
    if (isFull(rear))
    {
        printf("Queue Overflow\n");
    }
    else
    {
        struct Node *n = (struct Node *)malloc(sizeof(struct Node));
        n->data = x;
        n->next = NULL;
        if (front == NULL)
        {
            front = rear = n;
        }
        else
        {
            rear->next = n;
            rear = n;
        }
        return rear;
    }
}

int dequeue(struct Node *front)
{
    if (isEmpty(front))
    {
        printf("Queue Underflow\n");
    }
    else
    {
        struct Node *n = front;
        front = front->next;
        int x = n->data;
        free(n);
        return x;
    }
}

int main()
{
    rear = enqueue(rear, 78);
    rear = enqueue(rear, 7);
    rear = enqueue(rear, 8);
    rear = enqueue(rear, 9);
    rear = enqueue(rear, 11);
    linkedListTraversal(front);
    printf("dequeuing element %d\n", dequeue(front));
    printf("dequeuing element %d\n", dequeue(front));
    printf("dequeuing element %d\n", dequeue(front));
    printf("dequeuing element %d\n", dequeue(front));
    printf("dequeuing element %d\n", dequeue(front));
    printf("dequeuing element %d\n", dequeue(front));
    return 0;
}


// Tree-Definitions and Concepts,
//  Representation of binary tree,
//  Binary tree traversal (Inorder, postorder, preorder),
// Threaded binary tree,
//  Binary search trees,
//   Conversion of General Trees To Binary Trees,
//  Applications Of TreesSome balanced tree mechanism, eg. AVL trees, 2-3 trees,
// Height Balanced,
//  Weight Balance,
//   Graph-Matrix Representation Of Graphs,
//  Elementary Graph operations,
// (Breadth First Search, Depth First Search,
// Spanning Trees, Shortest path, Minimal spanning tree ) 



// what is Tree: Binary Tree?
// A tree whose elements have at most 2 children is called a binary tree.
// Since each element in a binary tree can have only 2 children, we typically name them the left and right child.
// A Binary Tree node contains following parts.
// 1. Data
// 2. Pointer to left child
// 3. Pointer to right child
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

// what is Tree: Binary Search Tree?
// Binary Search Tree, is a node-based binary tree data structure which has the following properties:
// 1. The left subtree of a node contains only nodes with keys lesser than the node’s key.
// 2. The right subtree of a node contains only nodes with keys greater than the node’s key.
// 3. The left and right subtree each must also be a binary search tree.
// There must be no duplicate nodes.
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node *createNode(int data)
{
    struct Node *n; // Creating a node pointer
    n = (struct Node *)malloc(sizeof(struct Node)); // Allocating memory in the heap
    n->data = data; // Setting the data
    n->left = NULL; // Setting the left and right children to NULL
    n->right = NULL; // Setting the left and right children to NULL
    return n; // Finally returning the created node
}

void preOrder(struct Node *root)
{
    if (root != NULL)
    {
        printf("%d ", root->data);
        preOrder(root->left);
        preOrder(root->right);
    }
}

void inOrder(struct Node *root)
{
    if (root != NULL)
    {
        inOrder(root->left);
        printf("%d ", root->data);
        inOrder(root->right);
    }
}

void postOrder(struct Node *root)
{
    if (root != NULL)
    {
        postOrder(root->left);
        postOrder(root->right);
        printf("%d ", root->data);
    }
}

int isBST(struct Node *root)
{
    static struct Node *prev = NULL;
    if (root != NULL)
    {
        if (!isBST(root->left))
        {
            return 0;
        }
        if (prev != NULL && root->data <= prev->data)
        {
            return 0;
        }
        prev = root;
        return isBST(root->right);
    }
    else
    {
        return 1;
    }
}

struct Node *searchIter(struct Node *root, int key)
{
    while (root != NULL)
    {
        if (key == root->data)
        {
            return root;
        }
        else if (key < root->data)
        {
            root = root->left;
        }
        else
        {
            root = root->right;
        }
    }
    return NULL;
}

struct Node *searchRec(struct Node *root, int key)
{
    if (root == NULL || root->data == key)
    {
        return root;
    }
    else if (key < root->data)
    {
        return searchRec(root->left, key);
    }
    else
    {
        return searchRec(root->right, key);
    }
}

struct Node *inOrderPre(struct Node *root)
{
    root = root->left;
    while (root != NULL && root->right != NULL)
    {
        root = root->right;
    }
    return root;
}

struct Node *inOrderSucc(struct Node *root)
{
    root = root->right;
    while (root != NULL && root->left != NULL)
    {
        root = root->left;
    }
    return root;
}

struct Node *deleteNode(struct Node *root, int value)
{
    struct Node *iPre;
    struct Node *iSucc;
    if (root == NULL)
    {
        return NULL;
    }
    if (root->left == NULL && root->right == NULL)
    {
        free(root);
        return NULL;
    }
    if (value < root->data)
    {
        root->left = deleteNode(root->left, value);
    }
    else if (value > root->data)
    {
        root->right = deleteNode(root->right, value);
    }
    else
    {
        iPre = inOrderPre(root);
        if (iPre != NULL)
        {
            root->data = iPre->data;
            root->left = deleteNode(root->left, iPre->data);
        }
        else
        {
            iSucc = inOrderSucc(root);
            root->data = iSucc->data;
            root->right = deleteNode(root->right, iSucc->data);
        }
    }
    return root;
}

int main()
{
    struct Node *p = createNode(5);
    struct Node *p1 = createNode(3);
    struct Node *p2 = createNode(6);
    struct Node *p3 = createNode(1);
    struct Node *p4 = createNode(4);
    p->left = p1;
    p->right = p2;
    p1->left = p3;
    p1->right = p4;
    printf("The value of p is: %d\n", p->data);
    printf("The value of p1 is: %d\n", p1->data);
    printf("The value of p2 is: %d\n", p2->data);
    printf("The value of p3 is: %d\n", p3->data);
    printf("The value of p4 is: %d\n", p4->data);
    printf("The preorder traversal is: ");
    preOrder(p);
    printf("\n");
    printf("The inorder traversal is: ");
    inOrder(p);
    printf("\n");
    printf("The postorder traversal is: ");
    postOrder(p);
    printf("\n");
    if (isBST(p))
    {
        printf("It is a BST\n");
    }
    else
    {
        printf("It is not a BST\n");
    }
    struct Node *n = searchIter(p, 4);
    if (n != NULL)
    {
        printf("Iterative: Found: %d\n", n->data);
    }
    else
    {
        printf("Element not found\n");
    }
    n = searchRec(p, 4);
    if (n != NULL)
    {
        printf("Recursive: Found: %d\n", n->data);
    }
    else
    {
        printf("Element not found\n");
    }
    return 0;
}

// what is Threaded Binary Tree?
// A binary tree is threaded by making all right child pointers that would normally be NULL point to the inorder successor of the node (if it exists), and all left child pointers that would normally be NULL point to the inorder predecessor of the node.
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
    int rightThread;
};

struct Node *createNode(int data)
{
    struct Node *n; // Creating a node pointer
    n = (struct Node *)malloc(sizeof(struct Node)); // Allocating memory in the heap
    n->data = data; // Setting the data
    n->left = NULL; // Setting the left and right children to NULL
    n->right = NULL; // Setting the left and right children to NULL
    n->rightThread = 0;
    return n; // Finally returning the created node
}

struct Node *inOrderPre(struct Node *p)
{
    if (p->left != NULL)
    {
        p = p->left;
    }
    while (p->rightThread != 0)
    {
        p = p->right;
    }
    return p;
}

struct Node *inOrderSucc(struct Node *p)
{
    if (p->rightThread != 0)
    {
        return p->right;
    }
    p = p->right;
    while (p->left != NULL)
    {
        p = p->left;
    }
    return p;
}

void inOrder(struct Node *root)
{
    struct Node *p = root;
    while (1)
    {
        p = inOrderSucc(p);
        if (p == root)
        {
            break;
        }
        printf("%d ", p->data);
    }
}

int main()
{
    struct Node *p = createNode(25);
    struct Node *p1 = createNode(20);
    struct Node *p2 = createNode(36);
    struct Node *p3 = createNode(10);
    struct Node *p4 = createNode(22);
    struct Node *p5 = createNode(30);
    struct Node *p6 = createNode(40);
    struct Node *p7 = createNode(5);
    struct Node *p8 = createNode(12);
    struct Node *p9 = createNode(28);
    struct Node *p10 = createNode(38);
    struct Node *p11 = createNode(48);
    p->left = p1;
    p->right = p2;
    p1->left = p3;
    p1->right = p4;
    p2->left = p5;
    p2->right = p6;
    p3->left = p7;
    p3->right = p8;
    p4->left = p9;
    p4->right = p10;
    p5->left = p11;
    p5->right = p;
    p->rightThread = 1;
    printf("The inorder traversal of the tree is: ");
    inOrder(p);
    printf("\n");
    return 0;
}

// what is binary search tree?
// A binary search tree is a binary tree in which the value of each parent node's left child is less than the value the parent node, and the value of the parent node is less than the value of its right child.
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node *createNode(int data)
{
    struct Node *n; // Creating a node pointer
    n = (struct Node *)malloc(sizeof(struct Node)); // Allocating memory in the heap
    n->data = data; // Setting the data
    n->left = NULL; // Setting the left and right children to NULL
    n->right = NULL; // Setting the left and right children to NULL
    return n; // Finally returning the created node
}

void preOrder(struct Node *root)
{
    if (root != NULL)
    {
        printf("%d ", root->data);
        preOrder(root->left);
        preOrder(root->right);
    }
}

void inOrder(struct Node *root)
{
    if (root != NULL)
    {
        inOrder(root->left);
        printf("%d ", root->data);
        inOrder(root->right);
    }
}

void postOrder(struct Node *root)
{
    if (root != NULL)
    {
        postOrder(root->left);
        postOrder(root->right);
        printf("%d ", root->data);
    }
}

int isBST(struct Node *root)
{
    static struct Node *prev = NULL;
    if (root != NULL)
    {
        if (!isBST(root->left))
        {
            return 0;
        }
        if (prev != NULL && root->data <= prev->data)
        {
            return 0;
        }
        prev = root;
        return isBST(root->right);
    }
    else
    {
        return 1;
    }
}

struct Node *searchIter(struct Node *root, int key)
{
    while (root != NULL)
    {
        if (key == root->data)
        {
            return root;
        }
        else if (key < root->data)
        {
            root = root->left;
        }
        else
        {
            root = root->right;
        }
    }
    return NULL;
}

struct Node *searchRec(struct Node *root, int key)
{
    if (root == NULL || root->data == key)
    {
        return root;
    }
    else if (key < root->data)
    {
        return searchRec(root->left, key);
    }
    else
    {
        return searchRec(root->right, key);
    }
}

struct Node *inOrderPre(struct Node *root)
{
    root = root->left;
    while (root != NULL && root->right != NULL)
    {
        root = root->right;
    }
    return root;
}

struct Node *inOrderSucc(struct Node *root)
{
    root = root->right;
    while (root != NULL && root->left != NULL)
    {
        root = root->left;
    }
    return root;
}

struct Node *deleteNode(struct Node *root, int value)
{
    struct Node *iPre;
    struct Node *iSucc;
    if (root == NULL)
    {
        return NULL;
    }
    if (root->left == NULL && root->right == NULL)
    {
        free(root);
        return NULL;
    }
    if (value < root->data)
    {
        root->left = deleteNode(root->left, value);
    }
    else if (value > root->data)
    {
        root->right = deleteNode(root->right, value);
    }
    else
    {
        iPre = inOrderPre(root);
        if (iPre != NULL)
        {
            root->data = iPre->data;
            root->left = deleteNode(root->left, iPre->data);
        }
        else
        {
            iSucc = inOrderSucc(root);
            root->data = iSucc->data;
            root->right = deleteNode(root->right, iSucc->data);
        }
    }
    return root;
}

int main()
{
    struct Node *p = createNode(5);
    struct Node *p1 = createNode(3);
    struct Node *p2 = createNode(6);
    struct Node *p3 = createNode(1);
    struct Node *p4 = createNode(4);
    p->left = p1;
    p->right = p2;
    p1->left = p3;
    p1->right = p4;
    printf("The value of p is: %d\n", p->data);
    printf("The value of p1 is: %d\n", p1->data);
    printf("The value of p2 is: %d\n", p2->data);
    printf("The value of p3 is: %d\n", p3->data);
    printf("The value of p4 is: %d\n", p4->data);
    printf("The preorder traversal is: ");
    preOrder(p);
    printf("\n");
    printf("The inorder traversal is: ");
    inOrder(p);
    printf("\n");
    printf("The postorder traversal is: ");
    postOrder(p);
    printf("\n");
    if (isBST(p))
    {
        printf("It is a BST\n");
    }
    else
    {
        printf("It is not a BST\n");
    }
    struct Node *n = searchIter(p, 4);
    if (n != NULL)
    {
        printf("Iterative: Found: %d\n", n->data);
    }
    else
    {
        printf("Element not found\n");
    }
    n = searchRec(p, 4);
    if (n != NULL)
    {
        printf("Recursive: Found: %d\n", n->data);
    }
    else
    {
        printf("Element not found\n");
    }
    return 0;
}

// what is Conversion of General Trees To Binary Trees?
// A general tree can be converted into a binary tree using the following steps:
// 1. The left child of each node in the general tree will be the first child of the corresponding node in the binary tree.
// 2. The right child of each node in the general tree will be the next sibling of the corresponding node in the binary tree.
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node *createNode(int data)
{
    struct Node *n; // Creating a node pointer
    n = (struct Node *)malloc(sizeof(struct Node)); // Allocating memory in the heap
    n->data = data; // Setting the data
    n->left = NULL; // Setting the left and right children to NULL
    n->right = NULL; // Setting the left and right children to NULL
    return n; // Finally returning the created node
}

void preOrder(struct Node *root)
{
    if (root != NULL)
    {
        printf("%d ", root->data);
        preOrder(root->left);
        preOrder(root->right);
    }
}

void inOrder(struct Node *root)
{
    if (root != NULL)
    {
        inOrder(root->left);
        printf("%d ", root->data);
        inOrder(root->right);
    }
}

void postOrder(struct Node *root)
{
    if (root != NULL)
    {
        postOrder(root->left);
        postOrder(root->right);
        printf("%d ", root->data);
    }
}

int main()
{
    struct Node *p = createNode(5);
    struct Node *p1 = createNode(3);
    struct Node *p2 = createNode(6);
    struct Node *p3 = createNode(1);
    struct Node *p4 = createNode(4);
    p->left = p1;
    p->right = p2;
    p1->left = p3;
    p1->right = p4;
    printf("The value of p is: %d\n", p->data);
    printf("The value of p1 is: %d\n", p1->data);
    printf("The value of p2 is: %d\n", p2->data);
    printf("The value of p3 is: %d\n", p3->data);
    printf("The value of p4 is: %d\n", p4->data);
    printf("The preorder traversal is: ");
    preOrder(p);
    printf("\n");
    printf("The inorder traversal is: ");
    inOrder(p);
    printf("\n");
    printf("The postorder traversal is: ");
    postOrder(p);
    printf("\n");
    return 0;
}

// what is Applications Of Trees?
// 1. Manipulate hierarchical data.
// 2. Make information easy to search (see tree traversal).
// 3. Manipulate sorted lists of data.
// 4. As a workflow for compositing digital images for visual effects.
// 5. Router algorithms
// 6. Form of a multi-stage decision-making (see business chess).
// 7. XML parsers use tree structures to parse XML.
// 8. Document Object Model, a tree structure used in many programming languages to represent the structure of XML documents.
// 9. File systems use a tree structure.
// 10. Network routing protocols like OSPF and BGP use trees.
// 11. A special case of a tree structure is a "rooted tree", which is a directed graph having a unique vertex called the root.
// 12. A tree structure is an efficient way to represent the hierarchical structure of a tree-like structure, such as a company organization, the family structure of a family, or the contents of a file system.
// 13. The tree data structure itself is used in many algorithms, such as:
// 14. 1. Decision tree learning
// 15. 2. Huffman coding
// 16. 3. Search trees
// 17. 4. Tree traversal
// 18. 5. Spanning tree
// 19. 6. Tree rotation
// 20. 7. Prefix tree (aka Trie)
// 21. 8. Suffix tree
// 22. 9. Parse tree
// 23. 10. Expression tree
// 24. 11. Decision tree
// 25. 12. Minimax tree
// 26. 13. Abstract syntax tree
// 27. 14. B+ tree

// what is AVL Tree?
// AVL tree is a self-balancing Binary Search Tree (BST) where the difference between heights of left and right subtrees cannot be more than one for all nodes.
// Why AVL Trees?
// Most of the BST operations (e.g., search, max, min, insert, delete.. etc) take O(h) time where h is the height of the BST.
// The cost of these operations may become O(n) for a skewed Binary tree.
// If we make sure that height of the tree remains O(Logn) after every insertion and deletion, then we can guarantee an upper bound of O(Logn) for all these operations.
// The height of an AVL tree is always O(Logn) where n is the number of nodes in the tree.
// What is the height of an AVL tree?
// The height of an AVL tree is always O(Logn) where n is the number of nodes in the tree.
// Why AVL tree is better than the normal BST?
// Most of the BST operations (e.g., search, max, min, insert, delete.. etc) take O(h) time where h is the height of the BST.
// Ex. 
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
    int height;
};

int nodeHeight(struct Node *p)
{
    int hl;
    int hr;
    hl = p && p->left ? p->left->height : 0;
    hr = p && p->right ? p->right->height : 0;
    return hl > hr ? hl + 1 : hr + 1;
}

int balanceFactor(struct Node *p)
{
    int hl;
    int hr;
    hl = p && p->left ? p->left->height : 0;
    hr = p && p->right ? p->right->height : 0;
    return hl - hr;
}

struct Node *LLRotation(struct Node *p)
{
    struct Node *pl = p->left;
    struct Node *plr = pl->right;
    pl->right = p;
    p->left = plr;
    p->height = nodeHeight(p);
    pl->height = nodeHeight(pl);
    if (root == p)
    {
        root = pl;
    }
    return pl;
}

struct Node *LRRotation(struct Node *p)
{
    struct Node *pl = p->left;
    struct Node *plr = pl->right;
    pl->right = plr->left;
    p->left = plr->right;
    plr->left = pl;
    plr->right = p;
    pl->height = nodeHeight(pl);
    p->height = nodeHeight(p);
    plr->height = nodeHeight(plr);
    if (root == p)
    {
        root = plr;
    }
    return plr;
}

struct Node *RRRotation(struct Node *p)
{
    return NULL;
}

struct Node *RLRotation(struct Node *p)
{
    return NULL;
}

struct Node *RInsert(struct Node *p, int key)
{
    struct Node *t = NULL;
    if (p == NULL)
    {
        t = (struct Node *)malloc(sizeof(struct Node));
        t->data = key;
        t->height = 1;
        t->left = t->right = NULL;
        return t;
    }
    if (key < p->data)
    {
        p->left = RInsert(p->left, key);
    }
    else if (key > p->data)
    {
        p->right = RInsert(p->right, key);
    }
    p->height = nodeHeight(p);
    if (balanceFactor(p) == 2 && balanceFactor(p->left) == 1)
    {
        return LLRotation(p);
    }
    else if (balanceFactor(p) == 2 && balanceFactor(p->left) == -1)
    {
        return LRRotation(p);
    }
    else if (balanceFactor(p) == -2 && balanceFactor(p->right) == -1)
    {
        return RRRotation(p);
    }
    else if (balanceFactor(p) == -2 && balanceFactor(p->right) == 1)
    {
        return RLRotation(p);
    }
    return p;
}

int main()
{
    root = RInsert(root, 50);
    RInsert(root, 10);
    RInsert(root, 20);
    return 0;
}

// what is 2-3 Tree?
// A 2-3 tree is a tree data structure where every node with children (internal node) has either two children (2-node) and one data element or three children (3-nodes) and two data elements.
// ex.
struct Node
{
    int data1;
    int data2;
    struct Node *left;
    struct Node *middle;
    struct Node *right;
};

struct Node *createNode(int data)
{
    struct Node *n; // Creating a node pointer
    n = (struct Node *)malloc(sizeof(struct Node)); // Allocating memory in the heap
    n->data1 = data; // Setting the data
    n->data2 = 0; // Setting the data
    n->left = NULL; // Setting the left and right children to NULL
    n->middle = NULL; // Setting the left and right children to NULL
    n->right = NULL; // Setting the left and right children to NULL
    return n; // Finally returning the created node
}

void preOrder(struct Node *root)
{
    if (root != NULL)
    {
        printf("%d %d ", root->data1, root->data2);
        preOrder(root->left);
        preOrder(root->middle);
        preOrder(root->right);
    }
}

struct Node *insert(struct Node *root, int data)
{
    if (root == NULL)
    {
        root = createNode(data);
    }
    else if (data < root->data1)
    {
        root->left = insert(root->left, data);
    }
    else if (data > root->data1 && data < root->data2)
    {
        root->middle = insert(root->middle, data);
    }
    else
    {
        root->right = insert(root->right, data);
    }
    return root;
}

int main()
{
    struct Node *p = NULL;
    p = insert(p, 15);
    p = insert(p, 25);
    p = insert(p, 5);
    p = insert(p, 7);
    p = insert(p, 20);
    p = insert(p, 30);
    preOrder(p);
    return 0;
}

// what is Height Balanced, Weight Balance?
// A binary tree is height balanced if:
// 1. Left subtree of T is height balanced
// 2. Right subtree of T is height balanced
// 3. The difference between heights of left subtree and right subtree is not more than 1.
// A binary tree is weight balanced if:
// 1. Left subtree of T is weight balanced
// 2. Right subtree of T is weight balanced
// 3. The difference between weights of left subtree and right subtree is not more than 1.
// ex.
struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

int isBalanced(struct Node *root)
{
    int lh;
    int rh;
    if (root == NULL)
    {
        return 1;
    }
    lh = height(root->left);
    rh = height(root->right);
    if (abs(lh - rh) <= 1 && isBalanced(root->left) && isBalanced(root->right))
    {
        return 1;
    }
    return 0;
}

int main()
{
    struct Node *p = createNode(5);
    struct Node *p1 = createNode(3);
    struct Node *p2 = createNode(6);
    struct Node *p3 = createNode(1);
    struct Node *p4 = createNode(4);
    p->left = p1;
    p->right = p2;
    p1->left = p3;
    p1->right = p4;
    if (isBalanced(p))
    {
        printf("Balanced Tree\n");
    }
    else
    {
        printf("Unbalanced Tree\n");
    }
    return 0;
}

// what is Graph-Matrix Representation Of Graphs?
// A graph can be represented by an adjacency matrix. The adjacency matrix of a graph is a square matrix of size V x V . The adjacency matrix is a 2D array in which the value of row and column represent the vertices and the value of the element represent the edge of the graph.
// ex.
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, m;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &n, &m);
    int adj[n + 1][n + 1];
    printf("Enter the u and v of the graph: \n");
    for (int i = 0; i < m; i++)
    {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][v] = 1;
        adj[v][u] = 1;
    }
    printf("The adjacency matrix of the graph is: \n");
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n;j++)
        {
            printf("%d ", adj[i][j]);
        }
        printf("\n");
    }
    return 0;
}

// what is Elementary Graph operations?
// 1. Add a vertex
// 2. Add an edge
// 3. Delete a vertex
// 4. Delete an edge
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int data)
{
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = data;
    n->next = NULL;
    return n;
}

void addEdge(struct Node *arr[], int u, int v)
{
    struct Node *n = createNode(v);
    n->next = arr[u];
    arr[u] = n;
    n = createNode(u);
    n->next = arr[v];
    arr[v] = n;
}

void printAdjList(struct Node *arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("The adjacency list of vertex %d is: ", i);
        struct Node *temp = arr[i];
        while (temp != NULL)
        {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int main()
{
    int n, m;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &n, &m);
    struct Node *arr[n];
    for (int i = 0; i < n; i++)
    {
        arr[i] = NULL;
    }
    printf("Enter the u and v of the graph: \n");
    for (int i = 0; i < m; i++)
    {
        int u, v;
        scanf("%d %d", &u, &v);
        addEdge(arr, u, v);
    }
    printAdjList(arr, n);
    return 0;
}

// what is Breadth First Search, Depth First Search?
// Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration.
// Depth First Search (DFS) algorithm traverses a graph in a depthward motion and uses a stack to remember to get the next vertex to start a search, when a dead end occurs in any iteration.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int data)
{
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = data;
    n->next = NULL;
    return n;
}

void addEdge(struct Node *arr[], int u, int v)
{
    struct Node *n = createNode(v);
    n->next = arr[u];
    arr[u] = n;
    n = createNode(u);
    n->next = arr[v];
    arr[v] = n;
}

void printAdjList(struct Node *arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("The adjacency list of vertex %d is: ", i);
        struct Node *temp = arr[i];
        while (temp != NULL)
        {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

void bfs(struct Node *arr[], int n, int source)
{
    int visited[n];
    for (int i = 0; i < n; i++)
    {
        visited[i] = 0;
    }
    int queue[n];
    int front = -1;
    int rear = -1;
    queue[++rear] = source;
    visited[source] = 1;
    while (front != rear)
    {
        int v = queue[++front];
        printf("%d ", v);
        for (struct Node *temp = arr[v]; temp != NULL; temp = temp->next)
        {
            if (visited[temp->data] == 0)
            {
                queue[++rear] = temp->data;
                visited[temp->data] = 1;
            }
        }
    }
}

void dfs(struct Node *arr[], int n, int source)
{
    int visited[n];
    for (int i = 0; i < n; i++)
    {
        visited[i] = 0;
    }
    int stack[n];
    int top = -1;
    stack[++top] = source;
    visited[source] = 1;
    while (top != -1)
    {
        int v = stack[top--];
        printf("%d ", v);
        for (struct Node *temp = arr[v]; temp != NULL; temp = temp->next)
        {
            if (visited[temp->data] == 0)
            {
                stack[++top] = temp->data;
                visited[temp->data] = 1;
            }
        }
    }
}

int main()
{
    int n, m;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &n, &m);
    struct Node *arr[n];
    for (int i = 0; i < n; i++)
    {
        arr[i] = NULL;
    }
    printf("Enter the u and v of the graph: \n");
    for (int i = 0; i < m; i++)
    {
        int u, v;
        scanf("%d %d", &u, &v);
        addEdge(arr, u, v);
    }
    printAdjList(arr, n);
    printf("The BFS traversal of the graph is: ");
    bfs(arr, n, 0);
    printf("\n");
    printf("The DFS traversal of the graph is: ");
    dfs(arr, n, 0);
    printf("\n");
    return 0;
}

// what is Minimum Spanning Tree?
// A spanning tree of a graph is a tree that contains all the vertices of the graph and a subset of its edges such that each vertex is connected to every other vertex.
// A minimum spanning tree (MST) or minimum weight spanning tree for a weighted, connected, undirected graph is a spanning tree with a weight less than or equal to the weight of every other spanning tree.
// The weight of a spanning tree is the sum of weights given to each edge of the spanning tree.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Edge
{
    int src;
    int dest;
    int weight;
};

struct Graph
{
    int V;
    int E;
    struct Edge *edge;
};

struct Graph *createGraph(int V, int E)
{
    struct Graph *g = (struct Graph *)malloc(sizeof(struct Graph));
    g->V = V;
    g->E = E;
    g->edge = (struct Edge *)malloc(E * sizeof(struct Edge));
    return g;
}

void printArr(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%d - %d\n", arr[i], i);
    }
}

void bellmanFord(struct Graph *g, int source)
{
    int V = g->V;
    int E = g->E;
    int dist[V];
    for (int i = 0; i < V; i++)
    {
        dist[i] = 10000;
    }
    dist[source] = 0;
    for (int i = 0; i < V - 1; i++)
    {
        for (int j = 0; j < E; j++)
        {
            int u = g->edge[j].src;
            int v = g->edge[j].dest;
            int weight = g->edge[j].weight;
            if (dist[u] + weight < dist[v])
            {
                dist[v] = dist[u] + weight;
            }
        }
    }
    for (int j = 0; j < E; j++)
    {
        int u = g->edge[j].src;
        int v = g->edge[j].dest;
        int weight = g->edge[j].weight;
        if (dist[u] + weight < dist[v])
        {
            printf("Negative weight cycle detected\n");
            return;
        }
    }
    printArr(dist, V);
}

int main()
{
    int V, E;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &V, &E);
    struct Graph *g = createGraph(V, E);
    printf("Enter the source, destination and weight of the graph: \n");
    for (int i = 0; i < E; i++)
    {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        g->edge[i].src = u;
        g->edge[i].dest = v;
        g->edge[i].weight = w;
    }
    bellmanFord(g, 0);
    return 0;
}

// what is Dijkstra's Algorithm?
// Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Edge
{
    int src;
    int dest;
    int weight;
};

struct Graph
{
    int V;
    int E;
    struct Edge *edge;
};

struct Graph *createGraph(int V, int E)
{
    struct Graph *g = (struct Graph *)malloc(sizeof(struct Graph));
    g->V = V;
    g->E = E;
    g->edge = (struct Edge *)malloc(E * sizeof(struct Edge));
    return g;
}

void printArr(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%d - %d\n", arr[i], i);
    }
}

void Dijkstra(struct Graph *g, int source)
{
    int V = g->V;
    int E = g->E;
    int dist[V];
    for (int i = 0; i < V; i++)
    {
        dist[i] = 10000;
    }
    dist[source] = 0;
    for (int i = 0; i < V - 1; i++)
    {
        for (int j = 0; j < E; j++)
        {
            int u = g->edge[j].src;
            int v = g->edge[j].dest;
            int weight = g->edge[j].weight;
            if (dist[u] + weight < dist[v])
            {
                dist[v] = dist[u] + weight;
            }
        }
    }
    printArr(dist, V);
}

int main()
{
    int V, E;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &V, &E);
    struct Graph *g = createGraph(V, E);
    printf("Enter the source, destination and weight of the graph: \n");
    for (int i = 0; i < E; i++)
    {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        g->edge[i].src = u;
        g->edge[i].dest = v;
        g->edge[i].weight = w;
    }
    Dijkstra(g, 0);
    return 0;
}

// what is Floyd Warshall Algorithm?
// Floyd Warshall Algorithm is an algorithm for finding the shortest path between all the pairs of vertices in a weighted graph.
// ex.
#include <stdio.h>
#include <stdlib.h>

int min(int a, int b)
{
    return a < b ? a : b;
}

void floydWarshall(int graph[][4])
{
    int dist[4][4];
    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 4;j++)
        {
            dist[i][j] = graph[i][j];
        }
    }
    for (int k = 0; k < 4; k++)
    {
        for (int i = 0; i < 4;i++)
        {
            for (int j = 0; j < 4;j++)
            {
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
    printf("The shortest path matrix is: \n");
    for (int i = 0; i < 4;i++)
    {
        for (int j = 0; j < 4;j++)
        {
            printf("%d ", dist[i][j]);
        }
        printf("\n");
    }
}

int main()
{
    int graph[4][4] = {{0, 5, 10000, 10}, {10000, 0, 3, 10000}, {10000, 10000, 0, 1}, {10000, 10000, 10000, 0}};
    floydWarshall(graph);
    return 0;
}

// what is Travelling Salesman Problem?
// The travelling salesman problem (TSP) asks the following question: Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?
// ex.
#include <stdio.h>
#include <stdlib.h>

int min(int a, int b)
{
    return a < b ? a : b;
}

int TSP(int graph[][4], int mask, int pos, int n, int dp[][16])
{
    if (mask == (1 << n) - 1)
    {
        return graph[pos][0];
    }
    if (dp[mask][pos] != -1)
    {
        return dp[mask][pos];
    }
    int ans = 10000;
    for (int city = 0; city < n; city++)
    {
        if ((mask & (1 << city)) == 0)
        {
            int newAns = graph[pos][city] + TSP(graph, mask | (1 << city), city, n, dp);
            ans = min(ans, newAns);
        }
    }
    return dp[mask][pos] = ans;
}

int main()
{
    int graph[4][4] = {{0, 20, 42, 25}, {20, 0, 30, 34}, {42, 30, 0, 10}, {25, 34, 10, 0}};
    int dp[16][16];
    for (int i = 0; i < 16; i++)
    {
        for (int j = 0; j < 16;j++)
        {
            dp[i][j] = -1;
        }
    }
    printf("The minimum cost is: %d\n", TSP(graph, 1, 0, 4, dp));
    return 0;
}

// what is Hamiltonian Cycle?
// A Hamiltonian cycle (or Hamiltonian circuit) is a Hamiltonian path that is a cycle.
// ex.
#include <stdio.h>
#include <stdlib.h>

int n = 4;
int count = 0;

void display(int arr[][n])
{
    printf("The Hamiltonian cycle %d is: \n", ++count);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i][0]);
    }
    printf("%d\n", arr[0][0]);
}

void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

void permute(int arr[][n], int start, int end)
{
    if (start == end)
    {
        display(arr);
        return;
    }
    for (int i = start; i <= end; i++)
    {
        swap((arr + start), (arr + i));
        permute(arr, start + 1, end);
        swap((arr + start), (arr + i));
    }
}

int main()
{
    int arr[n][n] = {{1, 2, 3, 4}, {2, 1, 4, 3}, {3, 4, 1, 2}, {4, 3, 2, 1}};
    permute(arr, 0, n - 1);
    return 0;
}

// what is Backtracking?
// Backtracking is an algorithmic-technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time (by time, here, is referred to the time elapsed till reaching any level of the search tree).
// ex.
#include <stdio.h>
#include <stdlib.h>

int n = 4;
int count = 0;

void display(int arr[][n])
{
    printf("The Hamiltonian cycle %d is: \n", ++count);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i][0]);
    }
    printf("%d\n", arr[0][0]);
}

void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

void permute(int arr[][n], int start, int end)
{
    if (start == end)
    {
        display(arr);
        return;
    }
    for (int i = start; i <= end; i++)
    {
        swap((arr + start), (arr + i));
        permute(arr, start + 1, end);
        swap((arr + start), (arr + i));
    }
}

int main()
{
    int arr[n][n] = {{1, 2, 3, 4}, {2, 1, 4, 3}, {3, 4, 1, 2}, {4, 3, 2, 1}};
    permute(arr, 0, n - 1);
    return 0;
}

// what is minimum spanning tree?
// A spanning tree of a graph is a tree that contains all the vertices of the graph and a subset of its edges such that each vertex is connected to every other vertex.
// A minimum spanning tree (MST) or minimum weight spanning tree for a weighted, connected, undirected graph is a spanning tree with a weight less than or equal to the weight of every other spanning tree.
// The weight of a spanning tree is the sum of weights given to each edge of the spanning tree.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Edge
{
    int src;
    int dest;
    int weight;
};

struct Graph
{
    int V;
    int E;
    struct Edge *edge;
};

struct Graph *createGraph(int V, int E)
{
    struct Graph *g = (struct Graph *)malloc(sizeof(struct Graph));
    g->V = V;
    g->E = E;
    g->edge = (struct Edge *)malloc(E * sizeof(struct Edge));
    return g;
}

void printArr(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%d - %d\n", arr[i], i);
    }
}

void bellmanFord(struct Graph *g, int source)
{
    int V = g->V;
    int E = g->E;
    int dist[V];
    for (int i = 0; i < V; i++)
    {
        dist[i] = 10000;
    }
    dist[source] = 0;
    for (int i = 0; i < V - 1; i++)
    {
        for (int j = 0; j < E; j++)
        {
            int u = g->edge[j].src;
            int v = g->edge[j].dest;
            int weight = g->edge[j].weight;
            if (dist[u] + weight < dist[v])
            {
                dist[v] = dist[u] + weight;
            }
        }
    }
    for (int j = 0; j < E; j++)
    {
        int u = g->edge[j].src;
        int v = g->edge[j].dest;
        int weight = g->edge[j].weight;
        if (dist[u] + weight < dist[v])
        {
            printf("Negative weight cycle detected\n");
            return;
        }
    }
    printArr(dist, V);
}

int main()
{
    int V, E;
    printf("Enter the number of vertices and edges: ");
    scanf("%d %d", &V, &E);
    struct Graph *g = createGraph(V, E);
    printf("Enter the source, destination and weight of the graph: \n");
    for (int i = 0; i < E; i++)
    {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        g->edge[i].src = u;
        g->edge[i].dest = v;
        g->edge[i].weight = w;
    }
    bellmanFord(g, 0);
    return 0;
}

// Hashing: The symbol table,
//  Hashing Functions,
// CollisionResolution Techniques,
// File Structure: Concepts of fields,
//  records and files,
// Sequential,
//  Indexed and Relative/Random File Organization,
//  Indexing structure for index files,
// hashing for direct files,
//  Multi-Key file organization and access methods

// what is Hashing?
// Hashing is the process of mapping large amount of data item to a smaller table with the help of hashing function.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int data)
{
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = data;
    n->next = NULL;
    return n;
}

void insert(struct Node *arr[], int index, int data)
{
    struct Node *n = createNode(data);
    n->next = arr[index];
    arr[index] = n;
}

void display(struct Node *arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("The elements at index %d is: ", i);
        struct Node *temp = arr[i];
        while (temp != NULL)
        {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int search(struct Node *arr[], int index, int key)
{
    struct Node *temp = arr[index];
    while (temp != NULL)
    {
        if (temp->data == key)
        {
            return 1;
        }
        temp = temp->next;
    }
    return 0;
}

int hash(int key)
{
    return key % 10;
}

int main()
{
    struct Node *arr[10];
    for (int i = 0; i < 10; i++)
    {
        arr[i] = NULL;
    }
    insert(arr, hash(10), 10);
    insert(arr, hash(20), 20);
    insert(arr, hash(30), 30);
    insert(arr, hash(40), 40);
    insert(arr, hash(50), 50);
    insert(arr, hash(60), 60);
    insert(arr, hash(70), 70);
    insert(arr, hash(80), 80);
    insert(arr, hash(90), 90);
    insert(arr, hash(100), 100);
    display(arr, 10);
    if (search(arr, hash(100), 100))
    {
        printf("Element found\n");
    }
    else
    {
        printf("Element not found\n");
    }
    return 0;
}

// what is Hashing Functions?
// A hash function is any function that can be used to map data of arbitrary size to fixed-size values.
// The values returned by a hash function are called hash values, hash codes, digests, or simply hashes.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int data)
{
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = data;
    n->next = NULL;
    return n;
}

void insert(struct Node *arr[], int index, int data)
{
    struct Node *n = createNode(data);
    n->next = arr[index];
    arr[index] = n;
}

void display(struct Node *arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("The elements at index %d is: ", i);
        struct Node *temp = arr[i];
        while (temp != NULL)
        {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int search(struct Node *arr[], int index, int key)
{
    struct Node *temp = arr[index];
    while (temp != NULL)
    {
        if (temp->data == key)
        {
            return 1;
        }
        temp = temp->next;
    }
    return 0;
}

int hash(int key)
{
    return key % 10;
}

int main()
{
    struct Node *arr[10];
    for (int i = 0; i < 10; i++)
    {
        arr[i] = NULL;
    }
    insert(arr, hash(10), 10);
    insert(arr, hash(20), 20);
    insert(arr, hash(30), 30);
    insert(arr, hash(40), 40);
    insert(arr, hash(50), 50);
    insert(arr, hash(60), 60);
    insert(arr, hash(70), 70);
    insert(arr, hash(80), 80);
    insert(arr, hash(90), 90);
    insert(arr, hash(100), 100);
    display(arr, 10);
    if (search(arr, hash(100), 100))
    {
        printf("Element found\n");
    }
    else
    {
        printf("Element not found\n");
    }
    return 0;
}

// what is CollisionResolution Techniques?
// Collision resolution is the process of resolving a collision (when two or more items map to the same location).
// ex.
#include <stdio.h>
#include <stdlib.h>

void linearProbing(int arr[], int n, int key)
{
    int index = key % n;
    int i = 0;
    while (arr[(index + i) % n] != 0)
    {
        i++;
    }
    arr[(index + i) % n] = key;
}

void display(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
}

int main()
{
    int arr[10] = {0};
    linearProbing(arr, 10, 10);
    linearProbing(arr, 10, 20);
    linearProbing(arr, 10, 30);
    linearProbing(arr, 10, 40);
    linearProbing(arr, 10, 50);
    linearProbing(arr, 10, 60);
    linearProbing(arr, 10, 70);
    linearProbing(arr, 10, 80);
    linearProbing(arr, 10, 90);
    linearProbing(arr, 10, 100);
    display(arr, 10);
    return 0;
}

// what is File Structure: Concepts of fields, records and files?
// A file is a collection of related information defined by its creator.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Student
{
    int roll;
    char name[20];
    char dept[20];
    char address[20];
};

int main()
{
    struct Student s;
    FILE *fp;
    fp = fopen("student.txt", "w");
    printf("Enter the roll, name, department and address of the student: \n");
    scanf("%d %s %s %s", &s.roll, s.name, s.dept, s.address);
    fprintf(fp, "%d %s %s %s", s.roll, s.name, s.dept, s.address);
    fclose(fp);
    return 0;
}

// what is Sequential, Indexed and Relative/Random File Organization?
// Sequential File Organization: In sequential file organization, the records are stored in sequence, i.e., one record is stored after the other in a sequence.
// Indexed File Organization: In indexed file organization, an index is created for the file which contains the key field of the records.
// Relative/Random File Organization: In relative/random file organization, the records are stored in the file in the sequence in which they are inserted.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Student
{
    int roll;
    char name[20];
    char dept[20];
    char address[20];
};

int main()
{
    struct Student s;
    FILE *fp;
    fp = fopen("student.txt", "w");
    printf("Enter the roll, name, department and address of the student: \n");
    scanf("%d %s %s %s", &s.roll, s.name, s.dept, s.address);
    fprintf(fp, "%d %s %s %s", s.roll, s.name, s.dept, s.address);
    fclose(fp);
    return 0;
}

// what is Indexing structure for index files?
// Indexing is a data structure technique to efficiently retrieve records from the database files based on some attributes on which the indexing has been done.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Student
{
    int roll;
    char name[20];
    char dept[20];
    char address[20];
};

int main()
{
    struct Student s;
    FILE *fp;
    fp = fopen("student.txt", "w");
    printf("Enter the roll, name, department and address of the student: \n");
    scanf("%d %s %s %s", &s.roll, s.name, s.dept, s.address);
    fprintf(fp, "%d %s %s %s", s.roll, s.name, s.dept, s.address);
    fclose(fp);
    return 0;
}

// what is hashing for direct files?
// Hashing is the process of mapping large amount of data item to a smaller table with the help of hashing function.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int data)
{
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = data;
    n->next = NULL;
    return n;
}

void insert(struct Node *arr[], int index, int data)
{
    struct Node *n = createNode(data);
    n->next = arr[index];
    arr[index] = n;
}

void display(struct Node *arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("The elements at index %d is: ", i);
        struct Node *temp = arr[i];
        while (temp != NULL)
        {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int search(struct Node *arr[], int index, int key)
{
    struct Node *temp = arr[index];
    while (temp != NULL)
    {
        if (temp->data == key)
        {
            return 1;
        }
        temp = temp->next;
    }
    return 0;
}

int hash(int key)
{
    return key % 10;
}

int main()
{
    struct Node *arr[10];
    for (int i = 0; i < 10; i++)
    {
        arr[i] = NULL;
    }
    insert(arr, hash(10), 10);
    insert(arr, hash(20), 20);
    insert(arr, hash(30), 30);
    insert(arr, hash(40), 40);
    insert(arr, hash(50), 50);
    insert(arr, hash(60), 60);
    insert(arr, hash(70), 70);
    insert(arr, hash(80), 80);
    insert(arr, hash(90), 90);
    insert(arr, hash(100), 100);
    display(arr, 10);
    if (search(arr, hash(100), 100))
    {
        printf("Element found\n");
    }
    else
    {
        printf("Element not found\n");
    }
    return 0;
}

// what is Multi-Key file organization and access methods?
// Multi-key file organization is a file organization technique in which the records in the file are organized using more than one key.
// ex.
#include <stdio.h>
#include <stdlib.h>

struct Student
{
    int roll;
    char name[20];
    char dept[20];
    char address[20];
};


int main()
{
    struct Student s;
    FILE *fp;
    fp = fopen("student.txt", "w");
    printf("Enter the roll, name, department and address of the student: \n");
    scanf("%d %s %s %s", &s.roll, s.name, s.dept, s.address);
    fprintf(fp, "%d %s %s %s", s.roll, s.name, s.dept, s.address);
    fclose(fp);
    return 0;
}


// Sorting – Bubble Sort,
//  Selection Sort,
//   Quick Sort,
//    Merge Sort 
// Searching – Sequential Search and Binary Search

// what is Sorting – Bubble Sort?
// Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.
// ex.

void bubble_sort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j + 1] < arr[j])
            {
                int temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0)
        {
            break;
        }
    }
}

int main()
{
    int arr[] = {5, 4, 3, 2, 1};
    int n = 5;
    bubble_sort(arr, n);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
}

// what is Sorting – Selection Sort?
// The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning.
// ex.

void selection_sort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int min_index = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min_index])
            {
                min_index = j;
            }
        }
        int temp = arr[min_index];
        arr[min_index] = arr[i];
        arr[i] = temp;
    }
}

int main()
{
    int arr[] = {5, 4, 3, 2, 1};
    int n = 5;
    selection_sort(arr, n);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
}

// what is Sorting – Quick Sort?
// QuickSort is a Divide and Conquer algorithm.
// It picks an element as pivot and partitions the given array around the picked pivot.
// ex.

int partition(int arr[], int low, int high)
{
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j <= high - 1;j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            int temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

void quick_sort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

int main()
{
    int arr[] = {5, 4, 3, 2, 1};
    int n = 5;
    quick_sort(arr, 0, n - 1);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
}

// what is Sorting – Merge Sort?
// Merge Sort is a Divide and Conquer algorithm.
// It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves.
// ex.

void merge(int arr[], int low, int mid, int high)
{
    int n1 = mid - low + 1;
    int n2 = high - mid;
    int left[n1];
    int right[n2];
    for (int i = 0; i < n1;i++)
    {
        left[i] = arr[low + i];
    }
    for (int i = 0; i < n2;i++)
    {
        right[i] = arr[mid + 1 + i];
    }
    int i = 0;
    int j = 0;
    int k = low;
    while (i < n1 && j < n2)
    {
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < n1)
    {
        arr[k] = left[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        arr[k] = right[j];
        j++;
        k++;
    }
}

void merge_sort(int arr[], int low, int high)
{
    if (low < high)
    {
        int mid = (low + high) / 2;
        merge_sort(arr, low, mid);
        merge_sort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

int main()
{
    int arr[] = {5, 4, 3, 2, 1};
    int n = 5;
    merge_sort(arr, 0, n - 1);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
}

// what is Searching – Sequential Search and Binary Search?
// Sequential Search: Sequential search is a method for finding a particular value in a list, that consists of checking every one of its elements, one at a time and in sequence, until the desired one is found.
// Binary Search: Binary search is a fast search algorithm with run-time complexity of Ο(log n).
// ex.

int binary_search(int arr[], int n, int key)
{
    int low = 0;
    int high = n - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        if (arr[mid] == key)
        {
            return mid;
        }
        else if (arr[mid] < key)
        {
            low = mid + 1;
        }
        else
        {
            high = mid - 1;
        }
    }
    return - 1;
}

int main()
{
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;
    int key = 5;
    int index = binary_search(arr, n, key);
    if (index == -1)
    {
        printf("Element not found\n");
    }
    else
    {
        printf("Element found at index %d\n", index);
    }
    return 0;
}

void sequential_search(int arr[], int n, int key)
{
    for (int i = 0; i < n;i++)
    {
        if (arr[i] == key)
        {
            printf("Element found at index %d\n", i);
            return;
        }
    }
    printf("Element not found\n");
}

int main()
{
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;
    int key = 5;
    sequential_search(arr, n, key);
    return 0;
}
