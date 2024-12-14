const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            image,
            createdBy: req.user.id,
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    const { date, location } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (location) filter.location = location;

    try {
        const events = await Event.find(filter).populate('createdBy', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (String(event.createdBy) !== req.user.id)
            return res.status(403).json({ message: 'You are not authorized to update this event' });

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.maxAttendees = maxAttendees || event.maxAttendees;
        if (image) event.image = image;

        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (String(event.createdBy) !== req.user.id)
            return res.status(403).json({ message: 'You are not authorized to delete this event' });

        await event.remove();
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rsvpEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.attendees.length >= event.maxAttendees)
            return res.status(400).json({ message: 'Event is fully booked' });

        if (event.attendees.includes(req.user.id))
            return res.status(400).json({ message: 'You have already RSVP\'d to this event' });

        event.attendees.push(req.user.id);
        await event.save();

        res.json({ message: 'RSVP successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelRsvp = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.attendees = event.attendees.filter(id => id.toString() !== req.user.id);
        await event.save();

        res.json({ message: 'RSVP cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
