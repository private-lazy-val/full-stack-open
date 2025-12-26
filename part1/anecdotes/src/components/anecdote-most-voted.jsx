const AnecdoteMostVoted = ({anecdote, votes}) => {
    if (!anecdote) {
        return (
            <section>
                <h2>Anecdote with most votes</h2>
                <p>No votes yet</p>
            </section>
        );
    }
    return (
        <section>
            <h2>Anecdote with most votes</h2>
            <p>{anecdote}</p>
            <p>
                has {votes} {votes === 1 ? `vote` : `votes`}
            </p>
        </section>
    );
};

export default AnecdoteMostVoted;