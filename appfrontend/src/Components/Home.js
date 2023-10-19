import React from "react";
import { Navigate } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";

import AddIcon from '@material-ui/icons/Add';

import { PRODUCT_STATUSES, STATUS_ACTIONS } from './enum/ProductStatusEnum';
import { USER_TYPES } from './enum/UsersEnum';

import ProductBatchForm from './ProductBatchForm';
import ProductDetails from './ProductDetails';
import PerformStatusAction from './PerformStatusAction';
import BatchTable from './BatchTable';
import ToastMessage from "./ToastMessage";
import TabPanel from "./TabPanel";
import ErrorBoundary from "./ErrorBoundary";

import { CircularPageLoader } from "./static/CircularPageLoader";

import "../css/App.css";

const cols = [
    { field: "productID", title: "Product ID", numeric: true, align: "left" },
    { field: "productName", title: "Product Name", numeric: false, align: "left" },
    { field: "productStatus", title: "Status", numeric: false, align: "left" },
    { field: "action", title: "Action", numeric: false, align: "center" },
    { field: "productDesc", title: "Additional Details", numeric: false, align: "center" },
];

/**
 * Renders the main page - Product Batches, for registered users.
 * Handles toggling child components and interacts with the contracts to fetch product details.
 * 
 * @author syuki
 */
export default class Home extends React.Component {

    state = {
        tabValue: 0,
        dataKey: null,
        showAddBatch: false,
        showConfirmAction: false,
        showBatchDetails: false,
        showLoader: false,
        productRow: null,
        actionState: null,
        productId: null,
        transactionSuccess: null,
        retailerDataKey: null,
        isAuthenticated: null,
        addressZero: "0x0000000000000000000000000000000000000000"
    };

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.SupplyChainLifecycle;
        const key = contract.methods.getAllProductDetails.cacheCall();
        this.setState({ dataKey: key });
    }

    getLifeCycleContract() {
        const { SupplyChainLifecycle } = this.props.drizzleState.contracts;
        return SupplyChainLifecycle;
    }

    disableActionButton(action) {
        let disable = false;
        if (action != null) {
            switch (action) {
                case STATUS_ACTIONS[7]:
                    disable = true;
                    break;
            }
        }
        return disable;
    }

    //Maps available actions based on product statuses for each user type.
    fetchProductStatusActions(productDetails) {
        let statusAction = STATUS_ACTIONS[productDetails["productStatus"]];
        if (this.props.userType == USER_TYPES[0]) {
            if (productDetails["productStatus"] > 0) {
                statusAction = STATUS_ACTIONS[7];
            }
        }
        if (this.props.userType == USER_TYPES[1]) {
            if (productDetails["productStatus"] == 2) {
                statusAction = STATUS_ACTIONS[5];
            }
            else if (productDetails["productStatus"] == 6
                && productDetails["retailerAddresses"] == this.state.addressZero) {
                statusAction = STATUS_ACTIONS[2];
            } else if (productDetails["productStatus"] > 2) {
                statusAction = STATUS_ACTIONS[7];
            }
        }
        if (this.props.userType == USER_TYPES[2]) {
            if (productDetails["productStatus"] == 4
                && productDetails["retailerAddresses"] != this.state.addressZero) {
                statusAction = STATUS_ACTIONS[5];
            } else if (productDetails["productStatus"] == 6
                && productDetails["retailerAddresses"] != this.state.addressZero) {
                statusAction = STATUS_ACTIONS[4];
            } else if (productDetails["productStatus"] == 5) {
                statusAction = STATUS_ACTIONS[6];
            } else if (productDetails["productStatus"] > 6) {
                statusAction = STATUS_ACTIONS[7];
            }
        }
        return statusAction;
    }
