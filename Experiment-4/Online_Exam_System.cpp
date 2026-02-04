#include <iostream>
using namespace std;

int heap[1000];
int heapSize = 0;

void heapifyUp(int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] > heap[i]) {
            swap(heap[parent], heap[i]);
            i = parent;
        } else {
            break;
        }
    }
}

void heapifyDown(int i) {
    while (true) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = i;

        if (left < heapSize && heap[left] < heap[smallest])
            smallest = left;
        if (right < heapSize && heap[right] < heap[smallest])
            smallest = right;

        if (smallest != i) {
            swap(heap[i], heap[smallest]);
            i = smallest;
        } else {
            break;
        }
    }
}

void insertHeap(int val) {
    heap[heapSize] = val;
    heapifyUp(heapSize);
    heapSize++;
}

void removeMin() {
    if (heapSize == 0) return;
    heap[0] = heap[heapSize - 1];
    heapSize--;
    heapifyDown(0);
}

int main() {
    int K, N;
    cin >> K >> N;

    for (int i = 0; i < N; i++) {
        int score;
        cin >> score;

        insertHeap(score);

        if (heapSize > K) {
            removeMin();
        }

        if (heapSize < K) {
            cout << -1 << endl;
        } else {
            cout << heap[0] << endl;
        }
    }
    return 0;
}
