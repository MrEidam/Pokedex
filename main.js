const pokemonCount = 151; //? https://pokeapi.co <- API
var pokedex = {};

window.onload = async () => {
    for(let i = 1; i<=pokemonCount; i++){
        await getPokemon(i); //! ♥ 815 ♥

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = `${i}. ${pokedex[i]["name"].toUpperCase()}`;
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById("pokemon-name").innerText = pokedex[1]["name"];
    document.getElementById("pokemon-img").src = pokedex[1]["img"];
    document.getElementById('pokemon-description').innerText = pokedex[1]['desc'];
    console.log(pokedex);
}

async function getPokemon(num){
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`

    let res = await fetch(url);
    let pokemon = await  res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"].find(entry => entry.language.name === "en")?.flavor_text || "No description available.";

    pokedex[num] = {
        "name": pokemonName,
        "img": pokemonImg,
        "types": pokemonType,
        "desc": pokemonDesc,
    }
    console.log('Done!');
}

function updatePokemon(){
    document.getElementById("pokemon-name").innerText = pokedex[this.id]["name"];
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    let typesDiv = document.getElementById("pokemon-types");
    typesDiv.innerHTML = "";

    let types = pokedex[this.id]["types"];
    for(let i=0; i<types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]['type']['name'].toUpperCase();
        type.classList.add('type-box');
        type.classList.add(types[i]['type']['name']);
        typesDiv.append(type);
    }

    document.getElementById('pokemon-description').innerText = pokedex[this.id]['desc'];
}

let pokemonSearch = document.getElementById("search");
let pokemonList = document.getElementById('pokemon-list');
let list;

function search(){
    let filter = pokemonSearch.value.toUpperCase();
    list = document.getElementsByClassName("pokemon-name");
    for(let i = 0; i < list.length; i++){
        let listItem = list[i];
        if(listItem.innerHTML.toUpperCase().indexOf(filter) > -1){
            listItem.style.display = "";
        }else{
            listItem.style.display = "none";
        }
    }
}