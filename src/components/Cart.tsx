import { useEffect, useState } from "react"
import "../styles/cart.scss"


export const Cart = ({ cart, setCart }) => {

    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(cart.reduce((total, product) => {
            return total + (parseFloat(product.price))
        }, 0))
    }, [cart])

    const updateQuantity = (product, num) => {

        const updatePro = cart.map(p => {
            if (p.key === product.key) {
                let newQuan = (p.quantity || 1) + num
                newQuan = Math.max(1, newQuan)
                const newPrice = p.onePro * newQuan
                return { ...p, quantity: newQuan, price: newPrice }
            }
            return p
        })
        updateSelectedProduct(updatePro)
    }

    const handleDelete = (product) => {

    }

    const updateSelectedProduct = (cart) => {
        setCart(cart)
        localStorage.setItem('selectedProducts', JSON.stringify(cart))
    }

    return (
        <div className="Ccart">
            <div className="cart-total">
                <span>Total Price: {
                    total &&
                    total.toLocaleString("vi-VN")} VND</span>
            </div>

            <table className="cart-buy">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(c => (
                        <tr className='product-row' key={c.key}>
                            <td className='product-image'>
                                <img className="f-img" src={c.src} alt={c.name} />
                            </td>
                            <td className='product-name'>{c.name}</td>
                            <td className='product-price'>{c.price}</td>
                            <td className='product-quantity'>
                                <button onClick={() => updateQuantity(c, -1)}>-</button>
                                {c.quantity || 1}
                                <button onClick={() => updateQuantity(c, 1)}>+</button>
                            </td>
                            <td className='product-action'>
                                <button onClick={() => handleDelete(c)}>Delete</button>
                            </td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>

        </div>
    )
}