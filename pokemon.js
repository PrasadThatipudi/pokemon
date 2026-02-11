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
    this.state = { loading: true };
  }

  render() {
    return this.state.loading
      ? React.createElement(Loading)
      : React.createElement(PokemonDetails, {
          imageUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          name: "Bulbasaur",
        });
  }
}

const bulbasaur = React.createElement(PokemonDetails, {
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  name: "Bulbasaur",
});

ReactDOM.render(React.createElement(Pokemon), main_container);
