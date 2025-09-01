// Header.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import FallbackAvatars from "../Avatar/Avatar";

export default function Header(){
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [estaAbiertoMenu, setEstaAbiertoMenu] = useState(false);
    const [estaAbiertoMenuMovil, setEstaAbiertoMenuMovil] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  setEstaAbiertoMenu(false);
}
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navClasses = isHome 
    ? "fixed w-full dark:border-gray-700 z-[89] hover:bg-gray-900"  // HOME
    : "sticky top-0 w-full border border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-30";  // PRODUCTS

    return <nav className={`${navClasses} ${estaAbiertoMenuMovil ? "bg-gray-900" : "transition-all duration-200 ease-in-out"} `}>
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between relative">
                    
                    {/* 👈 IZQUIERDA: Botón de perfil */}
                    <div className="relative " ref={dropdownRef}>
                        <button className="cursor-pointer" title="Perfil" onClick={() => setEstaAbiertoMenu(!estaAbiertoMenu)}>
                            <FallbackAvatars />
                        </button>

                        {/* Dropdown del perfil */}
                        {estaAbiertoMenu && (
                            <div className=" absolute top-10 left-0 z-50 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">Fede Melgin</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">federicomelgin@gmail.com</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* 🎯 CENTRO: Menu Links (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <ul className="flex space-x-8 font-medium">
                            <li>
                                <Link to="/" className="text-blue-700 hover:text-blue-800 dark:text-blue-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                                    productos
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/carrito" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                                    carrito
                                </Link>
                            </li> */}
                            
                        </ul>
                    </div>

                    {/* 👉 DERECHA: Botón hamburguesa (Mobile) */}
                    <button 
                        type="button" 
                        className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                        onClick={() => setEstaAbiertoMenuMovil(!estaAbiertoMenuMovil)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

                {/* 📱 Menu Mobile (debajo de todo) */}
                {estaAbiertoMenuMovil && (
                    <div className="bg-gray-900 md:hidden mt-4 transition-all duration-200 ease-in-out">
                        <ul className="flex flex-col space-y-2 font-medium">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">productos</Link>
                            </li>
                            <li>
                                <Link to="/carrito" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">carrito</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contact</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
}