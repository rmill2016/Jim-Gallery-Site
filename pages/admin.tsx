import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { expandCenter } from '../helpers/transitions'
import Contribute from '../components/Contribute'
import {
    useSupabaseClient,
    useUser,
    useSession,
} from '@supabase/auth-helpers-react'
import { CDNURL } from '.'

function admin() {
    const user = useUser()
    const supabase = useSupabaseClient()
    const session = useSession()

    const [loading, isLoading] = useState<boolean>(true)
    const [images, setImages] = useState([])
    const [focus, setFocus] = useState<boolean>(false)
    const [focusImage, setFocusImage] = useState<string>('')
    const [showPrompt, setPrompt] = useState<boolean>(false)

    async function getImages() {
        isLoading(true)
        const { data, error } = await supabase.storage
            .from('data')
            .list('images', { sortBy: { column: 'name', order: 'asc' } })

        try {
            if (data) {
                setImages(data)
            } else {
                throw error
            }
        } catch (error) {
            alert('Error loading images!')
        } finally {
            isLoading(false)
        }
    }

    function View(index: number) {
        const expandedImage = document
            .getElementById(`image${index + 1}`)
            .getAttribute('src')
        console.log(expandedImage)
        setFocusImage(expandedImage)
        setFocus(true)
    }

    async function deleteImage(index: number) {
        let image = document
            .getElementById(`image${index + 1}`)
            .getAttribute('src')
            .replace(CDNURL, '')

        const { data, error } = await supabase.storage
            .from('data')
            .remove([`images/${image}`])

        if (data) {
            alert('Image deleted!')
            window.location.reload()
        } else {
            alert(error + 'Error deleting image')
        }
    }

    useEffect(() => {
        getImages()
    }, [user])

    return (
        <>
            <section className="w-full h-auto py-20 bg-primary">
                <h2 className="mx-auto text-2xl text-white w-fit">
                    List of Images
                </h2>
                <div className="grid w-full h-full grid-flow-row gap-14">
                    {images &&
                        images.map((image, index) => (
                            <div
                                key={index + 1}
                                className="grid w-full h-auto grid-cols-3 place-items-center"
                            >
                                <div className="flex flex-col items-center justify-start gap-4">
                                    <img
                                        src={CDNURL + image.name}
                                        alt={image.name}
                                        id={`image${index + 1}`}
                                        className="object-cover w-auto h-fit"
                                    />
                                    <p className="text-xl text-white">
                                        {image.name.slice(0, -4)}
                                    </p>
                                </div>
                                <button
                                    className="w-32 h-auto text-center text-black border border-black aspect-video bg-slate-400 rounded-xl"
                                    onClick={() => View(index)}
                                >
                                    View
                                </button>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <button
                                        className="inline-block w-auto h-auto px-4 py-2 text-white bg-red-500 border border-white aspect-video rounded-xl"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapseExample${
                                            index + 1
                                        }`}
                                        aria-expanded="false"
                                        aria-controls={`collapseExample${
                                            index + 1
                                        }`}
                                    >
                                        Delete / Cancel
                                    </button>
                                    <div
                                        className="collapse"
                                        id={`collapseExample${index + 1}`}
                                    >
                                        <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow-lg w-60">
                                            <p>
                                                Are you sure you want to delete{' '}
                                                {image.name.slice(0, -4)}?
                                            </p>

                                            <button
                                                className="h-auto px-6 py-3 mx-auto text-white bg-red-500 w-fit aspect-video rounded-xl"
                                                onClick={() =>
                                                    deleteImage(index)
                                                }
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <AnimatePresence>
                    {focus && (
                        <motion.div
                            className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-8 backdrop-brightness-75"
                            variants={expandCenter}
                            initial="hide"
                            animate={focus ? 'show' : 'hide'}
                        >
                            <MdClose
                                className="inline-block w-24 h-24 p-4 ml-auto cursor-pointer fill-white"
                                onClick={() => setFocus(false)}
                            />
                            <div className="grid w-full h-full place-items-center">
                                <motion.img
                                    src={focusImage}
                                    alt="preview image"
                                    className="w-full h-auto max-w-xl m-auto bg-cover"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.5,
                                            type: 'tween',
                                            ease: 'easeInOut',
                                            duration: 0.25,
                                        },
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <Contribute />
        </>
    )
}

export default admin
