import React from 'react'
import { useCart } from '../../services/provider/CartContextProvidr'

const RemoveCardIcon = () => {
    const {clearCart}=useCart();

  return (
    <>
    <span className='cursor-pointer' onClick={() => clearCart()}>
    <i className="fa-solid fa-eraser text-lg me-1"></i>  Remove All
    </span>
    </>
  )
}

export default RemoveCardIcon