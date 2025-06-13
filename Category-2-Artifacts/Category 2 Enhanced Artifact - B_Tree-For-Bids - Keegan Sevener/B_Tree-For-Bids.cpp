//=============================================================================
// Name        : B_Tree.cpp
// Author      : Keegan Sevener
// Date        : May 30, 2025
// Class       : SNHU CS499 Capstone
// Description : Category 2: B-tree for storing bid information
//=============================================================================
// 
// 
//=============================================================================
/******************************************************************************
* This artifact was originally a binary search tree, BST, but has been upgraded
* to a b tree. The time complexity is O(log n) on average, but can degrade to *
* O(n) depending on how data is inserted and on the amount of data added.     *
* B-trees are self-balancing and maintain a time complexity of O(log n).      *
* This makes the B-tree a more efficient choice for the 12k bids in the CSV.  *
******************************************************************************/
//=============================================================================

#include<iostream>
#include "CSVparser.hpp"

using namespace std;

//============================================================================
// Global definitions visible to all methods and classes
//============================================================================

// Forward declaration. This function is used for the CSV Parser.
double strToDouble(string str, char ch);

/**********************************************
 * Structure which holds the bid information. *
 *********************************************/
struct Bid {
    // Unique identifier that is used for sorting the tree.
    int bidId;
    string title;
    string fund;
    double amount;
    // Default constructor
    Bid() {
        bidId = -1;
        amount = 0.0;
    }
};


/******************************
 * Node struct for the B-Tree *
 *****************************/
struct Node {
    // An array to hold bids.
    Bid* nodeBids;
    // Array holds pointers to the child nodes.
    Node** childPtrs;
    // Adjustable degree and bid count
    int degree;
    int bidCnt;
    // Boolean for tracking leaves.
    bool isLeaf;

    // Default constructor for Node
    Node(int degree, bool leaf) {

        // Initialize degree and leaf check
        isLeaf = leaf;
        this->degree = degree;

        // Create bid array for pointer and set bidCnt to 0
        nodeBids = new Bid[2 * this->degree - 1];
        bidCnt = 0;

        // Create child pointer array
        childPtrs = new Node * [2 * this->degree];
    }
};


/*****************************************************************
 * Display function for printing the bid information to console. *
 ****************************************************************/
static void displayBid(Bid bid) {
    cout << bid.bidId << ": " << bid.title << " | " << bid.amount << " | "
        << bid.fund << endl;
    return;
}


//============================================================================
// B-Tree class definition
//============================================================================
/**********************************************************************
 * Class containing data members and methods for the B-tree structure *
 *********************************************************************/
class B_Tree {
    // Store root node and degree in the B Tree class.
    Node* root;
    int degree;

private:

    // Insert functions
    void addNode(Node* node, Bid bid);
    void insertNonFull(Node* node, Bid k);
    // Remove node function and its helper functions
    void removeBid(Node* node, int bidId);
    void removeLeaf(Node* node, int index);
    void removeNonLeaf(Node* node, int index);
    void splitChild(Node* node1, Node* node2, int index);
    Bid getPrior(Node* node, int index);
    Bid getNext(Node* node, int index);
    void fillNode(Node* node, int index);
    void mergeNodes(Node* node, int index);
    void takePrior(Node* node, int index);
    void takeNext(Node* node, int index);
    // Search function for finding bids
    Bid searchNodes(Node* node, int bidId);
    // Function to print the bids in order
    void inOrder(Node* node);

public:

    // Constructor (Initializes tree as empty)
    B_Tree(int degree);
    // Public functions for main to call
    void InOrder();
    void Insert(Bid bid);
    void Remove(int bidId);
    Bid Search(int bidId);

};

/******************************
 * B Tree Default constructor *
 *****************************/
B_Tree::B_Tree(int degree) {
    root = nullptr;
    this->degree = degree;
}


/********************************************************
 * Split function for splitting nodes within the B-Tree *
 *******************************************************/
