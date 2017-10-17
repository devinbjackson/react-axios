import axios from 'axios';
import apiURL from './api';

export function getCustomerList(){
   return axios.get(apiURL).then( (response) => {
        return response.data;
    })
}

export function  createCustomer(obj){
    return axios.post(apiURL, obj)
    .then(response => response.data);
}

export function getCustomer(id){
 return axios.get(apiURL + id).then(response=> response.data);
}

export function updateCustomer(id, obj){
return axios.put(apiURL + id, obj).then
( response=> response.data)
}

export function deleteCustomer(id){
    axios.delete(apiURL + id).then(response=> response);
}