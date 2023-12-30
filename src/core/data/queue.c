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

//Write a program to implement QUEUE using arrays that performs following operations (a)
// INSERT (b) DELETE (c) DISPLAY
#include<stdio.h>
#include<stdlib.h>
#define MAX 5
int queue[MAX];
int front=-1,rear=-1;
void insert();
void delete();
void display();
int main() { 
  int ch;
  while(1)  {
     printf("\n1. Insert\n2. Delete\n3. Display\n4. Exit\n");
     printf("Enter your choice: ");
     scanf("%d",&ch);
     switch(ch)  {
        case 1: insert();
        break;
        case 2: delete();
        break;
        case 3: display();
        break;
        case 4: exit(0);
        default: printf("\nInvalid choice\n");
     }
   }
}

void insert() {
   int item;
   if(rear==MAX-1) {
      printf("\nQueue Overflow\n");
      return;
   }
   else {
      if(front==-1)
         front=0;
      printf("\nEnter the element to be inserted: ");
      scanf("%d",&item);
      rear=rear+1;
      queue[rear]=item;
   }
}

void delete() {
   if(front==-1 || front>rear) {
      printf("\nQueue Underflow\n");
      return;
   }
   else {
      printf("\nElement deleted from queue is: %d\n",queue[front]);
      front=front+1;
   }
}

void display() {
   int i;
   if(front==-1) {
      printf("\nQueue is empty\n");
      return;
   }
   else {
      printf("\nQueue is: \n");
      for(i=front;i<=rear;i++)
         printf("%d\t",queue[i]);
   }
}

// Write a program to implement Circular Queue using arrays that performs following
// operations. (a) INSERT (b) DELETE (c) DISPLAY
#include<stdio.h>
#include<stdlib.h>
#define MAX 5
int queue[MAX];
int front=-1,rear=-1;
void insert();
void delete();
void display();

int main() {
   int ch;
   while(1) {
      printf("\n1. Insert\n2. Delete\n3. Display\n4. Exit\n");
      printf("Enter your choice: ");
      scanf("%d",&ch);
      switch(ch) {
         case 1: insert();
         break;
         case 2: delete();
         break;
         case 3: display();
         break;
         case 4: exit(0);
         default: printf("\nInvalid choice\n");
      }
   }
}

void insert() {
   int item;
   if((front==0 && rear==MAX-1) || (front==rear+1)) {
      printf("\nQueue Overflow\n");
      return;
   }
   else {
      if(rear==MAX-1 && front!=0)
         rear=-1;
      printf("\nEnter the element to be inserted: ");
      scanf("%d",&item);
      rear=rear+1;
      queue[rear]=item;
      if(front==-1)
         front=0;
   }
}

void delete() {
   if(front==-1 && rear==-1) {
      printf("\nQueue Underflow\n");
      return;
   }
   else {
      printf("\nElement deleted from queue is: %d\n",queue[front]);
      if(front==rear) {
         front=-1;
         rear=-1;
      }
      else {
         if(front==MAX-1)
            front=0;
         else
            front=front+1;
      }
   }
}

void display() {
   int i;
   if(front==-1) {
      printf("\nQueue is empty\n");
      return;
   }
   else {
      printf("\nQueue is: \n");
      if(front<=rear) {
         for(i=front;i<=rear;i++)
            printf("%d\t",queue[i]);
      }
      else {
         for(i=front;i<=MAX-1;i++)
            printf("%d\t",queue[i]);
         for(i=0;i<=rear;i++)
            printf("%d\t",queue[i]);
      }
   }
}
// Write a menu driven program to implement following operations on the singly linked list.
// (a) Insert a node at the front of the linked list.
// (b) Insert a node at the end of the linked list.
// (c) Insert a node such that linked list is in ascending order.(according to info. Field)
// (d) Delete a first node of the linked list.
// (e) Delete a node before specified position.
// (f) Delete a node after specified position.
#include<stdio.h>
#include<stdlib.h>
struct node {
   int data;
   struct node *next;
};