void B_Tree::splitChild(Node* node1, Node* node2, int index) {


    // newNode will store degree - 1 of node2's bids
    Node* newNode = new Node(node2->degree, node2->isLeaf);
    newNode->bidCnt = degree - 1;

    // Copy node2's bids to the new node
    for (int i = 0; i < degree - 1; i++) {

        newNode->nodeBids[i] = node2->nodeBids[i + degree];
    }

    // If node2 is not a leaf, then copy the last pointer to newNode
    if (node2->isLeaf == false) {
        for (int i = 0; i < degree; i++) {

            newNode->childPtrs[i] = node2->childPtrs[i + degree];
        }
    }
    // Update the bid count for node2
    node2->bidCnt = degree - 1;



    // Move pointers right to make space for a new one
    for (int i = node1->bidCnt; i >= (index + 1); i--) {

        node1->childPtrs[i + 1] = node1->childPtrs[i];
    }
    // Set newNode as a child of node1
    node1->childPtrs[index + 1] = newNode;



    // Shift bids to the left in node1 to make space for mid bid of node2
    for (int i = node1->bidCnt - 1; i >= index; i--) {

        node1->nodeBids[i + 1] = node1->nodeBids[i];
    }

    // Add the mid of node2 to node1 and update node1's bid count;
    node1->nodeBids[index] = node2->nodeBids[degree - 1];
    node1->bidCnt += 1;
}


/*************************************************
 * Function fills a child node with too few bids *
 ************************************************/
void B_Tree::fillNode(Node* node, int index) {

    // If the prior child's bids are greater than degree, take from that one.
    if (index != 0 && node->childPtrs[index - 1]->bidCnt >= degree) {

        takePrior(node, index);
    }
    // Else if the next child node's bid count is higher than degree, take from the next one.
    else if (index != node->bidCnt && node->childPtrs[index + 1]->bidCnt >= degree) {

        takeNext(node, index);
    }


    // Determine which node to merge with
    else {
        if (index != node->bidCnt) {
            mergeNodes(node, index);
        }
        else {
            mergeNodes(node, index - 1);
        }
    }
    return;
}

/******************************************
 * Function to take bids from prior child *
 *****************************************/
void B_Tree::takePrior(Node* node, int index) {

    Node* child = node->childPtrs[index];
    // Sibling is the prior node
    Node* sibling = node->childPtrs[index - 1];

    // Shift bids right
    for (int i = child->bidCnt - 1; i >= 0; --i) {

        child->nodeBids[i + 1] = child->nodeBids[i];
    }

    // Shift child pointers right if child is not a leaf
    if (!child->isLeaf) {
        for (int i = child->bidCnt; i >= 0; --i) {

            child->childPtrs[i + 1] = child->childPtrs[i];
        }
    }
    // Assing child's first bid to the current nodes index-1
    child->nodeBids[0] = node->nodeBids[index - 1];



    // If child is not a leaf, give it the siblings last pointer
    if (!child->isLeaf) {

        child->childPtrs[0] = sibling->childPtrs[sibling->bidCnt];
    }
    // Take bid from sibling
    node->nodeBids[index - 1] = sibling->nodeBids[sibling->bidCnt - 1];


    // Update counters and return
    child->bidCnt += 1;
    sibling->bidCnt -= 1;
    return;
}

/***********************************************************************
* Function takes from the next child and places it in the one at index *
***********************************************************************/
void B_Tree::takeNext(Node* node, int index) {

    Node* child = node->childPtrs[index];
    // Sibling is the next node we take from
    Node* sibling = node->childPtrs[index + 1];

    // Move current node's bid to child
    child->nodeBids[(child->bidCnt)] = node->nodeBids[index];



    // IF child is not a leaf, then give it sibling's first pointer
    if (!(child->isLeaf)) {

        child->childPtrs[(child->bidCnt) + 1] = sibling->childPtrs[0];
    }
    // Move siblings first bid to current node
    node->nodeBids[index] = sibling->nodeBids[0];



    // Shift sibling's bids left
    for (int i = 1; i < sibling->bidCnt; ++i) {

        sibling->nodeBids[i - 1] = sibling->nodeBids[i];
    }
    // If sibling is not a leaf, then shift its pointers left as well
    if (!sibling->isLeaf) {
        for (int i = 1; i <= sibling->bidCnt; ++i) {

            sibling->childPtrs[i - 1] = sibling->childPtrs[i];
        }
    }
    // Update the counters and return
    child->bidCnt += 1;
    sibling->bidCnt -= 1;
    return;
}


/**************************************************
* Function merges two child ndoes of current node *
**************************************************/
void B_Tree::mergeNodes(Node* node, int index) {

    // Create child node pointers
    Node* child = node->childPtrs[index];
    Node* sibling = node->childPtrs[index + 1];
    // Move the bid from current node to child
    child->nodeBids[degree - 1] = node->nodeBids[index];


    // Move sibling's bids to child
    for (int i = 0; i < sibling->bidCnt; ++i) {

        child->nodeBids[i + degree] = sibling->nodeBids[i];
    }
    // Move siblings pointers to child
    if (!child->isLeaf) {
        for (int i = 0; i <= sibling->bidCnt; ++i) {

            child->childPtrs[i + degree] = sibling->childPtrs[i];
        }
    }



    // Shift current node's bids left
    for (int i = index + 1; i < node->bidCnt; ++i) {

        node->nodeBids[i - 1] = node->nodeBids[i];
    }
    // Shift the current node's pointers left
    for (int i = index + 2; i <= node->bidCnt; ++i) {

        node->childPtrs[i - 1] = node->childPtrs[i];
    }


    // Update counters and delete sibling since its bids and pointers were moved
    child->bidCnt += sibling->bidCnt + 1;
    node->bidCnt -= 1;
    delete(sibling);
    return;
}


