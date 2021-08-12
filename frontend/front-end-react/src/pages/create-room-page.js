import { FormControl, FormHelperText, Radio, RadioGroup, Typography, FormControlLabel, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import CreateEditForm from "../components/create-edit-form/create-edit-form";

const CreateRoomPage = () => {

    const history = useHistory()

    const handleCreateRoomBotton = async ( votesToSkip, guestCanPause) => {

        await axios.post('http://localhost:8000/api/create-room', {'guest_can_pause': guestCanPause, 'votes_to_skip': votesToSkip})
        // await axios(options)
            .then((res) => {
                // setguestCanPause(true)
                // setvotesToSkip(defaultVotes)
                history.push(`/room/${res.data.code}`)
            })
            .catch(e =>
             {
                console.log("There is an error with your request",e.message)
                console.log("Hey Im here")
             })

        console.log("Entré");
    }

    return ( 

        <>

            <CreateEditForm handleButtonPressed={handleCreateRoomBotton} text="Create"></CreateEditForm>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </>


     );
}
 
export default CreateRoomPage;