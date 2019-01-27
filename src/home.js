import React from "react";
import MakePhoto from "./makephoto";

export default class Home extends React.Component{
    constructor() {
        super();

        this.state = {messageName: "",
            messagePhone: "",
            messageEmail: "",
            loadCamera: false};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
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



                    <div className="row p-5">
                        <form onSubmit={this.handleSubmit} className="form-horizontal w-100">

                            <div className="form-group">
                                { this.state.messageName && <div className="alert alert-danger"> {this.state.messageName} is required! Please try again! </div>}
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Your Name" aria-label="name" aria-describedby="basic-addon1" name="name" onChange={this.handleChange}/>
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
                                <div className="input-group justify-content-center">
                                    <button className = "btn btn-primary mt-5" onClick={this.takePhoto}>Take a picture</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group mb-3 justify-content-center">
                                    <button className = "btn btn-primary mt-5 mb-5">Send Email</button>
                                </div>
                            </div>



                        </form>
                    </div>

                </div>

                <div className="col-sm-6">
                    {this.state.loadCamera &&<MakePhoto /> }
                </div>
            </div>

        );
    }
}
