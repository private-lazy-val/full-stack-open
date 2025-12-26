import StatisticLine from "./statistic-line.jsx";

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    if (all === 0) {
        return (
            <>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </>
        );
    }
    const average = (good - bad) / all
    const positive = good / all * 100

    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={all}/>
                <StatisticLine text="average" value={average}/>
                <StatisticLine text="positive" value={positive + " %"}/>
                </tbody>
            </table>
        </>
    );
};

export default Statistics;