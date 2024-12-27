import { Link } from "react-router-dom"

export default function Header({ heading, firstname, onClick }) {
    return (
       <div className="bg-regular max-w-full font-poppins pt-10 max-md:pt-8">
             <h1 className="text-center text-4xl text-white max-md:text-3xl">{heading}</h1>
             <div className="w-3/5 flex justify-between mx-auto py-4">
             <p className="text-white mt-3 text-lg">Hello, {firstname}!</p>
            <Link to="/authLogin" className="bg-red py-3 px-6 rounded-lg text-white" onClick={onClick}>Logout</Link>
             </div>
       </div>
    )
   
}