/**********************************************
* Function for adding bids to none full nodes *
**********************************************/
void B_Tree::insertNonFull(Node* node, Bid bid) {
    // Set index to node's last bid
    int index = node->bidCnt - 1;

    // If this is a leaf node
    if (node->isLeaf == true) {
        // Shift the current nodes bids right and fidn the spot for new bid
        while (index >= 0 && node->nodeBids[index].bidId > bid.bidId) {

            node->nodeBids[index + 1] = node->nodeBids[index];
            index--;
        }
        node->nodeBids[index + 1] = bid;
        node->bidCnt = node->bidCnt + 1;
    }
    else {

        // Find a child to pass the bid to
        while (index >= 0 && node->nodeBids[index].bidId > bid.bidId) {
            index--;
        }

        // Split the child if it is full
        if (node->childPtrs[index + 1]->bidCnt == 2 * node->degree - 1) {

            splitChild(node, node->childPtrs[index + 1], index + 1);
            // Move the middle bid
            if (node->nodeBids[index + 1].bidId < bid.bidId) {
                index++;
            }
        }
        insertNonFull(node->childPtrs[index + 1], bid);
    }
}

/***************************************
* Function for adding bids to the tree *
***************************************/
void B_Tree::addNode(Node* node, Bid bid) {

    // Check if root is full
    if (root->bidCnt == 2 * degree - 1) {

        Node* newRoot = new Node(degree, false);

        // Make root child of newRoot and split
        newRoot->childPtrs[0] = root;
        splitChild(newRoot, root, 0);


        // Determine where to place the bid
        int i = 0;
        if (newRoot->nodeBids[0].bidId < bid.bidId) {
            i++;
        }

        // Insert and update the root node
        insertNonFull(newRoot->childPtrs[i], bid);
        root = newRoot;
    }
    else {
        insertNonFull(root, bid);
    }
}

/********************************************
 * Function for removing bids from the tree *
 *******************************************/
void B_Tree::removeBid(Node* node, int bidId) {

    // index of bid to find
    int index;
    // Find the an index that is equal to or greater than the provided bidId
    for (index = 0; index < node->bidCnt; ++index) {
        if (node->nodeBids[index].bidId >= bidId) {
            break;
        }
    }


    // If the bid  is in this node
    if (index < node->bidCnt && node->nodeBids[index].bidId == bidId) {
        // Call removeLeaf
        if (node->isLeaf) {
            removeLeaf(node, index);
        }
        // Else, call the non-leaf function.
        else {
            removeNonLeaf(node, index);
        }
    }



    // Else, check if the bid does not exist or if we need to keep searching.
    else {
        // If this node is a leaf node, then the key is not present in tree
        if (node->isLeaf) {

            std::cout << "\nBid " << bidId << " does not exist.\n\n";
            return;
        }


        // Check if the bid is indexed at the last position in the node
        bool isEqual;
        if ((index == node->bidCnt)) {
            isEqual = true;
        }
        else {
            isEqual = false;
        }
        // Fill the child node at index if it is less than the tree's degree.
        if (node->childPtrs[index]->bidCnt < degree) {
            fillNode(node, index);
        }


        // Make a recursive call on the appropriate branch
        if (isEqual && index > node->bidCnt) {

            removeBid(node->childPtrs[index - 1], bidId);
        }
        else {

            removeBid(node->childPtrs[index], bidId);
        }
    }
    return;
}

/**********************************************
 * Function to get a bid from the prior child *
 *********************************************/
Bid B_Tree::getPrior(Node* node, int index) {

    Node* currNode = node->childPtrs[index];

    // Keep moving right till a leaf is found and then return the last bid
    while (!currNode->isLeaf) {
        currNode = currNode->childPtrs[currNode->bidCnt];
    }
    return currNode->nodeBids[currNode->bidCnt - 1];
}
/*********************************************
 * Function to get a bid from the next child *
 ********************************************/
