import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import CreateTask from "../components/CreateTask"
import Tasks from "../components/Tasks"

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})


export default function Index() {
    const navigate = useNavigate()
    const [data, setData] = useState({})

    const fetchData = async () => {
        try {
            const res = await api.get('/authorized/index');
            // console.log(res.data);
            // console.log(res.status)
            if (res.status === 200) {
                setData(res.data);
            } else {
                console.warn("Non-success status:", res.status);
                window.alert(res.data.msg || "Something went wrong.");
                navigate('/authLogin');
            }
        } catch (error) {
            console.error("Axios error details:", error.toJSON());
            window.alert("Unable to fetch data. Please try again.");
            navigate('/authLogin');
        }
    };

    
    useEffect(() => {
        console.log("Effect loaded...")
        fetchData();    
    }, [])
    

    const logout = async () => {
        try {
            const out = await api.get('/logout');
    
            if (out.status !== 200) {
                const errorMsg = out.msg || "Something went wrong. Please reload";
                window.alert(errorMsg);
            } else {
                window.alert("Successfully logged out.");
                navigate('/authLogin');
            }
        } catch (error) {
            console.error("Error:::", error);
            window.alert("Please try again.");
        }
    };


    const deleteTask = async (taskId) => {
        // e.preventDefault()
        try {
            const del = await api.get(`/authorized/taskDelete`, { 
                params: { taskId } 
            })

            if (del.status !== 200) {
                const errorMsg = del.msg || "Something went wrong. Please try again";
                window.alert(errorMsg);
            } else {
                // window.alert("Task deleted Successfully")
                navigate('/')
            }
        } catch (error) {
            console.error("Error:::", error);
            window.alert("Please try again.");
        }
    }

    const completeTask = async (taskId) => {
        // e.preventDefault()
        try {
            console.log(taskId)
            const comp = await api.get(`/authorized/taskComplete`, { 
                params: { taskId } 
            })

            console.log(comp)
            if (comp.status !== 200) {
                const errorMsg = comp.msg || "Something went wrong. Please try again";
                window.alert(errorMsg);
            } else {
                // window.alert("Task completed Successfully")
                navigate('/')
            }
        } catch (error) {
            console.error("Error:::", error);
            window.alert("Please try again.");
        }
    }
    
    
    const user = data?.data?.user || {};
    const tasks = data?.data?.tasks || [];


    return (
        <div className="bg-regular h-screen">
            <Header 
            heading={'Task App'}
            firstname={user?.firstname}
            onClick={logout} // Correct
  
            />
            <CreateTask />
            {/* {console.log("Tasks Length:", tasks.length)} */}
            <Tasks tasks={tasks} complete={completeTask} deleteTask={deleteTask} />
            
        </div>
    )
}