struct node *start=NULL;
struct node *create_ll(struct node *);
struct node *display(struct node *);
struct node *insert_beg(struct node *);
struct node *insert_end(struct node *);
struct node *insert_before(struct node *);
struct node *insert_after(struct node *);
struct node *delete_beg(struct node *);
struct node *delete_end(struct node *);
struct node *delete_node(struct node *);
struct node *delete_after(struct node *);
struct node *delete_list(struct node *);
struct node *sort_list(struct node *);
struct node *reverse_list(struct node *);

int main() {
   int option;
   do {
      printf("\n\n *****MAIN MENU *****");
      printf("\n 1: Create a list");
      printf("\n 2: Display the list");
      printf("\n 3: Add a node at the beginning");
      printf("\n 4: Add a node at the end");
      printf("\n 5: Add a node before a given node");
      printf("\n 6: Add a node after a given node");
      printf("\n 7: Delete a node from the beginning");
      printf("\n 8: Delete a node from the end");
      printf("\n 9: Delete a given node");
      printf("\n 10: Delete a node after a given node");
      printf("\n 11: Delete the entire list");
      printf("\n 12: Sort the list");
      printf("\n 13: Reverse the list");
      printf("\n 14: EXIT");
      printf("\n\n Enter your option : ");
      scanf("%d", &option);
      switch(option) {
         case 1: start=create_ll(start);
         printf("\n LINKED LIST CREATED");
         break;
         case 2: start=display(start);
         break;
         case 3: start=insert_beg(start);
         break;
         case 4: start=insert_end(start);
         break;
         case 5: start=insert_before(start);
         break;
         case 6: start=insert_after(start);
         break;
         case 7: start=delete_beg(start);
         break;
         case 8: start=delete_end(start);
         break;
         case 9: start=delete_node(start);
         break;
         case 10: start=delete_after(start);
         break;
         case 11: start=delete_list(start);
         printf("\n LINKED LIST DELETED");
         break;
         case 12: start=sort_list(start);
         break;
         case 13: start=reverse_list(start);
         break;
      }
   } while(option !=14);
   return 0;
}

struct node *create_ll(struct node *start) {
   struct node *new_node, *ptr;
   int num;
   printf("\n Enter -1 to end");
   printf("\n Enter the data : ");
   scanf("%d", &num);
   while(num!=-1) {
      new_node = (struct node*)malloc(sizeof(struct node));
      new_node -> data=num;
      if(start==NULL) {
         new_node -> next = NULL;
         start = new_node;
      }
      else {
         ptr=start;
         while(ptr->next!=NULL)
            ptr=ptr->next;
         ptr->next = new_node;
         new_node->next=NULL;
      }
      printf("\n Enter the data : ");
      scanf("%d", &num);
   }
   return start;
}

struct node *display(struct node *start) {
   struct node *ptr;
   ptr=start;
   while(ptr!=NULL) {
      printf("\t %d", ptr -> data);
      ptr=ptr->next;
   }
   return start;
}

struct node *insert_beg(struct node *start) {
   struct node *new_node;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   new_node -> next = start;
   start = new_node;
   return start;
}

struct node *insert_end(struct node *start) {
   struct node *ptr, *new_node;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   new_node -> next = NULL;
   ptr = start;
   while(ptr -> next != NULL)
      ptr = ptr -> next;
   ptr -> next = new_node;
   return start;
}

struct node *insert_before(struct node *start) {
   struct node *new_node, *ptr, *preptr;
   int num, val;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   printf("\n Enter the value before which the data has to be inserted : ");
   scanf("%d", &val);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   while(ptr -> data != val) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next = new_node;
   new_node -> next = ptr;
   return start;
}

struct node *insert_after(struct node *start) {
   struct node *new_node, *ptr, *preptr;
   int num, val;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   printf("\n Enter the value after which the data has to be inserted : ");
   scanf("%d", &val);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   preptr = ptr;
   while(preptr -> data != val) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next=new_node;
   new_node -> next=ptr;
   return start;
}

struct node *delete_beg(struct node *start) {
   struct node *ptr;
   ptr = start;
   start = start -> next;
   free(ptr);
   return start;
}

struct node *delete_end(struct node *start) {
   struct node *ptr, *preptr;
   ptr = start;
   while(ptr -> next != NULL) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next = NULL;
   free(ptr);
   return start;
}

