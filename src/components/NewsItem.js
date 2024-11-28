import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsurl, author, date, source} = this.props;
    return (
      <div>
         <div className="card">
      <img src={imageurl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...<span className="badge rounded-pill text-bg-danger"  style={{ fontSize: '12px' }}> {source}</span></h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsurl} target= '_blank'  className="btn btn-sm btn-primary">Read More</a>
      </div>
    </div>
      </div>
    )
  }
}

export default NewsItem
