import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';


function App() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [lightBoxImageSrc, setLightBoxImageSrc] = useState('');

  function search(e) {
    setName(e.target.value);
    axios.get(`https://api.giphy.com/v1/gifs/search?limit=1&q=${name}&api_key=pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa`) .then(response => {
      setResults(response.data.data);
    })
    .catch(function (error) {
      console.log(error)
    });
    return false;
  }

  function lightBox(e) {
    setLightBoxImageSrc(e.target.getAttribute('src'));
    return false;
  }

  function changeLightbox(action) {
    if(action == 'prev') {
      
    }
    if(action == 'next') {
      
    }
    if(action == 'close') {
      console.log('close');
    }
    return false;
  }

  

  return (
    <div className="code-challenge">
      <header className="header">
        <h1> Search for Gifs </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => search(e)}
        />
      </header>
          <section className={`lightbox ${lightBoxImageSrc !== '' ? "--active" : ""}`}>
            <div className="image">
              <nav className="nav">
                <button class="prev">
                  Previous
                </button>
                <button class="next">
                  Next
                </button>
                <button class="close" onClick={changeLightbox('close')}>
                  X
                </button>
              </nav>
              <img src={lightBoxImageSrc} alt="" />
            </div>
          </section>
      <section className="results">
        <h1> Results: </h1>
        <ul>
          {results && results.map(gif => (
            <li key={gif}>
              <img src={gif.images?.original?.url} alt={gif.title} key={gif.id} onClick={lightBox} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
