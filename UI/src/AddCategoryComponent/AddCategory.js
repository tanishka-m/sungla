import './AddCategory.css';
import { useState } from 'react';
import axios from 'axios';
import { apiUrlCategory } from '../apiUrl';

function AddCategory() {
  const [output, setOutput] = useState();
  const [File, setFile] = useState();
  const [catname, setcatname] = useState();

  const handeChange = (event) => {
    setFile(event.target.files[0]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("catnm", catname);
    formData.append("caticon", File);

    const config = {
      "content-type": 'multipart/form-data'
    }

    axios.post(apiUrlCategory + "save", formData, config).then((response) => {
      setOutput("category added successfully");
      setcatname("");
    }).catch((Error) => {
      console.log(Error)
      setOutput("category Not Added successfully");
      setcatname("");
    });

  }
  return (
    <>
      <section class="banner_main">
        <div id="banner1" >
          <div class="container">
            <div class="text">
              <h1>Add Category Here</h1>
              <span style={{ "color": "red" }}>{output}</span>
              <form>
                <div class="form-group">
                  <label for="category name">Category Name:</label>
                  <input type="text" class="form-control" value={catname} onChange={e => setcatname(e.target.value)} />
                </div>
                <br />

                <div class="form-group">
                  <label for="caticon">Category Icon:</label>
                  <input type="file" class="form-control" onChange={handeChange} />
                </div>
                <br />
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddCategory;
