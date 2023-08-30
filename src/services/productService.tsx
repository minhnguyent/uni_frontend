import axios from "axios"


export const productService = {

    async productByCatId(catId: number | string, searchValue, currentPage) {
        try {
            const res = await axios.get(`http://localhost:3333/productbycat/${catId}?filter=${searchValue}&page=${currentPage}`)
            return {
                status: 1,
                data: res.data
            }
        }
        catch (error) {
            return {
                status: 0,
                data: 'loi'
            }
        }
    }
}