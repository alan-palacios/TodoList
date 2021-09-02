
function Nav(props){
	return(
		<div className="w-full bg-gray-100 shadow-md text-gray-10 h-14 fixed top-0 p-2 flex z-10">
			<span className="m-auto ml-5 text-2xl font-tysla">{props.title}</span>
		</div>
	)
}

export default Nav;