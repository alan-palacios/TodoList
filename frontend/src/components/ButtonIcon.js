import { Icon } from '@iconify/react';

function ButtonIcon(props) {
  return (
    <div className={` ${props.className } my-auto mb-0`}>
      <button onClick={props.onClick} type={props.type || "button"} className={`appearance-none block 
	  	  ${props.background} ${props.textColor || "text-gray-100" } rounded-lg px-3   leading-tight h-10
            focus:outline-none 
            hover:bg-gray-200 transition-colors transition-duration-200 `} >
              <Icon  icon={props.icon} style={{fontSize: '24px'}}/>
      </button>
    </div>

  );
}

export default ButtonIcon;