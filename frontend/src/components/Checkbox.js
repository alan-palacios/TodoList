import { Icon } from '@iconify/react';
function Checkbox(props) {
  return (
    <div className={`m-auto ${props.size} relative `}>
      <span className="text-gray-10 block">
        {props.label}
      </span>
      <input type="checkbox" className="opacity-0 absolute h-8 w-8 hover:cursor-pointer " checked={props.value} name={props.name}  onChange={ props.checkboxChangeHandler}/>
      <div className={`w-8 h-8 bg-gray-100 text-purple-700  rounded-lg  shadow-inner flex ${props.value?'border-purple-700 border-2':''}`}>
        <Icon className="hidden fill-current m-auto " icon="carbon:checkmark" style={{fontSize: '30px'}}/>
      </div>
    </div>

  );
}

export default Checkbox;