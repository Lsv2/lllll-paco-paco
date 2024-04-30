CREATE FUNCTION delete_drink(drink_size text)
RETURNS boolean AS $$
DECLARE
    drink_id int := 0;
BEGIN  
    SELECT id FROM drinks WHERE size = drink_size INTO drink_id;
    IF drink_id = 0 then
        return false;
    ELSE
        IF drink_size is not NULL then
            DELETE FROM drinks where id = drink_id;
            return true;
        ELSE
            return false;
        end if;
        return false;
    end if;
END;
$$ LANGUAGE plpgsql;