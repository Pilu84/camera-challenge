import React from "react";
import MakePhoto from "./makephoto";
import axios from "./axios";

export default class Home extends React.Component{
    constructor() {
        super();

        this.state = {messageName: "",
            messagePhone: "",
            messageEmail: "",
            picture: "",
            okMessage: false,
            errorFeedback: false,
            upload: true,
            loadCamera: false};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.uploadOk = this.uploadOk.bind(this);
        this.uploadProgress = this.uploadProgress.bind(this);
        this.uploadedPic = this.uploadedPic.bind(this);

    }

    uploadedPic(img) {
        console.log("az img: ", img);
        this.setState({picture: img});
    }

    uploadProgress() {
        this.setState({upload: false});
    }

    uploadOk() {
        this.setState({upload: true});
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    handleSubmit(e) {
        e.preventDefault();

        const {name, email, phone } = this.state;
        if(!name || !email || !phone) {
            if(!name) {
                this.setState({messageName: "Your name", errorClassEmail: "errorinput"});
            }

            if(!email) {
                this.setState({messageEmail: "Your email", errorClassName: "errorinput"});
            }

            if(!phone) {
                this.setState({messagePhone: "Your phoe", errorClassName: "errorinput"});
            }

            return;
        }


        axios.post("/sendmessage", this.state).then(resp=> {
            if(resp.data.success) {
                this.setState({okMessage: true});
            } else {
                this.setState({errorFeedback: true});
            }
        });


    }


    takePhoto() {

        this.setState({loadCamera: true});
    }

    render() {


        return (
            <div className="mx-auto">
                <div className="col-sm-6">
                    <div className="row p-5 bg-primary rounded">
                        <img src="me-club-logo.png" />
                    </div>

                    {this.state.okMessage && <div className="row"><h1>Thank you your message, we call you soon as possible!</h1></div>}
                    {this.state.errorFeedback && <div className="row"><h1>We are sorry, but something be wrong, please fill it once again! Thank you!</h1></div>}

                    {!this.state.okMessage &&
                    <div className="row p-5">
                        <form onSubmit={this.handleSubmit} className="form-horizontal w-100">

                            <div className="form-group">
                                { this.state.messageName && <div className="alert alert-danger"> {this.state.messageName} is required! Please try again! </div>}
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Your Name" aria-label="name" aria-describedby="basic-addon1" name="name" onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                { this.state.messageEmail && <div className="alert alert-danger"> {this.state.messageEmail} is required! Please try again! </div>}
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-at"></i></span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Your Email" aria-label="email" aria-describedby="basic-addon1" name="email" onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group">
                                { this.state.messagePhone && <div className="alert alert-danger"> {this.state.messagePhone} is required! Please try again! </div>}
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-mobile-alt"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Your Phone" aria-label="phone" aria-describedby="basic-addon1" name="phone" onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group">

                                <span><p className="text-center">Your message</p></span>
                                <div className="input-group mb-3">
                                    <textarea className="form-control" rows="5" name="message" onChange={this.handleChange}></textarea>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group mb-3 justify-content-center">
                                    {this.state.upload && <button className = "btn btn-primary mt-5 mb-5">Send Email</button>}
                                </div>
                            </div>

                        </form>


                        <div className="row">
                            <div className="mb-3 justify-content-center">
                                <button className = "btn btn-primary mt-5" onClick={this.takePhoto}>Take a picture</button>
                            </div>
                            <div className="col-sm-6">
                            </div>
                            {this.state.loadCamera &&<MakePhoto uploadOk = {this.uploadOk} uploadProgress = {this.uploadProgress} uploadedPic = {this.uploadedPic}/> }
                        </div>
                    </div>}

                </div>

            </div>

        );
    }
}
