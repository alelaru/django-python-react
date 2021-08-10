import { Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const RoomJoinPage = () => {

    const [roomCode, setRoomCode] = useState("")
    const [error, seterror] = useState("")
    const history = useHistory()

    const handleJoinRoom = async() => {

        console.log('http://localhost:8000/api/join-room');
        await axios.post(`http://localhost:8000/api/join-room`, `code=${roomCode}`)
            .then((res) => {
                console.log(res.data);
                setRoomCode("")
                seterror("")
                history.push(`/room/${roomCode}`)
            }).catch(e => {
                console.log("Entraron en error");
                console.log(e.message);
            })

    }

    return ( 

        <Grid container spacing={1} align='center'>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    error={error} 
                    label="code" 
                    placeholder="Enter a Room Code" 
                    value={roomCode} 
                    helperText={error} 
                    variant="outlined"
                    onChange={({target}) => setRoomCode(target.value)}
                    />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleJoinRoom}>Enter Room</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>

     );
}
 
export default RoomJoinPage;