#include <bits/stdc++.h>
using namespace std;

void complexRec(int n, int &count, int currDepth, int &maxDepth) {
    maxDepth = max(maxDepth, currDepth);

    if (n <= 2) {
        count++;
        return;
    }

    int p = n;
    count++;

    while (p > 0) {
        count++;
        vector<int> temp(n);
        count++;

        for (int i = 0; i < n; i++) {
            temp[i] = i ^ p;
            count++;
        }

        p >>= 1;
        count++;
    }

    vector<int> small(n);
    count++;

    for (int i = 0; i < n; i++) {
        small[i] = i * i;
        count++;
    }

    reverse(small.begin(), small.end());
    count++;

    complexRec(n / 2, count, currDepth + 1, maxDepth);
    complexRec(n / 2, count, currDepth + 1, maxDepth);
    complexRec(n / 2, count, currDepth + 1, maxDepth);
    count += 3;
}

int main() {
    int n;
    cin >> n;

    int count = 0;
    int maxDepth = 0;

    complexRec(n, count, 1, maxDepth);

    cout << "Operations: " << count << endl;
    cout << "Depth: " << maxDepth << endl;

    return 0;
}

