import { useEffect, useState } from "react"
import { productService } from "../services/productService"
import "../styles/popup.scss"

export const Popup = ({ onClick, catId, setCart }) => {
    const [data, setData] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState()

    //fetching data
    useEffect(() => {
        const fetchData = async () => {
            const res = await productService.productByCatId(catId, searchValue, currentPage)
            if (res.status !== 1) {
                console.log('xuat hien loi')
                return
            }
            setData(res.data.data)
            setMeta(res.data.meta)
        }

        fetchData()
    }, [catId, searchValue, currentPage])

    //handleSelecProdroduct
    const handleSelect = (pro) => {
        pro.onePro = parseFloat(pro.price)
        const productsStorageJSON = localStorage.getItem('selectedProducts');
        const productsStorage = productsStorageJSON ? JSON.parse(productsStorageJSON) : [];
        console.log(productsStorage)
        const exitPro = productsStorage.find(p => p.name == pro.name)

        if (exitPro) {
            exitPro.quantity = (exitPro.quantity || 1) + 1
            exitPro.price = exitPro.onePro * exitPro.quantity
        } else {
            pro.key = `${pro.id}-${Date.now()}`
            productsStorage.push({ ...pro, price: parseFloat(pro.price), quantity: 1 })
        }
        localStorage.setItem('selectedProducts', JSON.stringify(productsStorage));
        setCart(productsStorage)
        onClick(false)

    }

    return (
        <div className="Cpop">
            <div className="Cpop_overlay" onClick={() => onClick(false)}></div>
            <div className="Cpop_content">
                <button className="pop_exit" onClick={() => onClick(false)}>X</button>
                <div className="pop_tools">
                    <div className="pop_search">
                        <input type="text" placeholder="search text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                    </div>

                    <div className="pop_paginate">
                        {meta &&
                            Array.from({ length: meta.last_page }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                    </div>
                </div>

                <div className="pop_data">
                    {data &&
                        data.map((product, index) =>
                        (
                            <div className="pop_product" key={`product${index}`} onClick={() => handleSelect(product)}>
                                <div className="product-left">
                                    <img src={product.src} alt="loading" />
                                </div>
                                <div className="product-right">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-price">{product.price}</div>
                                </div>

                            </div>
                        )
                        )
                    }
                </div>

            </div>
        </div>

    )
} 