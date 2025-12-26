import Button from "./button.jsx";

const Feedback = ({incrementGood, incrementNeutral, incrementBad}) => {
    return (
        <>
            <h2>give feedback</h2>
            <Button text={'good'} onClick={incrementGood}/>
            <Button text={'neutral'} onClick={incrementNeutral}/>
            <Button text={'bad'} onClick={incrementBad}/>
        </>
    );
};

export default Feedback;