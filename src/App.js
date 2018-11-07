import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PhotoGridItem from './components/PhotoGridItem.js'
import PhotoModal from './components/PhotoModal.js'
import { apiService } from './services/apiService.js'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            totalPages: 1,
            isLoading: false,
            images: [],
            showModal: false,
            modalItem: {}
        };
    }

    openImage = modalItem => {
        this.setState({
            showModal: true,
            modalItem: modalItem
        });
    };

    closeImage = () => {
        this.setState({
            showModal: false,
            modalItem: {}
        });
    };

    loadMore = () => {
        this.setState({ isLoading: true });
        apiService.getPhotos({
            page: this.state.currentPage + 1,
            feature: 'popular',
            image_size: '440,1080'
        })
            .then(mappedResponse => {
                this.setState({
                    isLoading: false,
                    currentPage: mappedResponse.currentPage,
                    totalPages: mappedResponse.totalPages,
                    images: [...this.state.images, ...mappedResponse.images]
                });
            })
            .catch(function(error) {
                console.log('Error in fetching photos', error);
            });
    };

    render() {
        return (
            <div className='App'>
                <InfiniteScroll
                    className='infinite-scroll-container'
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={
                        !this.state.isLoading &&
                        this.state.currentPage < this.state.totalPages
                    }
                    threshold={20}
                    loader={
                        <div className='loader' key={0}>
                            {'Loading ...'}
                        </div>
                    }
                >
                    <h2> Popular at 500px </h2>
                    <div className='photos-grid'> {
                        this.state.images.map((image, index) => {
                            return (
                                <PhotoGridItem
                                    whichItem={image}
                                    openImage={this.openImage}
                                    key={index}
                                />
                            );
                        }) }
                    </div>
                </InfiniteScroll>
                {this.state.showModal ? (
                    <PhotoModal
                        showModal={this.state.showModal}
                        closeImage={this.closeImage}
                        modalItem={this.state.modalItem}
                    />
                ) : null}
            </div>
        );
    }
}

export default App;
