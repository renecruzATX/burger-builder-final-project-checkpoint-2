import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
//import axios from 'axios';
//import withErrorHandler from '../../hoc/withErrorHander/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

//renders past orders on the Orders page
class Orders extends Component {
    state = {
        show: false, 
    };

    //initializes the orders from the server
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    orderDetailsHandler = (order) => {
        console.log(Object.entries(order.order));
        this.props.onSetOrderId(JSON.stringify(order.order, null, '\t'));
        this.setState({show:true});       
    }

    orderDeleteHandler (order) {
        console.log(Object.entries(this.props.orders['0'].order));       
    }

    closeModalHandler = () => {
        this.setState({show: false});
        this.props.onSetOrderId(null);
    }

    render () {
        let orderDeets = this.props.orderId;
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
                    <p>{orderDeets}</p>
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