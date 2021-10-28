import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Card from "@material-tailwind/react/Card";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardHeader from "@material-tailwind/react/CardHeader";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardRow from "@material-tailwind/react/CardRow";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardStatus from "@material-tailwind/react/CardStatus";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Icon from "@material-tailwind/react/Icon";
import {Link, Route, Switch} from "react-router-dom";
import MovieDetail from "./MovieDetail";

interface IMovie {
    _id: string,
    title: string
}

export function MovieCard({ title, _id }: IMovie) {

    return (
        <div>
            <Link to={
                '/movies/' + _id
            } key={_id}>
            <Card>
                <CardRow>
                    <CardHeader color="red" size="lg" iconOnly>
                        <Icon name="movie" size="5xl" color="white" />
                    </CardHeader>

                    <CardStatus title="Users" amount={title} />
                </CardRow>

                <CardStatusFooter color="green" amount="97%" date="Match"/>
            </Card>
            </Link>
            <Switch>
                <Route path="/movies/:id" children={<MovieDetail/>} />
            </Switch>
        </div>


    )
}