import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom'
import {useSelector} from "react-redux";
import PopUp from './PopUp.jsx';
import SharePopUp from './SharePopUp'
import ForkForm from './ForkForm'


export default function MapCard () {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [forkForm, setForkForm] = useState(false);
    const openPopup = () => {
        setPopupOpen(true);
    };
    const openShare = () => {
        setShareOpen(true);
    };
    const closeShare = () => {
        setShareOpen(false);
    };
    const closePopup = () => {
        setPopupOpen(false);
    };

    const openForkForm = () => {
        setForkForm(true);
    }
    const closeForkForm = () => {
        setForkForm(false);
    }

    const handleTagClick = () =>{
        console.log("tag was clicked")
    }

    const handleLike = () =>{
        console.log("map was liked")
        if(!loggedIn){
            setPopUpTitle("To like a map, please create an account");
            openPopup();
            return;
        }
    }
    const handleShare = () =>{
        openShare();
        return;
    }
    const handleFork = () =>{
        console.log(loggedIn)
        if(!loggedIn){
            setPopUpTitle("To fork a map, please create an account");
            openPopup();
            return;
        }
        else{
            openForkForm();
        }
    }
    const handleBookmark = () =>{
        if(!loggedIn){
            setPopUpTitle("To bookmark, please create an account");
            openPopup();
            return;
        }
    }

    return(
        <div className = "mapCard">
            <Card sx={{ maxWidth: 300}}>
                <CardActionArea component={RouterLink} to={'/MapView'}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Link className = "map-card-user-link" href = "ExplorePage#" underline = "hover" sx = {{ fontSize:'10px'}}>
                            @john123
                        </Link>
                        <Typography gutterBottom variant="h5" className = "dark-mode-labels">
                            Election Results
                        </Typography>
                        <Typography variant = "h8" component = "div" className = "dark-mode-labels">
                            This is my description of the most recent election results
                        </Typography>
                    </CardContent>
                    <div className = "tags">
                        <Chip className = "tag" label="Chorpleth" sx={{mb:1 ,ml: 1}} onClick={handleTagClick}/>
                        <Chip className = "tag"label="United States" sx={{mb:1  ,ml: 1}}  onClick={handleTagClick} />
                        <Chip className = "tag" label="Election"sx={{mb:1  ,ml: 1}}  onClick={handleTagClick} />
                        <Chip className = "tag" label="Map" sx={{mb:1  ,ml: 1}}  onClick={handleTagClick}/>
                    </div>

                </CardActionArea>
                <CardActions>
                    <IconButton >
                        <ThumbUpOffAltIcon  onClick = {handleLike}/>
                    </IconButton>
                    <IconButton>
                        <ShareIcon  onClick = {handleFork}/>
                    </IconButton>
                    <IconButton>
                        <IosShareIcon onClick = {handleShare}/>
                    </IconButton>
                    <IconButton>
                        <BookmarkBorderIcon  onClick = {handleBookmark}/>
                    </IconButton>
                </CardActions>
            </Card>
            {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle} className="custom-popup"/>}
            {forkForm && <ForkForm open = {forkForm} onClose = {closeForkForm}/>}
            {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}

        </div>
    );
}
