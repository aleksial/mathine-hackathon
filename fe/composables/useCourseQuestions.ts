/* filepath: fe/composables/useCourseQuestions.ts */
export interface Course {
  id: string
  name: string
  description: string
}

export interface CourseQuestion {
  id: string
  courseId: string
  category: string
  question: string
  placeholder: string
  followUp?: string[]
  subQuestions?: SubQuestion[]
}

export interface SubQuestion {
  id: string
  title: string
  description: string
  quizTopics?: string[]
}

export const availableCourses: Course[] = [
  {
    id: "CSC225",
    name: "CSC 225 - Algorithms and Data Structures I",
    description: "Create quizzes on basic algorithms, data structures, complexity analysis, sorting, searching, and fundamental algorithm design techniques."
  },
  {
    id: "CSC226",
    name: "CSC 226 - Algorithms and Data Structures II", 
    description: "Generate assessments on advanced algorithms, dynamic programming, graph algorithms, network flows, and mathematical foundations."
  },
  {
    id: "CSC320",
    name: "CSC 320 - Foundations of Computer Science",
    description: "Design quizzes covering formal models, automata theory, computability, complexity theory, and theoretical foundations."
  },
  {
    id: "CSC360",
    name: "CSC 360 - Operating Systems",
    description: "Build assessments on OS concepts, process management, memory management, file systems, and system programming."
  }
]

