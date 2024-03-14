import LogoutButton from './LogoutButton';
import Logo from '../images/Logo.png';
// import './index.css'
import { NavLink } from 'react-router-dom';
function Nav() {
    return (
    <>
        <nav class="bg-gray-800 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="flex items-center space-x-6 rtl:space-x-reverse p-2">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} class="h-16" alt="Logo"/>
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-white">Travel Tracers</span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pl-20" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
                <a href="/api/itinerary" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Itinerary</a>
            </li>
            <li>
                <a href="/api/budgets" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Budget</a>
            </li>
            <li>
                <a href="/api/packing_list" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Packing List</a>
            </li>
            </ul>
        </div>
        </div>
        </nav>
        <nav class="bg-gray-200 dark:bg-gray-700">
            <div class="max-w-screen-xl px-0 py-0 pt-24 mx-auto">
                <div class="flex items-left">
                        <div class="flex items-center space-x-6 rtl:space-x-reverse pl-4 pb-4">
                            <a href="/api/login" class="text-sm  text-black dark:text-blue-500 hover:underline">Login</a>
                            <a href="/api/signup" class="text-sm  text-black dark:text-blue-500 hover:underline">Sign Up</a>
                        </div>
                </div>
            </div>
        </nav>
    </>
    );
}
export default Nav;