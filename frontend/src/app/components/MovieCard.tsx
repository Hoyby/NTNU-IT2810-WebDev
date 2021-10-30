import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route, Switch } from 'react-router-dom'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Card from '@material-tailwind/react/Card'
// @ts-ignore
import CardBody from '@material-tailwind/react/CardBody'
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
    let shortDesc = description.split(' ').slice(0, 12).join(' ')
    if (description.length > shortDesc.length) shortDesc += '...'

    return (
        <div className="w-80">
            <Link to={'/movies/' + _id} key={_id}>
                <Card>
                    <CardBody>
                        <H6>{title}</H6>
                        <Paragraph color="gray">{shortDesc}</Paragraph>
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
