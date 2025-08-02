import User from '../users/user.model.js'
import Role from '../role/role.model.js';
import ToDoList from "../to-do-List/to-do-list.model.js";

export const validRole = async(role = '') => {
    if (role === "") return;  

    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`Rol ${role} does not exist in the database`);
    }
}

export const existentEmail = async(email = '')=>{
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error (`Email ${email} already exists in the database`)
    }
}

export const existUserById = async(id = ``)=>{
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`ID  ${id} does not exist in the database`)
    }
}

export const existClientById = async (id = '') => {
    const existClient = await Client.findById(id);
    if(!existClient){
        throw new Error(`ID ${id} does not exist in the database`)
    }
}

export const existUsername = async(username = '') => {
    const existUsername = await User.findOne({username});
    if(existUsername){
        throw new Error(`Username ${username} already use`)
    }
}

export const existTaskById = async (id = "") => {
    const task = await ToDoList.findById(id);
    if (!task) {
        throw new Error(`The task with id ${id} does not exist`);
    }
};