import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid , Typography, Paper, Divider} from "@material-ui/core";
import hero_bg from '../../assets/hero-bg.jpeg';
import { yellow } from "@material-ui/core/colors";
import SchoolIcon from '@material-ui/icons/School';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { MapContainer, TileLayer, Popup, Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import GradeIcon from '@material-ui/icons/Grade';
import ua from "../../assets/ua.png"
import osu from "../../assets/osu.png"
import { Avatar } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import { Card,  CardActions, Button, CardMedia, CardContent,  } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import WorkIcon from '@material-ui/icons/Work';
import EmailIcon from '@material-ui/icons/Email';
import { GitHub } from '@material-ui/icons';
import { LinkedIn } from '@material-ui/icons';
function Skill(props){
  const [value, setValue]  = useState(0)
  useEffect(() => {
    setValue(props.value)
  })
  return (
    <div>
    <div style = {{display:"flex", justifyContent:"space-between"}}>
    <Typography color = "textSecondary"> {props.skill}</Typography>
    <Typography> {props.value}% </Typography>
    </div>
    <LinearProgress variant="determinate" value={value} />
    </div>
  )
}



const cardUseStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 300,
  },
});

 function MyCard() {
  const classes = cardUseStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image= {hero_bg}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2" gutterBottom>
            iOS & Web Developer
          </Typography>
          <div style = {{display:"inline-flex"}}>
          <a href = "https://github.com/HarryChen1995" style = {{textDecoration:"none", margin:10}}><GitHub style = {{color:"black", fontSize:30}}/></a>
          <a href = "https://www.linkedin.com/in/hanlin-chen-41663b139/" style = {{textDecoration:"none", margin:10}}><LinkedIn style = {{color:"black", fontSize:33}}/></a>
         </div>
          <Typography  align = "left" variant="h6" color = "textPrimary" gutterBottom>
            Programming Languages
          </Typography>
          <Grid container spacing = {2}>
            <Grid item xs = {6}><Skill skill = "Python" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "JavaScript" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "Dart" value = {50} /></Grid>
            <Grid item xs = {6}><Skill skill = "Swift" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "C++" value = {70} /></Grid>
            <Grid item xs = {6}><Skill skill = "C#" value = {90} /></Grid>
          </Grid>
          <Typography style = {{marginTop:10}} variant="h6" align = "left" color = "textPrimary" gutterBottom>
            Libraries / Frameworks
          </Typography>
          <Grid container spacing = {2}>
            <Grid item xs = {6}><Skill skill = "Tensorflow" value = {80} /></Grid>
            <Grid item xs = {6}><Skill skill = "SwiftUI" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "Django" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "React" value = {100} /></Grid>
            <Grid item xs = {6}><Skill skill = "Flutter" value = {50} /></Grid>
            <Grid item xs = {6}><Skill skill = "UIkit" value = {60} /></Grid>
          </Grid>
          <Typography style = {{marginTop:10}} variant="h6" align = "left" color = "textPrimary" gutterBottom>
            Cloud
          </Typography>
          <Grid container spacing = {2}>
            <Grid item xs = {6}><Skill skill = "AWS" value = {80} /></Grid>
            <Grid item xs = {6}><Skill skill = "Azure" value = {100} /></Grid>
          </Grid>
            <Grid style = {{marginTop:30}} container spacing = {2}>
            <Grid item xs = {6}>
           <div style = {{display:"flex", justifyContent:"flex-start"}}>
            <PhoneIphoneIcon/>
            <Typography>&nbsp; +13304073152</Typography>
           </div>
          </Grid>
            <Grid item xs = {6}>
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
            <HomeWorkIcon />
            <Typography>&nbsp; Columbus Ohio</Typography>
           </div>
            </Grid>
            <Grid item xs = {12} md = {6}>
           <div style = {{display:"flex", justifyContent:"flex-start"}}>
            <EmailIcon/>
            <Typography>&nbsp; harrychen1995@yahoo.com </Typography>
           </div>
          </Grid>
            <Grid item xs = {12} md = {6}>
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
            <WorkIcon />
            <Typography>&nbsp; InvoiceCloud - Full Time </Typography>
           </div>
            </Grid>
          </Grid>
        </CardContent>
      <CardActions>
      <a style={{ textDecoration: 'none' }} href="mailto:harrychen1995@yahoo.com"> <Button size="small" color="primary">Send Me Email</Button></a>
      </CardActions>
    </Card>
  );
}






