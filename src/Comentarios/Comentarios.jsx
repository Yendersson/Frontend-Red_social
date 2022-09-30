import './comentarios.css'
import { useState } from 'react';
import axios from 'axios';
import useAxios from 'axios-hooks';

// PRODUCTION
const urlBaseComments = 'https://red-social-by-yender.glitch.me/comments/';
// LOCALHOST
// const urlBaseComments = 'http://localhost:8080/comments/';

function Comentarios(props) {

    const [comentario, setComentario] = useState({});

    const [{ data, loading, error }, refetch] = useAxios({
        url: `${urlBaseComments}/${props.idPost}`,
        headers: { 'Authorization': localStorage.getItem('user').split(',')[0] },
    });

    const ingresarComentario = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setComentario(values => ({ ...values, [name]: value }));
    }

    const publicarComentario = async (id) => {

        if (comentario.contenido && comentario.contenido !== '') {

            const publicando = await axios.post(`${urlBaseComments}${id}?user=${localStorage.getItem('user').split(',')[1]}`, comentario, {
                headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
            });
            refetch()
            console.log(publicando);
        } else {
            console.log('Debe agregar algun texto');
        }
    }

    console.log(comentario)

    if (loading) return <p>Loading comments...</p>

    if (error) return <p>A ocurrido un error</p>

    return (
        <>
            <div>
                <input type="text" placeholder='Ingresa un comentario' name='contenido' onChange={(e) => ingresarComentario(e)} />

                <button className='btn btn-success' onClick={() => publicarComentario(props.idPost)}>Publicar</button>
            </div>
            {data.map((elemento, index) => {
                return (
                    <div className="" key={index}>
                        <div className='d-flex container__comentario'>
                            <div className='perfil__comentario'></div>
                            <div className='jumbotron mb-2'><h6>{elemento.USERNAME}</h6>
                            <span>{elemento.FECHA.split('T')[0]}</span>
                            <p>{elemento.CONTENIDO}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Comentarios;