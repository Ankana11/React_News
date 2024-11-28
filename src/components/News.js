import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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
      totalResults: 0, // To track the total number of articles available
    };
  }

  async componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = async () => {
    const { page } = this.state;
    const { category } = this.props;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=e57231eade29412a843937296b240cb2&page=${page}&pageSize=10`;
    this.setState({ loading: true });
    
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center mt-5" style={{ marginTop: '72px' }}>Today's Top {this.category} Headlines</h2>
        {this.state.loading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <div className="spinner-grow text-primary" role="status">
  </div>
</div>
}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">

         
          <div className="row mt-3">
            {this.state.articles.map((element, index) => {
              return (
                <div className="col-md-4 my-2" key={element.url || index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 60) : "No title available"}
                    description={element.description ? element.description.slice(0, 100) : "No description available"}
                    imageurl={element.urlToImage || "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fc95a2e5d-7819-4ee2-9baf-eda69718903b.jpg?source=next-barrier-page"}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
    </>
    );
  }
}

export default News;