struct node *delete_node(struct node *start) {
   struct node *ptr, *preptr;
   int val;
   printf("\n Enter the value of the node which has to be deleted : ");
   scanf("%d", &val);
   ptr = start;
   if(ptr -> data == val) {
      start = delete_beg(start);
      return start;
   }
   else {
      while(ptr -> data != val) {
         preptr = ptr;
         ptr = ptr -> next;
      }
      preptr -> next = ptr -> next;
      free(ptr);
      return start;
   }
}

struct node *delete_after(struct node *start) {
   struct node *ptr, *preptr;
   int val;
   printf("\n Enter the value after which the node has to deleted : ");
   scanf("%d", &val);
   ptr = start;
   preptr = ptr;
   while(preptr -> data != val) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next = ptr -> next;
   free(ptr);
   return start;
}

struct node *delete_list(struct node *start) {
   struct node *ptr;
   if(start!=NULL) {
      ptr=start;
      while(ptr != NULL) {
         printf("\n %d is to be deleted next", ptr -> data);
         start = delete_beg(ptr);
         ptr = start;
      }
   }
   return start;
}

struct node *sort_list(struct node *start) {
   struct node *ptr1, *ptr2;
   int temp;
   ptr1 = start;
   while(ptr1 -> next != NULL) {
      ptr2 = ptr1 -> next;
      while(ptr2 != NULL) {
         if(ptr1 -> data > ptr2 -> data) {
            temp = ptr1 -> data;
            ptr1 -> data = ptr2 -> data;
            ptr2 -> data = temp;
         }
         ptr2 = ptr2 -> next;
      }
      ptr1 = ptr1 -> next;
   }
   return start;
}

struct node *reverse_list(struct node *start) {
   struct node *ptr1, *ptr2, *ptr3;
   if(start -> next == NULL)
      return start;
   ptr1 = start;
   ptr2 = ptr1 -> next;
   ptr3 = ptr2 -> next;
   ptr1 -> next = NULL;
   ptr2 -> next = ptr1;
   while(ptr3 != NULL) {
      ptr1 = ptr2;
      ptr2 = ptr3;
      ptr3 = ptr3 -> next;
      ptr2 -> next = ptr1;
   }
   start = ptr2;
   return start;
}

//  Write a program to implement stack using linked list
#include<stdio.h>
#include<stdlib.h>
struct node {
   int data;
   struct node *next;
};

struct node *top=NULL;
struct node *push(struct node *, int);
struct node *display(struct node *);
struct node *pop(struct node *);

int main() {
   int val, option;
   do {
      printf("\n *****MAIN MENU*****");
      printf("\n 1. PUSH");
      printf("\n 2. POP");
      printf("\n 3. DISPLAY");
      printf("\n 4. EXIT");
      printf("\n Enter your option: ");
      scanf("%d", &option);
      switch(option) {
         case 1: printf("\n Enter the number to be pushed on stack: ");
         scanf("%d", &val);
         top = push(top, val);
         break;
         case 2: top = pop(top);
         break;
         case 3: top = display(top);
         break;
      }
   } while(option != 4);
   return 0;
}

struct node *push(struct node *top, int val) {
   struct node *ptr;
   ptr = (struct node*)malloc(sizeof(struct node));
   ptr -> data = val;
   if(top == NULL)
      ptr -> next = NULL;
   else
      ptr -> next = top;
   top = ptr;
   return top;
}

struct node *display(struct node *top) {
   struct node *ptr;
   ptr = top;
   if(top == NULL)
      printf("\n STACK IS EMPTY");
   else {
      while(ptr != NULL) {
         printf("\n %d", ptr -> data);
         ptr = ptr -> next;
      }
   }
   return top;
}

struct node *pop(struct node *top) {
   struct node *ptr;
   ptr = top;
   if(top == NULL)
      printf("\n STACK UNDERFLOW");
   else {
      top = top -> next;
      printf("\n The value being deleted is: %d", ptr -> data);
      free(ptr);
   }
   return top;
}

