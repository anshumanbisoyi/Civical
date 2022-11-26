import { doc, getDoc } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import { db } from '../firebase';

const Detail = (setActive) => {
  const {id}=useParams();
  const [issue,setIssue]=useState(null);

  useEffect(()=>{
    id&& getIssueDetail();
  },[id]);
  const getIssueDetail = async () => {
    const docRef=doc(db,"issues",id);
    const issueDetail = await getDoc(docRef);
    setIssue(issueDetail.data());
    setActive(null);

  }
  return (
    <div className="single">
      <div className="blog-title-box" style={{backgroundImage:`url('${issue?.imgUrl}')`}}
      >
        <div className="overlay"></div>
        <div className='blog-title'>
          <span>{issue?.timestamp.toDate().toDateString()}</span>
          <h2>{issue?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                    By <p className="author">{issue?.author}</p> -&nbsp;
                    {issue?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{issue?.description}</p>
            </div>
            <div className="col-md-3">
              <h2>{issue?.location}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail