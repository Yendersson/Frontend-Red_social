import axios from "axios";

// PRODUCTION
const urlBase = 'https://red-social-by-yender.glitch.me/profile/';
// LOCALHOST
 //const urlBase ='http://localhost:8080/profile';


function DeleteProfile(props){


    const deleteProfile = async () => {
        const borrarPerfil = await axios.delete(`${urlBase}${props.idUser}`, {
            headers: { 'Authorization': localStorage.getItem('user').split(',')[0] }
        })
        console.log(borrarPerfil);
        localStorage.removeItem('user');
        window.location.assign('/')
    }

    const noBorrar = () =>{
        const borrado = null;
        props.enviarBorrado(borrado);
    }

    console.log(props);

    if(props.show)
    return(

        <div className='confirm__deletePost show__delete__postModal'>
        <div className='delete__post__content'>
            <p>Seguro que quiere borrar todo el perfil?
                Se perderan todos los datos creados y asignados.
            </p>
            <button className='btn btn-danger' onClick={deleteProfile} >Si</button>
            <button className='btn btn-primary' onClick={noBorrar} >No</button>
        </div>
    </div>
    )
}

export default DeleteProfile;