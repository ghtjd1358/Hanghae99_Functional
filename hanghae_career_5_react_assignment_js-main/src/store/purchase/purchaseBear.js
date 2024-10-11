import { create } from "zustand";


const purchaseBear = create(()=>({
    isLoading : false,
    error : null,

    purchaseStart : () => {
        set({ isLoading : true, error : null })
    },
    purchaseSuccess : () => {
        set({ isLoading : false, error : null })
    },
    purchaseFailure : (error) => {
        set({ isLoading : false, error : error.message })
    }
    
}))

export default purchaseBear