import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { fetchData, notifySettings } from './Api/Api';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import { Button } from './components/Button/Button';


export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [picsArr, setPicsArr] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(false);
  const [imageTags, setImageTags] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    fetchQuery(searchQuery, page);
  }, [searchQuery, page]);

  async function fetchQuery(query, page) {
    try {
      await fetchData(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - 12 * page;

        if (picsArr.length === 0) {
          setShowLoadMoreBtn(false);
          Notiflix.Notify.failure(
            'К сожалению, нет изображений, соответствующих вашему поисковому запросу. Пожалуйста, попробуйте еще раз.',
            notifySettings
          );
          return;
        } else {
          setPicsArr(PrevPicsArr => [...PrevPicsArr, ...picsArr]);
        }

        if (picsArr.length > 0 && page === 1) {
          Notiflix.Notify.success(
            `Поздравляем, мы нашли всего ${total} картинок.`,
            notifySettings
          );
        }
        picsLeft > 0 ? setShowLoadMoreBtn(true) : setShowLoadMoreBtn(false);
      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Что-то пошло не так, попробуйте ещё раз.',
        notifySettings
      );
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = query => {
    setSearchQuery(query);
    setPicsArr([]);
    setPage(1);
  };

  const onLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL, imageTags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      
      <div>
        <ImageGallery pics={picsArr} showModal={toggleModal} />

        {showLoadMoreBtn && (
          <Button
            text="Load more"
            status="load"
            onClick={onLoadMoreBtnClick}
            onLoaderPlay={isLoading}
          />
        )}
      </div>
      {isLoading && <Loader />}

      {showModal && (
        <Modal src={largeImageURL} alt={imageTags} closeModal={toggleModal} />
      )}
    </>
  );
};