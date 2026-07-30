// src/data/technicalInterviewQuestions.js
// ─── Technical Interview Questions Bank ──────────────────────────────────────

export const TECHNICAL_INTERVIEW_QUESTIONS = [
  {
    "id": "dsa-001",
    "category": "Data Structures & Algorithms",
    "topic": "Big O Notation",
    "difficulty": "Easy",
    "question": "What is Big O Notation? Why is it important?",
    "shortAnswer": "Big O describes the worst-case time/space growth of an algorithm as input size n increases, ignoring constants.",
    "detailedAnswer": "Big O notation allows engineers to compare algorithm efficiency without running them, focusing on the dominant growth term as input size increases.\n\nCommon complexities include O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, and O(2ⁿ) exponential. Choosing the right algorithm can mean the difference between milliseconds and hours on large inputs.",
    "keyPoints": [
      "O(1): hash table lookup, array index",
      "O(log n): binary search, balanced BST operations",
      "O(n log n): merge sort, heap sort",
      "O(n²): bubble/insertion sort — avoid on large inputs"
    ],
    "commonMistakes": [
      "Confusing average case with worst case",
      "Ignoring space complexity",
      "Not simplifying by dropping constants and lower-order terms"
    ],
    "followUpQuestions": [
      "What is the difference between Big O, Big Theta, and Big Omega?",
      "Can you give an example of an O(n log n) algorithm?",
      "What is amortized time complexity?"
    ],
    "realWorldExample": "Searching a sorted phone directory using binary search (O(log n)) instead of scanning every entry (O(n)).",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to classify common complexities correctly and justify algorithm choices based on growth rate for large inputs.",
    "tags": ["Big O", "Complexity", "Algorithms", "Interview"],
    "relatedTopics": ["Time Complexity", "Space Complexity", "Sorting Algorithms"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-002",
    "category": "Data Structures & Algorithms",
    "topic": "Array vs Linked List",
    "difficulty": "Easy",
    "question": "What is the difference between Array and Linked List?",
    "shortAnswer": "Array: contiguous memory, O(1) access, O(n) insert. Linked List: pointer-based, O(1) insert at head, O(n) access.",
    "detailedAnswer": "Arrays store elements in contiguous memory, enabling O(1) random access via index, but inserting or deleting mid-array requires shifting elements, giving O(n).\n\nLinked Lists store nodes scattered in memory, each with a pointer to the next node; access requires traversal, giving O(n), but insertion or deletion at a known position is O(1). Arrays are cache-friendly due to contiguous memory, while linked lists cause cache misses due to scattered allocation.",
    "keyPoints": [
      "Arrays: better for indexed access and iteration",
      "Linked Lists: better for frequent insertions/deletions",
      "Doubly Linked List: bidirectional, used in LRU cache",
      "Dynamic Array: amortized O(1) append via doubling"
    ],
    "commonMistakes": [
      "Assuming linked list insertion is always O(1) (finding the position still takes O(n))",
      "Forgetting arrays have fixed size unless dynamic",
      "Ignoring cache performance differences"
    ],
    "followUpQuestions": [
      "How does a dynamic array resize internally?",
      "What is a doubly linked list used for?",
      "When would you prefer a linked list over an array?"
    ],
    "realWorldExample": "Browser history uses a doubly linked list to allow back/forward navigation efficiently.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects clarity on time complexity trade-offs and practical scenarios for choosing one structure over the other.",
    "tags": ["Array", "Linked List", "Data Structures", "Interview"],
    "relatedTopics": ["Dynamic Array", "Doubly Linked List", "Memory Management"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-003",
    "category": "Data Structures & Algorithms",
    "topic": "Stack and Queue",
    "difficulty": "Easy",
    "question": "What is a Stack and Queue? Differences and use cases?",
    "shortAnswer": "Stack: LIFO — push/pop from top. Queue: FIFO — enqueue at rear, dequeue from front.",
    "detailedAnswer": "A Stack follows Last-In-First-Out order and is commonly used for the function call stack, undo/redo functionality, balanced parentheses checking, and DFS traversal.\n\nA Queue follows First-In-First-Out order and is commonly used for BFS traversal, task scheduling, and message queues. A Priority Queue returns the highest-priority element first and is typically implemented using a heap.",
    "keyPoints": [
      "Stack: call stack — each function call pushed, return pops",
      "Queue: BFS traversal — process level by level",
      "Priority Queue: O(log n) insert/extract — used in Dijkstra",
      "Python: stack = list, queue = collections.deque"
    ],
    "commonMistakes": [
      "Using a plain list as a queue (O(n) dequeue from front)",
      "Confusing stack (LIFO) with queue (FIFO) ordering",
      "Not knowing priority queue is usually heap-based"
    ],
    "followUpQuestions": [
      "How would you implement a queue using two stacks?",
      "What is a circular queue?",
      "How does a priority queue differ from a normal queue?"
    ],
    "realWorldExample": "The 'undo' feature in a text editor uses a stack to revert the most recent action first.",
    "codeExample": {
      "language": "Python",
      "code": "stack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop())  # 2\n\nfrom collections import deque\nqueue = deque()\nqueue.append(1)\nqueue.append(2)\nprint(queue.popleft())  # 1"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain LIFO vs FIFO clearly and map them to correct real-world use cases like DFS/BFS.",
    "tags": ["Stack", "Queue", "Data Structures", "Interview"],
    "relatedTopics": ["DFS", "BFS", "Priority Queue", "Heap"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-004",
    "category": "Data Structures & Algorithms",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "question": "What is Binary Search? When can it be applied?",
    "shortAnswer": "Binary Search finds a target in a SORTED array in O(log n) by halving the search space each step.",
    "detailedAnswer": "Binary Search compares the target with the middle element: if equal, it returns the index; if the target is smaller, it searches the left half; if larger, it searches the right half. This requires the input to be sorted.\n\nAdvanced variants include finding the first or last occurrence of an element, searching in a rotated sorted array, and finding a peak element.",
    "keyPoints": [
      "Prerequisite: array MUST be sorted",
      "Mid calculation: mid = left + (right - left) // 2",
      "Time: O(log n) | Space: O(1) iterative"
    ],
    "commonMistakes": [
      "Applying binary search on unsorted data",
      "Integer overflow when computing mid as (left+right)/2",
      "Off-by-one errors in loop boundary conditions"
    ],
    "followUpQuestions": [
      "How would you search in a rotated sorted array?",
      "How do you find the first occurrence of a duplicate element?",
      "What is the time complexity of recursive vs iterative binary search?"
    ],
    "realWorldExample": "Looking up a word in a dictionary by repeatedly jumping to the middle section instead of reading page by page.",
    "codeExample": {
      "language": "Python",
      "code": "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1"
    },
    "interviewerExpectation": "The interviewer expects correct implementation with proper boundary handling and awareness of the sorted-input prerequisite.",
    "tags": ["Binary Search", "Searching", "Algorithms", "Interview"],
    "relatedTopics": ["Sorting", "Divide and Conquer", "Rotated Array Search"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-005",
    "category": "Data Structures & Algorithms",
    "topic": "Recursion",
    "difficulty": "Easy",
    "question": "Explain recursion. What is the base case and why is it mandatory?",
    "shortAnswer": "Recursion is a function calling itself with a smaller input. The base case stops recursion and prevents infinite calls/stack overflow.",
    "detailedAnswer": "Every recursive function needs a base case, the simplest case that returns directly, and a recursive case, which breaks the problem into a smaller subproblem.\n\nWithout a base case, recursion would run infinitely until the call stack overflows.",
    "keyPoints": [
      "Base case: factorial(0) = 1",
      "Call stack: each call adds a stack frame",
      "Stack overflow: Python's default recursion limit is 1000"
    ],
    "commonMistakes": [
      "Forgetting to include a base case",
      "Base case that is never reached due to incorrect recursive step",
      "Assuming all languages optimize tail recursion automatically"
    ],
    "followUpQuestions": [
      "What is tail recursion and does Python optimize it?",
      "How does recursion relate to the call stack?",
      "Can every recursive solution be converted to an iterative one?"
    ],
    "realWorldExample": "Calculating factorial or traversing a nested folder structure recursively.",
    "codeExample": {
      "language": "Python",
      "code": "def factorial(n):\n    if n == 0:  # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case"
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly identify the base case and recursive case, and explain stack behavior during calls.",
    "tags": ["Recursion", "Algorithms", "Interview"],
    "relatedTopics": ["Call Stack", "Dynamic Programming", "Backtracking"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-006",
    "category": "Data Structures & Algorithms",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "question": "What is Dynamic Programming? Difference between Memoization and Tabulation?",
    "shortAnswer": "DP stores results of overlapping subproblems to avoid redundant computation. Memoization = top-down. Tabulation = bottom-up.",
    "detailedAnswer": "Dynamic Programming applies when a problem has overlapping subproblems and optimal substructure, meaning the optimal solution can be built from optimal solutions of subproblems.\n\nMemoization follows a natural recursive approach combined with a cache to store already-computed results. Tabulation fills a DP table iteratively starting from base cases, avoiding recursion overhead. Classic problems include Fibonacci, 0/1 Knapsack, Longest Common Sequence, and Coin Change.",
    "keyPoints": [
      "DP = Recursion + Caching, or Recursion converted to iteration",
      "State: parameters that uniquely define a subproblem",
      "Space optimization: often only need last 1-2 rows of DP table"
    ],
    "commonMistakes": [
      "Not identifying the correct state for the DP table",
      "Recomputing subproblems without caching (plain recursion)",
      "Confusing memoization (top-down) with tabulation (bottom-up)"
    ],
    "followUpQuestions": [
      "How would you solve the 0/1 Knapsack problem?",
      "What is the difference between DP and greedy algorithms?",
      "How can you optimize DP space complexity?"
    ],
    "realWorldExample": "Calculating shortest routes in navigation apps often reuses previously computed subpaths, similar to DP principles.",
    "codeExample": {
      "language": "Python",
      "code": "def fib(n):\n    dp = [0, 1]\n    for i in range(2, n + 1):\n        dp.append(dp[i-1] + dp[i-2])\n    return dp[n]"
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify overlapping subproblems, define the state, and choose between memoization and tabulation appropriately.",
    "tags": ["Dynamic Programming", "Memoization", "Tabulation", "Interview"],
    "relatedTopics": ["Recursion", "Greedy Algorithms", "Knapsack Problem"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-007",
    "category": "Data Structures & Algorithms",
    "topic": "BFS vs DFS",
    "difficulty": "Medium",
    "question": "What is the difference between BFS and DFS?",
    "shortAnswer": "BFS: queue, level-by-level, finds shortest path (unweighted). DFS: stack/recursion, goes deep first.",
    "detailedAnswer": "Breadth-First Search visits all neighbours at depth 1 before moving to depth 2, using a queue, and guarantees the shortest path in unweighted graphs.\n\nDepth-First Search goes as deep as possible along a branch before backtracking, using a stack or recursion, and is commonly used for cycle detection and topological sorting. Both algorithms run in O(V+E) time.",
    "keyPoints": [
      "BFS: shortest path in UNWEIGHTED graphs",
      "DFS: exhaustive search, cycle detection, topological sort",
      "BFS space: O(W) width; DFS space: O(H) height"
    ],
    "commonMistakes": [
      "Assuming BFS finds shortest path in weighted graphs (needs Dijkstra instead)",
      "Forgetting to mark nodes visited, causing infinite loops",
      "Confusing when to use a queue vs a stack"
    ],
    "followUpQuestions": [
      "How would you detect a cycle in a directed graph?",
      "What is topological sorting and which traversal is used?",
      "How does BFS differ from Dijkstra's algorithm?"
    ],
    "realWorldExample": "Social network 'friends of friends' suggestions use BFS to explore connections level by level.",
    "codeExample": {
      "language": "Python",
      "code": "from collections import deque\n\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain both traversals, their data structures, complexities, and appropriate use cases.",
    "tags": ["BFS", "DFS", "Graphs", "Interview"],
    "relatedTopics": ["Graph Traversal", "Topological Sort", "Shortest Path"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-008",
    "category": "Data Structures & Algorithms",
    "topic": "Hash Table",
    "difficulty": "Medium",
    "question": "What is a Hash Table? Explain collision handling techniques.",
    "shortAnswer": "Hash table maps keys to values via a hash function. Average O(1). Collisions handled by chaining or open addressing.",
    "detailedAnswer": "A hash function converts a key into an array index, allowing near-constant time lookup, insertion, and deletion on average.\n\nCollisions are handled by Separate Haining, where each bucket holds a linked list, or Open Addressing, where the algorithm probes for the next available slot using linear, quadratic, or double hashing. The load factor determines when rehashing occurs, typically around a 0.75 threshold.",
    "keyPoints": [
      "Chaining: handles high collision load gracefully",
      "Linear probing: fast but suffers clustering",
      "Double hashing: best distribution, no clustering"
    ],
    "commonMistakes": [
      "Assuming hash table lookup is always O(1) (worst case can be O(n))",
      "Not accounting for load factor and resizing",
      "Confusing chaining with open addressing implementations"
    ],
    "followUpQuestions": [
      "What makes a good hash function?",
      "How does open addressing differ from separate chaining?",
      "What happens when a hash table's load factor gets too high?"
    ],
    "realWorldExample": "A dictionary/map data structure in Python (dict) or Java (HashMap) is implemented using a hash table internally.",
    "codeExample": {
      "language": "Python",
      "code": "class HashTable:\n    def __init__(self, size=10):\n        self.buckets = [[] for _ in range(size)]\n        self.size = size\n\n    def _hash(self, key):\n        return hash(key) % self.size\n\n    def insert(self, key, value):\n        idx = self._hash(key)\n        self.buckets[idx].append((key, value))"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain hashing, collision scenarios, and trade-offs between chaining and open addressing.",
    "tags": ["Hash Table", "Collision Handling", "Data Structures", "Interview"],
    "relatedTopics": ["Hash Functions", "Load Factor", "Dictionaries"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-009",
    "category": "Data Structures & Algorithms",
    "topic": "Trie (Prefix Tree)",
    "difficulty": "Medium",
    "question": "What is a Trie (Prefix Tree)? Where is it used?",
    "shortAnswer": "A Trie stores strings character by character in a tree, enabling fast prefix search — O(L) where L is string length.",
    "detailedAnswer": "Each node in a Trie represents a character, and paths from the root spell out complete words. Unlike a hash set, a Trie allows efficient prefix queries because words sharing a prefix share the same path.\n\nInsertion, search, and prefix search all run in O(L) time. Space can be optimized using compressed tries, also known as Radix trees, when many nodes have only a single child.",
    "keyPoints": [
      "Autocomplete: type \"ca\" → suggest \"cat\", \"car\", \"cats\"",
      "IP routing tables use tries (longest prefix match)",
      "Compressed Trie/Radix Tree: merges single-child chains to save space"
    ],
    "commonMistakes": [
      "Using a hash set when prefix queries are actually needed",
      "Not marking end-of-word nodes, causing incorrect search results",
      "Underestimating the space cost of a naive Trie implementation"
    ],
    "followUpQuestions": [
      "How would you implement autocomplete using a Trie?",
      "What is a compressed Trie (Radix tree)?",
      "How is a Trie used in IP routing tables?"
    ],
    "realWorldExample": "A search engine's autocomplete feature uses a Trie to quickly suggest words matching a typed prefix.",
    "codeExample": {
      "language": "Python",
      "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            node = node.children.setdefault(ch, TrieNode())\n        node.is_end = True"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain how a Trie enables O(L) prefix operations and name real-world use cases like autocomplete.",
    "tags": ["Trie", "Prefix Tree", "Data Structures", "Interview"],
    "relatedTopics": ["Hash Table", "Radix Tree", "String Algorithms"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-010",
    "category": "Data Structures & Algorithms",
    "topic": "Kruskal's vs Prim's Algorithm",
    "difficulty": "Hard",
    "question": "What is the difference between Kruskal's and Prim's algorithm for MST?",
    "shortAnswer": "Both find Minimum Spanning Tree. Kruskal's sorts all edges and adds smallest non-cycle-forming edges. Prim's grows a tree from one vertex.",
    "detailedAnswer": "Kruskal's algorithm sorts all edges by weight and adds each edge if it doesn't form a cycle, checked using Union-Find, running in O(E log E), making it well suited for sparse graphs.\n\nPrim's algorithm starts from a vertex and repeatedly adds the minimum-weight edge connecting the growing tree to a new vertex, using a min-heap, running in O(E log V), making it well suited for dense graphs.",
    "keyPoints": [
      "Kruskal's: uses Union-Find (Disjoint Set Union) to detect cycles",
      "Prim's: uses a min-heap, similar structure to Dijkstra",
      "Both produce MST with the same total weight"
    ],
    "commonMistakes": [
      "Not using Union-Find to efficiently detect cycles in Kruskal's",
      "Confusing Prim's growing-tree approach with Kruskal's edge-sorting approach",
      "Assuming one algorithm is always better regardless of graph density"
    ],
    "followUpQuestions": [
      "How does Union-Find detect cycles efficiently?",
      "Why does Prim's perform better on dense graphs?",
      "Can MST have multiple valid solutions with the same total weight?"
    ],
    "realWorldExample": "Designing a minimum-cost network of cables connecting several cities uses MST algorithms like Kruskal's or Prim's.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain both algorithms' core approach and justify which is more suitable based on graph density.",
    "tags": ["Kruskal", "Prim", "MST", "Graphs", "Interview"],
    "relatedTopics": ["Union-Find", "Dijkstra", "Graph Algorithms"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-011",
    "category": "Data Structures & Algorithms",
    "topic": "Dijkstra's Algorithm",
    "difficulty": "Hard",
    "question": "Explain Dijkstra's Algorithm. Why does it fail with negative weights?",
    "shortAnswer": "Dijkstra's finds the shortest path from a source to all vertices using a greedy, min-heap approach — O((V+E) log V).",
    "detailedAnswer": "Dijkstra's algorithm repeatedly selects the unvisited vertex with the smallest known distance and relaxes its outgoing edges, assuming once a vertex is finalized its shortest distance can never improve.\n\nThis assumption breaks with negative edge weights, since a later negative edge could produce a shorter path to an already-finalized vertex. For graphs with negative weights but no negative cycles, Bellman-Ford should be used instead.",
    "keyPoints": [
      "Greedy choice: always pick unvisited vertex with smallest tentative distance",
      "Fails on negative weights: finalized vertex assumption breaks",
      "Bellman-Ford: handles negative weights, detects negative cycles"
    ],
    "commonMistakes": [
      "Using Dijkstra's on graphs with negative edge weights",
      "Not knowing Bellman-Ford as the correct alternative for negative weights",
      "Confusing negative weights with negative cycles"
    ],
    "followUpQuestions": [
      "How does Bellman-Ford detect negative cycles?",
      "What data structure is typically used to implement Dijkstra's efficiently?",
      "Why can't Dijkstra's finalized assumption hold with negative weights?"
    ],
    "realWorldExample": "GPS navigation systems use Dijkstra's algorithm to compute the shortest driving route between two locations.",
    "codeExample": {
      "language": "Python",
      "code": "import heapq\n\ndef dijkstra(graph, start):\n    dist = {node: float('inf') for node in graph}\n    dist[start] = 0\n    pq = [(0, start)]\n    while pq:\n        d, node = heapq.heappop(pq)\n        if d > dist[node]:\n            continue\n        for neighbor, weight in graph[node]:\n            new_dist = d + weight\n            if new_dist < dist[neighbor]:\n                dist[neighbor] = new_dist\n                heapq.heappush(pq, (new_dist, neighbor))\n    return dist"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the greedy approach and clearly articulate why negative weights break Dijkstra's correctness.",
    "tags": ["Dijkstra", "Shortest Path", "Graphs", "Interview"],
    "relatedTopics": ["Bellman-Ford", "Greedy Algorithms", "Priority Queue"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-012",
    "category": "Data Structures & Algorithms",
    "topic": "Balanced Binary Search Trees",
    "difficulty": "Hard",
    "question": "What is a Balanced BST (AVL/Red-Black Tree)? Why is balancing needed?",
    "shortAnswer": "A balanced BST keeps height O(log n) via rebalancing, guaranteeing O(log n) operations instead of degrading to O(n).",
    "detailedAnswer": "A plain BST can degenerate into a linked list, for example when inserting already-sorted data. AVL trees maintain a strict balance factor using rotations, guaranteeing O(log n) operations but requiring more rotations.\n\nRed-Black trees use a looser balancing rule with fewer rotations, making them faster for writes, which is why they're used in Java's TreeMap and the Linux kernel's scheduler.",
    "keyPoints": [
      "AVL: stricter balance, faster lookups, slower inserts",
      "Red-Black: looser balance, faster inserts, used in most libraries",
      "Both guarantee O(log n) for search, insert, delete"
    ],
    "commonMistakes": [
      "Assuming a plain BST always guarantees O(log n) operations",
      "Confusing AVL's stricter balancing with Red-Black's looser balancing",
      "Not knowing which real-world libraries use which balanced tree"
    ],
    "followUpQuestions": [
      "What are the four rotation types used in AVL trees?",
      "Why do Red-Black trees perform fewer rotations than AVL trees?",
      "Where are Red-Black trees used in real systems?"
    ],
    "realWorldExample": "Java's TreeMap and TreeSet are implemented internally using Red-Black trees to guarantee O(log n) operations.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain why balancing matters and contrast AVL and Red-Black tree trade-offs.",
    "tags": ["AVL Tree", "Red-Black Tree", "BST", "Data Structures", "Interview"],
    "relatedTopics": ["Rotations", "Tree Traversal", "Binary Search Tree"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-013",
    "category": "Data Structures & Algorithms",
    "topic": "Sliding Window Technique",
    "difficulty": "Medium",
    "question": "What is the Sliding Window technique? When should you use it?",
    "shortAnswer": "Sliding Window maintains a subset of elements over an array/string that expands/contracts, solving subarray problems in O(n) instead of O(n²).",
    "detailedAnswer": "The Sliding Window technique is used for contiguous subarray or substring problems, such as maximum sum, longest substring without repeating characters, or minimum window containing all required characters.\n\nA fixed-size window keeps a constant size and slides by one position each step. A variable-size window expands the right pointer to grow and contracts the left pointer when a condition is violated. This avoids recomputing from scratch for each window.",
    "keyPoints": [
      "Fixed window: max sum subarray of size k",
      "Variable window: longest substring without repeating characters",
      "Two-pointer technique is closely related"
    ],
    "commonMistakes": [
      "Recomputing the entire window sum from scratch instead of adjusting incrementally",
      "Not correctly shrinking the window when the condition is violated",
      "Confusing fixed-size and variable-size window problems"
    ],
    "followUpQuestions": [
      "How would you find the longest substring without repeating characters?",
      "What's the difference between fixed and variable sliding windows?",
      "How is the two-pointer technique related to sliding window?"
    ],
    "realWorldExample": "Calculating a moving average of stock prices over the last k days uses a fixed-size sliding window.",
    "codeExample": {
      "language": "Python",
      "code": "def max_sum_subarray(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum"
    },
    "interviewerExpectation": "The interviewer expects the candidate to recognize when sliding window applies and implement both fixed and variable window variants correctly.",
    "tags": ["Sliding Window", "Two Pointers", "Arrays", "Interview"],
    "relatedTopics": ["Two Pointer Technique", "Subarray Problems", "String Algorithms"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-014",
    "category": "Data Structures & Algorithms",
    "topic": "Merge Sort",
    "difficulty": "Medium",
    "question": "What is Merge Sort? Explain its algorithm and complexity.",
    "shortAnswer": "Merge Sort divides the array into halves, recursively sorts each, then merges — guaranteed O(n log n), stable, uses O(n) extra space.",
    "detailedAnswer": "In the divide step, the array is split into two halves recursively until single elements remain. In the conquer step, sorted halves are merged back together by comparing elements from each half.\n\nMerge Sort is stable, meaning it preserves the relative order of equal elements, and has consistent O(n log n) performance regardless of input, unlike Quick Sort's worst case.",
    "keyPoints": [
      "Best/Average/Worst: all O(n log n)",
      "Space: O(n) — not in-place",
      "Preferred for: linked lists, external sorting (large files), stable sort requirement"
    ],
    "commonMistakes": [
      "Assuming Merge Sort is in-place (it requires O(n) extra space)",
      "Confusing Merge Sort's consistent performance with Quick Sort's variable worst case",
      "Forgetting Merge Sort is stable while standard Quick Sort is not"
    ],
    "followUpQuestions": [
      "Why is Merge Sort preferred for linked lists?",
      "What does it mean for a sorting algorithm to be stable?",
      "How does external sorting use Merge Sort's approach?"
    ],
    "realWorldExample": "Sorting massive log files that don't fit in memory often uses external merge sort, processing chunks and merging them.",
    "codeExample": {
      "language": "Python",
      "code": "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the divide-and-conquer approach and justify Merge Sort's guaranteed O(n log n) and stability.",
    "tags": ["Merge Sort", "Sorting", "Divide and Conquer", "Interview"],
    "relatedTopics": ["Quick Sort", "Stable Sorting", "External Sorting"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-015",
    "category": "Data Structures & Algorithms",
    "topic": "Quick Sort",
    "difficulty": "Medium",
    "question": "What is Quick Sort? Why is pivot selection important?",
    "shortAnswer": "Quick Sort picks a pivot, partitions the array around it, and recurses. Average O(n log n), worst case O(n²) with a bad pivot.",
    "detailedAnswer": "The partition step places the pivot in its correct sorted position, with smaller elements to its left and larger elements to its right, then recursion is applied to both partitions.\n\nA bad pivot choice, such as always picking the smallest or largest element as with already-sorted input and a first-element pivot, causes unbalanced partitions leading to O(n²) performance. Randomized pivot selection or median-of-three selection mitigates this risk.",
    "keyPoints": [
      "In-place: O(log n) stack space, no extra array needed",
      "Not stable (in standard implementation)",
      "Faster in practice than Merge Sort due to cache locality"
    ],
    "commonMistakes": [
      "Always choosing the first or last element as pivot without randomization",
      "Assuming Quick Sort is stable like Merge Sort",
      "Not recognizing when input causes worst-case O(n²) behavior"
    ],
    "followUpQuestions": [
      "How does randomized pivot selection improve worst-case performance?",
      "Why is Quick Sort often faster in practice than Merge Sort?",
      "What is the median-of-three pivot selection strategy?"
    ],
    "realWorldExample": "Many standard library sort implementations use a variant of Quick Sort (often hybridized with insertion sort for small arrays) due to its practical speed.",
    "codeExample": {
      "language": "Python",
      "code": "def quick_sort(arr, low, high):\n    if low < high:\n        pivot_idx = partition(arr, low, high)\n        quick_sort(arr, low, pivot_idx - 1)\n        quick_sort(arr, pivot_idx + 1, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i+1], arr[high] = arr[high], arr[i+1]\n    return i + 1"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain partitioning and articulate how pivot choice affects worst-case complexity.",
    "tags": ["Quick Sort", "Sorting", "Partitioning", "Interview"],
    "relatedTopics": ["Merge Sort", "Randomized Algorithms", "Divide and Conquer"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-016",
    "category": "Data Structures & Algorithms",
    "topic": "Heap",
    "difficulty": "Medium",
    "question": "What is a Heap? Explain Min-Heap vs Max-Heap and Heapify.",
    "shortAnswer": "Heap is a complete binary tree satisfying the heap property. Min-heap: parent ≤ children. Max-heap: parent ≥ children.",
    "detailedAnswer": "A heap is stored as an array where the parent of index i is at (i-1)//2, and its children are at 2i+1 and 2i+2. Insert and extract-min/max operations run in O(log n).\n\nBuilding a heap from an unsorted array, called heapify, runs in O(n), not O(n log n), because most nodes are near the bottom of the tree and require few swaps to satisfy the heap property.",
    "keyPoints": [
      "Used in: Priority Queue, Heap Sort, Dijkstra's algorithm, K largest elements",
      "Python heapq: min-heap by default — negate values for max-heap",
      "Heap Sort: O(n log n), in-place, but not stable"
    ],
    "commonMistakes": [
      "Assuming heapify takes O(n log n) instead of O(n)",
      "Forgetting Python's heapq only supports min-heap natively",
      "Confusing heap ordering with full sorted ordering"
    ],
    "followUpQuestions": [
      "Why is heapify O(n) instead of O(n log n)?",
      "How would you implement a max-heap using Python's heapq?",
      "What is Heap Sort and why is it not stable?"
    ],
    "realWorldExample": "A priority-based task scheduler uses a min-heap to always process the task with the earliest deadline first.",
    "codeExample": {
      "language": "Python",
      "code": "import heapq\n\nmin_heap = [5, 2, 8, 1]\nheapq.heapify(min_heap)\nheapq.heappush(min_heap, 0)\nsmallest = heapq.heappop(min_heap)  # 0"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain heap array representation, complexity of operations, and why heapify is linear time.",
    "tags": ["Heap", "Priority Queue", "Heap Sort", "Interview"],
    "relatedTopics": ["Priority Queue", "Dijkstra's Algorithm", "Heap Sort"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-017",
    "category": "Data Structures & Algorithms",
    "topic": "Two-Pointer Technique",
    "difficulty": "Medium",
    "question": "What is the Two-Pointer Technique? Give examples of problems it solves.",
    "shortAnswer": "Uses two index variables moving toward each other or at different speeds to solve array/string problems in O(n).",
    "detailedAnswer": "Common patterns include converging pointers, where left starts at 0 and right at n-1 and both move inward, used for sorted-array pair sum problems or palindrome checks, and fast-slow pointers, such as Floyd's cycle detection, used to find cycles in linked lists in O(n) time and O(1) space.",
    "keyPoints": [
      "Pair sum in sorted array: converge from both ends",
      "Palindrome check: compare from both ends inward",
      "Slow/fast pointer: cycle detection in linked lists (Floyd's algorithm)"
    ],
    "commonMistakes": [
      "Using two pointers on unsorted data when the technique requires sorted input",
      "Not correctly terminating pointer movement conditions",
      "Confusing fast-slow pointer cycle detection with converging pointer techniques"
    ],
    "followUpQuestions": [
      "How does Floyd's cycle detection algorithm work?",
      "How would you find a pair with a given sum in a sorted array?",
      "What is the time and space complexity of the two-pointer technique?"
    ],
    "realWorldExample": "Detecting whether a linked list has a cycle, such as in a corrupted data structure, uses Floyd's fast-slow pointer technique.",
    "codeExample": {
      "language": "Python",
      "code": "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False"
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify appropriate two-pointer patterns and implement them correctly for common problem types.",
    "tags": ["Two Pointers", "Arrays", "Linked List", "Interview"],
    "relatedTopics": ["Sliding Window", "Floyd's Cycle Detection", "Linked List"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-018",
    "category": "Data Structures & Algorithms",
    "topic": "Graph Representation",
    "difficulty": "Medium",
    "question": "What is a Graph? Explain adjacency matrix vs adjacency list representation.",
    "shortAnswer": "Graph is a set of vertices and edges. Adjacency matrix: O(V²) space, O(1) edge lookup. Adjacency list: O(V+E) space, better for sparse graphs.",
    "detailedAnswer": "An Adjacency Matrix uses a 2D array where matrix[i][j] indicates an edge between vertex i and vertex j, offering fast edge lookup but wasting space for sparse graphs.\n\nAn Adjacency List stores, for each vertex, a list of its neighbours, making it space-efficient for sparse graphs, which is common in real-world use cases like social networks and road maps.",
    "keyPoints": [
      "Adjacency matrix: dense graphs, O(1) edge check, O(V²) space",
      "Adjacency list: sparse graphs, O(degree) edge check, O(V+E) space",
      "DAG (Directed Acyclic Graph): used for topological sorting"
    ],
    "commonMistakes": [
      "Using an adjacency matrix for very large sparse graphs, wasting memory",
      "Assuming edge lookup is always O(1) regardless of representation",
      "Confusing directed and undirected graph representations"
    ],
    "followUpQuestions": [
      "When would you prefer an adjacency matrix over a list?",
      "How does graph density affect the choice of representation?",
      "What is a DAG and why does it matter for topological sorting?"
    ],
    "realWorldExample": "A social network with millions of users but relatively few connections per user uses an adjacency list to represent friendships efficiently.",
    "codeExample": {
      "language": "Python",
      "code": "# Adjacency list representation\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D'],\n    'C': ['A'],\n    'D': ['B']\n}"
    },
    "interviewerExpectation": "The interviewer expects the candidate to compare space and lookup trade-offs and justify representation choice based on graph density.",
    "tags": ["Graph", "Adjacency Matrix", "Adjacency List", "Interview"],
    "relatedTopics": ["BFS", "DFS", "Topological Sort"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-019",
    "category": "Data Structures & Algorithms",
    "topic": "Topological Sorting",
    "difficulty": "Hard",
    "question": "What is Topological Sorting? Where is it used?",
    "shortAnswer": "Topological Sort orders vertices of a Directed Acyclic Graph (DAG) so that for every edge u→v, u comes before v.",
    "detailedAnswer": "Topological sorting is only possible on DAGs, since cyclic graphs have no valid topological order. Two common approaches exist: a DFS-based method, where a vertex is pushed onto a stack after all its descendants are finished and the stack is reversed for the final order, and Kahn's Algorithm, a BFS-based method that repeatedly removes vertices with in-degree 0.\n\nTopological sorting is used in build systems to compile dependencies first, task scheduling with prerequisites, and course scheduling.",
    "keyPoints": [
      "Only works on DAGs — cyclic graphs have no valid topological order",
      "Kahn's Algorithm: BFS + in-degree tracking, also detects cycles if not all nodes processed",
      "Real-world: npm/pip dependency resolution, course prerequisite ordering"
    ],
    "commonMistakes": [
      "Attempting topological sort on a graph with cycles",
      "Forgetting to reverse the stack in the DFS-based approach",
      "Not using Kahn's algorithm's in-degree count to also detect cycles"
    ],
    "followUpQuestions": [
      "How does Kahn's Algorithm detect a cycle in the graph?",
      "What is the difference between DFS-based and Kahn's approach to topological sort?",
      "How is topological sort used in dependency resolution tools like npm?"
    ],
    "realWorldExample": "A build system like Make or npm uses topological sorting to determine the correct order to compile or install interdependent packages.",
    "codeExample": {
      "language": "Python",
      "code": "from collections import deque\n\ndef topological_sort(graph, in_degree, nodes):\n    queue = deque([n for n in nodes if in_degree[n] == 0])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    return order if len(order) == len(nodes) else []  # empty if cycle exists"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain both DFS-based and Kahn's algorithm approaches and identify real-world dependency resolution use cases.",
    "tags": ["Topological Sort", "DAG", "Graphs", "Interview"],
    "relatedTopics": ["BFS", "DFS", "Cycle Detection"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-020",
    "category": "Data Structures & Algorithms",
    "topic": "Linear Search vs Binary Search",
    "difficulty": "Easy",
    "question": "What is the difference between Linear Search and Binary Search?",
    "shortAnswer": "Linear Search checks every element sequentially — O(n), works on unsorted data. Binary Search halves the search space — O(log n), requires sorted data.",
    "detailedAnswer": "Linear search is simple and works on any data structure or order but is inefficient for large datasets since it may need to check every element.\n\nBinary search is dramatically faster but has the strict prerequisite that data must be sorted; if data changes frequently, the cost of keeping it sorted may outweigh the search speed benefit.",
    "keyPoints": [
      "Linear search: O(n) time, O(1) space, no ordering requirement",
      "Binary search: O(log n) time, requires sorted data",
      "Use linear search for small or frequently-changing unsorted datasets"
    ],
    "commonMistakes": [
      "Using binary search on unsorted data",
      "Assuming binary search is always better without considering sorting cost",
      "Forgetting linear search works on any data structure, including linked lists"
    ],
    "followUpQuestions": [
      "When would linear search actually be preferable to binary search?",
      "What is the cost trade-off of maintaining sorted data for binary search?",
      "Can binary search be applied to a linked list efficiently?"
    ],
    "realWorldExample": "Searching an unsorted list of recently added items uses linear search, while searching a sorted product catalog uses binary search.",
    "codeExample": {
      "language": "Python",
      "code": "def linear_search(arr, target):\n    for i, val in enumerate(arr):\n        if val == target:\n            return i\n    return -1"
    },
    "interviewerExpectation": "The interviewer expects the candidate to weigh the trade-off between search speed and the cost of maintaining sorted order.",
    "tags": ["Linear Search", "Binary Search", "Searching", "Interview"],
    "relatedTopics": ["Sorting", "Time Complexity", "Arrays"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-021",
    "category": "Data Structures & Algorithms",
    "topic": "Backtracking",
    "difficulty": "Hard",
    "question": "What is Backtracking? Give an example problem.",
    "shortAnswer": "Backtracking builds a solution incrementally and abandons (\"backtracks\") a path as soon as it determines it cannot lead to a valid solution.",
    "detailedAnswer": "Backtracking explores all possible configurations via a decision tree, pruning branches early when a partial solution violates constraints, which is much more efficient than brute-force enumeration of all possibilities.\n\nClassic problems include the N-Queens problem, where N queens are placed on a chessboard with no two attacking each other, the Sudoku Solver, generating permutations and combinations, and the Subset Sum problem.",
    "keyPoints": [
      "Explores solution space as a tree, prunes invalid branches early",
      "N-Queens: place queens row by row, backtrack if placement causes conflict",
      "Time complexity is often exponential but pruning makes it practical for moderate inputs"
    ],
    "commonMistakes": [
      "Not pruning invalid branches early, leading to unnecessary exploration",
      "Confusing backtracking with plain brute-force enumeration",
      "Forgetting to undo state changes when backtracking (leaving stale state)"
    ],
    "followUpQuestions": [
      "How does backtracking differ from brute-force search?",
      "How would you solve the N-Queens problem using backtracking?",
      "Why is pruning important for backtracking's practical performance?"
    ],
    "realWorldExample": "Solving a Sudoku puzzle by trying numbers and backtracking whenever a placement violates row, column, or box constraints.",
    "codeExample": {
      "language": "Python",
      "code": "def solve_n_queens(n, row=0, cols=set(), diag1=set(), diag2=set(), board=None):\n    if board is None:\n        board = []\n    if row == n:\n        return True\n    for col in range(n):\n        if col in cols or (row - col) in diag1 or (row + col) in diag2:\n            continue\n        cols.add(col); diag1.add(row - col); diag2.add(row + col)\n        board.append(col)\n        if solve_n_queens(n, row + 1, cols, diag1, diag2, board):\n            return True\n        cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)\n        board.pop()\n    return False"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the prune-and-explore approach and walk through a classic backtracking problem like N-Queens.",
    "tags": ["Backtracking", "N-Queens", "Recursion", "Interview"],
    "relatedTopics": ["Recursion", "Dynamic Programming", "Combinatorics"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-022",
    "category": "Data Structures & Algorithms",
    "topic": "Complete vs Full Binary Tree",
    "difficulty": "Medium",
    "question": "What is the difference between a Complete Binary Tree and a Full Binary Tree?",
    "shortAnswer": "Full Binary Tree: every node has 0 or 2 children (never exactly 1). Complete Binary Tree: all levels filled except possibly the last, which fills left to right.",
    "detailedAnswer": "A Full Binary Tree has no nodes with only one child; every node is either a leaf or has exactly two children.\n\nA Complete Binary Tree is filled at every level except possibly the last, and the last level's nodes are filled from left to right without gaps. This property is exactly what allows a heap to be efficiently stored in a simple array without wasted space or explicit pointers.",
    "keyPoints": [
      "Full: 0 or 2 children per node, no exceptions",
      "Complete: array-representable efficiently (used for heaps)",
      "Perfect Binary Tree: full AND all leaves at the same depth (2^h - 1 nodes)"
    ],
    "commonMistakes": [
      "Confusing complete, full, and perfect binary trees",
      "Assuming any binary tree can be efficiently array-represented",
      "Not knowing complete trees are the basis for heap array storage"
    ],
    "followUpQuestions": [
      "What is a Perfect Binary Tree and how does it differ from Complete and Full?",
      "Why can complete binary trees be stored efficiently in arrays?",
      "Can a tree be both full and complete but not perfect?"
    ],
    "realWorldExample": "A binary heap used in a priority queue is implemented as a complete binary tree stored in an array.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish full, complete, and perfect binary trees with structural definitions.",
    "tags": ["Binary Tree", "Complete Tree", "Full Tree", "Interview"],
    "relatedTopics": ["Heap", "Tree Traversal", "Perfect Binary Tree"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-023",
    "category": "Data Structures & Algorithms",
    "topic": "Amortized Time Complexity",
    "difficulty": "Hard",
    "question": "What is Amortized Time Complexity? Give an example.",
    "shortAnswer": "Amortized complexity averages the cost of an operation over a sequence of operations, even if individual operations occasionally cost more.",
    "detailedAnswer": "A dynamic array's append operation is usually O(1), but occasionally the array becomes full and must be resized, typically by doubling, which copies all existing elements in an O(n) operation.\n\nBecause doubling happens increasingly rarely as the array grows, the average cost per append, amortized over many operations, is still O(1). This is proven using techniques like the accounting method or the potential method in algorithm analysis.",
    "keyPoints": [
      "Dynamic array append: O(1) amortized despite occasional O(n) resize",
      "Hash table insert: O(1) amortized despite occasional O(n) rehash",
      "Amortized ≠ average case — it's a guarantee over worst-case sequences, not probabilistic"
    ],
    "commonMistakes": [
      "Confusing amortized complexity with average-case (probabilistic) complexity",
      "Assuming every individual operation is O(1) rather than the sequence average",
      "Not knowing the accounting or potential method used to prove amortized bounds"
    ],
    "followUpQuestions": [
      "How is amortized complexity different from average-case complexity?",
      "What is the accounting method used to prove amortized bounds?",
      "Can you give another example of an amortized O(1) operation?"
    ],
    "realWorldExample": "Python's list.append() is amortized O(1) because the underlying array occasionally resizes but does so exponentially less often as it grows.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to correctly distinguish amortized complexity from average-case complexity with a concrete example.",
    "tags": ["Amortized Complexity", "Dynamic Array", "Complexity Analysis", "Interview"],
    "relatedTopics": ["Big O Notation", "Dynamic Array", "Hash Table"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-024",
    "category": "Data Structures & Algorithms",
    "topic": "Cycle Detection in Graphs",
    "difficulty": "Hard",
    "question": "What is the difference between DFS-based Cycle Detection in Directed vs Undirected Graphs?",
    "shortAnswer": "Undirected graphs: a cycle exists if DFS encounters an already-visited vertex that isn't the immediate parent. Directed graphs: need to track the current recursion path (a \"back edge\" to a node in the current DFS stack indicates a cycle).",
    "detailedAnswer": "In an undirected graph, simply revisiting any already-visited node, other than the parent just visited, indicates a cycle, because edges are bidirectional.\n\nIn a directed graph, this simple check fails; instead, three states per node are needed: unvisited, currently in the recursion stack (visiting), and fully processed. A cycle exists only if a node currently in the recursion stack is encountered, known as a back edge, since a directed edge to an already-fully-processed node doesn't necessarily indicate a cycle.",
    "keyPoints": [
      "Undirected: track parent, cycle if visited node ≠ parent is revisited",
      "Directed: track recursion stack state (white/gray/black coloring)",
      "Detecting cycles in directed graphs is essential before topological sorting"
    ],
    "commonMistakes": [
      "Applying the undirected-graph cycle check (visited node check) to directed graphs",
      "Not tracking the three-state coloring needed for directed graph cycle detection",
      "Forgetting cycle detection is a prerequisite before topological sorting"
    ],
    "followUpQuestions": [
      "Why doesn't the undirected graph cycle check work for directed graphs?",
      "What is the three-color (white/gray/black) approach to cycle detection?",
      "How does cycle detection relate to topological sorting?"
    ],
    "realWorldExample": "Detecting circular dependencies in a package manager's dependency graph requires directed-graph cycle detection before attempting a topological sort.",
    "codeExample": {
      "language": "Python",
      "code": "def has_cycle_directed(graph, node, visiting, visited):\n    visiting.add(node)\n    for neighbor in graph[node]:\n        if neighbor in visiting:\n            return True\n        if neighbor not in visited:\n            if has_cycle_directed(graph, neighbor, visiting, visited):\n                return True\n    visiting.remove(node)\n    visited.add(node)\n    return False"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain why directed and undirected cycle detection require different approaches and describe the three-state coloring method.",
    "tags": ["Cycle Detection", "Graphs", "DFS", "Interview"],
    "relatedTopics": ["Topological Sort", "DFS", "Directed Acyclic Graph"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "dsa-025",
    "category": "Data Structures & Algorithms",
    "topic": "Greedy Algorithms vs Dynamic Programming",
    "difficulty": "Hard",
    "question": "What is the difference between Greedy Algorithms and Dynamic Programming?",
    "shortAnswer": "Greedy makes the locally optimal choice at each step, never reconsidering it. DP explores multiple possibilities and combines optimal subproblem solutions, guaranteeing global optimality when applicable.",
    "detailedAnswer": "A Greedy algorithm commits to the choice that looks best right now without exploring alternatives; it is fast, usually O(n log n) or better, but only produces the globally optimal solution for problems with the greedy choice property, such as Activity Selection, Huffman Coding, and Fractional Knapsack.\n\nDynamic Programming considers all relevant subproblems and builds up to the optimal global solution, guaranteeing correctness for a broader class of problems, such as 0/1 Knapsack where greedy fails, but at a higher time and space cost. A common interview question involves proving whether a greedy approach actually produces the optimal solution for a specific problem, or whether DP is required instead.",
    "keyPoints": [
      "Greedy: fast, simple, but only correct for specific problem structures",
      "DP: explores overlapping subproblems, guarantees optimal solution more broadly",
      "Example where greedy fails but DP works: 0/1 Knapsack (Fractional Knapsack works with greedy)"
    ],
    "commonMistakes": [
      "Applying a greedy approach to a problem lacking the greedy choice property",
      "Confusing 0/1 Knapsack (needs DP) with Fractional Knapsack (works with greedy)",
      "Assuming greedy algorithms always produce an optimal, not just fast, solution"
    ],
    "followUpQuestions": [
      "How would you prove a greedy algorithm produces the optimal solution?",
      "Why does greedy work for Fractional Knapsack but not 0/1 Knapsack?",
      "Can you give another example where DP is required over greedy?"
    ],
    "realWorldExample": "Huffman Coding, used in file compression, uses a greedy approach to build an optimal prefix code based on character frequencies.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify when greedy algorithms are correct versus when DP is required, using concrete problem examples.",
    "tags": ["Greedy Algorithms", "Dynamic Programming", "Optimization", "Interview"],
    "references": ["CLRS - Introduction to Algorithms"]
  },
  {
    "id": "db-001",
    "category": "Database",
    "topic": "ACID Properties",
    "difficulty": "Medium",
    "question": "What are ACID properties in databases?",
    "shortAnswer": "Atomicity, Consistency, Isolation, Durability — guarantee reliable transaction processing.",
    "detailedAnswer": "Atomicity ensures a transaction is all-or-nothing, either every operation succeeds or all are rolled back using undo logs. Consistency ensures a transaction moves the database from one valid state to another, respecting all constraints.\n\nIsolation ensures concurrent transactions behave as if executed sequentially. Durability ensures committed data survives crashes, achieved via Write-Ahead Logging, where changes are logged to disk before being applied.",
    "keyPoints": [
      "Atomicity: BEGIN → operations → COMMIT or ROLLBACK",
      "Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable",
      "BASE (NoSQL alternative): Basically Available, Soft state, Eventually consistent"
    ],
    "commonMistakes": [
      "Confusing ACID consistency with CAP theorem consistency",
      "Not knowing WAL is the mechanism behind durability",
      "Mixing up isolation level ordering"
    ],
    "followUpQuestions": [
      "What is Write-Ahead Logging?",
      "How does isolation level affect performance?",
      "How does ACID compare to BASE in NoSQL systems?"
    ],
    "realWorldExample": "A bank transfer transaction must debit one account and credit another atomically — if either step fails, the whole transaction rolls back.",
    "codeExample": {
      "language": "SQL",
      "code": "BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain each ACID property with a concrete example, especially in the context of transactions.",
    "tags": ["ACID", "Transactions", "Database", "Interview"],
    "relatedTopics": ["Isolation Levels", "Write-Ahead Logging", "BASE"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-002",
    "category": "Database",
    "topic": "Normalization",
    "difficulty": "Medium",
    "question": "Explain Normalization: 1NF, 2NF, 3NF, BCNF.",
    "shortAnswer": "1NF: atomic values. 2NF: no partial dependency. 3NF: no transitive dependency. BCNF: every determinant is a superkey.",
    "detailedAnswer": "1NF requires atomic, indivisible column values with no repeating groups. 2NF, relevant for composite keys, requires every non-key attribute to depend on the entire primary key, not just part of it.\n\n3NF requires non-key attributes to depend only on the primary key, not on other non-key attributes, avoiding transitive dependency. BCNF is a stricter version where for every functional dependency X→Y, X must be a candidate key.",
    "keyPoints": [
      "1NF violation: storing \"phone1, phone2\" in a single column",
      "3NF violation: Employee → Department → DepartmentManager (transitive dependency)",
      "Denormalization: intentional redundancy for read performance in OLAP systems"
    ],
    "commonMistakes": [
      "Confusing partial dependency (2NF) with transitive dependency (3NF)",
      "Assuming higher normal forms are always better regardless of read performance",
      "Not identifying determinants correctly for BCNF"
    ],
    "followUpQuestions": [
      "What is a transitive dependency?",
      "Why would you denormalize a database?",
      "Can you give an example that satisfies 3NF but violates BCNF?"
    ],
    "realWorldExample": "Splitting a single 'Orders' table containing customer, product, and order details into separate normalized tables to avoid data redundancy.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE TABLE Customers (customer_id INT PRIMARY KEY, customer_name VARCHAR(50));\nCREATE TABLE Products (product_id INT PRIMARY KEY, product_name VARCHAR(50));\nCREATE TABLE Orders (order_id INT PRIMARY KEY, customer_id INT, product_id INT);"
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish each normal form with a concrete violation example and explain why normalization reduces redundancy.",
    "tags": ["Normalization", "1NF", "2NF", "3NF", "BCNF", "Interview"],
    "relatedTopics": ["Functional Dependency", "Denormalization", "Database Design"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-003",
    "category": "Database",
    "topic": "SQL Joins",
    "difficulty": "Easy",
    "question": "What are the types of SQL Joins? Explain with examples.",
    "shortAnswer": "INNER: matching rows only. LEFT: all left + matched right. RIGHT: opposite. FULL OUTER: all rows from both. CROSS: Cartesian product.",
    "detailedAnswer": "INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table, with NULLs for non-matching right-table columns.\n\nFULL OUTER JOIN returns all rows from both tables, though MySQL needs a UNION workaround since it lacks native support. CROSS JOIN produces every combination of rows, resulting in n×m rows. SELF JOIN joins a table to itself using aliases, commonly used for hierarchical data like employee-manager relationships.",
    "keyPoints": [
      "INNER JOIN: most restrictive, only true matches",
      "LEFT JOIN: all customers, including those with zero orders",
      "SELF JOIN: employee reports-to manager within the same table"
    ],
    "commonMistakes": [
      "Confusing LEFT JOIN and RIGHT JOIN direction",
      "Forgetting MySQL lacks native FULL OUTER JOIN",
      "Using CROSS JOIN unintentionally, causing a row-count explosion"
    ],
    "followUpQuestions": [
      "How would you implement a FULL OUTER JOIN in MySQL?",
      "What is a self join used for?",
      "What happens with a CROSS JOIN between two large tables?"
    ],
    "realWorldExample": "Listing all customers along with their orders (if any) using a LEFT JOIN between Customers and Orders tables.",
    "codeExample": {
      "language": "SQL",
      "code": "SELECT c.name, o.order_id\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain each join type with a clear example and identify when NULLs appear in results.",
    "tags": ["SQL", "Joins", "Interview"],
    "relatedTopics": ["Subqueries", "Set Operations", "Query Optimization"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-004",
    "category": "Database",
    "topic": "Indexing",
    "difficulty": "Medium",
    "question": "What is Indexing? Types of indexes and when to use each?",
    "shortAnswer": "Index is a data structure (usually B+ tree) that speeds up SELECT queries by avoiding full table scans — at the cost of slower writes.",
    "detailedAnswer": "A Clustered Index determines the physical storage order of rows; a table can have only one, usually built on the primary key. A Non-Clustered (Secondary) Index is a separate structure with pointers to rows, and multiple are allowed per table.\n\nA Composite Index covers multiple columns, and the leftmost prefix rule determines which query patterns can use it. A Full-Text Index supports text search patterns like LIKE '%word%'.",
    "keyPoints": [
      "Composite index (a,b,c): usable for queries on (a), (a,b), (a,b,c) — not (b,c) alone",
      "Never over-index — each index adds write overhead and storage cost",
      "EXPLAIN/EXPLAIN ANALYZE: check whether a query uses an index or does a full scan"
    ],
    "commonMistakes": [
      "Creating too many indexes, hurting write performance",
      "Not understanding the leftmost prefix rule for composite indexes",
      "Assuming indexes always speed up every kind of query"
    ],
    "followUpQuestions": [
      "What is the leftmost prefix rule?",
      "How does a clustered index differ from a non-clustered index?",
      "How would you use EXPLAIN to debug a slow query?"
    ],
    "realWorldExample": "Adding an index on the 'email' column of a Users table to speed up login lookups.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE INDEX idx_users_email ON Users(email);\n\nEXPLAIN SELECT * FROM Users WHERE email = 'a@b.com';"
    },
    "interviewerExpectation": "The interviewer expects understanding of index structures, trade-offs between read speed and write cost, and the leftmost prefix rule.",
    "tags": ["Indexing", "B+ Tree", "SQL", "Interview"],
    "relatedTopics": ["Query Optimization", "Clustered Index", "Composite Index"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-005",
    "category": "Database",
    "topic": "DELETE vs TRUNCATE vs DROP",
    "difficulty": "Easy",
    "question": "What is the difference between DELETE, TRUNCATE, and DROP?",
    "shortAnswer": "DELETE: conditional row removal, logged, rollbackable. TRUNCATE: removes all rows fast, minimal logging. DROP: removes the entire table structure.",
    "detailedAnswer": "DELETE is a DML command that removes rows matching a WHERE clause, fires triggers per row, is fully logged, and is rollbackable within a transaction.\n\nTRUNCATE is a DDL command that deallocates all data pages at once, uses minimal logging, cannot use a WHERE clause, resets AUTO_INCREMENT, and is much faster for large tables. DROP removes the table entirely, including schema, data, indexes, constraints, and permissions.",
    "keyPoints": [
      "DELETE: slow for large tables but supports conditional removal + rollback",
      "TRUNCATE: fast, resets identity counter, no per-row trigger firing",
      "PostgreSQL: TRUNCATE is transactional (rollbackable); MySQL's is not"
    ],
    "commonMistakes": [
      "Using TRUNCATE expecting WHERE clause support",
      "Assuming TRUNCATE is always rollbackable across all databases",
      "Confusing DROP (removes structure) with DELETE/TRUNCATE (remove data only)"
    ],
    "followUpQuestions": [
      "Is TRUNCATE rollbackable in PostgreSQL vs MySQL?",
      "Why is TRUNCATE faster than DELETE?",
      "What happens to auto-increment values after TRUNCATE?"
    ],
    "realWorldExample": "Clearing all temporary session data at the start of a batch job using TRUNCATE instead of a slower DELETE.",
    "codeExample": {
      "language": "SQL",
      "code": "DELETE FROM Orders WHERE status = 'cancelled';\nTRUNCATE TABLE TempSessions;\nDROP TABLE OldLogs;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify DML vs DDL classification and know rollback and logging behavior differences.",
    "tags": ["SQL", "DELETE", "TRUNCATE", "DROP", "Interview"],
    "relatedTopics": ["DDL", "DML", "Transactions"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-006",
    "category": "Database",
    "topic": "SQL vs NoSQL",
    "difficulty": "Medium",
    "question": "What is SQL vs NoSQL? When would you choose each?",
    "shortAnswer": "SQL: relational, fixed schema, ACID, complex joins. NoSQL: flexible schema, horizontal scale, eventual consistency.",
    "detailedAnswer": "SQL databases like MySQL, PostgreSQL, and Oracle use structured tables and guarantee ACID properties, making them best suited for financial systems and relational data with complex reporting needs.\n\nNoSQL includes Document stores like MongoDB with a JSON-like flexible schema, Key-Value stores like Redis for caching and sessions, Column-Family stores like Cassandra for massive write throughput and time-series data, and Graph databases like Neo4j for relationship-heavy data such as social networks.",
    "keyPoints": [
      "SQL: banking, ERP, CRM — structured data, strong consistency",
      "MongoDB: product catalogs, CMS — flexible, evolving schema",
      "Cassandra: IoT sensor data, logs — high write throughput at scale"
    ],
    "commonMistakes": [
      "Assuming NoSQL always means 'no schema at all'",
      "Choosing NoSQL just for scale without considering consistency needs",
      "Not knowing different NoSQL categories serve different use cases"
    ],
    "followUpQuestions": [
      "What is the CAP theorem and how does it relate to NoSQL?",
      "When would you choose a graph database like Neo4j?",
      "How does eventual consistency differ from strong consistency?"
    ],
    "realWorldExample": "An e-commerce product catalog with varying attributes per category is often stored in MongoDB (NoSQL) rather than a rigid SQL schema.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to match database type to use case based on schema flexibility, consistency, and scale requirements.",
    "tags": ["SQL", "NoSQL", "Databases", "Interview"],
    "relatedTopics": ["CAP Theorem", "MongoDB", "Cassandra"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-007",
    "category": "Database",
    "topic": "Isolation Levels and Anomalies",
    "difficulty": "Hard",
    "question": "What are database Transactions, Isolation Levels, and their anomalies?",
    "shortAnswer": "Isolation levels from weakest to strongest: Read Uncommitted, Read Committed, Repeatable Read, Serializable.",
    "detailedAnswer": "Read Uncommitted allows dirty reads, meaning it can read uncommitted data from another transaction, making it the fastest but least safe. Read Committed only reads committed data and is the default in PostgreSQL and Oracle.\n\nRepeatable Read guarantees the same value on repeated reads within a transaction and is the default in MySQL InnoDB. Serializable is the strongest, making transactions behave as if executed one at a time, preventing phantom reads too, but it is the slowest due to heavy locking.",
    "keyPoints": [
      "Dirty Read: blocked from Read Committed level upward",
      "Phantom Read: blocked only by Serializable",
      "Higher isolation = more locking = lower concurrency/throughput"
    ],
    "commonMistakes": [
      "Confusing dirty read, non-repeatable read, and phantom read anomalies",
      "Assuming Serializable is always the best default choice",
      "Not knowing which anomaly each isolation level prevents"
    ],
    "followUpQuestions": [
      "What is a phantom read and which isolation level prevents it?",
      "What is the trade-off between isolation level and performance?",
      "How does MVCC help with isolation without heavy locking?"
    ],
    "realWorldExample": "A banking system uses Serializable isolation for fund transfers to avoid any anomalies, despite the performance cost.",
    "codeExample": {
      "language": "SQL",
      "code": "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nBEGIN;\n-- transaction operations\nCOMMIT;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to map each isolation level to the anomalies it prevents and discuss performance trade-offs.",
    "tags": ["Transactions", "Isolation Levels", "Database", "Interview"],
    "relatedTopics": ["ACID", "MVCC", "Concurrency Control"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-008",
    "category": "Database",
    "topic": "Primary Key vs Foreign Key vs Candidate Key",
    "difficulty": "Easy",
    "question": "What is a Primary Key vs a Foreign Key vs a Candidate Key?",
    "shortAnswer": "Primary Key uniquely identifies each row in a table. Foreign Key references a Primary Key in another table, enforcing referential integrity. Candidate Key is any column (or set) that could serve as the Primary Key.",
    "detailedAnswer": "A Candidate Key is a minimal set of columns that uniquely identifies a row; a table can have multiple candidate keys, but only one is chosen as the Primary Key, with the rest becoming Alternate Keys. A Primary Key cannot contain NULL values and must be unique.\n\nA Foreign Key establishes a link between two tables, ensuring that a value in the child table must exist in the parent table's referenced column, which prevents orphaned records and enforces referential integrity.",
    "keyPoints": [
      "Primary Key: NOT NULL + UNIQUE, one per table (can be composite)",
      "Foreign Key: enforces referential integrity between parent and child tables",
      "ON DELETE CASCADE: automatically deletes child rows when the parent row is deleted"
    ],
    "commonMistakes": [
      "Assuming a table can have only one candidate key",
      "Forgetting a primary key cannot contain NULL values",
      "Not understanding foreign keys enforce referential integrity, not just references"
    ],
    "followUpQuestions": [
      "What is the difference between a candidate key and an alternate key?",
      "What happens if you try to insert a foreign key value with no matching parent row?",
      "What are the different ON DELETE actions for foreign keys?"
    ],
    "realWorldExample": "An Orders table has a foreign key referencing the customer_id primary key in the Customers table, preventing orders from referencing non-existent customers.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE TABLE Orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE\n);"
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish primary, foreign, and candidate keys and explain referential integrity enforcement.",
    "tags": ["Primary Key", "Foreign Key", "Candidate Key", "Database", "Interview"],
    "relatedTopics": ["Referential Integrity", "Composite Key", "Surrogate Key"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-009",
    "category": "Database",
    "topic": "Aggregate Functions, GROUP BY, HAVING",
    "difficulty": "Medium",
    "question": "What are Aggregate Functions? Explain GROUP BY and HAVING.",
    "shortAnswer": "Aggregate functions (COUNT, SUM, AVG, MIN, MAX) compute a single value from multiple rows. GROUP BY groups rows sharing a value; HAVING filters groups (unlike WHERE, which filters individual rows).",
    "detailedAnswer": "Aggregate functions operate on a set of rows and return one summary value, such as SUM(salary) across all employees. GROUP BY splits rows into groups based on one or more columns, applying the aggregate function separately to each group, such as total salary per department.\n\nWHERE filters rows before grouping, while HAVING filters groups after aggregation. An aggregate function cannot be used in a WHERE clause, which is exactly why HAVING exists.",
    "keyPoints": [
      "WHERE: filters individual rows, evaluated before GROUP BY",
      "HAVING: filters aggregated groups, evaluated after GROUP BY",
      "Example: SELECT dept, COUNT(*) FROM employees GROUP BY dept HAVING COUNT(*) > 5"
    ],
    "commonMistakes": [
      "Using an aggregate function inside a WHERE clause instead of HAVING",
      "Forgetting to include non-aggregated columns in GROUP BY",
      "Confusing the order of execution: WHERE before GROUP BY, HAVING after"
    ],
    "followUpQuestions": [
      "Why can't you use an aggregate function in a WHERE clause?",
      "What columns must appear in a GROUP BY clause?",
      "Can you combine WHERE and HAVING in the same query?"
    ],
    "realWorldExample": "Finding departments with more than 5 employees uses GROUP BY department combined with HAVING COUNT(*) > 5.",
    "codeExample": {
      "language": "SQL",
      "code": "SELECT dept, COUNT(*) AS emp_count\nFROM employees\nGROUP BY dept\nHAVING COUNT(*) > 5;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish WHERE from HAVING based on execution order and correctly use aggregate functions with GROUP BY.",
    "tags": ["Aggregate Functions", "GROUP BY", "HAVING", "SQL", "Interview"],
    "relatedTopics": ["SQL Joins", "Query Optimization", "Views"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-010",
    "category": "Database",
    "topic": "SQL Views",
    "difficulty": "Medium",
    "question": "What is a View in SQL? What are its advantages and limitations?",
    "shortAnswer": "A View is a virtual table based on the result of a stored SQL query — it doesn't store data itself but presents data dynamically from underlying tables.",
    "detailedAnswer": "Views simplify complex queries by encapsulating them behind a simple table-like interface, provide a security layer by exposing only specific columns or rows to certain users without direct table access, and offer logical data independence since the underlying table structure can change without breaking application queries, as long as the view definition is updated.\n\nLimitations include that views built on complex joins or aggregations are often not directly updatable, and querying a view re-executes the underlying query each time unless it is materialized.",
    "keyPoints": [
      "Simple views (single table, no aggregation) are usually updatable",
      "Materialized View: physically stores the result, refreshed periodically — faster reads, stale data risk",
      "Security use case: expose a view with salary column omitted to non-HR users"
    ],
    "commonMistakes": [
      "Assuming all views are updatable regardless of complexity",
      "Confusing a regular view with a materialized view",
      "Forgetting a view re-executes its query on every access"
    ],
    "followUpQuestions": [
      "What makes a view non-updatable?",
      "How does a materialized view differ from a regular view?",
      "How can views be used for security purposes?"
    ],
    "realWorldExample": "An HR system creates a view exposing only employee names and departments, omitting salary, for use by non-HR staff.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE VIEW EmployeePublic AS\nSELECT employee_id, name, department\nFROM Employees;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain views' role in abstraction and security, and know their update and performance limitations.",
    "tags": ["SQL View", "Materialized View", "Database", "Interview"],
    "relatedTopics": ["Materialized View", "Query Optimization", "Security"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-011",
    "category": "Database",
    "topic": "Clustered vs Non-Clustered Index",
    "difficulty": "Hard",
    "question": "What is the difference between a Clustered Index and Non-Clustered Index in more depth?",
    "shortAnswer": "Clustered Index determines the actual physical order of data on disk (one per table). Non-Clustered Index is a separate structure with pointers back to the actual rows (multiple allowed).",
    "detailedAnswer": "Because a clustered index dictates physical row order, a table can only have one clustered index, usually built automatically on the primary key. Range queries such as BETWEEN or ORDER BY on a clustered index column are very fast since matching rows are physically adjacent.\n\nA non-clustered index is stored separately from the actual table data, containing the indexed column value plus a pointer, or row locator, to the actual row. Querying via a non-clustered index requires an extra lookup step, called a bookmark lookup, to fetch the full row unless the query is a covering query where all needed columns are already in the index itself.",
    "keyPoints": [
      "Clustered: physically reorders the table, one per table, fast range scans",
      "Non-clustered: separate structure + pointer, multiple per table",
      "Covering index: includes all columns needed by a query, avoiding the extra lookup"
    ],
    "commonMistakes": [
      "Assuming a table can have multiple clustered indexes",
      "Not understanding the bookmark lookup cost of non-clustered indexes",
      "Forgetting covering indexes avoid the extra lookup step"
    ],
    "followUpQuestions": [
      "What is a bookmark lookup and when does it occur?",
      "How does a covering index improve query performance?",
      "Why can a table have only one clustered index?"
    ],
    "realWorldExample": "A primary key column automatically becomes the clustered index in many databases, physically sorting rows by that key.",
    "codeExample": {
      "language": "SQL",
      "code": "-- Covering index example\nCREATE INDEX idx_covering ON Orders(customer_id, order_date, total);"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the physical storage implications of clustered indexes and the bookmark lookup cost of non-clustered indexes.",
    "tags": ["Clustered Index", "Non-Clustered Index", "Database", "Interview"],
    "relatedTopics": ["Indexing", "Query Optimization", "Covering Index"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-012",
    "category": "Database",
    "topic": "Normalization vs Denormalization",
    "difficulty": "Medium",
    "question": "What is Database Normalization vs Denormalization? When would you denormalize?",
    "shortAnswer": "Normalization reduces redundancy for data integrity. Denormalization intentionally introduces redundancy to improve read performance.",
    "detailedAnswer": "A fully normalized schema minimizes update anomalies, since data is changed in one place only, but can require many JOINs for common queries, which becomes expensive at scale.\n\nDenormalization pre-joins or duplicates data to avoid expensive runtime joins, commonly used in read-heavy analytics and reporting systems like data warehouses and OLAP cubes, where read speed matters more than write efficiency or storage space. The trade-off is that denormalized data risks inconsistency if not carefully maintained, since the same fact stored in multiple places must be updated everywhere.",
    "keyPoints": [
      "Normalized: OLTP systems (transactional, frequent writes, data integrity critical)",
      "Denormalized: OLAP systems (analytics, read-heavy, fewer writes)",
      "Common denormalization: storing a calculated total instead of recalculating via JOIN + SUM every read"
    ],
    "commonMistakes": [
      "Denormalizing an OLTP system where write consistency matters most",
      "Not accounting for the maintenance overhead of denormalized redundant data",
      "Assuming normalization is always the correct default regardless of workload"
    ],
    "followUpQuestions": [
      "What is an update anomaly and how does normalization prevent it?",
      "When is denormalization the right architectural choice?",
      "How do you keep denormalized data consistent over time?"
    ],
    "realWorldExample": "An analytics dashboard stores a precomputed 'total_revenue' column instead of recalculating it via a JOIN and SUM on every page load.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to weigh read performance against data integrity and correctly map normalized/denormalized schemas to OLTP/OLAP use cases.",
    "tags": ["Normalization", "Denormalization", "OLTP", "OLAP", "Interview"],
    "relatedTopics": ["OLTP vs OLAP", "Data Warehousing", "Database Design"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-013",
    "category": "Database",
    "topic": "Stored Procedures",
    "difficulty": "Medium",
    "question": "What is a Stored Procedure? Advantages and disadvantages?",
    "shortAnswer": "A Stored Procedure is a precompiled set of SQL statements stored in the database, callable by name with parameters.",
    "detailedAnswer": "Stored procedures execute on the database server itself, reducing network round-trips by sending one call instead of multiple queries, improving performance since the execution plan is precompiled and not repeatedly parsed, and centralizing business logic so multiple applications can reuse the same procedure consistently.\n\nDisadvantages include being harder to version control and test compared to application code, tying business logic to a specific database vendor and reducing portability, and making debugging and horizontal scaling of application logic more difficult since logic lives in the database layer.",
    "keyPoints": [
      "Reduces network round trips: one call instead of multiple round-trip queries",
      "Precompiled: execution plan cached, faster repeated execution",
      "Downside: vendor lock-in, harder to unit test than application-layer code"
    ],
    "commonMistakes": [
      "Overusing stored procedures for logic better suited to the application layer",
      "Not considering vendor lock-in when relying heavily on stored procedures",
      "Assuming stored procedures are always faster regardless of query complexity"
    ],
    "followUpQuestions": [
      "Why are stored procedures harder to test than application code?",
      "How does precompilation improve stored procedure performance?",
      "What is the vendor lock-in risk of relying on stored procedures?"
    ],
    "realWorldExample": "A banking application uses a stored procedure to process a fund transfer, centralizing the debit/credit logic in the database for consistency across multiple client applications.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE PROCEDURE TransferFunds(IN from_id INT, IN to_id INT, IN amount DECIMAL)\nBEGIN\n  UPDATE accounts SET balance = balance - amount WHERE id = from_id;\n  UPDATE accounts SET balance = balance + amount WHERE id = to_id;\nEND;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to weigh performance and consistency benefits against portability and testability drawbacks.",
    "tags": ["Stored Procedure", "Database", "Interview"],
    "relatedTopics": ["Triggers", "Query Optimization", "Database Design"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-014",
    "category": "Database",
    "topic": "Deadlocks in Databases",
    "difficulty": "Medium",
    "question": "What is a Deadlock in databases? How is it detected and resolved?",
    "shortAnswer": "A deadlock occurs when two or more transactions block each other, each waiting for a lock the other holds — neither can proceed.",
    "detailedAnswer": "Transaction A locks Row 1 and waits for Row 2, while Transaction B locks Row 2 and waits for Row 1 — both wait forever. Databases detect this by building a wait-for graph and looking for cycles, or by using a timeout mechanism where a lock not acquired within a set time is assumed to indicate deadlock.\n\nOnce detected, the database automatically kills one transaction, often the one with the least work done, referred to as the victim, and rolls it back, allowing the other to proceed. Applications should catch this error and retry the failed transaction.",
    "keyPoints": [
      "Prevention: always acquire locks in a consistent order across all transactions",
      "Detection: wait-for graph cycle detection, or lock timeout",
      "Application responsibility: catch deadlock errors and retry the transaction"
    ],
    "commonMistakes": [
      "Not designing applications to catch and retry deadlock errors",
      "Acquiring locks in inconsistent order across different transactions",
      "Confusing database-level deadlocks with application-level race conditions"
    ],
    "followUpQuestions": [
      "How does consistent lock ordering prevent deadlocks?",
      "What is a wait-for graph and how is it used for detection?",
      "How should an application handle a deadlock error from the database?"
    ],
    "realWorldExample": "Two concurrent bank transfer transactions locking accounts in opposite order can deadlock, requiring the database to abort one and retry.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the wait-for-graph detection mechanism and describe prevention via consistent lock ordering.",
    "tags": ["Deadlock", "Transactions", "Database", "Interview"],
    "relatedTopics": ["Locking", "Isolation Levels", "Concurrency Control"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-015",
    "category": "Database",
    "topic": "OLTP vs OLAP",
    "difficulty": "Medium",
    "question": "What is the difference between OLTP and OLAP?",
    "shortAnswer": "OLTP (Online Transaction Processing): fast, small, frequent read/write transactions — powers applications. OLAP (Online Analytical Processing): complex queries over large historical datasets — powers analytics/reporting.",
    "detailedAnswer": "OLTP systems, typical of application databases, handle a high volume of short, simple transactions like inserting an order or updating a user profile, and are optimized for write speed while being normalized to prevent update anomalies.\n\nOLAP systems handle complex analytical queries over huge historical datasets, including aggregations, trends, and multi-dimensional analysis. They are optimized for read speed on large scans, often denormalized using star or snowflake schemas, and use columnar storage to speed up aggregate queries across millions of rows.",
    "keyPoints": [
      "OLTP: normalized schema, row-based storage, MySQL/PostgreSQL for apps",
      "OLAP: denormalized star schema, columnar storage, Snowflake/BigQuery/Redshift",
      "ETL pipelines move data from OLTP systems into OLAP data warehouses"
    ],
    "commonMistakes": [
      "Using a normalized OLTP schema for analytical reporting queries",
      "Not knowing columnar storage speeds up OLAP aggregate queries",
      "Confusing star schema (OLAP) with relational schema (OLTP)"
    ],
    "followUpQuestions": [
      "What is a star schema and why is it used in OLAP?",
      "How does an ETL pipeline move data from OLTP to OLAP systems?",
      "Why is columnar storage better suited for analytical queries?"
    ],
    "realWorldExample": "An e-commerce app uses PostgreSQL (OLTP) for order processing, while nightly ETL jobs load data into a Redshift data warehouse (OLAP) for sales reporting.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish OLTP and OLAP by workload pattern, schema design, and storage format.",
    "tags": ["OLTP", "OLAP", "Data Warehouse", "Database", "Interview"],
    "relatedTopics": ["Normalization vs Denormalization", "ETL", "Star Schema"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-016",
    "category": "Database",
    "topic": "Composite Key vs Surrogate Key",
    "difficulty": "Medium",
    "question": "What is a Composite Key and a Surrogate Key?",
    "shortAnswer": "Composite Key: primary key made of multiple columns combined. Surrogate Key: an artificial, meaningless unique identifier (usually auto-increment or UUID) with no business meaning.",
    "detailedAnswer": "A Composite Key is used when no single column uniquely identifies a row, but a combination does, such as (student_id, course_id) in an enrollment table, since each student-course pair is unique even though a student can take many courses and a course can have many students.\n\nA Surrogate Key is an artificially generated identifier, such as an auto-increment integer or UUID, used instead of a natural or composite key, even when a natural key exists. This insulates the schema from changes to business logic, such as if a supposedly 'unique' email later turns out not to be unique.",
    "keyPoints": [
      "Composite key example: (order_id, product_id) in an order_items table",
      "Surrogate key: auto-increment id column, decoupled from business meaning",
      "UUID vs auto-increment: UUIDs avoid collision across distributed systems but are larger and less index-friendly"
    ],
    "commonMistakes": [
      "Using a natural key that later turns out not to be unique",
      "Not considering UUID's larger size and indexing cost trade-off",
      "Confusing a composite key with a compound foreign key"
    ],
    "followUpQuestions": [
      "Why are surrogate keys often preferred over natural keys?",
      "What are the trade-offs between UUID and auto-increment surrogate keys?",
      "When would a composite key be the right design choice?"
    ],
    "realWorldExample": "A distributed system spanning multiple database shards uses UUIDs as surrogate keys to avoid ID collisions across shards.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE TABLE Enrollment (\n  student_id INT,\n  course_id INT,\n  PRIMARY KEY (student_id, course_id)\n);"
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish composite and surrogate keys and discuss trade-offs between natural and artificial identifiers.",
    "tags": ["Composite Key", "Surrogate Key", "Database", "Interview"],
    "relatedTopics": ["Primary Key", "Foreign Key", "UUID"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-017",
    "category": "Database",
    "topic": "Database Replication",
    "difficulty": "Medium",
    "question": "What is Database Replication? Explain Master-Slave (Primary-Replica) replication.",
    "shortAnswer": "Replication copies data from one database (primary/master) to one or more copies (replicas/slaves) for read scaling and high availability.",
    "detailedAnswer": "In Primary-Replica replication, all writes go to the primary database, which streams its changes via a binary log or write-ahead log to one or more replicas that apply the same changes to stay in sync. Read queries can be distributed across replicas to scale read throughput, while writes remain centralized on the primary to avoid conflicts.\n\nReplication can be synchronous, where the primary waits for replica confirmation before committing, offering stronger consistency but higher latency, or asynchronous, where the primary commits immediately and replicas catch up shortly after, offering lower latency with a small risk of data loss on primary failure.",
    "keyPoints": [
      "Synchronous replication: stronger consistency, higher write latency",
      "Asynchronous replication: faster writes, small replication lag risk",
      "Failover: if primary fails, a replica is promoted to become the new primary"
    ],
    "commonMistakes": [
      "Assuming replication automatically scales write throughput (it only scales reads)",
      "Not accounting for replication lag risk with asynchronous replication",
      "Confusing replication with sharding"
    ],
    "followUpQuestions": [
      "What happens during a failover event?",
      "What is the trade-off between synchronous and asynchronous replication?",
      "How does replication differ from sharding?"
    ],
    "realWorldExample": "A high-traffic web application routes read queries to multiple read replicas while sending all writes to a single primary database.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the read-scaling purpose of replication and the consistency-latency trade-off between sync and async modes.",
    "tags": ["Replication", "High Availability", "Database", "Interview"],
    "relatedTopics": ["Sharding", "Failover", "High Availability"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-018",
    "category": "Database",
    "topic": "Query Optimization and Execution Plans",
    "difficulty": "Hard",
    "question": "What is Query Optimization? What is an Execution Plan?",
    "shortAnswer": "Query optimization is the process the database engine uses to determine the most efficient way to execute a SQL query. An Execution Plan shows the actual steps chosen.",
    "detailedAnswer": "The Query Optimizer analyzes possible ways to execute a query, including which indexes to use, join order, and join algorithm, estimating the cost of each approach using statistics about table sizes and data distribution, then picks the cheapest plan.\n\nRunning EXPLAIN, or EXPLAIN ANALYZE for actual runtime statistics, shows this chosen plan, revealing whether an index was used, how many rows were scanned, and what join algorithm was applied, such as nested loop, hash join, or merge join. Developers use this to identify slow queries doing full table scans and add appropriate indexes.",
    "keyPoints": [
      "EXPLAIN: shows the planned execution strategy without running the query",
      "EXPLAIN ANALYZE: actually runs the query and shows real timing/row counts",
      "Seq Scan (full table scan) in the plan often signals a missing index"
    ],
    "commonMistakes": [
      "Not using EXPLAIN to diagnose slow queries before adding indexes blindly",
      "Confusing EXPLAIN (estimated plan) with EXPLAIN ANALYZE (actual execution)",
      "Ignoring join algorithm choice when reading an execution plan"
    ],
    "followUpQuestions": [
      "What does a Seq Scan in an execution plan usually indicate?",
      "What is the difference between EXPLAIN and EXPLAIN ANALYZE?",
      "How does the optimizer decide between a nested loop and a hash join?"
    ],
    "realWorldExample": "A developer runs EXPLAIN ANALYZE on a slow-running report query and discovers a full table scan, prompting them to add a missing index.",
    "codeExample": {
      "language": "SQL",
      "code": "EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain how the optimizer chooses a plan and how to interpret EXPLAIN output to diagnose performance issues.",
    "tags": ["Query Optimization", "Execution Plan", "Database", "Interview"],
    "relatedTopics": ["Indexing", "Joins", "Database Performance"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-019",
    "category": "Database",
    "topic": "Sharding vs Partitioning",
    "difficulty": "Hard",
    "question": "What is Database Sharding and how is it different from Partitioning?",
    "shortAnswer": "Sharding distributes data across multiple separate database instances/servers. Partitioning divides a table into smaller pieces within the SAME database instance.",
    "detailedAnswer": "Partitioning splits a large table into smaller physical pieces based on a key, such as by date range or region, while remaining part of the same database server; queries can be optimized to scan only the relevant partition through partition pruning.\n\nSharding takes this further by distributing partitions across entirely separate database servers or instances, used when a single server's storage or throughput capacity is exceeded. Sharding introduces additional complexity, including cross-shard joins, transactions spanning shards, and rebalancing when adding new shards.",
    "keyPoints": [
      "Partitioning: same server, improves query performance via pruning",
      "Sharding: multiple servers, improves scalability of storage AND throughput",
      "Both use a similar key strategy: range-based, hash-based, or list-based"
    ],
    "commonMistakes": [
      "Confusing partitioning (single server) with sharding (multiple servers)",
      "Not accounting for cross-shard join complexity when designing a sharded system",
      "Assuming partitioning alone solves throughput scaling limits"
    ],
    "followUpQuestions": [
      "What is partition pruning and how does it improve performance?",
      "What challenges does sharding introduce for cross-shard transactions?",
      "How would you rebalance data when adding a new shard?"
    ],
    "realWorldExample": "A large table of sales data is partitioned by year within a single database, while a multi-tenant SaaS application shards its entire database by tenant ID across multiple servers.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer explains sharding from partitioning by scope (multiple servers vs single server) and discusses added complexity of sharding.",
    "tags": ["Sharding", "Partitioning", "Database", "Interview"],
    "relatedTopics": ["Replication", "Horizontal Scaling", "Consistent Hashing"],
    "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
  },
  {
    "id": "db-020",
    "category": "Database",
    "topic": "N+1 Query Problem",
    "difficulty": "Medium",
    "question": "What is the N+1 Query Problem? How do you fix it?",
    "shortAnswer": "The N+1 problem occurs when fetching a list of N parent records triggers one additional query PER record to fetch related child data — resulting in N+1 total queries instead of 2.",
    "detailedAnswer": "For example, fetching 100 blog posts and then looping through each post to fetch its author with a separate query results in 1 query for posts plus 100 queries for authors, totaling 101 queries, when it could have been done in as few as 2, or even 1 with a JOIN. This commonly happens with ORMs that lazy-load related data by default.\n\nFixes include using a JOIN to fetch related data in one query, using eager loading such as .include() or .select_related() in Django or JOIN FETCH in JPA, or using a DataLoader pattern that batches and caches lookups in GraphQL resolvers.",
    "keyPoints": [
      "Symptom: application makes way more DB queries than expected under load",
      "Fix: eager loading, explicit JOINs, or batching with a DataLoader",
      "Detection: enable query logging and count queries per request in development"
    ],
    "commonMistakes": [
      "Not noticing lazy-loading defaults in ORMs causing excessive queries",
      "Fixing N+1 by adding more indexes instead of restructuring the query pattern",
      "Not using query logging to detect the N+1 pattern during development"
    ],
    "followUpQuestions": [
      "How does eager loading solve the N+1 problem in an ORM?",
      "What is a DataLoader and how does it help with N+1 in GraphQL?",
      "How would you detect an N+1 problem in a production application?"
    ],
    "realWorldExample": "A blog application listing 100 posts triggers 100 separate queries to fetch each post's author, which is fixed by eager loading the author relationship in a single query.",
    "codeExample": {
      "language": "Python",
      "code": "# Django example: fixing N+1 with select_related\nposts = Post.objects.select_related('author').all()"
    },
    "interviewerExpectation": "The interviewer expects the candidate to recognize the N+1 pattern's cause in ORMs and describe eager loading or batching as the fix.",
    "tags": ["N+1 Problem", "ORM", "Query Optimization", "Interview"],
    "relatedTopics": ["Eager Loading", "DataLoader", "ORM"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-021",
    "category": "Database",
    "topic": "SQL Triggers",
    "difficulty": "Medium",
    "question": "What is a Trigger in SQL? Give a use case.",
    "shortAnswer": "A Trigger is a stored procedure that automatically executes in response to a specific event (INSERT, UPDATE, DELETE) on a table.",
    "detailedAnswer": "Triggers run automatically, either before or after the triggering event, without being explicitly called by the application. Common use cases include maintaining an audit log by automatically logging every change to a sensitive table, enforcing complex business rules that can't be expressed via simple constraints, and automatically updating a denormalized summary column, such as updating a total_orders count on a customer row whenever a new order is inserted.\n\nOveruse of triggers can make application behavior hard to trace, since logic runs invisibly at the database layer.",
    "keyPoints": [
      "BEFORE trigger: can modify the incoming data before it's saved",
      "AFTER trigger: runs after the change is committed — good for logging/auditing",
      "Downside: hidden logic that's easy to forget exists, harder to debug"
    ],
    "commonMistakes": [
      "Overusing triggers, making application behavior hard to trace",
      "Confusing BEFORE and AFTER trigger timing and their appropriate use cases",
      "Forgetting triggers can cause unexpected cascading side effects"
    ],
    "followUpQuestions": [
      "What is the difference between a BEFORE and AFTER trigger?",
      "Why can excessive trigger use make debugging harder?",
      "How would you use a trigger to maintain an audit log?"
    ],
    "realWorldExample": "An AFTER INSERT trigger on an Orders table automatically increments a total_orders counter on the corresponding Customer row.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE TRIGGER update_order_count\nAFTER INSERT ON Orders\nFOR EACH ROW\nBEGIN\n  UPDATE Customers SET total_orders = total_orders + 1 WHERE customer_id = NEW.customer_id;\nEND;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain trigger timing (BEFORE/AFTER) and give a practical use case like auditing or denormalized column maintenance.",
    "tags": ["Trigger", "Database", "Interview"],
    "relatedTopics": ["Stored Procedure", "Audit Logging", "Denormalization"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-022",
    "category": "Database",
    "topic": "Connection Pooling",
    "difficulty": "Medium",
    "question": "What is Connection Pooling? Why is it important for database performance?",
    "shortAnswer": "Connection Pooling maintains a set of pre-established, reusable database connections instead of opening/closing a new connection for every request.",
    "detailedAnswer": "Creating a new database connection is expensive, involving a TCP handshake, authentication, and session setup, which can take tens of milliseconds. Under high traffic, opening and closing a connection per request would overwhelm the database and add significant latency.\n\nA connection pool, such as PgBouncer for PostgreSQL or one built into most ORMs and frameworks, maintains a fixed number of open connections; when the application needs to query the database, it borrows a connection from the pool, uses it, and returns it, avoiding the overhead of establishing a new connection each time.",
    "keyPoints": [
      "Reduces connection setup overhead (TCP handshake, auth) per request",
      "Pool size must be tuned: too small = requests wait, too large = database resource exhaustion",
      "PgBouncer, HikariCP (Java), SQLAlchemy pool — common connection pooling tools"
    ],
    "commonMistakes": [
      "Setting the connection pool size too small, causing request queuing",
      "Setting the pool size too large, exhausting database resources",
      "Not using connection pooling at all under high-traffic conditions"
    ],
    "followUpQuestions": [
      "How would you determine the right connection pool size?",
      "What happens if a connection pool is exhausted?",
      "What are some common connection pooling tools?"
    ],
    "realWorldExample": "A high-traffic web application uses PgBouncer in front of PostgreSQL to manage a fixed pool of database connections across many application server instances.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain why connection setup is expensive and how pooling mitigates that cost, along with sizing trade-offs.",
    "tags": ["Connection Pooling", "Database Performance", "Interview"],
    "relatedTopics": ["Database Performance", "Scalability", "PgBouncer"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-023",
    "category": "Database",
    "topic": "UNION vs UNION ALL",
    "difficulty": "Easy",
    "question": "What is the difference between UNION and UNION ALL?",
    "shortAnswer": "UNION combines results from two queries and removes duplicate rows. UNION ALL combines results and keeps all rows, including duplicates — faster since it skips deduplication.",
    "detailedAnswer": "Both UNION and UNION ALL require the combined queries to have the same number of columns with compatible data types. UNION performs an implicit sort or hash operation to identify and remove duplicate rows across the combined result sets, which adds computational overhead.\n\nUNION ALL simply concatenates all rows from both queries without checking for duplicates, making it significantly faster, and it should always be preferred when there are no duplicates or duplicates don't matter.",
    "keyPoints": [
      "UNION: removes duplicates, slower (extra sort/dedup step)",
      "UNION ALL: keeps all rows including duplicates, faster",
      "Prefer UNION ALL unless deduplication is explicitly required"
    ],
    "commonMistakes": [
      "Using UNION by default without considering the performance cost of deduplication",
      "Assuming UNION and UNION ALL always return the same number of rows",
      "Combining queries with mismatched column counts or types"
    ],
    "followUpQuestions": [
      "Why is UNION ALL generally faster than UNION?",
      "What happens if the combined queries have different column counts?",
      "When would you specifically need UNION instead of UNION ALL?"
    ],
    "realWorldExample": "Combining results from two regional sales tables where duplicates are impossible uses UNION ALL for better performance instead of UNION.",
    "codeExample": {
      "language": "SQL",
      "code": "SELECT name FROM CustomersUS\nUNION ALL\nSELECT name FROM CustomersEU;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the deduplication overhead of UNION and recommend UNION ALL when duplicates aren't a concern.",
    "tags": ["UNION", "UNION ALL", "SQL", "Interview"],
    "relatedTopics": ["Set Operations", "Query Optimization", "SQL Joins"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-024",
    "category": "Database",
    "topic": "Materialized View vs Regular View",
    "difficulty": "Medium",
    "question": "What is a Materialized View? How is it different from a Regular View?",
    "shortAnswer": "A Regular View re-executes its underlying query every time it's accessed. A Materialized View physically stores the query result and must be manually or periodically refreshed.",
    "detailedAnswer": "A regular view is essentially a saved SQL query that always reflects the current live data, but every access re-runs the full underlying query, making it no faster than running the query directly.\n\nA materialized view executes the query once and stores the actual result set as physical data, similar to a table, so subsequent reads are very fast since no recomputation happens. The trade-off is staleness: the materialized view's data becomes outdated as underlying tables change and must be explicitly refreshed, such as with REFRESH MATERIALIZED VIEW in PostgreSQL, either manually, on a schedule, or via triggers.",
    "keyPoints": [
      "Regular view: always current, but slow (recomputes every access)",
      "Materialized view: fast reads, but data can be stale until refreshed",
      "Use case: expensive aggregation queries for dashboards refreshed hourly"
    ],
    "commonMistakes": [
      "Assuming a materialized view is always up to date",
      "Forgetting to schedule refreshes for a materialized view",
      "Using a regular view for a performance-critical expensive aggregation"
    ],
    "followUpQuestions": [
      "How would you refresh a materialized view in PostgreSQL?",
      "What are the trade-offs of staleness vs read performance?",
      "When would you choose a materialized view over a regular view?"
    ],
    "realWorldExample": "A sales dashboard uses a materialized view refreshed hourly to quickly display aggregated revenue metrics without recomputing expensive joins on every page load.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE MATERIALIZED VIEW SalesSummary AS\nSELECT region, SUM(amount) AS total_sales\nFROM Sales\nGROUP BY region;\n\nREFRESH MATERIALIZED VIEW SalesSummary;"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the staleness vs performance trade-off between regular and materialized views.",
    "tags": ["Materialized View", "SQL View", "Database", "Interview"],
    "relatedTopics": ["Query Optimization", "Data Warehousing", "Views"],
    "references": ["Database System Concepts - Silberschatz"]
  },
  {
    "id": "db-025",
    "category": "Database",
    "topic": "Referential Integrity",
    "difficulty": "Medium",
    "question": "What is Referential Integrity? How is it enforced in SQL databases?",
    "shortAnswer": "Referential Integrity ensures that a foreign key value in one table always corresponds to an existing primary key value in the referenced table — no \"orphaned\" references.",
    "detailedAnswer": "Referential integrity is enforced automatically by the database via FOREIGN KEY constraints. Attempting to insert a child row referencing a non-existent parent row is rejected, and attempting to delete a parent row that still has child rows referencing it is either rejected or handled via a defined action.\n\nDefined actions include ON DELETE CASCADE, which automatically deletes matching child rows, ON DELETE SET NULL, which sets the foreign key column to NULL in child rows, or ON DELETE RESTRICT, the default, which blocks the deletion. Referential integrity prevents data inconsistency bugs, such as an order referencing a customer that no longer exists.",
    "keyPoints": [
      "FOREIGN KEY constraint: database rejects invalid references at write time",
      "ON DELETE CASCADE: dangerous if used carelessly — can delete more than intended",
      "ON DELETE RESTRICT (default): safest, blocks deletion if dependent rows exist"
    ],
    "commonMistakes": [
      "Using ON DELETE CASCADE carelessly, causing unintended data loss",
      "Not enforcing foreign key constraints, allowing orphaned records",
      "Confusing ON DELETE SET NULL with ON DELETE CASCADE behavior"
    ],
    "followUpQuestions": [
      "What is the difference between ON DELETE CASCADE and ON DELETE SET NULL?",
      "Why is ON DELETE RESTRICT considered the safest default?",
      "What happens if you try to insert a foreign key referencing a non-existent row?"
    ],
    "realWorldExample": "An e-commerce database prevents an Orders table from referencing a deleted Customer by enforcing a foreign key constraint with ON DELETE RESTRICT.",
    "codeExample": {
      "language": "SQL",
      "code": "CREATE TABLE Orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE RESTRICT\n);"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain how foreign key constraints enforce referential integrity and describe the different ON DELETE actions.",
  },
  {
    "id": "os-001",
    "category": "Operating Systems",
    "topic": "Process vs Thread",
    "difficulty": "Easy",
    "question": "What is the difference between a Process and a Thread?",
    "shortAnswer": "Process: isolated program with own memory space. Thread: lightweight unit within a process, shares memory with siblings.",
    "detailedAnswer": "A process is an independent program in execution with its own virtual address space, code, data, heap, and stack, isolated for protection and expensive to create.\n\nA thread runs within a process and shares its address space and global variables with sibling threads, making thread creation 10-100x cheaper than process creation. In Python, the GIL prevents true CPU parallelism for threads, so multiprocessing is used for CPU-bound work.",
    "keyPoints": [
      "Process: own memory, expensive context switch, more secure",
      "Thread: shared memory, cheap context switch, risk of race conditions",
      "Process states: New, Ready, Running, Waiting/Blocked, Terminated"
    ],
    "commonMistakes": [
      "Assuming threads always improve performance regardless of workload type",
      "Forgetting shared memory in threads can cause race conditions",
      "Not knowing Python's GIL limits true threading parallelism"
    ],
    "followUpQuestions": [
      "What is the Global Interpreter Lock in Python?",
      "How do race conditions occur between threads?",
      "What are the different process states?"
    ],
    "realWorldExample": "A web browser runs each tab as a separate process for isolation, while rendering within a tab may use multiple threads.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects clear distinction between memory isolation, cost of creation, and concurrency implications of processes vs threads.",
    "tags": ["Process", "Thread", "Operating Systems", "Interview"],
    "relatedTopics": ["Concurrency", "Multithreading", "GIL"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-002",
    "category": "Operating Systems",
    "topic": "Deadlock Conditions",
    "difficulty": "Medium",
    "question": "What are the four necessary conditions for Deadlock?",
    "shortAnswer": "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait — all four must hold simultaneously.",
    "detailedAnswer": "Mutual Exclusion means at least one resource is non-sharable. Hold and Wait means a process holds a resource while waiting for another. No Preemption means resources can't be forcibly taken away.\n\nCircular Wait means a cycle exists in the resource-request chain, where P1 waits for P2, P2 waits for P3, and so on until Pn waits for P1. Removing any one of these four conditions prevents deadlock entirely.",
    "keyPoints": [
      "Prevention: impose ordering on resource acquisition (breaks circular wait)",
      "Avoidance: Banker's Algorithm checks safe state before granting a resource",
      "Detection: search for a cycle in the Resource Allocation Graph"
    ],
    "commonMistakes": [
      "Naming only three of the four necessary conditions",
      "Confusing deadlock prevention with deadlock avoidance",
      "Not knowing removing any single condition prevents deadlock"
    ],
    "followUpQuestions": [
      "How does the Banker's Algorithm work?",
      "What is a Resource Allocation Graph?",
      "How would you recover a system from deadlock?"
    ],
    "realWorldExample": "Two database transactions each locking a row the other needs, causing both to wait indefinitely.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to list all four necessary conditions accurately and describe prevention, avoidance, and detection strategies.",
    "tags": ["Deadlock", "Operating Systems", "Interview"],
    "relatedTopics": ["Banker's Algorithm", "Resource Allocation Graph", "Concurrency"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-003",
    "category": "Operating Systems",
    "topic": "Virtual Memory and Paging",
    "difficulty": "Medium",
    "question": "What is Virtual Memory and how does Paging work?",
    "shortAnswer": "Virtual memory abstracts physical RAM, giving each process a large address space. Paging divides it into fixed-size pages mapped to physical frames.",
    "detailedAnswer": "Virtual memory lets processes use more address space than physical RAM by using disk, known as swap, as an extension. Paging divides virtual space into fixed-size pages, commonly 4KB, and the page table maps each virtual page number to a physical frame number.\n\nIf a page isn't in RAM, a page fault occurs: the OS suspends the process, loads the page from disk, updates the page table, and resumes. The Translation Lookaside Buffer caches recent translations to speed up address resolution.",
    "keyPoints": [
      "TLB: hardware cache for page table entries, avoids slow memory lookup",
      "Page replacement algorithms: LRU, FIFO, Optimal (Belady's), Clock",
      "Thrashing: too many processes → constant page faults → CPU utilisation collapses"
    ],
    "commonMistakes": [
      "Confusing paging with segmentation",
      "Forgetting the role of the TLB in speeding up translation",
      "Not understanding what triggers a page fault"
    ],
    "followUpQuestions": [
      "What page replacement algorithms do you know?",
      "What is a TLB miss?",
      "How is thrashing related to paging?"
    ],
    "realWorldExample": "A computer running many large applications simultaneously relies on paging and swap space to avoid running out of RAM.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects understanding of address translation, page faults, and the role of the TLB in virtual memory systems.",
    "tags": ["Virtual Memory", "Paging", "Operating Systems", "Interview"],
    "relatedTopics": ["TLB", "Page Replacement", "Thrashing"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-004",
    "category": "Operating Systems",
    "topic": "Mutex vs Semaphore",
    "difficulty": "Medium",
    "question": "What is the difference between Mutex and Semaphore?",
    "shortAnswer": "Mutex: binary lock with ownership (only locker can unlock). Semaphore: counter-based signal, allows N concurrent accesses.",
    "detailedAnswer": "A mutex ensures only one thread enters a critical section at a time, and only the thread that locked it can unlock it, enforcing ownership.\n\nA semaphore is a counter-based signalling mechanism; a binary semaphore resembles a mutex but lacks ownership, while a counting semaphore allows up to N concurrent accesses, such as a pool of 5 database connections. Semaphores are typically used for signalling between threads in patterns like producer-consumer.",
    "keyPoints": [
      "Mutex: ownership enforced — only the locking thread can unlock",
      "Counting semaphore: limits concurrent access to a resource pool",
      "Condition variable: used WITH a mutex to wait on complex conditions"
    ],
    "commonMistakes": [
      "Using mutex and binary semaphore interchangeably without noting ownership difference",
      "Forgetting semaphores can allow more than one thread through",
      "Not understanding condition variables need a paired mutex"
    ],
    "followUpQuestions": [
      "Can a semaphore be unlocked by a different thread than the one that locked it?",
      "What is a condition variable used for?",
      "How would you implement a connection pool using a semaphore?"
    ],
    "realWorldExample": "A database connection pool uses a counting semaphore to limit the number of simultaneous connections to N.",
    "codeExample": {
      "language": "Python",
      "code": "import threading\n\nsem = threading.Semaphore(3)  # allow 3 concurrent accesses\n\ndef access_resource():\n    with sem:\n        print('Accessing shared resource')"
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish ownership (mutex) from counting-based access (semaphore) with practical examples.",
    "tags": ["Mutex", "Semaphore", "Concurrency", "Interview"],
    "relatedTopics": ["Critical Section", "Condition Variables", "Thread Synchronization"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-005",
    "category": "Operating Systems",
    "topic": "CPU Scheduling",
    "difficulty": "Medium",
    "question": "What are CPU Scheduling Algorithms? Compare Round Robin vs SJF.",
    "shortAnswer": "FCFS, SJF, Round Robin, Priority Scheduling — each balances throughput, fairness, and response time differently.",
    "detailedAnswer": "FCFS is simple but suffers from the convoy effect, where short jobs get stuck behind long ones. SJF gives optimal average waiting time but requires knowing burst time in advance; its preemptive version is SRTF.\n\nRound Robin gives each process a fixed time quantum, then preempts and cycles to the next process, making it fair and widely used for time-sharing systems. Priority Scheduling runs the highest-priority process first, with starvation fixed via aging, which gradually raises the priority of waiting processes.",
    "keyPoints": [
      "Round Robin: small quantum = better response time but more context-switch overhead",
      "Priority scheduling: starvation risk without aging",
      "Linux CFS (Completely Fair Scheduler): O(log n) via a red-black tree"
    ],
    "commonMistakes": [
      "Not knowing SJF requires burst time prediction",
      "Forgetting Round Robin's quantum size trade-off",
      "Confusing preemptive and non-preemptive scheduling variants"
    ],
    "followUpQuestions": [
      "What is the convoy effect in FCFS?",
      "How does aging prevent starvation in priority scheduling?",
      "What scheduler does the Linux kernel use?"
    ],
    "realWorldExample": "Time-sharing operating systems use Round Robin scheduling to give each user process a fair CPU slice.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects comparison of scheduling algorithms across fairness, throughput, and response time with real trade-offs.",
    "tags": ["CPU Scheduling", "Round Robin", "SJF", "Interview"],
    "relatedTopics": ["Process States", "Starvation", "Linux CFS"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-006",
    "category": "Operating Systems",
    "topic": "Context Switching",
    "difficulty": "Medium",
    "question": "What is Context Switching? Why is it expensive?",
    "shortAnswer": "Context switch saves the current process/thread's state and loads the next one's. Expensive mainly due to cache and TLB invalidation, not just the save/restore itself.",
    "detailedAnswer": "When the OS switches the CPU between processes, it saves the current process's context, including the program counter, registers, stack pointer, and page table pointer, into its Process Control Block, then restores the next process's context.\n\nThe direct save/restore is fast, taking microseconds, but the larger cost comes from cache and TLB invalidation, since the new process's memory access patterns are different, causing cache misses until the CPU warms up for the new process. Thread switches within the same process are cheaper since the address space, and hence TLB entries, doesn't need to be flushed.",
    "keyPoints": [
      "PCB stores: registers, program counter, stack pointer, page table, open files",
      "Thread switch: cheaper — shares address space, no TLB flush needed",
      "Process switch: full TLB/cache invalidation on most architectures"
    ],
    "commonMistakes": [
      "Assuming the save/restore step itself is the main cost of context switching",
      "Not distinguishing thread switch cost from process switch cost",
      "Forgetting cache warm-up time contributes significantly to switch overhead"
    ],
    "followUpQuestions": [
      "Why is a thread switch cheaper than a process switch?",
      "What information is stored in a Process Control Block?",
      "How does TLB invalidation affect performance after a context switch?"
    ],
    "realWorldExample": "A server handling many concurrent processes experiences overhead from frequent context switches, motivating the use of lightweight threads or async I/O instead.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify cache/TLB invalidation, not just save/restore, as the primary cost of context switching.",
    "tags": ["Context Switching", "Process Control Block", "Operating Systems", "Interview"],
    "relatedTopics": ["Process vs Thread", "TLB", "CPU Scheduling"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-007",
    "category": "Operating Systems",
    "topic": "Critical Section Problem",
    "difficulty": "Medium",
    "question": "What is the Critical Section Problem?",
    "shortAnswer": "The critical section is code accessing shared data. A valid solution must guarantee Mutual Exclusion, Progress, and Bounded Waiting.",
    "detailedAnswer": "When multiple processes or threads access shared data without coordination, race conditions occur, where the final result depends on unpredictable execution order.\n\nA correct solution must ensure Mutual Exclusion, where only one process is in the critical section at a time, Progress, where if no process is currently in the critical section, one of the waiting processes must be allowed to enter without indefinite postponement, and Bounded Waiting, where a limit exists on how many times other processes can enter before a waiting process gets its turn, preventing starvation.",
    "keyPoints": [
      "Race condition: outcome depends on timing/order of thread execution — must be avoided",
      "Peterson's Algorithm: classic software-only solution for two processes",
      "Test-and-Set / Compare-and-Swap: hardware-level atomic instructions used for real locks"
    ],
    "commonMistakes": [
      "Forgetting Progress and Bounded Waiting as requirements beyond just Mutual Exclusion",
      "Not knowing hardware-level atomic instructions like Compare-and-Swap are used for real locks",
      "Confusing race conditions with deadlocks"
    ],
    "followUpQuestions": [
      "What is Peterson's Algorithm and how does it work?",
      "How do Test-and-Set and Compare-and-Swap enable real-world locks?",
      "What is the difference between Progress and Bounded Waiting requirements?"
    ],
    "realWorldExample": "Two threads incrementing a shared counter without synchronization can produce an incorrect final count due to a race condition in the critical section.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to name and explain all three requirements: Mutual Exclusion, Progress, and Bounded Waiting.",
    "tags": ["Critical Section", "Race Condition", "Operating Systems", "Interview"],
    "relatedTopics": ["Mutex", "Semaphore", "Race Condition"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-008",
    "category": "Operating Systems",
    "topic": "Inter-Process Communication",
    "difficulty": "Medium",
    "question": "What is Inter-Process Communication (IPC)?",
    "shortAnswer": "IPC allows isolated processes to exchange data and synchronise: pipes, message queues, shared memory, sockets, signals.",
    "detailedAnswer": "Pipes provide a unidirectional byte stream between related processes, such as parent-child, while Named Pipes, or FIFOs, extend this to unrelated processes. Shared Memory maps a memory region into multiple processes' address spaces, making it the fastest IPC mechanism but requiring explicit synchronisation via a mutex or semaphore to avoid race conditions.\n\nMessage Queues send structured, prioritised messages asynchronously. Sockets work across machines over a network. Signals are lightweight asynchronous notifications, such as SIGKILL or SIGTERM.",
    "keyPoints": [
      "Shared memory: fastest, but needs mutex/semaphore for synchronisation",
      "Message queue: decoupled, asynchronous, supports message priorities",
      "Socket: most flexible — works across a network, basis of client-server programming"
    ],
    "commonMistakes": [
      "Forgetting shared memory requires manual synchronization",
      "Confusing pipes with named pipes in terms of process relatedness",
      "Not knowing signals are lightweight and asynchronous, unlike other IPC forms"
    ],
    "followUpQuestions": [
      "How do pipes differ from named pipes (FIFOs)?",
      "When would you choose sockets over shared memory?",
      "How are signals used in IPC?"
    ],
    "realWorldExample": "A producer-consumer application uses shared memory with a semaphore to safely pass data between two processes.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects understanding of trade-offs between speed and safety across different IPC mechanisms.",
    "tags": ["IPC", "Shared Memory", "Message Passing", "Interview"],
    "relatedTopics": ["Pipes", "Sockets", "Synchronization"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-009",
    "category": "Operating Systems",
    "topic": "Thrashing",
    "difficulty": "Medium",
    "question": "What is Thrashing? How is it prevented?",
    "shortAnswer": "Thrashing is when the OS spends more time swapping pages than executing processes. Prevented via the Working Set Model or by reducing the degree of multiprogramming.",
    "detailedAnswer": "Thrashing occurs when too many active processes' combined working sets exceed available RAM, causing the OS to constantly evict pages that are needed again almost immediately, resulting in continuous page faults.\n\nCPU utilisation collapses toward zero because processes spend nearly all their time waiting for pages rather than executing. Prevention strategies include the Working Set Model, which keeps each process's actively-used pages resident in RAM and suspends processes if there isn't enough RAM for everyone's working set, or simply reducing the number of concurrently running processes.",
    "keyPoints": [
      "Symptom: CPU appears busy but is actually stuck doing page I/O, not real work",
      "Working set: the set of pages a process referenced in the last d time units",
      "Prevention: limit concurrent processes, add RAM, or use faster swap storage (SSD)"
    ],
    "commonMistakes": [
      "Confusing thrashing with normal paging activity",
      "Not connecting thrashing to over-committed multiprogramming",
      "Forgetting the working set model as a prevention strategy"
    ],
    "followUpQuestions": [
      "What is the Working Set Model?",
      "How does the OS detect thrashing?",
      "What is the relationship between degree of multiprogramming and thrashing?"
    ],
    "realWorldExample": "A computer with insufficient RAM running too many heavy applications simultaneously slows to a crawl due to thrashing.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to connect thrashing to memory over-commitment and describe practical prevention methods.",
    "tags": ["Thrashing", "Memory Management", "Operating Systems", "Interview"],
    "relatedTopics": ["Virtual Memory", "Working Set Model", "Page Replacement"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-010",
    "category": "Operating Systems",
    "topic": "Paging vs Segmentation",
    "difficulty": "Medium",
    "question": "What is the difference between Paging and Segmentation?",
    "shortAnswer": "Paging: fixed-size physical division (avoids external fragmentation). Segmentation: variable-size logical division (matches program structure, but causes external fragmentation).",
    "detailedAnswer": "Paging splits both virtual and physical memory into equal-size fixed blocks called pages and frames, which is simple and avoids external fragmentation, though it causes slight internal fragmentation on the last page.\n\nSegmentation divides a program into logical units, such as code, data, and stack segments, of variable size, reflecting the program's actual structure. This is more intuitive but suffers external fragmentation as segments of different sizes are allocated and freed over time, leaving unusable gaps. Most modern systems, such as x86-64, use paging almost exclusively, with segmentation largely vestigial.",
    "keyPoints": [
      "Paging: no external fragmentation, small internal fragmentation",
      "Segmentation: matches logical program structure, but external fragmentation over time",
      "Paged Segmentation: combines both — each segment is itself divided into pages"
    ],
    "commonMistakes": [
      "Confusing internal and external fragmentation",
      "Assuming segmentation is obsolete rather than combined with paging",
      "Not knowing which fragmentation type each method causes"
    ],
    "followUpQuestions": [
      "What is internal vs external fragmentation?",
      "How do modern systems combine paging and segmentation?",
      "Why do modern x86-64 systems favor paging?"
    ],
    "realWorldExample": "Compilers organize a program's memory into logical segments (code, data, stack), while the OS still manages physical memory using paging underneath.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects a clear distinction between logical (segmentation) and physical (paging) memory division and their fragmentation trade-offs.",
    "tags": ["Paging", "Segmentation", "Memory Management", "Interview"],
    "relatedTopics": ["Virtual Memory", "Fragmentation", "Address Translation"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-011",
    "category": "Operating Systems",
    "topic": "Producer-Consumer Problem",
    "difficulty": "Hard",
    "question": "What is a Semaphore's Producer-Consumer Problem? How is it solved?",
    "shortAnswer": "The Producer-Consumer problem coordinates a producer adding items to a shared buffer and a consumer removing them, ensuring the buffer neither overflows nor underflows. Solved using two counting semaphores plus a mutex.",
    "detailedAnswer": "A bounded buffer of size N is shared between a producer, which adds items, and a consumer, which removes them. Without synchronisation, the producer could add to a full buffer or the consumer could remove from an empty one, and simultaneous access could corrupt the buffer's internal state.\n\nThe solution uses an 'empty' semaphore initialized to N to track available empty slots, a 'full' semaphore initialized to 0 to track filled slots, and a mutex to protect the buffer index during actual insert and remove operations. The producer waits on 'empty' before adding and signals 'full' after; the consumer does the reverse.",
    "keyPoints": [
      "Bounded buffer: fixed-size circular queue shared between producer and consumer",
      "Two semaphores (empty, full) track available space; mutex protects the buffer itself",
      "Classic textbook synchronisation problem, frequently asked to test semaphore understanding"
    ],
    "commonMistakes": [
      "Using only a mutex without the empty/full semaphores, allowing overflow or underflow",
      "Forgetting to protect the buffer index itself with a mutex",
      "Confusing the roles of the 'empty' and 'full' semaphores"
    ],
    "followUpQuestions": [
      "Why are two semaphores needed instead of just one?",
      "What would happen if the mutex were removed from this solution?",
      "How would you extend this to multiple producers and consumers?"
    ],
    "realWorldExample": "A message queue system like RabbitMQ conceptually solves a producer-consumer problem, ensuring producers don't overwhelm consumers and consumers don't read from an empty queue.",
    "codeExample": {
      "language": "Python",
      "code": "import threading\n\nempty = threading.Semaphore(5)\nfull = threading.Semaphore(0)\nmutex = threading.Lock()\nbuffer = []\n\ndef producer(item):\n    empty.acquire()\n    with mutex:\n        buffer.append(item)\n    full.release()\n\ndef consumer():\n    full.acquire()\n    with mutex:\n        item = buffer.pop(0)\n    empty.release()\n    return item"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the roles of the empty/full semaphores and mutex and why all three are necessary.",
    "tags": ["Producer-Consumer", "Semaphore", "Synchronization", "Interview"],
    "relatedTopics": ["Mutex", "Bounded Buffer", "Thread Synchronization"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-012",
    "category": "Operating Systems",
    "topic": "Belady's Anomaly",
    "difficulty": "Hard",
    "question": "What is Belady's Anomaly?",
    "shortAnswer": "Belady's Anomaly is a counter-intuitive phenomenon where increasing the number of page frames INCREASES the number of page faults, using the FIFO page replacement algorithm.",
    "detailedAnswer": "Intuitively, more available RAM in the form of more frames should always reduce or maintain the same number of page faults, but with FIFO specifically, certain reference strings actually produce more page faults with more frames.\n\nThis anomaly does not occur with algorithms belonging to the class of stack algorithms, like LRU and Optimal, which guarantee that increasing frames never increases faults. Belady's Anomaly is a key reason LRU is generally preferred over FIFO in real systems despite FIFO's simplicity.",
    "keyPoints": [
      "Only occurs with FIFO (and similar non-stack algorithms), not LRU or Optimal",
      "Demonstrates that 'more memory' isn't always intuitively better under naive algorithms",
      "Practical implication: motivates the use of stack-based replacement algorithms like LRU"
    ],
    "commonMistakes": [
      "Assuming more memory always reduces page faults regardless of algorithm",
      "Not knowing Belady's Anomaly is specific to FIFO and similar non-stack algorithms",
      "Confusing stack algorithms (LRU, Optimal) with non-stack algorithms (FIFO)"
    ],
    "followUpQuestions": [
      "Why doesn't Belady's Anomaly occur with LRU?",
      "What defines a 'stack algorithm' in page replacement?",
      "What practical lesson does Belady's Anomaly teach about algorithm design?"
    ],
    "realWorldExample": "A system administrator adding more RAM to a server running a FIFO-based caching algorithm might unexpectedly see worse cache performance, illustrating Belady's Anomaly.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the counter-intuitive nature of this anomaly and why it's specific to FIFO, not stack algorithms.",
    "tags": ["Belady's Anomaly", "Page Replacement", "Operating Systems", "Interview"],
    "relatedTopics": ["Page Replacement", "LRU", "FIFO"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-013",
    "category": "Operating Systems",
    "topic": "System Calls",
    "difficulty": "Medium",
    "question": "What is a System Call? How does it differ from a normal function call?",
    "shortAnswer": "A system call is a request from a user program to the OS kernel for a privileged operation (file I/O, process creation, network access) — it requires a context switch from user mode to kernel mode.",
    "detailedAnswer": "Regular function calls execute entirely within the user program's own address space and privilege level. A system call, such as read(), write(), or fork(), requires switching from unprivileged user mode to privileged kernel mode, because only the kernel has direct access to hardware resources like disks, network interfaces, and memory management.\n\nThis mode switch, triggered via a trap or interrupt instruction, has overhead beyond a normal function call, but it's necessary because letting arbitrary user programs directly manipulate hardware would be catastrophic for security and stability.",
    "keyPoints": [
      "User mode: restricted, no direct hardware access",
      "Kernel mode: privileged, full hardware access — system calls trigger this switch",
      "Examples: fork() (create process), read()/write() (file I/O), mmap() (memory mapping)"
    ],
    "commonMistakes": [
      "Assuming system calls have the same overhead as regular function calls",
      "Not knowing the mode switch is triggered via a trap/interrupt instruction",
      "Forgetting why direct hardware access is restricted to kernel mode"
    ],
    "followUpQuestions": [
      "Why is the user-to-kernel mode switch necessary for system calls?",
      "What are some common examples of system calls?",
      "What happens if a user program tries to access hardware directly?"
    ],
    "realWorldExample": "When a program reads a file using read(), it triggers a system call that switches to kernel mode to access the disk hardware.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the user-mode to kernel-mode transition and why it's necessary for privileged operations.",
    "tags": ["System Call", "Kernel Mode", "Operating Systems", "Interview"],
    "relatedTopics": ["User Mode", "Kernel Mode", "Interrupts"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-014",
    "category": "Operating Systems",
    "topic": "Preemptive vs Non-Preemptive Scheduling",
    "difficulty": "Medium",
    "question": "What is the difference between Preemptive and Non-Preemptive Scheduling?",
    "shortAnswer": "Preemptive scheduling can forcibly interrupt a running process to give the CPU to another. Non-preemptive scheduling lets a process run to completion or until it voluntarily yields.",
    "detailedAnswer": "In non-preemptive scheduling, once a process starts executing, it holds the CPU until it finishes or voluntarily blocks, such as for I/O, which is simpler to implement but risks a single long-running process starving others, making it poor for interactive or time-sharing systems.\n\nIn preemptive scheduling, the OS can interrupt a running process, usually via a timer interrupt, and switch to another, which is necessary for responsive time-sharing and real-time systems but requires careful synchronisation to avoid race conditions when preemption happens mid-critical-section.",
    "keyPoints": [
      "Non-preemptive: FCFS, non-preemptive SJF — simple but risk of starvation",
      "Preemptive: Round Robin, SRTF, most modern OS schedulers",
      "Preemption requires careful locking to avoid corrupting shared data mid-operation"
    ],
    "commonMistakes": [
      "Assuming all modern schedulers are non-preemptive",
      "Not accounting for race condition risks when preemption occurs mid-critical-section",
      "Confusing FCFS (non-preemptive) with Round Robin (preemptive)"
    ],
    "followUpQuestions": [
      "Why is preemptive scheduling necessary for time-sharing systems?",
      "What risks does preemption introduce for shared data access?",
      "Can you give an example of a non-preemptive scheduling algorithm?"
    ],
    "realWorldExample": "A modern desktop OS uses preemptive scheduling via timer interrupts to ensure no single application can monopolize the CPU indefinitely.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the trade-off between simplicity (non-preemptive) and responsiveness (preemptive) with synchronization considerations.",
    "tags": ["Preemptive Scheduling", "Non-Preemptive Scheduling", "CPU Scheduling", "Interview"],
    "relatedTopics": ["CPU Scheduling", "Context Switching", "Race Condition"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-015",
    "category": "Operating Systems",
    "topic": "Zombie and Orphan Processes",
    "difficulty": "Medium",
    "question": "What is a Zombie Process and an Orphan Process?",
    "shortAnswer": "Zombie: a child process that has finished but whose exit status hasn't been read by the parent yet. Orphan: a process whose parent terminated before it did.",
    "detailedAnswer": "When a child process finishes execution, it doesn't disappear immediately; it becomes a zombie, retaining a minimal entry in the process table, just the PID and exit status, until the parent calls wait() to reap it and read the exit status. If the parent never calls wait(), the zombie lingers, consuming a process table slot though no CPU or memory beyond that.\n\nAn orphan process is one whose parent has already terminated; the OS automatically re-parents it to the init or systemd process (PID 1), which periodically reaps any zombies among its adopted children.",
    "keyPoints": [
      "Zombie: uses minimal resources (just a process table entry), but too many indicate a bug",
      "Orphan: automatically adopted by init/systemd (PID 1) upon parent's termination",
      "Fix for zombie accumulation: parent must call wait()/waitpid() properly"
    ],
    "commonMistakes": [
      "Confusing zombie processes (finished, unreaped) with orphan processes (parent terminated first)",
      "Not knowing PID 1 automatically adopts orphaned processes",
      "Forgetting that too many zombies indicate a parent process bug, not a system-wide crash risk"
    ],
    "followUpQuestions": [
      "How would you fix an accumulation of zombie processes?",
      "What process adopts an orphan process and why?",
      "What resources does a zombie process actually consume?"
    ],
    "realWorldExample": "A poorly written server application that forks child processes without calling wait() can accumulate zombie processes over time, eventually exhausting the process table.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish zombie and orphan processes and explain the fix for zombie accumulation.",
    "tags": ["Zombie Process", "Orphan Process", "Operating Systems", "Interview"],
    "relatedTopics": ["Process States", "Process Control Block", "fork()"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-016",
    "category": "Operating Systems",
    "topic": "Banker's Algorithm",
    "difficulty": "Hard",
    "question": "What is the Banker's Algorithm? How does it prevent Deadlock?",
    "shortAnswer": "Banker's Algorithm is a deadlock AVOIDANCE algorithm that only grants a resource request if the system remains in a \"safe state\" afterward — meaning all processes can still eventually complete.",
    "detailedAnswer": "Before granting a resource request, the Banker's Algorithm simulates the allocation and checks if there exists at least one safe sequence in which all processes could complete without deadlocking, assuming each process eventually releases resources after getting its maximum need met.\n\nIf such a sequence exists, the request is granted; otherwise, the process must wait even if resources are currently available. This requires the OS to know each process's maximum future resource need in advance, which is a significant practical limitation that limits real-world usage mostly to controlled or theoretical systems.",
    "keyPoints": [
      "Requires advance knowledge of each process's maximum resource need — impractical for general OS",
      "Safe state: a state where SOME sequence exists letting all processes finish",
      "Named \"Banker's\" because it mirrors how a bank should never lend beyond what it can safely recover"
    ],
    "commonMistakes": [
      "Assuming Banker's Algorithm detects deadlock rather than avoiding it",
      "Not knowing it requires advance knowledge of maximum resource needs",
      "Confusing 'safe state' with 'deadlock-free forever' rather than 'a safe sequence currently exists'"
    ],
    "followUpQuestions": [
      "What is a 'safe state' in the context of the Banker's Algorithm?",
      "Why is the Banker's Algorithm impractical for general-purpose operating systems?",
      "How does this differ from deadlock detection?"
    ],
    "realWorldExample": "The Banker's Algorithm concept is largely theoretical in modern OS but conceptually mirrors resource allocation checks in some embedded or real-time systems with known resource bounds.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the safe-state check mechanism and articulate the practical limitation of requiring advance knowledge of maximum needs.",
    "tags": ["Banker's Algorithm", "Deadlock Avoidance", "Operating Systems", "Interview"],
    "relatedTopics": ["Deadlock", "Resource Allocation Graph", "Safe State"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-017",
    "category": "Operating Systems",
    "topic": "Internal vs External Fragmentation",
    "difficulty": "Medium",
    "question": "What is Fragmentation? Explain Internal vs External Fragmentation.",
    "shortAnswer": "Fragmentation is wasted memory. Internal Fragmentation: wasted space WITHIN an allocated block. External Fragmentation: wasted space BETWEEN allocated blocks (free but unusable).",
    "detailedAnswer": "Internal fragmentation happens when a fixed-size allocation unit, like a page, is larger than what's actually needed; for example, a process needing 4097 bytes gets two 4KB pages, wasting 4095 bytes within the allocated space.\n\nExternal fragmentation happens with variable-size allocation, like segmentation or a naive heap allocator; over time, freed blocks of various sizes scattered throughout memory can't be used for a new large allocation, even though total free memory is sufficient, because no single contiguous block is big enough.",
    "keyPoints": [
      "Internal: fixed-size allocation (paging) — small waste per allocation, predictable",
      "External: variable-size allocation (segmentation, heap) — unpredictable, can grow over time",
      "Compaction: solution for external fragmentation — relocate processes to consolidate free space"
    ],
    "commonMistakes": [
      "Confusing internal fragmentation (paging) with external fragmentation (segmentation/heap)",
      "Not knowing compaction is the solution for external fragmentation",
      "Assuming fixed-size allocation eliminates all fragmentation"
    ],
    "followUpQuestions": [
      "What is compaction and how does it solve external fragmentation?",
      "Why does paging avoid external fragmentation but not internal fragmentation?",
      "Can external fragmentation occur in a paged memory system?"
    ],
    "realWorldExample": "A heap allocator managing many small and large object allocations over time can suffer external fragmentation, where free memory exists but no contiguous block is large enough for a new allocation.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish internal and external fragmentation with concrete examples of when each occurs.",
    "tags": ["Fragmentation", "Memory Management", "Operating Systems", "Interview"],
    "relatedTopics": ["Paging", "Segmentation", "Memory Allocation"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-018",
    "category": "Operating Systems",
    "topic": "Spinlock vs Mutex",
    "difficulty": "Hard",
    "question": "What is the difference between Spinlock and Mutex?",
    "shortAnswer": "Spinlock: thread busy-waits (loops checking the lock) — wastes CPU but avoids context-switch overhead. Mutex: thread is put to sleep and woken later — saves CPU but has context-switch overhead.",
    "detailedAnswer": "A spinlock continuously polls the lock in a tight loop until it becomes available, wasting CPU cycles while waiting but avoiding the overhead of a context switch. Spinlocks are efficient only when the expected wait time is very short, shorter than the cost of a context switch, and are commonly used inside OS kernels for very brief critical sections, especially on multiprocessor systems where the lock holder is actively running on another core.\n\nA mutex, when it can't acquire the lock, puts the calling thread to sleep, removed from the CPU run queue, and wakes it via an OS notification once the lock is released, which is better for longer wait times.",
    "keyPoints": [
      "Spinlock: good for very short critical sections on multiprocessor systems",
      "Mutex: good for longer waits — avoids wasting CPU cycles busy-waiting",
      "Spinlocks are rarely appropriate in user-space application code — mostly a kernel-level tool"
    ],
    "commonMistakes": [
      "Using a spinlock for long critical sections, wasting significant CPU time",
      "Using spinlocks in user-space application code where mutexes are more appropriate",
      "Not knowing spinlocks are most beneficial on multiprocessor systems"
    ],
    "followUpQuestions": [
      "Why are spinlocks mostly used in kernel-level code rather than user-space?",
      "When would a spinlock outperform a mutex?",
      "What happens if a spinlock is used on a single-core system?"
    ],
    "realWorldExample": "The Linux kernel uses spinlocks for very short critical sections, such as updating a small shared data structure, to avoid the overhead of a full context switch.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the busy-wait vs sleep trade-off and identify appropriate use cases for each.",
    "tags": ["Spinlock", "Mutex", "Synchronization", "Interview"],
    "relatedTopics": ["Critical Section", "Context Switching", "Kernel Programming"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-019",
    "category": "Operating Systems",
    "topic": "Demand Paging",
    "difficulty": "Medium",
    "question": "What is Demand Paging? How does it improve memory efficiency?",
    "shortAnswer": "Demand Paging loads a page into memory ONLY when it's actually accessed (referenced), rather than loading the entire process into RAM upfront.",
    "detailedAnswer": "Instead of loading a process's entire memory footprint into RAM at startup, which wastes memory on code or data that may never be used, like error-handling paths, demand paging starts a process with none or very few pages loaded, and pages are brought in from disk one at a time as they're actually referenced, triggering a page fault the first time each page is touched.\n\nThis dramatically improves memory efficiency, since only actively-used pages consume RAM, and reduces startup time, since there's no need to wait for the entire program to load before execution begins. The trade-off is the initial page fault overhead for each newly-touched page.",
    "keyPoints": [
      "Lazy loading of pages — only what's actually used consumes RAM",
      "Faster process startup: doesn't wait to load the entire executable",
      "Pure demand paging: a process starts with ZERO pages loaded, all faulted in on first access"
    ],
    "commonMistakes": [
      "Assuming a process loads all its pages into RAM at startup",
      "Not accounting for the initial page fault overhead for each newly-touched page",
      "Confusing demand paging with prefetching strategies"
    ],
    "followUpQuestions": [
      "What is 'pure' demand paging?",
      "How does demand paging reduce process startup time?",
      "What is the trade-off of demand paging in terms of page fault overhead?"
    ],
    "realWorldExample": "A large application with many rarely-used features, such as an image editor's advanced filters, only loads the code pages for features actually used during a session thanks to demand paging.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the lazy-loading mechanism and articulate the trade-off between startup speed and per-page fault overhead.",
    "tags": ["Demand Paging", "Virtual Memory", "Operating Systems", "Interview"],
    "relatedTopics": ["Virtual Memory", "Page Fault", "Paging"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-020",
    "category": "Operating Systems",
    "topic": "Monolithic Kernel vs Microkernel",
    "difficulty": "Hard",
    "question": "What is the difference between a Monolithic Kernel and a Microkernel?",
    "shortAnswer": "Monolithic Kernel: all OS services (file system, device drivers, networking) run in kernel space as one large program. Microkernel: only essential services run in kernel space; the rest run as user-space processes.",
    "detailedAnswer": "A monolithic kernel, such as Linux or traditional Unix, bundles device drivers, file systems, and networking directly into the kernel, making it fast since everything runs in privileged mode with direct function calls and no message-passing overhead, but a bug in any driver can crash the entire OS since it all shares kernel-space memory.\n\nA microkernel, such as Minix or QNX, keeps the kernel minimal, handling only essential things like basic IPC, scheduling, and memory management, while device drivers and file systems run as separate user-space processes communicating via message passing. This improves stability and security since a crashing driver doesn't take down the whole system, at the cost of performance overhead from message-passing between components.",
    "keyPoints": [
      "Monolithic: faster (direct calls), but a driver bug can crash the entire system",
      "Microkernel: more stable/secure (isolated components), but message-passing adds overhead",
      "Hybrid kernel (Windows NT, macOS XNU): a practical middle ground combining both approaches"
    ],
    "commonMistakes": [
      "Assuming microkernels are always superior due to better stability, ignoring performance overhead",
      "Not knowing hybrid kernels exist as a practical middle ground",
      "Confusing monolithic kernel's speed advantage with inherent instability"
    ],
    "followUpQuestions": [
      "What is a hybrid kernel and how does it combine both approaches?",
      "Why does a microkernel offer better stability despite lower performance?",
      "What real-world operating systems use monolithic vs microkernel designs?"
    ],
    "realWorldExample": "Linux uses a monolithic kernel design for performance, while QNX, used in some embedded and automotive systems, uses a microkernel for reliability.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to weigh performance against stability trade-offs and name real-world examples of each kernel design.",
    "tags": ["Monolithic Kernel", "Microkernel", "Operating Systems", "Interview"],
    "relatedTopics": ["Kernel Architecture", "IPC", "Hybrid Kernel"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-021",
    "category": "Operating Systems",
    "topic": "Race Condition",
    "difficulty": "Medium",
    "question": "What is a Race Condition? Give a practical example.",
    "shortAnswer": "A race condition occurs when the correctness of a program depends on the unpredictable timing/interleaving of concurrent operations on shared data.",
    "detailedAnswer": "Consider two threads both executing balance = balance + 100 on a shared bank account variable. This operation is not atomic; it involves reading the current balance, adding 100, then writing back.\n\nIf both threads read the balance simultaneously, say both read 500, each computes 600 and writes it back, so the final balance is 600 instead of the correct 700, with one +100 update lost. This is a classic race condition, solved by wrapping the read-modify-write sequence in a mutex or lock, ensuring only one thread executes it at a time, or by using atomic operations provided by the hardware or language.",
    "keyPoints": [
      "Root cause: a non-atomic read-modify-write sequence on shared data",
      "Fix: mutex/lock around the critical section, or use hardware-level atomic operations",
      "Hard to debug: race conditions are timing-dependent and may not reproduce consistently"
    ],
    "commonMistakes": [
      "Assuming simple operations like += are atomic by default",
      "Not using a mutex or atomic operation to protect the read-modify-write sequence",
      "Underestimating how difficult race conditions are to reproduce and debug"
    ],
    "followUpQuestions": [
      "Why is balance = balance + 100 not atomic?",
      "How would you fix this race condition using a mutex?",
      "Why are race conditions hard to reproduce and debug?"
    ],
    "realWorldExample": "Two threads simultaneously updating a shared bank account balance without synchronization can lose one of the updates due to a race condition.",
    "codeExample": {
      "language": "Python",
      "code": "import threading\n\nbalance = 500\nlock = threading.Lock()\n\ndef deposit(amount):\n    global balance\n    with lock:\n        balance += amount  # protected from race condition"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the non-atomic read-modify-write root cause and describe mutex-based or atomic operation fixes.",
    "tags": ["Race Condition", "Concurrency", "Operating Systems", "Interview"],
    "relatedTopics": ["Critical Section", "Mutex", "Atomic Operations"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-022",
    "category": "Operating Systems",
    "topic": "Working Set Model",
    "difficulty": "Hard",
    "question": "What is the Working Set Model in memory management?",
    "shortAnswer": "The Working Set Model tracks the set of pages a process has actively referenced within a recent time window — and ensures those pages remain resident in RAM to avoid thrashing.",
    "detailedAnswer": "The Working Set W(t, Δ) is defined as the set of pages referenced by a process in the time interval [t-Δ, t], where Δ is the working set window size. The core idea, based on the Principle of Locality, is that a process's memory access pattern isn't uniformly random; it clusters around a subset of pages at any given time.\n\nThe OS uses this to decide how many frames to allocate to each process: if a process's working set doesn't fit in its allocated frames, it will fault frequently, approaching thrashing, so the OS can then either give it more frames or suspend it entirely if system-wide memory is insufficient for everyone's working sets.",
    "keyPoints": [
      "Based on the Principle of Locality — programs access a clustered subset of memory at any time",
      "Window size Δ: too small misses relevant pages, too large includes stale/unnecessary pages",
      "Directly informs decisions to prevent thrashing at the system level"
    ],
    "commonMistakes": [
      "Not connecting the working set model to the Principle of Locality",
      "Choosing an inappropriate window size Δ that either misses or over-includes pages",
      "Confusing the working set model with a specific page replacement algorithm"
    ],
    "followUpQuestions": [
      "What is the Principle of Locality and why does it matter here?",
      "How does the window size Δ affect the working set model's accuracy?",
      "How does the working set model help prevent thrashing?"
    ],
    "realWorldExample": "An OS monitoring a process's working set may decide to suspend it temporarily if system-wide memory can't accommodate all active processes' working sets simultaneously.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the Principle of Locality connection and how the working set informs frame allocation decisions.",
    "tags": ["Working Set Model", "Memory Management", "Operating Systems", "Interview"],
    "relatedTopics": ["Thrashing", "Principle of Locality", "Page Replacement"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-023",
    "category": "Operating Systems",
    "topic": "Logical vs Physical Address",
    "difficulty": "Medium",
    "question": "What is the difference between Logical Address and Physical Address?",
    "shortAnswer": "Logical (Virtual) Address is generated by the CPU during program execution, referring to a location in the process's virtual address space. Physical Address is the actual location in RAM, after translation by the MMU.",
    "detailedAnswer": "A program never directly accesses physical RAM; it operates entirely in terms of logical addresses within its own isolated virtual address space, unaware of where its data actually resides in physical memory.\n\nThe Memory Management Unit, a hardware component, translates each logical address into a physical address at runtime using the process's page table, where the logical address consists of a page number and offset, and the physical address consists of a frame number and the same offset. This translation layer enables memory protection, so processes can't accidentally or maliciously access each other's memory, and enables virtual memory features like paging and swapping to work transparently.",
    "keyPoints": [
      "Logical address: what the CPU/program \"sees\" — relative to the process's virtual space",
      "Physical address: the actual RAM location, resolved by the MMU via the page table",
      "This indirection enables process isolation, memory protection, and virtual memory"
    ],
    "commonMistakes": [
      "Assuming a program directly accesses physical memory",
      "Not knowing the MMU is the hardware component performing address translation",
      "Confusing the offset component of an address with the page/frame number"
    ],
    "followUpQuestions": [
      "What hardware component performs logical-to-physical address translation?",
      "How does this translation enable memory protection between processes?",
      "What are the components of a logical address (page number and offset)?"
    ],
    "realWorldExample": "Two processes can both use the same logical address, such as 0x1000, but the MMU translates each to a different physical RAM location, keeping them isolated.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the role of the MMU in translation and how this indirection enables process isolation.",
    "tags": ["Logical Address", "Physical Address", "MMU", "Operating Systems", "Interview"],
    "relatedTopics": ["Virtual Memory", "Paging", "Memory Protection"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-024",
    "category": "Operating Systems",
    "topic": "Disk Scheduling",
    "difficulty": "Medium",
    "question": "What is Disk Scheduling? Explain FCFS, SSTF, and SCAN algorithms.",
    "shortAnswer": "Disk Scheduling determines the order in which pending disk I/O requests are serviced, to minimize seek time (physical head movement).",
    "detailedAnswer": "FCFS services requests in arrival order, which is simple and fair but can cause excessive head movement and poor performance if requests are scattered across the disk. SSTF always services the request closest to the current head position, minimizing average seek time but risking starvation for requests far from frequently-accessed regions.\n\nSCAN, also called the Elevator Algorithm, moves the disk head in one direction, servicing all requests along the way, then reverses direction at the end, avoiding starvation while remaining reasonably efficient. C-SCAN is a variant that only services requests in one direction, then jumps back to the start without servicing on the return trip, giving more uniform wait times.",
    "keyPoints": [
      "FCFS: fair but can cause excessive head movement (poor for scattered requests)",
      "SSTF: minimizes seek time but risks starving far-away requests",
      "SCAN/C-SCAN: bounds worst-case wait time, avoids starvation, used in real systems"
    ],
    "commonMistakes": [
      "Assuming SSTF is always the best choice despite its starvation risk",
      "Confusing SCAN with C-SCAN's return-trip behavior",
      "Not knowing FCFS can cause excessive head movement with scattered requests"
    ],
    "followUpQuestions": [
      "Why does SSTF risk starvation for some requests?",
      "How does C-SCAN differ from SCAN?",
      "Which disk scheduling algorithm would you choose for a real-time system and why?"
    ],
    "realWorldExample": "A database server handling many concurrent disk I/O requests uses a SCAN-based algorithm to minimize head movement while avoiding starvation of any single request.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to compare FCFS, SSTF, and SCAN in terms of fairness, efficiency, and starvation risk.",
    "tags": ["Disk Scheduling", "SCAN", "SSTF", "Operating Systems", "Interview"],
    "relatedTopics": ["I/O Management", "Starvation", "SCAN Algorithm"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "os-025",
    "category": "Operating Systems",
    "topic": "Bootloader and Boot Process",
    "difficulty": "Medium",
    "question": "What is the purpose of the Bootloader and the Boot Process?",
    "shortAnswer": "The Bootloader is a small program that runs when a computer powers on, responsible for loading the operating system kernel into memory and transferring control to it.",
    "detailedAnswer": "When a computer powers on, the firmware, either BIOS or UEFI, performs a Power-On Self-Test, then locates and executes the bootloader stored in a designated boot sector or EFI partition for UEFI systems.\n\nThe bootloader's job is to locate the OS kernel image on disk, load it into memory, set up minimal initial conditions like a basic memory map, and then jump execution to the kernel's entry point, at which point the kernel takes over and initializes the rest of the system, including device drivers, file systems, and the init process. GRUB for Linux and Windows Boot Manager are common real-world bootloaders; multi-boot systems let the bootloader present a menu to choose between multiple installed operating systems.",
    "keyPoints": [
      "BIOS/UEFI: firmware that runs first, performs hardware checks, then hands off to the bootloader",
      "Bootloader (GRUB, Windows Boot Manager): loads the OS kernel into memory",
      "After kernel loads: it initializes drivers, mounts the root filesystem, and starts the init/systemd process"
    ],
    "commonMistakes": [
      "Confusing the firmware (BIOS/UEFI) with the bootloader itself",
      "Not knowing the bootloader's role ends once the kernel takes over",
      "Forgetting multi-boot systems rely on the bootloader to present an OS selection menu"
    ],
    "followUpQuestions": [
      "What is the difference between BIOS and UEFI firmware?",
      "What happens immediately after the kernel takes control from the bootloader?",
      "How does a multi-boot system work at the bootloader level?"
    ],
    "realWorldExample": "A dual-boot computer running both Linux and Windows uses GRUB as the bootloader to let the user choose which OS to start at power-on.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to describe the full boot sequence from firmware to bootloader to kernel initialization.",
    "tags": ["Bootloader", "Boot Process", "Operating Systems", "Interview"],
    "relatedTopics": ["BIOS/UEFI", "Kernel Initialization", "GRUB"],
    "references": ["Operating System Concepts - Silberschatz"]
  },
  {
    "id": "cn-001",
    "category": "Computer Networks",
    "topic": "OSI Model",
    "difficulty": "Easy",
    "question": "What are the 7 layers of the OSI Model and their functions?",
    "shortAnswer": "Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    "detailedAnswer": "Layer 7, Application, handles user-facing protocols like HTTP, FTP, and DNS. Layer 6, Presentation, handles data formatting and encryption. Layer 5, Session, manages sessions between applications.\n\nLayer 4, Transport, handles end-to-end delivery and ports via TCP/UDP. Layer 3, Network, handles logical addressing and routing via IP. Layer 2, Data Link, handles framing and MAC addresses via Ethernet. Layer 1, Physical, handles raw bit transmission over cables, fiber, or radio. The practical TCP/IP model collapses this into 4 layers.",
    "keyPoints": [
      "Layer 4 adds port numbers — identifies which application receives the data",
      "Layer 3 adds IP addresses — identifies which host across networks",
      "Layer 2 adds MAC addresses — identifies which device on the local segment"
    ],
    "commonMistakes": [
      "Mixing up the order of layers",
      "Confusing OSI's 7 layers with TCP/IP's 4 layers",
      "Not knowing which protocols belong to which layer"
    ],
    "followUpQuestions": [
      "How does the TCP/IP model map to the OSI model?",
      "Which layer does a router operate at?",
      "What layer does a switch operate at?"
    ],
    "realWorldExample": "When browsing a website, HTTP operates at the Application layer while TCP/IP handles Transport and Network layer delivery.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to name all seven layers in order with a relevant protocol or function example for each.",
    "tags": ["OSI Model", "Networking", "Interview"],
    "relatedTopics": ["TCP/IP Model", "Routing", "Ethernet"],
    "references": ["RFC 1122", "Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-002",
    "category": "Computer Networks",
    "topic": "TCP vs UDP",
    "difficulty": "Medium",
    "question": "What is the difference between TCP and UDP?",
    "shortAnswer": "TCP: connection-oriented, reliable, ordered, slower. UDP: connectionless, unreliable, fast — used for streaming/gaming/DNS.",
    "detailedAnswer": "TCP establishes a connection via a 3-way handshake, guarantees delivery through acknowledgements and retransmission, maintains ordering via sequence numbers, and performs congestion control.\n\nUDP simply sends datagrams with no handshake, acknowledgement, or ordering, leaving the application to handle reliability if needed. UDP is preferred where low latency matters more than guaranteed delivery.",
    "keyPoints": [
      "TCP: 3-way handshake → data transfer → 4-way FIN teardown",
      "UDP: no connection state — cheap to handle millions of \"connections\"",
      "QUIC (HTTP/3): UDP + reliability + multiplexing + fast connection setup"
    ],
    "commonMistakes": [
      "Assuming UDP is always unreliable and unusable for critical apps",
      "Forgetting TCP's overhead comes from handshake and acknowledgements",
      "Not knowing DNS primarily uses UDP"
    ],
    "followUpQuestions": [
      "Why does DNS use UDP instead of TCP?",
      "What is the 3-way handshake process in TCP?",
      "How does QUIC combine benefits of TCP and UDP?"
    ],
    "realWorldExample": "Video calls and online gaming use UDP for low latency, while file downloads use TCP for guaranteed delivery.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the reliability and speed trade-off and map protocols to appropriate real-world use cases.",
    "tags": ["TCP", "UDP", "Networking", "Interview"],
    "relatedTopics": ["3-Way Handshake", "DNS", "QUIC"],
    "references": ["RFC 793", "RFC 768"]
  },
  {
    "id": "cn-003",
    "category": "Computer Networks",
    "topic": "DNS Resolution",
    "difficulty": "Medium",
    "question": "How does DNS resolution work step by step?",
    "shortAnswer": "DNS resolves domain names to IP addresses via a hierarchy: local cache → resolver → root → TLD → authoritative nameserver.",
    "detailedAnswer": "The browser first checks its own cache, then the OS checks the local hosts file, then queries a recursive resolver, typically provided by the ISP or a public service like 8.8.8.8.\n\nThe resolver queries a Root Nameserver for the .com TLD server, then queries that TLD server for the domain's authoritative nameserver, then queries that nameserver for the actual record. The result is cached for the record's TTL and returned. DNS primarily uses UDP port 53.",
    "keyPoints": [
      "A record: hostname → IPv4 | AAAA record: hostname → IPv6",
      "CNAME: alias pointing to another hostname",
      "Low TTL = faster propagation of changes but more repeated DNS queries"
    ],
    "commonMistakes": [
      "Confusing DNS with DHCP",
      "Forgetting recursive resolver's role between client and root servers",
      "Not knowing DNS primarily uses UDP, not TCP"
    ],
    "followUpQuestions": [
      "What is the difference between Recursive and Iterative lookup?",
      "Why does DNS use UDP instead of TCP?",
      "What is a CNAME record used for?"
    ],
    "realWorldExample": "Typing www.example.com in a browser triggers a DNS lookup chain that resolves to the server's IP address before the HTTP request is sent.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects understanding of the DNS resolution hierarchy, caching, recursive lookup, and common DNS record types.",
    "tags": ["DNS", "Networking", "Interview"],
    "relatedTopics": ["HTTP", "TCP/IP", "OSI Model"],
    "references": ["RFC 1034", "RFC 1035"]
  },
  {
    "id": "cn-004",
    "category": "Computer Networks",
    "topic": "TCP Handshake and Termination",
    "difficulty": "Medium",
    "question": "Explain the TCP 3-Way Handshake and 4-Way Termination.",
    "shortAnswer": "Handshake: SYN → SYN-ACK → ACK (opens connection). Termination: FIN → ACK → FIN → ACK (both sides close independently).",
    "detailedAnswer": "The client sends a SYN packet with its Initial Sequence Number; the server responds with SYN-ACK containing its own ISN; the client sends ACK, and the connection is established.\n\nSince TCP is full-duplex, termination requires each direction to close independently via FIN/ACK exchanges. The TIME_WAIT state, lasting roughly 60-120 seconds after termination, ensures delayed packets don't confuse a future connection reusing the same port.",
    "keyPoints": [
      "SYN Flood attack: many SYNs sent, handshake never completed, exhausts server backlog",
      "SYN cookies: mitigate SYN flood by embedding state in the sequence number itself",
      "TIME_WAIT: prevents delayed duplicate packets from corrupting a new connection"
    ],
    "commonMistakes": [
      "Forgetting termination requires 4 steps, not 3",
      "Not knowing what TIME_WAIT state protects against",
      "Confusing handshake sequence numbers with actual data"
    ],
    "followUpQuestions": [
      "What is a SYN flood attack and how is it mitigated?",
      "Why does TCP use a 4-way termination instead of 3-way?",
      "What happens during the TIME_WAIT state?"
    ],
    "realWorldExample": "Every time a browser opens a new HTTPS connection to a server, it first performs a TCP 3-way handshake before any data is exchanged.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to describe the handshake and termination sequences accurately and explain the purpose of TIME_WAIT.",
    "tags": ["TCP", "Handshake", "Networking", "Interview"],
    "relatedTopics": ["UDP", "SYN Flood", "Sequence Numbers"],
    "references": ["RFC 793"]
  },
  {
    "id": "cn-005",
    "category": "Computer Networks",
    "topic": "NAT",
    "difficulty": "Medium",
    "question": "What is NAT? How does it work and what problems does it cause?",
    "shortAnswer": "NAT translates many private IP addresses to one public IP using port numbers.",
    "detailedAnswer": "Private ranges such as 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 aren't routable on the public internet. NAT, typically implemented via Port Address Translation, maps many private IP:port pairs to a single public IP with different ports, maintaining a translation table for both directions.\n\nProblems caused by NAT include breaking true end-to-end connectivity and complicating peer-to-peer connections, requiring workarounds like STUN and TURN, which are used in WebRTC.",
    "keyPoints": [
      "PAT: many-to-one NAT that distinguishes sessions using port numbers",
      "Static NAT: one private IP permanently mapped to one public IP (used for servers)",
      "STUN: lets a client discover its own public IP:port as seen from outside the NAT"
    ],
    "commonMistakes": [
      "Assuming NAT and firewall are the same thing",
      "Not knowing NAT breaks true end-to-end connectivity",
      "Forgetting private IP ranges are non-routable on the internet"
    ],
    "followUpQuestions": [
      "What is the difference between Static NAT and PAT?",
      "How do STUN and TURN help with NAT traversal?",
      "Why does NAT complicate peer-to-peer connections?"
    ],
    "realWorldExample": "A home router uses NAT to let multiple devices share a single public IP address provided by the ISP.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain NAT's translation mechanism and articulate the connectivity issues it introduces.",
    "tags": ["NAT", "Networking", "Interview"],
    "relatedTopics": ["PAT", "STUN", "TURN", "WebRTC"],
    "references": ["RFC 3022"]
  },
  {
    "id": "cn-006",
    "category": "Computer Networks",
    "topic": "HTTPS and TLS",
    "difficulty": "Hard",
    "question": "What is HTTP/HTTPS? How does TLS encryption work?",
    "shortAnswer": "HTTP: plaintext protocol. HTTPS = HTTP + TLS encryption, combining asymmetric key exchange with fast symmetric bulk encryption.",
    "detailedAnswer": "In the TLS 1.3 handshake, the client sends a Client Hello listing supported cipher suites; the server responds with a Server Hello and its certificate, which the client verifies against trusted Certificate Authorities.\n\nAn ECDHE key exchange derives a shared secret without ever transmitting it directly, and both sides compute session keys used for fast AES encryption of all subsequent traffic. TLS 1.3 achieves this handshake in just one round trip.",
    "keyPoints": [
      "Asymmetric crypto (RSA/ECDHE): slow, used only for the initial key exchange",
      "Symmetric crypto (AES): fast, used for encrypting the actual bulk data",
      "HSTS header: forces the browser to always use HTTPS for that domain going forward"
    ],
    "commonMistakes": [
      "Assuming TLS uses only asymmetric encryption for all data",
      "Confusing certificate verification with encryption itself",
      "Not knowing TLS 1.3 reduced handshake to 1-RTT"
    ],
    "followUpQuestions": [
      "What is the difference between symmetric and asymmetric encryption?",
      "How does a browser verify a certificate is trustworthy?",
      "What does HSTS protect against?"
    ],
    "realWorldExample": "When visiting a banking website, the padlock icon indicates a completed TLS handshake securing all data exchanged with the server.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the handshake sequence and distinguish asymmetric key exchange from symmetric bulk encryption.",
    "tags": ["HTTPS", "TLS", "Encryption", "Interview"],
    "relatedTopics": ["HTTP", "Certificates", "HSTS"],
    "references": ["RFC 8446"]
  },
  {
    "id": "cn-007",
    "category": "Computer Networks",
    "topic": "Router vs Switch vs Hub",
    "difficulty": "Easy",
    "question": "What is the difference between a Router, Switch, and Hub?",
    "shortAnswer": "Hub: broadcasts to all ports (Layer 1). Switch: forwards to a specific MAC address (Layer 2). Router: routes between networks using IP (Layer 3).",
    "detailedAnswer": "A hub blindly repeats signals to every connected port, is obsolete, and creates a single collision domain. A switch learns which MAC address lives on which port and forwards frames only to the correct destination port, eliminating collisions and giving each port its own collision domain.\n\nA router connects entirely different IP subnets, using routing tables to forward packets toward their destination, and typically also performs NAT, DHCP, and firewall functions in consumer devices.",
    "keyPoints": [
      "Switch: builds and maintains a MAC address table (CAM table)",
      "Router: acts as the default gateway for devices on the local network",
      "ARP: maps an IP address to a MAC address on the local network segment"
    ],
    "commonMistakes": [
      "Confusing switch (Layer 2) with router (Layer 3) functions",
      "Assuming hubs are still commonly used in modern networks",
      "Not knowing ARP resolves IP to MAC addresses"
    ],
    "followUpQuestions": [
      "What is ARP and how does it work?",
      "Why do switches reduce collisions compared to hubs?",
      "What functions does a home router typically combine?"
    ],
    "realWorldExample": "A home Wi-Fi router combines routing, NAT, DHCP, and often switch functionality in a single consumer device.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to map each device to its correct OSI layer and describe its forwarding behavior.",
    "tags": ["Router", "Switch", "Hub", "Networking", "Interview"],
    "relatedTopics": ["OSI Model", "ARP", "NAT"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-008",
    "category": "Computer Networks",
    "topic": "DHCP",
    "difficulty": "Medium",
    "question": "What is DHCP? How does it work?",
    "shortAnswer": "DHCP automatically assigns IP addresses to devices on a network via the DORA process — Discover, Offer, Request, Acknowledge.",
    "detailedAnswer": "A new device broadcasts a DHCPDISCOVER message; the DHCP server responds with a DHCPOFFER containing an available IP address; the client broadcasts a DHCPREQUEST accepting that offer; the server confirms with a DHCPACK, finalizing the lease for a set duration such as 24 hours.\n\nThe client must renew the lease before it expires or risk losing the address. DHCP also delivers other configuration details, such as default gateway, subnet mask, and DNS server addresses.",
    "keyPoints": [
      "DORA: Discover → Offer → Request → Acknowledge",
      "DHCP lease: a temporary IP assignment that must be renewed before expiry",
      "APIPA (169.254.x.x): self-assigned address used when no DHCP server responds"
    ],
    "commonMistakes": [
      "Confusing DHCP with DNS",
      "Not knowing the full DORA sequence",
      "Forgetting DHCP also configures gateway, subnet mask, and DNS servers"
    ],
    "followUpQuestions": [
      "What happens if a DHCP lease expires without renewal?",
      "What is APIPA and when does it get used?",
      "What other configuration besides an IP address does DHCP provide?"
    ],
    "realWorldExample": "When a laptop connects to a new Wi-Fi network, DHCP automatically assigns it an IP address without manual configuration.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to walk through the DORA process accurately and know what configuration DHCP provides beyond the IP address.",
    "tags": ["DHCP", "Networking", "Interview"],
    "relatedTopics": ["IP Addressing", "DNS", "Subnetting"],
    "references": ["RFC 2131"]
  },
  {
    "id": "cn-009",
    "category": "Computer Networks",
    "topic": "IPv4 vs IPv6",
    "difficulty": "Medium",
    "question": "What is the difference between IPv4 and IPv6?",
    "shortAnswer": "IPv4: 32-bit addresses (~4.3 billion total), dotted-decimal notation. IPv6: 128-bit addresses (virtually unlimited), hexadecimal notation — designed to solve IPv4 address exhaustion.",
    "detailedAnswer": "IPv4 addresses, such as 192.168.1.1, are running out globally, which is why NAT became widespread as a workaround. IPv6 addresses, such as 2001:0db8::1, use 128 bits, providing an astronomically larger address space, enough for every device on Earth to have multiple globally unique addresses without needing NAT.\n\nIPv6 also simplifies header processing with a fixed header size and no built-in fragmentation at routers, has built-in support for auto-configuration via SLAAC, and mandates IPsec support, though adoption has been slow due to IPv4's entrenched infrastructure.",
    "keyPoints": [
      "IPv4: 32-bit, ~4.3 billion addresses, requires NAT due to scarcity",
      "IPv6: 128-bit, virtually unlimited addresses, no NAT typically needed",
      "Dual-stack: many networks run both IPv4 and IPv6 simultaneously during the transition"
    ],
    "commonMistakes": [
      "Assuming IPv6 adoption is complete when many networks still rely on IPv4/NAT",
      "Not knowing IPv6 has built-in auto-configuration via SLAAC",
      "Confusing IPv6's simplified header with IPv4's fragmentation-heavy design"
    ],
    "followUpQuestions": [
      "Why has IPv6 adoption been slow despite solving address exhaustion?",
      "What is SLAAC and how does it work?",
      "What is dual-stack networking?"
    ],
    "realWorldExample": "Most home ISPs still primarily assign IPv4 addresses behind NAT, while major cloud providers and mobile carriers increasingly support native IPv6.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the address exhaustion problem IPv6 solves and describe key structural differences from IPv4.",
    "tags": ["IPv4", "IPv6", "Networking", "Interview"],
    "relatedTopics": ["NAT", "Subnetting", "SLAAC"],
    "references": ["RFC 791", "RFC 8200"]
  },
  {
    "id": "cn-010",
    "category": "Computer Networks",
    "topic": "Subnetting",
    "difficulty": "Medium",
    "question": "What is a Subnet Mask? Explain Subnetting.",
    "shortAnswer": "A subnet mask divides an IP address into a network portion and a host portion, determining which devices belong to the same local network.",
    "detailedAnswer": "An IP address like 192.168.1.10 combined with a subnet mask like 255.255.255.0, or /24 in CIDR notation, tells the system that the first 24 bits identify the network and the remaining 8 bits identify the specific host on that network.\n\nSubnetting divides a larger network into smaller sub-networks, useful for organizing departments, limiting broadcast domain size, and improving security by isolating traffic. CIDR notation replaced the older rigid Class A/B/C system, allowing flexible-size network allocations.",
    "keyPoints": [
      "/24 = 255.255.255.0 = 256 addresses (254 usable after network/broadcast reserved)",
      "CIDR notation: /x indicates how many leading bits define the network portion",
      "Subnetting reduces broadcast domain size and improves network organization/security"
    ],
    "commonMistakes": [
      "Forgetting to reserve the network and broadcast addresses when counting usable hosts",
      "Confusing CIDR notation with the older Class A/B/C system",
      "Miscalculating subnet ranges when subnetting a larger network"
    ],
    "followUpQuestions": [
      "How would you calculate the number of usable hosts in a /26 subnet?",
      "Why did CIDR replace the older Class A/B/C addressing system?",
      "How does subnetting improve network security?"
    ],
    "realWorldExample": "A company divides its office network into separate subnets for different departments to limit broadcast traffic and isolate sensitive systems.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the network/host split and correctly compute subnet sizes using CIDR notation.",
    "tags": ["Subnetting", "CIDR", "Networking", "Interview"],
    "relatedTopics": ["IPv4", "Subnet Mask", "Routing"],
    "references": ["RFC 4632"]
  },
  {
    "id": "cn-011",
    "category": "Computer Networks",
    "topic": "ARP",
    "difficulty": "Medium",
    "question": "What is ARP (Address Resolution Protocol)?",
    "shortAnswer": "ARP maps an IP address to a MAC address on the local network, enabling devices to communicate at the Data Link layer.",
    "detailedAnswer": "When a device wants to send data to another device on the same local network, it knows the destination's IP address but needs the corresponding MAC address to construct the Ethernet frame. The device broadcasts an ARP Request asking who has a given IP address, and the device owning that IP responds with an ARP Reply containing its MAC address.\n\nThis mapping is cached temporarily in the ARP table to avoid repeating the broadcast for every packet. ARP Spoofing is a common attack where a malicious device sends fake ARP replies to intercept traffic meant for another host, enabling a man-in-the-middle attack.",
    "keyPoints": [
      "ARP Request: broadcast to the entire local network asking \"who has this IP?\"",
      "ARP Reply: unicast response containing the requested device's MAC address",
      "ARP Spoofing: attacker sends forged replies to redirect traffic — a common MITM technique"
    ],
    "commonMistakes": [
      "Assuming ARP works across different network segments",
      "Not knowing ARP responses are cached temporarily",
      "Underestimating ARP spoofing as a MITM attack vector"
    ],
    "followUpQuestions": [
      "How does ARP spoofing enable a man-in-the-middle attack?",
      "Why is the ARP table cached temporarily rather than permanently?",
      "What defenses exist against ARP spoofing?"
    ],
    "realWorldExample": "When a laptop sends its first packet to a printer on the same LAN, it first sends an ARP request to learn the printer's MAC address.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the ARP request/reply cycle and describe ARP spoofing as a security concern.",
    "tags": ["ARP", "Networking", "Interview"],
    "relatedTopics": ["MAC Address", "Man-in-the-Middle", "Local Network"],
    "references": ["RFC 826"]
  },
  {
    "id": "cn-012",
    "category": "Computer Networks",
    "topic": "Unicast vs Multicast vs Broadcast",
    "difficulty": "Medium",
    "question": "What is the difference between Unicast, Multicast, and Broadcast?",
    "shortAnswer": "Unicast: one sender to one specific receiver. Multicast: one sender to a specific group of interested receivers. Broadcast: one sender to ALL devices on the network.",
    "detailedAnswer": "Unicast is the standard one-to-one communication used for most web browsing and typical application traffic, making it the most efficient option for single-recipient scenarios.\n\nMulticast delivers data to a specific subscribed group of receivers simultaneously, such as IPTV streaming or video conferencing, and is more efficient than sending N separate unicast streams since the network only duplicates data at branch points. Broadcast sends to every device on the local network, such as ARP requests or DHCP discovery, and is necessary for certain protocols but wasteful if overused since every device must process the packet.",
    "keyPoints": [
      "Unicast: standard 1-to-1 communication (most web traffic)",
      "Multicast: 1-to-many, only to devices that explicitly subscribed to the group",
      "Broadcast: 1-to-all on the local network segment — used sparingly (ARP, DHCP)"
    ],
    "commonMistakes": [
      "Confusing multicast (subscribed group) with broadcast (everyone)",
      "Overusing broadcast traffic, wasting bandwidth and processing on unrelated devices",
      "Not knowing multicast requires explicit subscription"
    ],
    "followUpQuestions": [
      "How is multicast more efficient than sending multiple unicast streams?",
      "Why do routers separate broadcast domains?",
      "What protocols commonly rely on broadcast?"
    ],
    "realWorldExample": "A live video conference uses multicast-like distribution to efficiently send the same stream to multiple subscribed participants.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the three delivery modes with appropriate real-world use cases.",
    "tags": ["Unicast", "Multicast", "Broadcast", "Networking", "Interview"],
    "relatedTopics": ["IP Addressing", "Broadcast Domain", "Routing"],
    "references": ["RFC 1112"]
  },
  {
    "id": "cn-013",
    "category": "Computer Networks",
    "topic": "VPN",
    "difficulty": "Medium",
    "question": "What is a VPN (Virtual Private Network)? How does it work?",
    "shortAnswer": "A VPN creates an encrypted tunnel between a device and a remote server, making traffic appear to originate from the VPN server and protecting it from interception on untrusted networks.",
    "detailedAnswer": "When connected to a VPN, all or selected network traffic from the device is encrypted and encapsulated, then sent to a VPN server, which decrypts it and forwards it to the actual destination on the device's behalf — the destination sees the VPN server's IP, not the original device's IP.\n\nThis provides privacy, since a local network snooper only sees encrypted traffic to the VPN server, security on untrusted networks like public WiFi, and the ability to access geo-restricted content or a private corporate network remotely. Common protocols include OpenVPN, WireGuard, which is newer and faster, and IPsec.",
    "keyPoints": [
      "Encrypts traffic between device and VPN server, hiding content from local network observers",
      "Masks the original IP address — destination sees the VPN server's IP instead",
      "WireGuard: modern protocol, simpler codebase, generally faster than older OpenVPN/IPsec"
    ],
    "commonMistakes": [
      "Assuming a VPN provides complete anonymity rather than just IP masking and encryption",
      "Not knowing the destination sees the VPN server's IP, not the original device's",
      "Confusing VPN encryption with end-to-end encryption to the final destination"
    ],
    "followUpQuestions": [
      "How does WireGuard differ from older VPN protocols like OpenVPN?",
      "Does a VPN protect traffic between the VPN server and the final destination?",
      "Why would a company use a VPN for remote employee access?"
    ],
    "realWorldExample": "A remote employee uses a corporate VPN to securely access internal company resources as if they were physically on the office network.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the tunneling and IP-masking mechanism and identify appropriate real-world VPN use cases.",
    "tags": ["VPN", "Networking", "Security", "Interview"],
    "relatedTopics": ["Encryption", "TLS", "WireGuard"],
    "references": ["RFC 4301"]
  },
  {
    "id": "cn-014",
    "category": "Computer Networks",
    "topic": "Bandwidth vs Latency vs Throughput",
    "difficulty": "Medium",
    "question": "What is Bandwidth vs Latency vs Throughput?",
    "shortAnswer": "Bandwidth: maximum theoretical data rate a connection can support. Latency: time delay for a packet to travel from source to destination. Throughput: actual achieved data rate in practice.",
    "detailedAnswer": "Bandwidth is the theoretical maximum capacity of a link, measured in bits per second, such as a '100 Mbps connection'. Latency is the time delay before data begins to arrive, often measured via round-trip time using ping; high latency makes a connection feel laggy even with high bandwidth, which is common with satellite internet.\n\nThroughput is what is actually achieved in real-world usage, which is always less than or equal to bandwidth due to overhead, congestion, packet loss, and protocol inefficiencies. A common analogy: bandwidth is the width of a pipe, latency is how long it takes water to first reach the end, and throughput is how much water actually flows through per second in practice.",
    "keyPoints": [
      "High bandwidth + high latency: large capacity but slow to start (e.g., satellite internet)",
      "Low latency matters most for real-time applications (gaming, video calls)",
      "Throughput is always constrained by the weakest link in the entire network path"
    ],
    "commonMistakes": [
      "Confusing bandwidth (theoretical max) with throughput (actual achieved rate)",
      "Assuming high bandwidth automatically means low latency",
      "Not knowing throughput is bounded by the weakest link in the network path"
    ],
    "followUpQuestions": [
      "Why can a high-bandwidth connection still feel slow?",
      "What factors cause throughput to be lower than bandwidth?",
      "Why is low latency more critical than high bandwidth for gaming?"
    ],
    "realWorldExample": "Satellite internet often has high bandwidth but high latency due to the long physical distance signals must travel, making it feel slow for real-time applications despite fast download speeds.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish these three related but distinct networking metrics with a practical analogy or example.",
    "tags": ["Bandwidth", "Latency", "Throughput", "Networking", "Interview"],
    "relatedTopics": ["Network Congestion", "QoS", "TCP"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-015",
    "category": "Computer Networks",
    "topic": "TCP Congestion Control",
    "difficulty": "Hard",
    "question": "What is Network Congestion? How does TCP Congestion Control work?",
    "shortAnswer": "Network Congestion occurs when too much data is sent through a network path, exceeding its capacity and causing packet loss/delay. TCP handles this via algorithms like Slow Start and Congestion Avoidance.",
    "detailedAnswer": "TCP starts a new connection conservatively with Slow Start, where the congestion window begins small and doubles with each successful round trip until it reaches a threshold or packet loss is detected as a strong congestion signal.\n\nOnce past the threshold, TCP switches to Congestion Avoidance, growing the window more slowly, linearly by one per round trip, to probe for available bandwidth without overwhelming the network. On packet loss, TCP drastically reduces its window through multiplicative decrease and restarts the process. This overall pattern is called AIMD, Additive Increase Multiplicative Decrease, producing the characteristic sawtooth throughput graph.",
    "keyPoints": [
      "Slow Start: congestion window doubles each RTT until a threshold or loss occurs",
      "Congestion Avoidance: window grows linearly (+1 per RTT) after the threshold",
      "AIMD (Additive Increase, Multiplicative Decrease): the core fairness-promoting congestion control strategy"
    ],
    "commonMistakes": [
      "Confusing Slow Start's exponential growth with Congestion Avoidance's linear growth",
      "Not knowing packet loss triggers a multiplicative decrease in the window size",
      "Assuming TCP maintains a constant, unchanging congestion window"
    ],
    "followUpQuestions": [
      "Why does TCP use exponential growth in Slow Start but linear growth in Congestion Avoidance?",
      "What triggers the transition from Slow Start to Congestion Avoidance?",
      "Why is AIMD considered fair among competing TCP connections?"
    ],
    "realWorldExample": "During a video call over a congested network, TCP-based file transfers on the same connection automatically slow down due to congestion control, indirectly helping preserve bandwidth for real-time traffic.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain Slow Start, Congestion Avoidance, and the AIMD pattern with the resulting sawtooth behavior.",
    "tags": ["TCP", "Congestion Control", "Networking", "Interview"],
    "relatedTopics": ["TCP", "AIMD", "Network Congestion"],
    "references": ["RFC 5681"]
  },
  {
    "id": "cn-016",
    "category": "Computer Networks",
    "topic": "Firewall vs Proxy Server",
    "difficulty": "Medium",
    "question": "What is the difference between a Firewall and a Proxy Server?",
    "shortAnswer": "A Firewall filters traffic based on rules (IP, port, protocol) to block/allow connections. A Proxy Server acts as an intermediary, forwarding requests on behalf of a client (or protecting a server from direct exposure).",
    "detailedAnswer": "A firewall inspects incoming and outgoing packets against a defined rule set, such as allowing port 443 or blocking port 23, and simply permits or denies traffic without modifying or forwarding the actual content.\n\nA Forward Proxy sits in front of clients, forwarding their requests to external servers, used for content filtering, caching, or hiding the client's real IP from the destination. A Reverse Proxy sits in front of servers, receiving client requests and forwarding them to the appropriate backend server, used for load balancing, SSL termination, and hiding backend server details — Nginx and Cloudflare commonly serve this role.",
    "keyPoints": [
      "Firewall: allow/deny decision based on rules — doesn't route or modify traffic itself",
      "Forward Proxy: represents the CLIENT (hides the client's identity from the destination)",
      "Reverse Proxy: represents the SERVER (hides backend details, does load balancing/SSL termination)"
    ],
    "commonMistakes": [
      "Confusing forward proxy (represents client) with reverse proxy (represents server)",
      "Assuming a firewall forwards or modifies traffic like a proxy does",
      "Not knowing reverse proxies are commonly used for load balancing and SSL termination"
    ],
    "followUpQuestions": [
      "What is the difference between a forward proxy and a reverse proxy?",
      "How does a reverse proxy assist with SSL termination?",
      "Can a firewall and proxy server be used together?"
    ],
    "realWorldExample": "Nginx is commonly deployed as a reverse proxy in front of backend application servers to handle load balancing and SSL termination.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish firewalls from proxies and further distinguish forward proxies from reverse proxies.",
    "tags": ["Firewall", "Proxy Server", "Networking", "Interview"],
    "relatedTopics": ["Load Balancing", "SSL Termination", "Network Security"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-017",
    "category": "Computer Networks",
    "topic": "Collision Domain vs Broadcast Domain",
    "difficulty": "Medium",
    "question": "What is a Collision Domain vs a Broadcast Domain?",
    "shortAnswer": "Collision Domain: a network segment where data packets can collide with one another (relevant to hubs/shared media). Broadcast Domain: a network segment where a broadcast frame reaches every device.",
    "detailedAnswer": "A collision domain is a segment of network where multiple devices share the same transmission medium, risking simultaneous transmissions colliding and corrupting data — hubs create one large collision domain across all connected ports, while switches give each port its own collision domain, essentially eliminating collisions in modern switched networks.\n\nA broadcast domain is a larger logical boundary encompassing all devices that receive a broadcast frame sent by any device within that domain. Switches do not separate broadcast domains, since a broadcast still reaches every device on the switch, but routers do separate broadcast domains, since a broadcast doesn't cross into a different subnet without special configuration.",
    "keyPoints": [
      "Hub: one collision domain across all ports (obsolete technology)",
      "Switch: one collision domain PER port, but still one broadcast domain overall",
      "Router: separates broadcast domains — broadcasts don't cross into a different subnet"
    ],
    "commonMistakes": [
      "Assuming switches separate broadcast domains (they don't, only routers do)",
      "Confusing collision domain scope with broadcast domain scope",
      "Not knowing modern switches essentially eliminate collisions per port"
    ],
    "followUpQuestions": [
      "Why don't switches separate broadcast domains?",
      "How does VLAN configuration relate to broadcast domains?",
      "Why are collisions largely a non-issue in modern switched networks?"
    ],
    "realWorldExample": "A company uses VLANs on switches to logically separate broadcast domains for different departments without needing separate physical routers for each.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to correctly identify that switches separate collision domains but not broadcast domains, while routers separate both.",
    "tags": ["Collision Domain", "Broadcast Domain", "Networking", "Interview"],
    "relatedTopics": ["Switch", "Router", "VLAN"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-018",
    "category": "Computer Networks",
    "topic": "Port Forwarding",
    "difficulty": "Medium",
    "question": "What is Port Forwarding? Give a practical use case.",
    "shortAnswer": "Port Forwarding configures a router/NAT device to redirect incoming traffic on a specific external port to a specific internal device and port, enabling external access to a service running behind NAT.",
    "detailedAnswer": "Since NAT hides all internal devices behind a single public IP, external connections normally cannot reach any specific internal device directly. Port forwarding creates an explicit rule stating that incoming traffic on a specific public port should be forwarded to a specific internal device and port.\n\nThis is commonly used to host a personal web server, a game server, or a home security camera system that needs to be accessible from outside the local network, without requiring a full VPN setup or a public IP for every device.",
    "keyPoints": [
      "Solves the NAT problem of external devices being unable to initiate connections inward",
      "Common use: hosting a Minecraft server, home security camera access, self-hosted web app",
      "Security risk: forwarding a port exposes that specific service directly to the internet"
    ],
    "commonMistakes": [
      "Forwarding ports without considering the security exposure it creates",
      "Not understanding port forwarding is necessary because NAT hides internal devices",
      "Confusing port forwarding with a VPN as an equivalent remote access solution"
    ],
    "followUpQuestions": [
      "What security risks does port forwarding introduce?",
      "How does port forwarding solve the problem that NAT creates?",
      "How does port forwarding differ from setting up a VPN for remote access?"
    ],
    "realWorldExample": "A user hosting a personal Minecraft server configures port forwarding on their home router to let friends connect from outside the local network.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain why port forwarding is needed under NAT and describe a practical use case along with its security trade-off.",
    "tags": ["Port Forwarding", "NAT", "Networking", "Interview"],
    "relatedTopics": ["NAT", "Firewall", "Home Networking"],
    "references": ["RFC 3022"]
  },
  {
    "id": "cn-019",
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3",
    "difficulty": "Hard",
    "question": "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?",
    "shortAnswer": "HTTP/1.1: text-based, one request per connection at a time (head-of-line blocking). HTTP/2: binary, multiplexed over a single TCP connection. HTTP/3: runs over QUIC/UDP instead of TCP, eliminating TCP-level head-of-line blocking.",
    "detailedAnswer": "HTTP/1.1 sends requests as plain text and, without pipelining tricks, effectively processes one request per connection at a time, so browsers work around this by opening multiple parallel TCP connections, typically 6 per domain, which is inefficient.\n\nHTTP/2 introduces binary framing and multiplexing, allowing multiple requests and responses to be interleaved over a single TCP connection simultaneously, along with header compression via HPACK and server push. However, since it still runs over TCP, a single lost packet blocks all multiplexed streams until retransmission, known as TCP-level head-of-line blocking. HTTP/3 solves this by running over QUIC, built on UDP, instead of TCP, so each stream is independent at the transport level and a lost packet only affects its own stream.",
    "keyPoints": [
      "HTTP/1.1: text-based, needs multiple parallel TCP connections to be efficient",
      "HTTP/2: binary, multiplexed over one TCP connection, but still has TCP-level HOL blocking",
      "HTTP/3: QUIC/UDP-based, eliminates TCP-level head-of-line blocking, faster connection setup"
    ],
    "commonMistakes": [
      "Assuming HTTP/2's multiplexing fully solves head-of-line blocking (TCP-level blocking remains)",
      "Not knowing HTTP/3 runs over UDP via QUIC instead of TCP",
      "Confusing HTTP/2's binary framing with HTTP/3's transport-level changes"
    ],
    "followUpQuestions": [
      "What is TCP-level head-of-line blocking and why does HTTP/2 still suffer from it?",
      "How does QUIC eliminate head-of-line blocking in HTTP/3?",
      "What is HPACK and how does it improve HTTP/2 performance?"
    ],
    "realWorldExample": "Major websites like Google and Facebook use HTTP/3 over QUIC to improve page load performance, especially on unreliable mobile networks.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the progressive improvements across versions and specifically why HTTP/3 eliminates TCP-level head-of-line blocking.",
    "tags": ["HTTP/1.1", "HTTP/2", "HTTP/3", "QUIC", "Networking", "Interview"],
    "relatedTopics": ["TCP", "QUIC", "HTTP"],
    "references": ["RFC 9114", "RFC 7540"]
  },
  {
    "id": "cn-020",
    "category": "Computer Networks",
    "topic": "MAC Address vs IP Address",
    "difficulty": "Easy",
    "question": "What is a MAC Address? How is it different from an IP Address?",
    "shortAnswer": "MAC Address: a physical, hardware-burned 48-bit address identifying a network interface at Layer 2. IP Address: a logical address identifying a device's location at Layer 3, which can change.",
    "detailedAnswer": "A MAC address is permanently burned into a network interface card by the manufacturer, though it can be spoofed in software, uniquely identifying that specific hardware device on a local network segment. It doesn't change when a device moves to a different network.\n\nAn IP address is a logical address assigned based on the network a device is currently connected to, changing as a device moves between networks, and is used for routing data across the internet between different networks, whereas MAC addresses only matter for delivery within a single local network segment.",
    "keyPoints": [
      "MAC address: physical/hardware, 48-bit (e.g., 00:1A:2B:3C:4D:5E), doesn't change with network",
      "IP address: logical, changes based on network location, used for internet-wide routing",
      "Data delivery uses BOTH: IP address gets you to the right network, MAC gets you to the right device on it"
    ],
    "commonMistakes": [
      "Assuming MAC addresses change when a device moves to a new network",
      "Confusing the roles of MAC (local delivery) and IP (internet-wide routing)",
      "Not knowing MAC addresses can be spoofed despite being hardware-burned"
    ],
    "followUpQuestions": [
      "Why does data delivery require both an IP address and a MAC address?",
      "Can a MAC address be changed or spoofed?",
      "How does ARP connect IP addresses to MAC addresses?"
    ],
    "realWorldExample": "When a laptop connects to different Wi-Fi networks throughout the day, its IP address changes each time, but its MAC address remains the same.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish physical hardware addressing from logical network addressing and explain why both are needed.",
    "tags": ["MAC Address", "IP Address", "Networking", "Interview"],
    "relatedTopics": ["ARP", "OSI Model", "Subnetting"],
    "references": ["IEEE 802.3"]
  },
  {
    "id": "cn-021",
    "category": "Computer Networks",
    "topic": "Proxy ARP",
    "difficulty": "Hard",
    "question": "What is a Proxy ARP and how does it relate to network segmentation?",
    "shortAnswer": "Proxy ARP allows a router to answer ARP requests on behalf of devices on a different network segment, making it appear as though those remote devices are on the same local network.",
    "detailedAnswer": "Normally, ARP requests only work within a single local network segment, so a device cannot get an ARP response for an IP address on a different subnet. Proxy ARP configures a router to intercept ARP requests for IP addresses on another connected network and respond with its own MAC address, effectively acting as a relay.\n\nDevices on one segment believe they're talking directly to a device on another segment, when actually all traffic is routed through the proxy-ARP-enabled router. This is a legacy technique, mostly superseded by proper subnetting and routing configuration, but still occasionally used for specific network migration or compatibility scenarios.",
    "keyPoints": [
      "Router answers ARP requests on behalf of devices on a different subnet",
      "Makes remote devices appear to be on the same local segment (illusion of flat network)",
      "Largely a legacy technique — proper routing/subnetting is now the standard approach"
    ],
    "commonMistakes": [
      "Assuming Proxy ARP is a modern, commonly used technique rather than a legacy one",
      "Not understanding that Proxy ARP creates an illusion of a flat network across subnets",
      "Confusing Proxy ARP with standard ARP behavior within a single subnet"
    ],
    "followUpQuestions": [
      "Why has Proxy ARP largely been replaced by proper routing configuration?",
      "In what migration scenarios might Proxy ARP still be used today?",
      "How does Proxy ARP create the illusion of a flat network?"
    ],
    "realWorldExample": "During a legacy network migration, Proxy ARP might be temporarily used to let devices on an old subnet communicate with devices on a newly separated subnet without immediate reconfiguration.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain how Proxy ARP relays ARP requests across subnets and recognize it as a largely legacy technique.",
    "tags": ["Proxy ARP", "ARP", "Networking", "Interview"],
    "relatedTopics": ["ARP", "Subnetting", "Routing"],
    "references": ["RFC 1027"]
  },
  {
    "id": "cn-022",
    "category": "Computer Networks",
    "topic": "Circuit Switching vs Packet Switching",
    "difficulty": "Medium",
    "question": "What is the difference between Circuit Switching and Packet Switching?",
    "shortAnswer": "Circuit Switching: a dedicated communication path is reserved for the entire duration of a call (traditional telephone networks). Packet Switching: data is broken into packets, each routed independently, sharing network resources dynamically (used by the internet).",
    "detailedAnswer": "Circuit switching reserves a fixed, dedicated path between sender and receiver for the entire session, as in classic landline phone calls, guaranteeing consistent bandwidth and latency once established, but wasting capacity during silent or idle periods since the reserved circuit sits unused, and setup takes time before communication can even begin.\n\nPacket switching breaks data into discrete packets, each independently routed through the network, potentially via different paths, and reassembled at the destination. This is a much more efficient use of shared network capacity since resources are only consumed when actual data is being sent, but it introduces variable latency, or jitter, since packets can take different paths and arrive out of order.",
    "keyPoints": [
      "Circuit switching: dedicated path, consistent quality, wastes capacity during idle periods",
      "Packet switching: shared/dynamic paths, efficient resource use, variable latency (jitter)",
      "The internet is fundamentally packet-switched; traditional telephone networks were circuit-switched"
    ],
    "commonMistakes": [
      "Confusing circuit switching's dedicated path with packet switching's shared resources",
      "Not knowing packet switching can introduce jitter due to variable packet paths",
      "Assuming modern telephone networks are still purely circuit-switched"
    ],
    "followUpQuestions": [
      "Why does circuit switching waste capacity during idle periods?",
      "What causes jitter in packet-switched networks?",
      "Why is the internet designed as a packet-switched network rather than circuit-switched?"
    ],
    "realWorldExample": "Traditional landline phone calls used circuit switching with a dedicated line, while modern VoIP calls use packet switching, sending voice data as packets over the internet.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the resource allocation difference and trade-offs between consistent quality and efficient resource use.",
    "tags": ["Circuit Switching", "Packet Switching", "Networking", "Interview"],
    "relatedTopics": ["TCP/IP", "Jitter", "Network Architecture"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "cn-023",
    "category": "Computer Networks",
    "topic": "Man-in-the-Middle Attack",
    "difficulty": "Hard",
    "question": "What is a Man-in-the-Middle (MITM) Attack? How is it prevented?",
    "shortAnswer": "A MITM attack occurs when an attacker secretly intercepts and potentially alters communication between two parties who believe they're communicating directly with each other.",
    "detailedAnswer": "An attacker positions themselves between the victim and the intended destination, for example via ARP spoofing on a local network, a malicious WiFi hotspot, or DNS spoofing, intercepting traffic in transit. They can passively eavesdrop on unencrypted data or actively modify it before forwarding it along.\n\nPrevention primarily relies on strong end-to-end encryption: TLS/HTTPS ensures that even if an attacker intercepts traffic, they cannot read or modify it without detection, since certificate validation would fail if they tried to substitute their own fake certificate. Additional protections include HSTS, which forces HTTPS and prevents downgrade attacks, certificate pinning, where mobile apps verify the exact expected certificate, and VPNs on untrusted networks.",
    "keyPoints": [
      "Common vectors: ARP spoofing, rogue WiFi hotspots, DNS spoofing",
      "TLS/HTTPS: the primary defense — encryption + certificate validation detects tampering",
      "Certificate pinning: app hardcodes the expected certificate, rejecting even valid-but-unexpected certs"
    ],
    "commonMistakes": [
      "Assuming HTTPS alone is sufficient without considering certificate validation failures",
      "Not knowing certificate pinning provides stronger protection than standard CA trust",
      "Underestimating public WiFi as a common MITM attack vector"
    ],
    "followUpQuestions": [
      "How does TLS certificate validation detect a MITM attempt?",
      "What is certificate pinning and why is it stronger than standard TLS validation?",
      "How does ARP spoofing enable a MITM attack on a local network?"
    ],
    "realWorldExample": "An attacker sets up a rogue WiFi hotspot at a coffee shop to intercept unencrypted traffic from unsuspecting users connecting to it.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to identify common MITM attack vectors and explain how TLS/HTTPS with certificate validation defends against them.",
    "tags": ["Man-in-the-Middle", "MITM", "Security", "Networking", "Interview"],
    "relatedTopics": ["TLS", "ARP Spoofing", "Certificate Pinning"],
    "references": ["RFC 8446", "OWASP Top Ten"]
  },
  {
    "id": "cn-024",
    "category": "Computer Networks",
    "topic": "Quality of Service (QoS)",
    "difficulty": "Medium",
    "question": "What is Quality of Service (QoS) in networking?",
    "shortAnswer": "QoS refers to techniques that prioritize certain types of network traffic over others, ensuring critical applications (video calls, VoIP) get sufficient bandwidth and low latency even when the network is congested.",
    "detailedAnswer": "Not all traffic has the same requirements; a video call is extremely sensitive to latency and jitter since delayed audio is unusable, while a large file download can tolerate delays without any noticeable problem.\n\nQoS mechanisms classify and prioritize traffic, such as using DSCP markings in the IP header, so routers and switches can make intelligent decisions about which packets to forward first during congestion, which to delay, and which to drop if necessary. This is critical in corporate networks running VoIP alongside regular data traffic, and increasingly relevant for home networks running video conferencing, gaming, and streaming simultaneously.",
    "keyPoints": [
      "DSCP (Differentiated Services Code Point): marks packets with a priority class in the IP header",
      "Critical for time-sensitive traffic: VoIP, video conferencing, real-time gaming",
      "Without QoS, a large download can starve a video call of bandwidth on a congested link"
    ],
    "commonMistakes": [
      "Assuming all network traffic should be treated with equal priority",
      "Not knowing DSCP is the mechanism used to mark packet priority",
      "Underestimating how a large download can starve latency-sensitive traffic without QoS"
    ],
    "followUpQuestions": [
      "What is DSCP and how does it mark packet priority?",
      "Why is QoS especially important for VoIP traffic?",
      "How would you configure QoS on a home router for video conferencing?"
    ],
    "realWorldExample": "A corporate network configures QoS to prioritize VoIP call traffic over regular file downloads, ensuring calls remain clear even during high network usage.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain traffic prioritization mechanisms like DSCP and identify why certain traffic types need QoS protection.",
    "tags": ["QoS", "DSCP", "Networking", "Interview"],
    "relatedTopics": ["VoIP", "Network Congestion", "Bandwidth"],
    "references": ["RFC 2474"]
  },
  {
    "id": "cn-025",
    "category": "Computer Networks",
    "topic": "CDN (Content Delivery Network)",
    "difficulty": "Medium",
    "question": "What is a CDN (Content Delivery Network)? How does it improve performance?",
    "shortAnswer": "A CDN is a geographically distributed network of servers that cache and serve content from locations physically close to end users, reducing latency and offloading traffic from the origin server.",
    "detailedAnswer": "Instead of every user request traveling all the way to a single origin server, which could be on the other side of the world, a CDN caches static and sometimes dynamic content across many edge servers distributed globally.\n\nWhen a user requests content, DNS-based or Anycast routing directs them to the nearest edge server, which serves the cached content directly, dramatically reducing latency, reducing load on the origin server since most requests never reach it, and improving resilience since distributed infrastructure can better absorb traffic spikes and partial outages. CDNs also often provide additional benefits like DDoS protection, SSL termination at the edge, and image or video optimization on the fly.",
    "keyPoints": [
      "Reduces latency by serving content from a server physically close to the user",
      "Offloads traffic from the origin server — most requests are served entirely from cache",
      "Examples: Cloudflare, Akamai, AWS CloudFront — also commonly provide DDoS protection"
    ],
    "commonMistakes": [
      "Assuming CDNs only cache static content, ignoring dynamic content acceleration features",
      "Not knowing CDNs also commonly provide DDoS protection and SSL termination",
      "Underestimating how much origin server load is reduced by CDN caching"
    ],
    "followUpQuestions": [
      "How does a CDN route a user to the nearest edge server?",
      "What additional security benefits do CDNs commonly provide?",
      "How does a CDN handle dynamic, non-cacheable content?"
    ],
    "realWorldExample": "A global e-commerce site uses Cloudflare as a CDN to serve product images from edge locations near each user, significantly reducing page load times worldwide.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the latency-reduction and origin-offloading benefits of CDNs and name common real-world providers.",
    "tags": ["CDN", "Networking", "Performance", "Interview"],
    "relatedTopics": ["DNS", "Latency", "DDoS Protection"],
    "references": ["Computer Networking - Kurose & Ross"]
  },
  {
    "id": "co-001",
    "category": "Computer Organization",
    "topic": "RISC vs CISC",
    "difficulty": "Medium",
    "question": "What is the difference between RISC and CISC architecture?",
    "shortAnswer": "RISC: small set of simple, fixed-length instructions, mostly one clock cycle each. CISC: large set of complex, variable-length instructions.",
    "detailedAnswer": "RISC processors, such as ARM, MIPS, and RISC-V, use a small, optimized instruction set where each instruction typically executes in a single clock cycle. This simplicity enables efficient pipelining and lower power consumption, which is why ARM dominates mobile devices. Complex operations require chaining multiple simple instructions together.\n\nCISC processors, like x86/x86-64, support complex instructions that perform multi-step operations in variable clock cycles, reducing instruction count per program but complicating the hardware. Modern x86 CPUs internally translate CISC instructions into RISC-like micro-operations for execution.",
    "keyPoints": [
      "RISC: fixed-length instructions, more instructions per program, power-efficient",
      "CISC: variable-length instructions, fewer instructions per program, complex hardware",
      "ARM (RISC) dominates mobile/embedded; x86 (CISC) dominates desktop/server"
    ],
    "commonMistakes": [
      "Assuming CISC processors don't internally use RISC-like micro-operations",
      "Not knowing why ARM dominates power-constrained mobile devices",
      "Confusing instruction count per program with instruction complexity"
    ],
    "followUpQuestions": [
      "Why does modern x86 translate CISC instructions into micro-operations?",
      "Why is RISC generally more power-efficient than CISC?",
      "What are some real-world examples of RISC and CISC processors?"
    ],
    "realWorldExample": "Apple's transition to ARM-based (RISC) Apple Silicon chips for MacBooks improved battery life significantly compared to previous Intel (CISC) chips.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the trade-offs in instruction complexity and connect them to real-world power/performance implications.",
    "tags": ["RISC", "CISC", "Computer Organization", "Interview"],
    "relatedTopics": ["Instruction Set Architecture", "Pipelining", "Microarchitecture"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-002",
    "category": "Computer Organization",
    "topic": "CPU Pipelining",
    "difficulty": "Medium",
    "question": "What is Pipelining in CPU architecture?",
    "shortAnswer": "Pipelining overlaps execution of multiple instructions by breaking processing into stages (fetch, decode, execute, memory, write-back), so several instructions are in-flight simultaneously.",
    "detailedAnswer": "Without pipelining, a CPU fully completes one instruction before starting the next, leaving different hardware units idle most of the time. Pipelining divides instruction execution into stages, so while one instruction is decoding, the next is already being fetched, like an assembly line, dramatically increasing throughput without needing a faster clock.\n\nComplications include Structural Hazards, which are resource conflicts, Data Hazards, which occur when an instruction depends on a still-in-flight result, and Control Hazards, where branch instructions create uncertainty about what to fetch next.",
    "keyPoints": [
      "Classic 5-stage pipeline: Fetch, Decode, Execute, Memory Access, Write Back",
      "Data Hazard: solved by forwarding/bypassing or pipeline stalling",
      "Branch prediction: guesses branch outcome to avoid control hazard stalls"
    ],
    "commonMistakes": [
      "Confusing pipelining (overlapping stages) with superscalar execution (parallel instructions)",
      "Not knowing the three hazard types: structural, data, and control",
      "Assuming pipelining always increases clock speed rather than throughput"
    ],
    "followUpQuestions": [
      "What is the difference between a data hazard and a control hazard?",
      "How does forwarding/bypassing solve data hazards?",
      "How does branch prediction help mitigate control hazards?"
    ],
    "realWorldExample": "Modern CPUs use deep pipelines with many stages to maximize instruction throughput, similar to a factory assembly line processing multiple items simultaneously.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the 5-stage pipeline concept and identify the three types of pipeline hazards.",
    "tags": ["Pipelining", "CPU Architecture", "Computer Organization", "Interview"],
    "relatedTopics": ["Branch Prediction", "Superscalar Architecture", "Instruction-Level Parallelism"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-003",
    "category": "Computer Organization",
    "topic": "Cache Memory Hierarchy",
    "difficulty": "Medium",
    "question": "What is Cache Memory? Explain the three levels (L1, L2, L3).",
    "shortAnswer": "Cache is small, extremely fast memory between the CPU and RAM, exploiting locality to reduce average memory access time. L1 is smallest/fastest, L3 is largest/slowest of the caches.",
    "detailedAnswer": "Main memory, or RAM, is far slower than the CPU, so cache exploits temporal locality, where recently accessed data will likely be accessed again, and spatial locality, where nearby addresses are likely accessed soon.\n\nL1 is smallest, at 32-64KB, fastest, private per core, and split into instruction and data caches. L2 is larger, at 256KB-1MB, slightly slower, and usually private per core. L3 is largest, at several MB, shared across all cores, and slower than L1/L2 but far faster than RAM. The CPU checks L1, then L2, then L3, then RAM in order, with each miss costing significantly more time.",
    "keyPoints": [
      "Cache hit: found in cache — fast. Cache miss: must go deeper — slow",
      "Temporal locality: loop variables accessed repeatedly benefit from caching",
      "Spatial locality: array traversal benefits since nearby elements get cached together"
    ],
    "commonMistakes": [
      "Confusing temporal locality with spatial locality",
      "Not knowing L1 is typically split into instruction and data caches",
      "Assuming L3 cache is as fast as L1 since both are 'cache'"
    ],
    "followUpQuestions": [
      "What is the difference between temporal and spatial locality?",
      "Why is L3 cache shared while L1 and L2 are typically private per core?",
      "How does a cache miss affect overall CPU performance?"
    ],
    "realWorldExample": "A loop iterating over an array benefits from spatial locality since nearby array elements get loaded into cache together, reducing memory access time.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the locality principles behind caching and describe the size/speed trade-offs across L1, L2, and L3.",
    "tags": ["Cache Memory", "CPU Architecture", "Computer Organization", "Interview"],
    "relatedTopics": ["Cache Mapping", "SRAM vs DRAM", "Memory Hierarchy"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-004",
    "category": "Computer Organization",
    "topic": "Von Neumann vs Harvard Architecture",
    "difficulty": "Medium",
    "question": "What is the Von Neumann Architecture? How does it differ from Harvard Architecture?",
    "shortAnswer": "Von Neumann: shared memory for both instructions and data (one bus). Harvard: separate memory and buses for instructions and data, allowing simultaneous access.",
    "detailedAnswer": "In Von Neumann architecture, both program instructions and data reside in the same memory space and are accessed via the same bus, which is simpler and cheaper to build but creates the Von Neumann bottleneck, since the CPU can't fetch an instruction and access data simultaneously as they compete for the same bus. Most general-purpose computers use this design.\n\nHarvard architecture uses physically separate memory and buses for instructions and data, allowing simultaneous instruction fetch and data access, which is faster for specific workloads and commonly used in microcontrollers and DSPs where predictable, fast performance matters more than flexibility.",
    "keyPoints": [
      "Von Neumann bottleneck: single shared bus limits simultaneous instruction fetch + data access",
      "Harvard architecture: separate paths — common in embedded systems and DSPs",
      "Modern CPUs use a \"Modified Harvard\" approach: separate L1 instruction/data caches, unified main memory"
    ],
    "commonMistakes": [
      "Assuming all modern CPUs are purely Von Neumann without any Harvard elements",
      "Not knowing the term \"Von Neumann bottleneck\" refers to the shared bus limitation",
      "Confusing Harvard architecture's separate buses with simple cache separation"
    ],
    "followUpQuestions": [
      "What is a \"Modified Harvard\" architecture and why do modern CPUs use it?",
      "Why is Harvard architecture common in DSPs and microcontrollers?",
      "How does the Von Neumann bottleneck limit CPU performance?"
    ],
    "realWorldExample": "Most general-purpose PCs and servers use a Von Neumann-based design, while many embedded microcontrollers used in appliances use Harvard architecture for predictable timing.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the Von Neumann bottleneck and identify when Harvard architecture's separation is advantageous.",
    "tags": ["Von Neumann", "Harvard Architecture", "Computer Organization", "Interview"],
    "relatedTopics": ["Bus Architecture", "Cache Memory", "Microcontrollers"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-005",
    "category": "Computer Organization",
    "topic": "Instruction Set Architecture",
    "difficulty": "Medium",
    "question": "What is an Instruction Set Architecture (ISA)?",
    "shortAnswer": "ISA is the interface/contract between software and hardware — it defines the set of instructions, registers, addressing modes, and data types a processor understands and can execute.",
    "detailedAnswer": "The ISA is an abstraction layer that allows software, such as compilers and operating systems, to be written without needing to know the exact physical circuit implementation of the processor. Any processor implementing the same ISA, such as x86-64, can run the same compiled binary regardless of the specific internal microarchitecture, which can differ significantly between vendors like Intel and AMD.\n\nThis separation of ISA, the 'what', from microarchitecture, the 'how', is what allows continuous hardware innovation, such as new pipeline designs, more cores, and better branch prediction, without breaking compatibility with existing compiled software.",
    "keyPoints": [
      "ISA defines: instruction set, registers, addressing modes, data types",
      "Common ISAs: x86-64 (desktop/server), ARM (mobile/embedded), RISC-V (open-source, growing)",
      "Microarchitecture is the specific hardware implementation of an ISA — can vary between vendors/generations"
    ],
    "commonMistakes": [
      "Confusing ISA (the software-facing contract) with microarchitecture (the hardware implementation)",
      "Assuming all processors implementing the same ISA have identical internal designs",
      "Not knowing ISA compatibility is what enables software portability across CPU generations"
    ],
    "followUpQuestions": [
      "How does the ISA/microarchitecture separation enable hardware innovation without breaking software?",
      "What are some examples of different ISAs in use today?",
      "Why can Intel and AMD both implement x86-64 differently?"
    ],
    "realWorldExample": "A compiled x86-64 program can run on both an Intel and an AMD processor without modification, since both implement the same x86-64 ISA despite having different internal microarchitectures.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish ISA from microarchitecture and explain why this separation enables software compatibility.",
    "tags": ["ISA", "Microarchitecture", "Computer Organization", "Interview"],
    "relatedTopics": ["RISC vs CISC", "Compiler", "Microarchitecture"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-006",
    "category": "Computer Organization",
    "topic": "Register vs RAM",
    "difficulty": "Easy",
    "question": "What is the difference between a Register and RAM?",
    "shortAnswer": "Registers are extremely small, extremely fast storage locations built directly into the CPU. RAM is larger, slower memory external to the CPU core.",
    "detailedAnswer": "Registers hold data the CPU is actively working with right now, such as operands for the current instruction or intermediate calculation results, and are accessed in a single clock cycle since they're physically part of the CPU itself. There are typically only a handful to a few dozen general-purpose registers, such as 16 in x86-64.\n\nRAM holds the much larger working set of a running program, including variables, objects, and the call stack, but requires multiple clock cycles to access due to physical distance and the need to traverse the memory bus. The memory hierarchy, from registers to cache to RAM to disk, trades off capacity against speed at each level.",
    "keyPoints": [
      "Registers: fastest, smallest (bytes to a few dozen bytes total), part of the CPU itself",
      "RAM: much larger (GBs), but orders of magnitude slower to access than registers",
      "Compilers try to keep frequently-used variables in registers via \"register allocation\""
    ],
    "commonMistakes": [
      "Assuming registers and cache are the same thing",
      "Not knowing the typical count of general-purpose registers in modern architectures",
      "Confusing register access speed with cache access speed"
    ],
    "followUpQuestions": [
      "What is register allocation and why is it important for compilers?",
      "What happens when there aren't enough registers for all active variables?",
      "How does the memory hierarchy trade off speed and capacity?"
    ],
    "realWorldExample": "A compiler keeps a loop counter variable in a register throughout a tight loop to avoid the overhead of repeatedly accessing slower RAM.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the speed and capacity trade-off between registers and RAM within the memory hierarchy.",
    "tags": ["Register", "RAM", "Computer Organization", "Interview"],
    "relatedTopics": ["Register Allocation", "Memory Hierarchy", "Cache Memory"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-007",
    "category": "Computer Organization",
    "topic": "Interrupts",
    "difficulty": "Medium",
    "question": "What is an Interrupt? Explain the difference between Hardware and Software Interrupts.",
    "shortAnswer": "An interrupt is a signal that pauses the CPU's current execution to handle a more urgent event, then resumes where it left off. Hardware interrupts come from external devices; software interrupts are triggered by executing instructions.",
    "detailedAnswer": "A hardware interrupt is generated by external devices, such as a keyboard press, network packet arrival, or disk I/O completion, signaling that they need CPU attention. The CPU finishes its current instruction, saves its state, jumps to an Interrupt Service Routine to handle the event, then restores state and resumes the interrupted program.\n\nA software interrupt is deliberately triggered by executing a specific instruction in a program, like the int instruction on x86 or a system call trap, used to request OS services or signal exceptions like division by zero. Interrupts are what allow a CPU to remain responsive to real-time events without constantly polling every device.",
    "keyPoints": [
      "Interrupt Service Routine (ISR): the handler code that responds to a specific interrupt",
      "Interrupt Vector Table: maps each interrupt type to its corresponding ISR address",
      "Polling (the alternative): CPU repeatedly checks device status — wasteful compared to interrupts"
    ],
    "commonMistakes": [
      "Confusing hardware interrupts (external devices) with software interrupts (triggered by instructions)",
      "Not knowing the Interrupt Vector Table maps interrupt types to handler addresses",
      "Assuming polling is more efficient than interrupt-driven I/O"
    ],
    "followUpQuestions": [
      "What is an Interrupt Service Routine and how is it invoked?",
      "Why are interrupts more efficient than polling for device communication?",
      "What is an example of a software interrupt used to request OS services?"
    ],
    "realWorldExample": "When a user presses a key, the keyboard controller generates a hardware interrupt that pauses the current program to process the keystroke immediately.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish hardware and software interrupts and explain the role of the Interrupt Service Routine.",
    "tags": ["Interrupt", "Hardware Interrupt", "Software Interrupt", "Computer Organization", "Interview"],
    "relatedTopics": ["System Calls", "Polling", "Interrupt Vector Table"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-008",
    "category": "Computer Organization",
    "topic": "Multiprocessor vs Multicore",
    "difficulty": "Medium",
    "question": "What is the difference between a Multiprocessor and a Multicore system?",
    "shortAnswer": "Multiprocessor: multiple separate physical CPU chips in one system. Multicore: multiple independent processing cores within a SINGLE CPU chip.",
    "detailedAnswer": "A multiprocessor system has multiple distinct CPU chips, each potentially with its own cache hierarchy, connected via a shared bus or interconnect. This was historically used in high-end servers before multicore CPUs became mainstream, and communication between chips has higher latency than within a chip.\n\nA multicore system integrates multiple processing cores onto a single physical chip, sharing some cache levels, often L3, and the same memory controller. Communication between cores is much faster due to physical proximity and shared on-chip resources. Modern systems often combine both, using multiple multicore CPU chips in one server.",
    "keyPoints": [
      "Multicore: cores on one chip, faster inter-core communication, often shares L3 cache",
      "Multiprocessor: separate physical chips, historically used before multicore was viable",
      "Modern high-end servers combine both: multiple multicore CPUs per motherboard"
    ],
    "commonMistakes": [
      "Assuming multiprocessor and multicore are interchangeable terms",
      "Not knowing modern servers often combine both approaches",
      "Forgetting inter-chip communication has higher latency than inter-core communication"
    ],
    "followUpQuestions": [
      "Why is inter-core communication faster than inter-chip communication?",
      "How do modern servers combine multiprocessor and multicore designs?",
      "What cache levels are typically shared in a multicore system?"
    ],
    "realWorldExample": "A high-end server might have two physical CPU sockets (multiprocessor), each containing a 16-core chip (multicore), for a total of 32 cores.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish physical chip count from core count and explain the communication latency implications.",
    "tags": ["Multiprocessor", "Multicore", "Computer Organization", "Interview"],
    "relatedTopics": ["Cache Memory", "Parallel Computing", "Amdahl's Law"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-009",
    "category": "Computer Organization",
    "topic": "Instruction-Level Parallelism and Superscalar Architecture",
    "difficulty": "Hard",
    "question": "What is Instruction-Level Parallelism (ILP)? Explain Superscalar Architecture.",
    "shortAnswer": "ILP is the ability to execute multiple instructions simultaneously within a single CPU core. Superscalar architecture achieves this by having multiple execution units that can process independent instructions in parallel during the same clock cycle.",
    "detailedAnswer": "Even within a single core, not every instruction depends on the immediately preceding one. A superscalar processor can identify independent instructions via hardware instruction scheduling and dispatch multiple of them to different execution units, such as a separate integer ALU, floating-point unit, and load/store unit, simultaneously within one clock cycle, rather than strictly one instruction per cycle.\n\nThis is different from pipelining, which overlaps different stages of different instructions; superscalar execution overlaps the same stage for multiple independent instructions. Out-of-order execution further extends this by reordering instructions at runtime, while preserving correct final results, to maximize the use of available execution units when the program's original order has dependencies blocking parallel execution.",
    "keyPoints": [
      "Superscalar: multiple execution units process independent instructions in the same cycle",
      "Out-of-order execution: CPU reorders instructions internally to avoid stalling on dependencies",
      "Different from pipelining: pipelining overlaps stages, superscalar overlaps entire instructions"
    ],
    "commonMistakes": [
      "Confusing superscalar execution with pipelining",
      "Not knowing out-of-order execution preserves correct final results despite reordering",
      "Assuming ILP requires multiple cores rather than multiple execution units in one core"
    ],
    "followUpQuestions": [
      "How does superscalar architecture differ from pipelining?",
      "What is out-of-order execution and why is it used?",
      "What limits the amount of ILP a processor can exploit?"
    ],
    "realWorldExample": "Modern x86 CPUs use superscalar architecture with multiple execution units, allowing them to execute several independent instructions, like an integer addition and a floating-point multiplication, in the same clock cycle.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to distinguish superscalar execution from pipelining and explain the role of out-of-order execution.",
    "tags": ["ILP", "Superscalar", "Out-of-Order Execution", "Computer Organization", "Interview"],
    "relatedTopics": ["Pipelining", "Branch Prediction", "Multicore"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-010",
    "category": "Computer Organization",
    "topic": "Big Endian vs Little Endian",
    "difficulty": "Medium",
    "question": "What is the difference between Big Endian and Little Endian byte ordering?",
    "shortAnswer": "Big Endian stores the most significant byte at the lowest memory address. Little Endian stores the least significant byte at the lowest memory address.",
    "detailedAnswer": "When storing a multi-byte value, such as a 4-byte integer, in memory, there are two conventions for byte order. Big Endian stores bytes in the order a human would naturally read them, most significant byte first, and is used by network protocols, since network byte order is always big-endian, and some architectures like older Motorola/SPARC.\n\nLittle Endian stores the least significant byte first, and is used by x86/x86-64 and most modern consumer hardware, chosen partly because certain arithmetic operations can be marginally simpler at the hardware level. This matters directly when transferring binary data between systems with different endianness, since the data must be explicitly converted or bugs arise from misinterpreted values.",
    "keyPoints": [
      "Big Endian: 0x12345678 stored as 12 34 56 78 (most significant byte first)",
      "Little Endian: same value stored as 78 56 34 12 (least significant byte first)",
      "Network byte order is always Big Endian — hosts must convert (htons/ntohs functions in C)"
    ],
    "commonMistakes": [
      "Assuming all systems use the same byte ordering by default",
      "Forgetting network protocols always use big-endian byte order",
      "Not converting between byte orders when exchanging binary data across systems"
    ],
    "followUpQuestions": [
      "Why does network byte order always use Big Endian?",
      "What functions are used in C to convert between host and network byte order?",
      "What bugs can arise from mismatched endianness between systems?"
    ],
    "realWorldExample": "A network application running on a little-endian x86 machine must convert integers to big-endian network byte order using htons() before sending them over a socket.",
    "codeExample": {
      "language": "C",
      "code": "#include <arpa/inet.h>\n\nuint16_t port = 8080;\nuint16_t network_order_port = htons(port);  // convert to big-endian for network transmission"
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain both byte ordering conventions and why conversion matters for cross-system data exchange.",
    "tags": ["Big Endian", "Little Endian", "Byte Ordering", "Computer Organization", "Interview"],
    "relatedTopics": ["Network Byte Order", "Binary Data", "System Architecture"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-011",
    "category": "Computer Organization",
    "topic": "Bus Architecture",
    "difficulty": "Medium",
    "question": "What is a Bus in computer architecture? Explain Address Bus, Data Bus, and Control Bus.",
    "shortAnswer": "A bus is a shared communication pathway connecting CPU, memory, and I/O devices. Address Bus carries memory addresses. Data Bus carries actual data. Control Bus carries control signals coordinating operations.",
    "detailedAnswer": "The Address Bus is unidirectional, from CPU to memory, carrying the address of the memory location being accessed. Its width, or number of bits, determines the maximum addressable memory, such as a 32-bit address bus addressing up to 4GB.\n\nThe Data Bus is bidirectional, actually carrying the data being read from or written to memory, and its width determines how many bits can be transferred in one operation, such as a 64-bit data bus transferring 8 bytes at once. The Control Bus carries signals like Read/Write indicators, clock signals, and interrupt requests, coordinating the timing and nature of operations happening on the other two buses.",
    "keyPoints": [
      "Address bus width determines the maximum addressable memory space (2^n addresses)",
      "Data bus width determines how much data transfers per memory operation",
      "Control bus: carries Read/Write signals, clock pulses, interrupt requests"
    ],
    "commonMistakes": [
      "Confusing the roles of the address bus and data bus",
      "Not calculating maximum addressable memory correctly from address bus width",
      "Forgetting the control bus coordinates timing rather than carrying addresses or data"
    ],
    "followUpQuestions": [
      "How would you calculate the maximum addressable memory from a given address bus width?",
      "Why is the data bus bidirectional while the address bus is unidirectional?",
      "What kinds of signals travel on the control bus?"
    ],
    "realWorldExample": "A 32-bit address bus limits a system to addressing 4GB of memory, which historically constrained 32-bit operating systems even with more physical RAM installed.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the distinct roles of the three bus types and connect address bus width to addressable memory capacity.",
    "tags": ["Bus Architecture", "Address Bus", "Data Bus", "Computer Organization", "Interview"],
    "relatedTopics": ["Memory Addressing", "CPU Architecture", "DMA"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-012",
    "category": "Computer Organization",
    "topic": "Direct Memory Access (DMA)",
    "difficulty": "Medium",
    "question": "What is Direct Memory Access (DMA)? Why is it used?",
    "shortAnswer": "DMA allows peripheral devices (disk, network card) to transfer data directly to/from memory WITHOUT involving the CPU for every single byte, freeing the CPU to do other work.",
    "detailedAnswer": "Without DMA, transferring a large file from disk to memory would require the CPU to execute a read instruction for every single byte or word, an enormous waste of CPU cycles for what is fundamentally a mechanical data-copying task.\n\nWith DMA, the CPU simply configures a DMA controller with the source, destination, and size of the transfer, then continues executing other instructions while the DMA controller independently manages the entire transfer, accessing memory directly. Once the transfer completes, the DMA controller signals the CPU via an interrupt, dramatically improving overall system throughput for I/O-heavy operations.",
    "keyPoints": [
      "CPU only sets up the transfer parameters, then is free to do other work during the transfer",
      "DMA controller signals completion via an interrupt",
      "Critical for high-throughput I/O: disk transfers, network cards, sound cards, graphics cards"
    ],
    "commonMistakes": [
      "Assuming the CPU is involved in every byte of a DMA transfer",
      "Not knowing DMA completion is signaled via an interrupt",
      "Confusing DMA with regular memory-mapped I/O"
    ],
    "followUpQuestions": [
      "How does the DMA controller signal the CPU when a transfer completes?",
      "What kinds of I/O operations benefit most from DMA?",
      "What would happen to system performance without DMA for disk transfers?"
    ],
    "realWorldExample": "A graphics card uses DMA to transfer large textures directly into video memory without requiring the CPU to copy each byte individually.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain how DMA frees the CPU from per-byte transfer overhead and improves I/O throughput.",
    "tags": ["DMA", "I/O", "Computer Organization", "Interview"],
    "relatedTopics": ["Bus Architecture", "Interrupts", "Memory-Mapped I/O"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-013",
    "category": "Computer Organization",
    "topic": "Microprogramming vs Hardwired Control",
    "difficulty": "Hard",
    "question": "What is Microprogramming vs Hardwired Control?",
    "shortAnswer": "Hardwired Control implements the control logic directly in physical circuitry (fast, but inflexible). Microprogramming implements control logic as a stored \"microprogram\" that's interpreted, making it flexible and easier to modify/debug.",
    "detailedAnswer": "In hardwired control, each control signal is generated by a fixed combination of logic gates wired specifically for that purpose, which is extremely fast since there's no interpretation overhead, but modifying the instruction set requires physically redesigning the circuit, making it inflexible and error-prone to change or debug.\n\nIn microprogrammed control, each machine instruction is broken down into a sequence of simpler micro-instructions stored in a special control memory, and a micro-sequencer reads and executes these one at a time to implement the full instruction. This is slower due to the extra interpretation layer, but far more flexible, since adding new instructions or fixing bugs is a matter of updating the microprogram rather than redesigning hardware.",
    "keyPoints": [
      "Hardwired: faster execution, but inflexible — changes require redesigning circuits",
      "Microprogrammed: slower (interpretation overhead), but flexible — changes are just data updates",
      "Modern CPUs (x86) use a hybrid: hardwired for common cases, microcode for complex instructions"
    ],
    "commonMistakes": [
      "Assuming modern CPUs use purely one approach rather than a hybrid",
      "Not understanding why CISC processors historically favored microprogramming",
      "Confusing microcode with the ISA itself"
    ],
    "followUpQuestions": [
      "Why did CISC processors historically favor microprogrammed control?",
      "How do modern x86 CPUs combine hardwired and microprogrammed control?",
      "What is the trade-off between flexibility and speed in these two approaches?"
    ],
    "realWorldExample": "Intel and AMD processors can fix certain CPU bugs via microcode updates delivered through BIOS/OS updates, without needing to physically replace the chip, illustrating the flexibility of microprogrammed control.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the speed vs flexibility trade-off and recognize that modern CPUs use a hybrid approach.",
    "tags": ["Microprogramming", "Hardwired Control", "Control Unit", "Computer Organization", "Interview"],
    "relatedTopics": ["Control Unit", "ISA", "CISC"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-014",
    "category": "Computer Organization",
    "topic": "Volatile vs Non-Volatile Memory",
    "difficulty": "Easy",
    "question": "What is the difference between Volatile and Non-Volatile Memory?",
    "shortAnswer": "Volatile memory loses its stored data when power is removed (RAM). Non-Volatile memory retains data even without power (SSD, HDD, ROM, Flash).",
    "detailedAnswer": "Volatile memory, such as DRAM/RAM, requires continuous power to maintain its stored state. DRAM specifically needs to be periodically refreshed, or rewritten, even while powered, since the tiny capacitors storing each bit naturally leak charge over time. This is acceptable because RAM only holds temporary working data during active program execution.\n\nNon-Volatile memory, such as SSDs, HDDs, ROM, Flash memory, and EEPROM, retains its data indefinitely without power, which is essential for permanent storage of the operating system, files, and firmware that must survive a power cycle. There's a fundamental trade-off: volatile memory is much faster to read/write than non-volatile storage.",
    "keyPoints": [
      "Volatile (RAM): fast, but loses data on power loss — used for active working memory",
      "Non-Volatile (SSD/HDD/Flash): retains data without power, but slower — used for persistent storage",
      "DRAM requires periodic refresh cycles even while powered, unlike SRAM (used in CPU cache)"
    ],
    "commonMistakes": [
      "Assuming all types of RAM are equally volatile in the same way",
      "Not knowing DRAM requires periodic refresh even while powered",
      "Confusing SRAM's non-refresh behavior with volatility status (SRAM is still volatile)"
    ],
    "followUpQuestions": [
      "Why does DRAM need periodic refresh cycles?",
      "Why is volatile memory used for active working data despite the risk of data loss?",
      "What are some examples of non-volatile memory beyond SSDs and HDDs?"
    ],
    "realWorldExample": "When a computer loses power unexpectedly, unsaved data in RAM is lost, while files already saved to the SSD remain intact.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the power-dependency trade-off and identify why RAM's volatility is an acceptable design choice.",
    "tags": ["Volatile Memory", "Non-Volatile Memory", "Computer Organization", "Interview"],
    "relatedTopics": ["SRAM vs DRAM", "Memory Hierarchy", "Storage"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-015",
    "category": "Computer Organization",
    "topic": "Register File",
    "difficulty": "Medium",
    "question": "What is a Register File? Why does CPU design use general-purpose registers?",
    "shortAnswer": "A Register File is a small, extremely fast array of storage locations within the CPU, used to hold operands and intermediate results during instruction execution.",
    "detailedAnswer": "General-purpose registers give the CPU somewhere to hold values it's actively computing with, without needing to constantly access slower memory for every intermediate step. Since register access takes a single clock cycle, compared to multiple cycles for even cached memory access, compilers aggressively try to keep frequently-used variables in registers, a process called register allocation, rather than repeatedly reading and writing memory.\n\nThe number of available registers is a key architectural constraint; x86-64 has 16 general-purpose registers, while some RISC architectures provide more, such as 32 in typical ARM/MIPS designs, to reduce the frequency of register spilling, which is temporarily moving values to memory when there aren't enough registers to hold everything needed simultaneously.",
    "keyPoints": [
      "Register access: single clock cycle — dramatically faster than any memory access",
      "Register spilling: when there aren't enough registers, values must temporarily go to memory (slower)",
      "Register allocation: a key compiler optimization deciding which variables live in registers vs memory"
    ],
    "commonMistakes": [
      "Not understanding register spilling occurs when the compiler runs out of available registers",
      "Assuming all architectures have the same number of general-purpose registers",
      "Confusing register allocation with memory allocation"
    ],
    "followUpQuestions": [
      "What is register spilling and when does it occur?",
      "Why do RISC architectures typically provide more registers than CISC architectures?",
      "How does the compiler decide which variables to keep in registers?"
    ],
    "realWorldExample": "A compiler optimizing a tight loop keeps the loop counter in a register throughout the loop's execution to avoid repeated slower memory accesses.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain why registers are faster than memory and describe register allocation and spilling.",
    "tags": ["Register File", "Register Allocation", "Computer Organization", "Interview"],
    "relatedTopics": ["Register vs RAM", "Compiler", "RISC vs CISC"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-016",
    "category": "Computer Organization",
    "topic": "Amdahl's Law",
    "difficulty": "Hard",
    "question": "What is Amdahl's Law? Why does it matter for parallel computing?",
    "shortAnswer": "Amdahl's Law calculates the theoretical maximum speedup achievable by parallelizing a task, showing that the speedup is fundamentally limited by the portion of the task that MUST remain sequential.",
    "detailedAnswer": "Amdahl's Law states that Speedup equals 1 divided by ((1-P) plus P/N), where P is the proportion of the task that can be parallelized and N is the number of processors. This reveals a critical insight: even with infinite processors, if 10% of a task is inherently sequential, the maximum possible speedup is only 10x, no matter how many cores are used.\n\nThis has huge practical implications for system design: before investing in massive parallelization, such as adding more CPU cores or distributing across more servers, engineers must first identify and minimize the sequential bottleneck portion of their workload, since that's what ultimately caps achievable performance gains.",
    "keyPoints": [
      "Formula: Speedup = 1 / ((1-P) + P/N) where P = parallelizable fraction, N = number of processors",
      "Even with infinite cores, speedup is capped by the sequential (non-parallelizable) portion",
      "Practical implication: identify and minimize the sequential bottleneck BEFORE adding more parallelism"
    ],
    "commonMistakes": [
      "Assuming adding more processors always yields proportional speedup",
      "Not identifying the sequential bottleneck before investing in parallelization",
      "Misapplying the formula by confusing P (parallelizable fraction) with N (processor count)"
    ],
    "followUpQuestions": [
      "What happens to speedup as N approaches infinity in Amdahl's Law?",
      "How would you identify the sequential bottleneck in a real workload?",
      "What is the practical implication of Amdahl's Law for scaling cloud infrastructure?"
    ],
    "realWorldExample": "A data processing pipeline where 20% of the work is an inherently sequential aggregation step will never achieve more than a 5x speedup, regardless of how many additional servers process the parallelizable 80%.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to state the formula correctly and explain the practical implication of the sequential bottleneck limiting speedup.",
    "tags": ["Amdahl's Law", "Parallel Computing", "Computer Organization", "Interview"],
    "relatedTopics": ["Multicore", "Instruction-Level Parallelism", "Scalability"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-017",
    "category": "Computer Organization",
    "topic": "SRAM vs DRAM",
    "difficulty": "Medium",
    "question": "What is the difference between SRAM and DRAM?",
    "shortAnswer": "SRAM (Static RAM): faster, more expensive, doesn't need periodic refresh — used for CPU cache. DRAM (Dynamic RAM): slower, cheaper, needs periodic refresh — used for main memory.",
    "detailedAnswer": "SRAM stores each bit using a flip-flop circuit, typically 6 transistors, that holds its state as long as power is applied, without needing to be refreshed. This makes it faster but also physically larger and more expensive per bit, which is why it's used in small quantities for CPU cache where speed is paramount.\n\nDRAM stores each bit as a charge in a tiny capacitor, using 1 transistor plus 1 capacitor per bit, making it much more compact and cheaper per bit, but the capacitor's charge naturally leaks over time, requiring periodic refresh cycles to prevent data loss even while powered. This refresh overhead and simpler storage mechanism make DRAM slower than SRAM, which is why it's used for larger-capacity main memory rather than cache.",
    "keyPoints": [
      "SRAM: 6 transistors/bit, no refresh needed, fast but expensive — used for cache",
      "DRAM: 1 transistor + 1 capacitor/bit, needs periodic refresh, cheaper but slower — used for RAM",
      "Refresh overhead is exactly why DRAM access is slower and more complex than SRAM"
    ],
    "commonMistakes": [
      "Confusing SRAM (cache) with DRAM (main memory) use cases",
      "Not knowing DRAM requires periodic refresh cycles due to capacitor charge leakage",
      "Assuming SRAM is cheaper than DRAM (it's actually more expensive per bit)"
    ],
    "followUpQuestions": [
      "Why does DRAM's capacitor-based storage require periodic refresh?",
      "Why is SRAM more expensive per bit than DRAM?",
      "Why is SRAM used for cache while DRAM is used for main memory?"
    ],
    "realWorldExample": "A CPU's L1/L2/L3 cache is built with SRAM for speed, while the much larger system RAM is built with cheaper DRAM.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the transistor-count and refresh-cycle differences that drive SRAM's speed advantage and cost disadvantage over DRAM.",
    "tags": ["SRAM", "DRAM", "Cache Memory", "Computer Organization", "Interview"],
    "relatedTopics": ["Cache Memory", "Volatile Memory", "Memory Hierarchy"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-018",
    "category": "Computer Organization",
    "topic": "Branch Prediction",
    "difficulty": "Hard",
    "question": "What is Branch Prediction? Why is it necessary in pipelined processors?",
    "shortAnswer": "Branch Prediction guesses the outcome of a conditional branch instruction (if/else, loop condition) BEFORE it's actually resolved, allowing the pipeline to keep fetching instructions speculatively instead of stalling.",
    "detailedAnswer": "In a pipelined CPU, when the processor encounters a conditional branch instruction, it doesn't know which instruction to fetch next until the branch condition is actually evaluated several stages later. Without prediction, the pipeline would have to stall completely until the branch resolves, wasting many clock cycles, a situation called a control hazard.\n\nBranch prediction uses heuristics or historical patterns, such as assuming a branch taken the last 10 times will be taken again, to guess the outcome and speculatively continue fetching and executing instructions down the predicted path. If the prediction is correct, no time is lost; if incorrect, a misprediction, the speculatively executed instructions must be discarded in a pipeline flush and execution restarts from the correct path, a costly penalty that motivates modern CPUs to invest heavily in sophisticated branch predictors achieving 95%+ accuracy.",
    "keyPoints": [
      "Control hazard: pipeline doesn't know which instruction to fetch next until branch resolves",
      "Correct prediction: no performance penalty, pipeline stays full",
      "Misprediction: pipeline flush required — all speculatively executed work is discarded, costly penalty"
    ],
    "commonMistakes": [
      "Assuming branch prediction eliminates control hazards entirely rather than mitigating them",
      "Not knowing a misprediction requires a costly pipeline flush",
      "Underestimating how high modern branch predictor accuracy typically is"
    ],
    "followUpQuestions": [
      "What happens to the pipeline when a branch is mispredicted?",
      "How do modern CPUs achieve high branch prediction accuracy?",
      "Why is branch prediction more critical in deeper pipelines?"
    ],
    "realWorldExample": "A tight loop that runs thousands of iterations benefits greatly from branch prediction, since the predictor quickly learns the loop's branch is almost always taken until the final iteration.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the control hazard problem and describe the cost of a misprediction versus a correct prediction.",
    "tags": ["Branch Prediction", "Pipelining", "Control Hazard", "Computer Organization", "Interview"],
    "relatedTopics": ["Pipelining", "Superscalar Architecture", "Out-of-Order Execution"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-019",
    "category": "Computer Organization",
    "topic": "Fetch-Decode-Execute Cycle",
    "difficulty": "Easy",
    "question": "What is the Fetch-Decode-Execute Cycle?",
    "shortAnswer": "The basic cycle every CPU instruction goes through: Fetch (retrieve instruction from memory), Decode (interpret what the instruction means), Execute (perform the actual operation).",
    "detailedAnswer": "In the Fetch stage, the CPU uses the Program Counter to retrieve the next instruction from memory into the Instruction Register, then increments the Program Counter to point to the following instruction. In the Decode stage, the Control Unit interprets the fetched instruction's opcode, determining what operation to perform and which registers or memory locations are involved.\n\nIn the Execute stage, the ALU or other relevant hardware unit actually performs the specified operation, such as addition, memory load, or branch, and results are written back to a register or memory. This cycle repeats continuously for every single instruction; in a non-pipelined CPU it happens sequentially one instruction at a time, while pipelined CPUs overlap these stages across multiple instructions simultaneously.",
    "keyPoints": [
      "Program Counter (PC): tracks the memory address of the next instruction to fetch",
      "Instruction Register: holds the currently fetched instruction awaiting decode/execute",
      "This basic cycle is the foundation that pipelining builds upon by overlapping the stages"
    ],
    "commonMistakes": [
      "Forgetting the Program Counter is incremented during the Fetch stage",
      "Confusing the roles of the Control Unit (decode) and ALU (execute)",
      "Not connecting this basic cycle to how pipelining overlaps its stages"
    ],
    "followUpQuestions": [
      "What is the role of the Program Counter in this cycle?",
      "How does pipelining build upon the basic Fetch-Decode-Execute cycle?",
      "What happens during the Decode stage specifically?"
    ],
    "realWorldExample": "Every single machine instruction a CPU runs, from a simple addition to a complex branch, goes through this fundamental three-stage cycle.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to describe each of the three stages accurately and connect this cycle to the foundation of pipelining.",
    "tags": ["Fetch-Decode-Execute", "CPU Cycle", "Computer Organization", "Interview"],
    "relatedTopics": ["Pipelining", "Control Unit", "Program Counter"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-020",
    "category": "Computer Organization",
    "topic": "Cache Mapping",
    "difficulty": "Hard",
    "question": "What is Cache Mapping? Explain Direct-Mapped, Fully Associative, and Set-Associative caching.",
    "shortAnswer": "Cache Mapping determines WHERE in the cache a specific memory block can be placed. Direct-Mapped: each block maps to exactly one cache location. Fully Associative: a block can go anywhere. Set-Associative: a middle ground — a block maps to a specific set, but can go anywhere within that set.",
    "detailedAnswer": "Direct-Mapped caching uses a simple formula, memory address modulo the number of cache lines, to determine the exact single cache location for any given memory block. This is fast and simple to implement, but suffers from conflict misses if two frequently-used blocks happen to map to the same cache line, forcing repeated evictions even if other cache space is free.\n\nFully Associative caching allows any memory block to be placed in any cache line, eliminating conflict misses entirely, but requires checking every single cache line to determine a hit or miss, making it slower and more hardware-expensive, especially for large caches. N-way Set-Associative caching is the practical middle ground used in real CPUs: the cache is divided into sets, each memory block maps to a specific set like direct-mapped, but within that set it can occupy any of N available lines like fully associative on a smaller scale.",
    "keyPoints": [
      "Direct-mapped: fast, simple, but prone to conflict misses",
      "Fully associative: no conflict misses, but expensive/slow to search (checks every line)",
      "N-way Set-associative: practical middle ground used in real CPU cache designs (e.g., 8-way L2 cache)"
    ],
    "commonMistakes": [
      "Confusing conflict misses (direct-mapped) with capacity misses (any cache type)",
      "Assuming fully associative caching is always the best choice despite its search cost",
      "Not knowing set-associative caching is what real CPUs typically use in practice"
    ],
    "followUpQuestions": [
      "What is a conflict miss and why does direct-mapped caching suffer from it?",
      "Why do real CPUs typically use N-way set-associative caching instead of fully associative?",
      "How does the number of ways in a set-associative cache affect performance and cost?"
    ],
    "realWorldExample": "A typical L2 cache in a modern CPU might be organized as an 8-way set-associative cache, balancing search speed against conflict miss avoidance.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain all three mapping strategies and articulate the trade-off between conflict misses and search complexity.",
    "tags": ["Cache Mapping", "Direct-Mapped", "Set-Associative", "Computer Organization", "Interview"],
    "relatedTopics": ["Cache Memory", "SRAM vs DRAM", "Memory Hierarchy"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-021",
    "category": "Computer Organization",
    "topic": "Compiler vs Assembler",
    "difficulty": "Medium",
    "question": "What is the difference between a Compiler and an Assembler in the context of computer architecture?",
    "shortAnswer": "A Compiler translates high-level source code (C, Java) into assembly or machine code. An Assembler translates human-readable assembly language into actual machine code (binary instructions the CPU executes).",
    "detailedAnswer": "A compiler performs a much more complex, multi-stage translation: parsing high-level syntax, performing type checking and optimization, and eventually generating either assembly code or directly machine code. This involves significant abstraction, since high-level constructs like loops, function calls, and objects don't have a one-to-one correspondence with individual machine instructions.\n\nAn assembler performs a much more direct, largely one-to-one translation, where each assembly language mnemonic, like MOV, ADD, or JMP, corresponds directly to a specific binary opcode the CPU understands, with the assembler mainly resolving symbolic labels and addresses into actual numeric addresses. In a typical toolchain, source code goes through a compiler to become assembly code, then an assembler to become machine code, then a linker to produce the final executable.",
    "keyPoints": [
      "Compiler: high-level language → assembly/machine code, involves significant abstraction/optimization",
      "Assembler: assembly language → machine code, largely a direct 1-to-1 mnemonic translation",
      "Full toolchain: source → compiler → assembler → linker → executable machine code"
    ],
    "commonMistakes": [
      "Confusing the abstraction levels between compilers and assemblers",
      "Not knowing the full toolchain sequence: compiler → assembler → linker",
      "Assuming assemblers perform optimization like compilers do"
    ],
    "followUpQuestions": [
      "What is the role of a linker in the compilation toolchain?",
      "Why does a compiler involve more abstraction than an assembler?",
      "What does an assembler do with symbolic labels in assembly code?"
    ],
    "realWorldExample": "A C program is first translated by a compiler like GCC into assembly code, which is then converted by an assembler into an object file, and finally linked into an executable.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to describe the full toolchain from source code to executable and distinguish the compiler's abstraction from the assembler's direct translation.",
    "tags": ["Compiler", "Assembler", "Toolchain", "Computer Organization", "Interview"],
    "relatedTopics": ["ISA", "Linker", "Machine Code"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-022",
    "category": "Computer Organization",
    "topic": "Flynn's Taxonomy",
    "difficulty": "Hard",
    "question": "What is a Flynn's Taxonomy? Explain SISD, SIMD, MISD, MIMD.",
    "shortAnswer": "Flynn's Taxonomy classifies computer architectures based on the number of concurrent Instruction streams and Data streams. SISD: single instruction, single data (traditional single-core). SIMD: single instruction, multiple data (GPUs, vector processors). MIMD: multiple instructions, multiple data (multicore/multiprocessor systems).",
    "detailedAnswer": "SISD, Single Instruction Single Data, describes a traditional sequential processor executing one instruction on one piece of data at a time, the classic Von Neumann model for a single core. SIMD, Single Instruction Multiple Data, applies the same instruction simultaneously across multiple data elements, ideal for operations like adding two large arrays element-wise, extensively used in GPUs and CPU vector extensions like SSE and AVX.\n\nMISD, Multiple Instructions Single Data, is rare in practice, mostly theoretical or used in specialized fault-tolerant systems. MIMD, Multiple Instructions Multiple Data, describes genuinely independent processors executing different instructions on different data simultaneously, describing essentially all modern multicore CPUs and distributed or cluster computing systems.",
    "keyPoints": [
      "SISD: traditional single-core sequential execution (classic Von Neumann)",
      "SIMD: same operation across multiple data points simultaneously — GPUs, AVX/SSE instructions",
      "MIMD: fully independent parallel execution — modern multicore CPUs, computing clusters"
    ],
    "commonMistakes": [
      "Confusing SIMD (same instruction, multiple data) with MIMD (different instructions, different data)",
      "Not knowing MISD is largely theoretical with few practical applications",
      "Assuming all parallel architectures fall under MIMD"
    ],
    "followUpQuestions": [
      "Why are GPUs classified as SIMD architectures?",
      "What real-world systems fall under the MIMD category?",
      "Why is MISD rarely used in practice?"
    ],
    "realWorldExample": "A GPU rendering a frame applies the same shader instruction to thousands of pixels simultaneously, exemplifying SIMD architecture.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to correctly classify each category and provide real-world examples, especially for SIMD and MIMD.",
    "tags": ["Flynn's Taxonomy", "SIMD", "MIMD", "Computer Organization", "Interview"],
    "relatedTopics": ["Parallel Computing", "GPU Architecture", "Multicore"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-023",
    "category": "Computer Organization",
    "topic": "Control Unit",
    "difficulty": "Medium",
    "question": "What is the role of the Control Unit in a CPU?",
    "shortAnswer": "The Control Unit orchestrates and coordinates all CPU operations — it decodes instructions and generates the control signals that direct the ALU, registers, and memory to perform the correct operation in the correct sequence.",
    "detailedAnswer": "The Control Unit doesn't perform actual computations itself, since that's the ALU's job. Instead, it acts as the CPU's conductor, interpreting each fetched instruction's opcode and generating the precise timing and control signals needed to execute it correctly: which registers to read from, when to enable the ALU and what operation it should perform, when to write results back, when to access memory, and when to update the program counter.\n\nIt essentially translates the high-level intent of an instruction into the exact sequence of low-level micro-operations and signal timings needed to make the physical hardware components work together correctly to achieve that result.",
    "keyPoints": [
      "Doesn't perform computation itself — generates control signals directing other components",
      "Coordinates: register reads/writes, ALU operation selection, memory access timing, PC updates",
      "Can be implemented as hardwired logic (fast) or microprogrammed (flexible)"
    ],
    "commonMistakes": [
      "Assuming the Control Unit performs arithmetic operations itself",
      "Confusing the Control Unit's role with the ALU's role",
      "Not knowing the Control Unit can be implemented as either hardwired or microprogrammed"
    ],
    "followUpQuestions": [
      "How does the Control Unit differ from the ALU in terms of function?",
      "What control signals does the Control Unit typically generate?",
      "How does the Control Unit's implementation relate to hardwired vs microprogrammed control?"
    ],
    "realWorldExample": "When executing an 'ADD R1, R2, R3' instruction, the Control Unit generates the signals telling the ALU to perform addition and directing the result to be written back to register R1.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the Control Unit's coordination role from the ALU's computational role.",
    "tags": ["Control Unit", "CPU Architecture", "Computer Organization", "Interview"],
    "relatedTopics": ["Fetch-Decode-Execute Cycle", "Microprogramming", "ALU"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-024",
    "category": "Computer Organization",
    "topic": "Memory-Mapped I/O vs Port-Mapped I/O",
    "difficulty": "Medium",
    "question": "What is Memory-Mapped I/O vs Port-Mapped I/O?",
    "shortAnswer": "Memory-Mapped I/O: device registers share the same address space as regular memory, accessed with normal memory instructions. Port-Mapped I/O: devices use a completely separate address space, requiring special I/O instructions.",
    "detailedAnswer": "With Memory-Mapped I/O, specific memory addresses are reserved to represent device registers, such as writing to a particular address sending a byte to a serial port. The CPU uses the exact same instructions, like MOV, LOAD, and STORE, to communicate with devices as it does for regular RAM, simplifying the instruction set.\n\nWith Port-Mapped I/O, used historically in x86, devices exist in a completely separate address space accessed via dedicated special instructions like IN and OUT, keeping the memory address space entirely reserved for actual RAM but requiring the CPU to support distinct instruction types just for I/O. Modern systems predominantly use memory-mapped I/O due to its simplicity and flexibility, though x86 retains legacy port-mapped I/O support for backward compatibility.",
    "keyPoints": [
      "Memory-mapped I/O: devices share memory address space, accessed via normal load/store instructions",
      "Port-mapped I/O: separate address space, requires dedicated IN/OUT instructions (legacy x86)",
      "Modern systems favor memory-mapped I/O for simplicity — any instruction touching memory can touch a device"
    ],
    "commonMistakes": [
      "Assuming port-mapped I/O is still the primary method used in modern systems",
      "Confusing memory-mapped I/O's shared address space with regular RAM access",
      "Not knowing x86 retains legacy port-mapped I/O for backward compatibility"
    ],
    "followUpQuestions": [
      "Why do modern systems favor memory-mapped I/O over port-mapped I/O?",
      "What instructions does x86 use for port-mapped I/O?",
      "What are the trade-offs of reserving part of the address space for devices in memory-mapped I/O?"
    ],
    "realWorldExample": "A modern graphics card's control registers are typically accessed via memory-mapped I/O, allowing the CPU to use standard load/store instructions to communicate with it.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain the address space distinction and identify why modern systems favor memory-mapped I/O.",
    "tags": ["Memory-Mapped I/O", "Port-Mapped I/O", "Computer Organization", "Interview"],
    "relatedTopics": ["Bus Architecture", "DMA", "I/O Systems"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
  {
    "id": "co-025",
    "category": "Computer Organization",
    "topic": "Clock Speed and Performance",
    "difficulty": "Medium",
    "question": "What is Clock Speed? Why doesn't higher clock speed always mean better performance?",
    "shortAnswer": "Clock Speed (measured in GHz) is the rate at which the CPU's internal clock oscillates, determining how many basic operation cycles occur per second — but actual performance also depends on instructions-per-cycle (IPC), core count, and workload characteristics.",
    "detailedAnswer": "A higher clock speed means the CPU can potentially execute more cycles per second, but this doesn't directly translate to proportionally better real-world performance. Different CPU architectures achieve different amounts of actual work per clock cycle, known as Instructions Per Cycle or IPC, so a 3GHz CPU with higher IPC can outperform a 4GHz CPU with lower IPC.\n\nSingle-threaded clock speed also doesn't help with workloads that can utilize multiple cores in parallel, and higher clock speeds generate more heat and consume more power, eventually hitting physical and thermal limits. This is exactly why the industry pivoted toward adding more cores rather than just chasing ever-higher single-core clock speeds after the mid-2000s 'megahertz race' ended.",
    "keyPoints": [
      "IPC (Instructions Per Cycle): how much actual work happens per clock cycle — varies by architecture",
      "Total performance ≈ Clock Speed × IPC × (parallelizable work × core count, when applicable)",
      "Thermal/power limits are why the industry shifted from \"megahertz race\" to multicore designs post-2005"
    ],
    "commonMistakes": [
      "Comparing CPUs purely by GHz number without considering IPC differences",
      "Not knowing thermal and power limits drove the shift toward multicore designs",
      "Assuming single-core clock speed benefits all types of workloads equally"
    ],
    "followUpQuestions": [
      "What is IPC and why does it matter alongside clock speed?",
      "Why did the industry shift from chasing higher clock speeds to adding more cores?",
      "How would you compare two CPUs with different clock speeds and architectures?"
    ],
    "realWorldExample": "A modern 3GHz CPU with an improved architecture can outperform an older 4GHz CPU due to higher instructions-per-cycle efficiency, illustrating why clock speed alone is misleading.",
    "codeExample": {
      "language": "",
      "code": ""
    },
    "interviewerExpectation": "The interviewer expects the candidate to explain IPC's role alongside clock speed and describe why the industry shifted toward multicore designs.",
    "tags": ["Clock Speed", "IPC", "CPU Performance", "Computer Organization", "Interview"],
    "relatedTopics": ["Multicore", "Amdahl's Law", "Pipelining"],
    "references": ["Computer Organization and Design - Patterson & Hennessy"]
  },
{
  "id": "ood-001",
  "category": "Object-Oriented Design",
  "topic": "Four Pillars of OOP",
  "difficulty": "Easy",
  "question": "What are the four pillars of Object-Oriented Programming?",
  "shortAnswer": "Encapsulation, Abstraction, Inheritance, Polymorphism.",
  "detailedAnswer": "Encapsulation bundles data and behavior together, restricting direct access to internal state via private fields and public methods. Abstraction exposes only necessary details, hiding implementation via interfaces or abstract classes.\n\nInheritance lets a child class reuse a parent's fields and methods, representing an is-a relationship. Polymorphism allows the same interface to behave differently based on the actual object type at runtime.",
  "keyPoints": [
    "Encapsulation: private fields + public interface = controlled access",
    "Inheritance: Dog extends Animal — Dog IS-AN Animal",
    "Composition over inheritance is often more flexible than a strict \"is-a\" hierarchy"
  ],
  "commonMistakes": [
    "Confusing abstraction with encapsulation",
    "Overusing inheritance where composition would be more flexible",
    "Not distinguishing compile-time and runtime polymorphism"
  ],
  "followUpQuestions": [
    "How is encapsulation different from abstraction?",
    "What is the difference between overloading and overriding?",
    "Why is composition often preferred over inheritance?"
  ],
  "realWorldExample": "A car's steering wheel is an abstraction — the driver doesn't need to know the internal mechanics to operate it.",
  "codeExample": {
    "language": "Java",
    "code": "class Animal {\n    void speak() { System.out.println(\"Some sound\"); }\n}\n\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Bark\"); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to define all four pillars clearly with simple examples distinguishing each concept.",
  "tags": ["OOP", "Encapsulation", "Abstraction", "Inheritance", "Polymorphism", "Interview"],
  "relatedTopics": ["SOLID Principles", "Composition", "Design Patterns"],
  "references": ["Head First Object-Oriented Analysis and Design"]
},
{
  "id": "ood-002",
  "category": "Object-Oriented Design",
  "topic": "Abstract Class vs Interface",
  "difficulty": "Medium",
  "question": "What is the difference between an Abstract Class and an Interface?",
  "shortAnswer": "Abstract class: partial implementation, single inheritance, can have state. Interface: pure contract, multiple implementation, traditionally no state.",
  "detailedAnswer": "Abstract classes can contain both abstract and concrete methods, along with instance variables representing state, but a class can extend only one abstract class due to single inheritance.\n\nInterfaces traditionally contain only abstract method declarations with no implementation, but a class can implement multiple interfaces, enabling multiple inheritance of behavior. Since Java 8, interfaces can also include default methods with implementations, blurring the line somewhat.",
  "keyPoints": [
    "Abstract class: \"kind of a\" relationship — shared code/state among related subclasses",
    "Interface: \"capability\" — Dog IMPLEMENTS Swimmable, Trainable",
    "Prefer interface when unsure — more flexible, easier to mock in tests"
  ],
  "commonMistakes": [
    "Assuming interfaces can never have implementation (ignoring default methods)",
    "Using abstract classes when multiple inheritance of behavior is needed",
    "Confusing 'is-a' abstract class relationship with 'capability' interface relationship"
  ],
  "followUpQuestions": [
    "Can an interface have method implementations in modern Java?",
    "When would you choose an abstract class over an interface?",
    "How do interfaces support multiple inheritance of behavior?"
  ],
  "realWorldExample": "A Duck class might extend an abstract Bird class while also implementing a Swimmable interface to represent shared capability across unrelated classes.",
  "codeExample": {
    "language": "Java",
    "code": "abstract class Bird {\n    abstract void fly();\n}\n\ninterface Swimmable {\n    void swim();\n}\n\nclass Duck extends Bird implements Swimmable {\n    void fly() { System.out.println(\"Duck flying\"); }\n    public void swim() { System.out.println(\"Duck swimming\"); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain both constructs' capabilities and give a scenario-based justification for choosing one over the other.",
  "tags": ["Abstract Class", "Interface", "OOP", "Interview"],
  "relatedTopics": ["Multiple Inheritance", "Polymorphism", "Design Patterns"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-003",
  "category": "Object-Oriented Design",
  "topic": "Compile-time vs Runtime Polymorphism",
  "difficulty": "Medium",
  "question": "What is Polymorphism? Explain compile-time vs runtime polymorphism.",
  "shortAnswer": "Compile-time: method overloading (resolved at compile time). Runtime: method overriding (resolved at runtime via dynamic dispatch).",
  "detailedAnswer": "Overloading involves multiple methods with the same name but different parameters within the same class; it is resolved by the compiler based on the method signature at the call site.\n\nOverriding involves a subclass redefining a parent method with the identical signature; it is resolved at runtime based on the actual object's type, using dynamic dispatch, implemented via vtables in C++ and similar mechanisms in Java and Python.",
  "keyPoints": [
    "Overloading: same class, different parameter signatures",
    "Overriding: child redefines parent method, identical signature, runtime resolution",
    "Duck typing (Python): if an object has the method, call it — no explicit type check needed"
  ],
  "commonMistakes": [
    "Confusing overloading (compile-time) with overriding (runtime)",
    "Assuming return type alone can differentiate overloaded methods",
    "Not understanding dynamic dispatch mechanics"
  ],
  "followUpQuestions": [
    "How does dynamic dispatch work internally?",
    "What is duck typing and how does it relate to polymorphism?",
    "Can you overload methods by return type alone?"
  ],
  "realWorldExample": "A shape drawing application calls draw() on different shape objects (Circle, Square) and each executes its own overridden logic at runtime.",
  "codeExample": {
    "language": "Java",
    "code": "class Shape {\n    void draw() { System.out.println(\"Drawing shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override\n    void draw() { System.out.println(\"Drawing circle\"); }\n}\n\nShape s = new Circle();\ns.draw(); // Runtime polymorphism: prints 'Drawing circle'"
  },
  "interviewerExpectation": "The interviewer expects a clear distinction between overloading and overriding with correct resolution timing (compile-time vs runtime).",
  "tags": ["Polymorphism", "Overloading", "Overriding", "OOP", "Interview"],
  "relatedTopics": ["Dynamic Dispatch", "Duck Typing", "Inheritance"],
  "references": ["Head First Object-Oriented Analysis and Design"]
},
{
  "id": "ood-004",
  "category": "Object-Oriented Design",
  "topic": "SOLID Principles",
  "difficulty": "Hard",
  "question": "Explain SOLID Principles with examples.",
  "shortAnswer": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
  "detailedAnswer": "Single Responsibility means a class should have only one reason to change. Open/Closed means classes should be open for extension but closed for modification, typically achieved via abstraction.\n\nLiskov Substitution means subclasses must be usable in place of their parent class without breaking correctness. Interface Segregation means clients shouldn't be forced to implement methods they don't use, favoring smaller, focused interfaces. Dependency Inversion means high-level modules should depend on abstractions rather than concrete implementations, often achieved through dependency injection.",
  "keyPoints": [
    "S: separate UserService (auth logic) from UserRepository (DB access)",
    "L: Square overriding Rectangle's setWidth to also change height can break LSP",
    "D: OrderService depends on a PaymentGateway interface, not a concrete StripePayment class"
  ],
  "commonMistakes": [
    "Confusing Open/Closed with simply adding more code without abstraction",
    "Not recognizing Liskov Substitution violations in class hierarchies",
    "Depending directly on concrete classes instead of abstractions"
  ],
  "followUpQuestions": [
    "Can you give an example of a Liskov Substitution violation?",
    "How does Dependency Inversion relate to dependency injection frameworks?",
    "Why is Interface Segregation important in large codebases?"
  ],
  "realWorldExample": "An OrderService class depends on a PaymentGateway interface rather than a specific StripePayment class, allowing payment providers to be swapped without modifying OrderService.",
  "codeExample": {
    "language": "Java",
    "code": "interface PaymentGateway {\n    void pay(double amount);\n}\n\nclass StripePayment implements PaymentGateway {\n    public void pay(double amount) { System.out.println(\"Paid via Stripe: \" + amount); }\n}\n\nclass OrderService {\n    private PaymentGateway gateway;\n    OrderService(PaymentGateway gateway) { this.gateway = gateway; }\n    void checkout(double amount) { gateway.pay(amount); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain all five principles with concrete class-design examples, especially Liskov Substitution and Dependency Inversion.",
  "tags": ["SOLID", "OOP", "Design Principles", "Interview"],
  "relatedTopics": ["Design Patterns", "Dependency Injection", "Abstraction"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "ood-005",
  "category": "Object-Oriented Design",
  "topic": "Design Patterns (Singleton, Factory, Observer)",
  "difficulty": "Hard",
  "question": "What are Design Patterns? Explain Singleton, Factory, and Observer.",
  "shortAnswer": "Reusable OOP solutions to common problems. Singleton: one instance. Factory: object creation. Observer: event notification.",
  "detailedAnswer": "Singleton ensures only one instance of a class exists globally, commonly used for configuration managers or connection pools; its drawback is introducing global state, which can make testing harder.\n\nFactory Method defines an interface for creating objects, letting subclasses decide which concrete class to instantiate, decoupling object creation from usage. Observer defines a one-to-many dependency where, when a subject changes state, all registered observers are notified automatically — commonly used in event systems and the MVC pattern.",
  "keyPoints": [
    "Singleton: private constructor + static getInstance()",
    "Factory: ShapeFactory.create('circle') returns a Circle instance",
    "Observer: EventEmitter in Node.js, @EventListener in Spring"
  ],
  "commonMistakes": [
    "Overusing Singleton, leading to hidden global state and testing issues",
    "Not decoupling creation logic properly in Factory pattern",
    "Forgetting to unsubscribe observers, causing memory leaks"
  ],
  "followUpQuestions": [
    "What are the drawbacks of the Singleton pattern?",
    "How does the Observer pattern relate to the pub-sub model?",
    "What's the difference between Factory Method and Abstract Factory?"
  ],
  "realWorldExample": "Node.js's EventEmitter implements the Observer pattern, allowing multiple listeners to react to a single emitted event.",
  "codeExample": {
    "language": "Java",
    "code": "class Singleton {\n    private static Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) instance = new Singleton();\n        return instance;\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the intent behind each pattern and recognize common pitfalls like Singleton's global state issue.",
  "tags": ["Design Patterns", "Singleton", "Factory", "Observer", "Interview"],
  "relatedTopics": ["SOLID Principles", "Event-Driven Architecture", "MVC"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-006",
  "category": "Object-Oriented Design",
  "topic": "Composition vs Inheritance",
  "difficulty": "Medium",
  "question": "What is the difference between Composition and Inheritance? Why prefer Composition?",
  "shortAnswer": "Inheritance: \"is-a\" tight coupling. Composition: \"has-a\" loose coupling — generally preferred.",
  "detailedAnswer": "Inheritance creates a tight coupling between parent and child classes, where changes to the parent class can unintentionally break child classes, a problem known as the Fragile Base Class Problem. Deep inheritance hierarchies become unmaintainable over time.\n\nComposition assembles objects from other objects, referred to as a 'has-a' relationship, allowing implementations to be swapped at runtime without exposing internal details. 'Favour composition over inheritance' is a well-known principle from the Gang of Four design patterns book.",
  "keyPoints": [
    "Inheritance: rigid hierarchy, deep chains become unmaintainable",
    "Composition: Car HAS-A Engine — swap implementations at runtime",
    "Decorator pattern: uses composition to add behavior without subclassing"
  ],
  "commonMistakes": [
    "Overusing deep inheritance hierarchies leading to fragile code",
    "Not recognizing when composition offers more flexibility",
    "Confusing 'is-a' and 'has-a' relationships when designing classes"
  ],
  "followUpQuestions": [
    "What is the Fragile Base Class Problem?",
    "How does the Decorator pattern use composition?",
    "When would inheritance still be the right choice over composition?"
  ],
  "realWorldExample": "A Car class 'has-a' Engine object rather than 'being' an Engine, allowing different engine types to be swapped without changing the Car class.",
  "codeExample": {
    "language": "Java",
    "code": "class Engine {\n    void start() { System.out.println(\"Engine starting\"); }\n}\n\nclass Car {\n    private Engine engine;\n    Car(Engine engine) { this.engine = engine; }\n    void start() { engine.start(); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to justify why composition is often preferred, citing coupling and flexibility trade-offs.",
  "tags": ["Composition", "Inheritance", "OOP", "Interview"],
  "relatedTopics": ["Decorator Pattern", "SOLID Principles", "Design Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-007",
  "category": "Object-Oriented Design",
  "topic": "Method Overloading",
  "difficulty": "Easy",
  "question": "What is Method Overloading? What are its rules?",
  "shortAnswer": "Method Overloading allows multiple methods with the same name in a class, differing in parameter type, number, or order — resolved at compile time based on the arguments passed.",
  "detailedAnswer": "Overloading enables a more intuitive API, such as a print() method that works whether an int, a String, or a custom object is passed, without needing differently-named methods for each. The compiler determines which overload to call based on the number and types of arguments at the call site, a process known as static or early binding.\n\nMethods must differ in their parameter list, whether by type, number, or order; differing only in return type is not sufficient to overload. Return type can differ, but only in conjunction with a parameter list difference.",
  "keyPoints": [
    "Resolved at compile time based on the exact arguments passed (static binding)",
    "Must differ in parameter type, count, or order — return type alone is insufficient",
    "Python doesn't support true overloading — uses default arguments or *args/**kwargs instead"
  ],
  "commonMistakes": [
    "Assuming return type alone can differentiate two overloaded methods",
    "Trying to overload methods in Python expecting Java-like behavior",
    "Confusing overloading with overriding"
  ],
  "followUpQuestions": [
    "Why isn't differing return type alone sufficient for overloading?",
    "How does Python handle the lack of true method overloading?",
    "What is static binding and how does it relate to overloading?"
  ],
  "realWorldExample": "A Math library might overload an add() method to accept two integers, two doubles, or two custom Vector objects, each resolved based on the argument types passed.",
  "codeExample": {
    "language": "Java",
    "code": "class Calculator {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the compile-time resolution mechanism and correctly state the overloading rules.",
  "tags": ["Method Overloading", "OOP", "Interview"],
  "relatedTopics": ["Method Overriding", "Static Binding", "Polymorphism"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-008",
  "category": "Object-Oriented Design",
  "topic": "Method Overriding",
  "difficulty": "Medium",
  "question": "What is Method Overriding? What are the rules and restrictions?",
  "shortAnswer": "Method Overriding lets a subclass provide its own implementation of a method already defined in its parent class, with the exact same signature — resolved at runtime based on the actual object type.",
  "detailedAnswer": "Overriding is the mechanism behind runtime polymorphism; the JVM or interpreter determines which version to call based on the object's actual type, not the reference type used to call it.\n\nThe method signature must match exactly, the access modifier in the overriding method cannot be more restrictive than the parent's, and a static, final, or private method cannot be overridden, since static methods are resolved at compile time via the reference type rather than at runtime.",
  "keyPoints": [
    "Signature must match exactly; access modifier can be same or less restrictive, never more",
    "final methods cannot be overridden (explicitly prevents subclass modification)",
    "static methods are NOT overridden — they're \"hidden,\" resolved by reference type at compile time"
  ],
  "commonMistakes": [
    "Attempting to override a static or final method",
    "Making the overriding method's access modifier more restrictive than the parent's",
    "Confusing static method hiding with true overriding"
  ],
  "followUpQuestions": [
    "Why can't static methods be overridden?",
    "What happens if you try to make an overriding method's access more restrictive?",
    "How is method hiding different from method overriding?"
  ],
  "realWorldExample": "A payment processing base class defines a process() method that each subclass, like CreditCardPayment and PayPalPayment, overrides with its own implementation.",
  "codeExample": {
    "language": "Java",
    "code": "class Animal {\n    public void speak() { System.out.println(\"Some sound\"); }\n}\n\nclass Cat extends Animal {\n    @Override\n    public void speak() { System.out.println(\"Meow\"); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly state the rules around signature matching, access modifiers, and which method types cannot be overridden.",
  "tags": ["Method Overriding", "Polymorphism", "OOP", "Interview"],
  "relatedTopics": ["Method Overloading", "Dynamic Binding", "Inheritance"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-009",
  "category": "Object-Oriented Design",
  "topic": "Liskov Substitution Principle",
  "difficulty": "Hard",
  "question": "What is the Liskov Substitution Principle (LSP)? Give a concrete violation example.",
  "shortAnswer": "LSP states that objects of a subclass must be substitutable for objects of the parent class without altering the correctness of the program.",
  "detailedAnswer": "LSP requires that a subclass honor the contract, or expected behavior, of its parent class, not just match its method signatures. The classic violation example is Square extending Rectangle, where Rectangle has independent setWidth() and setHeight() operations.\n\nIf Square overrides setWidth() to also change height, to maintain the square property, then code expecting setWidth(5) to change only the width breaks silently when given a Square instead of a Rectangle. Even though Square 'is-a' Rectangle geometrically, it violates the behavioral contract the parent class established, demonstrating that inheritance should model behavioral substitutability, not just real-world categorization.",
  "keyPoints": [
    "LSP violation isn't about the type hierarchy being \"wrong\" geometrically — it's about broken behavioral contracts",
    "Symptom of violation: client code needs instanceof checks to handle a subclass differently — a design smell",
    "Fix: don't force an inheritance relationship when behavioral contracts genuinely differ"
  ],
  "commonMistakes": [
    "Assuming a geometrically valid 'is-a' relationship automatically satisfies LSP",
    "Not recognizing instanceof checks in client code as a design smell indicating LSP violation",
    "Forcing inheritance when composition would better model the relationship"
  ],
  "followUpQuestions": [
    "Why does the Square-Rectangle example violate LSP despite being geometrically valid?",
    "What design smell indicates an LSP violation in client code?",
    "How would you redesign the Square-Rectangle example to avoid this violation?"
  ],
  "realWorldExample": "A ReadOnlyList subclass that throws exceptions when add() is called, inherited from a mutable List class, violates LSP since callers expecting a List can't safely call add() on it.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain LSP in terms of behavioral contracts, not just type hierarchy, using the Square-Rectangle example.",
  "tags": ["Liskov Substitution Principle", "LSP", "SOLID", "OOP", "Interview"],
  "relatedTopics": ["SOLID Principles", "Inheritance", "Design Smells"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "ood-010",
  "category": "Object-Oriented Design",
  "topic": "Constructor Overloading and Copy Constructor",
  "difficulty": "Medium",
  "question": "What is Constructor Overloading? What is a Copy Constructor?",
  "shortAnswer": "Constructor Overloading provides multiple constructors with different parameter lists for flexible object creation. A Copy Constructor creates a new object as a copy of an existing object of the same class.",
  "detailedAnswer": "Constructor overloading allows a class to be instantiated in multiple ways, such as a default constructor setting values to the origin, a constructor accepting specific coordinates, or a copy constructor accepting another instance of the same class.\n\nThe copy constructor specifically takes an existing object of the same class and initializes the new object's fields by copying from it. This is critical to get right for classes containing reference types or pointers, since a naive shallow copy, which copies just the reference, can cause both objects to share the same underlying mutable data, leading to unexpected bugs when one is modified.",
  "keyPoints": [
    "Constructor overloading: multiple ways to instantiate, differing by parameter list",
    "Copy constructor: Point(const Point& other) in C++, or manual implementation in Java/Python",
    "Shallow copy vs Deep copy: shallow copies references (shared mutable state risk); deep copy duplicates nested objects entirely"
  ],
  "commonMistakes": [
    "Implementing a shallow copy when a deep copy is actually needed for mutable reference fields",
    "Not providing a copy constructor for classes containing mutable reference types",
    "Confusing constructor overloading with method overloading rules"
  ],
  "followUpQuestions": [
    "What is the difference between a shallow copy and a deep copy?",
    "Why is a naive copy constructor dangerous for classes with reference fields?",
    "How would you implement a deep copy constructor in Java?"
  ],
  "realWorldExample": "Copying a Person object that contains a mutable Address object requires a deep copy constructor to avoid both Person instances sharing the same Address reference.",
  "codeExample": {
    "language": "Java",
    "code": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n    Point(Point other) { this.x = other.x; this.y = other.y; } // copy constructor\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain constructor overloading and the shallow vs deep copy distinction for the copy constructor.",
  "tags": ["Constructor Overloading", "Copy Constructor", "OOP", "Interview"],
  "relatedTopics": ["Method Overloading", "Shallow Copy", "Deep Copy"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-011",
  "category": "Object-Oriented Design",
  "topic": "is-a vs has-a Relationships",
  "difficulty": "Medium",
  "question": "What is the Difference Between \"has-a\" and \"is-a\" Relationships?",
  "shortAnswer": "\"is-a\" describes inheritance (a Dog IS-A Animal). \"has-a\" describes composition/aggregation (a Car HAS-A Engine).",
  "detailedAnswer": "The 'is-a' relationship implies substitutability, meaning anywhere an Animal is expected, a Dog should work correctly per the Liskov Substitution Principle. This is modeled via inheritance or interface implementation.\n\nThe 'has-a' relationship implies ownership or containment, such as a Car containing an Engine as one of its components, but a Car is not a type of Engine. This is modeled via composition, where the contained object's lifecycle is tied to the container, or aggregation, where the contained object can exist independently.",
  "keyPoints": [
    "is-a: models substitutability, implemented via inheritance/interfaces",
    "has-a: models containment/ownership, implemented via composition/aggregation",
    "Common mistake: using inheritance purely for code reuse when there's no true \"is-a\" relationship"
  ],
  "commonMistakes": [
    "Using inheritance purely for code reuse without a genuine 'is-a' relationship",
    "Confusing 'has-a' composition with 'has-a' aggregation lifecycles",
    "Forcing an inheritance hierarchy when a 'has-a' relationship would be more appropriate"
  ],
  "followUpQuestions": [
    "What is a common example of misusing inheritance instead of composition?",
    "How does the Liskov Substitution Principle relate to the 'is-a' relationship?",
    "How would you decide between 'is-a' and 'has-a' when designing a new class?"
  ],
  "realWorldExample": "A Stack implemented by extending a Vector class in early Java design is a commonly cited misuse of 'is-a' where 'has-a' composition would have been more appropriate.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the two relationship types and identify the common anti-pattern of misusing inheritance for code reuse.",
  "tags": ["is-a", "has-a", "Inheritance", "Composition", "OOP", "Interview"],
  "relatedTopics": ["Composition vs Inheritance", "Aggregation", "Liskov Substitution Principle"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-012",
  "category": "Object-Oriented Design",
  "topic": "Aggregation vs Composition",
  "difficulty": "Medium",
  "question": "What is the difference between Aggregation and Composition?",
  "shortAnswer": "Composition: the contained object's lifecycle is tightly bound to the container — it can't exist independently. Aggregation: a weaker \"has-a\" relationship where the contained object CAN exist independently of the container.",
  "detailedAnswer": "In composition, if the container object is destroyed, the contained object is destroyed too. For example, a House has a Room; if the House object is destroyed, its Room objects have no independent existence and are destroyed as well, representing strong, exclusive ownership.\n\nIn aggregation, the contained object has an independent lifecycle. For example, a University has a Student, but if the University object is destroyed or deallocated, the Student objects continue to exist independently, representing a weaker, shared or non-exclusive ownership relationship.",
  "keyPoints": [
    "Composition: strong ownership — contained object dies when the container dies (House/Room)",
    "Aggregation: weak ownership — contained object can outlive the container (University/Student)",
    "Both are forms of \"has-a,\" differing only in the strength/exclusivity of the ownership"
  ],
  "commonMistakes": [
    "Using composition when the contained object should genuinely have an independent lifecycle",
    "Confusing aggregation's weak ownership with composition's strong ownership",
    "Not modeling the correct lifecycle dependency in class diagrams"
  ],
  "followUpQuestions": [
    "Can you give another real-world example of aggregation versus composition?",
    "How would you represent composition versus aggregation in a UML class diagram?",
    "What happens to contained objects when the container is destroyed in each case?"
  ],
  "realWorldExample": "A University 'has' Students (aggregation, since students can exist independently), while a House 'has' Rooms (composition, since rooms cease to exist without the house).",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish the lifecycle dependency between composition and aggregation with clear examples.",
  "tags": ["Aggregation", "Composition", "OOP", "Interview"],
  "relatedTopics": ["is-a vs has-a", "UML Class Diagram", "Association"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-013",
  "category": "Object-Oriented Design",
  "topic": "Dependency Injection",
  "difficulty": "Medium",
  "question": "What is Dependency Injection? Why is it useful?",
  "shortAnswer": "Dependency Injection is a design technique where an object's dependencies are provided (injected) from outside, rather than the object creating them itself internally.",
  "detailedAnswer": "Without DI, a class might directly instantiate its dependencies inside its constructor, tightly coupling it to a specific implementation and making it impossible to substitute a different or mock implementation without modifying the class's source code.\n\nWith DI, dependencies are passed in from outside, via constructor, setter, or a DI framework, so the class depends only on an abstraction, and any concrete implementation, whether a real dependency, a mock for tests, or a different vendor, can be substituted freely. This directly implements the Dependency Inversion Principle and dramatically improves testability.",
  "keyPoints": [
    "Constructor injection: dependencies passed as constructor parameters — most common and preferred form",
    "Directly enables the Dependency Inversion Principle (high-level modules depend on abstractions)",
    "Critical for unit testing: inject a mock dependency instead of the real one to isolate the test"
  ],
  "commonMistakes": [
    "Instantiating dependencies directly inside a class constructor, tightly coupling implementations",
    "Not recognizing DI's direct connection to the Dependency Inversion Principle",
    "Overcomplicating simple classes with unnecessary DI frameworks"
  ],
  "followUpQuestions": [
    "How does Dependency Injection improve unit testability?",
    "What are the different forms of dependency injection (constructor, setter, field)?",
    "How does DI relate to the Dependency Inversion Principle in SOLID?"
  ],
  "realWorldExample": "A unit test injects a mock Database implementation into OrderService instead of a real database connection, isolating the test from external dependencies.",
  "codeExample": {
    "language": "Java",
    "code": "interface Database {\n    void save(String data);\n}\n\nclass OrderService {\n    private Database db;\n    OrderService(Database db) { this.db = db; } // constructor injection\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how DI decouples classes from concrete dependencies and improves testability.",
  "tags": ["Dependency Injection", "SOLID", "OOP", "Interview"],
  "relatedTopics": ["Dependency Inversion Principle", "Unit Testing", "SOLID Principles"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "ood-014",
  "category": "Object-Oriented Design",
  "topic": "Decorator Design Pattern",
  "difficulty": "Hard",
  "question": "What is the Decorator Design Pattern?",
  "shortAnswer": "The Decorator Pattern dynamically adds new behavior/responsibilities to an object at runtime, without modifying its class or affecting other instances of the same class.",
  "detailedAnswer": "Instead of creating a rigid inheritance hierarchy to cover every possible combination of features, which explodes combinatorially, the Decorator pattern wraps the base object with decorator objects that implement the same interface and add extra behavior before or after delegating to the wrapped object.\n\nEach decorator can be layered, building up combined behavior dynamically at runtime entirely through composition, avoiding the combinatorial subclass explosion. Java's I/O streams are a classic real-world example of this pattern.",
  "keyPoints": [
    "Avoids \"subclass explosion\" from trying to cover every feature combination via inheritance",
    "Decorators implement the same interface as the object they wrap, so they're interchangeable",
    "Real-world example: Java I/O stream wrapping — BufferedReader wraps FileReader wraps..."
  ],
  "commonMistakes": [
    "Confusing Decorator (adds behavior, same interface) with Adapter (changes the interface)",
    "Using inheritance to cover every feature combination instead of layering decorators",
    "Not implementing the same interface as the wrapped object, breaking interchangeability"
  ],
  "followUpQuestions": [
    "How does the Decorator pattern differ from the Adapter pattern?",
    "How does Java's I/O stream design exemplify the Decorator pattern?",
    "What problem does the Decorator pattern solve compared to a rigid inheritance hierarchy?"
  ],
  "realWorldExample": "Java's BufferedReader(new FileReader(\"file.txt\")) wraps a FileReader with buffering behavior, exemplifying the Decorator pattern.",
  "codeExample": {
    "language": "Java",
    "code": "interface Coffee { double cost(); }\n\nclass BasicCoffee implements Coffee {\n    public double cost() { return 2.0; }\n}\n\nclass MilkDecorator implements Coffee {\n    private Coffee coffee;\n    MilkDecorator(Coffee coffee) { this.coffee = coffee; }\n    public double cost() { return coffee.cost() + 0.5; }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how decorators avoid subclass explosion and distinguish this pattern from Adapter.",
  "tags": ["Decorator Pattern", "Design Patterns", "OOP", "Interview"],
  "relatedTopics": ["Adapter Pattern", "Composition", "Design Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-015",
  "category": "Object-Oriented Design",
  "topic": "Static vs Dynamic Binding",
  "difficulty": "Hard",
  "question": "What is the Difference Between Static Binding and Dynamic Binding?",
  "shortAnswer": "Static (early) Binding: the method to call is determined at compile time. Dynamic (late) Binding: the method to call is determined at runtime, based on the actual object type.",
  "detailedAnswer": "Static binding applies to overloaded methods, static methods, and private methods, since the compiler has enough information at compile time to definitively determine exactly which method implementation will be called, independent of runtime object state.\n\nDynamic binding applies to overridden, or virtual, methods; the compiler only knows the reference type at compile time, but the actual method invoked depends on the object's actual runtime type, resolved via a virtual method table lookup during execution. This is the fundamental mechanism that makes runtime polymorphism possible.",
  "keyPoints": [
    "Static binding: overloaded, static, private, and final methods — resolved at compile time",
    "Dynamic binding: overridden (virtual) methods — resolved at runtime via vtable lookup",
    "Dynamic binding is the underlying mechanism enabling runtime polymorphism to work correctly"
  ],
  "commonMistakes": [
    "Assuming static methods participate in dynamic binding like overridden methods",
    "Confusing the reference type with the actual runtime object type",
    "Not knowing vtable lookup is the mechanism behind dynamic binding"
  ],
  "followUpQuestions": [
    "Why are static methods resolved via static binding rather than dynamic binding?",
    "What is a vtable and how does it enable dynamic binding?",
    "How does the reference type differ from the actual object type in dynamic binding?"
  ],
  "realWorldExample": "Calling a method through a parent class reference pointing to a child object invokes the child's overridden version due to dynamic binding, even though the reference type is the parent.",
  "codeExample": {
    "language": "Java",
    "code": "Animal a = new Dog(); // reference type Animal, actual type Dog\na.speak(); // dynamic binding calls Dog's speak() at runtime"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly classify which method types use static vs dynamic binding and explain the vtable mechanism.",
  "tags": ["Static Binding", "Dynamic Binding", "Polymorphism", "OOP", "Interview"],
  "relatedTopics": ["Method Overriding", "Method Overloading", "Polymorphism"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-016",
  "category": "Object-Oriented Design",
  "topic": "Observer Design Pattern",
  "difficulty": "Medium",
  "question": "What is the Observer Design Pattern in more depth? What problem does it solve?",
  "shortAnswer": "Observer Pattern defines a one-to-many dependency between objects, so that when one object (Subject) changes state, all its dependents (Observers) are automatically notified and updated.",
  "detailedAnswer": "This pattern decouples the Subject from its Observers; the Subject only knows it has a list of Observer objects implementing a common interface, typically an update() method, and doesn't need to know anything about their concrete types or what they actually do in response. New observer types can be added without modifying the Subject's code at all, adhering to the Open/Closed Principle.\n\nReal-world applications include GUI event handling, the classic MVC pattern where the View observes the Model, and reactive programming libraries. A common pitfall is the 'lapsed listener' memory leak, where forgetting to unsubscribe an observer keeps it, and anything it references, alive indefinitely.",
  "keyPoints": [
    "Subject maintains a list of Observers, notifying all of them on state change via a common interface",
    "Decouples subject from observers — new observer types added without modifying the subject",
    "Common pitfall: \"lapsed listener\" — forgetting to unsubscribe causes memory leaks"
  ],
  "commonMistakes": [
    "Forgetting to unsubscribe observers, causing memory leaks (lapsed listener problem)",
    "Tightly coupling the Subject to specific Observer implementations",
    "Not using a common interface for all observers, breaking extensibility"
  ],
  "followUpQuestions": [
    "What is the 'lapsed listener' problem and how would you prevent it?",
    "How does the Observer pattern relate to the MVC architectural pattern?",
    "How does Observer differ from the Publish-Subscribe pattern?"
  ],
  "realWorldExample": "In the MVC pattern, a View observes a Model and automatically re-renders whenever the Model's state changes, notifying all registered Views.",
  "codeExample": {
    "language": "Java",
    "code": "interface Observer { void update(String event); }\n\nclass Subject {\n    private List<Observer> observers = new ArrayList<>();\n    void subscribe(Observer o) { observers.add(o); }\n    void notifyAll(String event) {\n        for (Observer o : observers) o.update(event);\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the decoupling benefit and identify the lapsed listener memory leak pitfall.",
  "tags": ["Observer Pattern", "Design Patterns", "OOP", "Interview"],
  "relatedTopics": ["MVC", "Event-Driven Architecture", "Design Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-017",
  "category": "Object-Oriented Design",
  "topic": "Builder Design Pattern",
  "difficulty": "Medium",
  "question": "What is the Builder Design Pattern? When should you use it?",
  "shortAnswer": "The Builder Pattern constructs a complex object step-by-step, separating the construction process from the final representation — useful when an object has many optional parameters.",
  "detailedAnswer": "When a class has many optional fields, using a constructor with many parameters becomes unwieldy and error-prone, since it's easy to mix up parameter order, especially with several parameters of the same type.\n\nThe Builder pattern uses a separate Builder object with fluent, chainable setter-like methods, each returning the builder itself, allowing readable, self-documenting object construction where only the desired fields need to be specified, and the final build() call assembles the actual immutable object. This is especially valuable for objects intended to be immutable once created, since it avoids needing a public setter for every field just to support construction.",
  "keyPoints": [
    "Solves the \"telescoping constructor\" anti-pattern — too many constructor overloads for optional parameters",
    "Fluent interface: chained method calls, each returning the builder itself for readability",
    "Common in test code: building complex test fixture objects with only the relevant fields set explicitly"
  ],
  "commonMistakes": [
    "Using a long telescoping constructor instead of a Builder for classes with many optional fields",
    "Not making the builder methods return the builder itself, breaking the fluent chaining",
    "Forgetting the build() call is what assembles the final immutable object"
  ],
  "followUpQuestions": [
    "What is the \"telescoping constructor\" anti-pattern the Builder solves?",
    "Why is the Builder pattern especially useful for immutable objects?",
    "How is a fluent interface implemented in the Builder pattern?"
  ],
  "realWorldExample": "A test suite uses a Builder to construct complex test fixture objects, setting only the fields relevant to each specific test case.",
  "codeExample": {
    "language": "Java",
    "code": "class Person {\n    private final String name;\n    private final int age;\n\n    private Person(Builder b) { this.name = b.name; this.age = b.age; }\n\n    static class Builder {\n        private String name;\n        private int age;\n        Builder setName(String name) { this.name = name; return this; }\n        Builder setAge(int age) { this.age = age; return this; }\n        Person build() { return new Person(this); }\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the telescoping constructor problem the Builder solves and describe the fluent interface pattern.",
  "tags": ["Builder Pattern", "Design Patterns", "OOP", "Interview"],
  "relatedTopics": ["Immutability", "Fluent Interface", "Design Patterns"],
  "references": ["Effective Java - Joshua Bloch"]
},
{
  "id": "ood-018",
  "category": "Object-Oriented Design",
  "topic": "UML Class Diagrams",
  "difficulty": "Medium",
  "question": "What is a Class Diagram in UML? What are the main relationship types shown?",
  "shortAnswer": "A UML Class Diagram visually represents a system's classes, their attributes, methods, and the relationships between them (inheritance, association, aggregation, composition, dependency).",
  "detailedAnswer": "Class diagrams show each class as a box divided into three sections: class name, attributes with visibility markers, and methods. Relationships between classes are shown with different arrow or line styles.\n\nInheritance uses a hollow triangle arrow pointing to the parent, Interface Implementation uses a dashed line with a hollow triangle, Association uses a plain line for a general 'uses' relationship, Aggregation uses a line with a hollow diamond at the container end representing weak ownership, Composition uses a line with a filled diamond representing strong ownership, and Dependency uses a dashed arrow for one class temporarily using another.",
  "keyPoints": [
    "Visibility markers: + public, - private, # protected, ~ package-private",
    "Hollow triangle = inheritance/implementation; filled diamond = composition; hollow diamond = aggregation",
    "Multiplicity notation (1, 0..1, *, 1..*) indicates how many instances participate in a relationship"
  ],
  "commonMistakes": [
    "Confusing the hollow diamond (aggregation) with the filled diamond (composition) notation",
    "Not knowing what visibility markers like + and - represent",
    "Forgetting multiplicity notation indicates cardinality between related classes"
  ],
  "followUpQuestions": [
    "What is the difference between the hollow and filled diamond notations?",
    "How would you represent an interface implementation in a class diagram?",
    "What does multiplicity notation like 1..* mean in a relationship?"
  ],
  "realWorldExample": "A software architecture team uses a UML class diagram during a design review to communicate how the Order, Customer, and Product classes relate to each other before writing any code.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly identify the notation for each relationship type and explain visibility markers.",
  "tags": ["UML", "Class Diagram", "OOP", "Interview"],
  "relatedTopics": ["Association", "Aggregation", "Composition"],
  "references": ["UML Distilled - Martin Fowler"]
},
{
  "id": "ood-019",
  "category": "Object-Oriented Design",
  "topic": "Encapsulation vs Data Hiding",
  "difficulty": "Medium",
  "question": "What is Encapsulation vs Data Hiding? Are they the same thing?",
  "shortAnswer": "They're closely related but distinct: Encapsulation is the broader concept of bundling data and methods together into a single unit. Data Hiding specifically refers to restricting direct external access to an object's internal state.",
  "detailedAnswer": "Encapsulation is fundamentally about combining related data and the operations that act on that data into one cohesive unit, a class, which is a structural or organizational concept. Data Hiding is a specific technique used to achieve better encapsulation, by making fields private and only exposing controlled access through public methods, preventing external code from directly manipulating internal state in ways that could leave the object in an invalid state.\n\nSome argue encapsulation can technically exist without full data hiding, such as a class with public fields still being structurally 'encapsulated' though poorly, but in practice the two concepts are used together and often conflated in casual discussion.",
  "keyPoints": [
    "Encapsulation: bundling data + behavior together into a cohesive unit — structural concept",
    "Data hiding: the technique of restricting direct access via private fields + controlled public methods",
    "In practice, strong encapsulation almost always implies proper data hiding is also being used"
  ],
  "commonMistakes": [
    "Treating encapsulation and data hiding as entirely unrelated concepts",
    "Assuming a class with public fields has no encapsulation at all",
    "Not recognizing data hiding as a technique used to achieve stronger encapsulation"
  ],
  "followUpQuestions": [
    "Can a class be encapsulated without practicing data hiding?",
    "Why is data hiding considered a technique rather than a standalone concept?",
    "How do getters and setters relate to data hiding?"
  ],
  "realWorldExample": "A BankAccount class bundles balance data with deposit() and withdraw() methods (encapsulation), while making the balance field private (data hiding) to prevent direct external modification.",
  "codeExample": {
    "language": "Java",
    "code": "class BankAccount {\n    private double balance; // data hiding\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n\n    public double getBalance() { return balance; }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the structural vs technique distinction between encapsulation and data hiding, even if the two are often used interchangeably.",
  "tags": ["Encapsulation", "Data Hiding", "OOP", "Interview"],
  "relatedTopics": ["Abstraction", "Access Modifiers", "OOP Pillars"],
  "references": ["Head First Object-Oriented Analysis and Design"]
},
{
  "id": "ood-020",
  "category": "Object-Oriented Design",
  "topic": "Strategy Design Pattern",
  "difficulty": "Medium",
  "question": "What is the Strategy Design Pattern?",
  "shortAnswer": "Strategy Pattern defines a family of interchangeable algorithms, encapsulates each one, and lets the algorithm be selected/swapped at runtime without changing the client code.",
  "detailedAnswer": "Instead of a long if-else or switch statement choosing behavior, such as different sorting algorithms, payment methods, or validation rules, the Strategy Pattern extracts each algorithm into its own class implementing a common interface.\n\nThe client holds a reference to the interface and can swap the actual strategy object at runtime. This follows the Open/Closed Principle, since adding a new strategy means adding a new class rather than modifying existing conditional logic.",
  "keyPoints": [
    "Client holds a Strategy interface reference, not a concrete implementation directly",
    "Adding new behavior = new class, existing code untouched (Open/Closed Principle)",
    "Java's Comparator interface is a real-world example of the Strategy Pattern in the standard library"
  ],
  "commonMistakes": [
    "Using long if-else chains instead of extracting algorithms into Strategy classes",
    "Not adhering to the Open/Closed Principle when adding new strategies",
    "Confusing Strategy with State pattern, which changes behavior based on internal state transitions"
  ],
  "followUpQuestions": [
    "How does the Strategy pattern relate to the Open/Closed Principle?",
    "How is the Comparator interface in Java an example of Strategy?",
    "What's the difference between Strategy and State design patterns?"
  ],
  "realWorldExample": "Java's Comparator interface lets developers pass different sorting strategies to Collections.sort() without modifying the sort algorithm itself.",
  "codeExample": {
    "language": "Java",
    "code": "interface PaymentStrategy { void pay(double amount); }\n\nclass CreditCardStrategy implements PaymentStrategy {\n    public void pay(double amount) { System.out.println(\"Paid via credit card\"); }\n}\n\nclass PayPalStrategy implements PaymentStrategy {\n    public void pay(double amount) { System.out.println(\"Paid via PayPal\"); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how Strategy replaces conditional logic with interchangeable classes and adheres to the Open/Closed Principle.",
  "tags": ["Strategy Pattern", "Design Patterns", "OOP", "Interview"],
  "relatedTopics": ["SOLID Principles", "State Pattern", "Design Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-021",
  "category": "Object-Oriented Design",
  "topic": "Association vs Aggregation vs Composition",
  "difficulty": "Hard",
  "question": "What is the difference between Association, Aggregation, and Composition (as a comparison of all three)?",
  "shortAnswer": "Association: general relationship, \"uses-a\" — two independent classes reference each other. Aggregation: weak \"has-a\" — contained object can exist independently. Composition: strong \"has-a\" — contained object's lifecycle is bound to the container.",
  "detailedAnswer": "Association is the most general relationship; two classes are related and interact, but neither owns the other, such as a Teacher teaching a Student, where both exist entirely independently of this relationship.\n\nAggregation is a specialized association implying 'has-a' with independent lifecycles, such as a University having Students who exist outside the University context. Composition is the strongest form, 'has-a' with a tightly bound lifecycle, such as a Car having an Engine that has no independent existence separate from its Car in this model.",
  "keyPoints": [
    "Association: loosest — independent classes simply interact/reference each other",
    "Aggregation: \"has-a\" with independent lifecycles (whole-part, but part survives without whole)",
    "Composition: \"has-a\" with dependent lifecycles (whole-part, part dies with the whole)"
  ],
  "commonMistakes": [
    "Confusing Association's general interaction with Aggregation's specific 'has-a' ownership",
    "Not placing the three relationships correctly on the loose-to-strong spectrum",
    "Using composition when the relationship is actually a looser association"
  ],
  "followUpQuestions": [
    "Where does Association sit relative to Aggregation and Composition in terms of coupling strength?",
    "Can you give an example of a pure Association that isn't Aggregation or Composition?",
    "How would you decide which of the three relationships best models a given class pair?"
  ],
  "realWorldExample": "A Teacher and Student have an Association (they interact but neither owns the other), a University and Student have Aggregation, and a Car and Engine have Composition.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to place all three relationships correctly on the spectrum from loosest to strongest coupling with distinct examples for each.",
  "tags": ["Association", "Aggregation", "Composition", "OOP", "Interview"],
  "relatedTopics": ["UML Class Diagram", "is-a vs has-a", "Object Relationships"],
  "references": ["UML Distilled - Martin Fowler"]
},
{
  "id": "ood-022",
  "category": "Object-Oriented Design",
  "topic": "Cohesion and Coupling",
  "difficulty": "Medium",
  "question": "What is Cohesion and Coupling? Why do we want High Cohesion and Low Coupling?",
  "shortAnswer": "Cohesion measures how closely related and focused a single module/class's responsibilities are. Coupling measures how dependent modules/classes are on each other. Good design aims for HIGH cohesion and LOW coupling.",
  "detailedAnswer": "High Cohesion means a class has a single, well-defined, focused purpose, with all its methods and data working together toward that one responsibility, directly related to the Single Responsibility Principle. Low cohesion, where a class does many unrelated things, makes code harder to understand, test, and maintain.\n\nLow Coupling means classes or modules have minimal knowledge of and dependency on each other's internal details, so changes to one class are unlikely to ripple out and break unrelated classes. High coupling, where classes are tightly intertwined and directly access each other's internals, makes the system fragile and hard to modify safely.",
  "keyPoints": [
    "High cohesion: a class does ONE thing well — related methods/data grouped together logically",
    "Low coupling: classes interact through minimal, well-defined interfaces — not internal details",
    "Dependency Injection and programming to interfaces are primary techniques for reducing coupling"
  ],
  "commonMistakes": [
    "Designing classes with low cohesion that handle many unrelated responsibilities",
    "Allowing classes to access each other's internal details directly, increasing coupling",
    "Not recognizing Dependency Injection as a technique for reducing coupling"
  ],
  "followUpQuestions": [
    "How does the Single Responsibility Principle relate to cohesion?",
    "What techniques help reduce coupling between classes?",
    "Can you give an example of a low-cohesion class and how you'd refactor it?"
  ],
  "realWorldExample": "A well-designed UserService handles only user-related logic (high cohesion) and depends on a Database interface rather than a specific database implementation (low coupling).",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain both concepts and articulate why high cohesion and low coupling together produce more maintainable systems.",
  "tags": ["Cohesion", "Coupling", "OOP", "Software Design", "Interview"],
  "relatedTopics": ["SOLID Principles", "Dependency Injection", "Single Responsibility Principle"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "ood-023",
  "category": "Object-Oriented Design",
  "topic": "Adapter Design Pattern",
  "difficulty": "Medium",
  "question": "What is the Adapter Design Pattern? Give a real-world use case.",
  "shortAnswer": "The Adapter Pattern converts the interface of one class into another interface that a client expects, allowing incompatible interfaces to work together without modifying either existing class.",
  "detailedAnswer": "This pattern is used when integrating an existing class, often third-party or legacy code that can't be modified, whose interface doesn't match what the client code expects. The Adapter wraps the incompatible class and translates calls from the expected interface into calls the wrapped class actually understands, acting as a bridge or translator between the two.\n\nA real-world example: an application expects a PaymentProcessor interface with a pay(amount) method, but a third-party payment library exposes submitTransaction(cents, currency). A PaymentAdapter implementing PaymentProcessor would internally call the third-party library's actual method, converting parameters and behavior as needed.",
  "keyPoints": [
    "Solves the problem of integrating incompatible interfaces WITHOUT modifying either existing class",
    "Common real-world use: wrapping a third-party/legacy library to match your application's expected interface",
    "Different from Decorator: Adapter changes the INTERFACE, Decorator adds behavior while keeping the SAME interface"
  ],
  "commonMistakes": [
    "Confusing Adapter (changes interface) with Decorator (keeps same interface, adds behavior)",
    "Modifying the third-party or legacy class directly instead of wrapping it with an adapter",
    "Not recognizing when an adapter is needed versus simply refactoring the client code"
  ],
  "followUpQuestions": [
    "How does Adapter differ from Decorator?",
    "What's a real-world scenario where you'd need to write an adapter?",
    "Why is modifying the third-party library directly not a good solution?"
  ],
  "realWorldExample": "An application integrating an old XML-based payment library writes an adapter to expose it through a modern JSON-based PaymentProcessor interface expected by the rest of the codebase.",
  "codeExample": {
    "language": "Java",
    "code": "interface PaymentProcessor { void pay(double amount); }\n\nclass ThirdPartyPaymentLibrary {\n    void submitTransaction(int cents, String currency) { /* ... */ }\n}\n\nclass PaymentAdapter implements PaymentProcessor {\n    private ThirdPartyPaymentLibrary library = new ThirdPartyPaymentLibrary();\n    public void pay(double amount) {\n        library.submitTransaction((int)(amount * 100), \"USD\");\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the interface-translation purpose of Adapter and distinguish it clearly from Decorator.",
  "tags": ["Adapter Pattern", "Design Patterns", "OOP", "Interview"],
  "relatedTopics": ["Decorator Pattern", "Design Patterns", "Legacy Integration"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "ood-024",
  "category": "Object-Oriented Design",
  "topic": "Abstraction vs Encapsulation",
  "difficulty": "Medium",
  "question": "What is Abstraction? How is it different from Encapsulation?",
  "shortAnswer": "Abstraction hides implementation COMPLEXITY, focusing on WHAT an object does. Encapsulation hides implementation DATA, focusing on protecting HOW it's done — they're complementary but distinct concepts.",
  "detailedAnswer": "Abstraction is about managing complexity at the design level, deciding what details are relevant to expose to a user of a class versus what internal complexity should be hidden away, such as a List interface exposing add(), remove(), and get() without the caller needing to know whether it's implemented as an ArrayList or LinkedList internally.\n\nEncapsulation is more specifically about protecting an object's internal state from being directly and uncontrollably accessed or modified from outside, using access modifiers to enforce that state changes only happen through defined, validated methods. Abstraction is a design-level concept, while encapsulation is an implementation-level technique, though abstraction is often achieved partly through encapsulation.",
  "keyPoints": [
    "Abstraction: design-level — deciding what complexity to hide from the API consumer (the \"what\")",
    "Encapsulation: implementation-level — protecting internal state via access control (the \"how\")",
    "Interfaces/abstract classes primarily achieve abstraction; private fields + getters/setters achieve encapsulation"
  ],
  "commonMistakes": [
    "Treating abstraction and encapsulation as fully synonymous concepts",
    "Confusing which mechanism (interfaces vs private fields) primarily achieves each concept",
    "Not recognizing abstraction as a design-level decision versus encapsulation as an implementation technique"
  ],
  "followUpQuestions": [
    "How does an interface achieve abstraction without necessarily involving encapsulation?",
    "Can you give an example where abstraction and encapsulation work together?",
    "Why is abstraction considered a design-level concept while encapsulation is implementation-level?"
  ],
  "realWorldExample": "The List interface in Java achieves abstraction by exposing add(), remove(), and get() without revealing whether the underlying implementation is an ArrayList or LinkedList.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish the design-level (what) versus implementation-level (how) nature of abstraction and encapsulation.",
  "tags": ["Abstraction", "Encapsulation", "OOP", "Interview"],
  "relatedTopics": ["Interfaces", "Data Hiding", "OOP Pillars"],
  "references": ["Head First Object-Oriented Analysis and Design"]
},
{
  "id": "ood-025",
  "category": "Object-Oriented Design",
  "topic": "Class vs Object",
  "difficulty": "Easy",
  "question": "What is the Difference Between a Class and an Object?",
  "shortAnswer": "A Class is a blueprint/template defining the structure (fields) and behavior (methods) that objects of that type will have. An Object is a concrete instance of a class, with actual values stored in memory.",
  "detailedAnswer": "A class exists only as a definition or template at the code level; it doesn't consume memory for instance data until objects are actually created from it, though the class metadata itself does exist in memory once loaded. An object is a specific instantiation of a class, created via a constructor call, occupying actual memory and holding concrete values for each of the fields the class defines.\n\nMultiple objects can be created from the same class, each with independent field values but sharing the same defined structure and behavior. The relationship is often explained via analogy: a class is like an architectural blueprint for a house, while each object is an actual physical house built from that blueprint.",
  "keyPoints": [
    "Class: compile-time definition/blueprint — no memory allocated for instance data until objects exist",
    "Object: runtime instance — actual memory allocated, holds concrete field values",
    "Multiple objects from the same class share structure/behavior but have independent state"
  ],
  "commonMistakes": [
    "Assuming a class itself consumes memory for instance data before any objects are created",
    "Confusing the class blueprint with a specific object instance",
    "Not recognizing that multiple objects from the same class maintain independent state"
  ],
  "followUpQuestions": [
    "Does a class consume any memory before objects are created from it?",
    "How does the blueprint analogy help explain the class-object relationship?",
    "Can two objects of the same class have different field values?"
  ],
  "realWorldExample": "A Car class defines fields like color and speed, while myCar = new Car() creates an actual object with specific values, such as color = 'red' and speed = 0.",
  "codeExample": {
    "language": "Java",
    "code": "class Car {\n    String color;\n    int speed;\n}\n\nCar myCar = new Car(); // object instance\nmyCar.color = \"red\";"
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the compile-time blueprint (class) from the runtime instance (object) using a concrete example.",
  "tags": ["Class", "Object", "OOP", "Interview"],
  "relatedTopics": ["Constructors", "Instance Variables", "OOP Basics"],
  "references": ["Head First Object-Oriented Analysis and Design"]
  },
{
  "id": "dp-001",
  "category": "Design Patterns",
  "topic": "Gang of Four Pattern Categories",
  "difficulty": "Easy",
  "question": "What are Design Patterns? What are the three main categories (Gang of Four)?",
  "shortAnswer": "Design Patterns are reusable, proven solutions to common software design problems. GoF categorizes them into Creational, Structural, and Behavioral.",
  "detailedAnswer": "The Gang of Four book, published in 1994, formalized 23 classic design patterns into three categories. Creational patterns deal with object creation mechanisms, such as Singleton, Factory, Builder, Prototype, and Abstract Factory, trying to create objects in a way suited to the situation.\n\nStructural patterns deal with object composition and relationships, such as Adapter, Decorator, Facade, Composite, Proxy, and Bridge, forming larger structures from individual objects or classes. Behavioral patterns deal with communication and responsibility distribution between objects, such as Observer, Strategy, Command, State, Template Method, Iterator, and Chain of Responsibility.",
  "keyPoints": [
    "Creational: HOW objects are created (Singleton, Factory, Builder)",
    "Structural: HOW objects/classes are composed into larger structures (Adapter, Facade, Proxy)",
    "Behavioral: HOW objects communicate and distribute responsibility (Observer, Strategy, Command)"
  ],
  "commonMistakes": [
    "Misclassifying a pattern into the wrong category",
    "Not knowing the origin of the term 'Gang of Four'",
    "Assuming all 23 GoF patterns are equally commonly used today"
  ],
  "followUpQuestions": [
    "Can you name a pattern from each of the three categories?",
    "Why are Creational patterns considered separate from Structural patterns?",
    "Which category would the Observer pattern fall under and why?"
  ],
  "realWorldExample": "A framework like Spring uses Creational patterns (Factory, Singleton) for bean management, Structural patterns (Proxy) for AOP, and Behavioral patterns (Observer) for event handling.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly categorize patterns and explain the distinguishing focus of each category.",
  "tags": ["Design Patterns", "Gang of Four", "Interview"],
  "relatedTopics": ["Creational Patterns", "Structural Patterns", "Behavioral Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-002",
  "category": "Design Patterns",
  "topic": "Singleton Pattern Deep Dive",
  "difficulty": "Medium",
  "question": "What is the Singleton Pattern? What are its criticisms and modern alternatives?",
  "shortAnswer": "Singleton ensures only one instance of a class exists globally with a single access point. Criticized for introducing global state and hurting testability.",
  "detailedAnswer": "The implementation uses a private constructor plus a static method, typically getInstance(), that creates the instance only on first call and returns the same instance thereafter. In multithreaded environments, this requires careful handling, such as double-checked locking or eager initialization, to avoid race conditions creating multiple instances.\n\nCriticisms include introducing hidden global state, since any code anywhere can access or modify it, making unit testing difficult because a mock instance can't easily be substituted, and potentially hiding poor architecture, since excessive singletons often indicate insufficient dependency injection. A modern alternative is to use Dependency Injection to provide a single shared instance explicitly, rather than relying on a global static accessor.",
  "keyPoints": [
    "Double-checked locking: thread-safe lazy initialization without locking on every access",
    "Testability problem: hard-coded getInstance() calls can't be swapped for a mock in tests",
    "Modern preference: DI containers manage single-instance (\"singleton-scoped\") objects explicitly"
  ],
  "commonMistakes": [
    "Implementing Singleton without thread safety considerations in multithreaded environments",
    "Overusing Singleton where dependency injection would be more testable",
    "Not recognizing hard-coded static access as a testability anti-pattern"
  ],
  "followUpQuestions": [
    "How does double-checked locking work for thread-safe Singleton initialization?",
    "Why do DI containers make Singleton usage more testable?",
    "What are the risks of using Singleton for shared mutable state?"
  ],
  "realWorldExample": "A DI framework like Spring manages 'singleton-scoped' beans explicitly through configuration rather than relying on a static getInstance() method.",
  "codeExample": {
    "language": "Java",
    "code": "class Singleton {\n    private static volatile Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) instance = new Singleton();\n            }\n        }\n        return instance;\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain thread-safe implementation and articulate the testability criticisms with a modern DI-based alternative.",
  "tags": ["Singleton", "Design Patterns", "Interview"],
  "relatedTopics": ["Dependency Injection", "Thread Safety", "Global State"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-003",
  "category": "Design Patterns",
  "topic": "Factory Method vs Abstract Factory",
  "difficulty": "Medium",
  "question": "What is the Factory Method Pattern vs the Abstract Factory Pattern?",
  "shortAnswer": "Factory Method creates ONE type of object, letting a subclass or parameter decide the concrete class. Abstract Factory creates FAMILIES of related objects that must be used together.",
  "detailedAnswer": "Factory Method defines a single creation method, such as ShapeFactory.create(\"circle\") returning a Circle. Abstract Factory operates one level higher, providing an interface for creating multiple related products consistently, such as a UIFactory producing a matching Button, Checkbox, and ScrollBar.\n\nThis ensures all created components belong to the same visual theme, such as a 'Windows' style or 'Mac' style, preventing accidentally mixing incompatible components from different families. Abstract Factory typically uses multiple Factory Methods internally to produce each family member.",
  "keyPoints": [
    "Factory Method: ONE product type, decided by a parameter or overriding subclass",
    "Abstract Factory: FAMILIES of related products, ensures consistency across them",
    "Abstract Factory typically uses multiple Factory Methods internally to produce each family member"
  ],
  "commonMistakes": [
    "Confusing Factory Method's single-product focus with Abstract Factory's family-of-products focus",
    "Not recognizing Abstract Factory's role in preventing mismatched component families",
    "Assuming the two patterns are interchangeable"
  ],
  "followUpQuestions": [
    "How does Abstract Factory prevent mixing incompatible components?",
    "Can you give an example where Factory Method would be sufficient without Abstract Factory?",
    "How does Abstract Factory typically use Factory Methods internally?"
  ],
  "realWorldExample": "A cross-platform UI toolkit uses an Abstract Factory to ensure that when a 'Mac' theme is selected, all generated buttons, checkboxes, and scrollbars consistently use Mac-style rendering.",
  "codeExample": {
    "language": "Java",
    "code": "interface UIFactory {\n    Button createButton();\n    Checkbox createCheckbox();\n}\n\nclass MacUIFactory implements UIFactory {\n    public Button createButton() { return new MacButton(); }\n    public Checkbox createCheckbox() { return new MacCheckbox(); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish single-product creation from family-of-products creation with a concrete UI or similar example.",
  "tags": ["Factory Method", "Abstract Factory", "Design Patterns", "Interview"],
  "relatedTopics": ["Creational Patterns", "Builder Pattern", "Prototype Pattern"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-004",
  "category": "Design Patterns",
  "topic": "Prototype Pattern",
  "difficulty": "Medium",
  "question": "What is the Prototype Design Pattern?",
  "shortAnswer": "The Prototype Pattern creates new objects by cloning an existing object (a \"prototype\") rather than instantiating a class from scratch.",
  "detailedAnswer": "This is useful when object creation is expensive, such as involving a costly database query or complex computation to set up initial state. Instead of repeating that expensive setup for every new object, a fully-configured prototype is created once and then cloned whenever a new similar object is needed, only modifying the specific fields that differ.\n\nMost languages provide built-in support, such as Java's Cloneable interface, Python's copy.deepcopy(), and JavaScript's Object.create(). A critical detail is correctly distinguishing between shallow copy, where nested objects share the same mutable state, and deep copy, where nested objects are recursively copied and fully independent.",
  "keyPoints": [
    "Useful when object creation is expensive — clone a pre-configured template instead",
    "Shallow clone: nested objects/references are shared between original and clone (risk of unintended mutation)",
    "Deep clone: nested objects are fully duplicated — original and clone are completely independent"
  ],
  "commonMistakes": [
    "Using a shallow clone when nested mutable state should be fully independent",
    "Not knowing built-in language support like Java's Cloneable or Python's deepcopy",
    "Confusing Prototype with Builder, which constructs rather than clones"
  ],
  "followUpQuestions": [
    "What is the difference between shallow and deep cloning?",
    "When is Prototype preferable to simply calling a constructor?",
    "What built-in language mechanisms support the Prototype pattern?"
  ],
  "realWorldExample": "A game engine clones a pre-configured 'enemy template' object thousands of times to spawn enemies, rather than reconstructing each enemy's complex initial state from scratch.",
  "codeExample": {
    "language": "Python",
    "code": "import copy\n\nclass Enemy:\n    def __init__(self, health, weapon):\n        self.health = health\n        self.weapon = weapon\n\ntemplate = Enemy(100, ['sword'])\nclone = copy.deepcopy(template)"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain when cloning is preferable to fresh instantiation and clarify shallow vs deep copy risks.",
  "tags": ["Prototype Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Shallow Copy", "Deep Copy", "Creational Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-005",
  "category": "Design Patterns",
  "topic": "Facade Pattern",
  "difficulty": "Medium",
  "question": "What is the Facade Design Pattern?",
  "shortAnswer": "The Facade Pattern provides a simplified, unified interface to a complex subsystem of multiple classes, hiding the underlying complexity from the client.",
  "detailedAnswer": "A complex system might involve coordinating many classes with intricate interdependencies, such as starting a computer involving the CPU, memory, hard drive, and BIOS all in a specific sequence. Instead of forcing every client to understand and correctly orchestrate all these subsystems directly, a Facade class exposes a single simple method that internally handles all the necessary coordination behind the scenes.\n\nThis reduces coupling between client code and the complex subsystem's internal details, and makes the subsystem easier to use correctly, though it doesn't prevent advanced users from bypassing the facade and accessing subsystem classes directly if needed.",
  "keyPoints": [
    "Simplifies client interaction with a complex multi-class subsystem via one unified interface",
    "Reduces coupling: client depends only on the Facade, not on every internal subsystem class",
    "Doesn't hide the subsystem entirely — advanced clients can still access underlying classes directly if needed"
  ],
  "commonMistakes": [
    "Assuming the Facade completely hides the subsystem from all possible access",
    "Confusing Facade's simplification purpose with Adapter's compatibility purpose",
    "Overloading the Facade itself with business logic instead of just coordination"
  ],
  "followUpQuestions": [
    "How does Facade reduce coupling between client and subsystem?",
    "Can advanced users bypass a Facade to access subsystem classes directly?",
    "How does Facade differ in intent from Adapter?"
  ],
  "realWorldExample": "A computer.start() method acts as a Facade, internally coordinating the CPU, memory, and BIOS in the correct sequence without the caller needing to understand each step.",
  "codeExample": {
    "language": "Java",
    "code": "class Computer {\n    private CPU cpu = new CPU();\n    private Memory memory = new Memory();\n    private HardDrive hardDrive = new HardDrive();\n\n    void start() {\n        cpu.freeze();\n        memory.load();\n        cpu.jump();\n        cpu.execute();\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how Facade simplifies interaction with a complex subsystem and reduces client coupling.",
  "tags": ["Facade Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Adapter Pattern", "Structural Patterns", "Coupling"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-006",
  "category": "Design Patterns",
  "topic": "Proxy Pattern",
  "difficulty": "Medium",
  "question": "What is the Proxy Design Pattern? Name its common variants.",
  "shortAnswer": "The Proxy Pattern provides a substitute/placeholder object that controls access to another (real) object, adding a layer of control without the client knowing the difference.",
  "detailedAnswer": "A proxy implements the same interface as the real object it represents, so clients interact with it exactly as if it were the real thing, but the proxy can add behavior before or after delegating to the real object.\n\nCommon variants include Virtual Proxy, which delays creation of an expensive object until it's actually needed for lazy loading; Protection Proxy, which adds access control checks before allowing the real operation; Remote Proxy, which represents an object living on a different machine or process, handling network communication transparently; and Caching Proxy, which stores results of expensive operations, returning cached results for repeated identical requests.",
  "keyPoints": [
    "Virtual Proxy: lazy-loads an expensive resource only when actually accessed",
    "Protection Proxy: adds authorization checks before allowing access to the real object",
    "Remote Proxy: hides network communication details, making a remote object appear local"
  ],
  "commonMistakes": [
    "Confusing Proxy's access-control focus with Decorator's behavior-adding focus",
    "Not knowing the distinct purposes of Virtual, Protection, and Remote proxy variants",
    "Assuming a proxy always adds significant overhead when it can also improve performance via caching"
  ],
  "followUpQuestions": [
    "How does a Virtual Proxy implement lazy loading?",
    "What's the difference between Proxy and Decorator?",
    "How does a Remote Proxy make a networked object appear local?"
  ],
  "realWorldExample": "An ORM's lazy-loaded relationship, such as a User.posts collection, uses a Virtual Proxy that only queries the database for posts when they're actually accessed.",
  "codeExample": {
    "language": "Java",
    "code": "interface Image { void display(); }\n\nclass RealImage implements Image {\n    RealImage(String file) { loadFromDisk(file); } // expensive\n    public void display() { System.out.println(\"Displaying\"); }\n    private void loadFromDisk(String file) {}\n}\n\nclass ProxyImage implements Image {\n    private RealImage realImage;\n    private String file;\n    ProxyImage(String file) { this.file = file; }\n    public void display() {\n        if (realImage == null) realImage = new RealImage(file); // lazy load\n        realImage.display();\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the general proxy mechanism and describe at least two of the common variants with examples.",
  "tags": ["Proxy Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Decorator Pattern", "Lazy Loading", "Structural Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-007",
  "category": "Design Patterns",
  "topic": "Command Pattern",
  "difficulty": "Medium",
  "question": "What is the Command Design Pattern?",
  "shortAnswer": "The Command Pattern encapsulates a request/action as an object, allowing you to parameterize clients with different requests, queue them, log them, and support undo operations.",
  "detailedAnswer": "Instead of directly calling a method to perform an action, the Command pattern wraps the action and all information needed to perform it into a standalone Command object implementing a common interface, typically with an execute() method and often undo().\n\nThis decouples the object that invokes an operation, the invoker such as a button, from the object that actually knows how to perform it, the receiver. The invoker just calls command.execute() without needing to know any details about what actually happens. This enables queuing commands for batch execution, logging commands for auditing, and implementing undo/redo by storing a history of executed commands and reversing them.",
  "keyPoints": [
    "Decouples the invoker (what triggers an action) from the receiver (what actually performs it)",
    "Enables undo/redo: store a history of Command objects, call undo() to reverse the most recent one",
    "Real-world example: GUI button click handlers, transaction/macro recording systems"
  ],
  "commonMistakes": [
    "Not decoupling the invoker from the receiver, tightly coupling button clicks to specific actions",
    "Forgetting to implement undo() alongside execute() when undo/redo is required",
    "Confusing Command with Strategy, which focuses on algorithm selection rather than action encapsulation"
  ],
  "followUpQuestions": [
    "How does Command enable undo/redo functionality?",
    "How does Command decouple the invoker from the receiver?",
    "What's the difference between Command and Strategy?"
  ],
  "realWorldExample": "A text editor's undo feature stores a history of executed Command objects, calling undo() on the most recent one to reverse the last action.",
  "codeExample": {
    "language": "Java",
    "code": "interface Command { void execute(); void undo(); }\n\nclass AddTextCommand implements Command {\n    private Document doc;\n    private String text;\n    public void execute() { doc.append(text); }\n    public void undo() { doc.removeLast(text.length()); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the invoker-receiver decoupling and describe how the pattern enables undo/redo.",
  "tags": ["Command Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Undo/Redo", "Behavioral Patterns", "Strategy Pattern"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-008",
  "category": "Design Patterns",
  "topic": "State Pattern",
  "difficulty": "Medium",
  "question": "What is the State Design Pattern?",
  "shortAnswer": "The State Pattern allows an object to change its behavior when its internal state changes, appearing as though the object changed its class — implemented by delegating behavior to separate State objects.",
  "detailedAnswer": "Instead of using a large conditional checking the current state variable throughout many methods to determine behavior, which becomes unwieldy as states and transitions grow, the State pattern extracts each state into its own class implementing a common State interface.\n\nThe context object holds a reference to its current State object and delegates behavior-dependent method calls to it. Transitioning states means simply swapping which State object the context currently references. A classic example is a TrafficLight context delegating its next() behavior to whichever state object it currently holds, and each state object knowing which state to transition to next.",
  "keyPoints": [
    "Eliminates large state-checking conditionals scattered across many methods",
    "Each state's behavior and transition logic is encapsulated in its own dedicated class",
    "Classic example: a document workflow (Draft → Review → Approved → Published) states"
  ],
  "commonMistakes": [
    "Using large if-else chains to check state instead of extracting State classes",
    "Confusing State pattern with Strategy pattern (structurally similar but different intent)",
    "Not encapsulating transition logic within each state object"
  ],
  "followUpQuestions": [
    "How does State pattern eliminate large conditional statements?",
    "What is the key intent difference between State and Strategy?",
    "How does a state object trigger its own transition to the next state?"
  ],
  "realWorldExample": "A document workflow system uses State pattern to transition a document through Draft, Review, Approved, and Published states, each with its own allowed actions.",
  "codeExample": {
    "language": "Java",
    "code": "interface State { void next(TrafficLight light); }\n\nclass RedState implements State {\n    public void next(TrafficLight light) { light.setState(new GreenState()); }\n}\n\nclass TrafficLight {\n    private State state = new RedState();\n    void setState(State state) { this.state = state; }\n    void next() { state.next(this); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how state-specific behavior is encapsulated and describe how transitions occur.",
  "tags": ["State Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Strategy Pattern", "Behavioral Patterns", "State Machines"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-009",
  "category": "Design Patterns",
  "topic": "Template Method Pattern",
  "difficulty": "Medium",
  "question": "What is the Template Method Design Pattern?",
  "shortAnswer": "Template Method defines the overall skeleton/algorithm structure in a base class, deferring specific steps to subclasses — the algorithm's shape stays fixed, but individual steps can vary.",
  "detailedAnswer": "A base class defines a method, the template method, often marked final to prevent subclasses from changing the overall flow, that calls a fixed sequence of steps. Some steps are implemented directly in the base class as shared, common logic, while others are abstract methods that subclasses must implement, representing the varying, customizable parts.\n\nThis ensures the overall algorithm structure remains consistent across all subclasses while allowing specific steps to be customized. For example, a DataProcessor base class might define process() as readData, validateData, transformData, saveData, where readData and saveData are shared while validateData and transformData are abstract for subclasses like CSVProcessor and JSONProcessor to implement.",
  "keyPoints": [
    "The overall algorithm sequence is fixed in the base class (often marked final)",
    "Subclasses override only specific \"hook\" steps, not the entire algorithm flow",
    "Different from Strategy Pattern: Template Method uses inheritance; Strategy uses composition"
  ],
  "commonMistakes": [
    "Confusing Template Method (inheritance-based) with Strategy (composition-based)",
    "Not marking the template method final, allowing subclasses to override the overall flow",
    "Implementing too many steps as abstract when they could be shared in the base class"
  ],
  "followUpQuestions": [
    "How does Template Method differ from Strategy despite both varying behavior?",
    "Why might the template method itself be marked final?",
    "What are 'hook' methods in the context of Template Method?"
  ],
  "realWorldExample": "A data processing pipeline defines a fixed sequence of read, validate, transform, and save steps in a base class, while CSVProcessor and JSONProcessor subclasses implement only the format-specific validate and transform steps.",
  "codeExample": {
    "language": "Java",
    "code": "abstract class DataProcessor {\n    final void process() {\n        readData();\n        validateData();\n        transformData();\n        saveData();\n    }\n    void readData() { /* shared */ }\n    void saveData() { /* shared */ }\n    abstract void validateData();\n    abstract void transformData();\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the fixed-skeleton concept and distinguish this inheritance-based pattern from the composition-based Strategy pattern.",
  "tags": ["Template Method", "Design Patterns", "Interview"],
  "relatedTopics": ["Strategy Pattern", "Inheritance", "Behavioral Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-010",
  "category": "Design Patterns",
  "topic": "Iterator Pattern",
  "difficulty": "Easy",
  "question": "What is the Iterator Design Pattern?",
  "shortAnswer": "The Iterator Pattern provides a standard way to sequentially access elements of a collection without exposing its underlying internal representation (array, linked list, tree, etc.).",
  "detailedAnswer": "Different collection types have completely different internal structures and traversal mechanics; without a standard iteration interface, client code would need to know the specific internal structure of whatever collection it's working with.\n\nThe Iterator pattern defines a common interface, typically hasNext() and next(), that any collection can implement, allowing client code to iterate through any collection type uniformly without caring how it's actually structured internally. Java's Iterator interface, Python's iterator protocol, and JavaScript's iterables are all direct implementations of this pattern baked into the language itself.",
  "keyPoints": [
    "Decouples traversal logic from the collection's internal structure — client code stays generic",
    "Standard interface: typically hasNext() + next(), or a similar pull-based mechanism",
    "Built directly into most modern languages: Python's iterator protocol, Java's Iterable/Iterator, JS's Symbol.iterator"
  ],
  "commonMistakes": [
    "Exposing a collection's internal structure directly instead of using a standard iterator interface",
    "Not knowing modern languages have this pattern built directly into their syntax",
    "Assuming Iterator only applies to simple linear collections rather than trees or graphs"
  ],
  "followUpQuestions": [
    "How is the Iterator pattern built into Python's for loop syntax?",
    "Why does the Iterator pattern decouple traversal from internal structure?",
    "Can the Iterator pattern be applied to non-linear structures like trees?"
  ],
  "realWorldExample": "Python's for item in my_list: loop uses the built-in iterator protocol, an implementation of the Iterator pattern, to traverse any iterable object uniformly.",
  "codeExample": {
    "language": "Python",
    "code": "class Counter:\n    def __init__(self, limit):\n        self.limit = limit\n        self.current = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.limit:\n            raise StopIteration\n        self.current += 1\n        return self.current"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how the Iterator pattern decouples traversal logic and recognize its native support in modern languages.",
  "tags": ["Iterator Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Collections", "Behavioral Patterns", "Traversal"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-011",
  "category": "Design Patterns",
  "topic": "Chain of Responsibility Pattern",
  "difficulty": "Medium",
  "question": "What is the Chain of Responsibility Design Pattern?",
  "shortAnswer": "Chain of Responsibility passes a request along a chain of potential handlers until one of them handles it (or the chain ends without handling), decoupling the sender from knowing exactly which handler will process it.",
  "detailedAnswer": "Each handler in the chain holds a reference to the next handler. When a request arrives, each handler decides either to process it, optionally stopping the chain there, or to pass it along to the next handler in the chain.\n\nThis is extremely common in middleware architectures, where an HTTP request passes through a chain of middleware, such as authentication, logging, and rate limiting, before reaching the actual route handler, each deciding independently whether to handle, reject, or pass the request forward. This decouples the sender from needing to know the exact handler responsible, and new handlers can be inserted into the chain without modifying existing ones.",
  "keyPoints": [
    "Each handler decide independently: process the request, pass it forward, or both",
    "Classic real-world example: Express.js/middleware chains, exception handling hierarchies",
    "Decouples request sender from the specific handler ultimately responsible for processing it"
  ],
  "commonMistakes": [
    "Hardcoding the specific handler responsible instead of allowing the chain to decide dynamically",
    "Forgetting to pass the request forward when a handler doesn't fully process it",
    "Confusing this pattern with simple sequential function calls without independent handler decisions"
  ],
  "followUpQuestions": [
    "How does middleware in a web framework implement Chain of Responsibility?",
    "What happens if no handler in the chain processes the request?",
    "How does this pattern allow new handlers to be added without modifying existing ones?"
  ],
  "realWorldExample": "Express.js middleware chains, such as authentication → logging → rate limiting → route handler, are a real-world implementation of Chain of Responsibility.",
  "codeExample": {
    "language": "JavaScript",
    "code": "function authMiddleware(req, next) {\n    if (!req.user) return res.status(401).send();\n    next();\n}\n\nfunction loggingMiddleware(req, next) {\n    console.log(req.path);\n    next();\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the handler-chain mechanism and identify middleware as a real-world example.",
  "tags": ["Chain of Responsibility", "Design Patterns", "Interview"],
  "relatedTopics": ["Middleware", "Behavioral Patterns", "Decoupling"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-012",
  "category": "Design Patterns",
  "topic": "Composite Pattern",
  "difficulty": "Medium",
  "question": "What is the Composite Design Pattern?",
  "shortAnswer": "The Composite Pattern lets you treat individual objects and compositions (groups) of objects uniformly through a common interface, typically to represent tree/hierarchical structures.",
  "detailedAnswer": "This pattern is designed for part-whole hierarchies, such as a file system where a Folder can contain both individual Files and other Folders. Both File and Folder implement a common interface, such as getSize() or render(), so client code can call the same method on either a single file or an entire nested folder structure without special-case logic to distinguish leaf from composite.\n\nA Folder's getSize() implementation simply sums the sizes of all its children, recursively calling their own getSize() whether they're Files or nested Folders, making this recursive uniform treatment what makes tree-structured data elegant to work with using this pattern.",
  "keyPoints": [
    "Uniformly treats individual objects (leaves) and groups of objects (composites) via a shared interface",
    "Ideal for tree/hierarchical structures — file systems, UI component trees, organizational charts",
    "Enables simple recursive operations (like summing sizes) without special-casing leaf vs. composite nodes"
  ],
  "commonMistakes": [
    "Special-casing leaf and composite nodes instead of treating them uniformly through the common interface",
    "Not implementing recursive delegation correctly in the composite's methods",
    "Confusing Composite with Decorator, which wraps a single object rather than modeling a tree"
  ],
  "followUpQuestions": [
    "How does the Composite pattern avoid special-casing leaf vs composite nodes?",
    "What real-world hierarchical structures benefit from the Composite pattern?",
    "How does recursion play a role in Composite's implementation?"
  ],
  "realWorldExample": "A file system's Folder.getSize() method recursively sums the sizes of all contained Files and nested Folders using the Composite pattern.",
  "codeExample": {
    "language": "Java",
    "code": "interface FileSystemItem { int getSize(); }\n\nclass File implements FileSystemItem {\n    private int size;\n    public int getSize() { return size; }\n}\n\nclass Folder implements FileSystemItem {\n    private List<FileSystemItem> children = new ArrayList<>();\n    public int getSize() {\n        return children.stream().mapToInt(FileSystemItem::getSize).sum();\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the uniform leaf/composite treatment and connect it to tree-structured data like file systems.",
  "tags": ["Composite Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Tree Structures", "Structural Patterns", "Recursion"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-013",
  "category": "Design Patterns",
  "topic": "Bridge Pattern",
  "difficulty": "Hard",
  "question": "What is the Bridge Design Pattern?",
  "shortAnswer": "The Bridge Pattern decouples an abstraction from its implementation so that the two can vary and evolve independently, avoiding a combinatorial explosion of subclasses.",
  "detailedAnswer": "Consider a Shape hierarchy that also needs to support multiple rendering methods; a naive inheritance approach would require a subclass for every combination, which explodes combinatorially as more shapes or renderers are added.\n\nThe Bridge pattern separates these into two independent hierarchies: the Shape abstraction holds a reference to a Renderer implementation using composition rather than inheritance, and Circle delegates the actual drawing work to whatever Renderer it's given. This means adding a new Shape or a new Renderer only requires one new class, not a combinatorial multiplication of classes for every possible pairing.",
  "keyPoints": [
    "Solves the combinatorial explosion problem when two independent dimensions of variation exist",
    "Uses composition (a reference to an implementation) instead of inheritance to connect the two hierarchies",
    "Different from Adapter: Bridge is designed upfront for two dimensions; Adapter retrofits an existing incompatible interface"
  ],
  "commonMistakes": [
    "Using inheritance to cover every combination instead of composition, causing subclass explosion",
    "Confusing Bridge (designed upfront) with Adapter (retrofitted for compatibility)",
    "Not separating the two independent dimensions cleanly"
  ],
  "followUpQuestions": [
    "How does Bridge prevent combinatorial subclass explosion?",
    "How is Bridge different from Adapter in terms of when it's applied?",
    "Can you give an example with two independent dimensions of variation?"
  ],
  "realWorldExample": "A cross-platform GUI library uses Bridge to separate Window abstractions from platform-specific WindowImpl implementations, avoiding a subclass for every OS-and-widget combination.",
  "codeExample": {
    "language": "Java",
    "code": "interface Renderer { void renderCircle(float radius); }\n\nabstract class Shape {\n    protected Renderer renderer;\n    Shape(Renderer renderer) { this.renderer = renderer; }\n    abstract void draw();\n}\n\nclass Circle extends Shape {\n    Circle(Renderer renderer) { super(renderer); }\n    void draw() { renderer.renderCircle(5.0f); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the two-hierarchy separation and how it prevents combinatorial subclass explosion.",
  "tags": ["Bridge Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Adapter Pattern", "Structural Patterns", "Composition"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-014",
  "category": "Design Patterns",
  "topic": "Facade vs Adapter",
  "difficulty": "Medium",
  "question": "What is the Difference Between the Facade Pattern and the Adapter Pattern?",
  "shortAnswer": "Facade simplifies an interface to a complex subsystem (many classes → one simple interface). Adapter converts one specific incompatible interface into another expected interface (interface translation).",
  "detailedAnswer": "Though both patterns provide a layer between the client and something else, their intent is different. Facade's purpose is simplification, reducing the complexity of interacting with a subsystem that has many classes and intricate coordination requirements, presenting one clean, simple interface.\n\nAdapter's purpose is compatibility and translation, taking an existing interface that doesn't match what a client expects and wrapping it so it does match, without changing the underlying class. A useful mental distinction: a Facade would be introduced even if there were no compatibility problem at all, purely to reduce complexity, whereas an Adapter is introduced specifically because of an interface mismatch that needs bridging.",
  "keyPoints": [
    "Facade: reduces complexity — simplifies interaction with MANY classes into one clean interface",
    "Adapter: solves incompatibility — translates ONE mismatched interface into the expected one",
    "Facade is introduced for simplicity even without a mismatch; Adapter exists specifically BECAUSE of a mismatch"
  ],
  "commonMistakes": [
    "Confusing simplification (Facade) with interface translation (Adapter)",
    "Assuming both patterns solve the same problem just with different names",
    "Not recognizing Facade can be introduced without any interface mismatch"
  ],
  "followUpQuestions": [
    "Would you use a Facade even if there were no interface incompatibility? Why?",
    "How would you decide between Facade and Adapter for a given design problem?",
    "Can a system use both Facade and Adapter together?"
  ],
  "realWorldExample": "A payment system uses an Adapter to translate a third-party library's mismatched interface, and separately uses a Facade to simplify the overall checkout process across multiple internal services.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly articulate the difference in intent: simplification versus compatibility translation.",
  "tags": ["Facade Pattern", "Adapter Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Structural Patterns", "Coupling", "Legacy Integration"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-015",
  "category": "Design Patterns",
  "topic": "Flyweight Pattern",
  "difficulty": "Hard",
  "question": "What is the Flyweight Design Pattern?",
  "shortAnswer": "The Flyweight Pattern minimizes memory usage by sharing common (intrinsic) data across many similar objects, storing only the unique (extrinsic) data separately per object instance.",
  "detailedAnswer": "When an application needs to create a huge number of similar objects, such as rendering millions of individual character glyphs in a text editor or trees in a forest simulation, creating a fully independent object for each instance would consume excessive memory, especially if much of each object's data is actually identical across instances.\n\nThe Flyweight pattern separates data into intrinsic state, which is shared, immutable, and common across many instances, stored once in a shared Flyweight object, and extrinsic state, which is unique per instance and passed in from outside at the point of use rather than stored in each object.",
  "keyPoints": [
    "Intrinsic state: shared, immutable data stored ONCE and reused across many object instances",
    "Extrinsic state: unique per-instance data, passed in externally rather than stored redundantly",
    "Classic use case: text editors rendering characters, game engines rendering thousands of similar entities"
  ],
  "commonMistakes": [
    "Storing extrinsic (per-instance) data inside the shared Flyweight object, defeating the memory savings",
    "Not correctly identifying which data is truly shared (intrinsic) versus unique (extrinsic)",
    "Overusing Flyweight for cases where memory savings aren't actually significant"
  ],
  "followUpQuestions": [
    "How do you correctly identify intrinsic versus extrinsic state for a given use case?",
    "What happens if extrinsic state is mistakenly stored inside the Flyweight object?",
    "What are some real-world scenarios where Flyweight provides significant memory savings?"
  ],
  "realWorldExample": "A text editor stores one shared Flyweight object per character glyph, such as the letter 'A', reusing it for every occurrence on the page, while storing each occurrence's specific X,Y position externally.",
  "codeExample": {
    "language": "Java",
    "code": "class CharacterFlyweight {\n    private final char symbol; // intrinsic\n    CharacterFlyweight(char symbol) { this.symbol = symbol; }\n    void render(int x, int y) { /* uses extrinsic x, y passed in */ }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly distinguish intrinsic from extrinsic state and explain how this separation saves memory.",
  "tags": ["Flyweight Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Memory Optimization", "Structural Patterns", "Object Pooling"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-016",
  "category": "Design Patterns",
  "topic": "Mediator Pattern",
  "difficulty": "Medium",
  "question": "What is the Mediator Design Pattern?",
  "shortAnswer": "The Mediator Pattern centralizes complex communication and control logic between a group of related objects into a single mediator object, so objects no longer communicate directly with each other.",
  "detailedAnswer": "Without a mediator, if many objects need to interact with each other, each object would need direct references to every other object it communicates with, creating a tangled web of many-to-many dependencies that becomes very difficult to understand, modify, or reason about as the system grows.\n\nThe Mediator pattern introduces a central coordinator object; all individual objects, called colleagues, communicate only with the mediator, not directly with each other, and the mediator contains the logic for how their interactions should be orchestrated. This transforms a many-to-many dependency web into a simpler many-to-one relationship. A classic example is an air traffic control tower, where planes communicate through the tower rather than directly with each other.",
  "keyPoints": [
    "Transforms tangled many-to-many object dependencies into a simpler many-to-one (mediator) relationship",
    "Colleague objects don't need direct references to each other — only to the shared mediator",
    "Classic real-world example: chat room server (mediates messages between users, users don't message each other directly)"
  ],
  "commonMistakes": [
    "Allowing colleague objects to still hold direct references to each other, defeating the pattern's purpose",
    "Overloading the mediator with too much unrelated logic, turning it into a God Object",
    "Not recognizing this pattern as a solution to the many-to-many dependency problem"
  ],
  "followUpQuestions": [
    "How does Mediator transform many-to-many dependencies into many-to-one?",
    "What risk does an overloaded Mediator introduce?",
    "How is a chat room server an example of the Mediator pattern?"
  ],
  "realWorldExample": "A chat room server acts as a mediator, routing messages between users so that individual users never need direct references to each other.",
  "codeExample": {
    "language": "Java",
    "code": "class ChatMediator {\n    void sendMessage(String message, User sender) {\n        for (User user : users) {\n            if (user != sender) user.receive(message);\n        }\n    }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how Mediator simplifies dependency structure and identify a real-world example.",
  "tags": ["Mediator Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Behavioral Patterns", "Coupling", "Observer Pattern"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-017",
  "category": "Design Patterns",
  "topic": "Strategy vs State Pattern",
  "difficulty": "Hard",
  "question": "What is the Difference Between the Strategy Pattern and the State Pattern? (They look structurally similar)",
  "shortAnswer": "Both use composition with interchangeable objects implementing a common interface, but Strategy is about choosing an ALGORITHM explicitly (client decides), while State is about an object's behavior changing automatically as its INTERNAL state transitions.",
  "detailedAnswer": "Structurally, Strategy and State look nearly identical; both involve a context object holding a reference to an interface implementation that can be swapped. The key distinction is intent and who controls the swapping.\n\nWith Strategy, the client explicitly chooses and sets which strategy to use, and it typically doesn't change on its own during the object's lifetime, such as choosing which sorting algorithm to use being a one-time client decision. With State, the state objects themselves typically trigger transitions to the next state as part of their own logic, such as a TrafficLight in RedState internally deciding to transition itself to GreenState after a timer, without external client intervention.",
  "keyPoints": [
    "Strategy: client explicitly selects/swaps the algorithm — the client is in control",
    "State: the state object itself typically triggers the transition — internal, autonomous control",
    "Structurally nearly identical, but the INTENT and WHO drives the change differs significantly"
  ],
  "commonMistakes": [
    "Assuming Strategy and State are the same pattern just with different names",
    "Not identifying who controls the swap (client vs the object itself) as the key distinguishing factor",
    "Confusing which pattern applies to a scenario based on structure alone rather than intent"
  ],
  "followUpQuestions": [
    "Who typically triggers the swap in Strategy versus State?",
    "Can you give an example where the same structure would be Strategy in one context and State in another?",
    "Why do Strategy and State look structurally so similar despite different intents?"
  ],
  "realWorldExample": "Choosing a sorting Comparator is Strategy (client decides), while a TrafficLight automatically transitioning from Red to Green to Yellow is State (self-triggered).",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to articulate the intent-based distinction (who controls the swap) rather than just the structural similarity.",
  "tags": ["Strategy Pattern", "State Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Behavioral Patterns", "Composition", "State Machines"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-018",
  "category": "Design Patterns",
  "topic": "Visitor Pattern",
  "difficulty": "Hard",
  "question": "What is the Visitor Design Pattern?",
  "shortAnswer": "The Visitor Pattern lets you add new operations to a group of related classes WITHOUT modifying those classes, by separating the operation logic into a separate \"Visitor\" object.",
  "detailedAnswer": "Consider a hierarchy of shape classes where you need to add a new operation, such as calculating area or exporting to XML; normally you'd add a new method to each class, but if you don't own the classes or want to avoid modifying them repeatedly, the Visitor pattern lets you define the operation externally.\n\nEach shape class implements a single accept(visitor) method that calls back the appropriate visit(this) method on the visitor, a technique called double dispatch. New operations are added by creating new Visitor classes without touching the existing shape classes. The tradeoff is that adding a new shape class requires updating every existing Visitor, so this pattern works best when the class hierarchy is stable but new operations are frequently added.",
  "keyPoints": [
    "Enables adding new operations without modifying the existing class hierarchy — good when classes are stable",
    "Uses \"double dispatch\": accept(visitor) calls back visitor.visit(this) to resolve the correct overload",
    "Tradeoff: adding a NEW element class requires updating every existing visitor implementation"
  ],
  "commonMistakes": [
    "Using Visitor when the class hierarchy changes frequently, causing constant visitor updates",
    "Not implementing double dispatch correctly, leading to incorrect method resolution",
    "Confusing Visitor's operation-adding purpose with Strategy's algorithm-swapping purpose"
  ],
  "followUpQuestions": [
    "What is double dispatch and why does Visitor need it?",
    "What is the tradeoff of using Visitor when the class hierarchy is unstable?",
    "How would you add a new operation to a class hierarchy using Visitor?"
  ],
  "realWorldExample": "A compiler's Abstract Syntax Tree uses the Visitor pattern to add new operations, like type checking or code generation, without modifying each AST node class.",
  "codeExample": {
    "language": "Java",
    "code": "interface Visitor { void visit(Circle c); void visit(Square s); }\n\ninterface Shape { void accept(Visitor v); }\n\nclass Circle implements Shape {\n    public void accept(Visitor v) { v.visit(this); }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain double dispatch and the trade-off between stable class hierarchies and frequently added operations.",
  "tags": ["Visitor Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Double Dispatch", "Behavioral Patterns", "Composite Pattern"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-019",
  "category": "Design Patterns",
  "topic": "God Object Anti-Pattern",
  "difficulty": "Medium",
  "question": "What is a \"God Object\" Anti-Pattern? Why is it problematic?",
  "shortAnswer": "A God Object is a class that has taken on far too many responsibilities, knowing about and controlling too much of the system — the opposite of good, focused object-oriented design.",
  "detailedAnswer": "A God Object typically starts small and grows over time as developers keep adding 'just one more thing' to an already-central class, rather than creating new, focused classes for new responsibilities. It severely violates the Single Responsibility Principle, becomes extremely difficult to understand, and is nearly impossible to test in isolation due to too many interdependent responsibilities.\n\nIt also creates a single point of failure and bottleneck for changes, since many unrelated features all touch the same massive class, causing frequent merge conflicts and unintended side effects between unrelated features. Refactoring away from a God Object typically involves identifying distinct responsibilities within it and extracting them into separate, focused classes.",
  "keyPoints": [
    "Violates Single Responsibility Principle severely — does far too many unrelated things",
    "Symptoms: thousands of lines, dozens of unrelated methods, everyone on the team touches it constantly",
    "Refactoring approach: identify distinct responsibilities and extract them into separate, focused classes"
  ],
  "commonMistakes": [
    "Continuing to add responsibilities to an already-central class instead of extracting new classes",
    "Not recognizing frequent merge conflicts on one class as a symptom of a God Object",
    "Attempting to refactor a God Object all at once instead of incrementally extracting responsibilities"
  ],
  "followUpQuestions": [
    "What are the symptoms that indicate a class has become a God Object?",
    "How would you approach refactoring a God Object incrementally?",
    "How does the Single Responsibility Principle relate to preventing God Objects?"
  ],
  "realWorldExample": "A legacy 'UserManager' class that handles authentication, email sending, logging, and database access is a classic God Object that becomes a bottleneck for the entire team.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the symptoms and consequences of a God Object and describe an incremental refactoring approach.",
  "tags": ["God Object", "Anti-Pattern", "OOP", "Interview"],
  "relatedTopics": ["Single Responsibility Principle", "Refactoring", "Cohesion and Coupling"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "dp-020",
  "category": "Design Patterns",
  "topic": "Pattern vs Anti-Pattern",
  "difficulty": "Easy",
  "question": "What is the Difference Between a \"Pattern\" and an \"Anti-Pattern\"?",
  "shortAnswer": "A Pattern is a proven, beneficial solution to a recurring design problem. An Anti-Pattern is a common but counterproductive \"solution\" that looks tempting but leads to worse outcomes.",
  "detailedAnswer": "Design Patterns emerge from observing that experienced developers repeatedly arrive at similar, effective solutions to similar categories of problems, and are documented as reusable, generally beneficial templates.\n\nAnti-Patterns, conversely, document common mistakes and their negative consequences; they recur frequently across many codebases and developers, but represent poor practices that seem like reasonable solutions in the moment but lead to technical debt, maintenance difficulty, or bugs over time. Common anti-patterns include God Object, Spaghetti Code, Golden Hammer, and Premature Optimization.",
  "keyPoints": [
    "Patterns: proven, beneficial solutions worth reusing across similar problems",
    "Anti-patterns: common but counterproductive \"solutions\" that create long-term problems",
    "Recognizing anti-patterns in your own code is as valuable a skill as knowing the proper patterns"
  ],
  "commonMistakes": [
    "Not recognizing anti-patterns as also being recurring, just harmful rather than beneficial",
    "Assuming any recurring code structure is automatically a beneficial pattern",
    "Overlooking common anti-patterns like Golden Hammer in one's own code"
  ],
  "followUpQuestions": [
    "Can you name a few common anti-patterns besides God Object?",
    "What is the 'Golden Hammer' anti-pattern?",
    "Why is recognizing anti-patterns as valuable a skill as knowing design patterns?"
  ],
  "realWorldExample": "A team that always reaches for microservices regardless of project size, even for a small internal tool, exhibits the 'Golden Hammer' anti-pattern.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish patterns from anti-patterns by outcome, not just recurrence, and name common anti-patterns.",
  "tags": ["Anti-Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["God Object", "Premature Optimization", "Software Design"],
  "references": ["AntiPatterns - Brown, Malveau, McCormick, Mowbray"]
},
{
  "id": "dp-021",
  "category": "Design Patterns",
  "topic": "Repository Pattern",
  "difficulty": "Medium",
  "question": "What is the Repository Design Pattern?",
  "shortAnswer": "The Repository Pattern abstracts data access logic behind a collection-like interface, decoupling business logic from the specific details of how/where data is actually persisted (SQL database, API, in-memory, etc.).",
  "detailedAnswer": "Instead of business logic code directly writing SQL queries or calling a specific ORM throughout the application, a Repository provides simple, domain-focused methods like findById(id), save(user), and findByEmail(email); the actual implementation detail, such as which database, ORM, or query syntax, is hidden entirely behind this interface.\n\nThis provides significant benefits: business logic becomes testable using an in-memory fake Repository implementation instead of a real database, and switching the underlying data source, such as migrating from MySQL to PostgreSQL, only requires changing the Repository's internal implementation, not any of the business logic that depends on it.",
  "keyPoints": [
    "Decouples business logic from specific data access technology (SQL, ORM, external API)",
    "Enables easy testing: swap in an in-memory fake Repository instead of hitting a real database",
    "Common in Domain-Driven Design (DDD) and Clean Architecture as a core structural pattern"
  ],
  "commonMistakes": [
    "Writing SQL queries directly in business logic instead of behind a Repository abstraction",
    "Not testing business logic with an in-memory fake Repository, relying on a real database instead",
    "Leaking database-specific concepts (like query builders) through the Repository interface"
  ],
  "followUpQuestions": [
    "How does the Repository pattern improve testability?",
    "What would migrating a data source look like with and without a Repository?",
    "How does Repository relate to Domain-Driven Design?"
  ],
  "realWorldExample": "A test suite injects an in-memory fake UserRepository implementation to test business logic without needing a real database connection.",
  "codeExample": {
    "language": "Java",
    "code": "interface UserRepository {\n    User findById(int id);\n    void save(User user);\n}\n\nclass SqlUserRepository implements UserRepository {\n    public User findById(int id) { /* SQL query */ return null; }\n    public void save(User user) { /* SQL insert */ }\n}"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how Repository decouples business logic from data access technology and improves testability.",
  "tags": ["Repository Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Domain-Driven Design", "Testability", "Data Access"],
  "references": ["Patterns of Enterprise Application Architecture - Martin Fowler"]
},
{
  "id": "dp-022",
  "category": "Design Patterns",
  "topic": "MVC Architectural Pattern",
  "difficulty": "Medium",
  "question": "What is the MVC (Model-View-Controller) Architectural Pattern?",
  "shortAnswer": "MVC separates an application into three interconnected components: Model (data and business logic), View (UI presentation), and Controller (handles input, coordinates Model and View).",
  "detailedAnswer": "The Model represents the application's core data and business rules, completely independent of how that data is displayed or how user input is handled; it has no knowledge of any View. The View is responsible purely for presentation, rendering the current state of the Model in a specific format, and should contain minimal to no business logic.\n\nThe Controller receives user input or requests, invokes appropriate operations on the Model to fulfill that request, and then selects or prepares the appropriate View to render the result. This separation allows the same Model to be displayed via multiple different Views without duplicating business logic, and allows the View's presentation to be changed without touching business rules.",
  "keyPoints": [
    "Model: data + business logic, has no knowledge of Views — the \"source of truth\"",
    "View: pure presentation logic — renders the Model's current state, minimal business logic",
    "Controller: receives input, orchestrates Model updates, selects the appropriate View to render"
  ],
  "commonMistakes": [
    "Placing business logic inside the View instead of the Model",
    "Allowing the Model to have direct knowledge of or dependency on the View",
    "Overloading the Controller with business logic that belongs in the Model"
  ],
  "followUpQuestions": [
    "Why should the Model have no knowledge of the View?",
    "How does MVC allow the same Model to power multiple different Views?",
    "What responsibilities should NOT live in the Controller?"
  ],
  "realWorldExample": "A web application's Model represents order data, the View renders it as an HTML page or JSON API response, and the Controller handles the incoming HTTP request and selects which View to render.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly define the responsibility of each MVC component and explain the benefit of separating them.",
  "tags": ["MVC", "Architectural Pattern", "Design Patterns", "Interview"],
  "relatedTopics": ["Observer Pattern", "Separation of Concerns", "Web Architecture"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-023",
  "category": "Design Patterns",
  "topic": "Structural vs Behavioral Patterns",
  "difficulty": "Medium",
  "question": "What is the Difference Between Structural and Behavioral Design Patterns (as a category comparison)?",
  "shortAnswer": "Structural patterns focus on how classes/objects are COMPOSED into larger structures. Behavioral patterns focus on how objects COMMUNICATE and distribute responsibility for a task.",
  "detailedAnswer": "Structural patterns are concerned with the static relationships and composition between classes, such as how do you combine individual pieces into a larger, functioning whole, exemplified by Composite building tree structures, Decorator wrapping objects to add behavior, Facade simplifying access to a subsystem, and Adapter making incompatible interfaces work together.\n\nBehavioral patterns are concerned with the dynamic interactions and responsibility distribution, such as how objects collaborate and communicate to accomplish a task at runtime, exemplified by Observer notifying dependents of changes, Strategy swapping algorithms, Command encapsulating requests, and Chain of Responsibility passing a request through handlers.",
  "keyPoints": [
    "Structural: static composition — \"how do these pieces fit together into a larger structure?\"",
    "Behavioral: dynamic interaction — \"how do these objects communicate and collaborate at runtime?\"",
    "Quickly categorizing a design problem this way helps narrow down which family of patterns might apply"
  ],
  "commonMistakes": [
    "Misclassifying a pattern's category based on surface-level similarity rather than its actual focus",
    "Not using the structural-vs-behavioral distinction to narrow down candidate patterns during design",
    "Confusing static composition concerns with dynamic runtime interaction concerns"
  ],
  "followUpQuestions": [
    "Can you classify Adapter and Observer into their correct categories and explain why?",
    "How does this categorical distinction help during system design discussions?",
    "What's an example of a pattern that has elements of both categories?"
  ],
  "realWorldExample": "When designing a notification system, recognizing the problem is about runtime communication (Behavioral) rather than static composition (Structural) points toward using Observer rather than Composite.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the static-vs-dynamic distinction and correctly classify example patterns into each category.",
  "tags": ["Structural Patterns", "Behavioral Patterns", "Design Patterns", "Interview"],
  "relatedTopics": ["Creational Patterns", "Gang of Four", "Design Patterns"],
  "references": ["Design Patterns - Gang of Four"]
},
{
  "id": "dp-024",
  "category": "Design Patterns",
  "topic": "Dependency Inversion in Design Patterns",
  "difficulty": "Hard",
  "question": "What is Dependency Inversion and How Does It Relate to Design Patterns Broadly?",
  "shortAnswer": "Dependency Inversion (the \"D\" in SOLID) states that high-level modules should depend on abstractions, not concrete low-level implementations — and it's the underlying principle that makes MANY design patterns work.",
  "detailedAnswer": "Many of the most important design patterns, including Strategy, Observer, Factory, and Dependency Injection itself, fundamentally rely on this principle. They all work by having a client or context depend on an interface or abstract type, rather than a specific concrete class, allowing the actual implementation to be swapped, extended, or mocked without modifying the dependent code.\n\nThis is why understanding Dependency Inversion deeply is arguably more valuable than memorizing individual pattern names; most patterns are really just different specific applications of this one foundational idea, programming to an interface rather than an implementation, applied to different structural problems like object creation, algorithm selection, notification, and request handling.",
  "keyPoints": [
    "Most design patterns are specific applications of the broader \"program to an interface\" principle",
    "Understanding WHY a pattern uses an interface/abstraction is more valuable than memorizing its structure",
    "This is why Dependency Inversion is often called the most foundational of the five SOLID principles"
  ],
  "commonMistakes": [
    "Memorizing pattern structures without understanding the underlying interface-based principle",
    "Not recognizing Dependency Inversion as the common thread across many different patterns",
    "Confusing Dependency Inversion with Dependency Injection (DI is one technique implementing the principle)"
  ],
  "followUpQuestions": [
    "How does Strategy pattern specifically implement Dependency Inversion?",
    "What is the difference between Dependency Inversion (the principle) and Dependency Injection (a technique)?",
    "Why is understanding the underlying principle more valuable than memorizing pattern structures?"
  ],
  "realWorldExample": "A payment system depending on a PaymentGateway interface rather than a specific StripePayment class demonstrates Dependency Inversion, which underlies the Strategy pattern used here.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to connect Dependency Inversion as the foundational principle underlying multiple design patterns, not just define it in isolation.",
  "tags": ["Dependency Inversion", "SOLID", "Design Patterns", "Interview"],
  "relatedTopics": ["Strategy Pattern", "Dependency Injection", "SOLID Principles"],
  "references": ["Agile Software Development - Robert C. Martin"]
},
{
  "id": "dp-025",
  "category": "Design Patterns",
  "topic": "Pattern Overuse",
  "difficulty": "Medium",
  "question": "When Should You AVOID Using a Design Pattern? What is \"Pattern Overuse\"?",
  "shortAnswer": "Design patterns should solve an ACTUAL recurring problem you're facing — applying a pattern speculatively, for problems you don't currently have, adds unnecessary complexity without corresponding benefit.",
  "detailedAnswer": "A common mistake, especially among developers newly learning design patterns, is over-engineering: applying elaborate patterns like Abstract Factory, Visitor, or full Strategy hierarchies to simple problems that don't actually need that flexibility, resulting in more files, more indirection, and more cognitive overhead than the problem genuinely warrants.\n\nThis violates the YAGNI principle, 'You Aren't Gonna Need It', adding abstraction or flexibility for hypothetical future requirements that may never materialize, at the real cost of making the current code harder to understand and navigate. The pragmatic guideline is to start with the simplest solution that solves the actual problem at hand, introducing a formal design pattern only when genuine recurring complexity or a concrete need for flexibility emerges.",
  "keyPoints": [
    "YAGNI principle: don't add flexibility/abstraction for hypothetical future needs that may never arise",
    "Overuse symptom: simple problems solved with unnecessarily elaborate multi-class pattern structures",
    "Pragmatic guideline: start simple, refactor TOWARD a pattern only when genuine recurring complexity emerges"
  ],
  "commonMistakes": [
    "Applying elaborate patterns speculatively for hypothetical future requirements",
    "Not recognizing when a simple function or class would suffice instead of a formal pattern",
    "Ignoring the YAGNI principle when introducing unnecessary abstraction"
  ],
  "followUpQuestions": [
    "What is the YAGNI principle and how does it relate to pattern overuse?",
    "Can you give an example of a simple problem over-engineered with an unnecessary pattern?",
    "How would you know when it's actually time to introduce a formal design pattern?"
  ],
  "realWorldExample": "A developer building a simple script to process one file format introduces a full Abstract Factory and Strategy hierarchy anticipating future formats that may never be added, adding unnecessary complexity.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to articulate the YAGNI principle and describe practical signs of over-engineering with design patterns.",
  "tags": ["Pattern Overuse", "YAGNI", "Design Patterns", "Interview"],
  "relatedTopics": ["Over-Engineering", "SOLID Principles", "Software Design"],
  "references": ["Agile Software Development - Robert C. Martin"]
  },
{
  "id": "sysd-001",
  "category": "System Design",
  "topic": "Horizontal vs Vertical Scaling",
  "difficulty": "Medium",
  "question": "What is Horizontal vs Vertical Scaling? When should you use each?",
  "shortAnswer": "Vertical: add more power (CPU/RAM) to a single machine. Horizontal: add more machines. Horizontal scales better for high availability and extreme load.",
  "detailedAnswer": "Vertical scaling upgrades a single server, requiring no architectural changes, but has a hard ceiling defined by the biggest machine available and creates a single point of failure.\n\nHorizontal scaling distributes load across many machines, requiring a load balancer and typically a stateless application design, but is theoretically unlimited and fault-tolerant, since one server failing doesn't take down the whole system.",
  "keyPoints": [
    "Vertical: simple, no code changes, but expensive at the top end and risky (single point of failure)",
    "Horizontal: requires load balancer + stateless design, but scales indefinitely and tolerates failures",
    "Databases: vertical = bigger instance; horizontal = sharding + read replicas"
  ],
  "commonMistakes": [
    "Assuming vertical scaling has no practical limits",
    "Forgetting horizontal scaling requires stateless application design",
    "Not considering cost differences between the two approaches"
  ],
  "followUpQuestions": [
    "What makes an application 'stateless' for horizontal scaling?",
    "How does sharding relate to horizontal database scaling?",
    "What are the trade-offs of vertical scaling at the database layer?"
  ],
  "realWorldExample": "A web application behind a load balancer scales horizontally by adding more server instances during high-traffic events like sales.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain trade-offs and identify when each scaling approach is appropriate.",
  "tags": ["Scaling", "System Design", "Interview"],
  "relatedTopics": ["Load Balancing", "Sharding", "Stateless Design"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-002",
  "category": "System Design",
  "topic": "Load Balancing",
  "difficulty": "Medium",
  "question": "What is Load Balancing? Explain common algorithms.",
  "shortAnswer": "A load balancer distributes incoming requests across multiple servers using algorithms like Round Robin, Least Connections, and IP Hash.",
  "detailedAnswer": "Round Robin distributes requests sequentially, assuming equal server capacity, while Weighted Round Robin sends more traffic to more powerful servers. Least Connections routes to whichever server currently has the fewest active connections, which is better for requests of variable duration.\n\nIP Hash routes based on a hash of the client's IP, giving consistent session affinity without needing shared session storage. Health checks continuously monitor backend servers, automatically removing unresponsive ones from rotation.",
  "keyPoints": [
    "L4 load balancer: routes by IP/port only, fast, no content inspection",
    "L7 load balancer: inspects HTTP content, can route /api vs /images differently",
    "Sticky sessions: IP Hash or cookie-based routing keeps a client on the same server"
  ],
  "commonMistakes": [
    "Assuming Round Robin works well with unequal server capacities",
    "Confusing L4 and L7 load balancing capabilities",
    "Forgetting health checks are needed to remove failed servers"
  ],
  "followUpQuestions": [
    "What is the difference between L4 and L7 load balancing?",
    "How does IP Hash provide session affinity?",
    "What happens when a health check fails for a server?"
  ],
  "realWorldExample": "An e-commerce site uses an L7 load balancer like AWS ALB to route API requests and static asset requests to different backend services.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish L4 vs L7 balancing and describe trade-offs of common algorithms.",
  "tags": ["Load Balancing", "System Design", "Interview"],
  "relatedTopics": ["Horizontal Scaling", "Health Checks", "Session Affinity"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-003",
  "category": "System Design",
  "topic": "Caching",
  "difficulty": "Medium",
  "question": "What is Caching? Explain caching strategies and eviction policies.",
  "shortAnswer": "Caching stores frequently accessed data in fast memory to reduce latency and backend load. Strategies: Cache-Aside, Write-Through, Write-Back. Eviction: LRU, LFU, TTL.",
  "detailedAnswer": "Cache-Aside, or lazy loading, checks the cache first and on a miss loads from the database and populates the cache, making it the simplest and most common strategy. Write-Through writes to both cache and database simultaneously, always consistent but with slower writes.\n\nWrite-Back writes to cache only, flushing to the database asynchronously later, giving fast writes but risking data loss if the cache fails before flushing. LRU is the most common eviction policy, discarding the item that hasn't been accessed for the longest time when the cache is full.",
  "keyPoints": [
    "Cache hit ratio: 80%+ is generally considered meaningful for real benefit",
    "Cache stampede: many simultaneous misses overwhelm the DB — mitigate with a mutex/lock on miss",
    "Cache invalidation: widely considered one of the hardest problems in computer science"
  ],
  "commonMistakes": [
    "Not handling cache invalidation properly, leading to stale data",
    "Ignoring cache stampede risk during simultaneous cache misses",
    "Confusing Write-Through with Write-Back consistency guarantees"
  ],
  "followUpQuestions": [
    "What is a cache stampede and how do you prevent it?",
    "How does Write-Back risk data loss compared to Write-Through?",
    "What eviction policy would you choose for a frequently changing dataset?"
  ],
  "realWorldExample": "A news website uses Cache-Aside with Redis to serve frequently accessed articles quickly while falling back to the database on cache misses.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to compare caching strategies and eviction policies with awareness of consistency trade-offs.",
  "tags": ["Caching", "System Design", "Interview"],
  "relatedTopics": ["Redis", "Cache Invalidation", "LRU"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-004",
  "category": "System Design",
  "topic": "CAP Theorem",
  "difficulty": "Hard",
  "question": "What is the CAP Theorem?",
  "shortAnswer": "A distributed system experiencing a network partition can guarantee only 2 of Consistency, Availability, Partition Tolerance — in practice, choose CP or AP.",
  "detailedAnswer": "Since network partitions are unavoidable in any real distributed system, the practical trade-off is between Consistency, where every read returns the latest write or an error, and Availability, where every request gets a response, possibly with stale data.\n\nCP systems, such as MongoDB in strong-consistency mode, HBase, and Zookeeper, sacrifice availability during a partition to guarantee correctness, which is critical for banking or inventory. AP systems, such as Cassandra and DynamoDB, sacrifice strict consistency to remain available, which is acceptable for social feeds or shopping carts where slightly stale data is tolerable.",
  "keyPoints": [
    "CP: banking, inventory — correctness matters more than availability",
    "AP: social feeds, shopping carts — availability matters more, eventual consistency is fine",
    "PACELC extends CAP: even without a partition, there's a latency vs consistency tradeoff"
  ],
  "commonMistakes": [
    "Assuming a system can achieve all three of CAP simultaneously",
    "Not knowing partition tolerance is essentially mandatory in real distributed systems",
    "Confusing CAP consistency with ACID consistency"
  ],
  "followUpQuestions": [
    "What is the PACELC theorem and how does it extend CAP?",
    "Can you give an example of a CP system and an AP system?",
    "How does eventual consistency work in AP systems?"
  ],
  "realWorldExample": "Cassandra is designed as an AP system, prioritizing availability and partition tolerance over strict consistency, making it suitable for large-scale write-heavy workloads.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the practical CP vs AP trade-off and map real systems to each category.",
  "tags": ["CAP Theorem", "Distributed Systems", "System Design", "Interview"],
  "relatedTopics": ["PACELC", "Eventual Consistency", "Distributed Databases"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-005",
  "category": "System Design",
  "topic": "Database Sharding vs Replication",
  "difficulty": "Hard",
  "question": "What is Database Sharding? How does it differ from Replication?",
  "shortAnswer": "Sharding partitions DIFFERENT data across multiple database instances. Replication copies the SAME data to multiple instances.",
  "detailedAnswer": "Replication is used for read scaling and high availability, since every replica holds an identical copy of the data, allowing reads to be distributed and one replica to take over if another fails.\n\nSharding distributes write load by splitting data across shards, either range-based, such as user IDs 1-1M on shard 1, or hash-based, using hash(id) % num_shards. Consistent hashing minimizes data movement when shards are added or removed. Cross-shard joins and distributed transactions are the main challenges introduced by sharding.",
  "keyPoints": [
    "Range-based sharding: good for range queries, risks uneven \"hot spot\" load",
    "Hash-based sharding: even distribution, but range queries must scan all shards",
    "Consistent hashing: minimizes data reshuffling when scaling the shard count up or down"
  ],
  "commonMistakes": [
    "Confusing sharding with replication purpose",
    "Not accounting for hot spots in range-based sharding",
    "Ignoring the cost of cross-shard joins in system design"
  ],
  "followUpQuestions": [
    "What is consistent hashing and why is it used in sharding?",
    "How would you handle a cross-shard join efficiently?",
    "When would you combine sharding with replication?"
  ],
  "realWorldExample": "A large social media platform shards user data by user ID hash across multiple database clusters to distribute write load evenly.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish sharding from replication and discuss trade-offs of sharding strategies.",
  "tags": ["Sharding", "Replication", "System Design", "Interview"],
  "relatedTopics": ["Consistent Hashing", "Horizontal Scaling", "Distributed Databases"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-006",
  "category": "System Design",
  "topic": "URL Shortener Design",
  "difficulty": "Hard",
  "question": "How would you design a URL Shortener (like bit.ly)?",
  "shortAnswer": "Generate a 7-character code (base62 of an auto-increment ID), store the mapping in a DB, and redirect on lookup — scale with a cache and DB sharding.",
  "detailedAnswer": "Converting an auto-increment ID to base62 gives roughly 3.5 trillion unique combinations for a 7-character code. The mapping between short code and long URL is stored in a database.\n\nOn redirect, the system checks a Redis cache first, since hot URLs follow a Zipf distribution where a small fraction get most traffic, falling back to the database on a cache miss and then populating the cache. The database can be sharded by the first character of the short code as traffic grows. A 301 permanent redirect is used if browser caching to reduce server load is desired, or a 302 temporary redirect if accurate click analytics on every visit are needed.",
  "keyPoints": [
    "301: browser caches the redirect, fewer server hits but worse analytics",
    "302: every click hits the server, better for accurate analytics",
    "Custom aliases: check uniqueness against the DB before allowing a premium custom short code"
  ],
  "commonMistakes": [
    "Choosing 301 redirects when accurate analytics are required",
    "Not considering caching for read-heavy redirect traffic",
    "Ignoring collision handling in short code generation"
  ],
  "followUpQuestions": [
    "How would you handle expiring or deleting short URLs?",
    "What is the difference between a 301 and 302 redirect in this context?",
    "How would you shard the database for this system?"
  ],
  "realWorldExample": "Services like bit.ly and tinyurl.com use similar base62 encoding schemes to generate short, unique URLs.",
  "codeExample": {
    "language": "Python",
    "code": "import string\n\nBASE62 = string.digits + string.ascii_letters\n\ndef encode(num):\n    if num == 0:\n        return BASE62[0]\n    chars = []\n    while num:\n        num, rem = divmod(num, 62)\n        chars.append(BASE62[rem])\n    return ''.join(reversed(chars))"
  },
  "interviewerExpectation": "The interviewer expects the candidate to cover encoding scheme, storage, caching, redirect type trade-offs, and scaling strategy.",
  "tags": ["URL Shortener", "System Design", "Interview"],
  "relatedTopics": ["Caching", "Sharding", "Base62 Encoding"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-007",
  "category": "System Design",
  "topic": "Rate Limiter Design",
  "difficulty": "Hard",
  "question": "How would you design a Rate Limiter for an API?",
  "shortAnswer": "Track request counts per user/IP within a time window using algorithms like Token Bucket, Sliding Window, or Fixed Window — typically backed by Redis for distributed systems.",
  "detailedAnswer": "Fixed Window Counter resets a counter every fixed interval, which is simple but allows a burst of 2x the limit right at the window boundary. Sliding Window Log tracks exact timestamps of every request, giving precise limiting but consuming more memory.\n\nToken Bucket adds tokens to a bucket at a steady rate, with each request consuming a token and requests rejected when the bucket is empty, allowing short bursts while enforcing a steady average rate. For a distributed system with multiple API server instances, the counter state must live in a shared store like Redis using INCR plus EXPIRE, rather than in-memory per server, or different servers would enforce inconsistent limits.",
  "keyPoints": [
    "Token Bucket: allows short bursts while maintaining a steady average rate — most commonly used",
    "Fixed Window: simple but has a boundary-burst problem (2x limit possible at window edges)",
    "Distributed rate limiting requires a shared store (Redis) — in-memory counters don't work across instances"
  ],
  "commonMistakes": [
    "Using in-memory counters in a distributed multi-server setup",
    "Not accounting for the boundary-burst problem in Fixed Window counters",
    "Choosing Sliding Window Log without considering its memory cost at scale"
  ],
  "followUpQuestions": [
    "Why does Fixed Window Counter allow a boundary burst?",
    "How does Token Bucket allow short bursts while enforcing an average rate?",
    "Why must distributed rate limiting use a shared store like Redis?"
  ],
  "realWorldExample": "API gateway uses Redis-backed Token Bucket rate limiting to allow short traffic bursts from a client while still enforcing an average request rate limit.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to compare rate limiting algorithms and explain why distributed systems need a shared state store.",
  "tags": ["Rate Limiter", "System Design", "Interview"],
  "relatedTopics": ["Redis", "Token Bucket", "API Design"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-008",
  "category": "System Design",
  "topic": "Notification System Design",
  "difficulty": "Hard",
  "question": "How would you design a Notification System (push, email, SMS)?",
  "shortAnswer": "Use a message queue to decouple notification generation from delivery, with separate consumer workers per channel (email, SMS, push), supporting retries and user preferences.",
  "detailedAnswer": "When an event triggers a notification, the triggering service publishes an event to a message queue rather than directly calling email or SMS APIs synchronously, decoupling the triggering service from delivery concerns and absorbing traffic spikes.\n\nSeparate consumer services subscribe to the queue for each channel type, each calling the appropriate third-party provider. A user preferences service checks opt-in or opt-out settings before sending. Failed deliveries go to a retry queue with exponential backoff, then a dead-letter queue after repeated failures for manual investigation.",
  "keyPoints": [
    "Message queue decouples the triggering event from actual delivery — improves resilience and scalability",
    "Separate consumer per channel: independent scaling and failure isolation between email/SMS/push",
    "Idempotency keys prevent duplicate notifications if a message is processed more than once"
  ],
  "commonMistakes": [
    "Calling third-party notification APIs synchronously from the triggering service",
    "Not implementing a dead-letter queue for repeatedly failing notifications",
    "Forgetting idempotency keys, risking duplicate notifications on retry"
  ],
  "followUpQuestions": [
    "Why is a dead-letter queue useful for failed notifications?",
    "How would you prevent duplicate notifications on message reprocessing?",
    "Why should each channel have its own consumer service?"
  ],
  "realWorldExample": "An e-commerce platform publishes an 'order shipped' event to a queue, and separate consumers send an email confirmation and a push notification independently.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain decoupling via message queue and describe retry/failure handling for reliability.",
  "tags": ["Notification System", "Message Queue", "System Design", "Interview"],
  "relatedTopics": ["Message Queue", "Idempotency", "Retry Strategies"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-009",
  "category": "System Design",
  "topic": "CDN (Content Delivery Network)",
  "difficulty": "Medium",
  "question": "What is a Content Delivery Network (CDN)? How does it improve performance?",
  "shortAnswer": "A CDN is a geographically distributed network of edge servers caching content close to users, reducing latency and offloading the origin server.",
  "detailedAnswer": "Instead of every request traveling to a single origin server, potentially across the world, a CDN caches content across globally distributed edge locations. DNS-based or Anycast routing directs each user to the nearest edge server, which serves cached content directly, dramatically cutting latency and taking most traffic load off the origin.\n\nCDNs also commonly provide DDoS protection, SSL termination at the edge, and on-the-fly image or video optimization.",
  "keyPoints": [
    "Reduces latency by physical proximity — content is served from a nearby edge server",
    "Offloads the origin server — most requests never actually reach it",
    "Cache-Control headers and TTLs determine how long edge servers keep content before re-fetching"
  ],
  "commonMistakes": [
    "Assuming CDNs only cache static content, ignoring dynamic content acceleration features",
    "Not configuring appropriate Cache-Control headers, causing stale or unnecessarily fresh content",
    "Underestimating how much origin server load is reduced by CDN caching"
  ],
  "followUpQuestions": [
    "How do Cache-Control headers determine CDN caching behavior?",
    "What additional security benefits do CDNs commonly provide?",
    "How does a CDN route a user to the nearest edge server?"
  ],
  "realWorldExample": "A global e-commerce site uses Cloudflare as a CDN to serve product images from edge locations near each user, significantly reducing page load times worldwide.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the latency-reduction and origin-offloading benefits of CDNs and name common real-world providers.",
  "tags": ["CDN", "System Design", "Performance", "Interview"],
  "relatedTopics": ["DNS", "Latency", "Caching"],
  "references": ["Computer Networking - Kurose & Ross"]
},
{
  "id": "sysd-010",
  "category": "System Design",
  "topic": "Chat/Messaging Application Design",
  "difficulty": "Hard",
  "question": "How would you design a Chat/Messaging Application (like WhatsApp)?",
  "shortAnswer": "Use WebSocket connections for real-time delivery, a message queue for reliability, and a database optimized for fast writes with delivery/read receipt tracking.",
  "detailedAnswer": "Each connected client maintains a persistent WebSocket connection to a chat server. When a message is sent, it's written to a durable message store first, ensuring no message loss even if delivery fails, then the system checks if the recipient is currently connected; if so, it pushes via WebSocket immediately, otherwise it queues for delivery on reconnect and optionally triggers a push notification.\n\nFor group chats, the message is fanned out to all connected members' WebSocket connections. Delivery and read receipts are tracked as separate status updates per message per recipient. At scale, WebSocket connections are distributed across many chat server instances, requiring a pub-sub layer to route messages to whichever server instance holds the recipient's connection.",
  "keyPoints": [
    "Persist message to durable storage FIRST, then attempt real-time delivery — never lose a message",
    "Offline users: queue the message and/or trigger a push notification for later delivery",
    "Multi-server WebSocket routing requires pub-sub (Redis/Kafka) to find which server holds a given user's connection"
  ],
  "commonMistakes": [
    "Attempting real-time delivery before persisting the message, risking message loss",
    "Not accounting for pub-sub routing needed across multiple chat server instances",
    "Forgetting to handle offline users with queuing and push notifications"
  ],
  "followUpQuestions": [
    "Why must the message be persisted before attempting delivery?",
    "How does pub-sub help route messages across multiple chat server instances?",
    "How would you handle fan-out for large group chats efficiently?"
  ],
  "realWorldExample": "WhatsApp persists every message to durable storage before attempting real-time WebSocket delivery, ensuring no message is lost even during connectivity issues.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to cover message durability, real-time delivery via WebSocket, offline handling, and multi-server routing.",
  "tags": ["Chat Application", "WebSocket", "System Design", "Interview"],
  "relatedTopics": ["Pub-Sub", "Message Queue", "Real-time Communication"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-011",
  "category": "System Design",
  "topic": "Kafka vs RabbitMQ",
  "difficulty": "Medium",
  "question": "What is a Message Queue? Compare Kafka and RabbitMQ.",
  "shortAnswer": "A message queue decouples producers from consumers for async processing. Kafka: append-only log, high throughput, replay-capable. RabbitMQ: traditional queue, flexible routing, ack-based delivery.",
  "detailedAnswer": "Kafka stores messages as an append-only, partitioned log retained for a configurable period, or forever; consumers track their own offset, so multiple consumer groups can independently replay the same messages, and Kafka is optimized for very high throughput event streaming.\n\nRabbitMQ is a traditional message broker where messages are typically consumed and removed from the queue, supports complex routing rules through direct, topic, and fanout exchanges, per-message acknowledgement with automatic redelivery on failure, and is generally simpler to reason about for classic task-queue use cases.",
  "keyPoints": [
    "Kafka: best for event streaming, replay capability, extremely high throughput",
    "RabbitMQ: best for traditional task queues, complex routing, per-message reliability guarantees",
    "Dead Letter Queue (both support): captures messages that fail processing after repeated retries"
  ],
  "commonMistakes": [
    "Choosing RabbitMQ for high-throughput event streaming where Kafka would be better suited",
    "Not knowing Kafka retains messages allowing replay, unlike traditional queues",
    "Confusing Kafka's log-based model with RabbitMQ's queue-based model"
  ],
  "followUpQuestions": [
    "Why would you choose Kafka over RabbitMQ for event streaming?",
    "How does RabbitMQ's routing flexibility differ from Kafka's partitioned log model?",
    "What is a Dead Letter Queue used for?"
  ],
  "realWorldExample": "A large e-commerce platform uses Kafka for high-throughput clickstream event processing, while using RabbitMQ for reliable background job processing like sending order confirmation emails.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain decoupling benefits and compare at least two message queue technologies.",
  "tags": ["Message Queue", "Kafka", "RabbitMQ", "System Design", "Interview"],
  "relatedTopics": ["Asynchronous Processing", "Event-Driven Architecture", "Fault Tolerance"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-012",
  "category": "System Design",
  "topic": "Distributed File Storage System",
  "difficulty": "Hard",
  "question": "How would you design a Distributed File Storage System (like Google Drive or Dropbox)?",
  "shortAnswer": "Split large files into chunks, store chunks across multiple storage nodes with replication, and maintain metadata (file→chunk mapping) in a separate fast metadata service.",
  "detailedAnswer": "Large files are split into fixed-size chunks rather than stored as single monolithic files, enabling parallel upload/download, efficient delta-sync where only changed chunks are re-uploaded, and deduplication where identical chunks across different files or users are stored only once.\n\nEach chunk is replicated across multiple storage nodes, typically 3 replicas, for durability and availability. A separate metadata service tracks which chunks belong to which file, their order, and their storage node locations, and must be highly available and fast, often using a distributed database. Client-side, a sync engine watches for local file changes and uploads only the changed chunks using content hashing to detect what actually changed.",
  "keyPoints": [
    "Chunking enables parallel transfer, delta-sync (upload only changed parts), and deduplication",
    "Chunk replication (typically 3x) across different physical nodes/racks for durability",
    "Metadata service is separate from actual chunk storage — must be fast and highly available"
  ],
  "commonMistakes": [
    "Storing files monolithically instead of chunking, missing delta-sync and dedup benefits",
    "Not separating the metadata service from chunk storage",
    "Underestimating replication needs for chunk durability"
  ],
  "followUpQuestions": [
    "How does content hashing enable deduplication?",
    "Why is the metadata service kept separate from chunk storage?",
    "How does chunking enable efficient delta-sync?"
  ],
  "realWorldExample": "Dropbox splits files into 4MB blocks, uploading only changed blocks when a file is modified, and deduplicating identical blocks across different users' files.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain chunking, replication, and the separation of metadata from actual storage.",
  "tags": ["Distributed File Storage", "System Design", "Interview"],
  "relatedTopics": ["Replication", "Deduplication", "Metadata Service"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-013",
  "category": "System Design",
  "topic": "Web Crawler Design",
  "difficulty": "Hard",
  "question": "How would you design a Web Crawler?",
  "shortAnswer": "Use a URL frontier (priority queue) to manage URLs to visit, a distributed fetcher pool, and a deduplication mechanism to avoid re-crawling the same content.",
  "detailedAnswer": "The URL Frontier maintains the queue of URLs pending a crawl, prioritized by factors like page importance, crawl freshness needs, and politeness, which rate-limits requests per domain to avoid overwhelming any single site.\n\nA pool of distributed fetcher workers pulls URLs from the frontier, downloads content, and extracts new links to feed back into the frontier. A deduplication layer, often using a Bloom filter for memory efficiency, prevents re-crawling URLs already visited or already queued. Politeness policies, such as respecting robots.txt and limiting request rate per domain, are essential to avoid being blocked.",
  "keyPoints": [
    "Bloom filter: memory-efficient probabilistic structure to check \"have I seen this URL before?\"",
    "Politeness policy: rate-limit requests per domain, respect robots.txt to avoid overwhelming sites",
    "URL frontier prioritization: balance between crawling new content and refreshing already-indexed pages"
  ],
  "commonMistakes": [
    "Not implementing politeness policies, risking being blocked by crawled sites",
    "Using exact-match deduplication instead of a memory-efficient Bloom filter at scale",
    "Not prioritizing the URL frontier, treating all URLs with equal importance"
  ],
  "followUpQuestions": [
    "How does a Bloom filter help with deduplication at scale?",
    "Why is politeness important when designing a web crawler?",
    "How would you prioritize URLs in the frontier?"
  ],
  "realWorldExample": "A search engine's crawler uses a Bloom filter to efficiently check whether a URL has already been visited before adding it to the crawl queue.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to describe the frontier, fetcher pool, deduplication, and politeness policies of a scalable web crawler.",
  "tags": ["Web Crawler", "System Design", "Interview"],
  "relatedTopics": ["Bloom Filter", "URL Frontier", "Distributed Systems"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-014",
  "category": "System Design",
  "topic": "Distributed Unique ID Generator",
  "difficulty": "Hard",
  "question": "How would you design a Distributed Unique ID Generator (like Twitter's Snowflake)?",
  "shortAnswer": "Generate IDs combining a timestamp, a machine/worker ID, and a sequence number — ensuring uniqueness across distributed machines without a central coordinator.",
  "detailedAnswer": "A centralized auto-increment counter becomes a bottleneck and single point of failure at scale. Twitter's Snowflake approach generates 64-bit IDs composed of a timestamp, representing milliseconds since a custom epoch to ensure rough time-ordering of IDs, a machine or worker ID identifying which server generated it to avoid collisions between machines, and a sequence number incrementing for multiple IDs generated within the same millisecond on the same machine.\n\nThis allows any server to generate globally unique, roughly time-sortable IDs completely independently, with no coordination or network calls needed between machines.",
  "keyPoints": [
    "Combines timestamp + machine ID + sequence number into one 64-bit value",
    "No central coordinator needed — each machine generates IDs completely independently",
    "IDs are roughly time-sortable (since timestamp is the most significant bits) — useful for pagination/ordering"
  ],
  "commonMistakes": [
    "Using a centralized auto-increment counter, creating a bottleneck at scale",
    "Not including a machine ID, risking collisions between different servers",
    "Forgetting the sequence number, causing ID collisions within the same millisecond"
  ],
  "followUpQuestions": [
    "Why does a centralized ID generator become a bottleneck at scale?",
    "How does the timestamp component enable rough time-sortability?",
    "What happens if two machines generate IDs at the exact same millisecond?"
  ],
  "realWorldExample": "Twitter's Snowflake ID generator produces unique, roughly time-sortable IDs for tweets across thousands of distributed servers without any central coordination.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the three components of a Snowflake-style ID and why they eliminate the need for central coordination.",
  "tags": ["Distributed ID Generation", "Snowflake", "System Design", "Interview"],
  "relatedTopics": ["Distributed Systems", "Sharding", "Sequence Generation"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-015",
  "category": "System Design",
  "topic": "Database Connection Pooling at Scale",
  "difficulty": "Medium",
  "question": "What is Database Connection Pooling and Why Does It Matter at Scale?",
  "shortAnswer": "Connection pooling maintains a set of reusable, pre-established database connections instead of opening a new one for every request — critical for handling high request volume without overwhelming the database.",
  "detailedAnswer": "Establishing a new database connection is expensive, involving a TCP handshake, authentication, and session setup; under high traffic, opening and closing per request would add significant latency and could exhaust the database's maximum connection limit.\n\nA connection pool maintains a fixed number of pre-established connections; application code borrows one, uses it, and returns it to the pool. Pool size must be carefully tuned: too small causes requests to queue and wait, while too large can overwhelm the database server's own resource limits since each connection consumes database-side memory.",
  "keyPoints": [
    "Reduces per-request connection setup overhead (TCP handshake + auth)",
    "Pool size tuning is critical: too small = request queuing, too large = database resource exhaustion",
    "PgBouncer, HikariCP: widely used connection pooling tools for PostgreSQL and Java applications respectively"
  ],
  "commonMistakes": [
    "Setting the connection pool size too small, causing request queuing",
    "Setting the pool size too large, exhausting database resources",
    "Not using connection pooling at all under high-traffic conditions"
  ],
  "followUpQuestions": [
    "How would you determine the right connection pool size?",
    "What happens if a connection pool is exhausted?",
    "What are some common connection pooling tools?"
  ],
  "realWorldExample": "A high-traffic web application uses PgBouncer in front of PostgreSQL to manage a fixed pool of database connections across many application server instances.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain why connection setup is expensive and how pooling mitigates that cost, along with sizing trade-offs.",
  "tags": ["Connection Pooling", "Database Performance", "System Design", "Interview"],
  "relatedTopics": ["Database Performance", "Scalability", "PgBouncer"],
  "references": ["Database System Concepts - Silberschatz"]
},
{
  "id": "sysd-016",
  "category": "System Design",
  "topic": "Idempotency in Payment Systems",
  "difficulty": "Hard",
  "question": "How would you handle Idempotency in a Payment/Order Processing System?",
  "shortAnswer": "Require clients to send a unique Idempotency-Key with each request; the server stores the result of the first request against that key and returns the cached result for any retry with the same key, without re-executing the operation.",
  "detailedAnswer": "In distributed systems, network failures make it impossible for a client to always know whether a request actually succeeded server-side before the response was lost, and the natural retry instinct risks duplicate execution, such as double-charging a customer.\n\nThe client generates a unique key per logical operation, not per HTTP attempt, reused across retries of that same attempt. The server checks if it has already processed that key: if yes, it immediately returns the previously stored result without re-executing anything; if no, it processes the request normally and stores the result against that key before responding, making the endpoint safe to retry any number of times.",
  "keyPoints": [
    "Idempotency-Key: generated once per logical operation, reused across retries of that same attempt",
    "Server must store (key → result) mapping, typically with an expiry (e.g., 24 hours) to bound storage growth",
    "Stripe, PayPal, and most payment APIs mandate this pattern for their charge/payment endpoints"
  ],
  "commonMistakes": [
    "Generating a new idempotency key per HTTP attempt instead of per logical operation",
    "Not expiring stored idempotency key results, causing unbounded storage growth",
    "Assuming retries are automatically safe without implementing this pattern"
  ],
  "followUpQuestions": [
    "Why must the idempotency key be per logical operation, not per HTTP attempt?",
    "How would you bound the storage growth of idempotency key mappings?",
    "What happens if two requests with the same idempotency key arrive simultaneously?"
  ],
  "realWorldExample": "Stripe's payment API requires an idempotency key on charge requests so that network retries don't accidentally charge a customer multiple times.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain why idempotency matters for retries and describe the Idempotency-Key pattern for non-idempotent operations.",
  "tags": ["Idempotency", "Payment Systems", "System Design", "Interview"],
  "relatedTopics": ["API Design", "Distributed Systems", "Retry Strategies"],
  "references": ["Stripe API Documentation"]
},
{
  "id": "sysd-017",
  "category": "System Design",
  "topic": "Database Replication Lag",
  "difficulty": "Hard",
  "question": "What is Database Replication Lag? How does it affect application design?",
  "shortAnswer": "Replication lag is the delay between a write on the primary database and that write becoming visible on read replicas — it can cause a user to not see their own just-made change if reads go to a lagging replica.",
  "detailedAnswer": "In a Primary-Replica setup with asynchronous replication, common for performance, writes commit immediately on the primary, and replicas apply the same changes shortly after, but 'shortly after' can range from milliseconds to seconds under heavy load.\n\nThis creates a classic UX bug: a user updates their profile, the write goes to the primary, but an immediately following GET request happens to be routed to a lagging replica, showing stale data as though the update failed. Solutions include a 'read-your-writes' consistency pattern, routing a user's own reads to the primary for a short window after they write, or routing all reads immediately after a write operation to the primary rather than a replica.",
  "keyPoints": [
    "Async replication trades consistency for write performance — lag is the direct cost of that tradeoff",
    "\"Read-your-writes\" pattern: route the writing user's subsequent reads to the primary temporarily",
    "Monitoring replication lag is a standard production metric — alerting if lag exceeds an acceptable threshold"
  ],
  "commonMistakes": [
    "Routing all reads to replicas without considering read-your-writes UX issues",
    "Not monitoring replication lag as a production metric",
    "Assuming asynchronous replication guarantees immediate consistency"
  ],
  "followUpQuestions": [
    "How would you implement 'read-your-writes' consistency?",
    "What causes replication lag to increase under heavy load?",
    "Why is monitoring replication lag important in production?"
  ],
  "realWorldExample": "A social media app routes a user's own profile reads to the primary database for a few seconds after they update their profile, avoiding the appearance of a failed update due to replication lag.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the cause of replication lag and describe the read-your-writes mitigation pattern.",
  "tags": ["Replication Lag", "Database Replication", "System Design", "Interview"],
  "relatedTopics": ["Eventual Consistency", "Replication", "Read-Your-Writes"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-018",
  "category": "System Design",
  "topic": "Trending Topics / Top K Design",
  "difficulty": "Hard",
  "question": "How would you design a \"Trending Topics\" or \"Top K\" feature (like Twitter Trends)?",
  "shortAnswer": "Use a sliding time window with approximate counting structures (like Count-Min Sketch) combined with a min-heap to efficiently track the top K most frequent items without storing exact counts for everything.",
  "detailedAnswer": "Tracking exact counts for every possible topic or hashtag over a rolling time window at massive scale would require enormous memory. A Count-Min Sketch is a probabilistic data structure that approximates frequency counts using a small, fixed amount of memory, trading a small amount of accuracy for massive memory savings compared to exact counting.\n\nCombined with a min-heap tracking the current top K candidates, the system can efficiently maintain an approximate top trending list in real time without needing to store or scan every single distinct topic ever mentioned. Time-windowing, only counting recent events and decaying older ones, keeps the trending concept relevant to what's happening now.",
  "keyPoints": [
    "Count-Min Sketch: probabilistic frequency counter, fixed memory, occasional overestimation but never underestimation",
    "Min-heap of size K: efficiently maintains the current top K candidates as counts are updated",
    "Sliding/decaying time window ensures \"trending\" reflects recent activity, not stale historical totals"
  ],
  "commonMistakes": [
    "Trying to track exact counts for every topic at scale, exhausting memory",
    "Not implementing a decaying time window, causing stale historical totals to dominate",
    "Confusing Count-Min Sketch's overestimation bias with random error"
  ],
  "followUpQuestions": [
    "Why does Count-Min Sketch only overestimate, never underestimate?",
    "How does the min-heap efficiently maintain the top K candidates?",
    "Why is a sliding time window important for a trending feature?"
  ],
  "realWorldExample": "Twitter's Trending Topics feature uses approximate counting structures to efficiently surface the most-mentioned hashtags in near real-time across millions of tweets.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain why exact counting is infeasible at scale and describe the Count-Min Sketch plus min-heap approach.",
  "tags": ["Trending Topics", "Count-Min Sketch", "System Design", "Interview"],
  "relatedTopics": ["Min-Heap", "Approximate Algorithms", "Time-Windowing"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-019",
  "category": "System Design",
  "topic": "Consistent Hashing",
  "difficulty": "Hard",
  "question": "What is Consistent Hashing? Why is it used in distributed systems?",
  "shortAnswer": "Consistent Hashing maps both data and servers onto a conceptual \"ring\" using a hash function, so that adding or removing a server only requires reassigning a small fraction of the data, rather than reshuffling everything.",
  "detailedAnswer": "With naive hashing, using hash(key) mod num_servers, adding or removing even one server changes the modulus, causing almost all keys to be remapped to different servers, which is catastrophic for a cache or distributed database.\n\nConsistent hashing places both servers and data keys onto a fixed circular hash space, the ring, with each key assigned to the next server found by moving clockwise from the key's position. When a server is added or removed, only the keys that fall between it and its neighboring server on the ring need to move; everything else stays put. Virtual nodes, where each physical server is represented multiple times on the ring, improve load distribution evenness.",
  "keyPoints": [
    "Naive hashing (mod N): adding/removing a server remaps almost ALL keys — very disruptive",
    "Consistent hashing: only keys near the changed server on the ring need to move — minimal disruption",
    "Virtual nodes: each physical server appears multiple times on the ring, improving load balance evenness"
  ],
  "commonMistakes": [
    "Using naive modulus-based hashing in a system where servers scale up or down",
    "Not using virtual nodes, leading to uneven load distribution across physical servers",
    "Assuming consistent hashing eliminates all data movement rather than just minimizing it"
  ],
  "followUpQuestions": [
    "Why does naive hashing cause almost all keys to remap when a server is added?",
    "What role do virtual nodes play in consistent hashing?",
    "How does consistent hashing minimize data movement compared to naive hashing?"
  ],
  "realWorldExample": "Redis Cluster and Amazon DynamoDB both use consistent hashing to distribute keys across nodes while minimizing data movement when the cluster scales.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the ring concept and articulate why consistent hashing minimizes data movement compared to naive hashing.",
  "tags": ["Consistent Hashing", "System Design", "Interview"],
  "relatedTopics": ["Sharding", "Distributed Cache", "Load Balancing"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-020",
  "category": "System Design",
  "topic": "Distributed Lock Design",
  "difficulty": "Hard",
  "question": "How would you design a Distributed Lock (for coordinating access across multiple servers)?",
  "shortAnswer": "Use a shared, external coordination service (Redis with SET NX + expiry, or Zookeeper/etcd) to ensure only one server/process can hold the lock at a time, with a timeout to prevent permanent deadlock if the lock holder crashes.",
  "detailedAnswer": "In a single-machine application, a regular mutex works fine, but across multiple servers or processes, an in-memory lock is meaningless since each server has its own separate memory space. A distributed lock requires an external, shared source of truth.\n\nA common simple implementation uses Redis's SET lock_key unique_value NX EX 30, atomically setting the key only if it doesn't already exist with a 30-second expiry; if the process holding the lock crashes without releasing it, the expiry ensures automatic release rather than permanent deadlock. More robust implementations, such as the Redlock algorithm or using Zookeeper/etcd, address edge cases like clock drift and network partitions that a naive single-Redis-instance approach can be vulnerable to.",
  "keyPoints": [
    "Redis SET NX EX: atomic \"set if not exists\" with automatic expiry, a common simple implementation",
    "Expiry/TTL is critical: prevents permanent deadlock if the lock-holding process crashes without releasing it",
    "Zookeeper/etcd: provide stronger consistency guarantees than a single Redis instance, at higher operational complexity"
  ],
  "commonMistakes": [
    "Implementing a distributed lock without an expiry, risking permanent deadlock on crash",
    "Assuming a single Redis instance provides the same guarantees as Zookeeper/etcd",
    "Not accounting for clock drift or network partition edge cases in a naive implementation"
  ],
  "followUpQuestions": [
    "Why is a TTL/expiry critical for a distributed lock implementation?",
    "What edge cases does the Redlock algorithm address that a naive Redis lock doesn't?",
    "When would you choose Zookeeper/etcd over Redis for distributed locking?"
  ],
  "realWorldExample": "A distributed job scheduler uses a Redis-based lock to ensure only one server instance executes a scheduled cron job at a time, even when running across multiple replicas.",
  "codeExample": {
    "language": "",
    "code": "SET lock:job1 \"worker-42\" NX EX 30"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the need for an external coordination service and the critical role of expiry in preventing deadlock.",
  "tags": ["Distributed Lock", "Redis", "System Design", "Interview"],
  "relatedTopics": ["Zookeeper", "Redlock", "Distributed Coordination"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-021",
  "category": "System Design",
  "topic": "Synchronous vs Asynchronous Communication",
  "difficulty": "Medium",
  "question": "What is the Difference Between Synchronous and Asynchronous Communication in Microservices?",
  "shortAnswer": "Synchronous: caller waits for an immediate response (REST/gRPC calls). Asynchronous: caller sends a message/event and continues without waiting (message queues, event streaming).",
  "detailedAnswer": "Synchronous communication is simple to reason about and gives immediate feedback, but creates tight temporal coupling; if the called service is slow or down, the calling service is blocked or fails too, and this can cascade across a chain of dependent services.\n\nAsynchronous communication decouples services in time; the caller publishes a message and moves on immediately, and the receiving service processes it whenever it's able to, improving resilience to downstream slowness or outages, at the cost of added complexity such as eventual consistency and harder debugging of a request's full lifecycle across services.",
  "keyPoints": [
    "Synchronous: simple, immediate results, but creates tight coupling and cascading failure risk",
    "Asynchronous: resilient to downstream slowness, but adds complexity (eventual consistency, harder tracing)",
    "Most real systems use BOTH strategically — sync for user-facing requests needing immediate results, async for background work"
  ],
  "commonMistakes": [
    "Using synchronous calls for background tasks that don't require an immediate response",
    "Not accounting for cascading failure risk in a chain of synchronous service calls",
    "Assuming asynchronous communication eliminates all coupling rather than just temporal coupling"
  ],
  "followUpQuestions": [
    "How can a slow downstream service cause a cascading failure in synchronous communication?",
    "What complexity does asynchronous communication introduce for debugging?",
    "How would you decide when to use synchronous versus asynchronous communication?"
  ],
  "realWorldExample": "An e-commerce checkout flow uses synchronous calls for immediate payment confirmation, while using asynchronous messaging for background tasks like sending order confirmation emails.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the coupling and resilience trade-offs and identify appropriate use cases for each communication style.",
  "tags": ["Synchronous Communication", "Asynchronous Communication", "Microservices", "System Design", "Interview"],
  "relatedTopics": ["Message Queue", "Microservices", "Circuit Breaker"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-022",
  "category": "System Design",
  "topic": "Autocomplete/Typeahead Design",
  "difficulty": "Medium",
  "question": "How would you design an Autocomplete/Typeahead Search Feature?",
  "shortAnswer": "Use a Trie data structure (or a pre-built index) to store search terms, ranked by popularity, with results served from an in-memory cache for very low latency.",
  "detailedAnswer": "A Trie efficiently stores all possible search terms or phrases, allowing fast prefix-based lookup, so typing a partial word quickly retrieves all terms starting with that prefix. Each node or terminal can store a popularity score based on historical search frequency, so results are returned ranked by relevance rather than just alphabetically.\n\nFor scale, the Trie or a similar precomputed index is often built offline or periodically from search log analysis and then loaded into a fast in-memory cache serving suggestions with very low latency, since autocomplete must feel instantaneous. Client-side debouncing, waiting briefly after the last keystroke before firing a request, reduces unnecessary backend load.",
  "keyPoints": [
    "Trie: efficient prefix-based lookup structure, natural fit for autocomplete's \"starts with X\" queries",
    "Popularity ranking: results ordered by historical search frequency, not just alphabetically",
    "Client-side debouncing: delays firing requests until the user briefly pauses typing, reducing backend load"
  ],
  "commonMistakes": [
    "Not debouncing client-side requests, overwhelming the backend with excessive calls",
    "Ranking results alphabetically instead of by popularity",
    "Rebuilding the Trie synchronously on every search rather than periodically offline"
  ],
  "followUpQuestions": [
    "How does client-side debouncing reduce backend load?",
    "How would you keep the popularity ranking data fresh over time?",
    "Why is a Trie a natural fit for prefix-based autocomplete queries?"
  ],
  "realWorldExample": "Google's search autocomplete uses a precomputed, popularity-ranked index built from search log analysis, served from an in-memory cache for near-instant suggestions.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the Trie's role, popularity ranking, and client-side optimizations like debouncing.",
  "tags": ["Autocomplete", "Trie", "System Design", "Interview"],
  "relatedTopics": ["Trie", "Caching", "Search Systems"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-023",
  "category": "System Design",
  "topic": "Consistency Trade-offs Per Feature",
  "difficulty": "Hard",
  "question": "What is Database Read Replica Lag Tolerance vs Strong Consistency Trade-off in System Design Interviews?",
  "shortAnswer": "Deciding whether a feature can tolerate eventual consistency (reading from replicas, faster/cheaper) or requires strong consistency (reading from the primary, slower but always accurate) is a core system design decision made per use case, not system-wide.",
  "detailedAnswer": "Not every read in a system needs the same consistency guarantee; a smart system design distinguishes between different types of reads based on their actual requirements. A user's own profile page after they just updated it might need strong consistency to avoid a confusing UX, while a public analytics dashboard showing aggregate statistics can comfortably tolerate several seconds of staleness from a replica.\n\nExplicitly identifying which parts of a system genuinely need strong consistency, routing only those specific reads to the primary, versus which can safely use replicas for better scalability, is a hallmark of mature system design thinking in interviews.",
  "keyPoints": [
    "Not every read needs the same consistency level — this decision should be made per-feature, not system-wide",
    "Strong consistency reads: route to primary (slower, more resource-constrained, but always accurate)",
    "Eventually-consistent reads: route to replicas (faster, more scalable, acceptable staleness for the use case)"
  ],
  "commonMistakes": [
    "Applying the same consistency level to all reads system-wide instead of per-feature",
    "Routing all reads to replicas without considering UX impact for user-specific data",
    "Not distinguishing between features that genuinely need strong consistency and those that don't"
  ],
  "followUpQuestions": [
    "Can you give an example of a feature that needs strong consistency versus one that doesn't?",
    "How would you route reads differently based on their consistency requirements?",
    "Why is this decision considered a hallmark of mature system design thinking?"
  ],
  "realWorldExample": "A social media platform routes a user's own post updates to the primary for strong consistency, while routing public follower-count displays to replicas since slight staleness is acceptable.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to demonstrate per-feature consistency reasoning rather than applying a single system-wide consistency policy.",
  "tags": ["Consistency Trade-offs", "Read Replicas", "System Design", "Interview"],
  "relatedTopics": ["Replication Lag", "Read-Your-Writes", "CAP Theorem"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "sysd-024",
  "category": "System Design",
  "topic": "Distributed Cache Design",
  "difficulty": "Hard",
  "question": "How would you design a Distributed Cache (like Redis Cluster) that Scales Beyond a Single Machine's Memory?",
  "shortAnswer": "Partition (shard) the cache's keyspace across multiple nodes using consistent hashing, with each node handling only a subset of keys — clients or a proxy layer route requests to the correct node.",
  "detailedAnswer": "A single cache server's memory eventually becomes a bottleneck. A distributed cache shards its keyspace across multiple nodes, typically using consistent hashing so that adding or removing nodes doesn't require reshuffling the entire keyspace.\n\nClients, or a proxy layer sitting in front of the cluster, compute which node owns a given key and route requests directly there. Replication can be added per-shard for fault tolerance, so if a node holding certain keys goes down, a replica can take over without losing that portion of the cache. Redis Cluster implements this natively, splitting the keyspace into 16,384 hash slots distributed across nodes.",
  "keyPoints": [
    "Consistent hashing shards the keyspace, minimizing data movement when nodes are added/removed",
    "Per-shard replication provides fault tolerance without needing to replicate the ENTIRE dataset on every node",
    "Redis Cluster: production example using 16,384 hash slots distributed and rebalanced across cluster nodes"
  ],
  "commonMistakes": [
    "Replicating the entire dataset on every node instead of sharding for scalability",
    "Not using consistent hashing, causing massive data movement when nodes change",
    "Assuming a single node's memory can scale indefinitely without partitioning"
  ],
  "followUpQuestions": [
    "How does Redis Cluster use hash slots for sharding?",
    "Why is per-shard replication preferred over full dataset replication?",
    "How does consistent hashing minimize disruption when scaling the cluster?"
  ],
  "realWorldExample": "Redis Cluster distributes its 16,384 hash slots across multiple nodes, allowing the cache to scale beyond a single machine's memory while minimizing data movement when nodes are added.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain keyspace sharding via consistent hashing and describe per-shard replication for fault tolerance.",
  "tags": ["Distributed Cache", "Redis Cluster", "System Design", "Interview"],
  "relatedTopics": ["Consistent Hashing", "Replication", "Caching"],
  "references": ["Redis Documentation - redis.io"]
},
{
  "id": "sysd-025",
  "category": "System Design",
  "topic": "Circuit Breaker Pattern",
  "difficulty": "Hard",
  "question": "What is the Circuit Breaker Pattern in Distributed Systems? Why is it necessary?",
  "shortAnswer": "A Circuit Breaker monitors calls to a downstream service and \"trips open\" after repeated failures, immediately failing subsequent calls without even attempting them — preventing cascading failures and giving the struggling service time to recover.",
  "detailedAnswer": "Without a circuit breaker, if a downstream service becomes slow or unresponsive, calling services keep sending requests, each waiting for a timeout, which can exhaust the calling service's own thread pool or connection resources, causing it to become unresponsive too, with the failure cascading upstream.\n\nA circuit breaker tracks the failure rate of calls to a specific downstream dependency; once failures exceed a threshold, it trips to an OPEN state, immediately failing or returning a fallback response for all further calls without actually attempting them, for a cooldown period. After the cooldown, the breaker moves to a HALF-OPEN state, cautiously allowing a few test requests through to check if the downstream service has recovered before fully closing the circuit again.",
  "keyPoints": [
    "CLOSED state: normal operation, requests pass through and failures are being tracked",
    "OPEN state: after too many failures, all calls immediately fail/fallback without even attempting the real call",
    "HALF-OPEN state: after a cooldown, cautiously tests a few requests to check if the dependency has recovered"
  ],
  "commonMistakes": [
    "Not implementing a circuit breaker, allowing cascading failures across a service chain",
    "Confusing the three states: CLOSED, OPEN, and HALF-OPEN",
    "Not providing a fallback response when the circuit is OPEN"
  ],
  "followUpQuestions": [
    "What happens during the HALF-OPEN state?",
    "How does a circuit breaker prevent cascading failures?",
    "What is a fallback response and why is it useful when the circuit is open?"
  ],
  "realWorldExample": "Netflix's Hystrix library implements the Circuit Breaker pattern to prevent a single slow microservice from cascading failures across their entire distributed system.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain all three circuit breaker states and describe how the pattern prevents cascading failures.",
  "tags": ["Circuit Breaker", "System Design", "Microservices", "Interview"],
  "relatedTopics": ["Cascading Failures", "Microservices", "Resilience Patterns"],
  "references": ["Designing Data-Intensive Applications - Martin Kleppmann"]
},
{
  "id": "git-001",
  "category": "Git & GitHub",
  "topic": "Git Merge vs Rebase",
  "difficulty": "Medium",
  "question": "What is the difference between Git Merge and Git Rebase?",
  "shortAnswer": "Merge creates a new commit combining two branch histories, preserving both. Rebase replays commits from one branch onto another, creating a linear history.",
  "detailedAnswer": "git merge takes the divergent history of two branches and creates a new merge commit with two parents, preserving the exact true history of what happened, but can create a cluttered graph with many merge commits over time.\n\ngit rebase takes the commits from the current branch and reapplies them one by one on top of the target branch, producing a clean, linear history, but it rewrites commit hashes, which is dangerous on shared or public branches. The golden rule is to rebase local or private branches, and merge for public or shared integration.",
  "keyPoints": [
    "Merge: safe, preserves true history, non-destructive",
    "Rebase: clean linear history, but rewrites commit SHAs",
    "Never rebase a branch others have already pulled from — it will diverge and cause conflicts for them"
  ],
  "commonMistakes": [
    "Rebasing a branch that others have already pulled from",
    "Assuming rebase and merge produce identical commit histories",
    "Forgetting rebase rewrites commit hashes, breaking shared references"
  ],
  "followUpQuestions": [
    "Why is rebasing shared branches considered dangerous?",
    "How do you resolve conflicts during a rebase?",
    "What is an interactive rebase used for?"
  ],
  "realWorldExample": "A developer rebases their local feature branch onto main before opening a pull request to keep the commit history clean.",
  "codeExample": {
    "language": "Bash",
    "code": "# Merge\ngit checkout main\ngit merge feature-branch\n\n# Rebase\ngit checkout feature-branch\ngit rebase main"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the history difference between merge and rebase and know the golden rule about shared branches.",
  "tags": ["Git", "Merge", "Rebase", "Version Control", "Interview"],
  "relatedTopics": ["Git Fetch", "Merge Conflicts", "Version Control"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-002",
  "category": "Git & GitHub",
  "topic": "Git Fetch vs Pull",
  "difficulty": "Easy",
  "question": "What is the difference between Git Fetch and Git Pull?",
  "shortAnswer": "Fetch downloads changes from remote without merging. Pull = fetch + merge (or rebase) into your current branch automatically.",
  "detailedAnswer": "git fetch downloads all new commits, branches, and tags from the remote into local remote-tracking branches, such as origin/main, without touching the working branch, making it safe and allowing changes to be reviewed before integrating.\n\ngit pull is fetch followed automatically by merge, or rebase with git pull --rebase, directly updating the current branch, which can surprise you with unexpected merge conflicts if you weren't anticipating incoming changes.",
  "keyPoints": [
    "Fetch: safe, non-destructive, just downloads — nothing changes in your working branch",
    "Pull: fetch + auto-merge — can introduce surprise conflicts",
    "git pull --rebase: fetch + rebase instead of merge, keeping history linear"
  ],
  "commonMistakes": [
    "Using git pull without reviewing incoming changes first",
    "Not knowing pull is essentially fetch plus an automatic merge",
    "Forgetting --rebase option changes pull's integration strategy"
  ],
  "followUpQuestions": [
    "What does git pull --rebase do differently from a regular pull?",
    "Why might fetching before pulling be a safer workflow?",
    "How do remote-tracking branches work with fetch?"
  ],
  "realWorldExample": "A developer runs git fetch to review incoming teammate changes before deciding to merge or rebase them into their local branch.",
  "codeExample": {
    "language": "Bash",
    "code": "git fetch origin\ngit diff main origin/main\ngit merge origin/main"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain that pull is fetch plus merge/rebase, and to describe the safety benefit of fetching first.",
  "tags": ["Git", "Fetch", "Pull", "Version Control", "Interview"],
  "relatedTopics": ["Git Merge", "Git Rebase", "Remote Repositories"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-003",
  "category": "Git & GitHub",
  "topic": "Merge Conflicts",
  "difficulty": "Easy",
  "question": "What is a Merge Conflict? How do you resolve it?",
  "shortAnswer": "A merge conflict occurs when Git cannot automatically reconcile changes made to the same lines of a file on two branches — requires manual resolution.",
  "detailedAnswer": "Git can auto-merge changes to different parts of a file, but if the same lines were changed differently on both branches, Git marks the file with conflict markers, such as <<<<<<< HEAD, =======, and >>>>>>> branch-name, and pauses the merge.\n\nThe developer manually edits the file to decide the correct final content, removes the conflict markers, then runs git add on the resolved file and git commit to complete the merge.",
  "keyPoints": [
    "Conflict markers: <<<<<<< HEAD (your changes) vs >>>>>>> branch (their changes)",
    "Resolution: edit the file manually, remove markers, git add, then git commit",
    "git status shows which files still have unresolved conflicts"
  ],
  "commonMistakes": [
    "Forgetting to remove conflict markers before committing",
    "Not running git add after resolving conflicts",
    "Assuming Git can auto-resolve conflicts on the same lines"
  ],
  "followUpQuestions": [
    "What tools can help visually resolve merge conflicts?",
    "How would you abort a merge if conflicts are too complex to resolve?",
    "What does git status show during an unresolved conflict?"
  ],
  "realWorldExample": "Two developers editing the same line of a config file on different branches will trigger a merge conflict when merging.",
  "codeExample": {
    "language": "Bash",
    "code": "git merge feature-branch\n# CONFLICT (content): Merge conflict in file.txt\n# Manually edit file.txt to resolve, then:\ngit add file.txt\ngit commit"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain conflict markers and the exact steps to resolve and complete a conflicted merge.",
  "tags": ["Git", "Merge Conflict", "Version Control", "Interview"],
  "relatedTopics": ["Git Merge", "Git Rebase", "Git Status"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-004",
  "category": "Git & GitHub",
  "topic": "git stash",
  "difficulty": "Easy",
  "question": "What is git stash? When would you use it?",
  "shortAnswer": "git stash temporarily saves your uncommitted changes (both staged and unstaged) so you can switch branches or pull cleanly, then restore them later.",
  "detailedAnswer": "If there are work-in-progress changes but a branch switch is urgently needed, such as to fix a critical bug on another branch, without committing incomplete work, git stash saves those changes to a hidden stack and reverts the working directory to match the last commit, allowing free branch switching.\n\nLater, git stash pop reapplies the most recent stash and removes it from the stash list, while git stash apply reapplies it without removing it from the stack, which is useful for applying the same stash to multiple branches.",
  "keyPoints": [
    "git stash: saves current changes, reverts working directory to the last commit",
    "git stash pop: reapplies AND removes the most recent stash from the stack",
    "git stash list: shows all currently stashed change sets, since multiple stashes can coexist"
  ],
  "commonMistakes": [
    "Forgetting stashed changes exist and losing track of them",
    "Confusing git stash pop (removes from stack) with git stash apply (keeps in stack)",
    "Not naming stashes when managing multiple concurrent stashes"
  ],
  "followUpQuestions": [
    "What is the difference between git stash pop and git stash apply?",
    "How would you apply a specific stash if multiple exist?",
    "Can stashed changes be lost, and how would you recover them?"
  ],
  "realWorldExample": "A developer stashes in-progress feature work to quickly switch branches and fix an urgent production bug, then pops the stash to resume work afterward.",
  "codeExample": {
    "language": "Bash",
    "code": "git stash\ngit checkout hotfix-branch\n# ... fix bug ...\ngit checkout feature-branch\ngit stash pop"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the save-and-restore workflow and distinguish pop from apply.",
  "tags": ["Git", "Stash", "Version Control", "Interview"],
  "relatedTopics": ["Git Branch", "Git Checkout", "Working Directory"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-005",
  "category": "Git & GitHub",
  "topic": "Git Reset vs Revert",
  "difficulty": "Medium",
  "question": "What is the difference between git reset and git revert?",
  "shortAnswer": "git reset moves the branch pointer backward, potentially discarding commits entirely (dangerous on shared branches). git revert creates a NEW commit that undoes a previous commit's changes, preserving history.",
  "detailedAnswer": "git reset --hard <commit> moves the current branch pointer to a specified commit and discards all commits after it, and optionally working directory changes too, rewriting history, which is dangerous if those commits have already been pushed and pulled by others.\n\ngit revert <commit> doesn't touch existing history at all; instead it creates a brand new commit that applies the inverse of the specified commit's changes, safely undoing it while preserving the full historical record, making it the safe choice for undoing changes on shared or public branches.",
  "keyPoints": [
    "git reset --soft: moves branch pointer, keeps changes staged",
    "git reset --hard: moves branch pointer, discards changes entirely — dangerous, can lose work",
    "git revert: always safe for shared branches — adds a new \"undo\" commit instead of rewriting history"
  ],
  "commonMistakes": [
    "Using git reset --hard on a shared branch that others have already pulled",
    "Confusing reset --soft with reset --hard behavior",
    "Not knowing revert is the safer choice for shared branch history"
  ],
  "followUpQuestions": [
    "What is the difference between reset --soft, --mixed, and --hard?",
    "Why is revert preferred over reset on shared branches?",
    "How would you undo a public commit safely?"
  ],
  "realWorldExample": "A team reverts a bad commit already pushed to main using git revert, adding a new commit that undoes the change rather than rewriting shared history.",
  "codeExample": {
    "language": "Bash",
    "code": "git revert abc1234\n\n# vs (dangerous on shared branches)\ngit reset --hard abc1234"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the history-rewriting risk of reset versus the safety of revert on shared branches.",
  "tags": ["Git", "Reset", "Revert", "Version Control", "Interview"],
  "relatedTopics": ["Git Merge", "Git History", "Force Push"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-006",
  "category": "Git & GitHub",
  "topic": "Git Branching",
  "difficulty": "Easy",
  "question": "What is a Git Branch? Why is branching important in collaborative development?",
  "shortAnswer": "A branch is a movable pointer to a specific commit, allowing independent lines of development without affecting the main codebase until changes are ready to merge.",
  "detailedAnswer": "Branching allows multiple developers, or a single developer working on multiple features, to work in complete isolation; changes on a feature branch don't affect main until explicitly merged, and multiple branches can evolve simultaneously without interfering with each other.\n\nCommon branching strategies include Git Flow, with separate develop, feature, release, and hotfix branches and defined merge rules, GitHub Flow, a simpler approach where main is always deployable and feature branches merge directly via pull requests, and Trunk-Based Development, with very short-lived branches and frequent merges to main, often paired with feature flags.",
  "keyPoints": [
    "A branch is just a lightweight pointer to a commit — extremely cheap to create in Git",
    "Git Flow: structured, multiple long-lived branch types — good for scheduled releases",
    "GitHub Flow / Trunk-Based: simpler, frequent merges — good for continuous deployment"
  ],
  "commonMistakes": [
    "Assuming branches are expensive or heavyweight to create",
    "Not choosing a branching strategy suited to the team's release cadence",
    "Confusing Git Flow's long-lived branches with GitHub Flow's simpler model"
  ],
  "followUpQuestions": [
    "What is the difference between Git Flow and GitHub Flow?",
    "Why is Trunk-Based Development often paired with feature flags?",
    "How cheap is it to create a new branch in Git?"
  ],
  "realWorldExample": "A team practicing GitHub Flow keeps main always deployable, merging short-lived feature branches directly via reviewed pull requests.",
  "codeExample": {
    "language": "Bash",
    "code": "git checkout -b feature/new-login\n# ... make changes ...\ngit push origin feature/new-login"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain branch isolation benefits and compare at least two branching strategies.",
  "tags": ["Git", "Branching", "Version Control", "Interview"],
  "relatedTopics": ["Git Flow", "GitHub Flow", "Trunk-Based Development"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-007",
  "category": "Git & GitHub",
  "topic": "Pull Requests",
  "difficulty": "Easy",
  "question": "What is a Pull Request (PR)? What is its purpose beyond just merging code?",
  "shortAnswer": "A Pull Request is a request to merge changes from one branch into another, serving as a formal checkpoint for code review, automated testing, and team discussion before code enters the main codebase.",
  "detailedAnswer": "Beyond the mechanical act of merging, a PR provides a structured space for code review, where teammates examine the diff, leave inline comments, and request changes, automated CI checks that run tests, linters, and build verification before allowing merge, documentation of why a change was made through the PR description and discussion thread, and a natural gate preventing broken or unreviewed code from reaching the main branch.\n\nMost teams enforce branch protection rules requiring at least one approval and passing CI checks before a PR can be merged.",
  "keyPoints": [
    "Code review: catches bugs, enforces style consistency, and shares knowledge across the team",
    "CI integration: automated tests/linters run on every PR before merge is even allowed",
    "Branch protection rules: enforce required approvals and passing checks before merging to main"
  ],
  "commonMistakes": [
    "Treating PRs as purely mechanical merges without valuing the review process",
    "Not enforcing branch protection rules requiring approvals and passing checks",
    "Writing PR descriptions that don't explain the reasoning behind the change"
  ],
  "followUpQuestions": [
    "What are branch protection rules and why are they useful?",
    "How does CI integration with PRs prevent broken code from merging?",
    "What makes a good PR description?"
  ],
  "realWorldExample": "A team requires at least one approval and passing CI checks via branch protection rules before any PR can be merged into main.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the PR's role beyond merging, especially code review and CI gating.",
  "tags": ["Git", "GitHub", "Pull Request", "Interview"],
  "relatedTopics": ["Code Review", "CI/CD", "Branch Protection"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-008",
  "category": "Git & GitHub",
  "topic": ".gitignore",
  "difficulty": "Easy",
  "question": "What is .gitignore? Why is it important?",
  "shortAnswer": ".gitignore specifies files and directories that Git should NOT track — used for build artifacts, dependencies, secrets, and OS/editor-specific files that shouldn't be in version control.",
  "detailedAnswer": "Without .gitignore, developers would accidentally commit things like node_modules, compiled build output, IDE configuration files, OS-generated files, and critically, secrets like .env files containing API keys and passwords.\n\nOnce a file matching a .gitignore pattern is added, Git simply won't track changes to it going forward. An important caveat is that if a file was already committed before being added to .gitignore, it will continue being tracked; you must explicitly run git rm --cached <file> to stop tracking it.",
  "keyPoints": [
    "Prevents committing large regeneratable folders (node_modules, build/, dist/) and IDE-specific files",
    "Critical for security: keeps .env files and credentials out of version control",
    "Already-tracked files aren't automatically ignored — requires git rm --cached to untrack them first"
  ],
  "commonMistakes": [
    "Adding a file to .gitignore after it's already been committed, expecting it to stop being tracked automatically",
    "Forgetting to gitignore secrets like .env files, exposing credentials",
    "Committing large regeneratable folders like node_modules"
  ],
  "followUpQuestions": [
    "How would you stop tracking a file that was already committed before being added to .gitignore?",
    "What security risks does forgetting to gitignore secrets create?",
    "What are common patterns typically included in a .gitignore file?"
  ],
  "realWorldExample": "A team adds .env to .gitignore to prevent API keys and database credentials from ever being committed to the shared repository.",
  "codeExample": {
    "language": "Bash",
    "code": "# .gitignore\nnode_modules/\n.env\ndist/\n.DS_Store\n\n# Untrack an already-committed file\ngit rm --cached secrets.env"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain .gitignore's purpose and the caveat about already-tracked files.",
  "tags": ["Git", "gitignore", "Version Control", "Interview"],
  "relatedTopics": ["Secrets Management", "Repository Hygiene", "Git Rm"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-009",
  "category": "Git & GitHub",
  "topic": "git clone vs git init",
  "difficulty": "Easy",
  "question": "What is the Difference Between git clone and git init?",
  "shortAnswer": "git init creates a brand new, empty Git repository in an existing directory. git clone copies an EXISTING remote repository (including its full history) to your local machine.",
  "detailedAnswer": "git init is used when starting a completely new project; it initializes a .git folder in the current directory, turning it into a Git repository with no commits yet and no connection to any remote.\n\ngit clone <url> is used when starting work on a project that already exists remotely; it downloads the entire repository, including all branches and the full commit history, and automatically sets up the origin remote pointing back to the source, allowing immediate push and pull.",
  "keyPoints": [
    "git init: for starting a brand new project from scratch, no remote connection yet",
    "git clone: for obtaining a copy of an EXISTING remote repository, with full history included",
    "Cloning automatically configures the origin remote — no manual git remote add needed afterward"
  ],
  "commonMistakes": [
    "Using git init when the intent is to obtain an existing remote repository",
    "Not knowing git clone automatically configures the origin remote",
    "Forgetting git init creates no remote connection by default"
  ],
  "followUpQuestions": [
    "What remote is automatically configured after cloning?",
    "How would you connect a git init'd repository to a remote afterward?",
    "Does git clone download the full commit history?"
  ],
  "realWorldExample": "A developer joining a new team runs git clone to get a full local copy of the company's existing GitHub repository.",
  "codeExample": {
    "language": "Bash",
    "code": "git init\n\n# vs\ngit clone https://github.com/user/repo.git"
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish starting fresh from obtaining an existing repository.",
  "tags": ["Git", "Clone", "Init", "Version Control", "Interview"],
  "relatedTopics": ["Remote Repositories", "Git Basics", "Origin"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-010",
  "category": "Git & GitHub",
  "topic": "Detached HEAD State",
  "difficulty": "Medium",
  "question": "What is a Detached HEAD state in Git? How do you get out of it safely?",
  "shortAnswer": "A Detached HEAD occurs when you check out a specific commit (rather than a branch) directly — any new commits made in this state aren't attached to any branch and can be lost if you switch away without saving them.",
  "detailedAnswer": "Normally, HEAD points to a branch name like main, which in turn points to the latest commit on that branch; as commits are made, both HEAD and the branch pointer move forward together. If a specific commit hash is checked out directly instead of a branch name, HEAD now points directly to that commit, detached from any branch.\n\nIf new commits are made in this state and then another branch is checked out, those new commits become unreachable, or orphaned, and are eventually garbage collected, unless a new branch was explicitly created to save them first.",
  "keyPoints": [
    "Occurs when checking out a specific commit hash or tag directly, instead of a branch name",
    "Commits made in this state are NOT attached to any branch — at risk of being lost",
    "Safe recovery: git checkout -b <new-branch-name> immediately, to save the work onto a real branch"
  ],
  "commonMistakes": [
    "Making commits in detached HEAD state without creating a branch to save them",
    "Not recognizing the detached HEAD warning message from Git",
    "Assuming commits made in detached HEAD are automatically safe"
  ],
  "followUpQuestions": [
    "How would you recover commits made accidentally in a detached HEAD state?",
    "Why does checking out a specific commit put you in detached HEAD?",
    "What happens to orphaned commits eventually?"
  ],
  "realWorldExample": "A developer checks out an old commit to inspect historical code, makes an accidental commit, and creates a new branch immediately to preserve that work before switching away.",
  "codeExample": {
    "language": "Bash",
    "code": "git checkout a1b2c3d\n# HEAD is now detached\ngit checkout -b recovered-work"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain what triggers detached HEAD and describe the safe recovery step of creating a new branch.",
  "tags": ["Git", "Detached HEAD", "Version Control", "Interview"],
  "relatedTopics": ["Git Checkout", "Git Branch", "Garbage Collection"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-011",
  "category": "Git & GitHub",
  "topic": "git cherry-pick",
  "difficulty": "Medium",
  "question": "What is git cherry-pick? Give a practical use case.",
  "shortAnswer": "git cherry-pick applies the changes from a specific, individual commit (from any branch) onto your current branch, without merging the entire branch.",
  "detailedAnswer": "Sometimes only one specific bug fix commit is needed from another branch, without pulling in all the other unrelated commits that branch might have. git cherry-pick <commit-hash> takes that single commit's changes and applies them as a new commit on the current branch.\n\nA common real-world use case is when a critical hotfix was made and committed directly on a release branch, and that exact same fix needs to be applied to the main or develop branch too, without merging the entire release branch's other in-progress changes.",
  "keyPoints": [
    "Applies a single, specific commit's changes onto the current branch — not an entire branch's history",
    "Common use case: porting a hotfix from a release branch back into the main development branch",
    "Can cause conflicts if the target branch has diverged significantly from where the commit originated"
  ],
  "commonMistakes": [
    "Cherry-picking a commit that depends on other commits not yet present, causing incomplete changes",
    "Not resolving conflicts correctly when the target branch has diverged",
    "Using cherry-pick when a full merge would be more appropriate"
  ],
  "followUpQuestions": [
    "What happens if a cherry-picked commit conflicts with the target branch?",
    "When would cherry-pick be preferable to a full merge?",
    "Can you cherry-pick multiple commits at once?"
  ],
  "realWorldExample": "A critical security fix committed directly on a release branch is cherry-picked into the main development branch without merging the entire release branch.",
  "codeExample": {
    "language": "Bash",
    "code": "git checkout main\ngit cherry-pick a1b2c3d"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain single-commit porting and describe a realistic hotfix scenario.",
  "tags": ["Git", "Cherry-pick", "Version Control", "Interview"],
  "relatedTopics": ["Git Merge", "Hotfix Branches", "Git Rebase"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-012",
  "category": "Git & GitHub",
  "topic": "git checkout vs git switch/restore",
  "difficulty": "Medium",
  "question": "What is the Difference Between git checkout and git switch/git restore?",
  "shortAnswer": "git checkout is an older, overloaded command doing multiple different things (switching branches, restoring files). git switch and git restore are newer, more focused commands introduced to reduce this confusion.",
  "detailedAnswer": "git checkout historically served several very different purposes depending on its arguments: git checkout <branch> switches branches, git checkout <commit> -- <file> restores a specific file from a specific commit, and git checkout <commit> puts you in a detached HEAD state. This overloading made the command's behavior unpredictable and confusing, especially for beginners.\n\nGit 2.23+ introduced git switch, exclusively for switching or creating branches, and git restore, exclusively for restoring files in the working directory or staging area, as clearer, more focused replacements, though git checkout still works and remains widely used.",
  "keyPoints": [
    "git checkout: legacy, overloaded command — does branch switching AND file restoration depending on syntax",
    "git switch <branch>: modern, dedicated command purely for switching (or creating, with -c) branches",
    "git restore <file>: modern, dedicated command purely for discarding changes to a file"
  ],
  "commonMistakes": [
    "Confusing checkout's file-restoration behavior with its branch-switching behavior",
    "Not knowing the newer switch/restore commands exist as clearer alternatives",
    "Using outdated syntax when the newer commands would be clearer"
  ],
  "followUpQuestions": [
    "Why did Git introduce switch and restore as separate commands?",
    "How would you create and switch to a new branch using git switch?",
    "How would you discard changes to a file using git restore?"
  ],
  "realWorldExample": "A developer uses git switch feature-branch to switch branches and git restore file.txt to discard local changes, avoiding the ambiguity of the older git checkout syntax.",
  "codeExample": {
    "language": "Bash",
    "code": "git switch feature-branch\ngit switch -c new-feature\ngit restore file.txt"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the overloading problem with checkout and describe the more focused modern alternatives.",
  "tags": ["Git", "Checkout", "Switch", "Restore", "Interview"],
  "relatedTopics": ["Git Branch", "Detached HEAD", "Working Directory"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-013",
  "category": "Git & GitHub",
  "topic": "Git Tags",
  "difficulty": "Easy",
  "question": "What is a Git Tag? What is the difference between a Lightweight and an Annotated tag?",
  "shortAnswer": "A Tag marks a specific commit as significant (typically a release point). Lightweight tags are just a name pointing to a commit. Annotated tags are full objects with metadata (author, date, message, optional GPG signature).",
  "detailedAnswer": "Tags are commonly used to mark release versions so specific points in history can be easily referenced or checked out later, independent of ongoing branch activity. A Lightweight tag is essentially just a named pointer to a commit, similar to a branch but that never moves, with minimal metadata.\n\nAn Annotated tag is stored as a full Git object containing the tagger's name, email, date, a message, and can be GPG-signed for cryptographic verification of authenticity, making it recommended for actual releases since it carries meaningful, permanent metadata.",
  "keyPoints": [
    "Lightweight tag: just a pointer to a commit, minimal metadata — quick, informal markers",
    "Annotated tag: full object with tagger info, message, date, optional GPG signature — recommended for releases",
    "git push --tags: tags aren't pushed to remote automatically with a normal git push — must be explicit"
  ],
  "commonMistakes": [
    "Assuming tags are automatically pushed with a regular git push",
    "Using lightweight tags for official releases instead of annotated tags",
    "Confusing tags with branches, which move as new commits are added"
  ],
  "followUpQuestions": [
    "Why are annotated tags recommended over lightweight tags for releases?",
    "How would you push tags to a remote repository?",
    "Can a tag be GPG-signed and why would that matter?"
  ],
  "realWorldExample": "A project tags its v2.0.0 release with an annotated tag including release notes, while using lightweight tags for informal internal checkpoints.",
  "codeExample": {
    "language": "Bash",
    "code": "git tag v1.0.0  # lightweight\ngit tag -a v1.0.0 -m \"Release message\"  # annotated\ngit push --tags"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish lightweight from annotated tags and recommend annotated tags for real releases.",
  "tags": ["Git", "Tags", "Version Control", "Interview"],
  "relatedTopics": ["Releases", "Semantic Versioning", "Git Push"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-014",
  "category": "Git & GitHub",
  "topic": "Git Submodules",
  "difficulty": "Medium",
  "question": "What is a Git Submodule? What problem does it solve?",
  "shortAnswer": "A Git Submodule allows you to embed one Git repository as a subdirectory inside another, keeping the embedded repository's own independent history and commits.",
  "detailedAnswer": "When a project depends on another separate project or library that is itself under active Git version control, rather than a published package via npm or pip, submodules let you include it as a subdirectory while keeping it linked to its own separate remote repository. The parent repository stores only a reference, a specific commit hash, to the submodule, not its actual full content.\n\nThis lets a team pin the exact version of a dependency being used, while still being able to independently update or pull the submodule's own changes when desired. Submodules have a reputation for being somewhat awkward in practice, so many teams prefer standard package managers when the dependency doesn't strictly require this level of Git-level integration.",
  "keyPoints": [
    "Embeds a separate Git repository as a subdirectory, pinned to a specific commit",
    "Parent repo stores only a REFERENCE (commit hash) to the submodule, not its full content directly",
    "git submodule update --init --recursive: commonly needed after cloning a repo that has submodules"
  ],
  "commonMistakes": [
    "Forgetting to run git submodule update --init --recursive after cloning",
    "Getting confused by detached-HEAD states within the submodule",
    "Using submodules when a standard package manager would be simpler"
  ],
  "followUpQuestions": [
    "Why must you run git submodule update after cloning a repo with submodules?",
    "What are the common pain points of working with submodules?",
    "When would you prefer a package manager over a submodule?"
  ],
  "realWorldExample": "A project embeds a shared internal UI library as a Git submodule, pinning to a specific commit while allowing independent updates when needed.",
  "codeExample": {
    "language": "Bash",
    "code": "git submodule add https://github.com/user/lib.git libs/lib\ngit submodule update --init --recursive"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how submodules pin dependency versions and note their practical awkwardness.",
  "tags": ["Git", "Submodules", "Version Control", "Interview"],
  "relatedTopics": ["Package Managers", "Dependency Management", "Git Clone"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-015",
  "category": "Git & GitHub",
  "topic": "git blame",
  "difficulty": "Easy",
  "question": "What is git blame? What is it used for?",
  "shortAnswer": "git blame <file> shows, line by line, which commit and author last modified each line of a file — useful for understanding the history and reasoning behind specific code.",
  "detailedAnswer": "When investigating a bug or trying to understand why a particular piece of code exists in its current form, git blame annotates every line of a file with the commit hash, author, and date of the last change to that specific line, allowing you to trace back to the original commit and its message or PR discussion for context.\n\nThis is invaluable for debugging, such as finding when a bug was introduced, and for understanding legacy code without needing to ask the original author directly, who may have left the team.",
  "keyPoints": [
    "Shows the LAST commit/author responsible for each individual line in a file",
    "Extremely useful for tracing when/why a specific piece of code was introduced",
    "git log -p <file>: complementary command showing the full history of changes to a file over time"
  ],
  "commonMistakes": [
    "Assuming git blame shows the full history rather than just the last modifying commit per line",
    "Not using git log -p as a complementary tool for deeper history",
    "Overlooking that blame output can be misleading after large-scale reformatting commits"
  ],
  "followUpQuestions": [
    "How does git log -p complement git blame?",
    "What happens to blame results after a large reformatting commit?",
    "How would you trace the full history of changes to a single line?"
  ],
  "realWorldExample": "A developer uses git blame to trace which commit introduced a suspicious line of code, then reads that commit's message for context on why it was written that way.",
  "codeExample": {
    "language": "Bash",
    "code": "git blame src/app.py"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how blame attributes lines to commits and its use in debugging and understanding legacy code.",
  "tags": ["Git", "Blame", "Version Control", "Interview"],
  "relatedTopics": ["Git Log", "Debugging", "Code History"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-016",
  "category": "Git & GitHub",
  "topic": "Git vs GitHub",
  "difficulty": "Easy",
  "question": "What is the Difference Between Git and GitHub?",
  "shortAnswer": "Git is the underlying distributed version control SYSTEM/tool itself. GitHub is a cloud-based HOSTING PLATFORM built around Git, adding collaboration features (PRs, issues, Actions, project boards).",
  "detailedAnswer": "Git is a command-line tool and underlying protocol for tracking changes to files and coordinating work between multiple people; it can be used entirely locally, or with any remote server, and doesn't require GitHub at all.\n\nGitHub is a company and platform that hosts Git repositories in the cloud and layers on significant additional collaboration tooling: Pull Requests for code review, Issues for tracking bugs and tasks, GitHub Actions for CI/CD automation, project boards for task management, and social or discovery features. Competitors to GitHub built on the same underlying Git technology include GitLab and Bitbucket.",
  "keyPoints": [
    "Git: the version control tool/protocol itself — works with or without any hosting platform",
    "GitHub: a specific hosting platform + collaboration layer built on top of Git",
    "Alternatives to GitHub: GitLab, Bitbucket — all use the same core Git technology underneath"
  ],
  "commonMistakes": [
    "Using 'Git' and 'GitHub' interchangeably as if they were the same thing",
    "Assuming Git requires GitHub or an internet connection to function",
    "Not knowing GitLab and Bitbucket are Git-based alternatives to GitHub"
  ],
  "followUpQuestions": [
    "Can Git be used entirely without GitHub? How?",
    "What are some alternatives to GitHub?",
    "What collaboration features does GitHub add on top of Git?"
  ],
  "realWorldExample": "A developer can use Git entirely locally for personal version control without ever pushing to GitHub, GitLab, or any remote hosting service.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the underlying tool (Git) from the hosting platform (GitHub).",
  "tags": ["Git", "GitHub", "Version Control", "Interview"],
  "relatedTopics": ["GitLab", "Bitbucket", "Version Control Systems"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-017",
  "category": "Git & GitHub",
  "topic": "GitHub Fork vs Branch",
  "difficulty": "Easy",
  "question": "What is a GitHub Fork? How is it different from a Branch?",
  "shortAnswer": "A Fork creates a completely separate COPY of an entire repository under your own GitHub account. A Branch is a pointer within the SAME repository.",
  "detailedAnswer": "Forking is typically used when write access to the original repository isn't available, such as contributing to an open-source project you don't own; a separate independent copy is created under your own account, changes are made there, and a Pull Request is submitted from your fork back to the original repository for maintainers to review and merge.\n\nA branch, by contrast, exists within a single repository that you already have write access to, used for organizing parallel lines of development within a team that shares the same repo directly.",
  "keyPoints": [
    "Fork: separate full copy under your own account — typically for contributing to repos you don't own",
    "Branch: a pointer within the same shared repository — typically for team members with direct write access",
    "Open-source contribution workflow: fork → clone your fork → branch → commit → push → PR back to original"
  ],
  "commonMistakes": [
    "Forking when direct branch access on the original repository is already available",
    "Confusing a fork's independent copy with a simple branch within the same repo",
    "Forgetting to submit a PR back to the original repository after making changes on a fork"
  ],
  "followUpQuestions": [
    "What is the typical open-source contribution workflow using a fork?",
    "Why would you use a branch instead of a fork within a team repository?",
    "Can you sync a fork with the original repository's latest changes?"
  ],
  "realWorldExample": "A developer without write access to a popular open-source project forks it, makes changes on a branch in their fork, and submits a Pull Request back to the original project.",
  "codeExample": {
    "language": "Bash",
    "code": "# After forking on GitHub:\ngit clone https://github.com/yourname/repo.git\ngit checkout -b my-fix\n# ... make changes, commit, push ...\n# Open PR from yourname/repo:my-fix to original/repo:main"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish a full independent copy (fork) from a pointer within a shared repository (branch).",
  "tags": ["Git", "GitHub", "Fork", "Branch", "Interview"],
  "relatedTopics": ["Pull Request", "Open Source Contribution", "Git Branch"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-018",
  "category": "Git & GitHub",
  "topic": "git log",
  "difficulty": "Easy",
  "question": "What is git log? What are some useful flags/options?",
  "shortAnswer": "git log displays the commit history of the current branch, with many optional flags to customize the output format and filter results.",
  "detailedAnswer": "By default, git log shows each commit's full hash, author, date, and message in a verbose format. Useful variations include --oneline, which condenses each commit to a single line for a quick overview, --graph, which visually draws the branch and merge structure using ASCII art, --author=\"name\", which filters to commits by a specific person, -p or --patch, which shows the actual diff content of each commit, and --since=\"2 weeks ago\", which filters by date range.\n\nA commonly memorized combination is git log --oneline --graph --all, which gives a compact visual overview of the entire repository's branch structure.",
  "keyPoints": [
    "--oneline: condensed single-line-per-commit format for quick scanning",
    "--graph --all: ASCII visualization of branch structure across ALL branches, not just the current one",
    "-p: shows the actual code diff for each commit, useful for detailed history investigation"
  ],
  "commonMistakes": [
    "Not knowing --graph --all gives a full visual overview across all branches",
    "Using verbose default log output when --oneline would be more efficient for scanning",
    "Forgetting -p shows actual diffs, not just commit messages"
  ],
  "followUpQuestions": [
    "How would you filter commit history by a specific author?",
    "What does the --graph flag visually represent?",
    "How would you view the actual code changes for each commit in the log?"
  ],
  "realWorldExample": "A developer runs git log --oneline --graph --all to quickly visualize the branch structure and recent commit history of a repository.",
  "codeExample": {
    "language": "Bash",
    "code": "git log --oneline --graph --all\ngit log --author=\"Jane\" --since=\"2 weeks ago\""
  },
  "interviewerExpectation": "The interviewer expects the candidate to know several practical git log flags and their use cases.",
  "tags": ["Git", "Log", "Version Control", "Interview"],
  "relatedTopics": ["Git Blame", "Commit History", "Git Diff"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-019",
  "category": "Git & GitHub",
  "topic": "Force Push",
  "difficulty": "Medium",
  "question": "What is a Force Push (git push --force)? Why is it dangerous?",
  "shortAnswer": "A force push overwrites the remote branch's history with your local history, even if they've diverged — it can permanently destroy commits that other collaborators have already pulled and built upon.",
  "detailedAnswer": "Normally, Git refuses a push if the local branch and the remote branch have diverged, since someone else may have pushed commits not present locally; this safety check prevents accidentally overwriting others' work.\n\ngit push --force bypasses this check entirely, forcibly making the remote match the local history exactly and discarding any remote commits not present locally. This is catastrophic if others have already pulled and built on top of the discarded commits. git push --force-with-lease is a safer alternative, only force-pushing if the remote hasn't changed since the last fetch, failing safely if someone else pushed in the meantime.",
  "keyPoints": [
    "Regular git push fails safely if local and remote have diverged — a protective check",
    "--force bypasses this check entirely, potentially destroying others' already-pushed work",
    "--force-with-lease: safer alternative — fails if the remote has unexpected new commits since your last fetch"
  ],
  "commonMistakes": [
    "Using git push --force on a shared branch without coordinating with the team",
    "Not knowing --force-with-lease exists as a safer alternative",
    "Force-pushing to overwrite mistakes instead of using revert on shared history"
  ],
  "followUpQuestions": [
    "How does --force-with-lease differ from a plain --force push?",
    "What should you do if teammates have already pulled commits you're about to force-push over?",
    "When might a force push be acceptable to use?"
  ],
  "realWorldExample": "After an interactive rebase to clean up local commit history, a developer uses git push --force-with-lease to safely update their own private feature branch on the remote.",
  "codeExample": {
    "language": "Bash",
    "code": "git push --force-with-lease origin feature-branch"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the danger of overwriting shared history and recommend --force-with-lease as a safer alternative.",
  "tags": ["Git", "Force Push", "Version Control", "Interview"],
  "relatedTopics": ["Git Rebase", "Git Reset", "Shared Branches"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-020",
  "category": "Git & GitHub",
  "topic": "README.md",
  "difficulty": "Easy",
  "question": "What is the Purpose of a README.md File in a Repository?",
  "shortAnswer": "A README is the first document visitors see when viewing a repository — it explains what the project does, how to install/run it, and how to contribute, serving as the project's front door.",
  "detailedAnswer": "A well-written README typically includes a clear project description and purpose, installation and setup instructions, usage examples, contribution guidelines, license information, and often badges showing build status or test coverage.\n\nGitHub automatically renders a repository's README.md on the main repository page using Markdown formatting, making it the primary way both potential users and potential contributors understand what a project is and how to get started with it.",
  "keyPoints": [
    "Automatically rendered by GitHub/GitLab on the repository's main page — the first thing visitors see",
    "Should cover: what it does, how to install/run it, how to contribute, and licensing",
    "A strong README is often the single biggest factor in whether an open-source project gets adopted/contributed to"
  ],
  "commonMistakes": [
    "Omitting installation or usage instructions from the README",
    "Not keeping the README updated as the project evolves",
    "Assuming a good codebase alone is enough without documentation"
  ],
  "followUpQuestions": [
    "What key sections should a strong README include?",
    "How does a README impact open-source project adoption?",
    "What format does GitHub use to render README files?"
  ],
  "realWorldExample": "A popular open-source library's high adoption rate is partly attributed to its clear, well-organized README with installation instructions and usage examples.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to describe the README's role as documentation and its impact on project adoption.",
  "tags": ["Git", "GitHub", "README", "Documentation", "Interview"],
  "relatedTopics": ["CONTRIBUTING.md", "Open Source", "Documentation"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-021",
  "category": "Git & GitHub",
  "topic": "Git Hooks",
  "difficulty": "Medium",
  "question": "What is a Git Hook? Give a practical example.",
  "shortAnswer": "A Git Hook is a script that automatically runs at specific points in the Git workflow (before a commit, after a commit, before a push, etc.), used to enforce checks or automate tasks.",
  "detailedAnswer": "Hooks live in the .git/hooks/ directory, and Git automatically executes the corresponding script when the associated event occurs, if the script exists and is executable. A pre-commit hook can automatically run linters or formatters and reject the commit entirely if code style violations are found, catching issues before they even enter version control.\n\nA pre-push hook could run the full test suite, blocking a push if any tests fail. Since hooks live locally by default and aren't version-controlled with the rest of the repo, teams often use tools like Husky for Node.js projects to manage and share hook configurations consistently across the whole team.",
  "keyPoints": [
    "Pre-commit hook: commonly runs linters/formatters, can reject the commit if checks fail",
    "Pre-push hook: commonly runs the test suite, blocking the push if tests fail",
    "Husky (and similar tools): manage hooks as shareable, version-controlled configuration across a team"
  ],
  "commonMistakes": [
    "Assuming hooks are automatically shared with the team without a tool like Husky",
    "Not making the hook script executable, causing it to silently not run",
    "Overloading hooks with slow checks that frustrate the development workflow"
  ],
  "followUpQuestions": [
    "Why aren't Git hooks version-controlled by default, and how does Husky solve this?",
    "What's an example of a pre-push hook use case?",
    "What happens if a hook script isn't executable?"
  ],
  "realWorldExample": "A team uses Husky to share a pre-commit hook that automatically runs ESLint and Prettier, rejecting commits that fail style checks.",
  "codeExample": {
    "language": "Bash",
    "code": "#!/bin/sh\n# .git/hooks/pre-commit\nnpm run lint || exit 1"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the hook mechanism and give a practical pre-commit or pre-push example.",
  "tags": ["Git", "Git Hooks", "Version Control", "Interview"],
  "relatedTopics": ["Husky", "CI/CD", "Linting"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-022",
  "category": "Git & GitHub",
  "topic": "git add . vs git add -A",
  "difficulty": "Easy",
  "question": "What is the Difference Between git add . and git add -A?",
  "shortAnswer": "git add . stages new and modified files in the current directory and subdirectories, but historically excluded DELETED files in some Git versions. git add -A stages ALL changes across the entire repository, including deletions, regardless of current directory.",
  "detailedAnswer": "In modern Git (2.x+), git add . and git add -A behave almost identically when run from the repository root, both staging new, modified, and deleted files. The subtle difference that still matters is that git add . only operates on the current directory and its subdirectories, while git add -A always operates on the entire repository regardless of the current working directory location.\n\nIn much older Git versions, git add . didn't stage deletions at all, requiring git add -A or git add -u specifically to catch deleted files, a legacy distinction that occasionally still causes confusion in older tutorials.",
  "keyPoints": [
    "Modern Git: both stage new/modified/deleted files when run from the repo root — nearly identical",
    "Key difference: git add . is scoped to the current directory; git add -A always covers the whole repo",
    "git add -u: stages only modifications and deletions to ALREADY-tracked files, ignoring new untracked files"
  ],
  "commonMistakes": [
    "Assuming git add . always covers the entire repository regardless of current directory",
    "Not knowing git add -u only affects already-tracked files",
    "Relying on outdated tutorials describing pre-2.x Git behavior"
  ],
  "followUpQuestions": [
    "What does git add -u do differently from git add -A?",
    "In what scenario does the scoping difference between . and -A actually matter?",
    "Why did older Git versions treat git add . differently regarding deletions?"
  ],
  "realWorldExample": "A developer working inside a subdirectory runs git add . expecting to stage all repo changes, but it only stages changes within that subdirectory, unlike git add -A.",
  "codeExample": {
    "language": "Bash",
    "code": "git add .   # scoped to current directory\ngit add -A  # covers entire repository"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the current-directory scoping difference and mention the legacy deletion-staging distinction.",
  "tags": ["Git", "Add", "Staging", "Version Control", "Interview"],
  "relatedTopics": ["Git Status", "Staging Area", "Git Commit"],
  "references": ["Pro Git Book - git-scm.com"]
},
{
  "id": "git-023",
  "category": "Git & GitHub",
  "topic": "Squash Merge",
  "difficulty": "Medium",
  "question": "What is a \"Squash\" Merge? When would you use it?",
  "shortAnswer": "A Squash Merge combines all commits from a feature branch into a SINGLE commit on the target branch, discarding the individual intermediate commit history.",
  "detailedAnswer": "A feature branch often accumulates many small, messy work-in-progress commits, such as fix typo or wip, that are useful during active development but add noise to the main branch's permanent history.\n\nSquash merging condenses all of those commits into one clean, well-described commit when merging into main; the main branch's history stays clean and readable, one commit per feature or PR, while the original messy commit-by-commit history can still often be found on the original feature branch or in the closed PR itself on GitHub. This is a popular default strategy for teams that value a clean, linear main branch history above preserving every granular intermediate step.",
  "keyPoints": [
    "Condenses an entire feature branch's commits into ONE clean commit on the target branch",
    "Keeps main branch history readable — one commit per feature/PR rather than dozens of WIP commits",
    "Original granular history is typically still viewable in the closed PR itself, even if squashed on merge"
  ],
  "commonMistakes": [
    "Assuming the original commit history is completely lost after a squash merge (it's still visible in the PR)",
    "Squash merging when preserving granular history is actually important for the project",
    "Not writing a clean, descriptive squash commit message summarizing the whole feature"
  ],
  "followUpQuestions": [
    "Where can you still find the original granular commit history after a squash merge?",
    "When might squash merging not be the right choice?",
    "How does squash merging keep the main branch history clean?"
  ],
  "realWorldExample": "A team squash merges every feature PR into main, resulting in one clean commit per feature while the detailed commit-by-commit history remains visible in the closed PR on GitHub.",
  "codeExample": {
    "language": "Bash",
    "code": "git merge --squash feature-branch\ngit commit -m \"Add user authentication feature\""
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain how squash merging keeps main branch history clean while preserving detailed history elsewhere.",
  "tags": ["Git", "Squash Merge", "Version Control", "Interview"],
  "relatedTopics": ["Pull Request", "Git Merge", "Commit History"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-024",
  "category": "Git & GitHub",
  "topic": "CONTRIBUTING.md",
  "difficulty": "Easy",
  "question": "What is the Purpose of a CONTRIBUTING.md File?",
  "shortAnswer": "A CONTRIBUTING.md file provides guidelines for external contributors on how to properly submit changes to a project — coding standards, PR process, testing requirements, and communication norms.",
  "detailedAnswer": "Especially important for open-source projects with many potential external contributors, this document typically covers how to set up the local development environment, coding style and linting requirements, how to write and run tests, the expected PR submission process including branch naming conventions and commit message format, and community conduct expectations.\n\nHaving this documented explicitly reduces friction and back-and-forth for both new contributors, who know exactly what's expected upfront, and maintainers, who spend less time repeatedly explaining the same process to each new contributor.",
  "keyPoints": [
    "Reduces friction for new contributors by clearly documenting expectations upfront",
    "Typically covers: dev environment setup, coding standards, testing requirements, PR process",
    "Complements (but is distinct from) a CODE_OF_CONDUCT.md, which specifically covers community behavior norms"
  ],
  "commonMistakes": [
    "Confusing CONTRIBUTING.md with CODE_OF_CONDUCT.md, which covers behavior rather than process",
    "Not documenting the expected PR process, leading to inconsistent contributions",
    "Omitting dev environment setup instructions, increasing friction for new contributors"
  ],
  "followUpQuestions": [
    "How does CONTRIBUTING.md differ from CODE_OF_CONDUCT.md?",
    "What are the key sections a good CONTRIBUTING.md should include?",
    "How does this document reduce maintainer workload?"
  ],
  "realWorldExample": "A popular open-source project's CONTRIBUTING.md clearly documents branch naming conventions and commit message format, reducing back-and-forth during PR reviews.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to describe the document's role in reducing contributor friction and distinguish it from CODE_OF_CONDUCT.md.",
  "tags": ["Git", "GitHub", "CONTRIBUTING.md", "Open Source", "Interview"],
  "relatedTopics": ["README.md", "Open Source Contribution", "Code of Conduct"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "git-025",
  "category": "Git & GitHub",
  "topic": "GitHub Actions",
  "difficulty": "Medium",
  "question": "What is GitHub Actions? How does it relate to CI/CD?",
  "shortAnswer": "GitHub Actions is GitHub's built-in automation/CI-CD platform, allowing you to define workflows (in YAML) that automatically run in response to repository events like pushes, pull requests, or scheduled times.",
  "detailedAnswer": "A workflow file, stored in .github/workflows/, defines a series of jobs and steps to execute automatically when triggered, such as installing dependencies, running the linter, running the test suite, and reporting status back to the PR on every pull request.\n\nEach job runs in a fresh, isolated virtual machine or container, and GitHub provides a marketplace of reusable pre-built Actions for common tasks like deploying to AWS or publishing to npm that can be composed together rather than writing everything from scratch. This directly implements Continuous Integration and can be extended to Continuous Deployment, all within the same platform hosting the code itself.",
  "keyPoints": [
    "Workflow files (YAML) live in .github/workflows/, triggered by events like push, PR, or a schedule (cron)",
    "Each job runs in an isolated, fresh virtual machine/container — reproducible, clean environment every time",
    "Marketplace of reusable Actions: pre-built steps for common tasks (deploy, publish, notify) that can be composed together"
  ],
  "commonMistakes": [
    "Not knowing workflow files must be placed in .github/workflows/",
    "Assuming jobs share state between isolated virtual machine runs",
    "Writing custom scripts for tasks that have well-maintained Actions already available in the marketplace"
  ],
  "followUpQuestions": [
    "What events can trigger a GitHub Actions workflow?",
    "How does the marketplace of reusable Actions simplify workflow creation?",
    "How would you extend a CI workflow into a CD pipeline using GitHub Actions?"
  ],
  "realWorldExample": "A repository's GitHub Actions workflow automatically runs the test suite and linter on every pull request, blocking merge if any checks fail.",
  "codeExample": {
    "language": "YAML",
    "code": "name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm install\n      - run: npm test"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the workflow-trigger-job model and connect it to CI/CD concepts.",
  "tags": ["Git", "GitHub Actions", "CI/CD", "Interview"],
  "relatedTopics": ["CI/CD", "Automation", "Pull Request"],
  "references": ["GitHub Docs - docs.github.com"]
},
{
  "id": "linux-001",
  "category": "Linux",
  "topic": "File Permissions",
  "difficulty": "Easy",
  "question": "What is the difference between chmod 755 and chmod 644? Explain Linux file permissions.",
  "shortAnswer": "Linux permissions use 3 digits for owner, group, others — each digit sums Read(4), Write(2), Execute(1). 755 = rwxr-xr-x. 644 = rw-r--r--.",
  "detailedAnswer": "Every Linux file has three permission sets: Owner, Group, and Others, each with Read (4), Write (2), and Execute (1) permissions that sum together.\n\n755 means the owner has full access, since 7 equals read+write+execute, while group and others have read+execute (5), typical for scripts and directories, where execute on a directory means being able to enter or traverse it. 644 means the owner has read+write (6), while group and others have read-only (4), typical for regular data files.",
  "keyPoints": [
    "4 = read, 2 = write, 1 = execute — sum them for each permission set",
    "755: full access for owner, read+execute for group/others (scripts, directories)",
    "644: read+write for owner, read-only for group/others (regular files, config files)"
  ],
  "commonMistakes": [
    "Confusing what execute permission means on a directory versus a file",
    "Setting overly permissive permissions like 777 unnecessarily",
    "Forgetting the three permission sets apply separately to owner, group, and others"
  ],
  "followUpQuestions": [
    "What does execute permission mean when applied to a directory?",
    "How would you set permissions so only the owner can read and write a file?",
    "What is the difference between chmod's numeric and symbolic modes?"
  ],
  "realWorldExample": "A deployment script is set to 755 so it can be executed by anyone, while a configuration file containing sensitive settings is set to 600 so only the owner can read or write it.",
  "codeExample": {
    "language": "Bash",
    "code": "chmod 755 deploy.sh\nchmod 644 config.txt"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly decode the numeric permission digits and give appropriate real-world use cases.",
  "tags": ["Linux", "chmod", "File Permissions", "Interview"],
  "relatedTopics": ["File System Hierarchy", "sudo", "Users and Groups"],
  "references": ["Linux man pages - chmod(1)"]
},
{
  "id": "linux-002",
  "category": "Linux",
  "topic": "Processes and Daemons",
  "difficulty": "Medium",
  "question": "What is the difference between a Process and a Daemon in Linux? What is a Zombie Process?",
  "shortAnswer": "A regular process is tied to a terminal/session. A Daemon runs in the background, detached from any terminal. A Zombie Process has finished but still has a process table entry.",
  "detailedAnswer": "A Daemon, often ending in 'd' such as sshd, httpd, or crond, is a background process running independently of any controlling terminal, typically started at boot to provide a continuous service.\n\nA Zombie Process occurs when a child has finished executing but its parent hasn't yet read its exit status via wait(), so the process entry lingers in the process table until reaped. An Orphan Process is one whose parent terminated first; it's automatically adopted by init or systemd (PID 1).",
  "keyPoints": [
    "Daemon: background service, no controlling terminal, often auto-started at boot",
    "Zombie: child finished, but parent hasn't called wait() to read exit status",
    "Orphan: parent died first — automatically re-parented to init (PID 1)"
  ],
  "commonMistakes": [
    "Confusing zombie processes with orphan processes",
    "Assuming zombies consume significant system resources beyond a process table slot",
    "Not knowing daemons are typically started at boot and run independently of any terminal"
  ],
  "followUpQuestions": [
    "How would you clean up accumulated zombie processes?",
    "What process adopts an orphaned process?",
    "What are some common examples of Linux daemons?"
  ],
  "realWorldExample": "The sshd daemon runs continuously in the background, accepting incoming SSH connections without being tied to any user's terminal session.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish daemons from regular processes and explain the zombie/orphan process lifecycle.",
  "tags": ["Linux", "Process", "Daemon", "Interview"],
  "relatedTopics": ["Process Management", "systemd", "ps aux"],
  "references": ["Linux man pages - wait(2)"]
},
{
  "id": "linux-003",
  "category": "Linux",
  "topic": "grep, awk, sed",
  "difficulty": "Medium",
  "question": "What is the difference between grep, awk, and sed?",
  "shortAnswer": "grep: search/filter lines matching a pattern. sed: stream editor for find-and-replace/text transformation. awk: full pattern-scanning language for structured/columnar text.",
  "detailedAnswer": "grep \"ERROR\" app.log finds all error lines. sed 's/foo/bar/g' file.txt replaces all occurrences of 'foo' with 'bar' as text streams through.\n\nawk '{print $1, $3}' file.txt prints the 1st and 3rd whitespace-separated columns of every line, and supports variables, conditionals, and loops for more complex processing. These tools are commonly combined in pipelines, such as counting unique IPs that got 404 errors from an access log.",
  "keyPoints": [
    "grep: filtering — \"find me lines that match this pattern\"",
    "sed: transformation — \"replace this text with that text\"",
    "awk: structured processing — \"extract and compute over columns\""
  ],
  "commonMistakes": [
    "Using grep when column-based extraction (awk) is actually needed",
    "Forgetting sed operates on a stream rather than modifying files by default (needs -i for in-place)",
    "Not knowing awk supports variables, conditionals, and loops for more complex logic"
  ],
  "followUpQuestions": [
    "How would you count occurrences of a pattern using these tools combined?",
    "How does sed's -i flag change its behavior?",
    "What kind of processing is awk uniquely suited for compared to grep and sed?"
  ],
  "realWorldExample": "A sysadmin pipes cat access.log | grep \"404\" | awk '{print $1}' | sort | uniq -c to count unique IPs that triggered 404 errors.",
  "codeExample": {
    "language": "Bash",
    "code": "cat access.log | grep \"404\" | awk '{print $1}' | sort | uniq -c"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish the primary purpose of each tool and demonstrate how they combine in pipelines.",
  "tags": ["Linux", "grep", "awk", "sed", "Interview"],
  "relatedTopics": ["Shell Pipelines", "Text Processing", "Regular Expressions"],
  "references": ["Linux man pages - grep(1), sed(1), awk(1)"]
},
{
  "id": "linux-004",
  "category": "Linux",
  "topic": "Hard Links vs Soft Links",
  "difficulty": "Medium",
  "question": "What are Hard Links and Soft (Symbolic) Links? What's the difference?",
  "shortAnswer": "A Hard Link is another directory entry pointing to the SAME underlying data (inode) as the original file. A Soft Link is a separate file that just contains a PATH pointing to the original file.",
  "detailedAnswer": "A hard link creates a new filename that points to the exact same inode, the actual data on disk, as the original; both names are equally real, and the underlying data is only truly deleted once all hard links to it are removed. Hard links cannot span across different filesystems or partitions and cannot link to directories.\n\nA symbolic link is a completely separate small file that simply stores the path string to the target; if the original file is deleted or moved, the symlink becomes broken, or dangling, pointing to nothing. Symlinks can span filesystems and can link to directories.",
  "keyPoints": [
    "Hard link: same inode, same data — deleting the \"original\" doesn't affect a hard link, data persists",
    "Soft link: stores just a path — becomes broken/dangling if the target is deleted or moved",
    "Hard links: same filesystem only, no directories. Soft links: cross-filesystem OK, directories OK"
  ],
  "commonMistakes": [
    "Assuming deleting the original file breaks a hard link (it doesn't, since data persists via the inode)",
    "Trying to create a hard link across different filesystems",
    "Not knowing symlinks can become dangling when the target is moved or deleted"
  ],
  "followUpQuestions": [
    "Why can't hard links span different filesystems?",
    "What happens to a symlink when its target file is deleted?",
    "Why can't hard links point to directories?"
  ],
  "realWorldExample": "A system administrator creates a symlink for a frequently accessed config file so it can be referenced from multiple locations, while a hard link ensures a critical file's data survives even if one of its directory entries is removed.",
  "codeExample": {
    "language": "Bash",
    "code": "ln original.txt hardlink.txt\nln -s original.txt symlink.txt"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the inode-based nature of hard links versus the path-based nature of symlinks.",
  "tags": ["Linux", "Hard Link", "Symbolic Link", "Interview"],
  "relatedTopics": ["Inodes", "File System", "ln command"],
  "references": ["Linux man pages - ln(1)"]
},
{
  "id": "linux-005",
  "category": "Linux",
  "topic": "File System Hierarchy",
  "difficulty": "Medium",
  "question": "What is the Linux File System Hierarchy? Explain key directories (/etc, /var, /usr, /bin).",
  "shortAnswer": "Linux follows the Filesystem Hierarchy Standard (FHS) — /etc holds configuration files, /var holds variable/changing data (logs), /usr holds user programs/libraries, /bin holds essential executable binaries.",
  "detailedAnswer": "/etc contains system-wide configuration files, such as network settings and service configs, mostly plain text edited by admins. /var contains data that changes frequently during system operation, such as logs, mail spools, and cached data.\n\n/usr contains the majority of user-installed programs, libraries, and documentation, historically meaning 'Unix System Resources.' /bin, often symlinked to /usr/bin on modern systems, holds essential command binaries needed even in single-user or recovery mode. /home holds individual users' personal directories.",
  "keyPoints": [
    "/etc: configuration files — mostly plain text, admin-edited",
    "/var: variable data — logs, caches, anything that changes during normal operation",
    "/bin, /sbin: essential executables needed for basic system operation, even in recovery mode"
  ],
  "commonMistakes": [
    "Confusing /etc (configuration) with /var (variable runtime data)",
    "Not knowing why /bin needs to remain available even in recovery mode",
    "Storing changing runtime data in /usr instead of /var"
  ],
  "followUpQuestions": [
    "Why must /bin remain functional even in single-user/recovery mode?",
    "What kind of data would you expect to find in /var/log?",
    "How does /usr differ conceptually from /bin?"
  ],
  "realWorldExample": "A sysadmin checks /var/log/syslog for recent system errors while /etc/nginx/nginx.conf holds the web server's configuration.",
  "codeExample": {
    "language": "",
    "code": ""
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly describe the purpose of each key directory in the Linux filesystem hierarchy.",
  "tags": ["Linux", "File System Hierarchy", "Interview"],
  "relatedTopics": ["Linux Basics", "System Administration", "File Permissions"],
  "references": ["Filesystem Hierarchy Standard - refspecs.linuxfoundation.org"]
},
{
  "id": "linux-006",
  "category": "Linux",
  "topic": "kill vs kill -9 vs killall",
  "difficulty": "Medium",
  "question": "What is the difference between kill, kill -9, and killall?",
  "shortAnswer": "kill sends a termination signal (default SIGTERM, graceful) to a process by PID. kill -9 sends SIGKILL, an immediate forceful termination that cannot be caught/ignored. killall kills all processes matching a NAME rather than a specific PID.",
  "detailedAnswer": "kill <PID> sends SIGTERM by default, a polite request asking the process to terminate gracefully, allowing it to clean up resources, save state, or close file handles before exiting; a well-behaved program can intercept this signal to perform cleanup.\n\nkill -9 <PID> sends SIGKILL, which cannot be caught, blocked, or ignored by the process; the kernel terminates it immediately and unconditionally, useful for genuinely stuck processes but risks leaving resources in an inconsistent state since no cleanup occurs. killall <process-name> sends a signal to all processes matching that name, rather than requiring a specific PID lookup first.",
  "keyPoints": [
    "SIGTERM (default, signal 15): graceful request — process can catch it and clean up before exiting",
    "SIGKILL (signal 9): immediate, forceful, uncatchable — use only when SIGTERM doesn't work",
    "killall: targets by process NAME, killing all matching instances at once — kill requires a specific PID"
  ],
  "commonMistakes": [
    "Using kill -9 as the default instead of trying SIGTERM first",
    "Not knowing SIGKILL can leave resources in an inconsistent state due to no cleanup",
    "Confusing killall with kill by assuming both require a PID"
  ],
  "referencesCheck": [],
  "followUpQuestions": [
    "Why should SIGTERM be tried before SIGKILL?",
    "What risks does SIGKILL introduce by skipping cleanup?",
    "How does killall differ from pkill?"
  ],
  "realWorldExample": "A sysadmin first tries kill <PID> to gracefully stop an unresponsive service, only resorting to kill -9 if the process still refuses to terminate.",
  "codeExample": {
    "language": "Bash",
    "code": "kill 1234\nkill -9 1234\nkillall nginx"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the graceful-versus-forceful distinction between SIGTERM and SIGKILL and describe killall's name-based targeting.",
  "tags": ["Linux", "kill", "Signals", "Interview"],
  "relatedTopics": ["Process Management", "ps aux", "Signals"],
  "references": ["Linux man pages - kill(1), signal(7)"]
},
{
  "id": "linux-007",
  "category": "Linux",
  "topic": "Environment Variables",
  "difficulty": "Easy",
  "question": "What are Environment Variables in Linux? How do you set them permanently vs temporarily?",
  "shortAnswer": "Environment variables are key-value pairs available to processes running in a shell session, used for configuration (PATH, HOME, custom app settings). Temporary: export VAR=value. Permanent: added to shell config files like .bashrc or .profile.",
  "detailedAnswer": "export MY_VAR=\"value\" sets a variable for the current shell session and any child processes spawned from it, but this is lost once the terminal session closes.\n\nTo make it permanent across sessions, the export line is added to a shell startup file: .bashrc, which runs for every new interactive bash shell, .bash_profile or .profile, which runs for login shells specifically, or system-wide /etc/environment for all users. echo $VAR_NAME displays a variable's current value, while env or printenv lists all currently set environment variables.",
  "keyPoints": [
    "export VAR=value: sets for the current session only, lost when the terminal closes",
    "Add to ~/.bashrc (interactive shells) or ~/.profile (login shells) for persistence across sessions",
    "PATH: the most commonly referenced environment variable — determines where the shell looks for executables"
  ],
  "commonMistakes": [
    "Expecting a temporary export to persist across terminal sessions without adding it to a config file",
    "Confusing .bashrc (interactive shells) with .profile (login shells)",
    "Not reloading the shell config after editing it (forgetting to source the file)"
  ],
  "followUpQuestions": [
    "How would you make an environment variable available system-wide for all users?",
    "What's the difference between .bashrc and .bash_profile?",
    "How would you view all currently set environment variables?"
  ],
  "realWorldExample": "A developer adds an API key as an environment variable in ~/.bashrc so it's automatically available in every new terminal session without re-exporting it manually.",
  "codeExample": {
    "language": "Bash",
    "code": "export API_KEY=\"abc123\"\necho 'export API_KEY=\"abc123\"' >> ~/.bashrc\nsource ~/.bashrc"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the temporary-versus-permanent distinction and know which config files to use for persistence.",
  "tags": ["Linux", "Environment Variables", "Interview"],
  "relatedTopics": ["Shell Configuration", "PATH", "Bash"],
  "references": ["Bash Reference Manual - gnu.org"]
},
{
  "id": "linux-008",
  "category": "Linux",
  "topic": "Shell Redirection and Pipes",
  "difficulty": "Easy",
  "question": "What is the difference between >, >>, and | in Linux shell?",
  "shortAnswer": "> redirects output to a file, OVERWRITING it. >> redirects output to a file, APPENDING to existing content. | (pipe) sends the output of one command as the INPUT to another command.",
  "detailedAnswer": "echo \"hello\" > file.txt writes 'hello' to file.txt, completely replacing any existing content, which is dangerous if used carelessly on an important file. echo \"world\" >> file.txt adds 'world' as a new line at the end of file.txt, preserving what was already there.\n\ncat file.txt | grep \"error\" takes the output of cat file.txt and feeds it directly as the input to grep, allowing commands to be chained together to build powerful multi-step data processing pipelines without needing intermediate temporary files.",
  "keyPoints": [
    "&gt;: overwrite redirect — completely replaces the file's existing content",
    "&gt;&gt;: append redirect — adds to the end, preserving existing content",
    "|: pipes output of one command directly into another — enables chaining commands into pipelines"
  ],
  "commonMistakes": [
    "Accidentally using > instead of >> and overwriting important file content",
    "Not understanding that pipes chain the stdout of one command to the stdin of the next",
    "Forgetting redirection happens before the command executes in shell parsing order"
  ],
  "followUpQuestions": [
    "What happens if you accidentally use > instead of >> on a log file?",
    "How would you redirect both stdout and stderr to the same file?",
    "Can you chain multiple pipes together in one command?"
  ],
  "realWorldExample": "A log rotation script uses >> to append new entries to a log file, while a data pipeline uses | to chain grep, awk, and sort together.",
  "codeExample": {
    "language": "Bash",
    "code": "echo \"hello\" > file.txt\necho \"world\" >> file.txt\ncat file.txt | grep \"error\""
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish overwrite, append, and piping behavior with correct syntax.",
  "tags": ["Linux", "Shell Redirection", "Pipes", "Interview"],
  "relatedTopics": ["File Descriptors", "Bash", "Shell Scripting"],
  "references": ["Bash Reference Manual - gnu.org"]
},
{
  "id": "linux-009",
  "category": "Linux",
  "topic": "cron",
  "difficulty": "Medium",
  "question": "What is cron? How do you schedule a recurring task?",
  "shortAnswer": "cron is a time-based job scheduler in Linux that runs commands/scripts automatically at specified intervals, configured via \"crontab\" entries.",
  "detailedAnswer": "A crontab entry follows a specific 5-field time format, minute, hour, day-of-month, month, and day-of-week, followed by the command to execute; for example, a schedule running at minute 0, hour 2, every day would run a backup script every day at 2:00 AM.\n\ncrontab -e opens the current user's crontab for editing, while crontab -l lists current scheduled jobs. Cron is widely used for automated backups, log rotation, sending scheduled reports, and periodic cleanup tasks.",
  "keyPoints": [
    "Format: minute hour day-of-month month day-of-week command (5 fields + the command itself)",
    "* in each field means \"every\" — e.g., * * * * * alone runs the command every single minute",
    "crontab -e: edit your scheduled jobs. crontab -l: list current scheduled jobs"
  ],
  "commonMistakes": [
    "Getting the field order wrong (minute, hour, day-of-month, month, day-of-week)",
    "Forgetting cron jobs run with a different environment than an interactive shell (PATH issues)",
    "Not testing the exact command syntax before scheduling it in crontab"
  ],
  "followUpQuestions": [
    "How would you schedule a job to run every Monday at 9 AM?",
    "Why might a script that works interactively fail when run via cron?",
    "How would you view currently scheduled cron jobs?"
  ],
  "realWorldExample": "A sysadmin schedules a nightly backup script using cron with the entry '0 2 * * * /path/to/backup.sh', running it automatically every day at 2:00 AM.",
  "codeExample": {
    "language": "Bash",
    "code": "# crontab -e\n0 2 * * * /path/to/backup.sh"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly explain the 5-field cron format and describe crontab management commands.",
  "tags": ["Linux", "cron", "Scheduling", "Interview"],
  "relatedTopics": ["systemd Timers", "Shell Scripting", "Automation"],
  "references": ["Linux man pages - crontab(5)"]
},
{
  "id": "linux-010",
  "category": "Linux",
  "topic": "su vs sudo",
  "difficulty": "Easy",
  "question": "What is the difference between su and sudo?",
  "shortAnswer": "su switches to another user entirely (typically root), requiring THAT user's password, and stays in that user context until you exit. sudo runs a SINGLE command with elevated (root) privileges, requiring YOUR OWN password, then returns to your normal user.",
  "detailedAnswer": "su starts an entirely new shell session as the target user, commonly root, requiring the target user's password; you remain logged in as that user for every subsequent command until you explicitly exit that shell, which is powerful but risky since it's easy to forget you're operating with elevated privileges.\n\nsudo <command> executes just one specific command with root privileges, requiring only your own account password assuming your account is configured with sudo access in /etc/sudoers, then immediately returns you to your normal, unprivileged user context. Modern best practice favors sudo, since privilege elevation is explicit and scoped to individual commands.",
  "keyPoints": [
    "su: switches to and remains as another user (typically root) until you explicitly exit",
    "sudo: elevates privileges for ONE command only, using YOUR OWN password, then returns to normal",
    "Modern best practice favors sudo — scoped, explicit, and logged per-command elevation rather than a persistent root shell"
  ],
  "commonMistakes": [
    "Using su and forgetting you're still operating as root for subsequent commands",
    "Not knowing sudo access must be configured in /etc/sudoers",
    "Assuming su and sudo require the same password (su requires the target user's password)"
  ],
  "followUpQuestions": [
    "Why is sudo generally considered safer than su for modern systems?",
    "What file configures which users have sudo access?",
    "What password does sudo require compared to su?"
  ],
  "realWorldExample": "A developer uses sudo apt install to install a package with elevated privileges for just that one command, rather than switching entirely to a root shell with su.",
  "codeExample": {
    "language": "Bash",
    "code": "sudo apt update\nsu -"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the scope difference (persistent user switch vs single-command elevation) and recommend sudo as the safer modern practice.",
  "tags": ["Linux", "su", "sudo", "Interview"],
  "relatedTopics": ["File Permissions", "System Administration", "sudoers"],
  "references": ["Linux man pages - su(1), sudo(8)"]
},
{
  "id": "linux-011",
  "category": "Linux",
  "topic": "Shell Scripts and Shebang",
  "difficulty": "Easy",
  "question": "What is a Shell Script? What is the \"shebang\" line at the top of a script?",
  "shortAnswer": "A shell script is a text file containing a sequence of shell commands, executed as a program. The shebang line (#!/bin/bash) at the very top tells the OS which interpreter should run the script.",
  "detailedAnswer": "A shell script automates a sequence of commands that would otherwise need to be typed manually, one at a time, useful for repetitive tasks like deployment steps, backups, and environment setup.\n\nThe shebang line, starting with #! followed by a path, is technically a special comment that the kernel reads first when the script is executed directly; it tells the OS exactly which interpreter binary should be used to run the rest of the file's contents, allowing a script to be executed directly rather than needing to explicitly type the interpreter name every time.",
  "keyPoints": [
    "Shebang line must be the very first line of the file, starting with #!",
    "#!/usr/bin/env bash is often preferred over a hardcoded #!/bin/bash — more portable across systems",
    "Script needs execute permission (chmod +x script.sh) to be run directly as ./script.sh"
  ],
  "commonMistakes": [
    "Forgetting to make the script executable with chmod +x before running it directly",
    "Placing the shebang line anywhere other than the very first line",
    "Hardcoding an interpreter path that may not exist on all systems instead of using env"
  ],
  "followUpQuestions": [
    "Why is #!/usr/bin/env bash often preferred over a hardcoded path?",
    "What happens if a script lacks a shebang line?",
    "How would you make a script executable?"
  ],
  "realWorldExample": "A deployment script starts with #!/bin/bash and is made executable with chmod +x deploy.sh, allowing it to be run directly as ./deploy.sh.",
  "codeExample": {
    "language": "Bash",
    "code": "#!/bin/bash\necho \"Deploying application...\"\nchmod +x deploy.sh"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the shebang's role in interpreter selection and describe the executable permission requirement.",
  "tags": ["Linux", "Shell Script", "Shebang", "Interview"],
  "relatedTopics": ["Bash", "chmod", "Automation"],
  "references": ["Bash Reference Manual - gnu.org"]
},
{
  "id": "linux-012",
  "category": "Linux",
  "topic": "Symlink Removal Behavior",
  "difficulty": "Medium",
  "question": "What is the difference between a Soft Link and a Symbolic Link vs Directory Symlinks — and what happens on rm?",
  "shortAnswer": "\"Soft link\" and \"symbolic link\" are the same thing — different names for the identical concept. Removing (rm) a symlink only deletes the link itself, never the actual target file/data.",
  "detailedAnswer": "This is a common point of confusion for beginners: 'soft link' and 'symbolic link,' often abbreviated 'symlink,' are exactly the same concept, just referred to by different names interchangeably, as opposed to a 'hard link,' which is a genuinely different mechanism.\n\nWhen you rm a symlink, you're only deleting that small file containing the path reference; the actual target file or data it was pointing to remains completely untouched and intact. This is different from deleting the actual target file itself, which would leave any symlinks pointing to it broken or dangling, still existing as files but pointing to nothing valid.",
  "keyPoints": [
    "\"Soft link\" = \"symbolic link\" = \"symlink\" — all the same term, no functional difference",
    "rm symlink_name: deletes only the link itself, target data is completely unaffected",
    "Deleting the TARGET (not the link) leaves any symlinks pointing to it broken/dangling"
  ],
  "commonMistakes": [
    "Assuming removing a symlink also deletes the target file's actual data",
    "Confusing 'soft link' and 'symbolic link' as different concepts rather than the same thing",
    "Not recognizing a broken symlink when the target has been deleted"
  ],
  "followUpQuestions": [
    "How would you identify a broken symlink on the filesystem?",
    "What happens if you rm the target file instead of the symlink?",
    "Is there any functional difference between 'soft link' and 'symbolic link'?"
  ],
  "realWorldExample": "A developer removes a symlink pointing to a shared config file with rm, leaving the actual config file completely intact for other symlinks or direct references.",
  "codeExample": {
    "language": "Bash",
    "code": "rm symlink_name  # only removes the link, not the target"
  },
  "interviewerExpectation": "The interviewer expects the candidate to clarify the terminology equivalence and correctly describe rm's effect on a symlink versus its target.",
  "tags": ["Linux", "Symbolic Link", "rm", "Interview"],
  "relatedTopics": ["Hard Links", "File System", "ln command"],
  "references": ["Linux man pages - ln(1), rm(1)"]
},
{
  "id": "linux-013",
  "category": "Linux",
  "topic": "top and htop",
  "difficulty": "Easy",
  "question": "What is top / htop? What key metrics do they show?",
  "shortAnswer": "top (and the more user-friendly htop) provide a real-time, continuously updating view of system resource usage — CPU, memory, running processes, and their resource consumption.",
  "detailedAnswer": "top displays a live-updating table showing overall CPU usage percentage broken down by user, system, and idle time, memory usage including total, used, free, and cached, and a list of running processes sorted by resource consumption, showing each process's PID, user, CPU%, memory%, and command.\n\nhtop is a more visually polished, interactive alternative, offering color-coded bars for CPU and memory usage per core, easier process filtering and sorting via keyboard shortcuts, and the ability to directly kill processes from within the interface without needing to note down a PID separately.",
  "keyPoints": [
    "Shows real-time CPU%, memory usage, and per-process resource consumption, continuously updating",
    "Sort by CPU (P), memory (M), or other columns to quickly identify resource-hogging processes",
    "htop: more user-friendly, color-coded, interactive alternative to the classic top command"
  ],
  "commonMistakes": [
    "Not knowing how to sort processes by CPU or memory usage within top",
    "Confusing top's default sort order with a fixed, unchangeable view",
    "Overlooking htop's ability to kill processes directly from its interface"
  ],
  "followUpQuestions": [
    "How would you sort processes by memory usage in top?",
    "What advantages does htop offer over the classic top command?",
    "What does the STAT column in top/ps output represent?"
  ],
  "realWorldExample": "A sysadmin runs htop to quickly identify a runaway process consuming excessive CPU on a slow-responding server.",
  "codeExample": {
    "language": "Bash",
    "code": "top\nhtop"
  },
  "interviewerExpectation": "The interviewer expects the candidate to describe the key metrics shown and identify htop as a more user-friendly alternative to top.",
  "tags": ["Linux", "top", "htop", "Interview"],
  "relatedTopics": ["ps aux", "Process Management", "System Monitoring"],
  "references": ["Linux man pages - top(1), htop(1)"]
},
{
  "id": "linux-014",
  "category": "Linux",
  "topic": "apt vs yum vs dpkg",
  "difficulty": "Medium",
  "question": "What is the difference between apt, yum, and dpkg?",
  "shortAnswer": "dpkg is a low-level package MANAGER for Debian-based systems, installing individual .deb files directly. apt is a high-level tool built on top of dpkg that ALSO handles dependency resolution and downloading from repositories. yum is the equivalent high-level package manager for RPM-based systems (RedHat/CentOS/Fedora).",
  "detailedAnswer": "dpkg -i package.deb installs a specific, already-downloaded .deb package file directly, but it does not automatically resolve or download any dependencies that package might need, leaving that entirely up to the user.\n\napt install package-name is the high-level tool most users actually interact with directly; it searches configured software repositories, automatically resolves and downloads any required dependencies, and internally uses dpkg to perform the actual low-level installation. yum, or its modern replacement dnf, serves the same high-level role as apt, but for RPM-based distributions like RedHat, CentOS, and Fedora, working with .rpm package files instead of .deb.",
  "keyPoints": [
    "dpkg: low-level, installs a specific .deb file directly, no automatic dependency resolution",
    "apt: high-level, resolves dependencies automatically, fetches from configured repositories — used on Debian/Ubuntu",
    "yum/dnf: the RPM-based equivalent of apt — used on RedHat/CentOS/Fedora systems"
  ],
  "commonMistakes": [
    "Using dpkg directly and expecting automatic dependency resolution",
    "Confusing apt (Debian-based) with yum (RPM-based) package management ecosystems",
    "Not knowing apt internally uses dpkg for the actual installation step"
  ],
  "followUpQuestions": [
    "Why would dpkg fail to install a package that apt would succeed at?",
    "What is the RPM-based equivalent of apt?",
    "How does apt resolve dependencies automatically?"
  ],
  "realWorldExample": "A sysadmin uses apt install nginx on Ubuntu, which automatically resolves and installs all of nginx's dependencies, rather than manually installing individual .deb files with dpkg.",
  "codeExample": {
    "language": "Bash",
    "code": "apt install nginx\ndpkg -i package.deb\nyum install httpd"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the low-level versus high-level relationship between dpkg and apt, and identify yum as the RPM equivalent.",
  "tags": ["Linux", "apt", "yum", "dpkg", "Interview"],
  "relatedTopics": ["Package Management", "Debian", "RedHat"],
  "references": ["Debian Documentation - debian.org"]
},
{
  "id": "linux-015",
  "category": "Linux",
  "topic": "SSH Public-Key Authentication",
  "difficulty": "Medium",
  "question": "What is SSH? How does public-key authentication work?",
  "shortAnswer": "SSH (Secure Shell) provides an encrypted channel for remotely accessing and controlling another machine. Public-key authentication lets you log in using a cryptographic key pair instead of a password.",
  "detailedAnswer": "A key pair is generated locally using ssh-keygen: a private key kept secret, never shared, and ideally password-protected, and a public key safe to share freely. The public key is copied to the ~/.ssh/authorized_keys file on the remote server you want to access.\n\nWhen connecting, the SSH client proves possession of the matching private key through a cryptographic challenge-response process; the server never sees or needs the private key itself, only proof that the client possesses it. This is generally considered more secure than password authentication, since it's immune to brute-force password guessing and enables convenient passwordless login for automated scripts.",
  "keyPoints": [
    "Key pair: private key (secret, stays on your machine) + public key (shared, copied to servers you access)",
    "Public key goes into the remote server's ~/.ssh/authorized_keys file to grant access",
    "More secure than password auth — immune to brute-force guessing, and enables passwordless automated access"
  ],
  "commonMistakes": [
    "Sharing the private key instead of the public key",
    "Not securing the private key with a passphrase",
    "Forgetting to add the public key to the correct ~/.ssh/authorized_keys file on the remote server"
  ],
  "followUpQuestions": [
    "Why is public-key authentication considered more secure than password authentication?",
    "What file on the remote server stores authorized public keys?",
    "How does the challenge-response process prove private key possession without transmitting it?"
  ],
  "realWorldExample": "A CI/CD pipeline uses SSH public-key authentication to deploy code to a production server without requiring a manually entered password.",
  "codeExample": {
    "language": "Bash",
    "code": "ssh-keygen -t ed25519\nssh-copy-id user@remote-server"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the key pair mechanism and the challenge-response process that avoids transmitting the private key.",
  "tags": ["Linux", "SSH", "Public-Key Authentication", "Interview"],
  "relatedTopics": ["Encryption", "Security", "Remote Access"],
  "references": ["OpenSSH Documentation - openssh.com"]
},
{
  "id": "linux-016",
  "category": "Linux",
  "topic": "Absolute vs Relative Paths",
  "difficulty": "Easy",
  "question": "What is a Symbolic vs Absolute vs Relative Path in Linux?",
  "shortAnswer": "Absolute path: starts from the root /, always fully specifies the location regardless of current directory. Relative path: specified relative to your CURRENT working directory, changes meaning depending on where you are.",
  "detailedAnswer": "An absolute path always refers to the exact same location on the filesystem no matter what your current working directory happens to be; it's unambiguous and portable across different starting contexts, which is useful in scripts that might be run from any directory.\n\nA relative path is interpreted relative to wherever you currently are, where . refers to the current directory and .. refers to the parent directory. Relative paths are more convenient for everyday interactive use but can behave unexpectedly in scripts if the script is run from an unanticipated working directory.",
  "keyPoints": [
    "Absolute path: starts with /, unambiguous regardless of current location — best for scripts",
    "Relative path: interpreted based on current working directory — . = here, .. = parent directory",
    "pwd: prints your current absolute working directory path, useful for orienting yourself"
  ],
  "commonMistakes": [
    "Using relative paths in scripts that might run from an unpredictable working directory",
    "Confusing . (current directory) with .. (parent directory)",
    "Not using pwd to confirm the current location before running a relative-path command"
  ],
  "followUpQuestions": [
    "Why are absolute paths generally preferred in scripts?",
    "How would you determine your current working directory?",
    "What does .. refer to in a relative path?"
  ],
  "realWorldExample": "A cron job script uses absolute paths for all file references since it may be run from an unpredictable working directory, unlike interactive terminal use where relative paths are more convenient.",
  "codeExample": {
    "language": "Bash",
    "code": "cd /home/user/documents\ncat ../notes.txt   # relative path\ncat /home/user/notes.txt  # absolute path"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain why absolute paths are safer in scripts and correctly describe relative path notation.",
  "tags": ["Linux", "File Paths", "Interview"],
  "relatedTopics": ["Shell Scripting", "File System Hierarchy", "pwd"],
  "references": ["Linux man pages - path_resolution(7)"]
},
{
  "id": "linux-017",
  "category": "Linux",
  "topic": "find command",
  "difficulty": "Medium",
  "question": "What is find command used for? Give practical examples.",
  "shortAnswer": "find searches the filesystem for files/directories matching specified criteria (name, size, modification time, permissions) and can execute actions on the matched results.",
  "detailedAnswer": "find /path -name \"*.log\" searches recursively starting from /path for any file matching the pattern *.log. find . -mtime -7 finds files modified within the last 7 days, and find . -size +100M finds files larger than 100MB.\n\nCombined with the -exec flag, find can perform an action on every matched result, such as finding and deleting every temporary file matching a pattern, where {} is replaced by each matched filename. This makes find extremely powerful for bulk file management, cleanup scripts, and locating specific files across large directory trees.",
  "keyPoints": [
    "-name: search by filename pattern (supports wildcards like *)",
    "-mtime, -size: filter by modification time or file size respectively",
    "-exec <command> {} \\;: execute a command on each matched result — powerful for bulk operations"
  ],
  "commonMistakes": [
    "Forgetting to escape the semicolon in -exec (needs \\; or +)",
    "Not testing a find command without -delete or -exec first to preview matches",
    "Confusing -mtime's sign convention (negative means 'within the last N days')"
  ],
  "followUpQuestions": [
    "How would you preview which files would be affected before running a destructive -exec command?",
    "What's the difference between using -exec ... \\; and -exec ... +?",
    "How would you find files larger than a certain size modified in the last week?"
  ],
  "realWorldExample": "A cleanup script uses find . -name \"*.tmp\" -exec rm {} \\; to locate and delete all temporary files across a directory tree.",
  "codeExample": {
    "language": "Bash",
    "code": "find . -name \"*.log\"\nfind . -mtime -7\nfind . -name \"*.tmp\" -exec rm {} \\;"
  },
  "interviewerExpectation": "The interviewer expects the candidate to demonstrate practical find usage including filtering criteria and the -exec flag.",
  "tags": ["Linux", "find", "Interview"],
  "relatedTopics": ["Shell Scripting", "File Management", "grep"],
  "references": ["Linux man pages - find(1)"]
},
{
  "id": "linux-018",
  "category": "Linux",
  "topic": "/etc/passwd vs /etc/shadow",
  "difficulty": "Medium",
  "question": "What is the Difference Between /etc/passwd and /etc/shadow?",
  "shortAnswer": "/etc/passwd stores basic user account information (username, UID, home directory, default shell) and is readable by everyone. /etc/shadow stores actual (hashed) password data and is readable only by root, for security.",
  "detailedAnswer": "Historically, /etc/passwd used to store password hashes directly, but since this file needs to be world-readable, as many system utilities need to look up basic account info like usernames and UIDs, storing password hashes there made them vulnerable to offline brute-force cracking by any local user.\n\n/etc/shadow was introduced to separate the sensitive password hash data into a file with strict permissions readable only by root, while /etc/passwd retains only non-sensitive account metadata plus a placeholder in the field where the password hash used to be, indicating the real hash is in /etc/shadow.",
  "keyPoints": [
    "/etc/passwd: world-readable, contains username, UID, GID, home dir, default shell — no sensitive data",
    "/etc/shadow: root-only readable, contains the actual hashed password and password aging/expiry policy",
    "The x placeholder in /etc/passwd's password field signals \"actual hash lives in /etc/shadow instead\""
  ],
  "commonMistakes": [
    "Assuming /etc/passwd still stores actual password hashes",
    "Not knowing why /etc/passwd must remain world-readable",
    "Confusing the x placeholder as meaning the account has no password"
  ],
  "followUpQuestions": [
    "Why does /etc/passwd need to remain world-readable?",
    "What does the 'x' in the password field of /etc/passwd indicate?",
    "What additional information beyond the password hash does /etc/shadow store?"
  ],
  "realWorldExample": "A security audit checks /etc/shadow's permissions to ensure only root can read the file, protecting hashed passwords from being accessed by regular users.",
  "codeExample": {
    "language": "Bash",
    "code": "cat /etc/passwd | grep username\nsudo cat /etc/shadow | grep username"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain why password hashes were moved to a separate, more restricted file for security reasons.",
  "tags": ["Linux", "passwd", "shadow", "Security", "Interview"],
  "relatedTopics": ["File Permissions", "User Management", "Security"],
  "references": ["Linux man pages - passwd(5), shadow(5)"]
},
{
  "id": "linux-019",
  "category": "Linux",
  "topic": "File Descriptors",
  "difficulty": "Medium",
  "question": "What are File Descriptors in Linux? What are 0, 1, and 2?",
  "shortAnswer": "A File Descriptor is a numeric handle the OS uses to reference an open file/stream. 0 = standard input (stdin), 1 = standard output (stdout), 2 = standard error (stderr) — always open by default for every process.",
  "detailedAnswer": "Every process automatically starts with these three file descriptors open: 0 (stdin) reads input, typically from the keyboard or terminal unless redirected; 1 (stdout) writes normal program output, typically displayed on the terminal; 2 (stderr) writes error messages, also typically displayed on the terminal by default, but kept separate from stdout specifically so error output can be redirected independently.\n\nThis separation is why a pattern like command > output.txt 2>&1 is common; it redirects stdout to a file, then redirects stderr to wherever stdout is now pointing, capturing both regular output and errors together in the same file.",
  "keyPoints": [
    "0 = stdin, 1 = stdout, 2 = stderr — always open by default, no explicit setup required",
    "stdout and stderr are separate streams even though both display on the terminal by default",
    "2>&1: redirects stderr to wherever stdout is currently pointing — commonly used to capture both in one file"
  ],
  "commonMistakes": [
    "Confusing the order of 2>&1 with 1>&2, causing incorrect redirection",
    "Not knowing stdout and stderr are separate streams despite both appearing on the terminal",
    "Assuming a redirection captures errors without explicitly redirecting stderr"
  ],
  "followUpQuestions": [
    "Why does command > output.txt 2>&1 need to be in that specific order?",
    "How would you redirect only stderr to a file, leaving stdout on the terminal?",
    "What happens to stdin if you don't redirect it?"
  ],
  "realWorldExample": "A deployment script redirects both stdout and stderr to a log file using command > deploy.log 2>&1 to capture all output for later debugging.",
  "codeExample": {
    "language": "Bash",
    "code": "command > output.log 2>&1"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly identify the three default file descriptors and explain the 2>&1 redirection pattern.",
  "tags": ["Linux", "File Descriptors", "stdin", "stdout", "stderr", "Interview"],
  "relatedTopics": ["Shell Redirection", "Bash", "Process I/O"],
  "references": ["Bash Reference Manual - gnu.org"]
},
{
  "id": "linux-020",
  "category": "Linux",
  "topic": "Runlevels and systemctl",
  "difficulty": "Medium",
  "question": "What is a Runlevel / systemd Target? What is systemctl used for?",
  "shortAnswer": "A Runlevel (older SysV init systems) or systemd Target (modern systems) defines a specific system state (single-user mode, multi-user with networking, GUI mode, etc.). systemctl is the primary command for managing services under systemd.",
  "detailedAnswer": "Older Linux systems used numbered runlevels, such as 0 for halt, 1 for single-user or rescue mode, 3 for multi-user with networking and no GUI, 5 for multi-user with GUI, and 6 for reboot, to define which services should be running at a given system state.\n\nModern systems predominantly use systemd, which replaces this with named targets like multi-user.target and graphical.target, offering more flexibility. systemctl is the primary tool for interacting with systemd: start, stop, and restart control a specific service's running state, while enable and disable configure whether it starts automatically at boot, and status shows current status and recent log output.",
  "keyPoints": [
    "Older SysV: numbered runlevels (0-6). Modern systemd: named targets (multi-user.target, graphical.target)",
    "systemctl start/stop/restart <service>: immediately control a running service's state",
    "systemctl enable/disable <service>: controls whether the service auto-starts at boot, independent of current state"
  ],
  "commonMistakes": [
    "Confusing systemctl start (immediate action) with systemctl enable (boot-time configuration)",
    "Not knowing modern systems use named targets instead of numbered runlevels",
    "Assuming stopping a service also disables it from starting at next boot"
  ],
  "followUpQuestions": [
    "What is the difference between systemctl start and systemctl enable?",
    "What named target roughly corresponds to the old runlevel 5?",
    "How would you check a service's current status and recent logs?"
  ],
  "realWorldExample": "A sysadmin uses systemctl enable nginx to ensure the web server starts automatically at boot, and systemctl status nginx to check its current running state.",
  "codeExample": {
    "language": "Bash",
    "code": "systemctl start nginx\nsystemctl enable nginx\nsystemctl status nginx"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish immediate service control from boot-time configuration and know both legacy and modern terminology.",
  "tags": ["Linux", "systemctl", "systemd", "Runlevel", "Interview"],
  "relatedTopics": ["Daemons", "Boot Process", "Service Management"],
  "references": ["systemd Documentation - freedesktop.org"]
},
{
  "id": "linux-021",
  "category": "Linux",
  "topic": "wget vs curl",
  "difficulty": "Easy",
  "question": "What is the difference between wget and curl?",
  "shortAnswer": "Both download content from URLs via the command line, but curl is a more general-purpose tool supporting many protocols and use cases (including sending data, custom headers, testing APIs), while wget is more specialized specifically for reliably downloading files, including recursive website mirroring.",
  "detailedAnswer": "curl is extremely versatile; beyond simple downloads, it's commonly used for testing and interacting with APIs, sending custom HTTP methods, headers, and request bodies, supports a huge range of protocols, and by default prints output to stdout rather than saving to a file.\n\nwget is more narrowly focused on robust file downloading; it has excellent built-in support for resuming interrupted downloads, recursive downloading for mirroring an entire website's linked pages, and by default saves the downloaded content directly to a file matching the URL's filename.",
  "keyPoints": [
    "curl: general-purpose — API testing, custom headers/methods, many protocols, outputs to stdout by default",
    "wget: specialized for robust downloading — resume support, recursive site mirroring, saves to file by default",
    "Practical rule of thumb: curl for interacting with APIs, wget for straightforwardly downloading files"
  ],
  "commonMistakes": [
    "Using curl without -o and being surprised output goes to stdout instead of a file",
    "Assuming wget can easily send custom HTTP methods and headers like curl",
    "Not leveraging wget's resume support for large or unreliable downloads"
  ],
  "followUpQuestions": [
    "How would you save curl's output to a file instead of printing to stdout?",
    "Why is wget better suited for mirroring an entire website?",
    "How would you send a custom header using curl?"
  ],
  "realWorldExample": "A developer uses curl to test a REST API with custom headers, while a sysadmin uses wget to download and resume a large file over an unreliable connection.",
  "codeExample": {
    "language": "Bash",
    "code": "curl -X POST -H \"Content-Type: application/json\" -d '{}' https://api.example.com\nwget https://example.com/file.zip"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish curl's general-purpose API usage from wget's specialized file-downloading focus.",
  "tags": ["Linux", "wget", "curl", "Interview"],
  "relatedTopics": ["HTTP", "APIs", "Command Line Tools"],
  "references": ["Linux man pages - curl(1), wget(1)"]
},
{
  "id": "linux-022",
  "category": "Linux",
  "topic": "df vs du",
  "difficulty": "Easy",
  "question": "What is df vs du? What do they measure?",
  "shortAnswer": "df (disk free) shows overall disk space usage per MOUNTED FILESYSTEM/partition. du (disk usage) shows how much space specific FILES or DIRECTORIES are actually consuming.",
  "detailedAnswer": "df -h gives a high-level summary of each mounted filesystem, including total size, used space, available space, and percentage used, answering how full the disk or partition is overall.\n\ndu -sh /path/to/directory recursively calculates the total size consumed by a specific directory and its contents, answering how much space that particular folder is actually taking up. These commands can sometimes show apparently conflicting numbers if files are deleted while still held open by a running process, since the disk space isn't actually freed until the process closes the file handle.",
  "keyPoints": [
    "df -h: filesystem-level view — overall disk/partition usage, human-readable sizes with -h",
    "du -sh <path>: directory/file-level view — summarized total size of a specific location",
    "Discrepancies can occur if a deleted file is still held open by a running process (space not yet actually freed)"
  ],
  "commonMistakes": [
    "Confusing df (filesystem-wide) with du (specific directory/file) scope",
    "Not accounting for open-but-deleted files causing df/du discrepancies",
    "Forgetting the -h flag for human-readable sizes"
  ],
  "followUpQuestions": [
    "Why might df show a disk as full while du can't find where the space is being used?",
    "How would you find the largest directories consuming space using du?",
    "What does the -h flag do for both commands?"
  ],
  "realWorldExample": "A sysadmin notices df shows a disk nearly full, but du can't account for all the space, indicating a deleted log file is still held open by a running process.",
  "codeExample": {
    "language": "Bash",
    "code": "df -h\ndu -sh /var/log"
  },
  "interviewerExpectation": "The interviewer expects the candidate to distinguish filesystem-level usage (df) from directory-level usage (du) and explain the open-file discrepancy scenario.",
  "tags": ["Linux", "df", "du", "Interview"],
  "relatedTopics": ["File System", "Disk Management", "System Monitoring"],
  "references": ["Linux man pages - df(1), du(1)"]
},
{
  "id": "linux-023",
  "category": "Linux",
  "topic": "nice and renice",
  "difficulty": "Medium",
  "question": "What is the purpose of the nice and renice commands?",
  "shortAnswer": "nice starts a new process with a specified priority level, and renice adjusts the priority of an already-running process — controlling how much CPU scheduling preference it receives relative to other processes.",
  "detailedAnswer": "Linux process priority, or niceness, ranges from -20, the highest priority with the most CPU preference, to +19, the lowest priority, most willing to yield CPU to others; the name 'nice' reflects that a higher value means the process is being more nice to other processes by yielding CPU time more readily.\n\nnice -n 10 command starts a new process with a niceness of 10, lower priority than default. renice -n 5 -p <PID> changes the priority of an already-running process identified by its PID. Regular non-root users can only increase niceness, lowering their own process's priority; only root can decrease niceness, raising a process's priority above default.",
  "keyPoints": [
    "Niceness range: -20 (highest priority) to +19 (lowest priority) — default is typically 0",
    "nice -n <value> command: start a new process with a specified priority level",
    "Regular users can only lower their own process's priority (increase niceness) — only root can raise it"
  ],
  "commonMistakes": [
    "Assuming a regular user can decrease niceness (raise priority) without root privileges",
    "Confusing lower niceness values with lower priority (lower niceness actually means higher priority)",
    "Using renice on the wrong PID without verifying it first"
  ],
  "followUpQuestions": [
    "Why can only root decrease a process's niceness value?",
    "What is the default niceness value for a new process?",
    "How would you lower the priority of an already-running CPU-intensive process?"
  ],
  "realWorldExample": "A sysadmin uses nice -n 15 to start a low-priority background compression job so it doesn't compete for CPU with more important interactive processes.",
  "codeExample": {
    "language": "Bash",
    "code": "nice -n 15 tar -czf backup.tar.gz /data\nrenice -n 5 -p 1234"
  },
  "interviewerExpectation": "The interviewer expects the candidate to correctly explain the niceness scale and the root-versus-regular-user privilege distinction.",
  "tags": ["Linux", "nice", "renice", "Process Priority", "Interview"],
  "relatedTopics": ["CPU Scheduling", "Process Management", "ps aux"],
  "references": ["Linux man pages - nice(1), renice(1)"]
},
{
  "id": "linux-024",
  "category": "Linux",
  "topic": "ps aux",
  "difficulty": "Easy",
  "question": "What is ps aux? What do the columns mean?",
  "shortAnswer": "ps aux lists ALL currently running processes on the system with detailed information — user, PID, CPU/memory usage, status, and the command that started each process.",
  "detailedAnswer": "The flags combine: a shows processes for all users, not just the current one; u displays user-oriented output format with additional detail columns; x includes processes not attached to a controlling terminal, like daemons or background services.\n\nKey columns in the output include USER (who owns the process), PID (unique process identifier), %CPU and %MEM (current resource usage), STAT (process status codes like R for running, S for sleeping, Z for zombie), and COMMAND (the actual command that started it). This is frequently piped into grep to find a specific process.",
  "keyPoints": [
    "a: all users' processes. u: detailed user-oriented format. x: include processes without a terminal",
    "STAT column codes: R (running), S (sleeping), Z (zombie), D (uninterruptible sleep, usually waiting on I/O)",
    "Commonly piped with grep: ps aux | grep <name> to quickly find a specific process by name"
  ],
  "commonMistakes": [
    "Not knowing what each STAT code (R, S, Z, D) represents",
    "Confusing the a, u, and x flags' individual meanings",
    "Forgetting ps aux without grep filtering can produce overwhelming output on busy systems"
  ],
  "followUpQuestions": [
    "What does the Z status code indicate in the STAT column?",
    "How would you find all processes related to a specific application using ps aux?",
    "What's the difference between the a and x flags?"
  ],
  "realWorldExample": "A sysadmin runs ps aux | grep nginx to quickly find all processes related to the nginx web server and check their resource usage.",
  "codeExample": {
    "language": "Bash",
    "code": "ps aux | grep nginx"
  },
  "interviewerExpectation": "The interviewer expects the candidate to explain the flag meanings and correctly interpret key output columns like STAT.",
  "tags": ["Linux", "ps aux", "Process Management", "Interview"],
  "relatedTopics": ["top", "Process States", "grep"],
  "references": ["Linux man pages - ps(1)"]
},
{
  "id": "linux-025",
  "category": "Linux",
  "topic": "apt update vs apt upgrade",
  "difficulty": "Easy",
  "question": "What is the Difference Between a Package Manager's \"Update\" and \"Upgrade\" commands (e.g., apt update vs apt upgrade)?",
  "shortAnswer": "apt update refreshes the LOCAL LIST of available packages and their versions from configured repositories — it does NOT actually install/upgrade anything. apt upgrade actually installs newer versions of already-installed packages, based on that refreshed list.",
  "detailedAnswer": "apt update contacts the configured software repositories, defined in /etc/apt/sources.list, and downloads the current index of available packages and their latest version numbers, storing this metadata locally; this is purely an information-refresh step, and no actual software on the system changes as a result.\n\napt upgrade then uses that freshly refreshed metadata to compare against what's currently installed, and downloads and installs newer versions of any already-installed packages that have updates available. This two-step separation is easy for beginners to misunderstand; running apt upgrade without first running apt update will only upgrade based on potentially stale metadata.",
  "keyPoints": [
    "apt update: refreshes the local package list/metadata only — no actual software changes on the system",
    "apt upgrade: installs newer versions of currently-installed packages, based on that refreshed metadata",
    "Correct order matters: always apt update first, THEN apt upgrade, or upgrades may use stale version info"
  ],
  "commonMistakes": [
    "Running apt upgrade without first running apt update, missing newly available updates",
    "Assuming apt update itself installs or changes any software",
    "Not knowing where the repository sources are configured (/etc/apt/sources.list)"
  ],
  "followUpQuestions": [
    "What would happen if you ran apt upgrade without first running apt update?",
    "Where are the repository sources configured for apt?",
    "Does apt update change any installed software on the system?"
  ],
  "realWorldExample": "A sysadmin runs apt update && apt upgrade to first refresh the package index and then install all available updates for installed packages.",
  "codeExample": {
    "language": "Bash",
    "code": "sudo apt update\nsudo apt upgrade"
  },
  "interviewerExpectation": "The interviewer expects the candidate to clearly distinguish the metadata-refresh step from the actual package installation step and know the correct order.",
  "tags": ["Linux", "apt", "Package Management", "Interview"],
  "relatedTopics": ["apt vs yum vs dpkg", "System Administration", "Debian"],
  "references": ["Debian Documentation - debian.org"]
}
];
