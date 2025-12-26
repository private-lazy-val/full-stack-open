import {useState} from 'react';
import Statistics from "./components/statistics.jsx";
import Feedback from "./components/feedback.jsx";

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = () => setGood(v => v + 1)
    const incrementNeutral = () => setNeutral(v => v + 1)
    const incrementBad = () => setBad(v => v + 1)

    return (
        <div>
            <Feedback incrementGood={incrementGood}
                      incrementNeutral={incrementNeutral}
                      incrementBad={incrementBad}/>
            <Statistics good={good}
                        neutral={neutral}
                        bad={bad}/>
        </div>
    )
}

export default App