Bid B_Tree::getNext(Node* node, int index) {

    Node* currNode = node->childPtrs[index + 1];

    // Move left till a leaf is found and return the first bid
    while (!currNode->isLeaf) {
        currNode = currNode->childPtrs[0];
    }
    return currNode->nodeBids[0];
}




/**************************************
 * Function removes a bid from a leaf *
 *************************************/
void B_Tree::removeLeaf(Node* node, int index) {

    // Shift bids to the left
    for (int i = index + 1; i < node->bidCnt; ++i) {

        node->nodeBids[i - 1] = node->nodeBids[i];
    }

    // Confirm to user that the bid was removed.
    cout << "\nBid removal Successful\n\n";

    // Decrement bidCnt and return
    node->bidCnt -= 1;
    return;
}

/************************************************
 * Function removes a bid from an internal node *
 ***********************************************/
void B_Tree::removeNonLeaf(Node* node, int index) {

    Bid bid = node->nodeBids[index];

    // Determine which child node to take a bid from and make a recursive call
    // Get from prior child
    if (node->childPtrs[index]->bidCnt >= degree) {

        Bid prior = getPrior(node, index);
        node->nodeBids[index] = prior;

        removeBid(node->childPtrs[index], prior.bidId);
    }
    // Get from next child
    else if (node->childPtrs[index + 1]->bidCnt >= degree) {

        Bid next = getNext(node, index);
        node->nodeBids[index] = next;

        removeBid(node->childPtrs[index + 1], next.bidId);
    }



    else {
        // Merge nodes if both are too small.
        mergeNodes(node, index);
        // Then find bid to remove.
        removeBid(node->childPtrs[index], bid.bidId);
    }
    return;
}


/*************************************************
* Search function finds and returns a bid object *
*************************************************/
Bid B_Tree::searchNodes(Node* node, int bidId) {

    Bid bid = Bid();

    // Find a bid equal to or greater than the provided bidId
    int index = 0;
    for (index; index < node->bidCnt; index++) {

        if (bidId <= node->nodeBids[index].bidId) {
            break;
        }
    }
    // Return the bid if it is the one we're looking for
    if (node->nodeBids[index].bidId == bidId && index != node->bidCnt) {

        return node->nodeBids[index];
    }
    // Else, if not equal and this is a leaf, return an empty bid.
    else if (node->isLeaf == true) {
        return Bid();
    }


    return bid = searchNodes(node->childPtrs[index], bidId);
}


/*************************************************
 * Print function for printing the tree in order *
 ************************************************/
void B_Tree::inOrder(Node* node) {

    // If the node is a leaf.
    if (node->isLeaf) {
        // Print all bids in leaf.
        for (int i = 0; i < node->bidCnt; i++) {
            displayBid(node->nodeBids[i]);
        }
    }


    // Else, loop through children.
    else {

        int index = 0;
        // Loop ends when a leaf is found
        for (index; index < (node->bidCnt); ++index) {

            // Call inOrder until a leaf is found.
            if (!node->isLeaf) {
                inOrder(node->childPtrs[index]);
            }
            // Print current node's bid before moving to the next child.
            displayBid(node->nodeBids[index]);
        }
        // Visit the last child after loop.
        inOrder(node->childPtrs[index]);
    }
}

// ----------------------------------------------------------------------------------
// ---- Public B_Tree Functions which grab the root node from within the class. -----
// ----------------------------------------------------------------------------------
/*****************************************
 * Public function for printing the tree *
 ****************************************/
void B_Tree::InOrder() {

    if (root == nullptr) {
        cout << "No bids in tree\n";
        return;
    }

    // Call inOrder with root if root is not NULL
    inOrder(root);
}

/******************************
 * Traverse the tree in order *
 *****************************/
void B_Tree::Insert(Bid bid) {

    // Check if tree is empty
    if (root == nullptr) {

        // Create a new root node if one does not exist 
        // and insert the bid
        root = new Node(degree, true);
        root->nodeBids[0].bidId = bid.bidId;
        root->bidCnt = 1;
    }


    else {
        addNode(root, bid);
    }
}

/****************
 * Remove a bid *
 ***************/
void B_Tree::Remove(int bidId) {

    // NULL check the root.
    if (root == nullptr) {

        cout << "There are no bids in the tree\n";
        return;
    }

    // Pass root and bidId to removeBid
    removeBid(root, bidId);

    // Check if root is empty after removing the provided bid
    if (root->bidCnt == 0) {

        Node* rootPnter = root;

        // If root is a leaf, then set it to null because it is empty
        if (root->isLeaf) {
            root = nullptr;
        }

        // Else, set root to its first child
        else {
            root = root->childPtrs[0];
        }

        // Free the original root by calling delete
        delete rootPnter;
    }
    return;
}