// Write a program to implement queue using linked list.
#include<stdio.h>
#include<stdlib.h>
struct node {
   int data;
   struct node *next;
};

struct node *front=NULL;
struct node *rear=NULL;
struct node *insert(struct node *, int);
struct node *delete(struct node *);
struct node *display(struct node *);

int main() {
   int val, option;
   do {
      printf("\n *****MAIN MENU*****");
      printf("\n 1. INSERT");
      printf("\n 2. DELETE");
      printf("\n 3. DISPLAY");
      printf("\n 4. EXIT");
      printf("\n Enter your option: ");
      scanf("%d", &option);
      switch(option) {
         case 1: printf("\n Enter the number to be inserted on queue: ");
         scanf("%d", &val);
         front = insert(front, val);
         break;
         case 2: front = delete(front);
         break;
         case 3: front = display(front);
         break;
      }
   } while(option != 4);
   return 0;
}

struct node *insert(struct node *front, int val) {
   struct node *ptr;
   ptr = (struct node*)malloc(sizeof(struct node));
   ptr -> data = val;
   if(front == NULL) {
      front = ptr;
      rear = ptr;
      front -> next = rear -> next = NULL;
   }
   else {
      rear -> next = ptr;
      rear = ptr;
      rear -> next = NULL;
   }
   return front;
}

struct node *delete(struct node *front) {
   struct node *ptr;
   ptr = front;
   if(front == NULL)
      printf("\n UNDERFLOW");
   else {
      front = front -> next;
      printf("\n The value being deleted is: %d", ptr -> data);
      free(ptr);
   }
   return front;
}

struct node *display(struct node *front) {
   struct node *ptr;
   ptr = front;
   if(front == NULL)
      printf("\n QUEUE IS EMPTY");
   else {
      printf("\n");
      while(ptr != NULL) {
         printf("\t %d", ptr -> data);
         ptr = ptr -> next;
      }
   }
   return front;
}

// Write a program to implement following operations on the doubly linked list.
// (a) Insert a node at the front of the linked list.
// (b) Insert a node at the end of the linked list.
// (c) Delete a last node of the linked list.
// (d) Delete a node before specified position.

#include<stdio.h>
#include<stdlib.h>
struct node {
   int data;
   struct node *next;
   struct node *prev;
};

struct node *start=NULL;
struct node *create_ll(struct node *);
struct node *display(struct node *);
struct node *insert_beg(struct node *);
struct node *insert_end(struct node *);
struct node *delete_end(struct node *);
struct node *delete_node(struct node *);

int main() {
   int option;
   do {
      printf("\n\n *****MAIN MENU *****");
      printf("\n 1: Create a list");
      printf("\n 2: Display the list");
      printf("\n 3: Add a node at the beginning");
      printf("\n 4: Add a node at the end");
      printf("\n 5: Delete a node from the end");
      printf("\n 6: Delete a given node");
      printf("\n 7: EXIT");
      printf("\n\n Enter your option : ");
      scanf("%d", &option);
      switch(option) {
         case 1: start=create_ll(start);
         printf("\n DOUBLY LINKED LIST CREATED");
         break;
         case 2: start=display(start);
         break;
         case 3: start=insert_beg(start);
         break;
         case 4: start=insert_end(start);
         break;
         case 5: start=delete_end(start);
         break;
         case 6: start=delete_node(start);
         break;
      }
   } while(option !=7);
   return 0;
}

struct node *create_ll(struct node *start) {
   struct node *new_node, *ptr;
   int num;
   printf("\n Enter -1 to end");
   printf("\n Enter the data : ");
   scanf("%d", &num);
   while(num!=-1) {
      if(start==NULL) {
         new_node = (struct node*)malloc(sizeof(struct node));
         new_node -> prev = NULL;
         new_node -> data = num;
         new_node -> next = NULL;
         start = new_node;
      }
      else {
         ptr=start;
         new_node = (struct node*)malloc(sizeof(struct node));
         new_node -> data=num;
         while(ptr -> next != NULL)
            ptr = ptr -> next;
         ptr -> next = new_node;
         new_node -> prev = ptr;
         new_node -> next = NULL;
      }
      printf("\n Enter the data : ");
      scanf("%d", &num);
   }
   return start;
}

