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
      label: (
        <Link to="/account" className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          {info ? info.hoTen : 'Login'}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <a
          onClick={info ? handleLogout : handleRegister}
          className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          {info ? 'Logout' : 'Register'}
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={scrollIntoShowTimesRef} className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Showtimes
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={scrollIntoCinemasRef} className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Cinemas
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a onClick={scrollIntoNewsRef} className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          News
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a onClick={scrollIntoAppRef} className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 50,
      }}
      className="shadow-md"
    >
      <div className="flex items-center">
        <p className="text-2xl font-medium animate-pulse text-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img alt="" src="../../../src/assets/logo3.webp" className="h-10" />
          </Link>
        </p>
      </div>
  
      {location.pathname === '/' && (
        <div className="text-lg font-medium gap-6 lg:gap-12 hidden md:flex justify-center items-center">
          <button
            onClick={scrollIntoShowTimesRef}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            Showtimes
          </button>
          <button
            onClick={scrollIntoCinemasRef}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            Cinemas
          </button>
          <button
            onClick={scrollIntoNewsRef}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            News
          </button>
          <button
            onClick={scrollIntoAppRef}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            App
          </button>
        </div>
      )}
  
      <div className="space-x-5">
        <div className="hidden md:block">{renderUserNav()}</div>
        <div className="block md:hidden">
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button className="bg-red-500 text-white hover:bg-red-600">Menu</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
  
  
}
