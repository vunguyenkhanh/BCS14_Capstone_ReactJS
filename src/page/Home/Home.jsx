// import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import ModalVideo from 'react-modal-video';
import ListMovie from './ListMovie/ListMovie';
import Slider from './Slider/Slider';
import TabMovie from './TabMovie/TabMovie';
import { useDispatch, useSelector } from 'react-redux';
import { CHOOSE_TRAILER } from '../../redux/constant/user';
import { Carousel, Select, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getListMovie } from '../../api/api';
import { BASE_URL, configHeaders } from '../../api/config';
import moment from 'moment/moment';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';

export default function Home() {
  const [viewMore, setViewMore] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  const kindOfPosts = ['Showbiz 24h', 'Review', 'Promotion'];
  const SinglePost = ({ itemData }) => {
    return (
      <>
        {itemData.map((item, index) => (
          <div key={index}>
            <a target='blank' href={item.url}>
              <img src={item.img} alt='' className='rounded-lg cursor-pointer h-72 w-full object-cover' />
            </a>
            <a target='blank' href={item.url}>
              <h1 className='font-bold text-xl mt-2 mb-3 text-black hover:text-[#fb4226] cursor-pointer duration-300 truncate'>
                {item.title}
              </h1>
            </a>
            <p className='text-justify line-clamp-3'>{item.text}</p>
          </div>
        ))}
      </>
    );
  };
  const SinglePostNoText = ({ itemData }) => {
    return (
      <div className='p-0 m-0 grid gap-7'>
        {itemData.map((item, index) => (
          <div key={index} className='flex flex-row justify-start md:justify-between gap-3'>
            <a target='blank' href={item.url} className='basis-auto'>
              <img src={item.img} alt='' className='rounded-lg cursor-pointer h-20 w-20 object-cover' />
            </a>
            <p target='blank' href={item.url} className='basis-4/5 text-gray-700 text-justify'>
              {item.title}
            </p>
          </div>

        ))}
      </div>
    );
  };
  const handlePosts = arrData => {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <SinglePost itemData={arrData.slice(0, 2)} />
        </div>
        {viewMore && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <SinglePost itemData={arrData.slice(2, 4)} />
            <div className='grid grid-cols-1'>
              <SinglePostNoText itemData={arrData.slice(4, 8)} />
            </div>
          </div>
        )}
        <div className='flex justify-center'>
          <button
            className='px-6 py-2 text-white w-36 bg-[#fb4226] hover:bg-red-800 duration-300 rounded-lg'
            onClick={() => setViewMore(!viewMore)}
            type='button'
          >
            {viewMore ? 'Collapse' : 'View more'}
          </button>
        </div>
      </div>
    );
  };
  const renderPosts = index => {
    if (index === 0) {
      return handlePosts(dienAnhPosts);
    } else if (index === 1) {
      return handlePosts(reviewPosts);
    } else {
      return handlePosts(khuyenMaiPosts);
    }
  };
  const [dienAnhPosts, setDienAnhPosts] = useState([]);
  const [reviewPosts, setReviewPosts] = useState([]);
  const [khuyenMaiPosts, setKhuyenMaiPosts] = useState([]);
  useEffect(() => {
    axios
      .get('https://5ccfa9755b71f40014dc0df8.mockapi.io/news')
      .then(res => setDienAnhPosts(res.data))
      .catch(err => console.error(err));
    axios
      .get('https://674867fa5801f5153590bb53.mockapi.io/Review')
      .then(res => setReviewPosts(res.data))
      .catch(err => console.error(err));
    axios
      .get('https://674872315801f5153590f2e3.mockapi.io/Promotion')
      .then(res => setKhuyenMaiPosts(res.data))
      .catch(err => console.error(err));
  }, []);
  const { chosenTrailer } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  const [movieArr, setMovieArr] = useState([]);
  const [movieArrFilter, setMovieArrFilter] = useState([]);
  useEffect(() => {
    getListMovie()
      .then(res => {
        setMovieArr([...res.data]);
        const arrData = [...res.data];
        const arrFilter = [];
        arrData.map(item => {
          arrFilter.push({
            value: item.maPhim,
            label: item.tenPhim,
          });
        });
        setMovieArrFilter([...arrFilter]);
      })
      .catch(err => console.error(err));
  }, []);

  const [searchFilm, setSearchFilm] = useState(null);
  const [chosenCinemaArr, setChosenCinemaArr] = useState([]);

  // chọn rạp
  const [searchCinema, setSearchCinema] = useState(null);

  // danh sách suất
  const [searchTime, setSearchTime] = useState(null);

  // chọn suất
  const [chosenTime, setChosenTime] = useState(null);

  const [totalSearchFilm, setTotalSearchFilm] = useState([]);

  useEffect(() => {
    if (searchFilm) {
      axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${searchFilm}`,
        method: 'GET',
        headers: configHeaders(),
      })
        .then(res => {
          setTotalSearchFilm(res.data);
          const arrData = [...res.data.heThongRapChieu];
          const arrFilter = [];
          const cumRapList = arrData
            .map(heThongRap =>
              heThongRap.cumRapChieu.map(cumRap => ({
                maCumRap: cumRap.maCumRap,
                tenCumRap: cumRap.tenCumRap,
              })),
            )
            .flat();
          cumRapList.map(item => {
            arrFilter.push({
              value: item.maCumRap,
              label: item.tenCumRap,
            });
          });
          setChosenCinemaArr([...arrFilter]);
        })
        .catch(err => console.error(err));
    }
  }, [searchFilm]);
  useEffect(() => {
    if (searchCinema && searchFilm) {
      const filteredData = totalSearchFilm.heThongRapChieu
        .map(heThongRap => heThongRap.cumRapChieu.filter(cumRap => cumRap.maCumRap === searchCinema))
        .flat();
      const arr = [];
      filteredData.map(item => {
        item.lichChieuPhim.map(itemChild =>
          arr.push({
            value: itemChild.maLichChieu,
            label: moment(itemChild.ngayChieuGioChieu).format('DD-MM-YYYY ~ HH:mm'),
          }),
        );
      });
      setSearchTime([...arr]);
    }
  }, [searchCinema, searchFilm, totalSearchFilm]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const showTimesRef = useRef(null);
  const cinemasRef = useRef(null);
  const newsRef = useRef(null);
  const appRef = useRef(null);

  const scrollIntoShowTimesRef = () => {
    if (showTimesRef.current) {
      showTimesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollIntoCinemasRef = () => {
    if (cinemasRef.current) {
      cinemasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollIntoNewsRef = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollIntoAppRef = () => {
    if (appRef.current) {
      appRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Header
        scrollIntoShowTimesRef={scrollIntoShowTimesRef}
        scrollIntoCinemasRef={scrollIntoCinemasRef}
        scrollIntoNewsRef={scrollIntoNewsRef}
        scrollIntoAppRef={scrollIntoAppRef}
      />
      <ModalVideo
        channel='youtube'
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={chosenTrailer !== ''}
        videoId={chosenTrailer}
        onClose={() => {
          const action = {
            type: CHOOSE_TRAILER,
            payload: '',
          };
          dispatch(action);
        }}
      />
      <div className=''>
        <Slider />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-5 pt-20 px-4">
          <Select
            disabled={movieArrFilter.length === 0}
            showSearch
            className="w-full border border-gray-300 rounded-lg shadow-md hover:shadow-lg focus:ring focus:ring-blue-400 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700"
            placeholder="🎬 Choose film"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={movieArrFilter}
            onChange={value => {
              setSearchFilm(value);
              setSearchCinema(null);
              setSearchTime(null);
              setChosenTime(null);
            }}
          />

          <Select
            disabled={!searchFilm}
            value={searchCinema}
            showSearch
            className={`w-full border rounded-lg shadow-md hover:shadow-lg focus:ring focus:ring-green-400 bg-gradient-to-r from-green-100 to-green-200 ${searchFilm ? 'border-green-300' : 'border-gray-200'
              }`}
            placeholder="🎥 Choose cinema"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={chosenCinemaArr}
            onChange={e => {
              setSearchCinema(e);
              setChosenTime(null);
            }}
          />

          <Select
            disabled={!searchCinema}
            value={chosenTime}
            showSearch
            className={`w-full border rounded-lg shadow-md hover:shadow-lg focus:ring focus:ring-purple-400 bg-gradient-to-r from-purple-100 to-purple-200 ${searchCinema ? 'border-purple-300' : 'border-gray-200'
              }`}
            placeholder="⏰ Choose time"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={searchTime}
            onChange={e => setChosenTime(e)}
          />

          <button
            disabled={!chosenTime}
            className={`w-full py-3 text-white font-semibold rounded-3xl shadow-lg transition-all duration-300 
      ${chosenTime ? 'bg-gradient-to-r from-red-400 via-pink-500 to-yellow-500 hover:scale-105' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={() => navigate(`/purchase/${chosenTime}`)}
          >
            🎟️ Book Tickets
          </button>
        </div>

        <div ref={showTimesRef} className='pt-[80px]'></div>
        <ListMovie movieArr={movieArr}></ListMovie>
        <div ref={cinemasRef} className='pt-[80px]'></div>
        <TabMovie />
        <div ref={newsRef} className='pt-[80px]'></div>
        <div className='container'>
          <Tabs
            defaultActiveKey='1'
            centered
            items={kindOfPosts.map((item, index) => {
              const id = String(index + 1);
              return {
                label: item,
                key: id,
                children: renderPosts(index),
              };
            })}
          />
        </div>
        <div ref={appRef} className='pt-[48px]'></div>
        <div className='flex flex-col min-h-[calc(100vh-48px)] bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
          <div className='flex flex-1 justify-center items-center text-white container'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 py-12'>
              <div className='flex justify-center items-center text-center md:text-justify'>
                <div className='space-y-12'>
                  <h1 className='font-bold text-3xl'>Ứng dụng tiện lợi để xem phim</h1>
                  <div>
                    <a
                      href='https://apps.microsoft.com/detail/9wzdncrfj3tj?hl=en-us&gl=US'
                      target='blank'
                      className='uppercase bg-[#fb4226] py-5 px-7 rounded-lg hover:bg-red-800 duration-300'
                    >
                      APP MIỄN PHÍ – TẢI VỀ NGAY!
                    </a>
                  </div>
                  <p>
                    TIX có hai phiên bản{' '}
                    <a
                      target='blank'
                      href='https://apps.apple.com/us/app/netflix/id363590051'
                      className='underline cursor-pointer'
                    >
                      IOS
                    </a>{' '}
                    &{' '}
                    <a
                      target='blank'
                      href='https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en-US'
                      className='underline cursor-pointer'
                    >
                      Android
                    </a>
                  </p>
                </div>
              </div>
              <div className='relative'>
                <img
                  alt=''
                  src='./../../assets/phone.png'
                  className='mx-auto w-48 z-50'
                />
                <div className='absolute top-1/2 text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <Carousel effect='fade' autoplay dots={false} className='w-[180px] mx-auto'>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(index => (
                      <img
                        key={index}
                        className='w-[180px] mx-auto rounded-2xl'
                        src={`https://movie-booking-project.vercel.app/img/mobile/slide${index + 1}.jpg`}
                        alt=''
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
