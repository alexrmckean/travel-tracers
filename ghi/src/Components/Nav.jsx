import { NavLink, useNavigate } from 'react-router-dom';
import { useDeleteTokenMutation, useGetTokenQuery } from '../app/AuthSlice';
import Logo from '../images/Logo.png';

function Nav() {
    const navigate = useNavigate();
    const [deleteToken] = useDeleteTokenMutation();
    const { data: account } = useGetTokenQuery();

    const handleLogout = async () => {
        try {
            await deleteToken();
            navigate('/api/home');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav className="bg-gray-800 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-6 rtl:space-x-reverse p-2">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-16" alt="Logo"/>
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-white">Travel Tracers</span>
                    </NavLink>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pl-20" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/api/home" activeClassName="bg-blue-700" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/api/itinerary" activeClassName="bg-blue-700" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Itinerary</NavLink>
                            </li>
                            <li>
                                <NavLink to="/api/budgets" activeClassName="bg-blue-700" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Budget</NavLink>
                            </li>
                            <li>
                                <NavLink to="/api/packing_list" activeClassName="bg-blue-700" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Packing List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/api/accommodations" activeClassName="bg-blue-700" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-200 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Accommodations</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-200 dark:bg-gray-700">
                <div className="max-w-screen-xl px-0 py-0 pt-24 mx-auto">
                    <div className="flex items-left">
                        <div className="flex items-center space-x-6 rtl:space-x-reverse pl-4 pb-4">
                            {account ? null : (
                                <>
                                    <NavLink to="/api/signup" className="text-sm underline text-black dark:text-blue-500 hover:underline">Sign Up</NavLink>
                                    <NavLink to="/api/login" className="text-sm underline text-black dark:text-blue-500 hover:underline">Login</NavLink>
                                </>
                            )}
                            {!account ? null : (
                                <button onClick={handleLogout} className="text-sm underline text-black dark:text-blue-500 hover:underline">Logout</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
