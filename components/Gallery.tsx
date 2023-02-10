import React, { useState, useEffect } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { CDNURL } from '../pages'

type Image = {
    id: number
    description?: string
    user_name?: string
    name: string
}

const Gallery = () => {
    const supabase = useSupabaseClient()
    const width = useWindowWidth()
    const [images, setImages] = useState([])

    async function getImages() {
        const { data, error } = await supabase.storage
            .from('data')
            .list('images')

        if (data) {
            setImages(data)
        } else {
            throw alert(error + 'Error loading images!')
        }
    }
    useEffect(() => {
        getImages()
    }, [])

    return (
        <section id="gallery" className="h-auto">
            <div className="flex flex-col w-full h-auto max-w-screen-xl gap-4 py-24 mx-auto">
                <h2 className="mr-auto text-2xl text-white">Gallery</h2>
                <span className="w-40 h-px p-0 m-0 mr-auto md:w-52 xl:w-60 bg-accent"></span>
                <Swiper
                    className="mySwiper"
                    slidesPerView={width > 992 ? 2 : 1}
                    slidesPerGroup={width > 992 ? 2 : 1}
                    modules={[Navigation]}
                    navigation
                    loop
                >
                    {images &&
                        images.map((image: Image) => (
                            <SwiperSlide
                                key={image.id}
                                className="flex flex-col items-center h-full gap-8 w-fit"
                            >
                                <img
                                    aria-label="main image"
                                    src={CDNURL + image.name}
                                    alt={`image${image.id}`}
                                    className="object-cover w-full h-auto aspect-square max-w-[300px] md:max-w-[400px] xl:max-w-[500px]"
                                />
                                <p className="h-full text-white w-fit">
                                    {image.name.slice(0, -4)}
                                </p>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <span className="w-40 h-px p-0 m-0 ml-auto md:w-52 xl:w-60 bg-accent"></span>
            </div>
        </section>
    )
}

export default Gallery
