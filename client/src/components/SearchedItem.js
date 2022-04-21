import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import SearchTable from "./SearchTable";

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

const SearchedItem = ({ data, authProps }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [nutrient, setNutrient] = React.useState({
    nutrient_name: "", 
    nutrient_quantity: "", 
  })
  const [serving, setServing] = React.useState(0);
  const [dosageAmount, setDosageAmount] = React.useState(0);
  const [unit, setUnit] = React.useState("mg");
  const [gridData] = React.useState(data.foodNutrients);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleServingChange = (e) => {
    setServing(e.target.value);
  };

  const handleDosageChange = (e) => {
    setDosageAmount(e.target.value);
    setNutrient({
      nutrient_name: data.vitamin_name,
      nutrient_quantity: e.target.value,
    });
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // function to run timer to wait before executing next line
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const newData = gridData?.filter((item) => item.value > 0);
  newData?.forEach((item, i) => {
    item.id = i + 1;
  });

  const dbData = newData?.map((item) => ({
    nutrient_name: item.nutrientName,
    nutrient_quantity: item.value * serving, 
  }));

  const submitHandler = async (event) => {
    setExpanded(false);
    event.preventDefault();
    if (authProps.isAuthenticated) {
      await axios
        .post("/api/food-history/post/", {
          user_email: authProps.user.user_email,
          history: {
            food_name: data.description ? data.description : data.vitamin_name,
            calories: data.score ? parseFloat(data.score).toFixed(2) : "", // changed data.score to parseFloat(data.score).toFixed(2)           
            amount: serving,
            nutrients: dbData ? dbData : [],    
            date: new Date(),
          },
        })
        .then(async (res) => {
          await delay(2000);
          toast.success("Food added to history");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } else {
      // ask to login or signup if not logged in yet and then add food to tracker
      toast.error("You must be logged in to add a food to your tracker");
    }
  };

  const dosageSubmitHandler = async (event) => {
    setExpanded(false);
    event.preventDefault(); 
    let finalAmount = 0;
    if (unit === "g") {
      finalAmount = dosageAmount * 1000;
    } else {
      finalAmount = dosageAmount;
    }
    await axios
      .post("/api/food-history/post/", {
        user_email: authProps.user.user_email,
        history: {
          food_name: data.vitamin_name,
          calories: data.score ? data.score : "",
          amount: finalAmount,
          nutrients: 
            unit === "g" ? {
              nutrient_name: data.vitamin_name,
              nutrient_quantity: finalAmount,
            } : nutrient,
          date: new Date(),
        },
      })
      .then(async (res) => {
        await delay(2000);
        toast.success("Food added to history");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="black">
          {data.description || data.vitamin_name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {data.description && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="focus:outline-none"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      {data.description && (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="border-t-2 border-dashed">
              <SearchTable newData={newData} authProps={authProps} />
            </CardContent>
          </Collapse>
        </>
      )}

      {data.description && (
        <>
          <form className="flex items-center p-2" onSubmit={submitHandler}>
            <input
              required
              type="number"
              min={0}
              step={0.1}
              // value={1}
              className="m-1"
              placeholder="Input servings"
              onChange={handleServingChange}
            />
            Servings
            <button
              className="bg-blue-700 text-white p-2 rounded-md ml-2"
              type="submit"
            >
              Add to Account
            </button>
          </form>
        </>
      )}

      {data.vitamin_name && (
        <>
          <form className="flex items-center p-2" onSubmit={dosageSubmitHandler}>
            <input
              required
              type="number"
              min={0}
              className="m-1"
              placeholder="Dosage Amount"
              onChange={handleDosageChange}
            />
            <select
              required
              className="m-1"
              id="servingUnit"
              onChange={handleUnitChange}
            >
              <option value="mg">Milligrams (mg)</option>
              <option value="g">Grams (g)</option>
            </select>
            <button
              className="bg-blue-700 text-white p-2 rounded-md ml-2"
              type="submit"
            >
              Add to Account
            </button>
          </form>
        </>
      )}
        
    </Card>
  );
};

export default SearchedItem;