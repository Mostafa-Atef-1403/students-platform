export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

// Generate subject-specific questions based on quiz/subject
const dataStructuresQuestions: Omit<QuizQuestion, 'id' | 'quizId'>[] = [
  { question: 'What is the time complexity of searching in a balanced BST?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1 },
  { question: 'Which data structure uses FIFO ordering?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1 },
  { question: 'What is the worst-case time complexity of QuickSort?', options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], correctAnswer: 2 },
  { question: 'Which traversal visits the root node first?', options: ['Inorder', 'Postorder', 'Preorder', 'Level-order'], correctAnswer: 2 },
  { question: 'A graph with no cycles is called a:', options: ['Complete graph', 'Tree', 'Multigraph', 'Bipartite graph'], correctAnswer: 1 },
  { question: 'What data structure is used in BFS?', options: ['Stack', 'Queue', 'Heap', 'Array'], correctAnswer: 1 },
  { question: 'The height of a complete binary tree with n nodes is:', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1 },
  { question: 'Which sorting algorithm is stable?', options: ['QuickSort', 'HeapSort', 'MergeSort', 'Selection Sort'], correctAnswer: 2 },
  { question: 'A priority queue is typically implemented using:', options: ['Array', 'Linked List', 'Heap', 'Stack'], correctAnswer: 2 },
  { question: 'What is the space complexity of DFS?', options: ['O(V)', 'O(E)', 'O(V+E)', 'O(1)'], correctAnswer: 0 },
  { question: 'Which is NOT a self-balancing BST?', options: ['AVL Tree', 'Red-Black Tree', 'Binary Search Tree', 'Splay Tree'], correctAnswer: 2 },
  { question: "Dijkstra's algorithm is used for:", options: ['Sorting', 'Shortest path', 'Spanning tree', 'Topological sort'], correctAnswer: 1 },
  { question: 'Hash tables have average-case lookup time of:', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctAnswer: 2 },
  { question: 'Which data structure is used for undo operations?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 1 },
  { question: 'A complete graph with n vertices has how many edges?', options: ['n', 'n-1', 'n(n-1)/2', '2n'], correctAnswer: 2 },
  { question: 'What is the best-case time complexity of Bubble Sort?', options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'], correctAnswer: 2 },
  { question: 'Which tree traversal gives sorted output for BST?', options: ['Preorder', 'Postorder', 'Inorder', 'Level-order'], correctAnswer: 2 },
  { question: "Kruskal's algorithm finds:", options: ['Shortest path', 'Minimum spanning tree', 'Maximum flow', 'Topological order'], correctAnswer: 1 },
  { question: 'A deque supports operations at:', options: ['Front only', 'Rear only', 'Both ends', 'Random positions'], correctAnswer: 2 },
  { question: 'The amortized time for dynamic array insertion is:', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctAnswer: 1 },
];

const databaseQuestions: Omit<QuizQuestion, 'id' | 'quizId'>[] = [
  { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'], correctAnswer: 0 },
  { question: 'Which SQL clause filters rows?', options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'], correctAnswer: 2 },
  { question: 'A primary key must be:', options: ['Nullable', 'Unique and not null', 'Auto-incremented', 'A string'], correctAnswer: 1 },
  { question: 'Which JOIN returns all rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correctAnswer: 3 },
  { question: 'What is normalization?', options: ['Adding redundancy', 'Reducing redundancy', 'Encrypting data', 'Indexing tables'], correctAnswer: 1 },
  { question: 'Which normal form eliminates transitive dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: 2 },
  { question: 'An index speeds up:', options: ['INSERT', 'DELETE', 'SELECT', 'UPDATE'], correctAnswer: 2 },
  { question: 'ACID stands for:', options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Integrity, Data', 'Atomic, Concurrent, Isolated, Durable', 'All Correct In Database'], correctAnswer: 0 },
  { question: 'Which aggregate function counts non-null values?', options: ['SUM()', 'COUNT(*)', 'COUNT(column)', 'AVG()'], correctAnswer: 2 },
  { question: 'A foreign key references:', options: ["Same table's column", "Another table's primary key", 'Any column', 'Index only'], correctAnswer: 1 },
  { question: 'GROUP BY is used with:', options: ['WHERE', 'Aggregate functions', 'ORDER BY', 'LIMIT'], correctAnswer: 1 },
  { question: 'Which is a DDL command?', options: ['SELECT', 'INSERT', 'CREATE TABLE', 'UPDATE'], correctAnswer: 2 },
  { question: 'A view is:', options: ['A physical table', 'A virtual table', 'An index', 'A stored procedure'], correctAnswer: 1 },
  { question: 'Which isolation level prevents dirty reads?', options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'], correctAnswer: 1 },
  { question: 'DELETE vs TRUNCATE: TRUNCATE is:', options: ['Slower', 'Logged row by row', 'Faster and resets identity', 'Rollback-able'], correctAnswer: 2 },
  { question: 'A deadlock occurs when:', options: ['Query is slow', 'Two transactions wait for each other', 'Index is missing', 'Table is locked'], correctAnswer: 1 },
  { question: 'Which SQL keyword removes duplicates?', options: ['UNIQUE', 'DISTINCT', 'FILTER', 'GROUP'], correctAnswer: 1 },
  { question: 'A subquery is:', options: ['A query within another query', 'A stored procedure', 'A trigger', 'A view'], correctAnswer: 0 },
  { question: 'Which type of relationship needs a junction table?', options: ['One-to-One', 'One-to-Many', 'Many-to-Many', 'Self-referencing'], correctAnswer: 2 },
  { question: 'HAVING filters:', options: ['Rows before grouping', 'Groups after GROUP BY', 'Columns', 'Tables'], correctAnswer: 1 },
  { question: 'What does CASCADE do on DELETE?', options: ['Prevents deletion', 'Sets to NULL', 'Deletes related rows', 'Logs the action'], correctAnswer: 2 },
  { question: 'A clustered index determines:', options: ['Logical order', 'Physical order of data', 'Query plan', 'Join type'], correctAnswer: 1 },
  { question: 'Which is NOT a valid SQL data type?', options: ['VARCHAR', 'INTEGER', 'BOOLEAN', 'DICTIONARY'], correctAnswer: 3 },
  { question: 'A trigger fires:', options: ['Manually', 'Automatically on events', 'On schedule', 'On login'], correctAnswer: 1 },
  { question: 'UNION vs UNION ALL: UNION ALL:', options: ['Removes duplicates', 'Keeps duplicates', 'Is slower', 'Requires same columns'], correctAnswer: 1 },
];

const networkQuestions: Omit<QuizQuestion, 'id' | 'quizId'>[] = [
  { question: 'Which layer of the OSI model handles routing?', options: ['Data Link', 'Network', 'Transport', 'Session'], correctAnswer: 1 },
  { question: 'TCP is a:', options: ['Connectionless protocol', 'Connection-oriented protocol', 'Routing protocol', 'Application protocol'], correctAnswer: 1 },
  { question: 'Which protocol uses port 80?', options: ['FTP', 'SSH', 'HTTP', 'SMTP'], correctAnswer: 2 },
  { question: 'An IP address belongs to which OSI layer?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 2 },
  { question: 'DNS resolves:', options: ['IP to MAC', 'Domain to IP', 'Port to service', 'URL to file'], correctAnswer: 1 },
  { question: 'Which device operates at Layer 2?', options: ['Router', 'Switch', 'Hub', 'Firewall'], correctAnswer: 1 },
  { question: 'UDP is preferred for:', options: ['File transfer', 'Email', 'Video streaming', 'Web browsing'], correctAnswer: 2 },
  { question: 'What is the subnet mask for a /24 network?', options: ['255.255.0.0', '255.255.255.0', '255.255.255.128', '255.0.0.0'], correctAnswer: 1 },
  { question: 'ARP maps:', options: ['IP to MAC', 'MAC to IP', 'Domain to IP', 'Port to IP'], correctAnswer: 0 },
  { question: 'Which protocol is used for secure web browsing?', options: ['HTTP', 'FTP', 'HTTPS', 'TELNET'], correctAnswer: 2 },
  { question: 'A MAC address is how many bits?', options: ['32', '48', '64', '128'], correctAnswer: 1 },
  { question: 'Which layer handles encryption?', options: ['Network', 'Transport', 'Presentation', 'Application'], correctAnswer: 2 },
  { question: 'ICMP is used by:', options: ['HTTP', 'Ping', 'FTP', 'DNS'], correctAnswer: 1 },
  { question: 'NAT stands for:', options: ['Network Access Token', 'Network Address Translation', 'Node Authentication Type', 'None of the above'], correctAnswer: 1 },
  { question: 'Which topology has a single point of failure?', options: ['Mesh', 'Star', 'Ring', 'Bus'], correctAnswer: 1 },
  { question: 'The three-way handshake uses:', options: ['SYN, ACK, FIN', 'SYN, SYN-ACK, ACK', 'ACK, SYN, FIN', 'SYN, FIN, ACK'], correctAnswer: 1 },
  { question: 'Which is a private IP range?', options: ['8.8.8.0/24', '192.168.0.0/16', '172.32.0.0/16', '11.0.0.0/8'], correctAnswer: 1 },
  { question: 'DHCP provides:', options: ['DNS resolution', 'Automatic IP assignment', 'Routing', 'Encryption'], correctAnswer: 1 },
  { question: 'A VLAN operates at which layer?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 1 },
  { question: 'IPv6 addresses are how many bits?', options: ['32', '64', '128', '256'], correctAnswer: 2 },
];

const softwareEngQuestions: Omit<QuizQuestion, 'id' | 'quizId'>[] = [
  { question: 'Agile methodology emphasizes:', options: ['Comprehensive documentation', 'Iterative development', 'Big upfront design', 'Waterfall phases'], correctAnswer: 1 },
  { question: 'A sprint in Scrum typically lasts:', options: ['1 day', '1-4 weeks', '3 months', '6 months'], correctAnswer: 1 },
  { question: 'Who is responsible for the product backlog?', options: ['Scrum Master', 'Product Owner', 'Developer', 'Tester'], correctAnswer: 1 },
  { question: 'What is a user story?', options: ['A bug report', 'A feature from user perspective', 'A test case', 'A design document'], correctAnswer: 1 },
  { question: 'The daily standup should last:', options: ['1 hour', '30 minutes', '15 minutes or less', 'As long as needed'], correctAnswer: 2 },
  { question: 'CI/CD stands for:', options: ['Code Integration/Code Delivery', 'Continuous Integration/Continuous Delivery', 'Complete Integration/Complete Deployment', 'Central Integration/Central Delivery'], correctAnswer: 1 },
  { question: 'Which is NOT an Agile principle?', options: ['Working software over documentation', 'Customer collaboration', 'Following a rigid plan', 'Responding to change'], correctAnswer: 2 },
  { question: 'A retrospective happens:', options: ['Before sprint', 'During sprint', 'After sprint', 'Never'], correctAnswer: 2 },
  { question: 'Story points measure:', options: ['Time', 'Effort/complexity', 'Lines of code', 'Bug count'], correctAnswer: 1 },
  { question: 'Velocity in Scrum is:', options: ['Speed of typing', 'Story points completed per sprint', 'Number of bugs', 'Team size'], correctAnswer: 1 },
  { question: 'What is technical debt?', options: ['Server costs', 'Shortcuts that need future fixing', 'Team salary', 'License fees'], correctAnswer: 1 },
  { question: 'Kanban focuses on:', options: ['Sprints', 'Visualizing workflow', 'Documentation', 'Pair programming'], correctAnswer: 1 },
  { question: 'Code review helps with:', options: ['Billing', 'Quality and knowledge sharing', 'Deployment', 'Marketing'], correctAnswer: 1 },
  { question: 'DRY principle stands for:', options: ['Do Repeat Yourself', 'Don\'t Repeat Yourself', 'Data Recovery Yield', 'Deploy Run Yield'], correctAnswer: 1 },
  { question: 'SOLID is a set of:', options: ['Testing tools', 'Design principles', 'Programming languages', 'Database rules'], correctAnswer: 1 },
];

const mathQuestions: Omit<QuizQuestion, 'id' | 'quizId'>[] = [
  { question: 'A matrix with equal rows and columns is called:', options: ['Rectangular', 'Square', 'Diagonal', 'Scalar'], correctAnswer: 1 },
  { question: 'The determinant of an identity matrix is:', options: ['0', '1', '-1', 'Undefined'], correctAnswer: 1 },
  { question: 'If det(A) = 0, the matrix is:', options: ['Invertible', 'Singular', 'Orthogonal', 'Symmetric'], correctAnswer: 1 },
  { question: 'The transpose of a matrix swaps:', options: ['Values', 'Rows and columns', 'Determinants', 'Eigenvalues'], correctAnswer: 1 },
  { question: 'An eigenvalue satisfies:', options: ['Av = λv', 'A + v = λ', 'Av = 0', 'A = λI'], correctAnswer: 0 },
  { question: 'The rank of a matrix is:', options: ['Number of rows', 'Number of columns', 'Number of linearly independent rows', 'Trace'], correctAnswer: 2 },
  { question: 'Two vectors are orthogonal if their dot product is:', options: ['1', '-1', '0', 'Undefined'], correctAnswer: 2 },
  { question: 'The identity matrix has:', options: ['All zeros', 'All ones', '1s on diagonal, 0s elsewhere', 'Random values'], correctAnswer: 2 },
  { question: 'Matrix multiplication is:', options: ['Commutative', 'Not commutative', 'Always defined', 'Same as addition'], correctAnswer: 1 },
  { question: 'A 3×2 matrix multiplied by a 2×4 matrix gives:', options: ['3×4', '2×2', '3×2', '4×3'], correctAnswer: 0 },
  { question: 'The trace of a matrix is:', options: ['Sum of all elements', 'Sum of diagonal elements', 'Product of eigenvalues', 'Determinant'], correctAnswer: 1 },
  { question: 'Cramer\'s rule uses:', options: ['Inverses', 'Determinants', 'Eigenvalues', 'Transposes'], correctAnswer: 1 },
  { question: 'A symmetric matrix equals its:', options: ['Inverse', 'Transpose', 'Determinant', 'Eigenvalue'], correctAnswer: 1 },
  { question: 'The null space contains vectors where:', options: ['Av = v', 'Av = λv', 'Av = 0', 'A = 0'], correctAnswer: 2 },
  { question: 'An orthogonal matrix satisfies:', options: ['A² = I', 'AᵀA = I', 'A + Aᵀ = I', 'det(A) = 0'], correctAnswer: 1 },
  { question: 'Linear independence means:', options: ['Vectors are parallel', 'No vector is a combination of others', 'All vectors are zero', 'Vectors are equal'], correctAnswer: 1 },
  { question: 'The dimension of R³ is:', options: ['1', '2', '3', '9'], correctAnswer: 2 },
  { question: 'A basis for a vector space is:', options: ['Any set of vectors', 'Linearly independent spanning set', 'The largest set', 'A single vector'], correctAnswer: 1 },
  { question: 'Gaussian elimination produces:', options: ['Diagonal form', 'Row echelon form', 'Eigenvalues', 'Inverse'], correctAnswer: 1 },
  { question: 'The cross product of two vectors gives:', options: ['A scalar', 'A vector perpendicular to both', 'Zero always', 'A matrix'], correctAnswer: 1 },
  { question: 'det(AB) equals:', options: ['det(A) + det(B)', 'det(A) × det(B)', 'det(A) - det(B)', 'det(A)/det(B)'], correctAnswer: 1 },
  { question: 'A projection matrix P satisfies:', options: ['P² = I', 'P² = P', 'P = 0', 'P = I'], correctAnswer: 1 },
  { question: 'The span of vectors is:', options: ['Their dot product', 'Set of all linear combinations', 'Their cross product', 'A single point'], correctAnswer: 1 },
  { question: 'An invertible n×n matrix has rank:', options: ['0', 'n-1', 'n', '2n'], correctAnswer: 2 },
  { question: 'Diagonalization requires:', options: ['n linearly independent eigenvectors', 'det(A) = 0', 'A to be symmetric', 'All eigenvalues equal'], correctAnswer: 0 },
  { question: 'The column space of A is the range of:', options: ['Aᵀ', 'A', 'A⁻¹', 'det(A)'], correctAnswer: 1 },
  { question: 'Similar matrices have the same:', options: ['Elements', 'Eigenvalues', 'Rows', 'Columns'], correctAnswer: 1 },
  { question: 'LU decomposition factors A into:', options: ['Lower and Upper triangular', 'Left and Unitary', 'Linear and Uniform', 'Logarithmic and Unit'], correctAnswer: 0 },
  { question: 'The Gram-Schmidt process produces:', options: ['Eigenvalues', 'Orthonormal basis', 'Determinant', 'Inverse'], correctAnswer: 1 },
  { question: 'If A is 4×3, the null space dimension is at most:', options: ['4', '3', '7', '12'], correctAnswer: 1 },
];

const questionBanks: Record<string, Omit<QuizQuestion, 'id' | 'quizId'>[]> = {
  cs301: dataStructuresQuestions,
  cs302: databaseQuestions,
  cs303: networkQuestions,
  cs304: softwareEngQuestions,
  math201: mathQuestions,
};

export function getQuestionsForQuiz(quizId: string, subjectId: string, count: number): QuizQuestion[] {
  const bank = questionBanks[subjectId] || dataStructuresQuestions;
  const selected = bank.slice(0, count);
  return selected.map((q, i) => ({
    ...q,
    id: `${quizId}-q${i + 1}`,
    quizId,
  }));
}
