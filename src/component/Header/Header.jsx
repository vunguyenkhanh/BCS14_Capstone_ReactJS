import { useDispatch, useSelector } from 'react-redux';
import { userLocalStorage } from '../../api/localService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown, message } from 'antd';
import { SET_INFO } from '../../redux/constant/user';
import { defaultAvatar } from '../../constants/defaultValues';

export default function Header({ scrollIntoShowTimesRef, scrollIntoCinemasRef, scrollIntoNewsRef, scrollIntoAppRef }) {
  const navigate = useNavigate();
  const { info } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  const handleLogout = () => {
    message.success('Logout successfully!');
    navigate('/');
    userLocalStorage.remove();
    const action = {
      type: SET_INFO,
      payload: null,
    };
    dispatch(action);
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleAccount = () => {
    navigate('/account');
  };
  const location = useLocation();
  const items = [
    {
      key: '1',
      label: info ? <Link to='/account'>{info.hoTen}</Link> : <Link to='/login'>Login</Link>,
    },
    {
      key: '2',
      label: info ? <a onClick={handleLogout}>Logout</a> : <Link to='/register'>Register</Link>,
    },
    {
      key: '3',
      label: (
        <a onClick={scrollIntoShowTimesRef} className='text-black hover:text-gray-700 durataion-300'>
          Showtimes
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={scrollIntoCinemasRef} className='text-black hover:text-gray-700 durataion-300'>
          Cinemas
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a onClick={scrollIntoNewsRef} className='text-black hover:text-gray-700 durataion-300'>
          News
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a onClick={scrollIntoAppRef} className='text-black hover:text-gray-700 durataion-300'>
          App
        </a>
      ),
    },
  ];

  const renderUserNav = () => {
    const classBtn = 
      "px-4 py-2 text-lg font-semibold rounded-lg border-2 transition duration-300";
  
    if (info) {
      return (
        <div className="flex justify-center items-center gap-x-4 p-2 bg-gradient-to-r from-white/70 via-gray-200/60 to-white/70 backdrop-blur-lg rounded-md shadow-md">
          <div
            className="cursor-pointer flex justify-center items-center gap-x-2 group"
            onClick={handleAccount}
          >
            <img
              src={defaultAvatar}
              className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
              alt="User Avatar"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 font-semibold group-hover:from-green-400 group-hover:via-purple-400 group-hover:to-pink-400 transition duration-300">
              {info.hoTen.toUpperCase()}
            </span>
          </div>
  
          <button
            className={`${classBtn} border-transparent text-gray-900 hover:bg-gradient-to-r hover:from-red-400 hover:via-pink-400 hover:to-orange-400 hover:text-white`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center gap-4 bg-gray-100/0 rounded-lg shadow-lg backdrop-blur-md ml-auto">
          <button
            className={`${classBtn} bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent hover:from-green-400 hover:to-blue-500`}
            onClick={handleLogin}
          >
            Login
          </button>
          
          <button
            className={`${classBtn} bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent hover:from-yellow-500 hover:to-red-500`}
            onClick={handleRegister}
          >
            Register
          </button>
          
          <button className="block md:hidden px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">
            Menu
          </button>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-white/50 via-gray-200/30 backdrop-blur-lg flex items-center justify-between shadow-md px-8 py-2 gap-4 fixed z-50 w-full">
      <p className="text-2xl font-medium text-red-600 animate-pulse text-center">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img alt="" src="../../../src/assets/logo3.webp" className="h-10" />
        </Link>
      </p>
  
      {location.pathname === '/' && (
        <div className="text-lg font-medium gap-6 lg:gap-12 text-center hidden md:flex justify-center items-center">
          <button
            onClick={scrollIntoShowTimesRef}
            className="text-gray-800 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition duration-300"
          >
            Showtimes
          </button>
          <button
            onClick={scrollIntoCinemasRef}
            className="text-gray-800 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 transition duration-300"
          >
            Cinemas
          </button>
          <button
            onClick={scrollIntoNewsRef}
            className="text-gray-800 hover:text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-400 to-indigo-400 transition duration-300"
          >
            News
          </button>
          <button
            onClick={scrollIntoAppRef}
            className="text-gray-800 hover:text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 transition duration-300"
          >
            App
          </button>
        </div>
      )}
  
      <div className="space-x-5">
        <div className="hidden md:block">{renderUserNav()}</div>
        <div className="block md:hidden">
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button>Menu</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
