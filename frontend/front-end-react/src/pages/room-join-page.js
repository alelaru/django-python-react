import { Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert"

const RoomJoinPage = () => {

    const [roomCode, setRoomCode] = useState("")
    const [error, seterror] = useState("")
    const history = useHistory()

    const handleJoinRoom = async() => {

        console.log('http://localhost:8000/api/join-room');
        await axios.post(`http://localhost:8000/api/join-room`, `code=${roomCode}`)
            .then((res) => {
                console.log(res.data);

                history.push(`/room/${roomCode}`)
            }).catch(e => {
                console.log(e.message);
                seterror("Check the name of the room again and try again")
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
                    error={error.length > 0} 
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