#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* prev;
    Node* next;

    Node(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};

Node* head = nullptr;
void insert(int val, int key) {
    Node* temp = head;

    while (temp != nullptr && temp->data != key) {
        temp = temp->next;
    }

    if (temp == nullptr) {
        cout << "Value " << key << " not found.\n";
        return;
    }

    Node* newNode = new Node(val);
    newNode->next = temp->next;
    newNode->prev = temp;

    if (temp->next != nullptr) {
        temp->next->prev = newNode;
    }
    temp->next = newNode;
}
void deleteNode(int key) {
    Node* temp = head;

    while (temp != nullptr && temp->data != key) {
        temp = temp->next;
    }

    if (temp == nullptr) {
        cout << "Value " << key << " not found.\n";
        return;
    }

    if (temp == head) {
        head = temp->next;
        if (head != nullptr) {
            head->prev = nullptr;
        }
    } else {
        temp->prev->next = temp->next;
        if (temp->next != nullptr) {
            temp->next->prev = temp->prev;
        }
    }

    delete temp;
}

void display() {
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    head = new Node(1);
    Node* second = new Node(2);
    Node* third = new Node(3);

    head->next = second;
    second->prev = head;
    second->next = third;
    third->prev = second;

    int val, key;

    cout << "Enter value to insert: ";
    cin >> val;

    cout << "Insert after which existing value? ";
    cin >> key;

    insert(val, key);

    cout << "Enter value to delete: ";
    cin >> key;

    deleteNode(key);
    display();
}

