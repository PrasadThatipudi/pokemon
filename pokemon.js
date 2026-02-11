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

const pokemonIds = Array.from({ length: 10 }, (_, index) => ({
  pokemonId: index + 1,
}));

const pokemons = pokemonIds.map((pokemon, index) =>
  React.createElement(Pokemon, { ...pokemon, key: index }),
);

ReactDOM.render(
  React.createElement("div", { className: "pokemons" }, pokemons),
  main_container,
);
