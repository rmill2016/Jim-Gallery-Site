import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaFile, FaArrowDown } from 'react-icons/fa'

export default function Contribute() {
    const router = useRouter()
    const form = useRef(null)
    const [email, setEmail] = useState<string>('')
    const [images, setImages] = useState<File>(null)
    const [preview, setPreview] = useState<string>('')
    const user = useUser()
    const supabase = useSupabaseClient()

    async function Login() {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
        })
    }

    async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        let file = e.target.files[0]

        setImages(file)
        setPreview(URL.createObjectURL(file))
    }

    async function postData(e: any) {
        e.preventDefault()

        if (images == null) {
            return alert('Please upload an image!')
        }
        alert('Image uploaded!')
        const { data, error } = await supabase.storage
            .from('data')
            .upload(`images/${images.name}`, images)

        if (data) {
            console.log(data)
            form.current.value = ''
            window.location.reload()
        } else {
            throw error
        }
    }

    return (
        <section id="contribute" className="scroll-mt-24">
            {user === null ? (
                <>
                    <div className="flex flex-col items-center justify-start w-full h-full max-w-screen-md gap-8 pt-40 mx-auto">
                        <h2 className="text-2xl font-semibold text-white">
                            Interested in contributing? Enter your email below!
                        </h2>
                        <form
                            className="flex border border-slate-200 rounded-xl w-[400px]"
                            aria-label="signup-form"
                        >
                            <div className="flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 text-white bg-transparent outline-none"
                                    accept="image/*"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                className="flex-shrink-0 p-3 text-white bg-transparent border-t border-b border-l border-white rounded-xl"
                                onClick={Login}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2 className="mx-auto mb-8 text-2xl text-white w-fit">
                            User signed in as: {user.email}
                        </h2>
                        <form
                            className="flex flex-col w-full max-w-lg gap-8 mx-auto border border-white h-1/2 rounded-xl"
                            aria-label="upload form"
                        >
                            <div className="flex flex-col w-full h-full gap-4">
                                <label
                                    htmlFor="file"
                                    className="inline-flex items-center justify-start gap-4 p-4 text-2xl text-white fill-white"
                                >
                                    Upload Image{' '}
                                    <FaArrowDown className=" animate-bounce" />
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    ref={form}
                                    accept="image/*"
                                    multiple={false}
                                    className="w-full h-auto"
                                    onChange={(e) => uploadImage(e)}
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt={images ? images.name : null}
                                        className="w-40 h-auto mx-auto bg-cover"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between w-full h-fit">
                                <button
                                    className="w-32 h-auto text-white bg-transparent border border-white aspect-video rounded-xl hover:bg-white hover:text-black hover:transition-colors hover:duration-500"
                                    onClick={postData}
                                >
                                    Upload
                                </button>
                                <button
                                    className="w-32 h-auto text-red-500 bg-transparent border border-red-500 aspect-video rounded-xl hover:bg-red-500 hover:text-black hover:transition-colors hover:duration-500"
                                    onClick={() =>
                                        function () {
                                            form.current.value = null
                                            window.location.reload()
                                        }
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </section>
    )
}
