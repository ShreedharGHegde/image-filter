import React, { Component, Image } from "react";
import axios from "axios";

export default class Gallery extends Component {
  state = {
    file: null,
    image: null,
    gallery: [],
    colorize: false,
    floortest: false,
    imgUploaded: false,
    resultUrl: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  imageHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("colorize", this.state.colorize);
    formData.append("floortest", this.state.floortest);
    // formData.append("colorize", this.state.)
    axios
      .post("http://localhost:5000/upload", formData)
      .then(res => {
        console.log(res.data);
        this.setState(
          {
            resultUrl: `https://algorithmia.com/v1/data/${res.data.resultUrl}`,
            imgUploaded: res.data.imgUploaded
          },
          () => {
            console.log(this.state.resultUrl);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // let photos = this.state.gallery.map(imgName => {
    //   return <img src={require(`../uploads/${imgName}`)} alt="" />;
    // });

    console.log(this.state.gallery);
    return (
      <div>
        <div>Upload Image</div>

        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.imageHandler} />{" "}
          <button type="submit" value="submit">
            Upload
          </button>
          <br />{" "}
          <input
            type="checkbox"
            name="colorize"
            checked={this.state.checked}
            onChange={this.onChange}
            id="colorize"
          />
          colorize
          <br />{" "}
          <input
            type="checkbox"
            name="floortest"
            onChange={this.onChange}
            checked={this.state.checked}
            id="foortest"
          />
          floor test
        </form>

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              {this.state.imgUploaded ? (
                <div>
                  <p>Image you uploaded</p>
                  <img
                    src={require(`../uploads/${this.state.imgUploaded}`)}
                    alt="new"
                    height="200px"
                    width="300px"
                  />
                </div>
              ) : null}
            </div>
            <div className="col-lg-3">
              {this.state.resultUrl ? (
                <div>
                  <p>After applying filter</p>
                  <img
                    src={this.state.resultUrl}
                    alt="new"
                    height="200px"
                    width="300px"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
