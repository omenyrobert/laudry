// // src/app.ts
// import express from 'express';
// import { createConnection } from 'typeorm';
// import { Customer } from '../Entities/Customer';

// const app = express();
// app.use(express.json());

// // Configure CORS as needed

// // CRUD routes
// app.get('/customers', async (req, res) => {
//   const Customers = await Customer.find();
//   res.json(Customers);
// });

// app.post('/customers', async (req, res) => {
//   const Customer = new Customer(req.body);
//   await Customer.save();
//   res.status(201).json(Customer);
// });

// app.put('/Customers/:id', async (req, res) => {
//   const { id } = req.params;
//   const Customer = await Customer.findOne(id);
//   if (!Customer) {
//     return res.status(404).json({ message: 'Customer not found' });
//   }
//   Object.assign(Customer, req.body);
//   await Customer.save();
//   res.json(Customer);
// });

// app.delete('/Customers/:id', async (req, res) => {
//   const { id } = req.params;
//   const Customer = await Customer.findOne(id);
//   if (!Customer) {
//     return res.status(404).json({ message: 'Customer not found' });
//   }
//   await Customer.remove();
//   res.status(204).end();
// });

// export default app;
