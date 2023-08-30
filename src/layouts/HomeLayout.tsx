import { useEffect, useState } from "react"
import { Menu } from "../components/headers/Menu"
import { Popup } from "../components/Popup"
import { Cart } from "../components/Cart"
import SlideShow from "../components/Slideshow"



export const HomeLayout = () => {

    const [showPop, setShowPop] = useState(false)
    const [menuId, setMenuId] = useState(0)
    const [cartList, setCartList] = useState([])
    //setup localstorage

    useEffect(() => {
        // Initialize 'selectedProducts' in localStorage if not set
        const initialSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        setCartList(initialSelectedProducts)
    }, []);

    useEffect(() => {
        console.log(cartList)
    }, [cartList])

    const handleMenuClick = (menuId: number) => {
        setMenuId(menuId)
    }


    return (
        <div className="Lhome">
            <Menu onClick={handleMenuClick}
                onShowpop={setShowPop}
            />

            {showPop &&
                <Popup
                    onClick={setShowPop}
                    catId={menuId}
                    setCart={setCartList}
                />
            }
            {/* <SlideShow /> */}

            <Cart
                cart={cartList}
                setCart={setCartList}
            />
        </div>
    )
}
