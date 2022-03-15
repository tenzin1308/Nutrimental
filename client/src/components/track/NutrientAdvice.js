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

    const [foods, setFoods] = useState([]);

    // const getVitaminDbData = async () => {
    //     await axios
    //       .get(`/api/vitamin/get?vitamin_name=${searchTxt}`)
    //       .then((res) => {
    //         setVitaminData(res.data);
    //       })
    //       .catch((err) => {
    //         toast.error(err.message);
    //       });
    //   };

    //Seperate function test     PENDING PROMISE ERROR
    const getFoods = async(vitamin)=> {
        await axios.get(`/api/vitamin/get?vitamin_name=${vitamin}`)
        .then(res => {
            if(res.data.length > 0){
                //console.log(res.data[0].foods);
                setFoods(res.data[0].foods)
                //console.log('foods', foods)
            }
        })
        .catch(err => {
            toast.error(err.message)
        })
    };

    
    // useEffect to run on hook change (nutrients)          ORIGINAL
    useEffect( () => {
        keywords.forEach(async(keyword) => {
            await axios.get(`/api/advice/get?search=${keyword}`)
            .then(res => {
                let aux_aux = {
                    keyword: keyword, 
                    vitamins: {} // this will be nested vitamins: [ { vitamin_name: vitamin_name, foods: res.data[0].foods } ]
                }
                
                // let aux_aux2 = {
                //     vitamin_name: vitamin,
                //     foods: []
                // }
                res.data[0].vitamins.forEach(item => {
                    //console.log('@@ item', item)
                    // api call the item. the item is vitamin_name
                    getFoods(item)
                    
                    //aux_aux.vitamins[item] = [foods]
                    aux_aux.vitamins[item] = [foods]
                                        
                })
                console.log('aux_aux',aux_aux)
                
                
            })
            .catch(err => {
                //console.log('err',err)
                toast.error(err.message);
            })
            // aux_list.push(aux_data)
            
        })
    }, [keywords])

        
        

        // useEffect to run on hook change (nutrients)          TESTING
    // useEffect( () => {
    //     keywords.forEach(async(keyword) => {
            
    //         let aux_aux = {
    //             keyword: keyword, 
    //             vitamins: [] // this will be nested vitamins: [ { vitamin_name: vitamin_name, foods: res.data[0].foods } ]
    //         }
    //         // let aux_aux2 = {
    //         //     vitamin_name: vitamin,
    //         //     foods: []
    //         // }
    //         let p = new Promise((resolve, reject) => {
    //             resolve('Success')
    //             reject('Failed')
    //         })
    //         p.then((keyword) => {
                
    //             aux_aux.vitamins.push(getVitamins(keyword))
    //         }).catch((message) => {
    //             console.log('This is in the catch ' + message)
    //         })
    //         console.log('aux_aux', aux_aux)
            
                
    //         })
        
    // }, [keywords])

    // useEffect to run on hook change (food name)                    Perhaps can change this useEffect to have dependency be on Foods
    useEffect(() => {
        console.log(foods)
        
        
    },[foods])


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
