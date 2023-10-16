// SPDX-License-Identifier: MIT
// The above line specifies the license for this contract.

// This pragma statement defines the version of Solidity that the contract is compatible with.
// It allows versions greater than or equal to 0.4.21 and less than 0.9.0.
pragma solidity >=0.4.21 <0.9.0;

// Import the "Users.sol" contract to access its functions and data structures.
import "./Users.sol";

/**
 * @title Producer
 * @dev Handles producer functions.
 */
// This is the main contract named "Producer," which handles producer-related functions.
contract Producer {
   
    // Use the "Users" library for the "User" struct and its functions.
    using Users for Users.User;

    // Create a private instance of the "Users.User" struct to manage producers.
    Users.User private producers;

    // Function to add a new producer.
    function addProducer(address newProducer) public {
        // Check if the producer with the provided address already exists.
        require(!producers.isExistingUser(newProducer), "Producer with this address already exists!");
        
        // If the producer does not exist, add them to the list of producers.
        producers.addUser(newProducer);
    }

    /*
    * Function to check if the caller is a producer.
    */
    function isProducer() public view returns (bool) {
        // Check if the caller's address exists in the list of producers.
        return producers.isExistingUser(msg.sender);
    }
}
