const Loading = () => {
  return React.createElement("p", null, "Loading...");
};

const PokemonDetails = (props) => {
  return React.createElement(
    "div",
    null,
    React.createElement("p", null, `${props.name}`),
    React.createElement("img", { src: props.imageUrl }),
  );
};

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, name: null, imageUrl: null };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonId}`)
      .then((response) => response.json())
      .then(({ name, sprites }) =>
        this.setState({
          name,
          imageUrl: sprites.front_default,
          loading: false,
        }),
      );
  }

  render() {
    return this.state.loading
      ? React.createElement(Loading)
      : React.createElement(PokemonDetails, {
          imageUrl: this.state.imageUrl,
          name: this.state.name,
        });
  }
}

class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noOfPokemons: props.paginationLimit };
  }

  render() {
    const pokemonIds = Array.from(
      { length: this.state.noOfPokemons },
      (_, index) => index + 1,
    );

    const pokemons = pokemonIds.map((pokemonId) =>
      React.createElement(Pokemon, { key: pokemonId, pokemonId }),
    );

    const loadMoreButton = React.createElement(
      "button",
      {
        onClick: () =>
          this.setState(({ noOfPokemons }) => ({
            noOfPokemons: noOfPokemons + this.props.paginationLimit,
          })),
      },
      "Load more",
    );
    return React.createElement(
      "div",
      null,
      React.createElement("div", { className: "pokemons" }, pokemons),
      loadMoreButton,
    );
  }
}

ReactDOM.render(
  React.createElement(Pokemons, { paginationLimit: 5 }),
  main_container,
);
