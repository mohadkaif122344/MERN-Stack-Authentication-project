const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              MyApp
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-6 max-w-sm">
              A simple and secure platform to manage your profile, account
              information and authentication settings easily.
            </p>
          </div>
          <div className="pl-20">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider ">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 mt-4">
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Home
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Profile
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                About
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Contact
              </li>
            </ul>
          </div>
          <div className="pl-20">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">
              Account
            </h3>
            <ul className="flex flex-col gap-2 mt-4">
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Email Verification
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Security
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition">
                Manage Profile
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Simple • Secure • Reliable
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
