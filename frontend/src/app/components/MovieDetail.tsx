import React, { useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { MovieService } from '../services/movieService'
import { FindMovie_findMovie } from '../services/movieService/__generated__/FindMovie'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Modal from '@material-tailwind/react/Modal'
// @ts-ignore
import ModalHeader from '@material-tailwind/react/ModalHeader'
// @ts-ignore
import ModalBody from '@material-tailwind/react/ModalBody'
// @ts-ignore
import ModalFooter from '@material-tailwind/react/ModalFooter'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
/* eslint-enable */

export default function MovieDetail() {
    /**
     * Provides information about a spesific movie
     */
    const { id } = useParams<{ id: string }>()
    const movieService = new MovieService()
    const [movie, setMovie] = useState<FindMovie_findMovie>()
    const [showModal, setShowModal] = React.useState(true)
    let queryResult: React.SetStateAction<
        FindMovie_findMovie | undefined
    > | null = null

    useEffect(() => {
        async function fetchMovie() {
            queryResult = await movieService.findMovie(id)
            setMovie(queryResult)
        }

        fetchMovie().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, [])

    useEffect(() => {
        setShowModal(true)
    }, [movie, setMovie])

    if (!showModal) {
        return <Redirect to="/" />
    }

    return (
        <Modal
            size="regular"
            active={showModal}
            toggler={() => setShowModal(false)}
        >
            <ModalHeader toggler={() => setShowModal(false)}>
                {movie?.title}
            </ModalHeader>

            <ModalBody>
                <p className="text-base leading-relaxed text-gray-600 font-light mb-10">
                    Released: {movie?.published}
                </p>
                <p className="text-base leading-relaxed text-gray-600 font-normal">
                    {movie?.description}
                </p>
            </ModalBody>

            <ModalFooter>
                <Link to={'/'}>
                    <Button
                        color="red"
                        buttonType="link"
                        toggler={() => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </Link>
            </ModalFooter>
        </Modal>
    )
}
