import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {

    const [votesToSkip, setvotesToSkip] = useState(2)
    const [guestCanPause, setguestCanPause] = useState(false)
    const [isHost, setisHost] = useState(false)
    const { roomCode } = useParams()

    useEffect(() => {
        
        const getRoomDetails = async () => {
            await axios.get(`http://localhost:8000/api/get-room?code=${roomCode}`)
                .then(({data}) => 
                    {
                        console.log(data);
                        setvotesToSkip(data.votes_to_skip)
                        setguestCanPause(data.guest_can_pause)
                        setisHost(data.is_host)
                    }
                )
        }    

        getRoomDetails();
    }, [roomCode]);

    return ( 
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div> );
}
 
export default Room;