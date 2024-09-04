
require('./server'); 
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer'); 




const welcomeMessage = () => {
  console.log(('Welcome to the Customer Management System!'));
};

const menu = () => {
  console.log('\nMenu:');
  console.log('1. Create a Customer');
  console.log('2. View Customers');
  console.log('3. Update a Customer');
  console.log('4. Delete a Customer');
  console.log('5. Quit');
};

const createCustomer = async () => {
  const name = prompt('Enter customer name: ');
  const age = parseInt(prompt('Enter customer age: '), 10);

  const newCustomer = new Customer({ name, age });
  try {
    const savedCustomer = await newCustomer.save();
    console.log(('Customer created:'), savedCustomer);
  } catch (err) {
    console.error(('Error creating customer:', err));
  }
};

const viewCustomers = async () => {
  try {
    const customers = await Customer.find();
    if (customers.length === 0) {
      console.log(('No customers found.'));
    } else {
      console.log('Customers:');
      customers.forEach(customer => {
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
      });
    }
  } catch (err) {
    console.error(('Error retrieving customers:', err));
  }
};

const updateCustomer = async () => {
  await viewCustomers();
  const id = prompt('Enter the ID of the customer to update: ');

  const name = prompt('Enter new customer name (leave blank to keep current): ');
  const age = prompt('Enter new customer age (leave blank to keep current): ');

  const updateFields = {};
  if (name) updateFields.name = name;
  if (age) updateFields.age = parseInt(age, 10);

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateFields, { new: true });
    if (updatedCustomer) {
      console.log(('Customer updated:'), updatedCustomer);
    } else {
      console.log(('Customer not found.'));
    }
  } catch (err) {
    console.error(('Error updating customer:', err));
  }
};

const deleteCustomer = async () => {
  await viewCustomers();
  const id = prompt('Enter the ID of the customer to delete: ');

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (deletedCustomer) {
      console.log(('Customer deleted:'), deletedCustomer);
    } else {
      console.log(('Customer not found.'));
    }
  } catch (err) {
    console.error(('Error deleting customer:', err));
  }
};

const main = async () => {
  welcomeMessage();
  while (true) {
    menu();
    const choice = prompt('Choose an action (1-5): ');

    switch (choice) {
      case '1':
        await createCustomer();
        break;
      case '2':
        await viewCustomers();
        break;
      case '3':
        await updateCustomer();
        break;
      case '4':
        await deleteCustomer();
        break;
      case '5':
        console.log(('Goodbye!'));
        mongoose.connection.close();
        process.exit(0);
        break;
      default:
        console.log(('Invalid choice. Please enter a number between 1 and 5.'));
    }
  }
};

main();
