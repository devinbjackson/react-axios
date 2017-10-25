import React, { Component } from 'react';
import './App.css';

import  { getCustomerList, createCustomer , getCustomer , updateCustomer, deleteCustomer}   from '../customers.js';
import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
  this.startNewCustomer = this.startNewCustomer.bind(this);
  this.createCustomer = this.createCustomer.bind(this)
  this.selectCustomer = this.selectCustomer.bind(this);
  this.removeCustomer = this.removeCustomer.bind(this);
  
  }
  componentDidMount() {
    getCustomerList().then(list=>{
      this.setState({customerList: list})
    })
  }
  startNewCustomer(){
    this.setState({creating : true ,
       initialLoad : false , 
       currentCustomer : null ,
      });
  }
  createCustomer(customer) {
    createCustomer(customer).then(response => {
      getCustomerList().then( list => {
      this.setState({
        customerList: list, 
        initialLoad: true,
        creating: false
       })
     })
   })
  }
  selectCustomer(id){
    console.log(id);
    getCustomer(id)
    .then(response=> 
      this.setState({currentCustomer: response, initialLoad: false}))
  }

  saveEdit(id, obj){
    updateCustomer(id, obj).then(updateCustomer=> 
      getCustomerList().then(list=> 
        this.setState({
          customerList: list,
           currentCustomer : updateCustomer}))
  )
  }
  removeCustomer(id) {
    deleteCustomer(id).then(deletedCustomer =>{
      getCustomerList().then(list =>{
        this.setState({
          customerList: list,
          currentCustomer: null,
          initialLoad: true
        })
      })
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List startNewCustomer={this.startNewCustomer}
                  customerList={this.state.customerList || []}
                  selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace saveEdit={this.saveEdit}
                    createCustomer={this.createCustomer}
                    initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
