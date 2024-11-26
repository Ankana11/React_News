import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    category: 'general',
  };

  static propTypes = {
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e57231eade29412a843937296b240cb2`;
    let data = await fetch(url);
    let persedata = await data.json();
    console.log(persedata);
    this.setState({ articles: persedata.articles });
  }
  

  handlenext = async () => {
    console.log("click on next");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e57231eade29412a843937296b240cb2&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let persedata = await data.json();
    console.log(persedata);
    this.setState({
      page: this.state.page + 1,
      articles: persedata.articles,
    });
  };

  handleprev = async () => {
    console.log("click on previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e57231eade29412a843937296b240cb2&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let persedata = await data.json();
    console.log(persedata);
    this.setState({
      page: this.state.page - 1,
      articles: persedata.articles,
    });
  };

  render() {
    return (
      <div className='container my-3'>
        <h2>Today's Top Headlines</h2>

        <div className="row mt-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 60) : "No title available"}
                  description={element.description ? element.description.slice(0, 100) : "No description available"}
                  imageurl={element.urlToImage || "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fc95a2e5d-7819-4ee2-9baf-eda69718903b.jpg?source=next-barrier-page"}
                  newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprev}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
