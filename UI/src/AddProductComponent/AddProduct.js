import './AddProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrlCategory, apiUrlSubCategory,apiUrlProduct } from '../apiUrl';

function AddProduct() {
  const [output, setOutput] = useState();
  const [File, setFile] = useState();
  const [catname, setcatname] = useState('');
  const [subcatname, setsubcatname] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [cDetails, setCDetails] = useState([]);
  const [scDetails, setScDetails] = useState([]);

  useEffect(() => {
    axios.get(apiUrlCategory + "fetch").then((response) => {
      setCDetails(response.data);
    }).catch((error) => {
      console.log(error);
    })
  })

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (catname) {
      axios.get(`${apiUrlSubCategory}fetch?catnm=${catname}`).then((response) => {
          if (response.data.length > 0) {
            setScDetails(response.data); // Set subcategories if available
          } else {
            setScDetails([]); // Clear subcategories if none exist
          }
        }).catch((error) => {
          console.log(error);
          setScDetails([]); // Clear subcategories on error
        });
    } else {
      setScDetails([]); // Clear subcategories if no category is selected
    }
  }, [catname]);
  


  const handeChange = (event) => {
    setFile(event.target.files[0]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("title", title);
    formData.append("catnm", catname);
    formData.append("subcatnm", subcatname);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("picon", File);

    const config = {
      "content-type": 'multipart/form-data'
    }

    axios.post(apiUrlProduct + "save", formData, config).then((response) => {
      setOutput("Product added successfully");
      setcatname("");
      setsubcatname("");
      setDescription("");
      setPrice("");
      setTitle("");
    }).catch((error) => {
      console.log(error);
      setOutput("Product Not Added successfully");
      setcatname("");
      setsubcatname("");
      setDescription("");
      setPrice("");
      setTitle("");
    });

  }
  return (
    <>
      <section class="banner_main">
        <div id="banner1" >
          <div class="container">
            <div class="text">
              <h1>Add Product Here</h1>
              <br />
              <span style={{ "color": "red" }}>{output}</span>
              <form>
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input type="text" class="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                  <label for="category name">Category Name:</label>
                  <select class="form-control" value={catname} onChange={e => setcatname(e.target.value)}>
                    <option>selectCategory</option>
                    {
                      cDetails.map((row) => (
                        <option>{row.catnm}</option>
                      ))
                    }
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <label for="Subcategory name">Sub Category Name:</label>
                  <select class="form-control" value={subcatname} onChange={e => setsubcatname(e.target.value)}>
                    <option>selectSubCategory</option>
                    {
                      scDetails.map((row) => (
                        <option>{row.subcatnm}</option>
                      ))
                    }
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <label for="Description">Description:</label>
                  <input type="text" class="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                  <label for="price">Price:</label>
                  <input type="text" class="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                  <label for="picon">Product Icon:</label>
                  <input type="file" class="form-control" onChange={handeChange} />
                </div>
                <br />
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddProduct;
