CREATE OR REPLACE FUNCTION sp_get_book(
    p_id INTEGER
)
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(250),
    author VARCHAR(250),
    publication_year INT,
    isbn VARCHAR(250),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.title,
        b.author,
        b.publication_year,
        b.isbn,
        b.created_at,
        b.updated_at
    FROM books b
    WHERE b.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with ID % does not exist.', p_id;
    END IF;
END;
$$ LANGUAGE plpgsql;
