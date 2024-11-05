const { google } = require('googleapis');
const { authorize } = require('../auth/googleAuth');

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {Request} req
 * @param {Response} res
 */
async function listEvents(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    if (!events || events.length === 0) {
      return res.status(200).json({ message: 'No upcoming events found.' });
    }
    const eventList = events.map((event) => ({
      start: event.start.dateTime || event.start.date,
      summary: event.summary,
    }));
    res.status(200).json(eventList);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
}

module.exports = { listEvents };
