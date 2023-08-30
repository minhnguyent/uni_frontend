import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const SlideShow = () => {
    const [photos, setPhotos] = useState([]);

    const [creden, setCreden] = useState(null)

    useEffect(() => {
        console.log(creden)

        if (creden && creden.response && creden.response.access_token) {
            axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
                headers: {
                    'Authorization': `Bearer ${creden.response.access_token}`
                }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.error('Error fetching photos:', error);
                });
        }
    }, [creden])

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    setCreden(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;

            <Swiper
                autoplay={{ delay: 4000 }}
                modules={[Navigation, EffectFade, Autoplay]}
                navigation
                speed={700}
                slidesPerView={1}
                loop
                className='mySwiper'
            >
                {photos.map(photo => (
                    <SwiperSlide key={photo.id}>
                        {/* <img src={photo.baseUrl} alt={photo.filename} /> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SlideShow;