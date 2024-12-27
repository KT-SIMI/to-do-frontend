export default function Input({type, name, label, onChange}) {
    return (
        <>
        <label htmlFor={name} className="text-left text-white text-base font-poppins mb-3 block">{label}</label>
        <input type={type} name={name} placeholder={label} onChange={onChange} className="font-poppins mb-3 w-full p-2 placeholder:text-gray-700 bg-white placeholder:text-opacity-60" required />
        </>
    )
}