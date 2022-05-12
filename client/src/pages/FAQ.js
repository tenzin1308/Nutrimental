import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);
  const [panels, setPanels] = React.useState(
    "ans1",
    "ans2",
    "ans3",
    "ans4",
    "ans5"
  );
  const [QuestionList] = React.useState([
    "What can I use Nutrimental for?",
    "Can Nutrimental help me if a certain body part feel some type of way?",
    "Am I getting enough daily nutrients?",
    "Is it better to be getting my nutrients through food or supplements?",
    "How can I better my diet?",
  ]);
  const [AnswerList] = React.useState([
    "We aim to provide an easy way for people to track the nutrients needed for their wellbeing. Whether it's to attain all the necessary vitamins or any personal nutritional goals, this app will help you do so. " +
      "Along with this, we can give food recommendations for when certain body parts are feeling fatigued or give your dietary information to a dietitian that can advise you on your diet.",

    'Sure! Once you make an account you can head on over to "Nutrient Advice" tab and enter what it is you are feeling. For example, if your muscles are sore due to an intensive workout, we will be able to give you ' +
      "a list of foods that are good for anything muscles related.",

    "Research shows that most people do NOT get enough vitamins and minerals in their diets. In order to check if you are getting enough daily nutrients, you can create an account on our application then enter what " +
      'your daily intake(s) look like for a day and head on over to your "Nutrient Tracker" page. Here you can tell if you are getting enough daily nutrients for that day since we will show you all the recommended nutrient ' +
      "amount along how much nutrients you have already consumed based on what you input as your daily intake for that day.",

    "Generally it would be better to get your nutrients through food rather than supplements because it is easier for your body to absorb micronutrients through food. If you are unable to get all the nutrients " +
      "you need from food alone, ask your doctor or dietitian if dietary supplements are right for you before taking them.",

    "Once you make an account you can select who you want as your dietitian. From here, the dietitian can view your daily intake(s) as well as food history and see how you are doing in terms of reaching your daily " +
      "recommended nutrient amount. They will then be able to advise you from here on what you should or should not be eating.",
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        {QuestionList.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === panels[index]}
            onChange={handleChange(panels[index])}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                sx={{ width: "100%", flexShrink: 0, fontSize: "2rem" }}
              >
                {item}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ width: "90%", margin: "0 auto" }}>
              <Typography>{AnswerList[index]}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
