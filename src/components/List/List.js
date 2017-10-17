import React, { Component } from 'react';
import './List.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';


class List extends Component {

  render() {
    const {
      startNewCustomer,
      customerList,
      selectCustomer
    } = this.props;

    const CustomerComponents = customerList.map( customer => (
      <Customer 
        selectCustomer={selectCustomer}
        key={ customer.id }
        id={ customer.id }
        first={ customer.first }
        last={ customer.last }
      />
    ));

    return (
      <div id="List__container">
        {
            <div id="List__namesContainer">
              { CustomerComponents }
              <CreateCustomer startNewCustomer={startNewCustomer}/>
            </div>
        }
      </div>
    )
  }
}

export default List;
