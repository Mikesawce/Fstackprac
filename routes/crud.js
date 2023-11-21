const express = require('express')
const pool = require("../db")

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM todo')
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Shit went sideways')
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const { rows } = await pool.query(`SELECT * FROM todo WHERE id = ${id}`, [id])
        if (rows.length === 0) {
            res.status(404).send('Not found')
        } else {
            res.json(rows[0])
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Shit went sideways')
    }
})

router.post('/', async (req, res, next) => {
    const { task, complete } = req.body
    try {
         const { rows } = await pool.query(`INSERT INTO todo (task, complete) VALUES ($1, $2) RETURNING *`, [task, complete])
        res.json(rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).send('Shit went sideways')
    }
})

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params
    const { task, complete } = req.body
    try {
        const { rows } = await pool.query(`UPDATE todo SET task = $1, complete = $2 WHERE id = $3 RETURNING *`,
            [task, complete, id])
        if (rows.length === 0) {
            res.status(404).send('Sorry that shit wasnt found')
        } else {
            res.json(rows[0])
        }
    } catch (err) {
        console.err(err)
        res.status(500).send('Shit went sidways')
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const { rows } = await pool.query(`DELETE FROM todo WHERE id = $1 RETURNING *`, [id])
        if (rows.length === 0) {
            res.status(404).send('Couldnt find that shit')
        } else {
            res.json(rows[0])
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Shit went sideways')
    }
})

module.exports = router