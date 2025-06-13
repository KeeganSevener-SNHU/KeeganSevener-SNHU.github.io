//============================================================================
// Name        : BinarySearchTree.cpp
// Author      : Keegan Sevener
// Version     : 1.0
// Copyright   : Copyright © 2023 SNHU COCE
// Description : Lab 5-2 Binary Search Tree
//============================================================================

#include <iostream>
#include <time.h>

#include "CSVparser.hpp"

using namespace std;

//============================================================================
// Global definitions visible to all methods and classes
//============================================================================

// forward declarations
double strToDouble(string str, char ch);

// define a structure to hold bid information
struct Bid {
    string bidId; // unique identifier
    string title;
    string fund;
    double amount;
    Bid() {
        amount = 0.0;
    }
};

// Internal structure for tree node
struct Node {
    Bid bid;
    Node *left;
    Node *right;

    // default constructor
    Node() {
        left = nullptr;
        right = nullptr;
    }

    // initialize with a bid
    Node(Bid aBid) :
            Node() {
        bid = aBid;
        left = nullptr;
        right = nullptr;
    }
};

//============================================================================
// Binary Search Tree class definition
//============================================================================

/**
 * Define a class containing data members and methods to
 * implement a binary search tree
 */
class BinarySearchTree {

private:
    Node* root;

    void addNode(Node* node, Bid bid);
    void inOrder(Node* node);
    void postOrder(Node* node);
    void preOrder(Node* node);
    Node* removeNode(Node* node, string bidId);

public:
    BinarySearchTree();
    virtual ~BinarySearchTree();
    void InOrder();
    void PostOrder();
    void PreOrder();
    void Insert(Bid bid);
    void Remove(string bidId);
    Bid Search(string bidId);
};

/**
 * Default constructor
 */
BinarySearchTree::BinarySearchTree() {
    // (1): initialize housekeeping variables 
    root = nullptr;
}

/**
 * Destructor
 */
BinarySearchTree::~BinarySearchTree() {
    // (2):  BST Destructor
        
    // Loop deletes entire tree.
    while (root != nullptr) {
        cout << root->bid.bidId << ": " << root->bid.title << " | " << root->bid.amount << " | "
            << root->bid.fund << endl;
        root = removeNode(root, root->bid.bidId);
    }
}

/**
 * Traverse the tree in order
 */
void BinarySearchTree::InOrder() {
    // (3a): Call in order and pass root
    inOrder(root);
}

/**
 * Traverse the tree in post-order
 */
void BinarySearchTree::PostOrder() {
    // (4a): Call post order and pass root
    postOrder(root);
}

/**
 * Traverse the tree in pre-order
 */
void BinarySearchTree::PreOrder() {
    // (5a): Call pre order and pass root
    preOrder(root);
}



/**
 * Insert a bid
 */
void BinarySearchTree::Insert(Bid bid) {
    // (6a) Inserts a bid into the tree
    
    // Create root if none exists.
    if (root == nullptr) {
        Node* newNode = new Node(bid);
        root = newNode;

    }

    // Call addNode function and pass node with bid if there is already a root.
    else {
        addNode(root, bid);
    }

}

/**
 * Remove a bid
 */
void BinarySearchTree::Remove(string bidId) {
    // (7a) Removes a bid from the tree
    // Call removeNode and pass root node and bidID
    this->removeNode(root, bidId);
}

/**
 * Search for a bid
 */
Bid BinarySearchTree::Search(string bidId) {
    // (8) Searches the tree for a bid and returns it
    // Create null bid to return if no bid is found.
    Bid bid;
    
    // Set current node equal to root node.
    Node* currNode = root;

    // While loop searchs for bid.
    while (currNode != nullptr) {

        // If bid is equal, return that bid.
        if (currNode->bid.bidId == bidId) {
            bid = currNode->bid;
            break;
        }
        // If bid is less than current bid ID move left.
        else if (stoi(currNode->bid.bidId) > stoi(bidId)) {
            currNode = currNode->left;
        }
        // Bid is greater, move right.
        else {
            currNode = currNode->right;
        }

    }
    // Return bid.
    return bid;
}

