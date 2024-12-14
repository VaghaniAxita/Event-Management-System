const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    cancelRsvp
} = require('../controllers/eventController');

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', authMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);
router.post('/:id/rsvp', authMiddleware, rsvpEvent);
router.delete('/:id/rsvp', authMiddleware, cancelRsvp);

module.exports = router;
