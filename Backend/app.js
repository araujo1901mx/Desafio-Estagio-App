import express from 'express'

const app = express ()
app.use(express.json())

app.use('/usuarios', userRoutes)

app.listen(3000, () => console.log("Servidor ON"))

