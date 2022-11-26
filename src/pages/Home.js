import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Issues from "../components/Issues";
import { db } from "../firebase";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "issues"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setIssues(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

console.log("issues",issues);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="col-md-8">
          <Issues issues={issues}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
