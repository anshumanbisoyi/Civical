import React from 'react';
import FontAwesome from 'react-fontawesome';
import { excerpt } from '../utility';




const Issues = ({issues,user}) => {
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">People Issues</div>
      {issues?.map((item) => (
        <div className="row pb-4" key={item.id}>
          <div className="col-md-5">
            <div className="hover-blogs-img">
              <div className="blogs-img">
                <img src={item.imgUrl} alt={item.title} />
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start">
              <h6 className="category catg-color">{item.location}</h6>
              <span className="title py-2">{item.title}</span>
              <span className="meta-info">
                <p className="author">{item.author}</p> on  
                &nbsp;{item.timestamp.toDate().toDateString()}
              </span>
            </div>
            <div className="short-description text-start">
              {excerpt(item.description, 120)}
            </div>
            <button className="btn btn-read">Read More</button>
            <div style={{ float: "right" }}>
              <FontAwesome
                name="edit"
                style={{ margin: "15px", cursor: "pointer" }}
                size="2px"
              />
              <FontAwesome
                name="trash"
                style={{ cursor: "pointer" }}
                size="2px"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Issues