import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'FetchImages/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    error: null,
    data: '',
    query: '',
    results: [],
    loading: false,
    page: 1,
    perPage: 12,
    showModal: false,
    modalImg: '',
    modalTags: '',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      try {
        const data = await fetchImages({ query, page });
        this.setState(prevState => ({
          results: [...prevState.results, ...data.hits],
          loading: false,
          data,
        }));
        if (data.totalHits > 0 && this.state.page === 1) {
          toast.info(`Found ${data.totalHits} images`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleFormSubmit = query => {
    if (query.trim() === '') {
      return toast.error('Enter your request');
    }

    if (query === this.state.query) {
      return toast.info(
        `You've already entered: ${query}. Enter another request`
      );
    }

    this.setState({ query, loading: true, results: [], page: 1 });
  };

  onLoadMoreClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      isLoading: true,
    }));
  };

  onImgClick = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      modalImg: largeImageURL,
      modalTags: tags,
    });
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  render() {
    const {
      loading,
      query,
      data,
      results,
      page,
      perPage,
      modalImg,
      modalTags,
      showModal,
    } = this.state;

    const totalPage = data.totalHits / perPage;
    const isGalleryEmpty = results.length === 0;

    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <Searchbar onSubmit={this.handleFormSubmit} />
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
            We apologize, but we couldn't find any images for your search.
            Please try entering different keywords.
          </div>
        )}
        {isGalleryEmpty && query === '' && (
          <div className={css.text}>
            Please enter a search query to start exploring images.
          </div>
        )}
        {results.length > 0 && (
          <ImageGallery results={results} onClick={this.onImgClick} />
        )}
        {!loading && totalPage > page && results.length > 0 && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            onClose={this.closeModal}
            modalImg={modalImg}
            modalTags={modalTags}
          />
        )}
      </>
    );
  }
}
