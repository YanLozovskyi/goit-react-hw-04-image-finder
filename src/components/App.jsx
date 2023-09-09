import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'FetchImages/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalTags, setModalTags] = useState('');

  useEffect(() => {
    if (query !== '') {
      const fetchData = async () => {
        try {
          const data = await fetchImages({ query, page });
          setResults(prevResults => [...prevResults, ...data.hits]);
          setLoading(false);
          setData(data);
          if (data.totalHits > 0 && page === 1) {
            toast.info(`Found ${data.totalHits} images`);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [query, page]);

  const handleFormSubmit = initialQuery => {
    if (initialQuery.trim() === '') {
      return toast.error('Enter your request');
    }

    if (initialQuery === query) {
      return toast.info(
        `You've already entered: ${query}. Enter another request`
      );
    }
    setQuery(initialQuery);
    setLoading(true);
    setResults([]);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prev => prev + 1);
    setLoading(true);
  };

  const onImgClick = (largeImageURL, tags) => {
    setShowModal(true);
    setModalImg(largeImageURL);
    setModalTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalPage = data.totalHits / perPage;
  const isGalleryEmpty = results.length === 0;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && (
        <div className={css.loader}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      {isGalleryEmpty && query && (
        <div className={css.text}>
          We apologize, but we couldn't find any images for your search. Please
          try entering different keywords.
        </div>
      )}
      {isGalleryEmpty && query === '' && (
        <div className={css.text}>
          Please enter a search query to start exploring images.
        </div>
      )}
      {results.length > 0 && (
        <ImageGallery results={results} onClick={onImgClick} />
      )}
      {!loading && totalPage > page && results.length > 0 && (
        <Button onClick={onLoadMoreClick} />
      )}
      {showModal && (
        <Modal onClose={closeModal} modalImg={modalImg} modalTags={modalTags} />
      )}
    </>
  );
};

export default App;
