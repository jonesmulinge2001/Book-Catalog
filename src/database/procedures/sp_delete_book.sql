CREATE OR REPLACE FUNCTION sp_delete_book(p_id INTEGER)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    title VARCHAR(250)
) AS $$
DECLARE 
    current_title VARCHAR(250);
BEGIN
    -- Check if the book exists and get its title
    SELECT b.title INTO current_title FROM books b WHERE b.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with ID % does not exist', p_id;
    END IF;

    -- Delete the book
    DELETE FROM books WHERE id = p_id;

    -- Return success response
    RETURN QUERY
    SELECT TRUE, 'Book deleted successfully', current_title;
END;
$$ LANGUAGE plpgsql;
