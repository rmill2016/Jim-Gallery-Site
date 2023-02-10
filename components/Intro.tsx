import React, { useEffect, useState, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'
import { staggerChildren, fadeIn } from '../helpers/transitions'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { CDNURL } from '../pages'

function Intro() {
    const supabase = useSupabaseClient()
    const [loading, isLoading] = useState<boolean>(true)
    const [images, setImages] = useState([])
    const container = useRef(null)
    const target = useRef(null)
    const isInView = useInView(target, {
        root: container.current,
        margin: '-10% 0px',
        once: true,
    })

    async function getImages() {
        const { data, error } = await supabase.storage
            .from('data')
            .list('images')

        if (data) {
            setImages(data.slice(0, 3))
        } else {
            throw alert(error + 'Error loading images!')
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    return (
        <section ref={container} className="h-auto ">
            <div className="relative flex flex-col items-start justify-start w-full h-full max-w-screen-xl gap-20 mx-auto">
                <span
                    className="absolute top-0 w-px h-px left-1/2"
                    ref={target}
                />
                {images &&
                    images.map((image, index) => (
                        <div
                            key={index + 1}
                            id={`intro${index + 1}`}
                            className="flex flex-col items-center w-full h-full gap-8 px-4 first:pt-20 scroll-mt-20 md:grid md:grid-cols-2 md:grid-flow-row-dense md:place-items-center"
                        >
                            <motion.div
                                className="relative flex flex-col gap-4 mx-auto w-fit h-fit"
                                variants={staggerChildren}
                                initial="hide"
                                animate={isInView ? 'show' : 'hide'}
                            >
                                <motion.span
                                    className="absolute top-0 left-0 text-white opacity-25 text-[10rem]"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={
                                        isInView
                                            ? {
                                                  opacity: 0.25,
                                                  y: 20,
                                                  transition: {
                                                      delay: 0.6,
                                                      type: 'spring',
                                                      stiffness: 50,
                                                      duration: 0.5,
                                                  },
                                              }
                                            : { opacity: 0, y: -20 }
                                    }
                                >
                                    0{index + 1}
                                </motion.span>
                                <motion.h4
                                    className="text-base tracking-wider uppercase pl-14 text-accent leading-accent md:text-lg xl:text-2xl"
                                    variants={fadeIn}
                                >
                                    info
                                </motion.h4>
                                <motion.h2
                                    className="text-2xl text-white md:text-4xl xl:text-5xl"
                                    variants={fadeIn}
                                >
                                    {image.name.slice(0, -4)}
                                </motion.h2>
                                <motion.h4
                                    className="max-w-md text-sm text-white whitespace-pre-wrap md:text-base xl:text-lg"
                                    variants={fadeIn}
                                >
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Corrupti atque impedit
                                    ullam in numquam aperiam dolore iusto
                                    dignissimos! Nemo numquam, perspiciatis
                                    repellendus atque vel quidem veritatis
                                    deserunt odit ratione quam alias nihil
                                    delectus, modi eum. Itaque at, dolorem fuga
                                    placeat sed, architecto quidem cumque error
                                    explicabo quod odio qui saepe.
                                </motion.h4>
                                <motion.h4
                                    className="inline-flex gap-3 text-base text-accent fill-accent md:text-lg xl:text-2xl"
                                    variants={fadeIn}
                                >
                                    See More <FaArrowRight size={'20px'} />
                                </motion.h4>
                            </motion.div>
                            <div className="h-auto w-fit ">
                                <motion.img
                                    src={CDNURL + image.name}
                                    alt={image.name.slice(0, -4)}
                                    className="w-full h-full mx-auto max-w-[250px] md:max-w-[350px] xl:max-w-[450px] max-h-[500px]"
                                    variants={fadeIn}
                                    initial="hide"
                                    animate={isInView ? 'show' : 'hide'}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default Intro
