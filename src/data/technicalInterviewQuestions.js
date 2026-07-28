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
  }
];
