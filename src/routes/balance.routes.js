const express = require('express');
let app = express();
const pool = require('../../database')




app.get('/', async (req, res) => {
   const gastos = await pool.query(
  `select  sum(u.monto) as "total"
   from movimientos u join tipo_transaccion t
   on u.categoria = t.id
   WHERE t.tipo = 0
   `)

   const ingresos = await pool.query(
    `select  sum(u.monto) as "total"
    from movimientos u join tipo_transaccion t
    on u.categoria = t.id
    WHERE t.tipo = 1
     `)


     const top10 = await pool.query(
        `SELECT m.id, DATE_FORMAT(m.fecha, "%d/%m/%Y") as "fecha", m.monto, t.detalle,
         m.descripcion, t.tipo from movimientos
         m JOIN tipo_transaccion t on
         m.categoria = t.id LIMIT 10  `)


   res.json({
       gastos,
       ingresos,
       top10
   })
})

app.get('/addmov', async (req, res) => {
    const detalle = await pool.query ("SELECT * FROM tipo_transaccion")
    res.json({
        detalle
    })
})

app.post('/addmov', async (req, res) => {
    const {fecha, monto, descripcion, categoria} = req.body
    const newMov = {
            fecha,
            monto, 
            descripcion,
            categoria
    }
   
   
   try {
        const recibido =  await pool.query('INSERT INTO movimientos set ?', [newMov])
        if(recibido){
            res.json({
                mensaje: 'recibido',
                recibido
            })
        }
   } catch (error) {
       console.log(error);
   }
   
})

app.post('/delete', async (req, res) => {
    const id = req.body.id
    const deleted = await pool.query(`DELETE from movimientos WHERE id =${id}` )
   
    res.json({
        estado: 'ok',
        deleted
    })
})

app.put('/edit', async (req, res) => {
    const id = req.body.id
    const {fecha, monto, descripcion, categoria} = req.body
    const edit = {
        fecha,
        monto, 
        descripcion,
        categoria
    }

    try {
        const editado =  await pool.query('UPDATE  movimientos set ?', [edit])
        if(editado){
            res.json({
                mensaje: 'recibido',
                editado
            })
        }
   } catch (error) {
       console.log(error);
   }


})
module.exports = app