/**
 * Add a bid to some node (recursive)
 *
 * @param node Current node in tree
 * @param bid Bid to be added
 */
void BinarySearchTree::addNode(Node* node, Bid bid) {
    //  (6b) Creates a node for the new bid and inserts into the tree 

    
    // Check if the bid is smaller than the current node's bid.
    if (stoi(bid.bidId) < stoi(node->bid.bidId)) {
        
        if (node->left == nullptr) {
            Node* newNode = new Node(bid);
            node->left = newNode;
        }
        
        // Recursive call to find the proper bid position.
        else {
            addNode(node->left, bid);
        }
    }
    
    // The bid is larger than the node's bidId
    else {
        
        if (node->right == nullptr) {
            Node* newNode = new Node(bid);
            node->right = newNode;
        }
        // Recursive call to find the proper bid position.
        else {
            addNode(node->right, bid);
        }
    }
}

void BinarySearchTree::inOrder(Node* node) {
      // (3b): Prints all bids in order.
    // NULL check to see if we reached the end of the tree
    if (node == nullptr) {
        return;
    }

    inOrder(node->left);
    cout << node->bid.bidId << ": " << node->bid.title << " | " << node->bid.amount << " | "
        << node->bid.fund << endl;
    inOrder(node->right);

}
void BinarySearchTree::postOrder(Node* node) {
      // (4b): Prints all bids in post order fashion.

    // NULL check to see if we reached the end of the tree
    if (node == nullptr) {
        return;
    }
    // Traverse left tree.
    postOrder(node->left);
    // Traverse right tree.
    postOrder(node->right);
    // Output current bid.
    cout << node->bid.bidId << ": " << node->bid.title << " | " << node->bid.amount << " | "
        << node->bid.fund << endl;
}

void BinarySearchTree::preOrder(Node* node) {
      // (5b): Prints all bids in pre order fashion.

    // NULL check to see if we reached the end of the tree
    if (node == nullptr) {
        return;
    }

    // Output current bid.
    cout << node->bid.bidId << ": " << node->bid.title << " | " << node->bid.amount << " | "
        << node->bid.fund << endl;
    // Traverse left tree.
    postOrder(node->left);
    // Traverse right tree.
    postOrder(node->right);
}

/**
 * Remove a bid from some node (recursive)
 */
Node* BinarySearchTree::removeNode(Node* node, string bidId) {
    // (7b) Removes a bid from the tree and adjusts the pointers accordingly.

    // Base case. The node is null
    if (node == nullptr) {
        return node;
    }

    // Checck if bid ID is less than or greater and make the appropriate recursive call.
    if (stoi(bidId) < stoi(node->bid.bidId)) {
        node->left = removeNode(node->left, bidId);
    }
    else if (stoi(bidId) > stoi(node->bid.bidId)) {
        node->right = removeNode(node->right, bidId);
    }

    // If the bid matches the current node.
    else { //(node->bid.bidId == bidId) 

        // If this is a leaf.
        if (node->left == nullptr && node->right == nullptr) {
            delete node;
            node = nullptr;
        }
        // If only a left child.
        else if (node->right == nullptr && node->left != nullptr) {
            Node* temp = node;
            node = node->left;
            delete temp;
        }
        // If only a right child.
        else if (node->right != nullptr && node->left == nullptr) {
            Node* temp = node;
            node = node->right;
            delete temp;
        }

        // There are two children.
        else  {
            Node* temp = node->right;

            // While loop finds lowest value in right subtree.
            while (temp->left != nullptr) {
                temp = temp->left;
            }
            // assign node with temp's value.
            node->bid = temp->bid;
            // Recursive call removes temp.
            node->right = removeNode(node->right, temp->bid.bidId);
        }
    }
    return node;
}



//============================================================================
// Static methods used for testing
//============================================================================

