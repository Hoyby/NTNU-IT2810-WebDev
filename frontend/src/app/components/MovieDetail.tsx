import React, {useEffect, useState} from 'react'
import {Link, Redirect, useParams} from "react-router-dom";
import { MovieService } from "../services/movieService";
import {FindMovie_findMovie} from "../services/movieService/__generated__/FindMovie";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Modal from "@material-tailwind/react/Modal";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ModalHeader from "@material-tailwind/react/ModalHeader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ModalBody from "@material-tailwind/react/ModalBody";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ModalFooter from "@material-tailwind/react/ModalFooter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Button from "@material-tailwind/react/Button";

export default function MovieDetail() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = useParams();
    const movieService = new MovieService()
    const [movie, setMovie] = useState<FindMovie_findMovie>();
    const [showModal, setShowModal] = React.useState(true);
    let queryResult: React.SetStateAction<FindMovie_findMovie | undefined> | null = null

    useEffect(() => {
        async function fetchMovie() {
            queryResult = await movieService.findMovie(id)
            setMovie(queryResult)
        }

        fetchMovie().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, );

    useEffect(() => {
        setShowModal(true)
    }, [movie, setMovie]);

    const closeModal = () => {
        setShowModal(false)
    }

    if (!showModal) {
        return <Redirect to='/'/>
    }

    return (
        <>
            {/*
             <h1>{id}</h1>
            <p> {movie ? movie.title : 'Something went wrong'}</p>
             */}
            <Modal size="regular" active={showModal} toggler={closeModal}>
                <ModalHeader toggler={closeModal}>
                    {movie ? movie.title : 'Loading...'}
                </ModalHeader>

                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        {movie ? movie.description : ''}
                    </p>
                </ModalBody>

                <ModalFooter>
                    <Link to={'/'}>
                        <Button
                            color="red"
                            buttonType="link"
                            onClick={closeModal}
                            ripple="dark"
                        >
                            Close
                        </Button>
                    </Link>

                    {/*
                    <Button
                        color="green"
                        onClick={() => setShowModal(false)}
                        ripple="light"
                    >
                        Save Changes
                    </Button>
                    */}
                </ModalFooter>
            </Modal>
        </>
    )
}
