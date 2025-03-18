import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null);

    async function registerUser(name, email, password, navigate) {
        setbtnLoading(true)
        try {   
            const { data } = await axios.post("/api/user/register", { name, email, password })
            const { otp } = await axios.post("/api/user/send-verify-otp");
            toast.success(data.message);
            setUser(data.user);
            setbtnLoading(false);
            navigate("/email-verify");
        } catch (error) {
         toast.error(error.message);
            setbtnLoading(false);
        }
    }

    async function verifyEmailUser(otp, navigate, fetchSong, fetchAlbums) {
        setbtnLoading(true)
        try {
            const { data } = await axios.post("/api/user/verify-account", {otp});
            if(data.success){
            toast.success(data.message);
            setisAuth(true);
            setbtnLoading(false);
            navigate("/");
            fetchSong();
            fetchAlbums();
            } else {
                navigate("/email-verify");
            }
        } catch (error) {
            toast.error(error.message);
            setbtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate, fetchSong, fetchAlbums) {
        setbtnLoading(true)

        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            if(data.success){
            toast.success(data.message);
            setUser(data.user);
            setisAuth(true);
            setbtnLoading(false);
            navigate("/");
            fetchSong();
            fetchAlbums();
            } else {
                toast.error(data.message);
                setbtnLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setbtnLoading(false)
        }
    }

    async function resendOtp() {
        try {
            const { data } = await axios.post("/api/user/send-verify-otp");
            if(data.success){
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function addProfile(userid, formData, setFile) {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/user/" + userid , formData);
            toast.success(data.message);
            setLoading(false);
            setFile(null);
            logoutUser();
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
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
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function addToHistory(id) {
        try {
            const { data } = await axios.post("/api/user/save-history/" + id);
        //    toast.success(data.message);
            fetchUser()
        } catch (error) {
          toast.error(error.response.data.message);
        }
    }

    async function deleteRecentSong(id) {
        try {
            const { data } = await axios.delete("/api/user/recent-delete/" + id);
            toast.success(data.message);
            // fetchUser();
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

    const handleApply = (job) => {
        setSelectedJob(job);
      };

    useEffect(() => {
        fetchUser();
    }, []);

    return <UserContext.Provider value={{ registerUser, user, isAuth, 
    btnLoading, loading, loginUser, logoutUser, addToPlaylist, 
    verifyEmailUser,resendOtp, addProfile, addToHistory, deleteRecentSong,
    selectedJob, setSelectedJob,handleApply, }}>
        {children}
    </UserContext.Provider>
};

export const UserData = () => useContext(UserContext);