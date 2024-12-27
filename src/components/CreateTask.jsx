import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Submit from "./Submit";
import { useState } from "react";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default function CreateTask() {
    const [body, setBody] = useState({
        name: "",
        dateTime: ""
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // e.preventDefault()
        try {
            const res = await api.post("/authorized/taskCreate", {
                name: body.name,
                dateTime: body.dateTime
            })

            if (res.status !== 200) {
                console.warn("Non-success status:", res.status);
                window.alert(res.data.msg || "Something went wrong.");
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error("Axios error details:", error.toJSON());
            window.alert("Unable to create task. Please try again.")
            navigate('/')
        }
        

        
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBody((prevBody) => ({
            ...prevBody,
            [name]: value,
        }))
    }

    return (
        <>
        <div className="max-w-full bg-regular pb-8 pt-5 font-poppins max-md:py-8">
           
            <form 
            className="w-3/5 bg-testimonial mx-auto px-10% py-10 rounded-2xl max-md:w-4/5"
            onSubmit={handleSubmit}
            >
                 <p className="mx-auto text-white text-center text-lg mb-5">Add a New Task</p>
                <Input
                    type={"text"}
                    name={"name"}
                    label={"Task Title"}
                    onChange={handleChange}
                />
                <Input
                    type={"datetime-local"}
                    name={"dateTime"}
                    label={"Date and Time"}
                    onChange={handleChange}
                />

                <Submit text={"Create Task"} />
            </form>
        </div>
        </>
    )
}