CREATE OR REPLACE FUNCTION sp_update_book(
    p_id INTEGER,
    p_title VARCHAR(250),
    p_author VARCHAR(250),
    p_publication_year INT,
    p_isbn VARCHAR(250)
)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    updated_title VARCHAR(250),
    updated_author VARCHAR(250),
    updated_year INT,
    updated_isbn VARCHAR(250)
) AS $$
DECLARE
    existing_book RECORD;
BEGIN
    -- Check if book exists
    SELECT * INTO existing_book FROM books WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with ID % does not exist.', p_id;
    END IF;

    -- Optional: Check if new title or ISBN already exists (to enforce uniqueness)
    IF EXISTS (
        SELECT 1 FROM books WHERE title = p_title AND id != p_id
    ) THEN
        RAISE EXCEPTION 'Another book with title "%" already exists.', p_title;
    END IF;

    IF EXISTS (
        SELECT 1 FROM books WHERE isbn = p_isbn AND id != p_id
    ) THEN
        RAISE EXCEPTION 'Another book with ISBN "%" already exists.', p_isbn;
    END IF;

    -- Update the book
    UPDATE books
    SET
        title = p_title,
        author = p_author,
        publication_year = p_publication_year,
        isbn = p_isbn,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;

    -- Return updated row
    RETURN QUERY
    SELECT TRUE, 'Book updated successfully', p_title, p_author, p_publication_year, p_isbn;
END;
$$ LANGUAGE plpgsql;
