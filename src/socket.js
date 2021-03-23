import { io } from 'socket.io-client';
var socket = null;
var host = 'http://localhost:5000';

export const connect = () => {
    socket = socket ? socket : io(host)

    return socket;
}

export const create_document = (doc_name, proj_name) => {
    socket.emit('create_document', {
        name: doc_name,
        projct_name: proj_name
    })
}

export const create_project = (proj_name) => {
    socket.emit('create_project', {
        name: proj_name
    })

    socket.on('create_project_response', msg => {
        console.log(msg)
    })
}

export const get_project_data = (session) => {
    const projects = session.on('get_project_response', res => {
        return res
    })

    return projects
}

export const getUserData = (session) => {
    session.on('user_response', res => {
        return res;
    })
}