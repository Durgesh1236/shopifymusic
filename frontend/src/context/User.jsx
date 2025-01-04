import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)

    async function registerUser(name, email, password, navigate, fetchSong, fetchAlbums) {
        setbtnLoading(true)
        try {
            const { data } = await axios.post("/api/user/register", { name, email, password })

            toast.success(data.message);
            setUser(data.user);
            setisAuth(true);
            setbtnLoading(false);
            navigate("/");
            fetchSong();
            fetchAlbums();
        } catch (error) {
            toast.error(error.response.data.message);
            setbtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate, fetchSong, fetchAlbums) {
        setbtnLoading(true)

        try {
            const { data } = await axios.post("/api/user/login", { email, password, });

            toast.success(data.message);
            setUser(data.user);
            setisAuth(true);
            setbtnLoading(false);
            navigate("/");
            fetchSong();
            fetchAlbums();
        } catch (error) {
            toast.error(error.response.data.message)
            setbtnLoading(false)
        }
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setisAuth(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setisAuth(false);
            setLoading(false);
        }
    }

    async function logoutUser() {
        try {
            const { data } = await axios.get("/api/user/logout");
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function addToPlaylist(id) {
        try {
            const { data } = await axios.post("/api/user/song/" + id);

            toast.success(data.message);
            fetchUser();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return <UserContext.Provider value={{ registerUser, user, isAuth, btnLoading, loading, loginUser, logoutUser, addToPlaylist }}>
        {children}
        <Toaster />
    </UserContext.Provider>
};

export const UserData = () => useContext(UserContext);