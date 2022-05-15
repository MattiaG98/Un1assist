const MovieList = (props) => {
    return (
        <div alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
            <div width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Plot</th>
                            <th>Rating</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody height={240}>
                        {props.movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.plot}</td>
                                <td>{movie.rated}</td>
                                <td isNumber>{movie.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button
                    height={50}
                    marginRight={16}
                    appearance="primary"
                    intent="danger"
                    onClick={props.logOut}
                >
                    Log Out
                </Button>
            </div>
        </div>
    )
  }

export default MovieList;
