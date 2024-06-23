import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >          
          <span className="hover:text-blue-500 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Level Two From
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="https://samuelmasihsls777.wixsite.com/portfolio"
                className="block py-2 px-3 text-white hover:text-blue-500 rounded md:bg-transparent  md:p-0 "
                aria-current="page"
              >
                By - Samuel Masih
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
