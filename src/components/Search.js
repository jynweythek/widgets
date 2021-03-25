import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);

  console.log(results);

  useEffect(() => {
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    };
    let timeoutId;
    if (term && !results.length) {
      search();
    } else {
      timeoutId = setTimeout(() => {
       if (term) {
         search();
       }
      }, 750);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [term, results.length]);

  const renderedResults = results.map(result => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <h4 className="header">{result.title}</h4>
          <p dangerouslySetInnerHTML={{__html: result.snippet}}/>
        </div>
      </div>
    )
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui items divided">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;
