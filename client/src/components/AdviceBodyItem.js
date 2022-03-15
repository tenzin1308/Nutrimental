import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AdviceVitaminItem from "./AdviceVitaminItem";

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

const AdviceBodyItem = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // console.log(data);
  };

  React.useEffect(() => {
    console.log("Within use effect of body item", data);
  }, [data]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="black">
          {data.keyword}
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
        <CardContent className="border-t-2 border-dashed h-auto">
          {data.vitamins_info_list ? (
            data.vitamins_info_list.forEach((item, i) => {
              <>
                {/* {console.log("@@@@@@@@@@@@@@@@@@@", item)} */}
                <AdviceVitaminItem data={item} key={i} index={i} />
              </>;
            })
          ) : (
            // <div>
            //   ITS RENDERING THE AdviceVitaminItem
            //   {console.log("data.vitamins_info_list", data.vitamins_info_list)}
            // </div>
            <div>Loading</div>
          )}
          {/* <p>{data.vitamins_info_list.length}</p> */}
          {/* {console.log(data.vitamins_info_list.length)} */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AdviceBodyItem;
