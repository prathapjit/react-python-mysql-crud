import React, { useEffect, useState } from 'react';
import './App.css';
import { service } from './service/service';


function App() {

  const [users, setUsers] = useState([]);
  const [showForm, setForm] = useState(false);
  const [formTitle, setFormTitle] = useState('New User')
  const [value, setValue] = useState({ name: "", age: "", gender: "", city: "" })
  const initialState = {
    name: '',
    age: '',
    gender: '',
    city: ''
  }

  useEffect(() => {
    console.log("useEffect")
    handleSubmit(null, 'get');
  }, [])


  function reducer(currentState: any, action: any) {
    console.log("get");

    switch (action.type) {
      case 'get':
        let promise = service.get("/api/get", null)
          .then((res: any) => {
            setUsers(res);
          })
        break;

      case 'post':
        console.log("post")
        let postPromise = service.post("/api/insert", currentState)
          .then((res: any) => {
            // setUsers(res);
            console.log(res);
          })
        break;

      case 'update':
        console.log("action", action);
        break;

      case 'delete':
        let id = action.payLoad.target.accessKey
        let deletePromise = service.delete(`/api/delete/${id}`, id)
          .then((res: any) => {
            if (res.status == 200) {
              handleSubmit(null, 'get');
            }
          })
        break;
    }
  }

  const handleSubmit = (event: any, value: any) => {
    let action = {
      type: value,
      payLoad: event
    }
    reducer(value, action);
    // event.preventDefault();
  }

  const handleTableEvent = (event: any, value: any) => {
    switch (value) {
      case 'add':
        setFormTitle("Add User");
        setForm(true);
        break;

      case 'update':
        console.log("update", event.target.accessKey);
        let filteredData: any = users.find((object: any) => { return object.id == event.target.accessKey })
        setValue({ ...filteredData })
        console.log("jk", filteredData)
        setFormTitle("Update User");
        setForm(true);
        break;
    }
  }

  // console.log(name, age, gender, city)
  return (

    <div className="App">
      <h2 className='title'>CRUD APPLICATION</h2>
      <div className='layout'>

        <div className='layout-left'>
          {showForm == false ? <div>
            <p className='add-user' onClick={(e: any) => handleTableEvent(e, "add")}>ADD USER</p>
            <table>
              {users?.map((object: any, index) => {
                let column: any = [];
                let data: any = [];
                Object.keys(object).forEach((key: any) => {
                  if (index == 0) {
                    column.push(<th>{key}</th>)
                  }
                  data.push(<td>{object[key]}</td>)
                })
                return index == 0 ? <>
                  <thead> <tr>{column}
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tr onDoubleClick={(e: any) => { handleSubmit(e, "update") }} id={`row-${object.id}`} key={object.id}>{data}
                    <td><button className='update-button' accessKey={object.id} onClick={(e: any) => handleTableEvent(e, "update")}>Update</button></td>
                    <td><button className='delete-button' accessKey={object.id} onClick={(e: any) => handleSubmit(e, "delete")}>Delete</button></td>
                  </tr>
                </> :
                  <tr id={`row-${object.id}`} key={object.id}>{data}
                    <td><button className='update-button' accessKey={object.id} onClick={(e: any) => handleTableEvent(e, "update")}>Update</button></td>
                    <td><button className='delete-button' accessKey={object.id} onClick={(e: any) => handleSubmit(e, "delete")}>Delete</button></td>
                  </tr>
              })
              }

            </table>
          </div> :





            <>
              <div className='form-nav'>
                <div>
                  <form action='' target="_self" className='form' onSubmit={(e: any) => handleSubmit(e, 'post')}>
                    <div>
                      <p className='form-title'>{formTitle.toUpperCase()}</p>
                    </div>
                    <div>
                      <label>Name : </label>
                      <input id='name' type='text' onChange={(e: any) => { setValue({ ...value, name: e.target.value }) }} value={value.name} />
                    </div>
                    <div>
                      <label>Age : </label>
                      <input id='age' type='text' onChange={(e: any) => { setValue({ ...value, age: e.target.value }) }} value={value.age} />
                    </div>
                    <div>
                      <label>Gender : </label>
                      <input id='gender' type='text' onChange={(e: any) => { setValue({ ...value, gender: e.target.value }) }} value={value.gender} />
                    </div>
                    <div>
                      <label>City : </label>
                      <input id='city' type='text' onChange={(e: any) => { setValue({ ...value, city: e.target.value }) }} value={value.city} />
                    </div>
                    <div id='submit'>
                      <input type="submit" />
                    </div>
                  </form>
                </div>
                <div className='form-cancel'>
                  <p className='back-button' onClick={() => {setValue({...initialState});setForm(false)}}>Back </p>
                </div>
              </div>
            </>
          }
        </div>


      </div>
    </div>
  );
}

export default App;
