import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdviceBodyItem from "../AdviceBodyItem";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export default function NutrientAdvice() {
  const [searchText, setSearchText] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [vitaminList, setVitaminList] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [cleanedFinalData, setCleanedFinalData] = useState([]);

  const getAllVitamins = async () => {
    await axios
      .get("https://nutrimental-server.herokuapp.com/api/vitamin/get-all/")
      .then((res) => {
        setVitaminList(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    getAllVitamins();
  }, [keywords]);

  // useEffect to run on hook change (nutrients)
  useEffect(() => {
    const searchKeywords = keywords.join(",");
    axios
      .get(
        `https://nutrimental-server.herokuapp.com/api/advice/get?search=${searchKeywords}`
      )
      .then((res) => {
        res.data.forEach((advice) => {
          let aux_obj = {
            keyword: advice.body_part,
            vitamins: [],
          };
          //Capitalize vitamin(s) from res.data in order to be prepared to search in our vitaminList
          advice.vitamins.forEach((item) => {
            aux_obj.vitamins.push(capitalizeFirstLetter(item));
          });
          let aux_vitamins = [];
          //We are now comparing vitamins in our aux_obj with vitamins in vitamin_list.
          //If match then grab whole OBJECT and store in aux_vitamins
          aux_obj.vitamins.forEach((vitamin) => {
            let finds = vitaminList.find((element) => {
              if (element.vitamin_name.includes(vitamin)) {
                return true;
              }
            });
            if (finds) {
              aux_vitamins.push(finds);
            }
          });
          //We are making a new key value for our aux_obj and assigning all the objects we just found
          aux_obj["vitamins_info_list"] = aux_vitamins;
          setFinalData((oldArray) => [...oldArray, aux_obj]);
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [vitaminList]);

  useEffect(() => {
    setCleanedFinalData(getUniqueListBy(finalData, "keyword"));
  }, [finalData]);

  useEffect(() => {}, [cleanedFinalData]);

  const searchHandler = (event) => {
    event.preventDefault();
    const keyWordsList = [
      "brain",
      "eyes",
      "skin",
      "teeth",
      "bone",
      "muscles",
      "lung",
      "liver",
      "heart",
      "digestive system",
      "immune system",
      "kidneys",
      "reproductive system",
      "ears",
      "hair",
      "blood",
      "breasts",
      "nervous system",
    ];

    let userInputSplit = searchText.split(" ");

    // Filters out keyword(s) from searchText and place into array to be used
    let matchedWords = [];
    userInputSplit.forEach((word) => {
      if (keyWordsList.includes(word)) {
        matchedWords.push(word);
      }
    });

    if (matchedWords.length > 0) {
      toast.success("Showing nutrient advice for your search");
    } else {
      toast.error("No nutrient advice found. Please rephrase your input");
    }
    setKeywords(matchedWords);
  };
  const clearTextHandler = () => {
    setSearchText("");
  };

  return (
    <>
      <form onSubmit={searchHandler} className="2px 4px flex center border-2">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          id="how-can-i-help-you"
          placeholder="How Can I Help You?"
          inputProps={{ "aria-label": "How Can I Help You?" }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText ? searchText : ""}
        />
        {searchText !== "" && (
          <IconButton aria-label="delete" onClick={clearTextHandler}>
            <HighlightOffIcon />
          </IconButton>
        )}
        <IconButton aria-label="search" type="submit">
          <SearchIcon />
        </IconButton>
      </form>

      <div className="">
        {cleanedFinalData.length > 0 && (
          <div className="space-y-3">
            {cleanedFinalData.map((item, i) => (
              <AdviceBodyItem data={item} index={i} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
