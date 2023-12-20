// Bubble Sort Algorithm
// #include <stdio.h>
// #include <stdbool.h>

// void printArray(int arr[], int len) {
//   for (int i = 0; i < len; i++) {
//     printf("%d",arr[i]);
//   }
//   printf("\n");
// }

// void swap(int *first, int *second) {
//     int temp = *first;
//     *first = *second;
//     *second = temp;
// }

// void bubbleSort(int arr[], int len) {
//   bool swapped = false;
//   for (int i = 0; i < len - 1; i++) {
//     for (int j = 0; j < len - i - 1; j++) {
//       if (arr[j] > arr[j+1]) {
//         swap(&arr[j], &arr[j+1]);
//         swapped = true;
//       }
//       if (swapped == false) {
//          break;
//       }
//     }
//   }
// }
// // resulted passes 
// // 6 3 8 2 1 
// // 3 6 2 1 8
// // 3 2 1 6 8
// // 2 1 3 6 8
// // 1 2 3 6 8

// int main() {
//   int arr[5] = {6,3,8,2,1};
//   int len = sizeof(arr)/sizeof(arr[0]);
//   bubbleSort(arr, len);
//   printArray(arr, len);
//   return 0;
// }

// Selection Sort Algorithm
// #include <stdio.h>

// void printArray(int arr[], int len) {
//   for (int i = 0; i < len; i++) {
//     printf("%d",arr[i]);
//   }
//   printf("\n");
// }

// void swap(int *first, int *second) {
//     int temp = *first;
//     *first = *second;
//     *second = temp;
// }

// void selectionSort(int arr[], int len) {
//   int min_index;
//   for (int i = 0; i < len - 1; i++) {
//     min_index = i;
//     for (int j = i + 1; j < len; j++) {
//       if (arr[j] < arr[min_index]) {
//         min_index = j;
//       }
//     }
//     swap(&arr[min_index], &arr[i]);
//   }
// }

// int main() {
//   int arr[5] = {6,3,8,2,1};
//   int len = sizeof(arr)/sizeof(arr[0]);
//   selectionSort(arr, len);
//   printArray(arr, len);
//   return 0;
// }

// Insertion Sort Algorithm
// #include <stdio.h>

// void printArray(int arr[], int len) {
//   for (int i = 0; i < len; i++) {
//     printf("%d",arr[i]);
//   }
//   printf("\n");
// }

// void insertionSort(int arr[], int len) {
//   int key, j;
//   for (int i = 1; i < len; i++) {
//     key = arr[i];
//     j = i - 1;
//     while (j >= 0 && arr[j] > key) {
//       arr[j+1] = arr[j];
//       j = j - 1;
//     }
//     arr[j+1] = key;
//   }
// }

// int main() {
//   int arr[5] = {6,3,8,2,1};
//   int len = sizeof(arr)/sizeof(arr[0]);
//   insertionSort(arr, len);
//   printArray(arr, len);
//   return 0;
// }

//Merge Sort Algorithm
// #include <stdio.h>

// void printArray(int arr[], int len) {
//   for (int i = 0; i < len; i++) {
//     printf("%d",arr[i]);
//   }
//   printf("\n");
// }

// void merge(int arr[], int left, int middle, int right) {
//   int i, j, k;
//   int n1 = middle - left + 1;
//   int n2 = right - middle;

//   int L[n1], R[n2];

//   for (i = 0; i < n1; i++) {
//     L[i] = arr[left + i];
//   }
//   for (j = 0; j < n2; j++) {
//     R[j] = arr[middle + 1 + j];
//   }

//   i = 0;
//   j = 0;
//   k = left;

//   while (i < n1 && j < n2) {
//     if (L[i] <= R[j]) {
//       arr[k] = L[i];
//       i++;
//     } else {
//       arr[k] = R[j];
//       j++;
//     }
//     k++;
//   }

//   while (i < n1) {
//     arr[k] = L[i];
//     i++;
//     k++;
//   }

//   while (j < n2) {
//     arr[k] = R[j];
//     j++;
//     k++;
//   }
// }

// void mergeSort(int arr[], int left, int right) {
//   if (left < right) {
//     int middle = left + (right - left) / 2;

//     mergeSort(arr, left, middle);
//     mergeSort(arr, middle + 1, right);

//     merge(arr, left, middle, right);
//   }
// }

// int main() {
//   int arr[5] = {6,3,8,2,1};
//   int len = sizeof(arr)/sizeof(arr[0]);
//   mergeSort(arr, 0, len - 1);
//   printArray(arr, len);
//   return 0;
// }
