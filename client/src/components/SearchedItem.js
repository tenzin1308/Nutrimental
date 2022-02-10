import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const SearchedItem = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="black">
          {data.description || data.vitamin_name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* TODO: ADD onSubmit logic to add to account and show toast */}
        <button className="bg-blue-700 text-white p-2 rounded-md ml-2">
          add to account
        </button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="border-t-2 border-dashed">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Data A</dt>
              <dd className="mt-1 text-sm text-gray-900">aaaaaaa</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Data B</dt>
              <dd className="mt-1 text-sm text-gray-900">bbbbbb</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Data C</dt>
              <dd className="mt-1 text-sm text-gray-900">cccccc</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Data D</dt>
              <dd className="mt-1 text-sm text-gray-900">dddddd</dd>
            </div>
          </dl>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SearchedItem;
