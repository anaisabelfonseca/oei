import express, { Request, Response } from 'express'
//import db from './db/db'

const PORT = process.env.PORT || 3002

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('mudou');
})

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
  //db.runMigrations();
})