struct node *display(struct node *start) {
   struct node *ptr;
   ptr = start;
   while(ptr != NULL) {
      printf("\t %d", ptr -> data);
      ptr = ptr -> next;
   }
   return start;
}

struct node *insert_beg(struct node *start) {
   struct node *new_node;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   start -> prev = new_node;
   new_node -> next = start;
   new_node -> prev = NULL;
   start = new_node;
   return start;
}

struct node *insert_end(struct node *start) {
   struct node *ptr, *new_node;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   while(ptr -> next != NULL)
      ptr = ptr -> next;
   ptr -> next = new_node;
   new_node -> prev = ptr;
   new_node -> next = NULL;
   return start;
}

struct node *delete_end(struct node *start) {
   struct node *ptr;
   ptr = start;
   while(ptr -> next != NULL)
      ptr = ptr -> next;
   ptr -> prev -> next = NULL;
   free(ptr);
   return start;
}

struct node *delete_node(struct node *start) {
   struct node *ptr;
   int val;
   printf("\n Enter the value of the node which has to be deleted : ");
   scanf("%d", &val);
   ptr = start;
   if(ptr -> data == val) {
      start = delete_beg(start);
      return start;
   }
   else {
      while(ptr -> data != val)
         ptr = ptr -> next;
      ptr -> prev -> next = ptr -> next;
      ptr -> next -> prev = ptr -> prev;
      free(ptr);
      return start;
   }
}

// Write a program to implement following operations on the circular linked list.
// (a) Insert a node at the end of the linked list.
// (b) Insert a node before specified position.
// (c) Delete a first node of the linked list.
// (d) Delete a node after specified position.
#include<stdio.h>
#include<stdlib.h>

struct node {
   int data;
   struct node *next;
};

struct node *start=NULL;
struct node *create_cll(struct node *);
struct node *display(struct node *);
struct node *insert_beg(struct node *);
struct node *insert_end(struct node *);
struct node *insert_before(struct node *);
struct node *delete_beg(struct node *);
struct node *delete_after(struct node *);

int main() {
   int option;
   do {
      printf("\n\n *****MAIN MENU *****");
      printf("\n 1: Create a list");
      printf("\n 2: Display the list");
      printf("\n 3: Add a node at the beginning");
      printf("\n 4: Add a node at the end");
      printf("\n 5: Add a node before a given node");
      printf("\n 6: Delete a node from the beginning");
      printf("\n 7: Delete a node after a given node");
      printf("\n 8: EXIT");
      printf("\n\n Enter your option : ");
      scanf("%d", &option);
      switch(option) {
         case 1: start=create_cll(start);
         printf("\n CIRCULAR LINKED LIST CREATED");
         break;
         case 2: start=display(start);
         break;
         case 3: start=insert_beg(start);
         break;
         case 4: start=insert_end(start);
         break;
         case 5: start=insert_before(start);
         break;
         case 6: start=delete_beg(start);
         break;
         case 7: start=delete_after(start);
         break;
      }
   } while(option !=8);
   return 0;
}

struct node *create_cll(struct node *start) {
   struct node *new_node, *ptr;
   int num;
   printf("\n Enter -1 to end");
   printf("\n Enter the data : ");
   scanf("%d", &num);
   while(num!=-1) {
      new_node = (struct node*)malloc(sizeof(struct node));
      new_node -> data=num;
      if(start==NULL) {
         new_node -> next = new_node;
         start = new_node;
      }
      else {
         ptr=start;
         while(ptr -> next != start)
            ptr = ptr -> next;
         ptr -> next = new_node;
         new_node -> next = start;
      }
      printf("\n Enter the data : ");
      scanf("%d", &num);
   }
   return start;
}

struct node *display(struct node *start) {
   struct node *ptr;
   ptr = start;
   while(ptr -> next != start) {
      printf("\t %d", ptr -> data);
      ptr = ptr -> next;
   }
   printf("\t %d", ptr -> data);
   return start;
}

