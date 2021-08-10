import { useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {

    const [votesToSkip, setvotesToSkip] = useState(2)
    const [guestCanPause, setguestCanPause] = useState(false)
    const [isHost, setisHost] = useState(false)
    const { roomCode } = useParams()

    return ( 
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause}</p>
            <p>Host: {isHost}</p>
        </div> );
}
 
export default Room;