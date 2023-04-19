import { useState, createContext, useContext, useEffect } from "react"


const authContext = createContext()



const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })


    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )

}

// custom hook
const useAuth = () => useContext(authContext);

export {useAuth, AuthProvider}