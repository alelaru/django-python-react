import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
        <Grid container spacing={1} align='center'>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Guest can pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" to="/" component={Link}>Leave Room</Button>
            </Grid>            
        </Grid>
    );
}
 
export default Room;