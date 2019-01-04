import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
//import axios from 'axios';
//import withErrorHandler from '../../hoc/withErrorHander/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderDeets from '../../components/Order/OrderDeets/OrderDeets';

//renders past orders on the Orders page
class Orders extends Component {
    state = {
        show: false, 
    };

    //initializes the orders from the server
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    //sets the order props so a modal can be shown of the order details
    orderDetailsHandler = (order) => {
        this.props.onSetOrderId(order.order);
        this.setState({show:true});       
    }

    orderDeleteHandler (order) {
        console.log(Object.entries(this.props.orders['0'].order));       
    }

    closeModalHandler = () => {
        this.setState({show: false});
        this.props.onSetOrderId(0);
    }

    render () {
        let orderDeets = null;
        if (this.props.orderId) {
            orderDeets = <OrderDeets order={this.props.orderId}/>
        }
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = this.props.orders.map(order =>(
                <div>
                    <Order 
                    key={order.id}
                    ingredients={order.order.ingredients}
                    price = {+order.order.price}
                    orderDetails={()=>this.orderDetailsHandler(order)}
                    orderDelete={()=>this.orderDeleteHandler(order)}/>                        
                </div>
            ))
        };

        return (
            <div>
                <Modal show={this.state.show} modalClosed={this.closeModalHandler}>
                    {orderDeets}
                </Modal>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        orderId: state.order.orderId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onSetOrderId: (orderId) => dispatch(actions.setOrderId(orderId)),
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Orders);