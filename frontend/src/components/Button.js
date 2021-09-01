
function Button(props) {

  return (
    <div className={` ${props.className } my-auto mb-0`}>
      <button onClick={props.onClick} type={props.type || "button"} className="appearance-none block w-full mt-2 
	  	  bg-green-500 h-10 rounded-lg px-3 text-gray-100  leading-tight
            focus:outline-none focus:ring  ring-gray-90
            hover:bg-gray-30 transition-colors transition-duration-200 " >
				<span>{props.label} </span>
      </button>
    </div>

  );
}

export default Button;