/**
 * Display the bid information to the console (std::out)
 *
 * @param bid struct containing the bid info
 */
void displayBid(Bid bid) {
    cout << bid.bidId << ": " << bid.title << " | " << bid.amount << " | "
            << bid.fund << endl;
    return;
}

/**
 * Load a CSV file containing bids into a container
 *
 * @param csvPath the path to the CSV file to load
 * @return a container holding all the bids read
 */
void loadBids(string csvPath, BinarySearchTree* bst) {
    cout << "Loading CSV file " << csvPath << endl;

    // initialize the CSV Parser using the given path
    csv::Parser file = csv::Parser(csvPath);

    // read and display header row - optional
    vector<string> header = file.getHeader();
    for (auto const& c : header) {
        cout << c << " | ";
    }
    cout << "" << endl;

    try {
        // loop to read rows of a CSV file
        for (unsigned int i = 0; i < file.rowCount(); i++) {

            // Create a data structure and add to the collection of bids
            Bid bid;
            bid.bidId = file[i][1];
            bid.title = file[i][0];
            bid.fund = file[i][8];
            bid.amount = strToDouble(file[i][4], '$');

            //cout << "Item: " << bid.title << ", Fund: " << bid.fund << ", Amount: " << bid.amount << endl;

            // push this bid to the end
            bst->Insert(bid);
        }
    } catch (csv::Error &e) {
        std::cerr << e.what() << std::endl;
    }
}

/**
 * Simple C function to convert a string to a double
 * after stripping out unwanted char
 *
 * credit: http://stackoverflow.com/a/24875936
 *
 * @param ch The character to strip out
 */
double strToDouble(string str, char ch) {
    str.erase(remove(str.begin(), str.end(), ch), str.end());
    return atof(str.c_str());
}

/**
 * The one and only main() method
 */
int main(int argc, char* argv[]) {

    // process command line arguments
    string csvPath, bidKey;
    switch (argc) {
    case 2:
        csvPath = argv[1];
        bidKey = "98223";
        break;
    case 3:
        csvPath = argv[1];
        bidKey = argv[2];
        break;
    default:
        csvPath = "CS 300 eBid_Monthly_Sales.csv";
        bidKey = "97990"; // 98223
    }

    // Define a timer variable
    clock_t ticks;

    // Define a binary search tree to hold all bids
    BinarySearchTree* bst;
    bst = new BinarySearchTree();
    Bid bid;

    int choice = 0;
    while (choice != 9) {
        cout << "Menu:" << endl;
        cout << "  1. Load Bids" << endl;
        cout << "  2. Display All Bids" << endl;
        cout << "  3. Find Bid" << endl;
        cout << "  4. Remove Bid" << endl;
        cout << "  9. Exit" << endl;
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {

        case 1:
            
            // Initialize a timer variable before loading bids
            ticks = clock();

            // Complete the method call to load the bids
            loadBids(csvPath, bst);

            //cout << bst->Size() << " bids read" << endl;

            // Calculate elapsed time and display result
            ticks = clock() - ticks; // current clock ticks minus starting clock ticks
            cout << "time: " << ticks << " clock ticks" << endl;
            cout << "time: " << ticks * 1.0 / CLOCKS_PER_SEC << " seconds" << endl;
            break;

        case 2:
            bst->InOrder();
            break;

        case 3:
            ticks = clock();

            bid = bst->Search(bidKey);

            ticks = clock() - ticks; // current clock ticks minus starting clock ticks

            if (!bid.bidId.empty()) {
                displayBid(bid);
            } else {
            	cout << "Bid Id " << bidKey << " not found." << endl;
            }

            cout << "time: " << ticks << " clock ticks" << endl;
            cout << "time: " << ticks * 1.0 / CLOCKS_PER_SEC << " seconds" << endl;

            break;

        case 4:
            bst->Remove(bidKey);
            break;
        }
    }

    cout << "Good bye." << endl;

	return 0;
}
