import './Post.css'
import useAxios from 'axios-hooks';
import { useParams, Link } from 'react-router-dom';
import Comentarios from '../Comentarios/Comentarios';
import DeletePostModal from '../modals/DeletePostModal';
import { useState } from 'react';
import EditPost from './EditPost';

// PRODUCTION
const urlBase = 'https://red-social-by-yender.glitch.me/feed/'
// localhost
// const urlBase ='http://localhost:8080/feed/';

function Post() {

    const { id } = useParams();

    const [stateModal, setStateModal] = useState({ show: null, datos: null });
    const [stateModif, setStateModif] = useState({ show: null, datos: null });

    const [{ data, loading, error }, refetch] = useAxios({
        url: id ? `${urlBase}${id}` : urlBase,
        headers: { 'Authorization': localStorage.getItem('user').split(',')[0] },
    });

    console.log(data);

    const confirmUpdate = (idPost) => {
        setStateModif(values => ({ ...values, show: true, datos: idPost }))
    }

    const confirmacionUpdate = (data) => {
        let { show, datos } = data;
        setStateModif(values => ({ ...values, show, datos }));
    }

    const confirmDelete = (idPost) => {
        setStateModal(values => ({ ...values, show: true, datos: idPost }));
    }

    const confirmarBorrado = (data) => {
        console.log('confirmarBorrado', data);
        let { show, datos } = data
        setStateModal(values => ({ ...values, show, datos }))
    }

    if (loading) return (

        <div className='d-flex flex-column justify-content-center vh-100'>

            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );

    if (error) return <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr />
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>

    if (!data.length) return <h2>No tienes Post por el momento</h2>
    return (

        <div >

            <div className={stateModal.show || stateModif.show ? 'container__post overview' : 'container__post'}>

                <Link to={`/feed/new_post/${localStorage.getItem('user').split(',')[1]}`}>Crear Post</Link>

                {data.map((data, index) => {
                    return (
                        <div className="p-2 mt-2 border" key={index} >
                            <div className='d-flex perfil align-items-center'>
                                <div className='img__profile'>

                                </div>
                                <div>
                                    <h5>{data.USERNAME}</h5>
                                    <span>{data.FECHA.split('T')[0]}</span>
                                </div>

                            </div>
                            <hr />
                            <div className="card-body">
                                <p className="card-text">{data.CONTENIDO}</p>

                                {data.ID_USER.toString() === localStorage.getItem('user').split(',')[1] &&
                                    <>
                                        <button className='btn btn-danger' onClick={() => confirmDelete(data.ID_POST)} >borrar post</button>
                                        <button className='btn btn-warning' onClick={() => confirmUpdate(data.ID_POST)}>modificar post</button>
                                    </>
                                }
                            </div>
                            <Comentarios idPost={data.ID_POST} />
                        </div>
                    )
                })}
            </div>
            <EditPost show={stateModif} update={refetch} recibirDatos={(datos) => confirmacionUpdate(datos)} />
            <DeletePostModal showModal={stateModal} update={refetch} recibirDatos={(datos) => confirmarBorrado(datos)} />
        </div>

    )
}

export default Post;