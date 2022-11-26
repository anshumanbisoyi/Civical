import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const intialState = {
  title: "",
  tags: [],
  // trending: "no",
  location: "",
  description: "",
};
const cityOptions = [
  "Delhi",
  "Mumbai",
  "Hyderabad",
  "Bengaluru",
  "Bhubaneswar",
  "Chennai",
  "Kolkata",
];

const AddEdit = ({ user,setActive }) => {
  const [form, setForm] = useState(intialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const {id} =useParams();

  const navigate = useNavigate();
  const { title, tags, location, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image uploaded successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(()=>{
    id && getIssueDetail();
  },[id]);
  const getIssueDetail = async() => {
    const docRef =doc(db,"issues",id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
      setForm({...snapshot.data()});
    }
    setActive(null);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTags = (e) => {
    setForm({ ...form, tags });
  };
  const onLocationChange = (e) => {
    setForm({ ...form, location: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location && tags && title && description) {

      //add trending later
      if(!id){
 try {
   await addDoc(collection(db, "issues"), {
     ...form,
     timestamp: serverTimestamp(),
     author: user.displayName,
     userId: user.uid,
   });
   toast.success("Issue create on civical.")
 } catch (err) {
   console.log(err);
 }
      }else{
         try {
           await updateDoc(doc(db, "issues", id), {
             ...form,
             timestamp: serverTimestamp(),
             author: user.displayName,
             userId: user.uid,
           });
           toast.success("Issue updated on civical.");
         } catch (err) {
           console.log(err);
         }
      }
     
    } else{
      return toast.error("All fields are mandartory to fill.");
    }
    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 ">
          <div className="text-center heading py-2">
            {id ? "Update Issue" : "Create Issue"}
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <div className="col-12 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 py-3">
                    <ReactTagInput
                      tags={tags}
                      placeholder="Area Name"
                      onChange={handleTags}
                    />
                  </div>
                  <div className="col-12 py-3">
                    {/* <p className="trending"> Is it upvote worthy?</p>
                    <div className="form-check-inline mx-2">
                      
                      <input
                        type="radio"
                        className="form-check-input"
                        value="yes"
                        name="radioOption"
                        checked={trending === "yes"}
                        onChange={handleChange}
                      />
                      <label htmlFor="radioOption" className="form-check-label">
                        Yes&nbsp;
                      </label>
                      
                      <input
                        type="radio"
                        className="form-check-input"
                        value="no"
                        name="radioOption"
                        checked={trending === "no"}
                        onChange={handleChange}
                      />
                      <label htmlFor="radioOption" className="form-check-label">
                        No
                      </label>
                    </div> */}

                    <div className="col-12 py-1">
                      <select
                        value={location}
                        onChange={onLocationChange}
                        className="catg-dropdown"
                      >
                        <option>Please select your</option>
                        {cityOptions.map((option, index) => (
                          <option value={option || ""} key={index}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 py-3">
                      <textarea
                        className="form-control description-box"
                        placeholder="Description"
                        value={description}
                        name="description"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                    <div className="col-12 py-3 text-center">
                      <button
                        className="btn btn-add"
                        type="submit"
                        disabled={progress !== null && progress < 100}
                      >
                        {id ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
