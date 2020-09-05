const express = require('express');
let app = express();
const pool = require('../../database')

app.get('/', async (req, res) => {
   const gastos = await pool.query(
  `select  sum(u.monto) as "total"
   from movimientos u
   WHERE u.tipo = 0
   `)

   const ingresos = await pool.query(
    `select  sum(u.monto) as "total"
     from movimientos u
     WHERE u.tipo = 1
     `)


     const top10 = await pool.query(
        `SELECT m.fecha, m.monto, t.detalle,
         m.descripcion, m.tipo from movimientos
         m JOIN tipo_transaccion t on
         m.categoria = t.id LIMIT 10  `)


   res.json({
       gastos,
       ingresos,
       top10
   })
})

app.post('/addmov', async (req, res) => {
    const {fecha, monto, categoria, descripcion, tipo} = req.body
    const newMov = {
        fecha,
        monto,
        categoria,
        descripcion,
        tipo
    }
    const tipoMov = await pool.query(
        `SELECT t.detalle FROM movimientos m 
         JOIN tipo_transaccion t on 
         m.categoria = t.id `)
         
    await pool.query('INSERT INTO movimientos set ?', [newMov])
    res.send('recibido')
})
module.exports = app
