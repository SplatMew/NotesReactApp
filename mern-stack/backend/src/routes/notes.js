const { Router} = require('express');
const router = Router();

const {getNotes, createNotes, getNote, deleteNote, updateNote} = require('../controllers/notes.controllers');
 
router.route('/')
    .get(getNotes)
    .post(createNotes)


router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)
    //.patch()

module.exports = router;