/********************
 * Search for a bid *
 ********************/
Bid B_Tree::Search(int bidId) {

    // Create bid to return
    Bid bid = Bid();

    // NULL check the root
    if (root == nullptr) {
        cout << "No bids in tree.\n";
        return bid;
    }

    // Call searchNode
    return searchNodes(root, bidId);
}
// End of public B_Tree functions
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------


/*****************************************************
 * Simple C function to convert a string to a double *
 * after stripping out unwanted characters           *
 *                                                   *
 * credit: http://stackoverflow.com/a/24875936       *
 *                                                   *
 * @param ch The character to strip out              *
 ****************************************************/
double strToDouble(string str, char ch) {

    str.erase(remove(str.begin(), str.end(), ch), str.end());
    return atof(str.c_str());
}



/****************************************************
 * Load a CSV file containing bids into a container *
 *                                                  *
 * param csvPath is the path to the CSV file to load*
 * return a container holding all the bids read     *
 ***************************************************/
void loadBids(string csvPath, B_Tree* bTree) {
    std::cout << "Loading CSV file " << csvPath << endl;

    // initialize the CSV Parser using the given path
    csv::Parser file = csv::Parser(csvPath);

    // Read and display header row - optional
    vector<string> header = file.getHeader();
    for (auto const& c : header) {
        std::cout << c << " | ";
    }
    std::cout << "\n";



    try {
        // loop to read rows of a CSV file
        for (unsigned int i = 0; i < file.rowCount(); i++) {

            // Create a Bid object with bid data
            Bid bid;
            bid.bidId = stoi(file[i][1]);
            bid.title = file[i][0];
            bid.fund = file[i][8];
            bid.amount = strToDouble(file[i][4], '$');

            // push this bid to the end
            bTree->Insert(bid);
        }
    }
    catch (csv::Error& e) {
        std::cerr << e.what() << std::endl;
    }
    cout << "\nAll bids added to data structure!\n\n";
}



/************************************
 * Function for getting user input. *
 ***********************************/
int getUserInput() {

    int userNum;
    while (true) {

        // Get userInput and ensure it is an int
        if (!(cin >> userNum) || userNum < 0 || userNum > 99999) {

            // Inform the user if input is invalid
            cout << "Invalid input. Please provide an integer value between 0 and 99999\n";

            // Clear cin for safety
            cin.clear();
            cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            continue;
        }
        break;
    }
    // Clear the input buffer in case user enters too many characters
    cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    // Return user input
    return userNum;
}





/**********************
 * The main function. *
 *********************/
int main(int argc, char* argv[]) {

    // Define variables for bidKey search and csvPath.
    string csvPath;
    int bidKey = 98235;
    csvPath = "CS 300 eBid_Monthly_Sales_Dec_2016.csv";


    // Define a B-tree to hold all bids and initialize it
    B_Tree* bTree;
    bTree = new B_Tree(2);
    Bid bid = Bid();

    // Declare and initilize user input variable.
    int userNum = 0;


    while (userNum != 9) {
        cout << "Menu:" << endl;
        cout << "  1. Load Bids" << endl;
        cout << "  2. Display All Bids" << endl;
        cout << "  3. Find Bid" << endl;
        cout << "  4. Remove Bid" << endl;
        cout << "  9. Exit" << endl;
        cout << "Enter choice: ";


        // Call the getUserInput function for input from user.
        userNum = getUserInput();


        switch (userNum) {

        case 1:
            // Call method to load bids.
            loadBids(csvPath, bTree);

            break;


        case 2:
            bTree->InOrder();
            break;


        case 3:

            cout << "Please enter a bid ID: ";

            // Get user input.
            bidKey = getUserInput();

            // Find a bid by id
            bid = bTree->Search(bidKey);

            // Check if bid is empty and proivde appropriate response.
            if (bid.bidId != -1) {
                cout << "\n";
                displayBid(bid);
                cout << "\n";
            }
            else {
                cout << "\nBid Id " << bidKey << " does not exist.\n\n";
            }
            break;


        case 4:
            cout << "Please enter a bid ID: ";
            // Get user input.
            bidKey = getUserInput();

            // Call the remove function
            bTree->Remove(bidKey);
            break;


        case 9:
            cout << "Exiting program...\n";
            break;


        default:
            cout << "Not a valid command\n";
            break;
        }
    }

    cout << "\nGood bye." << endl;

    return 0;
}