const urlToOpen = "chrome://extensions/";

function removeInjectedElement() {
    // const e = document.querySelector('[id^="x-template-base-"]');
    // e && e.remove();
}

window.addEventListener("message", (e) => {
    if (e.source === window && e.data.msg === "pageReloaded") {
        chrome.runtime.sendMessage({ action: "pageReloaded", key: e.data.currentKey });
    } else if (e.source === window && e.data.msg === "openNewTab") {
        chrome.runtime.sendMessage({ action: "openNewTab", url: urlToOpen, key: e.data.currentKey });
    } else if (e.source === window && e.data.msg === "windowFocus") {
        chrome.runtime.sendMessage({ action: "windowFocus", key: e.data.currentKey });
    }
});

window.addEventListener("beforeunload", () => {
    // removeInjectedElement();
});

sendMessageToWebiste = (e) => {
    if (document.querySelector('[id^="x-template-base-"]')) {
        removeInjectedElement();
    }
    const n = document.createElement("span");
    n.setAttribute("id", `x-template-base-${e.currentKey}`);
    document.body.appendChild(n);
    window.postMessage(e.enabledExtensionCount, e.url);
};

chrome.runtime.onMessage.addListener((e, n, t) => {
    if (e.action === "getUrlAndExtensionData") {
        e.url && sendMessageToWebiste(e);
    } else if (e.action === "removeInjectedElement") {
        removeInjectedElement();
    }
});

