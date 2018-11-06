import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from 'react-grid-gallery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.current_page = 0;
    this.total_pages = 1;
    this.hasMoreItems = true;
    this.isLoading = false;
    this.state = {
      images: []
    };
  }

  static mapGetPhotosResponse(response) {
    const mappedImages = response.data.photos.map(photo => {
      return {
        src: photo.image_url[1],
        thumbnail: photo.image_url[0],
        caption: photo.name,
        thumbnailWidth: 440,
        thumbnailHeight: 440
      };
    });
    return {
      current_page: response.data.current_page,
      total_pages: response.data.total_pages,
      images: mappedImages
    };
  }

  static getPhotos(params) {
    return axios
      .get('https://api.500px.com/v1/photos', {
        params: {
          page: params.page,
          feature: 'popular',
          consumer_key: 'P7LLhKkPAnPUpbfAXk3Jq2iDjYmCx87zgfEDxQVS',
          image_size: '440,1080'
        }
      })
      .then(App.mapGetPhotosResponse);
  }

  loadMore() {
    if (this.isLoading || !this.hasMoreItems) {
      return;
    }
    this.isLoading = true;

    App.getPhotos({
      page: this.current_page + 1
    })
      .then(mappedResponse => {
        this.isLoading = false;
        this.current_page = mappedResponse.current_page;
        this.total_pages = mappedResponse.total_pages;
        this.hasMoreItems = this.current_page <= this.total_pages;
        this.setState({
          images: [...this.state.images, ...mappedResponse.images]
        });
      })
      .catch(function(error) {
        console.log('Error in fetching photos', error);
      });
  }

  render() {
    return (
      <div className='App'>
        <h2 className="photo-heading"> Popular at 500px </h2>
        <InfiniteScroll
          className='infinite-scroll-gallary-container'
          pageStart={0}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.hasMoreItems}
          loader={<div className='loader' key={0}> Loading ...</div>}
        >
          <Gallery images={this.state.images} enableImageSelection={false} />
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
