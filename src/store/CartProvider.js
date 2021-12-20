import { useReducer } from 'react';
import CartContext from './cart-context';



const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {

    if(action.type === 'ADD'){
        
        const updatedItem = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const exitingCartItem = state.items[existingCartItemIndex];
        
        let updatedItems;

        if(exitingCartItem) {
            const updatedItem = {
                ...exitingCartItem,
                amount: exitingCartItem.amount | action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item)
        }

        const newaddCart = {
            items: updatedItems,
            total: updatedTotalAmount
        }

        return newaddCart 
    }
    
    if(action.type === 'REMOVE') {
        
        const existingCartItemIndex = state.item.findIndex(
            (item) => item.id === action.id
        );

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        
        if(existingItem.amount === 1){
            updatedItems = state.item.filter(item => item.id !== action.id);
        }else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return{
            items: updatedItems,
            total: updatedTotalAmount
        }
    }

    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        console.log(item);
        dispatchCartAction({type: 'ADD', item: item});
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
