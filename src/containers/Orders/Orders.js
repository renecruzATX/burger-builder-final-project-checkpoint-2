import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
//import axios from 'axios';
//import withErrorHandler from '../../hoc/withErrorHander/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

//renders past orders on the Orders page
class Orders extends Component {
    //initializes the orders from the server
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = <Spinner/>;
            if (!this.props.loading) {
                orders = this.props.orders.map(order =>(
                    <Order 
                    key={order.id}
                    ingredients={order.order.ingredients}
                    price = {+order.order.price}/>
                ))
            };
        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Orders);