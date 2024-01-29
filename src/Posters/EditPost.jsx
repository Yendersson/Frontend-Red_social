import './Post.css'
import axios from "axios";
import { useState } from "react";
import { handleFileSelect } from '../utils/updateFiles';

// PRODUCTION
const urlBase = 'https://red-social-by-yender.glitch.me/feed/'
// localhost
//const urlBase = 'http://localhost:8080/feed/';

function EditPost(props) {

    const [data, setData] = useState({});

    const datoACargar = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(values => ({ ...values, [name]: value }));
    }
    const files = (e) => {
        const nombre = e.target.name;
        const file = handleFileSelect(e.target.files[0]);
        if (file) setData(values => ({ ...values, [nombre]: file }));
    }

    const cancelModif = () => {
        const datos = { show: null, datos: null };
        props.recibirDatos(datos);
    }

    const putPost = async () => {
        const actualizarPost = await axios.put(`${urlBase}${props.show.datos}?user=${localStorage.getItem('user').split(',')[1]}`, data,
            {
                headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
            })

        if (!actualizarPost.data.err) {
            cancelModif();
            props.update();

        } else {
            console.log(actualizarPost.data.err)
        }

        // console.log(actualizarPost);
    }

    if (props.show.show) {

        return (
            <div className='confirm__deletePost show__delete__postModal' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" onClick={cancelModif} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="image">
                                <input type="file" id="image" name="image" onChange={e => files(e)} />
                            </label>
                            <label htmlFor="exampleFormControlTextarea1">Modficar</label>
                            <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows="3" onChange={(e) => datoACargar(e)}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cancelModif}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={putPost}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditPost;
