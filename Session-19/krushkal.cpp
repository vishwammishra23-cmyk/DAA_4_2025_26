#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
  
    int findParent(int x, vector<int>& parent)
    {
        if(parent[x] == x)
            return x;
        return parent[x] = findParent(parent[x], parent);
    }
    
    void unionSet(int u, int v, vector<int>& parent)
    {
        int pu = findParent(u, parent);
        int pv = findParent(v, parent);
        parent[pu] = pv;
    }
  
    int kruskalsMST(int V, vector<vector<int>> &edges) {
        
        sort(edges.begin(), edges.end(), [](vector<int>& a, vector<int>& b){
            return a[2] < b[2];
        });
        
        vector<int> parent(V);
        
        for(int i = 0; i < V; i++)
            parent[i] = i;
        
        int cost = 0;
        
        for(auto e : edges)
        {
            int u = e[0];
            int v = e[1];
            int w = e[2];
            
            if(findParent(u, parent) != findParent(v, parent))
            {
                cost += w;
                unionSet(u, v, parent);
            }
        }
        
        return cost;
    }
};