export const courseQuestions: CourseQuestion[] = [
  // CSC225 Questions - Professor perspective
  {
    id: "csc225_foundations",
    courseId: "CSC225",
    category: "Algorithm Analysis & Complexity",
    question: "Generate quiz questions on algorithm analysis fundamentals",
    placeholder: "Specify quiz focus: Big O notation, proof techniques, complexity bounds...",
    followUp: [
      "Create Big O notation problems",
      "Generate algorithm correctness proofs",
      "Design complexity analysis exercises"
    ],
    subQuestions: [
      { 
        id: "complexity_analysis", 
        title: "Time & Space Complexity", 
        description: "Quiz on Big O, Omega, Theta notation and analysis techniques",
        quizTopics: ["Big O notation problems", "Complexity comparisons", "Worst-case analysis", "Best-case scenarios"]
      },
      { 
        id: "proof_techniques", 
        title: "Algorithm Correctness", 
        description: "Assessment on mathematical proofs for algorithm verification",
        quizTopics: ["Loop invariants", "Induction proofs", "Contradiction proofs", "Direct proofs"]
      },
      { 
        id: "ram_model", 
        title: "Computational Models", 
        description: "Questions on computational assumptions and models",
        quizTopics: ["RAM model properties", "Cost models", "Machine operations", "Memory hierarchy"]
      },
      { 
        id: "bounds", 
        title: "Upper & Lower Bounds", 
        description: "Problems on algorithmic bounds and optimality",
        quizTopics: ["Tight bounds", "Lower bound proofs", "Optimal algorithms", "Bound comparisons"]
      }
    ]
  },
  {
    id: "csc225_basic_structures",
    courseId: "CSC225",
    category: "Fundamental Data Structures",
    question: "Create assessments on basic data structure concepts",
    placeholder: "Focus areas: implementations, operations, complexity, applications...",
    followUp: [
      "Design implementation problems",
      "Create operation complexity questions",
      "Generate application scenarios"
    ],
    subQuestions: [
      { 
        id: "stacks", 
        title: "Stack Data Structure", 
        description: "Quiz on stack operations, implementations, and applications",
        quizTopics: ["Stack operations", "Array vs linked implementation", "Expression evaluation", "Function call stack"]
      },
      { 
        id: "queues", 
        title: "Queue Data Structure", 
        description: "Assessment on queue variants and applications",
        quizTopics: ["FIFO operations", "Circular queues", "Priority queues", "Deque operations"]
      },
      { 
        id: "linked_lists", 
        title: "Linked List Structures", 
        description: "Problems on linked list implementations and operations",
        quizTopics: ["Singly linked lists", "Doubly linked lists", "Insertion/deletion", "Traversal algorithms"]
      },
      { 
        id: "arrays", 
        title: "Array Structures", 
        description: "Questions on array operations and dynamic arrays",
        quizTopics: ["Static arrays", "Dynamic resizing", "2D arrays", "Array algorithms"]
      }
    ]
  },
  {
    id: "csc225_sorting",
    courseId: "CSC225", 
    category: "Sorting Algorithms",
    question: "Generate sorting algorithm quiz questions",
    placeholder: "Topics: algorithm steps, complexity, comparisons, implementations...",
    followUp: [
      "Create algorithm tracing problems",
      "Design complexity comparison questions",
      "Generate implementation exercises"
    ],
    subQuestions: [
      { 
        id: "elementary_sorts", 
        title: "Elementary Sorting", 
        description: "Quiz on basic sorting algorithms and their analysis",
        quizTopics: ["Bubble sort steps", "Selection sort analysis", "Insertion sort complexity", "Algorithm comparisons"]
      },
      { 
        id: "mergesort", 
        title: "Merge Sort", 
        description: "Assessment on divide-and-conquer sorting",
        quizTopics: ["Merge algorithm", "Recursion analysis", "Space complexity", "Stability properties"]
      },
      { 
        id: "quicksort", 
        title: "Quick Sort", 
        description: "Problems on partition-based sorting",
        quizTopics: ["Partition algorithm", "Pivot selection", "Best/worst cases", "Randomized quicksort"]
      },
      { 
        id: "heapsort", 
        title: "Heap Sort", 
        description: "Questions on heap-based sorting algorithm",
        quizTopics: ["Heapify operations", "Build heap process", "Sort extraction", "In-place sorting"]
      }
    ]
  },

  // Continue with other CSC225 categories...
  {
    id: "csc225_priority_queues",
    courseId: "CSC225",
    category: "Priority Queues & Heaps",
    question: "Create quiz questions on heap structures and priority queues",
    placeholder: "Focus: heap properties, operations, applications, complexity...",
    followUp: [
      "Design heap construction problems",
      "Create priority queue scenarios",
      "Generate operation complexity questions"
    ],
    subQuestions: [
      { 
        id: "binary_heaps", 
        title: "Binary Heap Properties", 
        description: "Quiz on heap structure and properties",
        quizTopics: ["Max heap property", "Min heap property", "Complete binary tree", "Array representation"]
      },
      { 
        id: "heap_operations", 
        title: "Heap Operations", 
        description: "Assessment on heap manipulation algorithms",
        quizTopics: ["Insert operation", "Extract max/min", "Heapify process", "Build heap algorithm"]
      },
      { 
        id: "priority_queue_apps", 
        title: "Priority Queue Applications", 
        description: "Problems on priority queue use cases",
        quizTopics: ["Dijkstra's algorithm", "Task scheduling", "Event simulation", "Huffman coding"]
      }
    ]
  },

  {
    id: "csc225_searching",
    courseId: "CSC225",
    category: "Search Algorithms & Trees",
    question: "Generate questions on search structures and algorithms",
    placeholder: "Areas: BST operations, balanced trees, hash tables, search complexity...",
    followUp: [
      "Create BST operation problems",
      "Design hash table scenarios",
      "Generate search complexity questions"
    ],
    subQuestions: [
      { 
        id: "binary_search_trees", 
        title: "Binary Search Trees", 
        description: "Quiz on BST properties and operations",
        quizTopics: ["BST property", "Search algorithm", "Insert/delete operations", "Tree traversals"]
      },
      { 
        id: "balanced_trees", 
        title: "Balanced Search Trees", 
        description: "Assessment on self-balancing tree structures",
        quizTopics: ["AVL trees", "Red-Black trees", "Rotation operations", "Balance factors"]
      },
      { 
        id: "hash_tables", 
        title: "Hash Tables", 
        description: "Problems on hashing techniques and collision resolution",
        quizTopics: ["Hash functions", "Collision resolution", "Load factor", "Probing techniques"]
      }
    ]
  },

  {
    id: "csc225_graphs",
    courseId: "CSC225",
    category: "Graph Algorithms",
    question: "Create graph algorithm and representation quizzes",
    placeholder: "Topics: graph representations, traversals, topological sort, applications...",
    followUp: [
      "Design graph traversal problems",
      "Create topological sort exercises",
      "Generate graph representation questions"
    ],
    subQuestions: [
      { 
        id: "graph_representations", 
        title: "Graph Representations", 
        description: "Quiz on different ways to represent graphs",
        quizTopics: ["Adjacency matrix", "Adjacency list", "Edge list", "Space complexity comparison"]
      },
      { 
        id: "graph_traversals", 
        title: "Graph Traversal Algorithms", 
        description: "Assessment on DFS and BFS algorithms",
        quizTopics: ["DFS algorithm", "BFS algorithm", "Traversal trees", "Applications"]
      },
      { 
        id: "topological_sort", 
        title: "Topological Sorting", 
        description: "Problems on ordering vertices in DAGs",
        quizTopics: ["Topological order", "DFS-based algorithm", "Kahn's algorithm", "Cycle detection"]
      }
    ]
  },

  {
    id: "csc225_greedy",
    courseId: "CSC225",
    category: "Greedy Algorithm Design",
    question: "Generate greedy algorithm quiz questions",
    placeholder: "Focus: greedy strategy, correctness proofs, classic problems...",
    followUp: [
      "Create greedy strategy problems",
      "Design correctness proof exercises",
      "Generate application scenarios"
    ],
    subQuestions: [
      { 
        id: "greedy_strategy", 
        title: "Greedy Algorithm Strategy", 
        description: "Quiz on greedy choice property and optimal substructure",
        quizTopics: ["Greedy choice property", "Optimal substructure", "When greedy works", "Counterexamples"]
      },
      { 
        id: "activity_selection", 
        title: "Activity Selection Problem", 
        description: "Assessment on classic greedy algorithm example",
        quizTopics: ["Problem formulation", "Greedy solution", "Correctness proof", "Algorithm implementation"]
      },
      { 
        id: "huffman_coding", 
        title: "Huffman Coding Algorithm", 
        description: "Problems on greedy compression algorithm",
        quizTopics: ["Huffman tree construction", "Encoding/decoding", "Optimality proof", "Applications"]
      }
    ]
  },

  {
    id: "csc225_backtracking",
    courseId: "CSC225",
    category: "Backtracking Algorithms",
    question: "Create backtracking algorithm assessments",
    placeholder: "Topics: backtracking strategy, pruning, classic problems, optimization...",
    followUp: [
      "Design backtracking implementation problems",
      "Create pruning optimization questions",
      "Generate complexity analysis exercises"
    ],
    subQuestions: [
      { 
        id: "backtracking_strategy", 
        title: "Backtracking Strategy", 
        description: "Quiz on systematic search and decision trees",
        quizTopics: ["Decision tree exploration", "Backtracking mechanism", "Solution space", "Branch pruning"]
      },
      { 
        id: "n_queens", 
        title: "N-Queens Problem", 
        description: "Assessment on classic backtracking example",
        quizTopics: ["Problem constraints", "Solution representation", "Pruning conditions", "Complexity analysis"]
      },
      { 
        id: "subset_sum", 
        title: "Subset Sum Problem", 
        description: "Problems on combinatorial backtracking",
        quizTopics: ["Problem formulation", "Recursive solution", "Dynamic programming comparison", "Optimization techniques"]
      }
    ]
  },

  {
    id: "csc225_divide_conquer",
    courseId: "CSC225",
    category: "Divide & Conquer Algorithms",
    question: "Generate divide and conquer algorithm quizzes",
    placeholder: "Areas: strategy, recurrences, master theorem, examples...",
    followUp: [
      "Create recurrence analysis problems",
      "Design master theorem applications",
      "Generate algorithm examples"
    ],
    subQuestions: [
      { 
        id: "dc_strategy", 
        title: "Divide & Conquer Strategy", 
        description: "Quiz on problem decomposition methodology",
        quizTopics: ["Problem division", "Subproblem solving", "Solution combination", "Base cases"]
      },
      { 
        id: "recurrence_relations", 
        title: "Recurrence Relations", 
        description: "Assessment on analyzing recursive algorithms",
        quizTopics: ["Recurrence formulation", "Substitution method", "Recursion trees", "Solving techniques"]
      },
      { 
        id: "master_theorem", 
        title: "Master Theorem", 
        description: "Problems on divide-and-conquer recurrence solving",
        quizTopics: ["Master theorem cases", "Theorem application", "Complexity determination", "Limitation cases"]
      }
    ]
  },

  // CSC360 OS Questions - Professor perspective
  {
    id: "csc360_os_structures",
    courseId: "CSC360",
    category: "Operating System Architecture",
    question: "Create quizzes on OS design and structure concepts",
    placeholder: "Focus: system components, kernel design, system calls, services...",
    followUp: [
      "Design system architecture problems",
      "Create kernel design questions",
      "Generate system call exercises"
    ],
    subQuestions: [
      { 
        id: "os_components", 
        title: "OS Components & Services", 
        description: "Quiz on operating system components and their roles",
        quizTopics: ["Kernel functions", "System programs", "Device drivers", "OS services"]
      },
      { 
        id: "system_calls", 
        title: "System Call Interface", 
        description: "Assessment on user-kernel interface mechanisms",
        quizTopics: ["System call types", "Parameter passing", "API vs ABI", "Library functions"]
      },
      { 
        id: "kernel_design", 
        title: "Kernel Design Approaches", 
        description: "Problems on different kernel architectures",
        quizTopics: ["Monolithic kernels", "Microkernels", "Hybrid kernels", "Performance trade-offs"]
      }
    ]
  },

  {
    id: "csc360_processes_threads",
    courseId: "CSC360",
    category: "Process & Thread Management",
    question: "Generate process and threading concept quizzes",
    placeholder: "Topics: process states, thread models, IPC, context switching...",
    followUp: [
      "Create process lifecycle problems",
      "Design threading model questions",
      "Generate IPC mechanism exercises"
    ],
    subQuestions: [
      { 
        id: "process_concept", 
        title: "Process Concepts", 
        description: "Quiz on process definition and lifecycle",
        quizTopics: ["Process states", "Process control block", "Process creation", "Process termination"]
      },
      { 
        id: "thread_models", 
        title: "Threading Models", 
        description: "Assessment on different threading implementations",
        quizTopics: ["User-level threads", "Kernel-level threads", "Many-to-many model", "Thread benefits"]
      },
      { 
        id: "ipc_mechanisms", 
        title: "Inter-Process Communication", 
        description: "Problems on process communication methods",
        quizTopics: ["Shared memory", "Message passing", "Pipes", "Synchronization primitives"]
      }
    ]
  },

  {
    id: "csc360_scheduling",
    courseId: "CSC360",
    category: "CPU Scheduling Algorithms",
    question: "Create CPU scheduling algorithm assessments",
    placeholder: "Areas: scheduling policies, performance metrics, real-time scheduling...",
    followUp: [
      "Design scheduling algorithm problems",
      "Create performance calculation exercises",
      "Generate real-time scenario questions"
    ],
    subQuestions: [
      { 
        id: "scheduling_algorithms", 
        title: "Scheduling Algorithms", 
        description: "Quiz on various CPU scheduling policies",
        quizTopics: ["FCFS scheduling", "SJF scheduling", "Round-robin", "Priority scheduling"]
      },
      { 
        id: "scheduling_metrics", 
        title: "Performance Metrics", 
        description: "Assessment on scheduling performance evaluation",
        quizTopics: ["Turnaround time", "Waiting time", "Response time", "Throughput"]
      },
      { 
        id: "real_time_scheduling", 
        title: "Real-Time Scheduling", 
        description: "Problems on real-time system scheduling",
        quizTopics: ["Rate monotonic", "Earliest deadline first", "Schedulability analysis", "Hard vs soft deadlines"]
      }
    ]
  },

  {
    id: "csc360_memory_management",
    courseId: "CSC360",
    category: "Memory Management Systems",
    question: "Generate memory management quiz questions",
    placeholder: "Topics: paging, segmentation, virtual memory, allocation strategies...",
    followUp: [
      "Create paging mechanism problems",
      "Design virtual memory exercises",
      "Generate allocation algorithm questions"
    ],
    subQuestions: [
      { 
        id: "paging_systems", 
        title: "Paging Mechanisms", 
        description: "Quiz on paging implementation and management",
        quizTopics: ["Page tables", "Address translation", "TLB management", "Multi-level paging"]
      },
      { 
        id: "virtual_memory", 
        title: "Virtual Memory Systems", 
        description: "Assessment on virtual memory concepts and implementation",
        quizTopics: ["Demand paging", "Page faults", "Working set model", "Thrashing"]
      },
      { 
        id: "page_replacement", 
        title: "Page Replacement Algorithms", 
        description: "Problems on page replacement strategies",
        quizTopics: ["FIFO algorithm", "LRU algorithm", "Optimal algorithm", "Clock algorithm"]
      }
    ]
  },

  {
    id: "csc360_file_systems",
    courseId: "CSC360",
    category: "File System Design",
    question: "Create file system concept and implementation quizzes",
    placeholder: "Focus: file allocation, directory structures, consistency, performance...",
    followUp: [
      "Design file allocation problems",
      "Create directory structure questions",
      "Generate consistency mechanism exercises"
    ],
    subQuestions: [
      { 
        id: "file_allocation", 
        title: "File Allocation Methods", 
        description: "Quiz on different file storage strategies",
        quizTopics: ["Contiguous allocation", "Linked allocation", "Indexed allocation", "Trade-offs analysis"]
      },
      { 
        id: "directory_structures", 
        title: "Directory Implementation", 
        description: "Assessment on directory organization methods",
        quizTopics: ["Linear directory", "Hash table directory", "B-tree directory", "Directory operations"]
      },
      { 
        id: "file_consistency", 
        title: "File System Consistency", 
        description: "Problems on maintaining file system integrity",
        quizTopics: ["Journaling", "Copy-on-write", "Checksums", "Recovery mechanisms"]
      }
    ]
  }

  // Add more categories for CSC226 and CSC320 following the same pattern...
]

export const getCourseQuestions = (courseId: string): CourseQuestion[] => {
  return courseQuestions.filter(q => q.courseId === courseId)
}

export const getCourseById = (courseId: string): Course | undefined => {
  return availableCourses.find(c => c.id === courseId)
}