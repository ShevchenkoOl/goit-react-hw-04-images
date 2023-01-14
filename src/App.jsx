import React, { Component } from 'react';
import Notiflix from 'notiflix';

import { fetchData, notifySettings } from './Api/Api';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import { Button } from './components/Button/Button';


export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    picsArr: [],
    isLoading: false,
    showModal: false,
    showLoadMoreButton: false,
    imageTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchQuery(this.state.searchQuery, this.state.page);
    }
  }

  onSubmit = FormData => {
    const { query } = FormData;
    this.setState({ searchQuery: query, page: 1, picsArr: [] });
  };

  async fetchQuery(query, page) {
    try {
      await fetchData(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - 12 * this.state.page;

        if (picsArr.length === 0) {
          this.setState({ showLoadMoreButton: false });
          Notiflix.Notify.failure(
            'К сожалению, нет изображений, соответствующих вашему поисковому запросу. Пожалуйста, попробуйте еще раз.',
            notifySettings
          );
          return;
        } else {
          this.setState(prevState => ({
            picsArr: [...prevState.picsArr, ...picsArr],
          }));
        }

        if (picsArr.length > 0 && this.state.page === 1) {
          Notiflix.Notify.success(
            `Поздравляем, мы нашли всего ${total} картинок.`,
            notifySettings
          );
        }

        picsLeft > 0
          ? this.setState({ showLoadMoreButton: true })
          : this.setState({ showLoadMoreButton: false });

      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Что-то пошло не так, попробуйте ещё раз.',
        notifySettings
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }

  toggleModal = (largeImageURL, imageTags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
      imageTags: imageTags,
    }));
  };

  onLoadMoreButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        <div>
          <ImageGallery
            pics={this.state.picsArr}
            showModal={this.toggleModal}
          />

          {this.state.showLoadMoreButton && (
            <Button
              status="load"
              onClick={this.onLoadMoreButtonClick}
              onLoaderPlay={this.state.isLoading}
            />
          )}
        </div>
        {this.state.isLoading && <Loader />}

        {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
