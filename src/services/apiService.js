import axios from 'axios';

class ApiService {

    consumerKey = {
        'consumer_key': 'P7LLhKkPAnPUpbfAXk3Jq2iDjYmCx87zgfEDxQVS'
    };

    constructor() {
    }

    mapGetPhotosResponse(response) {
        const mappedImages = response.data.photos.map(photo => {
            return {
                thumbnail: photo.image_url[0],
                src: photo.image_url[1],
                caption: photo.name,
                description: photo.description
            };
        });
        return {
            currentPage: response.data['current_page'],
            totalPages: response.data['total_pages'],
            images: mappedImages
        };
    }

    async getPhotos(params) {
        try {
            return this.mapGetPhotosResponse(
                await axios.get('https://api.500px.com/v1/photos', {
                    params: {
                        ...params,
                        ...this.consumerKey
                    }
                })
            );
        }
        catch(e) {
            console.log('Exception from getPhotos method ', e);
        }

    }


}

export const apiService = new ApiService();

