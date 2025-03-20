const API = 'http://localhost:5001/tours'

export const toursService = async () => {
    try {
        const respone = await fetch(API)
        if(!respone.ok){
            throw new Error("Xatolik!")
        }
        const data = await respone.json()
        return data
    } catch (error) {
        console.log((error as Error).message);
    }
}