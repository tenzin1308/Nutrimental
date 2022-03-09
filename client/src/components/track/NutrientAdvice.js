import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";


export default function NutrientAdvice() {

    const [searchText, setSearchText] = useState([]);

    const [keyWordsList] = useState([
        'brain','eyes','skin','teeth','bone','muscles',
        'lung','liver','heart','digestive system','immune system','kidneys',
        'reproductive system','ears','hair','blood','breasts','nervous system']);

    const [vitaminBank, setVitaminBank] = useState([]);
    const [foodBank, setFoodBank] = useState([]);

    const clearVitaminBank = () => {
        setVitaminBank([]); 
    }
    const clearFoodBank = () => {
        setFoodBank([]);
    }

    
    const getAdviceVitamins = async (word) => {
        await axios
            .get(`/api/advice/get?search=${word}`)

            .then((res) => {
            for (let i=0; i < res.data[0].vitamins.length; i++) {
                setVitaminBank(vitaminBank => [...vitaminBank, res.data[0].vitamins[i]]);
            }
            
            })
            .catch((err) => {
            toast.error(err.message);
            });
      };
    
    const getVitaminFoods = async (vitamin) => {
        await axios
            .get(`/api/vitamin/get?vitamin_name=${vitamin}`)

            .then((res) => {
            for (let j=0; j < res.data[0].foods.length; j++) {
                setFoodBank(foodBank => [...foodBank, res.data[0].foods[j]]);
            }
                
            })
            .catch((err) => {
            toast.error(err.message);
            });
    };
    
    const searchHandler = () => {
        //These two clear funcions are here to clear the array banks so that it doesn't keep piling up
        clearVitaminBank();
        clearFoodBank();
        if(searchText.length !== 0){
            var splitArray = searchText.split(" ");
            
            function findCommonElements(arr1, arr2){
                return arr1.some(word => arr2.includes(word))
            }

            function removeDuplicates(value, index, self){
                return self.indexOf(value) === index;
            }

            let wordBank = [];
            
            if(findCommonElements(keyWordsList, splitArray)){
                console.log('Keyword(s) detected!');
                
                for (let j=0; j < splitArray.length; j++){
                    if(keyWordsList.includes(splitArray[j])){
                        console.log('This is one matched entry');
                        wordBank.push(splitArray[j]);
                    }
                    else{
                        continue;
                    }
                }
                    
                
            } else {
                console.log('Could not find keywords, please try to rephrase your search');
            }

            console.log(wordBank);

            wordBank.map(async(word) => {
                await getAdviceVitamins(word)
            })

            //vitaminBank at this point is unfiltered and contains duplicates (hence we need to make the code line under this comment)

            var uniqueVitaminBank = vitaminBank.filter(removeDuplicates);

            //vitaminBank at this point is FILTERED and does NOT contain duplicates
            console.log(uniqueVitaminBank);

            uniqueVitaminBank.map(async(vitamin) => {
                await getVitaminFoods(vitamin)
            })
            
            //foodBank at this point is unfiltered and contains duplicates (hence we need to make the code line under this comment)
            
            var uniqueFoodBank = foodBank.filter(removeDuplicates);

            //foodBank at this point is FILTERED and does NOT contain duplicates
            console.log(uniqueFoodBank);
            

        } else {
            console.log('You have not entered anything!');
        }

    }
    const clearTextHandler = () => {
        setSearchText('');
    }
    
    return (
        <Paper
            // component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            // onSubmit={searchHandler}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                id="how-can-i-help-you"
                placeholder='How Can I Help You?'
                inputProps={{ 'aria-label': 'How Can I Help You?' }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText ? searchText : ''}
            />
            {searchText !== '' &&
                <IconButton aria-label='delete' onClick={clearTextHandler}>
                    <HighlightOffIcon />
                </IconButton>
            }
            <IconButton aria-label="search" onClick={searchHandler}>
                <SearchIcon />
            </IconButton>
            
        </Paper>
  )
}