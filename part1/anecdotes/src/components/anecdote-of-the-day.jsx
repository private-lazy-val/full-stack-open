const AnecdoteOfTheDay = ({anecdote, votes, onVote, onNext}) => {
    return (
        <section>
            <h2>Anecdote of the day</h2>
            <p>{anecdote}</p>
            <p>
                has {votes} {votes === 1 ? `vote` : `votes`}
            </p>
            <button onClick={onVote}>vote</button>
            <button onClick={onNext}>next anecdote</button>
        </section>
    );
};

export default AnecdoteOfTheDay;