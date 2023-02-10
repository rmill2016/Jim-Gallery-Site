import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { menuTransition, menuLinks } from '../helpers/transitions'
import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

let navLinks = [
    {
        id: 1,
        name: 'Home',
        to: '/',
    },
    {
        id: 2,
        name: 'Gallery',
        to: '#gallery',
    },
    {
        id: 3,
        name: 'Contribute',
        to: '#contribute',
    },
]

function Header() {
    const [toggleMenu, setMenu] = useState(false)

    useEffect(() => {
        if (toggleMenu) {
            document.body.style.overflow = 'hidden'
            document.querySelectorAll('section').forEach((section) => {
                section.classList.add('brightness-[30%]')
            })
        } else {
            document.body.style.overflow = ''
            setTimeout(() => {
                document.querySelectorAll('section').forEach((section) => {
                    section.classList.remove('brightness-[30%]')
                })
            }, 1000)
        }
    }, [toggleMenu])

    return (
        <>
            <header className="fixed z-20 w-full h-24 bg-transparent">
                <nav className="flex items-center justify-between w-full h-full lg:hidden">
                    <div className="h-auto w-fit">
                        <img src="/assets/icon-logo.png" alt="logo" />
                    </div>
                    <div className="h-auto w-fit">
                        {!toggleMenu ? (
                            <FaBars
                                aria-label="menu"
                                onClick={() => setMenu(!toggleMenu)}
                                className="w-8 h-auto aspect-square fill-white"
                            />
                        ) : (
                            <MdClose
                                aria-label="close menu"
                                onClick={() => setMenu(!toggleMenu)}
                                className="w-10 h-auto aspect-square fill-white"
                            />
                        )}
                    </div>
                </nav>
                <nav className="items-center justify-between hidden w-full h-full max-w-screen-xl mx-auto lg:flex">
                    <div className="h-auto w-fit">
                        <img
                            src="assets/icon-logo.png"
                            alt="logo"
                            className="w-full h-auto"
                        />
                    </div>
                    <ul className="inline-flex justify-end w-full gap-8 text-white list-none">
                        {navLinks.map((value) => (
                            <a key={value.id} href={value.to}>
                                <li className="link-l-r">{value.name}</li>
                            </a>
                        ))}
                    </ul>
                </nav>
            </header>
            <AnimatePresence>
                <motion.aside
                    className="fixed z-30 h-full bg-primary "
                    variants={menuTransition}
                    initial="hide"
                    animate={toggleMenu ? 'show' : 'hide'}
                >
                    <ul
                        className={
                            'list-none flex flex-col gap-8 justify-center items-center w-full h-full'
                        }
                    >
                        {navLinks.map((value) => (
                            <motion.a
                                key={value.id}
                                href={value.to}
                                variants={menuLinks}
                                style={
                                    !toggleMenu
                                        ? { pointerEvents: 'none' }
                                        : { pointerEvents: 'auto' }
                                }
                                onClick={() =>
                                    setTimeout(() => setMenu(!toggleMenu), 750)
                                }
                            >
                                <li className="text-2xl text-white link-l-r">
                                    {value.name}
                                </li>
                            </motion.a>
                        ))}
                    </ul>
                </motion.aside>
            </AnimatePresence>
        </>
    )
}

export default Header
