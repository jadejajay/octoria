#include <stdio.h>
#include <stdlib.h>

typedef struct Queue {
    int front, rear, size; // front and rear are indices
    unsigned capacity; // capacity is the maximum number of elements that can be stored in the queue
    int* array; // array is the array that stores the elements of the queue
} Queue;

Queue* createQueue(unsigned capacity) { // createQueue returns a pointer to a Queue
    Queue* queue = (Queue*) malloc(sizeof(Queue)); // malloc returns a void pointer, so we need to typecast it to Queue*
    queue->capacity = capacity; // queue->capacity is equivalent to (*queue).capacity (dereferencing)  
    queue->front = queue->size = 0;  // queue->front is equivalent to (*queue).front 
    queue->rear = capacity - 1; // queue->rear is equivalent to (*queue).rear 
    queue->array = (int*) malloc(queue->capacity * sizeof(int)); // queue->array is equivalent to (*queue).array
    return queue; // return the pointer to the Queue
}

int isFull(Queue* queue) {
    return (queue->size == queue->capacity); // return 1 if queue is full, else return 0
}

int isEmpty(Queue* queue) {
    return (queue->size == 0); // return 1 if queue is empty, else return 0
}

void enqueue(Queue* queue, int item) { // enqueue inserts an item at the rear of the queue
    if (isFull(queue))
        return;
    queue->rear = (queue->rear + 1) % queue->capacity; // % is the modulo operator in C (remainder of division) 
    queue->array[queue->rear] = item; // insert the item at the rear of the queue
    queue->size = queue->size + 1; // increment the size of the queue
    printf("%d enqueued to queue\n", item);
}

int dequeue(Queue* queue) { // dequeue removes an item from the front of the queue
    if (isEmpty(queue))
        return -1;
    int item = queue->array[queue->front]; // store the item at the front of the queue
    queue->front = (queue->front + 1) % queue->capacity; // increment the front of the queue
    queue->size = queue->size - 1; // decrement the size of the queue
    return item; // return the item that was removed from the queue
}

void printQueue(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty\n");
        return;
    }
    printf("Queue: ");
    for (int i = queue->front; i <= queue->rear; i++) { // -> operator has higher precedence than * operator in C
        printf("%d ", queue->array[i]);
    }
    printf("\n");
}

int main() {
    Queue* queue = createQueue(1000);
    int choice, item;

    while (1) {
        printf("1. Enqueue\n");
        printf("2. Dequeue\n");
        printf("3. Print queue\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter the item to enqueue: ");
                scanf("%d", &item);
                enqueue(queue, item);
                break;
            case 2:
                item = dequeue(queue);
                if (item != -1) {
                    printf("Dequeued from queue: %d\n", item);
                } else {
                    printf("Queue is empty\n");
                }
                break;
            case 3:
                printQueue(queue);
                break;
            case 4:
                free(queue->array);
                free(queue);
                return 0;
            default:
                printf("Invalid choice\n");
        }
    }
}