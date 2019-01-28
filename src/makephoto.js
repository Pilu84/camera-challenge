import React from 'react';
import axios from './axios';

export default class MakePhoto extends React.Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.state = {pictureToInput: props.pictureToInput, test: "", uploadProgress: props.uploadProgress, uploadOk: props.uploadOk, uploadedPic: props.uploadedPic};
    }



    takePicture() {

        const cameraView = document.querySelector("video"),
            cameraOutput = this.img,
            cameraSensor = this.canv;

        const width = cameraView.videoWidth / 2;
        const height = cameraView.videoHeight / 2;

        cameraSensor.width = width;
        cameraSensor.height = height;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0, width, height);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");


        this.setState({picture: cameraOutput});

        var dataUrl = cameraSensor.toDataURL('image/jpeg', 0.7).replace('data:image/jpeg;base64,', '');



        let sendData = {picture: JSON.stringify(dataUrl)};

        axios.post("/makepdf", sendData).then(resp => {
            console.log("a resp.data: ", resp.data);
            if(resp.data.succes) {
                this.state.uploadOk();
                this.state.uploadedPic(resp.data.uploaded);
            }
        });


    }


    componentDidMount() {

        this.state.uploadProgress();

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {


                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }

                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "environment" } })
            .then(function(stream) {
                var video = document.querySelector('video');

                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {

                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = function() {
                    video.play();
                };
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });
    }


    render() {


        return (
            <div className="input-group mb-3">

                <canvas ref={(canv) => {this.canv = canv; }} className="non-visible"></canvas>
                <div className="row mb-5">
                    <img className ="w-100 h-100" ref={(img) => {this.img = img;}} />
                </div>
                <video className="w-100 h-100" ref={(camera) => {this.camera = camera;}}></video>

                <div className="captureContainer" onClick={this.takePicture}>
                    <div className="captureButton"></div>
                </div>
                <img src={this.state.test} />
            </div>
        );
    }
}
