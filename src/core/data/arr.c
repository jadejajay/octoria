#include <stdio.h>
#include <stdlib.h>

// Function to add an element at the end of the array
void addElement(int** arr, int* size, int element) { // Pointer to pointer to store the base address of the array, pointer to store the size of the array, element to add
    *arr = realloc(*arr, (*size + 1) * sizeof(int)); // Reallocate memory for the array to increase its size by 1 element
    (*arr)[*size] = element; // Add the element to the array
    (*size)++;
}

// Function to remove an element from the array
void removeElement(int** arr, int* size, int index) {
    if (index < 0 || index >= *size) {
        printf("Index out of bounds\n");
        return;
    }
    for (int i = index; i < *size - 1; i++) {
        (*arr)[i] = (*arr)[i + 1];
    }
    (*size)--;
    *arr = realloc(*arr, (*size) * sizeof(int));
}

// Function to print the array
void printArray(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
int main() {
    int* arr = NULL; // Pointer to store the base address of the array
    int size = 0; // Variable to store the size of the array
    int choice, element, index; // Variables to store the user choice, element and index

    while (1) { // Loop indefinitely
        printf("1. Add element\n");
        printf("2. Remove element\n");
        printf("3. Print array\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter the element to add: ");
                scanf("%d", &element); // Read the element to add
                addElement(&arr, &size, element); // Add the element to the array
                break;
            case 2:
                printf("Enter the index of the element to remove: ");
                scanf("%d", &index); // Read the index of the element to remove
                removeElement(&arr, &size, index); // Remove the element from the array
                break;
            case 3:
                printArray(arr, size); // Print the array
                break;
            case 4:
                free(arr); // Free the memory allocated for the array
                return 0;
            default:
                printf("Invalid choice\n");
        }
    }
}