
import { useState } from 'react'
import { useEffect } from 'react'
import Description from './Description'
import Options from './Options/Options'
import Feedback from './Feedback'
import Notification from './Notification'



function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    if (savedFeedback !== null) {
     return JSON.parse(savedFeedback);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    };
  });


  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = feedbackType => {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] +1,
    })

  }
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100);

  const resetFeedback = () => {
  setFeedback (
    {
      good: 0,
    neutral: 0,
      bad: 0
    }   )
      
  }


  return (
    <>
      <Description />
      <Options value={feedback.good} onTrack={() => updateFeedback("good")}> Good</Options>
      <Options onTrack={() => updateFeedback("neutral")}>Neutral</Options>
      <Options onTrack={() => updateFeedback("bad")}>Bad</Options>
      {totalFeedback > 0 && (
        <button onClick={resetFeedback} >Reset</button>
    ) }
      {totalFeedback > 0 ? (<Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={ positiveFeedback}> </Feedback>) :
        (
       <Notification/>
   ) }
   
     
    </>
  )
}
export default App
