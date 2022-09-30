import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// PRODUCTION
const urlBase = 'https://red-social-by-yender.glitch.me/feed/'

// const urlBase = 'http://localhost:8080/feed/'; LOCALHOST

function CreatePost() {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id)

    const datos = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(values => ({...values, [name]: value}));
    }

console.log(data)

    const creacion = async()=>{

        const createpost = await axios.post(`${urlBase}${id}`,data,{
            headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
        })
        if(!createpost.err) navigate('/feed');
        
        console.log(createpost.data.err);
    }

    return(

        <div>

            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Que piensas?</label>
                    <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows="3" onChange={(e)=> datos(e)}></textarea>

                <button className="btn btn-primary" onClick={creacion}>Publicar</button>
                <button className="btn btn-danger" onClick={()=> navigate('/feed')}>Cancelar</button>
            </div>

        </div>
    )
}

export default CreatePost;