struct node *insert_beg(struct node *start) {
   struct node *new_node, *ptr;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   while(ptr -> next != start)
      ptr = ptr -> next;
   ptr -> next = new_node;
   new_node -> next = start;
   start = new_node;
   return start;
}

struct node *insert_end(struct node *start) {
   struct node *ptr, *new_node;
   int num;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   while(ptr -> next != start)
      ptr = ptr -> next;
   ptr -> next = new_node;
   new_node -> next = start;
   return start;
}

struct node *insert_before(struct node *start) {
   struct node *new_node, *ptr, *preptr;
   int num, val;
   printf("\n Enter the data : ");
   scanf("%d", &num);
   printf("\n Enter the value before which the data has to be inserted : ");
   scanf("%d", &val);
   new_node = (struct node *)malloc(sizeof(struct node));
   new_node -> data = num;
   ptr = start;
   while(ptr -> data != val) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next = new_node;
   new_node -> next = ptr;
   return start;
}

struct node *delete_beg(struct node *start) {
   struct node *ptr;
   ptr = start;
   while(ptr -> next != start)
      ptr = ptr -> next;
   ptr -> next = start -> next;
   free(start);
   start = ptr -> next;
   return start;
}

struct node *delete_after(struct node *start) {
   struct node *ptr, *preptr;
   int val;
   printf("\n Enter the value after which the node has to deleted : ");
   scanf("%d", &val);
   ptr = start;
   preptr = ptr;
   while(preptr -> data != val) {
      preptr = ptr;
      ptr = ptr -> next;
   }
   preptr -> next = ptr -> next;
   if(ptr == start)
      start = preptr -> next;
   free(ptr);
   return start;
}

// Write a program which create binary search tree.
#include<stdio.h>
#include<stdlib.h>

struct node {
   int data;
   struct node *left;
   struct node *right;
};

struct node *create(struct node *);
struct node *insert(struct node *, int);
void preorder(struct node *);
void inorder(struct node *);
void postorder(struct node *);

int main() {
   struct node *root=NULL;
   int option, val;
   do {
      printf("\n *****MAIN MENU*****");
      printf("\n 1. create");
      printf("\n 2. Insert");
      printf("\n 3. Preorder");
      printf("\n 4. Inorder");
      printf("\n 5. Postorder");
      printf("\n 6. Exit");
      printf("\n Enter your option: ");
      scanf("%d", &option);
      switch(option) {
         case 1: root=create(root);
         break;
         case 2: printf("\n Enter the value of the new node: ");
         scanf("%d", &val);
         root=insert(root, val);
         break;
         case 3: printf("\n The elements of the tree are: \n");
         preorder(root);
         break;
         case 4: printf("\n The elements of the tree are: \n");
         inorder(root);
         break;
         case 5: printf("\n The elements of the tree are: \n");
         postorder(root);
         break;
      }
   } while(option != 6);
   return 0;
}

struct node *create(struct node *root) {
   int val;
   printf("\n Enter the data: ");
   scanf("%d", &val);
   root=insert(root, val);
   return root;
}

struct node *insert(struct node *root, int val) {
   if(root==NULL) {
      root=(struct node*)malloc(sizeof(struct node));
      root -> data=val;
      root -> left=NULL;
      root -> right=NULL;
      return root;
   }
   else if(val<root->data)
      root->left=insert(root->left, val);
   else if(val>root->data)
      root->right=insert(root->right, val);
   else
      printf("\n Duplicate value ignored");
   return root;
}

void preorder(struct node *root) {
   if(root!=NULL) {
      printf("%d\t", root -> data);
      preorder(root -> left);
      preorder(root -> right);
   }
}

void inorder(struct node *root) {
   if(root!=NULL) {
      inorder(root -> left);
      printf("%d\t", root -> data);
      inorder(root -> right);
   }
}

void postorder(struct node *root) {
   if(root!=NULL) {
      postorder(root -> left);
      postorder(root -> right);
      printf("%d\t", root -> data);
   }
}

// Implement recursive and non-recursive tree traversing methods inorder, preorder and postorder traversal.
#include<stdio.h>
#include<stdlib.h>

struct node {
   int data;
   struct node *left;
   struct node *right;
};