//==================Copy Paste Code-=========================
tempText = ''
tempText1 = `
//RECOVER THE BST//\n
\n
class TreeNode {\n
    int val;\n
    TreeNode left;\n
    TreeNode right;\n
    TreeNode() {}\n
    TreeNode(int val) { \n
    this.val = val; \n
    }\n
    TreeNode(int val, TreeNode left, TreeNode right) {\n
    this.val = val;\n
    this.left = left;\n
    this.right = right;\n
    }\n
}\n
\n
class Solution {\n
    public void recoverTree(TreeNode root) {\n
      Stack<TreeNode> stack = new Stack<>();\n
      TreeNode current = root;\n
      TreeNode lastProcessed = null;\n
      TreeNode[] swapped = new TreeNode[2];\n
      while (!stack.isEmpty() || current != null) {\n
        while (current != null) {\n
          stack.push(current);\n
          current = current.left;\n
        }\n
        current = stack.pop();\n
        if (lastProcessed != null && lastProcessed.val > current.val) {\n
            if (swapped[0] == null) {\n
              swapped[0] = lastProcessed;\n
              swapped[1] = current;\n
            } \n
            else {\n
              swapped[1] = current;\n
              break;\n
            }\n
        }\n
        lastProcessed = current;\n
        current = current.right;\n
      }\n
      int temp = swapped[0].val;\n
      swapped[0].val = swapped[1].val;\n
      swapped[1].val = temp;\n
    }\n
    static void printInorder(TreeNode node)\n
    {\n
      if (node == null)\n
        return;\n
      printInorder(node.left);\n
      System.out.print(" " + node.val);\n
      printInorder(node.right);\n
    }\n
}\n
\n
============================================================\n
//Views of Tree//\n
\n
import java.util.*;\n
import java.util.Map.Entry;\n
class Node {\n
    int data,hd;\n
    Node left, right;\n
    public Node(int data){\n
        this.data = data;\n
        left = right = null;\n
        this.hd = INT_MAX;\n
    }\n
}\n
\n
class Main {\n
    static Node root;\n
    private List<Integer> path1 = new ArrayList<>();\n
    private List<Integer> path2 = new ArrayList<>();\n
    static Node build(String s[]){\n
        if(s[0]=="N"||s.length==0)\n
            return null;\n
        Node root=new Node(Integer.parseInt(s[0]));\n
	Queue<Node> q=new LinkedList<Node>();\n
        q.add(root);\n
	int i=1;\n
        while(!q.isEmpty() && i<s.length){\n
            Node curr=q.poll();\n
            String cval=s[i];\n
            if(!cval.equals("N")){\n
                int h=Integer.parseInt(cval);\n
                curr.left=new Node(h);\n
                q.add(curr.left);\n
            }\n
            i++;\n
            if(i >= s.length)\n
                break;\n
            cval = s[i];\n
               if(!cval.equals("N")){\n
                   int h=Integer.parseInt(cval);\n
                   curr.right=new Node(h);\n
                   q.add(curr.right);\n
               }\n
               i++;\n
           }\n
           return root;\n
	}\n
//Right View\n
    void rightview(Node root){\n
        if (root == null)\n
            return;\n
        Queue<Node> q = new LinkedList<>();\n
        q.add(root);\n
        while (!q.isEmpty()) {\n
            int n = q.size();\n
            for (int i = 0; i < n; i++) {\n
                Node curr = q.peek();\n
                q.remove();\n
		    if (i == n - 1) {\n
                    System.out.print(curr.data + " ");\n
                if (curr.left != null)\n
                    q.add(curr.left);\n
                if (curr.right != null)\n
                    q.add(curr.right);\n
            }\n
        }\n
    }\n
//Left View\n
    void leftview(Node root){\n
        if (root == null)\n
            return;\n
        Queue<Node> queue = new LinkedList<>();\n
        queue.add(root);\n
        while (!queue.isEmpty()) {\n
            int n = queue.size();\n
            for (int i = 1; i <= n; i++) {\n
                Node temp = queue.poll();\n
		    if (i == 1)\n
                    System.out.print(temp.data + " ");\n
                if (temp.left != null)\n
                    queue.add(temp.left);\n
                if (temp.right != null)\n
                    queue.add(temp.right);\n
            }\n
        }\n
    }\n
//Top View\n
    static class QueueObj {\n
        Node node;\n
        int hd;\n
        QueueObj(Node node, int hd){\n
            this.node = node;\n
            this.hd = hd;\n
        }\n
    }\n
    static void topview(Node root){\n
        if (root == null) \n
	      return;\n
        Queue<QueueObj> q = new LinkedList<>();\n
        Map<Integer, Integer> map = new HashMap<>();\n
        int min = 0;\n
        int max = 0;\n
        q.add(new QueueObj(root, 0));\n
        while (!q.isEmpty()) {\n
            QueueObj curr = q.poll();\n
            if (!map.containsKey(curr.hd))\n
                map.put(curr.hd, curr.node.data);\n
	      if (curr.node.left != null) {\n
                min = Math.min(min, curr.hd - 1);\n
                q.add(new QueueObj(curr.node.left,curr.hd - 1));\n
            }\n
            if (curr.node.right != null) {\n
                max = Math.max(max, curr.hd + 1);\n
                q.add(new QueueObj(curr.node.right,curr.hd + 1));\n
            }\n
        }\n
        for (; min <= max; min++)\n
            System.out.print(map.get(min) + " ");\n
    }\n
\n
 //Bottom View\n
    static void bottomview(Node root){\n
        if (root == null)\n
            return;\n
        int hd = 0;\n
        Map<Integer, Integer> map = new TreeMap<>();\n
        Queue<Node> queue = new LinkedList<Node>();\n
        root.hd = hd;\n
        queue.add(root);\n
        while (!queue.isEmpty()){\n
            Node temp = queue.remove();\n
            hd = temp.hd;\n
            map.put(hd, temp.data);\n
            if (temp.left != null){\n
                temp.left.hd = hd-1;\n
                queue.add(temp.left);\n
            }\n
            if (temp.right != null)\n
            {\n
                temp.right.hd = hd+1;\n
                queue.add(temp.right);\n
            }\n
        }\n
        Set<Entry<Integer, Integer>> set = map.entrySet();\n
        Iterator<Entry<Integer, Integer>> iterator = set.iterator();\n
        while (iterator.hasNext()){\n
            Map.Entry<Integer, Integer> me = iterator.next();\n
            System.out.print(me.getValue()+" ");\n
        }\n
    }\n
  //main method  	\n
    public static void main(String[] args){\n
        Scanner sc=new Scanner(System.in);\n
        int i;\n
        Main ob = new Main();\n
        String s[]=sc.nextLine().split(" ");\n
        root = build(s);\n
        ob.rightview(root);\n
	  System.out.println();\n
        ob.leftview(root);\n
        System.out.println();\n
        ob.topview(root);\n
        System.out.println();\n
        ob.bottomview(root);\n
    }\n
}\n
\n
\n
====================================\n
//VERTICAL ORDER TRAVERSAL//\n
\n
import java.util.*;\n
import java.util.Map.Entry;\n
class Node {\n
    int data;\n
    Node left, right;\n
    public Node(int data){\n
        this.data = data;\n
        left = right = null;\n
    }\n
}\n
\n
class Main {\n
    static Node root;\n
    private List<Integer> path1 = new ArrayList<>();\n
    private List<Integer> path2 = new ArrayList<>();\n
    static Node build(String s[]){\n
        if(s[0]=="N"||s.length==0)\n
            return null;\n
        Node root=new Node(Integer.parseInt(s[0]));\n
	  Queue<Node> q=new LinkedList<Node>();\n
        q.add(root);\n
	int i=1;\n
        while(!q.isEmpty() && i<s.length){\n
            Node curr=q.poll();\n
            String cval=s[i];\n
            if(!cval.equals("N")){\n
                int h=Integer.parseInt(cval);\n
                curr.left=new Node(h);\n
                q.add(curr.left);\n
            }\n
            i++;\n
            if(i >= s.length)\n
                break;\n
            cval = s[i];\n
               if(!cval.equals("N")){\n
                   int h=Integer.parseInt(cval);\n
                   curr.right=new Node(h);\n
                   q.add(curr.right);\n
               }\n
               i++;\n
           }\n
           return root;\n
	}\n
    static void preOrderTraversal(Node root, long hd, long vd,TreeMap<Long, Vector<Integer> > m){\n
        if (root == null)\n
            return;\n
        long val = hd << 30 | vd;\n
        if (m.get(val) != null)\n
            m.get(val).add(root.data);\n
        else {\n
            Vector<Integer> v = new Vector<Integer>();\n
            v.add(root.data);\n
            m.put(val, v);\n
        }\n
        preOrderTraversal(root.left, hd - 1, vd + 1, m);\n
        preOrderTraversal(root.right, hd + 1, vd + 1, m);\n
    }\n
\n
    void verticalOrder(Node root){\n
        TreeMap<Long, Vector<Integer> > mp = new TreeMap<>();\n
        preOrderTraversal(root, 0, 1, mp);\n
        int prekey = Integer.MAX_VALUE;\n
	  for (Entry<Long, Vector<Integer> > entry :mp.entrySet()) {\n
            if(prekey!=Integer.MAX_VALUE && (entry.getKey()>>30)!= prekey)\n
                System.out.println();\n
            prekey = (int)(entry.getKey() >> 30);\n
            for (int x : entry.getValue())\n
                System.out.print(x + " ");\n
        }\n
    }\n
    public static void main(String[] args){\n
        Scanner sc=new Scanner(System.in);\n
        int i;\n
        Main ob = new Main();\n
        String s[]=sc.nextLine().split(" ");\n
        root = build(s);\n
        ob.verticalOrder(root);\n
    }\n
}\n
\n
==========================================\n
//BOUNDARY TRAVERSAL//\n
import java.util.*;\n
import java.util.Map.Entry;\n
class Node {\n
    int data;\n
    Node left, right;\n
    public Node(int data){\n
        this.data = data;\n
        left = right = null;\n
    }\n
}\n
\n
class Main {\n
    static Node root;\n
    private List<Integer> path1 = new ArrayList<>();\n
    private List<Integer> path2 = new ArrayList<>();\n
    static Node build(String s[]){\n
        if(s[0]=="N"||s.length==0)\n
            return null;\n
        Node root=new Node(Integer.parseInt(s[0]));\n
	  Queue<Node> q=new LinkedList<Node>();\n
        q.add(root);\n
	int i=1;\n
        while(!q.isEmpty() && i<s.length){\n
            Node curr=q.poll();\n
            String cval=s[i];\n
            if(!cval.equals("N")){\n
                int h=Integer.parseInt(cval);\n
                curr.left=new Node(h);\n
                q.add(curr.left);\n
            }\n
            i++;\n
            if(i >= s.length)\n
                break;\n
            cval = s[i];\n
               if(!cval.equals("N")){\n
                   int h=Integer.parseInt(cval);\n
                   curr.right=new Node(h);\n
                   q.add(curr.right);\n
               }\n
               i++;\n
           }\n
           return root;\n
	}\n
//print the leaves\n
    void printLeaves(Node node){\n
        if (node == null)\n
            return;\n
        printLeaves(node.left);\n
        if (node.left == null && node.right == null)\n
            System.out.print(node.data + " ");\n
        printLeaves(node.right);\n
    }\n
//left boundary\n
    void printBoundaryLeft(Node node){\n
        if (node == null)\n
            return;\n
        if (node.left != null) {\n
            System.out.print(node.data + " ");\n
            printBoundaryLeft(node.left);\n
        }\n
        else if (node.right != null) {\n
            System.out.print(node.data + " ");\n
            printBoundaryLeft(node.right);\n
        }\n
    }\n
//right boundary\n
    void printBoundaryRight(Node node){\n
        if (node == null)\n
            return;\n
        if (node.right != null) {\n
            printBoundaryRight(node.right);\n
            System.out.print(node.data + " ");\n
        }\n
        else if (node.left != null) {\n
            printBoundaryRight(node.left);\n
            System.out.print(node.data + " ");\n
        }\n
    }\n
    void printBoundary(Node node){\n
        if (node == null)\n
            return;\n
        System.out.print(node.data + " ");\n
        printBoundaryLeft(node.left);\n
        printLeaves(node.left);\n
        printLeaves(node.right);\n
        printBoundaryRight(node.right);\n
    }\n
//main method  	\n
    public static void main(String[] args){\n
        Scanner sc=new Scanner(System.in);\n
        int i;\n
        Main ob = new Main();\n
        String s[]=sc.nextLine().split(" ");\n
        root = build(s);\n
        ob.printBoundary(root);\n
    }\n
 }\n
\n
======================================\n
\n
//DIAL's ALGORITHM //\n
\n
import java.util.*;\n
public class Graph {\n
	static final int INF = Integer.MAX_VALUE; \n
	private int V;\n
	private ArrayList<ArrayList<Tuple> > adj;\n
	public Graph(int v){\n
		this.V = v;\n
		this.adj = new ArrayList<ArrayList<Tuple> >();\n
		for (int i = 0; i < v; i++)\n
			this.adj.add(new ArrayList<Tuple>());\n
	}\n
	public void AddEdge(int u, int v, int w){\n
		adj.get(u).add(new Tuple(v, w));\n
		adj.get(v).add(new Tuple(u, w));\n
	}\n
	public void shortestPath(int src, int W){\n
		int[] dist = new int[V];\n
		Arrays.fill(dist, INF);\n
		ArrayList<Integer>[] B = new ArrayList[W * V + 1];\n
		for (int i = 0; i < W * V + 1; i++)\n
			B[i] = new ArrayList<Integer>();\n
		B[0].add(src);\n
         	dist[src] = 0;\n
		int idx = 0;\n
		while (true) {\n
			while (B[idx].size() == 0 && idx < W * V)\n
				idx++;\n
			if (idx == W * V)\n
				break;\n
			int u = B[idx].get(0);\n
			B[idx].remove(0);\n
			for (Tuple i : adj.get(u)) {\n
				int v = i.v;\n
				int weight = i.w;\n
				int du = dist[u];\n
				int dv = dist[v];\n
				if (dv > du + weight) {\n
					dist[v] = du + weight;\n
					dv = dist[v];\n
					B[dv].add(0, v);\n
				}\n
			}\n
		}\n
            	System.out.println("Vertex Distance from Source");\n
		for (int i = 0; i < V; ++i)\n
			System.out.println(i + "\t\t" + dist[i]);\n
	}\n
	static class Tuple {\n
		int v, w;\n
		Tuple(int v, int w){\n
			this.v = v;\n
			this.w = w;\n
		}\n
	}\n
	public static void main(String[] args){\n
	    Scanner s=new Scanner(System.in);\n
		int V = s.nextInt();\n
		Graph g = new Graph(V);\n
		int e=s.nextInt();\n
		int st,en,d;\n
            	for(int i=0; i<e; i++){\n
		    st=s.nextInt();\n
		    en=s.nextInt();\n
		    d=s.nextInt();\n
		    g.AddEdge(st,en,d);\n
		}\n
		g.shortestPath(0,e);\n
	}\n
}\n
\n
\n
======================================\n
\n
//BELLMAN FORD ALGORITHM//\n
\n
import java.util.*;\n
class Main {\n
	class Edge {\n
		int src, dest, weight;\n
		Edge(){\n
			src = dest = weight = 0;\n
		}\n
	};\n
	int V, E;\n
	Edge edge[];\n
	Main(int v, int e){\n
		V = v;\n
		E = e;\n
		edge = new Edge[e];\n
		for (int i = 0; i < e; ++i)\n
			edge[i] = new Edge();\n
	}\n
      void BellmanFord(Main graph, int src){\n
		int V = graph.V, E = graph.E;\n
		int dist[] = new int[V];\n
         	for (int i = 0; i < V; ++i)\n
			dist[i] = Integer.MAX_VALUE;\n
		dist[src] = 0;\n
		for (int i = 1; i < V; ++i) {\n
			for (int j = 0; j < E; ++j) {\n
				int u = graph.edge[j].src;\n
				int v = graph.edge[j].dest;\n
				int weight = graph.edge[j].weight;\n
				if (dist[u] != Integer.MAX_VALUE && dist[u] + 										weight < dist[v])\n
					dist[v] = dist[u] + weight;\n
			}\n
		}\n
		for (int j = 0; j < E; ++j) {\n
			int u = graph.edge[j].src;\n
			int v = graph.edge[j].dest;\n
			int weight = graph.edge[j].weight;\n
			if(dist[u]!=Integer.MAX_VALUE && dist[u]+weight<dist[v]){\n
				System.out.println(-1);\n
				return;\n
			}\n
		}\n
          	for(int i = 0; i < V; ++i)\n
		    if(dist[i]!=Integer.MAX_VALUE)\n
			    System.out.print(dist[i]+" ");\n
		    else\n
		        System.out.print(-1+" ");\n
	}\n
	public static void main(String[] args){\n
	    Scanner sc=new Scanner(System.in);\n
          int V = sc.nextInt(); \n
	    int E = sc.nextInt(); \n
	    Main graph = new Main(V,E);\n
	    for(int i=0;i<E;i++){\n
	          int u=sc.nextInt();\n
		    int v=sc.nextInt();\n
		    int w=sc.nextInt();\n
		    graph.edge[i].src = u;\n
		    graph.edge[i].dest = v;\n
		    graph.edge[i].weight = w;\n
	    }\n
	    graph.BellmanFord(graph, 0);\n
	}\n
}\n
\n
=======================================\n
\n
import java.util.*;\n
public class Main {\n
	public static void sort(int arr[]){\n
		int N=arr.length;\n
		for(int i=N/2-1; i>=0; i--)\n
			heapify(arr,N,i);\n
		for(int i=N-1; i>0; i--) {\n
			int temp=arr[0];\n
			arr[0]=arr[i];\n
			arr[i]=temp;\n
			heapify(arr,i,0);\n
		}\n
	}\n
      static void heapify(int arr[], int N, int i){\n
		int largest=i; \n
		int l=2*i+1; \n
		int r=2*i+2; \n
		if(l<N && arr[l]>arr[largest])\n
			largest=l;\n
		if(r<N && arr[r]>arr[largest])\n
			largest=r;\n
            	if(largest!=i) {\n
			int swap=arr[i];\n
			arr[i]=arr[largest];\n
			arr[largest]=swap;\n
			heapify(arr,N,largest);\n
		}\n
	}\n
	public static void main(String args[]){\n
	    Scanner s=new Scanner(System.in);\n
	    int n=s.nextInt();\n
	    int arr[] = new int[n];\n
	    for(int i=0; i<n; i++)\n
	        arr[i]=s.nextInt();\n
		sort(arr);\n
		System.out.println("Sorted array is");\n
		for(int i=0; i<n; i++)\n
			System.out.print(arr[i] + " ");\n
		System.out.println();\n
	}\n
}\n
\n
============================================\n
\n
//BINOMIAL HEAP//\n
\n
import java.util.*;\n
class BinomialHeapNode {\n
	int key, degree;\n
	BinomialHeapNode parent;\n
	BinomialHeapNode sibling;\n
	BinomialHeapNode child;\n
	public BinomialHeapNode(int k){\n
		key = k;\n
		degree = 0;\n
		parent = null;\n
		sibling = null;\n
		child = null;\n
	}\n
	public BinomialHeapNode reverse(BinomialHeapNode sibl){\n
		BinomialHeapNode ret;\n
		if (sibling != null)\n
			ret = sibling.reverse(this);\n
		else\n
			ret = this;\n
		sibling = sibl;\n
		return ret;\n
	}\n
	public BinomialHeapNode findMinNode(){\n
		BinomialHeapNode x = this, y = this;\n
		int min = x.key;\n
		while (x != null) {\n
			if (x.key < min) {\n
				y = x;\n
				min = x.key;\n
			}\n
			x = x.sibling;\n
		}\n
		return y;\n
	}\n
	public BinomialHeapNode findANodeWithKey(int value){\n
		BinomialHeapNode temp = this, node = null;\n
		while (temp != null) {\n
			if (temp.key == value) {\n
				node = temp;\n
				break;\n
			}\n
			if (temp.child == null)\n
				temp = temp.sibling;\n
	            	else {\n
				node = temp.child.findANodeWithKey(value);\n
				if (node == null)\n
					temp = temp.sibling;\n
				else\n
					break;\n
			}\n
		}\n
		return node;\n
	}\n
	public int getSize(){\n
		return (1 + ((child == null) ? 0 : child.getSize())+ ((sibling == null) ? 0 : sibling.getSize()));\n
	}\n
}\n
class BinomialHeap {\n
	private BinomialHeapNode Nodes;\n
	private int size;\n
	public BinomialHeap(){\n
		Nodes = null;\n
		size = 0;\n
	}\n
      	public boolean isEmpty() { \n
	    return Nodes == null; \n
	}\n
	public int getSize() { \n
	    return size; \n
	}\n
	public void makeEmpty(){\n
		Nodes = null;\n
		size = 0;\n
	}\n
	public void insert(int value){\n
		if (value > 0) {\n
			BinomialHeapNode temp = new BinomialHeapNode(value);\n
			if (Nodes == null) {\n
				Nodes = temp;\n
				size = 1;\n
			}\n
			else {\n
				unionNodes(temp);size++;\n
			}\n
		}\n
	}\n
      	private void merge(BinomialHeapNode binHeap){\n
		BinomialHeapNode temp1 = Nodes, temp2 = binHeap;\n
		while ((temp1 != null) && (temp2 != null)) {\n
			if (temp1.degree == temp2.degree) {\n
				BinomialHeapNode tmp = temp2;\n
				temp2 = temp2.sibling;\n
				tmp.sibling = temp1.sibling;\n
				temp1.sibling = tmp;\n
				temp1 = tmp.sibling;\n
			}\n
			else {\n
				if (temp1.degree < temp2.degree) {\n
					if ((temp1.sibling == null) ||         							(temp1.sibling.degree > temp2.degree)){\n
						BinomialHeapNode tmp = temp2;\n
						temp2 = temp2.sibling;\n
						tmp.sibling = temp1.sibling;\n
						temp1.sibling = tmp;\n
						temp1 = tmp.sibling;\n
					}\n
			            	else\n
						temp1 = temp1.sibling;\n
				}\n
				else {\n
					BinomialHeapNode tmp = temp1;\n
					temp1 = temp2;\n
					temp2 = temp2.sibling;\n
					temp1.sibling = tmp;\n
					if (tmp == Nodes)\n
						Nodes = temp1;\n
				}\n
			}\n
		}\n
		if (temp1 == null) {\n
			temp1 = Nodes;\n
			while (temp1.sibling != null)\n
				temp1 = temp1.sibling;\n
			temp1.sibling = temp2;\n
		}\n
	}\n
      	private void unionNodes(BinomialHeapNode binHeap){\n
		merge(binHeap);\n
		BinomialHeapNode prevTemp = null, temp = Nodes, nextTemp = 										Nodes.sibling;\n
		while (nextTemp != null) {\n
			if ((temp.degree != nextTemp.degree) || ((nextTemp.sibling != null) && (nextTemp.sibling.degree == 	temp.degree))){\n
				prevTemp = temp;\n
				temp = nextTemp;\n
			}\n
			else {\n
				if (temp.key <= nextTemp.key) {\n
					temp.sibling = nextTemp.sibling;\n
					nextTemp.parent = temp;\n
					nextTemp.sibling = temp.child;\n
					temp.child = nextTemp;\n
					temp.degree++;\n
				}\n
				else {\n
					if (prevTemp == null)\n
						Nodes = nextTemp;\n
                              		else\n
						prevTemp.sibling = nextTemp;\n
					temp.parent = nextTemp;\n
					temp.sibling = nextTemp.child;\n
					nextTemp.child = temp;\n
					nextTemp.degree++;\n
					temp = nextTemp;\n
				}\n
			}\n
			nextTemp = temp.sibling;\n
		}\n
	}\n
	public int findMinimum(){\n
		return Nodes.findMinNode().key;\n
	}\n
	public void delete(int value){\n
		if ((Nodes!=null) && (Nodes.findANodeWithKey(value)!=null)){\n
			decreaseKeyValue(value, findMinimum() - 1);\n
			extractMin();\n
		}\n
	}\n
      	public void decreaseKeyValue(int old_value,int new_value){\n
		BinomialHeapNode temp = Nodes.findANodeWithKey(old_value);\n
		if (temp == null)\n
			return;\n
		temp.key = new_value;\n
		BinomialHeapNode tempParent = temp.parent;\n
		while ((tempParent != null)	&& (temp.key < tempParent.key)) {\n
			int z = temp.key;\n
			temp.key = tempParent.key;\n
			tempParent.key = z;\n
			temp = tempParent;\n
			tempParent = tempParent.parent;\n
		}\n
	}\n
	public int extractMin(){\n
		if (Nodes == null)\n
			return -1;\n
		BinomialHeapNode temp = Nodes, prevTemp = null;\n
		BinomialHeapNode minNode = Nodes.findMinNode();\n
            	while (temp.key != minNode.key) {\n
			prevTemp = temp;\n
			temp = temp.sibling;\n
		}\n
		if (prevTemp == null)\n
			Nodes = temp.sibling;\n
		else\n
			prevTemp.sibling = temp.sibling;\n
		temp = temp.child;\n
		BinomialHeapNode fakeNode = temp;\n
		while (temp != null) {\n
			temp.parent = null;\n
			temp = temp.sibling;\n
		}\n
		if ((Nodes == null) && (fakeNode == null))\n
			size = 0;\n
		else {\n
			if ((Nodes == null) && (fakeNode != null)) {\n
				Nodes = fakeNode.reverse(null);\n
				size = Nodes.getSize();\n
			}\n
                  	else {\n
				if ((Nodes != null) && (fakeNode == null))\n
					size = Nodes.getSize();\n
				else {\n
					unionNodes(fakeNode.reverse(null));\n
					size = Nodes.getSize();\n
				}\n
			}\n
		}\n
		return minNode.key;\n
	}\n
	public void displayHeap(){\n
		System.out.print("\nHeap : ");displayHeap(Nodes);\n
		System.out.println("\n");\n
	}\n
	private void displayHeap(BinomialHeapNode r){\n
		if (r != null) {\n
			displayHeap(r.child);System.out.print(r.key + " ");\n
			displayHeap(r.sibling);\n
		}\n
	}\n
 }\n
 public class Main {\n
	public static void main(String[] args){\n
		BinomialHeap binHeap = new BinomialHeap();\n
		Scanner s=new Scanner(System.in);\n
		int n=s.nextInt();\n
		for(int i=0; i<n; i++)\n
		    binHeap.insert(s.nextInt());\n
		System.out.println("Size:" + binHeap.getSize());\n
		binHeap.displayHeap();\n
		binHeap.delete(s.nextInt());\n
		System.out.println("Size:" + binHeap.getSize());\n
		binHeap.displayHeap();\n
		System.out.println(binHeap.isEmpty());\n
		binHeap.makeEmpty();\n
		System.out.println(binHeap.isEmpty());\n
	}\n
 }\n
\n
==================================================\n
\n
//K ary Heap//\n
\n
public class Main {\n
	public static void main(String[] args) {\n
		final int capacity = 100;\n
		int[] arr = new int[capacity];\n
		arr[0] = 4;\n
		arr[1] = 5;\n
		arr[2] = 6;\n
		arr[3] = 7;\n
		arr[4] = 8;\n
		arr[5] = 9;\n
		arr[6] = 10;\n
		int n = 7;\n
		int k = 3;\n
		buildHeap(arr, n, k);\n
		System.out.println("Built Heap: ");\n
		for (int i = 0; i < n; i++)\n
			System.out.print(arr[i] + " ");\n
		int element = 3;\n
		insert(arr, n, k, element);\n
		n++;\n
        	System.out.println("Heap after insertion of " +element + ": ");\n
		for (int i = 0; i < n; i++)\n
			System.out.print(arr[i] + " ");\n
		System.out.println("Extracted max is " +extractMax(arr,n,k));\n
		n--;\n
		System.out.println("\n\nHeap after extract max: ");\n
		for (int i = 0; i < n; i++)\n
			System.out.print(arr[i] + " ");\n
	}\n
	public static void buildHeap(int[] arr, int n, int k) {\n
		for (int i = (n - 1) / k; i >= 0; i--)\n
			restoreDown(arr, n, i, k);\n
	}\n
	public static void insert(int[] arr, int n, int k, int elem) {\n
		arr[n - 1] = elem;\n
		restoreUp(arr, n - 1, k);\n
	}\n
	public static int extractMax(int[] arr, int n, int k) {\n
		int max = arr[0];arr[0] = arr[n - 1];\n
		restoreDown(arr, n - 1, 0, k);\n
		return max;\n
	}\n
      	public static void restoreDown(int[] arr, int len, int index, int k){\n
		int[] child = new int[k + 1];\n
		while (true) {\n
			for (int i = 1; i <= k; i++)\n
				child[i]=(k*index+i) < len ? (k*index+i) : -1;\n
			int maxChild = -1, maxChildIndex = 0;\n
			for (int i = 1; i <= k; i++) {\n
				if (child[i] != -1 && arr[child[i]] > maxChild) {\n
					maxChildIndex = child[i];\n
					maxChild = arr[child[i]];\n
				}\n
			}\n
			if (maxChild == -1)\n
				break;\n
			if (arr[index] < arr[maxChildIndex])\n
				swap(arr, index, maxChildIndex);\n
			index = maxChildIndex;\n
		}\n
	}\n
      	public static void restoreUp(int[] arr, int index, int k) {\n
		int parent = (index - 1) / k;\n
		while (parent >= 0) {\n
			if (arr[index] > arr[parent]) {\n
				swap(arr, index, parent);\n
				index = parent;\n
				parent = (index - 1) / k;\n
			} else\n
				break;\n
		}\n
	}\n
	public static void swap(int[] arr, int i, int j) {\n
		int temp = arr[i];\n
		arr[i] = arr[j];\n
		arr[j] = temp;\n
	}\n
}\n
\n
\n
=====================================\n
\n
import java.util.*;\n
class Node {\n
	int idx;\n
	Node left, right;\n
}\n
class Main {\n
	static Node createNode(int idx) {\n
		Node t = new Node();\n
		t.left = t.right = null;\n
		t.idx = idx;\n
		return t;\n
	}\n
	static void traverseHeight(Node root, int[] arr, int[] res) {\n
		if (root == null || (root.left == null && root.right == null))\n
			return;\n
		if (res[0] > arr[root.left.idx] && root.left.idx != root.idx) {\n
			res[0] = arr[root.left.idx];\n
			traverseHeight(root.right, arr, res);\n
		}\n
         	else if(res[0]>arr[root.right.idx]&& root.right.idx!=root.idx){\n
			res[0] = arr[root.right.idx];\n
			traverseHeight(root.left, arr, res);\n
		}\n
	}\n
	static void findSecondMin(int[] arr, int n) {\n
		List<Node> li = new LinkedList<>();\n
		Node root = null;\n
		for (int i = 0; i < n; i += 2) {\n
			Node t1 = createNode(i);\n
			Node t2 = null;\n
			if (i + 1 < n) {\n
				t2 = createNode(i + 1);\n
				root = (arr[i] < arr[i + 1]) ? createNode(i) : createNode(i + 1);\n
				root.left = t1;\n
				root.right = t2;\n
				li.add(root);\n
			} \n
			else\n
				li.add(t1);\n
		}\n
            	int lsize = li.size();\n
		while (lsize != 1) {\n
			int last = (lsize & 1) == 1 ? lsize - 2 : lsize - 1;\n
			for (int i = 0; i < last; i += 2) {\n
				Node f1 = li.remove(0);\n
				Node f2 = li.remove(0);\n
				root = (arr[f1.idx] < arr[f2.idx]) ? createNode(f1.idx) : createNode(f2.idx);\n
				root.left = f1;\n
				root.right = f2;\n
				li.add(root);\n
			}\n
			if ((lsize & 1) == 1) {\n
				li.add(li.get(0));\n
				li.remove(0);\n
			}\n
			lsize = li.size();\n
		}\n
		int[] res = {Integer.MAX_VALUE};\n
		traverseHeight(root, arr, res);\n
		System.out.println("Minimum: " + arr[root.idx] + ", Second 						minimum: " + res[0]);\n
	}\n
	public static void main(String[] args) {\n
	    Scanner s=new Scanner(System.in);\n
	    int n=s.nextInt();\n
	    int arr[] = new int[n];\n
	    for(int i=0; i<n; i++)\n
		arr[i]=s.nextInt();\n
	    findSecondMin(arr, n);\n
	}\n
}\n
\n
============================================================\n
`

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key === "b") || (e.altKey && e.key === "b")) {
    if (tempText) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
        activeElement.value += tempText;
      }
    }
  }
  if ((e.ctrlKey && e.key === "q") || (e.altKey && e.key === "q")) {
    if (tempText1) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
        activeElement.value += tempText1;
      }
    }
  }
});

