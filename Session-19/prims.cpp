#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int spanningTree(int V, vector<vector<int>>& edges) {
        
        vector<vector<pair<int,int>>> adj(V);
        
        for(auto e : edges)
        {
            int u = e[0];
            int v = e[1];
            int w = e[2];
            
            adj[u].push_back({v,w});
            adj[v].push_back({u,w});
        }
        
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
        
        vector<bool> visited(V,false);
        
        pq.push({0,0});
        
        int cost = 0;
        
        while(!pq.empty())
        {
            int weight = pq.top().first;
            int u = pq.top().second;
            pq.pop();
            
            if(visited[u]) continue;
            
            visited[u] = true;
            cost += weight;
            
            for(auto x : adj[u])
            {
                int v = x.first;
                int w = x.second;
                
                if(!visited[v])
                    pq.push({w,v});
            }
        }
        
        return cost;
    }
};