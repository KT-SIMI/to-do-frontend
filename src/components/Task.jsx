import checkIncomplete from "../assets/checkIncomplete.svg"
import checkComplete from "../assets/checkComplete.svg"
import trash from "../assets/delete.svg"


export default function Task({ task, complete, deleteTask }) {
    const date = new Date(Date.parse(task.dateTime))

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ordinalSuffix = (n) => {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDate = `${ordinalSuffix(day)} of ${month}, ${year} at ${hours}:${minutes}`;

  

    return (
    <div className="w-full bg-white text-base px-3 py-2 flex justify-between rounded-xl mt-6">
        <a href="/" className="my-auto float-left max-md:mr-4" onClick={complete}>
        <img src={task.isComplete ? checkComplete : checkIncomplete} alt="check" />
        </a>
        <p className="-ml-[25%] max-lg:-ml-[15%] max-bg:-ml-[10%] max-md:ml-10 max-md:w-4/5 max-lg text-sm">{task.name}
            <br />
            {formattedDate}
        </p>
        <a href="/" className="float-end my-auto right-0" onClick={deleteTask}>
            <img src={trash} alt="delete" />
        </a>
    </div>
    )
}