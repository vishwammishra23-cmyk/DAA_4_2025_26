class Solution {
  public:
  
    int paintersNeeded(vector<int>& arr, int maxTime) {
        int painters = 1;
        int currentSum = 0;
        
        for (int i = 0; i < arr.size(); i++) {
            if (currentSum + arr[i] <= maxTime) {
                currentSum += arr[i];
            } else {
                painters++;
                currentSum = arr[i];
            }
        }
        
        return painters;
    }
  
    int minTime(vector<int>& arr, int k) {
        int low = arr[0];
        int high = 0;
        
        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] > low)
                low = arr[i];
            high += arr[i];
        }
        
        int ans = high;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (paintersNeeded(arr, mid) <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return ans;
    }
};
