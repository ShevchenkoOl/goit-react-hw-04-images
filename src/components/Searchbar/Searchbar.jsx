//import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

import { notifySettings } from 'Api/Api';
import Notiflix from 'notiflix';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) =>{
  const [query, setQuery] = useState ('');


// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };

  const onInputChange = event => {
    setQuery(event.target.value);
  };
    // const query = event.currentTarget.value;
    // this.setState({ query: query });
  

  const handleSubmit = event => {
    event.preventDefault();

    // this.props.onSubmit(this.state);
    // this.setState({ query: '' });
    
    if (query === event) 
    {
      return Notiflix.Notify.success(
        `Вы уже просматриваете ${query}.`,
       notifySettings
      );
    }
// this.setState({query:event.toLowerCase(), pics:[], page:1})
    onSubmit(query);
    setQuery('');  
};

   
// handleSubmit = event => {
// if (this.state.query === event) 
//     {
//       return Notiflix.Notify.success(
//         `Вы уже просматриваете ${this.state.query}.`,
//        notifySettings
//       );
//     }
// this.setState({query:event.toLowerCase(), pics:[], page:1})

  //render() {
   
  return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            value={query}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            onChange={onInputChange}
          />
        </form>
      </header>
    );
  };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
