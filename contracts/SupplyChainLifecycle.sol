pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Producer.sol";
import "./Retailer.sol";
import "./Distributor.sol";

/**
 * @title SupplyChainLifecycle
 * @dev Deals with product life cycle statuses for all the parties involved.
 */
contract SupplyChainLifecycle is Producer, Retailer, Distributor {

    enum Status { 
        PRODUCED, 
        READY_FOR_PICKUP, 
        PICKED_UP, 
        SHIPMENT_RELEASED, 
        RECEIVED_SHIPMENT, 
        READY_FOR_SALE, 
        PAID,
        SOLD 
    }

    //Define the product of this supply chain.
    struct Product {
        Status productStatus;
        address currentStatusUser;
        uint productId;
        string productName;
        string productDesc;
        uint productPrice;
        uint productQuantity;
        address producerAddress;
        address distributorAddress;
        address retailerAddresses;
        address consumerAddress;
    }

    Status constant initialStatus = Status.PRODUCED;
    uint productID;

    Product[] public products;

    //Define events to emit based on statuses, linked by the product ID.
    event Produced(uint productID);
    event ReadyForPickup(uint productID);
    event PickedUp(uint productID);
    event ShipmentReleased(uint productID);
    event ShipmentReceived(uint productID);
    event ReadyForSale(uint productID);
    event Paid(uint productID);
    event Sold(uint productID);

   constructor() public payable {
       productID = 0;
   }
}
