import ReactS3Uploader from 'react-s3-uploader';
import React from 'react';
import ReactDOM from 'react-dom';

class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            fileChosenText: 'Picture not chosen'
        };
    }

    onUploadFinish(e) {
        const imageUrl = e['signedUrl'].split('?')[0];
        this.setState({
            ['value']: imageUrl,
            ['fileChosenText']: 'Picture uploaded'
        });
    }

    onUploadStart(file, cb) {
        // Load the image
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let image = new Image();
            image.onload = () => {
                // Resize the image
                let canvas = document.createElement('canvas');
                let maxSize = 320;
                let width = image.width;
                // TODO: use some cropper instead of this
                if (width > maxSize) {
                    width = maxSize;
                }
                let height = 3 * width / 4; // force aspect ratio
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                let dataUrl = canvas.toDataURL('image/jpeg');
                let resizedImage = this.dataURLToBlob(dataUrl);
                resizedImage.lastModifiedDate = new Date();
                resizedImage.name = file.name;
                cb(resizedImage);
            };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }

    dataURLToBlob(dataURL) {
        if (typeof window !== 'undefined') {
            let BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) === -1) {
                let parts = dataURL.split(',');
                let contentType = parts[0].split(':')[1];
                let raw = parts[1];
                return new Blob([raw], {type: contentType});
            }

            let parts = dataURL.split(BASE64_MARKER);
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);

            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {type: contentType});
        }
    }

    render() {
        return <div>
            <label className="btn btn-primary">
                <ReactS3Uploader
                    signingUrl="/s3/sign"
                    signingUrlMethod="GET"
                    accept="image/*"
                    preprocess={(e, cb) => this.onUploadStart(e, cb)}
                    // onProgress={(e) => this.onUploadFinish(e)}
                    // onError={(e) => this.onUploadFinish(e)}
                    onFinish={(e) => this.onUploadFinish(e)}
                    signingUrlWithCredentials={true}
                    uploadRequestHeaders={{'x-amz-acl': 'public-read', 'Cache-Control': 'max-age=31536000'}}
                    contentDisposition="auto"
                    scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                    hidden
                />Add a Picture
            </label>
            {' '}
            {this.state.fileChosenText}
            <input name={this.props.name} value={this.state.value} hidden/>
        </div>;
    }
}


document.addEventListener('turbolinks:load', function () {
    const recipe_image_uploader = document.getElementById('recipe_image_uploader');
    if (recipe_image_uploader) {
        ReactDOM.render(<Uploader name="recipe[image_url]"/>, recipe_image_uploader);
    }
});
