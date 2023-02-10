export const menuTransition = {
    hide: {
        width: 0,
        transition: {
            type: 'tween',
            duration: 0.5,
            staggerChildren: 0.3,
            staggerDirection: -1,
            delay: 1,
        },
    },
    show: {
        width: '60vw',
        transition: {
            type: 'tween',
            duration: 0.5,
            staggerChildren: 0.3,
            staggerDirection: 1,
            delayChildren: 0.5,
        },
    },
}

export const menuLinks = {
    hide: {
        opacity: 0,
        x: -20,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            ease: 'in-out',
        },
    },
}

export const staggerChildren = {
    hide: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
        },
    },
}

export const fadeIn = {
    hide: {
        opacity: 0,
        y: -20,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 0.5,
        },
    },
}

export const expandCenter = {
    hide: {
        opacity: 0,
        scale: 0,
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            origin: 'center',
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5,
        },
    },
}
