import { FormControl, FormHelperText, Radio, RadioGroup, Typography, FormControlLabel, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"


const CreateRoomPage = () => {

    const defaultVotes = 2;

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
                        <RadioGroup row default='true'>
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
                        }} 
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
     );
}
 
export default CreateRoomPage;