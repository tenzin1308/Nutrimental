import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';


export default function NutrientAdvice() {

    const [searchText, setSearchText] = useState('');

    const [keywords, setKeywords] = useState([]);

    const [vitamins, setVitamins] = useState([]);
    const [foods, setFoods] = useState([]);
    const [duplicatesVita, setDuplicatesVita] = useState([]);
    const [duplicatesFood, setDuplicateFood] = useState([]);
    
    function removeDuplicates(value, index, self){
        return self.indexOf(value) === index;
    }

    // useEffect to run on hook change (nutrients)
    useEffect( () => {
        let a = []
        keywords.map(async(keyword) => {
            await axios.get(`/api/advice/get?search=${keyword}`)
            .then(res => {
                //console.log('res',res)
                a.push("abc")
                setDuplicatesVita(duplicatesVita => duplicatesVita.concat(res.data[0].vitamins));
            })
            .catch(err => {
                //console.log('err',err)
                toast.error(err.message);
            })
            //console.log('values ',Object.values(result.data[0].vitamins))
            //console.log('keys ',Object.keys(result.data[0].vitamins))
            //console.log('result ',typeof(Object.values(result.data[0].vitamins)))
            ///vita.push(Object.values(result.data[0].vitamins))
            //vita.push(result.data[0].vitamins)
            //setDuplicatesVita(duplicatesVita => [...duplicatesVita, result.data[0].vitamins])
        })
        console.log(a);
        
        let uniqueVitamins = duplicatesVita.filter(removeDuplicates);
        setVitamins(uniqueVitamins)
        
    }, [keywords])

    

    // useEffect to run on hook change (food name)
    useEffect(() => {
        
        vitamins.map(async(vitamin) => {
            await axios.get(`/api/vitamin/get?vitamin_name=${vitamin}`)
            .then(res => {
                console.log(res.data)
                setDuplicateFood(duplicatesFood => duplicatesFood.concat(res.data[0]?.foods));
            })
            .catch(err => {
                toast.error(err.message);
            })
        })
        //console.log('dup foods',duplicatesFood)
        let uniqueFoods = duplicatesFood.filter(removeDuplicates);        
        setFoods(uniqueFoods)
        
    },[vitamins])


    const searchHandler = () => {
        const keyWordsList = [
            'brain','eyes','skin','teeth','bone','muscles',
            'lung','liver','heart','digestive system','immune system','kidneys',
            'reproductive system','ears','hair','blood','breasts','nervous system']

        let userInputSplit = searchText.split(" ")

        // Filters out keyword(s) from searchText and place into array to be used 
        let matchedWords = []
        userInputSplit.map((word) => {
            if(keyWordsList.includes(word)){
                matchedWords.push(word)
            }
        })
        
        setKeywords(matchedWords)

    }
    const clearTextHandler = () => {
        //console.log(adviceWords);
        setSearchText('');
    }
    const clearVitamins = () => {
        //console.log(adviceWords);
        setVitamins([]);
    }
    const clearFoods = () => {
        //console.log(adviceWords);
        setFoods([]);
    }
    
    
    return (
        <Paper
            // component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            // onSubmit={searchHandler}
        >
            {console.log('duplicate v',duplicatesVita)}
            {console.log('duplicate f',duplicatesFood)}
            {console.log('vitamins ',vitamins)}
            {/* {console.log('Foods',foods)} */}
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
