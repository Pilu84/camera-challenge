import React, { Component } from 'react';
import Camera from 'react-camera';

export default class MakePhoto extends Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
    }

    takePicture() {

        const cameraView = this.camera.video,
            cameraOutput = this.img,
            cameraSensor = document.querySelector("#camera--sensor");



        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");


    }



    render() {


        return (
            <div className="fluid">


                <Camera
                    className="preview"
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                    <div className="captureContainer" onClick={this.takePicture}>
                        <div className="captureButton" />
                    </div>
                </Camera>

                <div className="row">
                    <img
                        className ="captureImage"

                        ref={(img) => {
                            this.img = img;
                        }}
                    />

                    <canvas id="camera--sensor" className="fluid"></canvas>
                </div>
            </div>
        );
    }
}