function Map(props){
    const position = props.coordinates

  return (
    <div >
    <MapContainer style = {{ marginTop:5, width:"100%", height:300}} center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
      <Popup>
        {props.popover}
      </Popup>
    </Marker>
  </MapContainer>
  </div>
  );
};



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:50
    },
    profile_image:{
        maxWidth: "100%"
    },
    paper:{
        padding:20
    },
    icons:{
        fontSize:30,
        marginRight:5
    }
  }));

  const accordionUseStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  


 function EducationAccordion() {
    const classes = accordionUseStyles;
  
    return (
      <div className={classes.root}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          > 
          <div style = {{display:"flex", alignItems:"center"}}>
            <Avatar src = {ua}/>
            <Typography className={classes.heading}>&nbsp; University of Arizona</Typography>
          </div>
          </AccordionSummary>
          <AccordionDetails>
              <Grid container>
                  <Grid  style = {{marginBottom:1}} item xs = {12}>
                  <Typography style = {{fontSize:16, marginBottom:10}} color = "textSecondary" gutterBottom>Bachelor of Science in Electircal and Computer Engineering & Applied Math</Typography>
                  </Grid>
                  <Grid display = "flex" alignItems = "center" item xs = {12}>
                 <div style = {{display:"inline-flex"}}>
                  <EventIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp; Aug 2014 - May 2018&nbsp;</Typography> 
                  </div>
                  <div style = {{display:"inline-flex"}}>
                  <LocationOnIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp;Tucson, AZ 85721 &nbsp;</Typography> 
                  </div>
                  <div style = {{display:"inline-flex"}}>
                  <GradeIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp; GPA: 3.67&nbsp;</Typography> 
                  </div>
                  </Grid>
                  <Grid item xs = {12}>
                    <Map coordinates = {[32.2319, -110.9501]} popover = "University of Arizona"/>
                  </Grid>
              </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
        <div style = {{display:"flex", alignItems:"center"}}>
            <Avatar src = {osu}/>
            <Typography className={classes.heading}>&nbsp; Ohio State University</Typography>
          </div>
          </AccordionSummary>
          <AccordionDetails>
          <Grid container>
                  <Grid  style = {{marginBottom:1}} item xs = {12}>
                  <Typography style = {{fontSize:16, marginBottom:10}} color = "textSecondary" gutterBottom>Master of Science in Electircal and Computer Engineering</Typography>
                  </Grid>
                  <Grid  display = "flex" alignItems = "center" item xs = {12}>
                 <div style = {{display:"inline-flex" }}>
                  <EventIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp; Aug 2018 - Dec 2019 &nbsp;</Typography> 
                  </div>
                  <div style = {{display:"inline-flex"}}>
                  <LocationOnIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp; Columbus, OH 43210 &nbsp;</Typography> 
                  </div>
                  <div style = {{display:"inline-flex"}}>
                  <GradeIcon style = {{fontSize: 20}}/> 
                  <Typography style = {{fontSize: 14}}>&nbsp; GPA: 3.88&nbsp;</Typography> 
                  </div>
                  </Grid>
                  <Grid item xs = {12}>
                    <Map coordinates = {[40.0067, -83.0305]} popover = "Ohio State University"/>
                  </Grid>
              </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }


function HomePage() {
    const [checked, setstate] = useState(false)
    useEffect(() => {
      setstate(true)
    })
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            <Grid container justify="center" spacing = {3}>
            <Grid container item xs = {12} md = {10} xl = {6} spacing = {5}>
            <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            <Grid item container xs = {12} md = {6}>
                <Grid item xs = {12}>
                <Box>
                <Typography variant="h4" align = "left" color = "textPrimary" gutterBottom>
                    About Me
                    <Divider  style = {{ background: yellow[800], width: 150, height:5}}/>
                </Typography>
                <Typography color = "textSecondary" paragraph>
                I am Hanlin Chen, a computer engineer graduate. I have pushed myself beyond expectation to come as far as I have. Life has thrown me a lot of hurdles through my journey. I am passionate about AI (artificial intelligence), physics, math and software development. I enjoy challenging myself and want to help change the world with my ideas/accomplishments
                </Typography>
                </Box>
                </Grid>
                <Grid container item xs = {12}>
                <Grid item xs = {12}>
                <Typography variant="h4" align = "left" color = "textPrimary" gutterBottom>
                    <SchoolIcon className = {classes.icons}/>
                    Education
                    <Divider  style = {{ background: yellow[800], width: 190, height:5}}/>
                </Typography>
                </Grid>
                <Grid item xs = {12}>
                <EducationAccordion/>
                </Grid>
                </Grid>
            </Grid>
            </Slide>
            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
            <Grid item align = "center" xs = {12} md = {6}>
                <MyCard />
            </Grid>
            </Slide>
            <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            <Grid item xs = {12}>
            <Paper className = {classes.paper}  elevation = {3}>
            <Box>
                <Typography variant="h4" align = "left" color = "textPrimary" gutterBottom>
                Background
                </Typography>
                <Typography align = "left" color = "textSecondary" paragraph>
                I was born and raised in the city of Luzhou, Sichuan China where chili spice is nice and green peppercorns are life. During my highschool years back in China, I played badminton and soccer. In 2012, I left China for summer camp for two-month student exchange program in America. I flew 23 hours across Europe and the Atlantic Ocean to Orono, Maine. Where I took my first steps onto American soil. I was in culture shock from what I had seen back home to what you see in reality. Everything from food, people, and media all differed from my culture back home. I had to adjust but, still keep some of my Chinese culture. A year after, I officially attended Orono High School in Maine . I lived at an on-campus dorm by myself and visited with my host family every weekend. I had a lot of free time compared to school back home. My host family invited me to go Ice fishing during the winter and go tubing on the lake in the summer. I participated in cross country and tennis while in highschool. Lobster and Blueberries were amazing we do not have either back home city in China. In 2014, I decided to transition from green pine trees and cold winters of Maine into the hot and sunny, cactus filled desserts of Arizona for my first college experience as a freshman at the University of Arizona. At first I was in culture shocked at how the landscape and people differed from one state to the next, but I ended up meeting my first two friends and roommates KJ and Mandy. I started studying Optical Science for the first 2 years of college, until I desired and changed my career path to become an electrical computer engineer (ECE) the last 2 years for my bachelors. While at UA I met Jero and Adam and are my best friends to this day. I graduated with my bachelors degree from UA in May 2018. I decided to take on my next journey to continue pursuing my masters degree at the Ohio state university. In December 2019, I graduated with my masters degree from the Ohio State University and finally finished school. I have been in school my whole life and am ready to find the job of my dreams. To put my ideas and accomplishments to work in the tech industry
                </Typography>
                </Box>
                </Paper>
            </Grid>
            </Slide>
            </Grid>
            </Grid>
        </div>
    )
}

export default HomePage