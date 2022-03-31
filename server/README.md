## Data Dictionary 

### Advice
- body_part stores the name of a body part in the form of a string
- vitamins is an an array that stores the different vitamins 

### Daily Intake
- vitamin_name stores the name of a vitamin in the form of a string
- recommended_amount is an array that stores different elements such as the gender, age_group and amount
    - gender stores the value of male or female in the form of a string
    - age group stores the numeric values in the form of a string
    - amount stores the numeric values in the form of a string
- upper_tolerable_limit is an array that stores different elements such as the gender, age_group and amount
    - gender stores the value of male or female in the form of a string
    - age group stores the numeric values in the form of a string
    - amount stores the numeric values in the form of a string

### Food History 
- user_email stores the user's email in the form of a string
- history is an array that stores elements such as the food_name, calories, amount, date, and nutrients 
    - food_name stores the name of a food in the form of a string
    - calories stores the numeric values in the form of a string
    - amount stores the numeric values in the form of a string
    - date stores the date the food was accessed by the user in the form of date
    - nutrients is an array that stores the nutrient_name and nutrient_quantity 
        - nutrient_name stores the name of the nutrient in the form of a string
        - nutrient_quantity stores the quantity of the nutrient in the form of a string

### User
- user_email stores the user's email in the form of a string
- first_name stores the user's first name in the form of a string
- last_name stores the user's last name in the form of a string
- dob stores the user's date of birth in the form of date
- weight stores the user's weight in the form of a string 
- height stores the user's height in the form of a string
- gender stores the value of male of female in the form of a string
- diet stores the numeric values (1, 2 or 3 options) in the form of a string
- signup_date stores the date the user signed up in the form of a string

### Vitamin
- vitamin_name stores the name of the vitamin in the form of a string
- function stores the function of the vitamin in the form of a string
- foods stores the different foods associated with each given vitamin in the form an array