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
    "relatedTopics": ["Knapsack Problem", "Huffman Coding", "Optimal Substructure"],
    "references": ["CLRS - Introduction to Algorithms"]
  }
];
