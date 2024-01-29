import './Myprofile.css'
import useAxios from "axios-hooks";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteProfile from './DeleteProfile';
import { handleFileSelect } from '../utils/updateFiles.js';

// PRODUCTION
const urlBase = 'https://red-social-by-yender.glitch.me/profile';
const upload = 'https://red-social-by-yender.glitch.me/upload/';
// localhost
// const urlBase ='http://localhost:8080/profile';
// const upload = 'http://localhost:8080/upload/';

function MyProfile() {

    const { id } = useParams();

    const [datos, setDatos] = useState({});
    const [modificar, setModificar] = useState(false);
    const [borrado, setBorrado] = useState(null);

    const [{ data, loading, error }, refetch] = useAxios({
        url: `${urlBase}/${id}`,
        headers: { 'Authorization': localStorage.getItem('user').split(',')[0] },
    });

    const putProfile = e => {

        const nombre = e.target.name;
        const value = (e.target.value === '') ? e.target.placeholder : e.target.value;
        console.log(e.target.placeholder);

        setDatos(values => ({ ...values, [nombre]: value }));
    }

    const testFiles = (e) => {
        const nombre = e.target.name;
        const file = handleFileSelect(e.target.files[0]);
        if (file) setDatos(values => ({ ...values, [nombre]: file }));
    }

    const submitChanges = async () => {
        const cambiosRealizado = await axios.put(`${urlBase}/${id}`, datos, {
            headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
        })
        console.log(cambiosRealizado);
        refetch();
        window.location.reload();
    }

    const recibirBorrado = (datos) => {
        setBorrado(datos)
    };


    if (loading) return (
        <div className='d-flex flex-column justify-content-center vh-100'>

            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

        </div>
    );

    if (error) return (
        <p>Error</p>
    )

    if (!modificar) return (

        <div>
            <div className={borrado ? 'container__Myprofile overview' : 'container__Myprofile'}>
                {data.map((elementos, index) => {
                    return (
                        <>
                            <div className="jumbotron mt-3 p-3" >

                                <div className="media">
                                    <div className='img__Myprofile'>
                                        {elementos.IMAGE && (<img src={`${upload}/${elementos.IMAGE}`} alt="" />)}
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mt-0">{elementos.USERNAME}</h5>
                                        <p>Hola me llamo Yenderson</p>
                                    </div>
                                </div>
                            </div>

                            <div className="jumbotron mt-3 p-3" >

                                <h3>Mis Datos</h3>

                                <ul className='list' key={index}>
                                    <li>
                                        <p><strong>Nombre: </strong>{elementos.NOMBRE}</p>
                                    </li>
                                    <li >
                                        <p><strong>Username: </strong>{elementos.USERNAME}</p>
                                    </li>
                                    <li >
                                        <p><strong>Email: </strong>{elementos.EMAIL}</p>
                                    </li>
                                </ul>

                                <button className="btn btn-warning" onClick={() => {
                                    setModificar(!modificar)
                                }}>Modificar</button>
                                <button className="btn btn-danger" onClick={() => setBorrado(true)}>Eliminar cuenta</button>
                            </div>
                        </>
                    )
                })}

            </div>
            <DeleteProfile idUser={id} show={borrado} enviarBorrado={(borrar) => recibirBorrado(borrar)} />
        </div>

    )
    return (

        <div>
            {data.map((elementos, index) => {
                return (
                    <>

                        <div className="jumbotron mt-3 p-3" >

                            <div className="media">
                                <div className='img__Myprofile'>
                                    <input type="file" name="image" id="image" onChange={(e) => testFiles(e)} />
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">{elementos.USERNAME}</h5>
                                    <p>Hola me llamo Yenderson</p>
                                </div>
                            </div>
                        </div>

                        <div className="jumbotron mt-3 p-3" >

                            <h3>Mis Datos</h3>


                            <ul className='list' key={index}>
                                <li>
                                    <input type="text" name="nombre" placeholder={elementos.NOMBRE} onChange={(e) => putProfile(e)} />
                                </li>
                                <li>
                                    <input type="text" name="username" placeholder={elementos.USERNAME} onChange={(e) => putProfile(e)} />
                                </li>
                                <li>
                                    <p><strong>Email: </strong>{elementos.EMAIL}</p>
                                </li>
                            </ul>

                            <button className="btn btn-warning" onClick={submitChanges}>Modificar datos</button>
                            <button className="btn btn-primary" onClick={() => setModificar(!datos)}>Cancelar</button>

                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default MyProfile;

