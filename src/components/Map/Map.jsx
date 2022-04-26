import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
const Map = ({setCoordinates, setBounds, coordinates, places}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    // const [childClicked, setChildClicked] = useState(null)
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys = {{ key: 'AIzaSyCM35ywgh_dvN8AZkbyIRucE5uTloHsudE'}}
                defaultCenter = {coordinates}
                center = {coordinates}
                defaultZoom = {15}
                margin = {[50,50,50,50]}
                options={''}
                onChange={(e)=> {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child)=>{

                }}
                >
                {places?.map((place, i)=>(
                    <div className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}                    
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        src={place.photo ? place.photo.images.large.url: 'https://www.cuteeasydrawings.com/uploads/allimg/210825/1_210825093901_1.png'}
                                        alt={place.name} 
                                        className={classes.pointer} />
                                    <Rating size='small' value = {Number(place.rating)} readOnly/>
                                </Paper>
                            )
                            }

                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}
export default Map;