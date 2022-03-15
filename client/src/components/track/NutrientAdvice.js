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

  //   const [foods, setFoods] = useState([]);
  const [vitaminList, setVitaminList] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [finalFinalData, setFinalFinalData] = useState([]);

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

  // useEffect to run on hook change (nutrients)          ORIGINAL
  useEffect(() => {
    keywords.forEach(async (keyword) => {
      await axios
        .get(`/api/advice/get?search=${keyword}`)
        .then((res) => {
          let aux_obj = {
            keyword: keyword,
            vitamins: [], // this will be nested vitamins: [ { vitamin_name: vitamin_name, foods: res.data[0].foods } ]
          };

          // let aux_aux2 = {
          //     vitamin_name: vitamin,
          //     foods: []
          // }
          res.data[0].vitamins.forEach((item) => {
            aux_obj.vitamins.push(capitalizeFirstLetter(item));

            //aux_obj.vitamins[item] = [foods]
          });
          console.log("vitamin_list", vitaminList);
          console.log("aux_obj", aux_obj);
          console.log("res data", res.data[0]);
          // aux_obj.vitamins.forEach(vitamin => {
          //     let aux_vitamin_object = {
          //         vitamin_name: vitamin,
          //         function: "",
          //         foods: []
          //     }
          //     let merged =
          let aux_vitamins = [];

          aux_obj.vitamins.forEach((vitamin) => {
            let finds = vitaminList.find((element) => {
              if (element.vitamin_name.includes(vitamin)) {
                return true;
              }
            });
            if (finds) {
              aux_vitamins.push(finds);
            }
            // console.log("finds@@@@", finds);
          });
          aux_obj["vitamins_info_list"] = aux_vitamins;
          setFinalData((oldArray) => [...oldArray, aux_obj]);

          //     // if(vitaminList.some(i => i.vitamin_name.includes(vitamin))){
          //     //     console.log("Theres a matched on vitaminList with me! :", vitamin)
          //     //     //console.log(vitaminList.vitamin_name.indexOf(vitamin))

          //     // } else {
          //     //     console.log("There is NO MATCH for me:", vitamin)
          //     // }
          // })
        })
        .catch((err) => {
          //console.log('err',err)
          toast.error(err.message);
        });
      // aux_list.push(aux_data)
    });
    //console.log('aux_final', aux_final_list)
    // setFinalData(aux_final_list);
  }, [vitaminList]);

  useEffect(() => {
    setFinalFinalData(getUniqueListBy(finalData, "keyword"));
  }, [finalData]);

  // useEffect to run on hook change (food name)                    Perhaps can change this useEffect to have dependency be on Foods
  //   useEffect(() => {
  //     console.log(foods);
  //   }, [foods]);

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
        {console.log("finalFinalData:", finalFinalData)}
        {finalFinalData.length > 0 && (
          <div className="space-y-3">
            {finalFinalData.map((item, i) => (
              <AdviceBodyItem data={item} index={i} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
