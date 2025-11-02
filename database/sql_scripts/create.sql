CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  from_time TEXT NOT NULL,
  to_time TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date, from_time, to_time)
);

-- CREATE TABLE IF NOT EXISTS event_participants (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   participant_id TEXT NOT NULL,
--   participant_email TEXT NOT NULL,
--   event_id INTEGER NOT NULL,
--   status TEXT NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE(participant_id, event_id),
--   FOREIGN KEY (event_id) REFERENCES events(id)
-- );



CREATE TRIGGER IF NOT EXISTS update_modified_at_events
AFTER UPDATE ON events
FOR EACH ROW
BEGIN
  UPDATE events
  SET modified_at = CURRENT_TIMESTAMP
  WHERE id = OLD.id;
END;

-- CREATE TRIGGER IF NOT EXISTS update_modified_at_participants
-- AFTER UPDATE ON event_participants
-- FOR EACH ROW
-- BEGIN
--   UPDATE event_participants
--   SET modified_at = CURRENT_TIMESTAMP
--   WHERE id = OLD.id;
-- END;
