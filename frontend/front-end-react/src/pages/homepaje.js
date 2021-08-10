import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import Room from "../components/room/room";
import CreateRoomPage from "./create-room-page";
import RoomJoinPage from "./room-join-page";

const HomePage = () => {

    const renderHomePage = () => {
        return (
            <Grid container spacing={3} align='center'>
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">House Party</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

    return ( 
        <Router>
            <Switch>
                <Route exact path="/">
                    {renderHomePage}
                </Route>
                <Route path="/join" component={RoomJoinPage} />
                <Route path="/create" component={CreateRoomPage} />
                <Route path="/room/:roomCode" component={Room} />
            </Switch>
        </Router>

     );
}
 
export default HomePage;