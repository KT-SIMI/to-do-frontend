import Task from "./Task";

export default function Tasks({ tasks, complete, deleteTask }) {
  return (

      <div className="container max-w-full bg-regular font-poppins py-20">
        <h1 className="text-white mx-auto text-center pb-4 text-3xl">
            Tasks
        </h1>
        <ul className="w-3/5 bg-testimonial mx-auto px-[6%] py-10 rounded-2xl list-none max-md:w-4/5">
        {tasks.length > 0 ? (
      tasks.map(task => (  
        <li key={task._id} id={task._id}>
          <Task 
            task={task} 
            complete={() => complete(task._id)} 
            deleteTask={() => deleteTask(task._id)} 
          />
        </li>
      ))
    ) : (
      <p className="text-center text-white text-xl my-auto font-medium">No tasks yet</p>
    )}
        </ul>
      </div>
  );
}
