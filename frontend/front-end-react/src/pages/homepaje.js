import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Room from "../components/room/room";
import CreateRoomPage from "./create-room-page";
import RoomJoinPage from "./room-join-page";


const HomePage = () => {
    return ( 
        <Router>
            <Switch>
                <Route exact path="/">
                    <p>This is the Home Page</p>
                </Route>
                <Route path="/join" component={RoomJoinPage} />
                <Route path="/create" component={CreateRoomPage} />
                <Route path="/room/:roomCode" component={Room} />
            </Switch>
        </Router>

     );
}
 
export default HomePage;