const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

server.get('/', (req, res) => {
	res.send('Welcome To Getting Things Done');
});

// ----------- Actions ------------- //

server.get('/api/actions', (req, res) => {
	db('actions')
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/actions/:id', (req, res) => {
	db('actions')
		.where({ id: req.params.id })
		.then(action => {
			res.status(200).json(action);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/actions', (req, res) => {
	db('actions')
		.insert(req.body)
		.then(ids => {
			res.status(200).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/actions/:id', (req, res) => {
	db('actions')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/actions/:id', (req, res) => {
	db('actions')
		.where({ id: req.params.id })
		.update(req.body)
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

// ---------- Projects -------------- //

server.get('/api/projects', (req, res) => {
	db('projects')
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/projects/:id', (req, res) => {
	db('projects')
		.join('actions', 'project_id', '=', 'actions.project_id')

		.select(
			'actions.description',
			'actions.completed',
			'actions.comment as notes',
		)
		.where('actions.project_id', req.params.id)

		.then(actions => {
			db('projects')
				.where({ id: req.params.id })
				.then(project => {
					res.status(200).json({ project, actions });
				});
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/projects', (req, res) => {
	db('projects')
		.insert(req.body)
		.then(ids => {
			res.status(200).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/projects/:id', (req, res) => {
	db('projects')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/projects/:id', (req, res) => {
	db('projects')
		.where({ id: req.params.id })
		.update(req.body)
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

const port = 5000;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
