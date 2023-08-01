import React from "react";
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
	const location = useLocation();
	return (
		<div className="flex my-2 bg-white p-2 shadow pl-5">
			<Link to="/settings" 
			className={(location.pathname === '/settings') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}
			
		>
				About
			</Link>
			<Link to="/charges" className={(location.pathname === '/charges') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Charges
			</Link>
			<Link to="/employeeTypes" className={(location.pathname === '/employeeTypes') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Employee Types
			</Link>
			<Link to="/users" className={(location.pathname === '/users') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Users
			</Link>
			<Link to="/patientTypes" className={(location.pathname === '/patientTypes') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Patient Types
			</Link>
			<Link to="/suppliers" className={(location.pathname === '/suppliers') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Suppliers
			</Link>
		</div>
	);
}

export default Navigation;
