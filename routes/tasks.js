const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)

const listTasks = {
    tasks: []
};

router.get('/', (req, res) => {
    knex("tasks")
        .then(tasks => res.status(200).json(tasks))
});

router.get('/:id', async (req, res) => {
    knex("tasks")
        .where({id: req.params.id})
        .then(tasks => {
            if (tasks.length) {
                res.status(200).json(tasks[0])
            } else {
                return res.status(404).json({mensagem: 'Task not found.'})
            }
        })
});

router.post('/', (req, res) => {
    const {title, completed} = req.body;

    if (!title || !completed) {
        return res.status(400).json({mensagem: 'Fill in all required fields.' });
    }

    knex('tasks')
        .insert({title, completed})
        .returning('*')
        .then(task => {
            res.status(201).json(task[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({mensagem: 'Error creating task.' });
        });
});

router.put('/:id', (req, res) => {
    const {title, completed} = req.body;

    if (!title || !completed) {
        return res.status(400).json({ mensagem: 'Fill in all required fields.' });
    }

    knex('tasks')
        .where({ id: req.params.id })
        .update({ title, completed })
        .returning('*')
        .then(task => {
            if (task.length) {
                res.status(200).json(task[0]);
            } else {
                res.status(404).json({ mensagem: 'Task not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensagem: 'Error updating task.' });
        });
});

router.delete('/:id', (req, res) => {
    knex('tasks')
        .where({ id: req.params.id })
        .del()
        .then(deletedCount => {
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ mensagem: 'Task not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensagem: 'Error deleting task.' });
        });
});

module.exports = router;