struct node *create(struct node *);
struct node *insert(struct node *, int);
void preorder(struct node *);
void inorder(struct node *);
void postorder(struct node *);

int main() {
   struct node *root=NULL;
   int option, val;
   do {
      printf("\n *****MAIN MENU*****");
      printf("\n 1. create");
      printf("\n 2. Insert");
      printf("\n 3. Preorder");
      printf("\n 4. Inorder");
      printf("\n 5. Postorder");
      printf("\n 6. Exit");
      printf("\n Enter your option: ");
      scanf("%d", &option);
      switch(option) {
         case 1: root=create(root);
         break;
         case 2: printf("\n Enter the value of the new node: ");
         scanf("%d", &val);
         root=insert(root, val);
         break;
         case 3: printf("\n The elements of the tree are: \n");
         preorder(root);
         break;
         case 4: printf("\n The elements of the tree are: \n");
         inorder(root);
         break;
         case 5: printf("\n The elements of the tree are: \n");
         postorder(root);
         break;
      }
   } while(option != 6);
   return 0;
}

struct node *create(struct node *root) {
   int val;
   printf("\n Enter the data: ");
   scanf("%d", &val);
   root=insert(root, val);
   return root;
}

struct node *insert(struct node *root, int val) {
   if(root==NULL) {
      root=(struct node*)malloc(sizeof(struct node));
      root -> data=val;
      root -> left=NULL;
      root -> right=NULL;
      return root;
   }
   else if(val<root->data)
      root->left=insert(root->left, val);
   else if(val>root->data)
      root->right=insert(root->right, val);
   else
      printf("\n Duplicate value ignored");
   return root;
}

void preorder(struct node *root) {
   if(root!=NULL) {
      printf("%d\t", root -> data);
      preorder(root -> left);
      preorder(root -> right);
   }
}

void inorder(struct node *root) {
   if(root!=NULL) {
      inorder(root -> left);
      printf("%d\t", root -> data);
      inorder(root -> right);
   }
}

void postorder(struct node *root) {
   if(root!=NULL) {
      postorder(root -> left);
      postorder(root -> right);
      printf("%d\t", root -> data);
   }
}

// Write a program to implement Queue Sort
#include<stdio.h>
#include<stdlib.h>
#define MAX 5
int queue[MAX];
int front=-1,rear=-1;
void insert();
void delete();
void display();
void sort();

int main() {
   int ch;
   while(1) {
      printf("\n1. Insert\n2. Delete\n3. Display\n4. Sort\n5. Exit\n");
      printf("Enter your choice: ");
      scanf("%d",&ch);
      switch(ch) {
         case 1: insert();
         break;
         case 2: delete();
         break;
         case 3: display();
         break;
         case 4: sort();
         break;
         case 5: exit(0);
         default: printf("\nInvalid choice\n");
      }
   }
}

void insert() {
   int item;
   if(rear==MAX-1) {
      printf("\nQueue Overflow\n");
      return;
   }
   else {
      if(front==-1)
         front=0;
      printf("\nEnter the element to be inserted: ");
      scanf("%d",&item);
      rear=rear+1;
      queue[rear]=item;
   }
}

void delete() {
   if(front==-1 || front>rear) {
      printf("\nQueue Underflow\n");
      return;
   }
   else {
      printf("\nElement deleted from queue is: %d\n",queue[front]);
      front=front+1;
   }
}

void display() {
   int i;
   if(front==-1) {
      printf("\nQueue is empty\n");
      return;
   }
   else {
      printf("\nQueue is: \n");
      for(i=front;i<=rear;i++)
         printf("%d\t",queue[i]);
   }
}

void sort() {
   int i,j,k,temp;
   if(front==-1) {
      printf("\nQueue is empty\n");
      return;
   }
   else {
      for(i=front;i<=rear;i++) {
         for(j=i+1;j<=rear;j++) {
            if(queue[i]>queue[j]) {
               temp=queue[i];
               queue[i]=queue[j];
               queue[j]=temp;
            }
         }
      }
      printf("\nAfter sorting:\n");
      for(i=front;i<=rear;i++)
         printf("%d\t",queue[i]);
   }
}


