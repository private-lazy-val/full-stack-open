import {useState} from 'react'
import AnecdoteOfTheDay from "./components/anecdote-of-the-day.jsx";
import AnecdoteMostVoted from "./components/anecdote-most-voted.jsx";

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]

const getRandomIndex = (length) =>
    Math.floor(Math.random() * length);


function App() {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleNextAnecdote = () => {
        setSelected(getRandomIndex(anecdotes.length));
    };

    const handleVote = () => {
        setVotes((prev) => {
            const copy = [...prev];
            copy[selected] += 1;
            return copy;
        });
    };

    const maxVotes = Math.max(...votes)
    const mostVotedIndex =
        maxVotes === 0 ? null : votes.indexOf(maxVotes);

    return (
        <div>
            <AnecdoteOfTheDay anecdote={anecdotes[selected]}
                              votes={votes[selected]}
                              onVote={handleVote}
                              onNext={handleNextAnecdote}/>
            <AnecdoteMostVoted anecdote={mostVotedIndex !== null
                ? anecdotes[mostVotedIndex]
                : null}
                               votes={maxVotes}
            />
        </div>
    )
}

export default App
