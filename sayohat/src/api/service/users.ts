const API = 'http://localhost:5002/users'

export const usersService = async () => {
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