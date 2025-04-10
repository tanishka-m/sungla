import './AddSubCategory.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { apiUrlCategory,apiUrlSubCategory } from '../apiUrl';

function AddSubCategory() {
  const [output, setOutput] = useState();
  const [File, setFile] = useState();
  const [catname, setcatname] = useState();
  const [subcatname,setSubCategoryName] = useState();
  const [cDetails,setCDetails] = useState([]);

  useEffect(()=>{
    axios.get(apiUrlCategory+"fetch").then((response)=>{
      setCDetails(response.data);
    }).catch((error)=>{
      console.log(error);
    })    
  })

  const handeChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    var formData = new FormData();
    formData.append("catnm", catname);
    formData.append("subcatnm", subcatname);
    formData.append("caticon", File);

    const config = {
      "content-type": 'multipart/form-data'
    }

    axios.post(apiUrlSubCategory + "save", formData, config).then((response) => {
      setOutput("subcategory added successfully");
      setcatname("");
      setSubCategoryName("");
    }).catch((Error) => {
      console.log(Error)
      setOutput("subcategory Not Added successfully");
      setcatname("");
      setSubCategoryName("");
    });
  }

  return (
    <>
      <section class="banner_main">
        <div id="banner1" >
          <div class="container">
            <div class="text">
              <h1>Add Sub Category Name!</h1>
              <span style={{ "color": "red" }}>{output}</span>
              <form>
                <div class="form-group">
                  <label for="category name">Category Name:</label>
                  <select class="form-control" value={catname} onChange={e=>setcatname(e.target.value)}>
                    <option>selectCategory</option>
                    {
                      cDetails.map((row)=>(
                        <option>{row.catnm}</option>
                      ))
                    }
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <label for="sub category name">Sub Category Name:</label>
                  <input type="text" class="form-control" value={subcatname} onChange={e=>setSubCategoryName(e.target.value)}/>
                </div>
                <br />

                <div class="form-group">
                  <label for="caticon">Category Icon:</label>
                  <input type="file" class="form-control" onChange={handeChange} />
                </div>
                <br />
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add Sub Category</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddSubCategory;



