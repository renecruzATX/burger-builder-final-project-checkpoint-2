//exports all the actions from here to reduce code in actions files

export {
    addIngredient,
    removeIngredient,
    initIngredients
} from './burgerBuilder';
export {
    purchaseBurger,
    purchaseInit,
    fetchOrders,
    setOrderId
} from './order';
export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState
} from './auth';