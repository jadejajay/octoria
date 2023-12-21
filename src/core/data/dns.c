list_of_data_structures = [
    "Array", // done
    "Linked List",
    "Stack",
    "Queue",
    "Binary Tree",
    "Binary Search Tree",
    "Heap",
    "Hashing",
    "Graph",
    "Matrix",
    "Advanced Tree",
    "Misc",
]

// array in c
#include <stdio.h>

void printArray(int arr[], int len) {
  for (int i = 0; i < len; i++) {
    printf("%d",arr[i]);
  }
  printf("\n");
}

int main() {
  int arr[] = {1, 2, 3, 4, 5};
  int len = sizeof(arr) / sizeof(arr[0]);
  printArray(arr, len);
  return 0;
}