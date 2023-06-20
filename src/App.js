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
    searchTerm(name);
    return false;
  }

  function searchTerm(term) {
    axios.get(`https://api.giphy.com/v1/gifs/search?limit=10&q=${term}&api_key=pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa`) .then(response => {
      setResults(response.data.data);
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  function lightBox(e) {
    setLightBoxImageSrc(e.target.getAttribute('src'));
    return false;
  }

  function changeLightbox(action) {
    if(action == 'prev') {
      let currentItem = results.filter(item => item.images?.original?.url == lightBoxImageSrc);
      let currentIndex = results.indexOf(currentItem);
      results.forEach((item, index) => {
        if(item.images?.original?.url == lightBoxImageSrc) {
          let newIndex = index - 1;
          if(newIndex < 0) {
            setLightBoxImageSrc(results[results.length - 1].images?.original?.url);
          } else {
            setLightBoxImageSrc(results[newIndex].images?.original?.url);
          }
        }
      });
    }
    if(action == 'next') {
      let currentItem = results.filter(item => item.images?.original?.url == lightBoxImageSrc);
      let currentIndex = results.indexOf(currentItem);
      results.forEach((item, index) => {
        if(item.images?.original?.url == lightBoxImageSrc) {
          let newIndex = index + 1;
          if(newIndex >= results.length) {
            setLightBoxImageSrc(results[0].images?.original?.url);
          } else {
            setLightBoxImageSrc(results[newIndex].images?.original?.url);
          }
        }
      });
    }
    if(action == 'close') {
      setLightBoxImageSrc('');
    }
    return false;
  }

  return (
    <div className="code-challenge">
      <header className="header">
        <input
          type="text"
          value={name}
          placeholder="Search for Gifs"
          onChange={(e) => search(e)}
        />
      </header>
          <section className={`lightbox ${lightBoxImageSrc !== '' ? "--active" : ""}`}>
            <div className="overlay" onClick={() => changeLightbox('close')}></div>
            <div className="image">
              <nav className="nav">
                <button class="prev" onClick={() => changeLightbox('prev')}>
                &lt;
                </button>
                <button class="next" onClick={() => changeLightbox('next')}>
                &gt;
                </button>
                <button class="close" onClick={() => changeLightbox('close')}>
                  X
                </button>
              </nav>
              <img src={lightBoxImageSrc} alt="" />
            </div>
          </section>
      <section className="results">
        <div className="results-header">
          <h1> Results: </h1>
          <p> By Melisa Villegas - melisaviroz@gmail.com </p>
        </div>
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
