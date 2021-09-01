function Input(props) {

  return (
    <div className={` ${props.size}`}>
      <span className="text-gray-10 block">
        {props.label}
      </span>
      <input type={props.type || 'text'} value={props.value} onChange={ e => props.onChange(e)} name={props.name}
              className="appearance-none block w-full mt-1 
                        bg-gray-100 h-10 rounded-lg px-3 text-gray-10 shadow-inner leading-tight
                          focus:outline-none focus:ring  ring-gray-90" />
    </div>

  );
}

export default Input;