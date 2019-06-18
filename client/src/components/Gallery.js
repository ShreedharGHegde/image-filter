import React, { Component } from "react";
import axios from "axios";

export default class Gallery extends Component {
  state = {
    floorUrl: null,
    image: null,
    gallery: [],
    floortest: false,
    wholeRoom: false,
    imgUploaded: false,
    resultUrl: false,
    urls: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  floorOnlyHandle = e => {
    this.setState({});
  };

  urlHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  imageHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  onSubmit = e => {
    console.log(this.state);
    this.setState({
      loading: true
    });
    e.preventDefault();
    const formData = new FormData();
    formData.append("floortestUrl", this.state.floorUrl);
    formData.append("floortest", this.state.floortest);
    // formData.append("colorize", this.state.)
    axios
      .post("http://localhost:5000/upload", formData)
      .then(res => {
        console.log("res", res.data);
        if (res.data.result) {
          this.setState(
            {
              urls: res.data.result
            },
            () => {}
          );
          // } else if (this.state.resultUrl) {
          //   this.setState({
          //     resultUrl: `https://algorithmia.com/v1/data/${res.data.resultUrl}`,
          //     imgUploaded: res.data.imgUploaded
          //   });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("urls", this.state.urls);
    let floorImages = this.state.urls
      ? this.state.urls.map(url => {
          return (
            <img
              src={url}
              alt=""
              key={url}
              style={{
                width: 200,
                height: 200,
                paddingLeft: 20,
                paddingTop: 20
              }}
            />
          );
        })
      : null;

    return (
      <div>
        <div>
          <h3>Algorithmia</h3>
        </div>

        <form onSubmit={this.onSubmit}>
          {/* <input type="file" onChange={this.imageHandler} />{" "} */}
          <br />{" "}
          {/* <input
            type="checkbox"
            name="colorize"
            checked={this.state.checked}
            onChange={this.onChange}
            id="colorize"
          />
          colorize
          <br />{" "} */}
          <div>
            Insert url of an image for floor detection and select one of the
            filters
          </div>
          <div>
            <input type="text" name="floorUrl" onChange={this.urlHandle} />
          </div>
          <div>
            <input
              type="radio"
              name="floortest"
              value="flooronly"
              checked={this.state.checked}
              onChange={this.onChange}
              style={{ marginLeft: 30 }}
            />{" "}
            floor only
            <input
              type="radio"
              name="floortest"
              value="wholeroom"
              checked={this.state.checked}
              onChange={this.onChange}
            />{" "}
            whole room
          </div>
          <div style={{ paddingTop: 10 }}>
            <button type="submit" value="submit">
              Detect floors
            </button>
          </div>
        </form>

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              {this.state.floorUrl ? (
                <div>
                  <h4>Image from URL</h4>
                  <img
                    src={this.state.floorUrl}
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
            {floorImages ? (
              <div style={{ paddingTop: 30 }}>
                <div>
                  <h4>Detected floors </h4>
                </div>{" "}
                {floorImages}{" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
