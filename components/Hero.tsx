import React from 'react'
import { FaArrowDown, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import { staggerChildren, fadeIn } from '../helpers/transitions'

const Hero = () => {
    return (
        <section id="home" className="relative">
            <img
                src="assets/background.png"
                alt="background"
                className="absolute inset-0 h-full w-auto max-w-fit bg-center bg-cover -z-[1] xl:max-w-full xl:w-full xl:h-screen"
            />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary to-transparent -z-[1]"></div>
            <div
                className="absolute bottom-0 left-0 w-32 h-auto aspect-square bg-primary md:w-64 xl:w-80 overflow-clip"
                style={{ clipPath: 'circle(100% at 0 100%)' }}
            ></div>
            <AnimatePresence>
                <div className="flex flex-col items-center justify-center h-full gap-4 mx-auto w-fit md:grid md:grid-cols-[auto_1fr_auto] md:grid-flow-row md:w-full max-w-screen-xl">
                    <motion.div
                        className="items-start justify-center hidden gap-4 mb-40 text-white h-fit md:flex w-fit md:items-center "
                        initial={{ opacity: 0, x: -20, rotate: 90 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: 'spring',
                                stiffness: 50,
                                duration: 0.3,
                            },
                        }}
                    >
                        <h4>Contact</h4>{' '}
                        <a href="#">
                            <FaLinkedin size={'20px'} />
                        </a>
                        <a href="#">
                            <FaEnvelope size={'20px'} />
                        </a>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-start justify-center gap-6 mx-auto w-fit h-fit"
                        variants={staggerChildren}
                        initial="hide"
                        animate="show"
                    >
                        <motion.h4
                            className="text-lg tracking-wider uppercase text-accent pl-14 md:text-2xl xl:text-3xl leading-accent"
                            variants={fadeIn}
                        >
                            A Trip To Memory Lane
                        </motion.h4>
                        <motion.h1
                            className="text-3xl font-bold tracking-wide text-white capitalize md:text-5xl xl:text-6xl"
                            variants={fadeIn}
                        >
                            welcome to iowa, <br /> a place for family &<br />
                            friends
                        </motion.h1>
                        <motion.h4
                            className="inline-flex items-center w-auto gap-3 text-lg text-white h-fit md:text-2xl xl:text-3xl"
                            variants={fadeIn}
                        >
                            Scroll Down
                            <FaArrowDown className="animate-bounce" />
                        </motion.h4>
                    </motion.div>
                    <motion.div
                        className="relative flex-col items-end justify-start hidden gap-4 mb-40 text-white md:flex after:absolute after:w-2 after:h-full after:bg-white after:opacity-25 h-fit after:left-auto after:-right-4"
                        variants={fadeIn}
                        initial="hide"
                        animate="show"
                    >
                        <a href="/">
                            <h4 className="link-t-b">Browse</h4>
                        </a>
                        <a href="#intro1">
                            <h4 className="link-t-b">01</h4>
                        </a>
                        <a href="#intro2">
                            <h4 className="link-t-b">02</h4>
                        </a>
                        <a href="#intro3">
                            <h4 className="link-t-b">03</h4>
                        </a>
                        <a href="#gallery">
                            <h4 className="link-t-b">Gallery</h4>
                        </a>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-start w-full gap-3 text-white h-fit md:hidden"
                        variants={staggerChildren}
                        initial="hide"
                        animate="show"
                    >
                        <motion.div
                            className="inline-flex items-center justify-start gap-4 fill-white"
                            variants={fadeIn}
                        >
                            <h4>Contact</h4>{' '}
                            <a href="#">
                                <FaLinkedin size={'20px'} />
                            </a>
                            <a href="#">
                                <FaEnvelope size={'20px'} />
                            </a>
                        </motion.div>
                        <motion.div
                            className="relative inline-flex items-center justify-start gap-4 after:absolute after:-bottom-[10px] after:left-0 after:w-full after:bg-white after:opacity-25 after:h-1"
                            variants={fadeIn}
                        >
                            <a href="/">
                                <h4 className="link-l-r after:h-1">Browse</h4>
                            </a>
                            <a href="#intro1">
                                <h4 className="link-l-r after:h-1">01</h4>
                            </a>
                            <a href="#intro2">
                                <h4 className="link-l-r after:h-1">02</h4>
                            </a>
                            <a href="#intro3">
                                <h4 className="link-l-r after:h-1">03</h4>
                            </a>
                            <a href="#gallery">
                                <h4 className="link-l-r after:h-1">Gallery</h4>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </section>
    )
}

export default Hero
