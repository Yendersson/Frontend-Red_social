import './DeletePostModal.css'
import axios from 'axios';

// PRODUCTION
//const urlBase = 'https://red-social-by-yender.glitch.me/feed/'
// LOCALHOST
 const urlBase = 'http://localhost:8080/feed/';


function DeletePostModal(props) {

    const cancelDelete = () => {
        const datos = { show: false, datos: null };
        props.recibirDatos(datos);
    }

    const deletePost = async () => {
        const borrarPost = await axios.delete(`${urlBase}/${props.showModal.datos}?user=${localStorage.getItem('user').split(',')[1]}`, {
            headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
        })
        const datos = { show: false, datos: null };
        props.recibirDatos(datos);

        console.log(borrarPost);
        props.update();
    }
 
    if (props.showModal.show === true) return (
    <div className='confirm__deletePost show__delete__postModal'>
        <div className='delete__post__content'>
            <p>Seguro que quiere borrar este post?</p>
            <button className='btn btn-danger' onClick={deletePost}>Si</button>
            <button className='btn btn-primary' onClick={cancelDelete}>No</button>
        </div>
    </div>
    )
}

export default DeletePostModal;