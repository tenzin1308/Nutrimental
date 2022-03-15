import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AdviceVitaminItem = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // console.log(data);
  };

  React.useEffect(() => {
    console.log('within useeffect of vitamin item')
  }, [data,expanded])
  

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="black">
          <p>{data.vitamin_name}</p>
          {/* <p>SAMPLE INNER TITLE</p> */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="focus:outline-none"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        
      </CardActions>
      
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="border-t-2 border-dashed">
            {/* <SearchTable data={data} authProps={authProps} /> */}
            <h1 className='h-screen'>
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            </h1>
            {/* {data.vitamin_name} */}
          </CardContent>
        </Collapse>
     
    </Card>
    // <p>{data.vitamin_name}</p>
  );
};

export default AdviceVitaminItem;