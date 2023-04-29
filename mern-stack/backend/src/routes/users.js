const { Router} = require('express');
const router = Router();

const {getUser, createUser, deleteUser} = require('../controllers/users.controllers');

router.route('/')
    .get(getUser)
    .post(createUser)

router.route('/:id')
    .get((req,res) => res.json({title: 'name'}))
    .put((req, res) => res.json({message: 'User updated'}))
    .delete(deleteUser)
    //.patch()


module.exports = router;