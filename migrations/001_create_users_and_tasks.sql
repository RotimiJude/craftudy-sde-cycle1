CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);


INSERT INTO users (name, email)
VALUES ('Development User', 'developer@example.com')
ON CONFLICT (email) DO NOTHING;


CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);


ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS user_id INTEGER;

UPDATE tasks
SET user_id = (
    SELECT id
    FROM users
    WHERE email = 'developer@example.com'
)
WHERE user_id IS NULL;


ALTER TABLE tasks
ALTER COLUMN user_id SET NOT NULL;


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'tasks_user_id_fkey'
          AND conrelid = 'tasks'::regclass
    ) THEN
        ALTER TABLE tasks
        ADD CONSTRAINT tasks_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE;
    END IF;
END $$;
