import { FormControl, FormHelperText, Radio, RadioGroup, Typography, FormControlLabel, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import { useState } from "react";
import { Link } from "react-router-dom";


const CreateRoomPage = () => {

    const defaultVotes = 2;
    const [guestCanPause, setguestCanPause] = useState(true)
    const [votesToSkip, setvotesToSkip] = useState(defaultVotes)

    const handleCreateRoomBotton = (e) => {
        e.preventDefault();

        console.log("Entré");
    }

    return ( 
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl components="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                        <RadioGroup row default='true' onChange={({target}) => setvotesToSkip(target.value === 'true' ? true : false)}>
                            <FormControlLabel 
                                value='true' 
                                control={<Radio color="primary"/>}
                                label="Play/Pause"
                                labelPlacement="bottom">
                            </FormControlLabel>
                            <FormControlLabel 
                                value='false' 
                                control={<Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom">
                            </FormControlLabel>                    
                        </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        defaultValue={defaultVotes}
                        inputProps={{
                            min:1,
                            style: {textAlign: "center"},
                        }} 
                        onChange={({target}) => setvotesToSkip(target.value)}
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={handleCreateRoomBotton} color="primary" variant="contained">Create a Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
     );
}
 
export default CreateRoomPage;