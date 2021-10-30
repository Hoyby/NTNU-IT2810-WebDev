import React, { useState } from 'react'
import movieService from '../services/movieService'
import {
    CreateMovieVariables,
} from '../services/movieService/__generated__/CreateMovie'

export default function MovieForm() {
    const [showCreateMovieForm, setshowCreateMovieForm] = useState(false)

    const [newMovie, setNewMovie] = useState<CreateMovieVariables>({
        title: '',
        description: '',
        published: NaN,
    })

    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const data = event.target

        if (data.name === 'published') {
            const publishedInt = parseInt(data.value)
            setNewMovie((prevState) => ({
                ...prevState,
                [event.target.name]: publishedInt,
            }))
        } else {
            setNewMovie((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }))
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.warn(newMovie.published, typeof newMovie.published)

        if (!newMovie.title) {

            return
        }

        movieService
            .createMovie(
                newMovie.title,
                newMovie.description,
                newMovie.published,
            )
            .catch((err: Error) => {
                console.error(err)
            })
    }

    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setshowCreateMovieForm(true)}
            >
                Add new movie
            </button>
            {showCreateMovieForm ? (
                <>
                    <div className=" justify-center items-center flex fixed inset-0 z-50">
                        {/*content*/}
                        <div className="mx-24 w-full max-w-screen-sm border-0 rounded-lg shadow-lg block bg-white">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                                <h3 className="text-black text-3xl">
                                    Add new movie
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl outline-none focus:outline-none"
                                    onClick={() =>
                                        setshowCreateMovieForm(false)
                                    }
                                >
                                    &#10006;
                                </button>
                            </div>
                            {/*body*/}

                            <div className="flex items-center justify-center px-2">
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full"
                                >
                                    <div className="px-6 py-8 rounded shadow-md text-black ">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="title"
                                            id="title"
                                            required
                                            placeholder="Pirates of the Caribbean: The Curse of the Black Pearl"
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="desc">
                                            Description
                                        </label>
                                        <textarea
                                            className="block border border-grey-light w-full max-h-40 p-3 rounded mb-4"
                                            name="description"
                                            id="description"
                                            required
                                            placeholder="Summary"
                                            onChange={handleInputChange}
                                        />

                                        <label htmlFor="published">
                                            Published
                                        </label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max="2099"
                                            step="1"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            id="published"
                                            name="published"
                                            required
                                            placeholder="2003"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() =>
                                                setshowCreateMovieForm(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={() =>
                                                setshowCreateMovieForm(true)
                                            }
                                        >
                                            Create Movie
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