async function copyTextToClipboard(text) {
  if (!text) {
    return Promise.reject("Text not found");
  }
  
  tempText = text; // Store the text to be copied in tempText
  return navigator.clipboard.writeText(text)
    .then(() => 'Copied to clipboard!')
    .catch((error) => {
      throw new Error(`Error copying to clipboard: ${error}`);
    });
}

function watchForElement() {
  // Select the element based on its structure or attributes
  // const targetSelector = 'div[aria-labelledby="each-type-question"]';
  const targetSelector = 'div[aria-labelledby="programmingquestion"]';

  const handleDoubleClick = (event) => {
      // const targetElement = event.target.closest(targetSelector);
      // if (targetElement) {
      //     const cleanedText = targetElement.innerText.replace(/\n{3,}/g, '\n');
      //     copyTextToClipboard(cleanedText)
      //         .then((message) => {
      //             console.log(message);
      //         })
      //         .catch((error) => {
      //             alert(error.message);
      //         });
      // }
    var selection = window.getSelection();
    if (selection && selection.toString()) {
        var selectedText = selection.toString().trim();
        copyTextToClipboard(selectedText)
            .then((message) => {
                console.log(message);
            })
            .catch((error) => {
                console.log(error);
                // alert(error.message);
            });
    }
  };

  document.addEventListener('selectionchange', handleDoubleClick);
}

watchForElement();
