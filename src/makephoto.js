import React from 'react';



export default class MakePhoto extends React.Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.state = {picture: "", pictureToInput: props.pictureToInput};
    }



    takePicture() {

        const cameraView = document.querySelector("video"),
            cameraOutput = this.img,
            cameraSensor = this.canv;


        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");


        this.setState({picture: cameraOutput});

        this.state.pictureToInput(cameraOutput.src);

    }


    componentDidMount() {

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

            </div>
        );
    }
}
