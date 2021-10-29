import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route, Switch } from 'react-router-dom'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Card from '@material-tailwind/react/Card'
// @ts-ignore
import CardHeader from '@material-tailwind/react/CardHeader'
// @ts-ignore
import CardBody from '@material-tailwind/react/CardBody'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
// @ts-ignore
import Paragraph from '@material-tailwind/react/Paragraph'
// @ts-ignore
import CardFooter from '@material-tailwind/react/CardFooter'
// @ts-ignore
import H6 from '@material-tailwind/react/Heading6'
/* eslint-enable */

interface IMovie {
    _id: string
    title: string
    description: string
}

export function MovieCard({ title, description, _id }: IMovie) {
    return (
        <div className="w-80 m-5">
            <Link to={'/movies/' + _id} key={_id}>
                <Card>
                    <CardBody>
                        <H6>{title}</H6>
                        <Paragraph color="gray">
                            {description.split(' ').slice(0, 12).join(' ')}
                        </Paragraph>
                    </CardBody>

                    <CardFooter>
                        <p className="text-red-500">Read More</p>
                    </CardFooter>
                </Card>
            </Link>
            <Switch>
                <Route path="/movies/:id" children={<MovieDetail />} />
            </Switch>
        </div>
    )
}
