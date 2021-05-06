import React, {useEffect, useState} from 'react'
import './ListPokemon.css';

const ListPokemon = () => {
  const [pokemons, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const numPokeForPage = 20;
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      setPokemon(data.results);
      setTotalPage(Math.trunc(data.count/numPokeForPage)+1)
      
    })
  }, [offset])

  function previous(){
    setNumPage(numPage => numPage-1);
    setOffset(offset => offset - numPokeForPage);
  }

  function next() {
    setNumPage(numPage => numPage+1);
    setOffset(offset => offset + numPokeForPage);
  }

  return (
    <div className='content'>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => (
            <tr key={pokemon.name}>
              <td>
                <span>{pokemon.name}</span>
              </td>
              <td>
                <span>{pokemon.url}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pages'>
        { numPage !== 1 && <button onClick={previous}>Voltar</button>}
        <span>{numPage} ... {totalPage}</span>
        { numPage !== totalPage && <button onClick={next}>Próxima</button>}
      </div>
    </div>
  );
}

export default ListPokemon;
