import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
      .get("/api/vitamin/get-all/")
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
    keywords.forEach(async (keyword) => {
      await axios
        .get(`/api/advice/get?search=${keyword}`)
        .then((res) => {
          let aux_obj = {
            keyword: keyword,
            vitamins: [],
          };

          //Capitalize vitamin(s) from res.data in order to be prepared to search in our vitaminList
          res.data[0].vitamins.forEach((item) => {
            aux_obj.vitamins.push(capitalizeFirstLetter(item));
          });
          console.log("vitamin_list", vitaminList);
          console.log("aux_obj", aux_obj);
          console.log("res data", res.data[0]);

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
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  }, [vitaminList]);

  useEffect(() => {
    setCleanedFinalData(getUniqueListBy(finalData, "keyword"));
  }, [finalData]);

  useEffect(() => {}, [cleanedFinalData]);

  const searchHandler = () => {
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
    userInputSplit.map((word) => {
      if (keyWordsList.includes(word)) {
        matchedWords.push(word);
      }
    });

    setKeywords(matchedWords);
  };
  const clearTextHandler = () => {
    setSearchText("");
  };

  return (
    <>
      <Paper
        // component="form"
        //   className="flex items-center flex-col"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        // onSubmit={searchHandler}
      >
        {/* <div className="flex flex-row"> */}
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
        <IconButton aria-label="search" onClick={searchHandler}>
          <SearchIcon />
        </IconButton>
        {/* </div> */}
      </Paper>

      <div className="">
        {console.log("cleanedFinalData:", cleanedFinalData)}
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
