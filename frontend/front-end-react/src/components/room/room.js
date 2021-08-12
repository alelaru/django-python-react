import { Button, Grid, Modal, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateRoomPage from "../../pages/create-room-page";
import '../../App.css';
import CreateEditForm from "../create-edit-form/create-edit-form";
import Image from "./close.png"

const Room = () => {

    const [votesToSkip, setvotesToSkip] = useState(2)
    const [guestCanPause, setguestCanPause] = useState(false)
    const [isHost, setisHost] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
    }, [roomCode, guestCanPause, votesToSkip]);

    const editRoom = async (votes, pause) =>{
        console.log("votes", votes);
        console.log("pause", pause);
        console.log("votes", roomCode);
        console.log(`http://localhost:8000/api/update-room/code=${roomCode}`);
        await axios.patch(`http://localhost:8000/api/update-room?code=${roomCode}`, {'guest_can_pause': pause, 'votes_to_skip': votes, 'code': roomCode})
            .then((res) => {
                console.log("The update was successfull");
                setIsModalOpen(!isModalOpen)
                setguestCanPause(pause)
                setvotesToSkip(votes)
            })
            .catch(e =>
             {
                console.log("There is an error with your request",e.message)
                console.log("No se pudo mandar esta verga")
             })
    }

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
                <Button variant="contained" color="primary" onClick={({target}) => setIsModalOpen(!isModalOpen)}>Settings</Button>
                <Modal
                    open={isModalOpen}
                    onClose
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {
                        <div className="modal">
                        <Grid item xs={12}>
                            <div className="img-container">
                            <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                                <img className="img" src={Image} alt="close"></img>
                            </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                                <CreateEditForm handleButtonPressed={editRoom} text="Edit"></CreateEditForm >
                        </Grid>
                        </div>

                    }
                </Modal>
            </Grid>   
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" to="/" component={Link}>Leave Room</Button>
            </Grid>      
        </Grid>
    );
}
 
export default Room;