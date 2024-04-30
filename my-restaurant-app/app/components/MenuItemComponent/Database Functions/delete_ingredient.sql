CREATE FUNCTION delete_ingredient(ingredient_name text)
RETURNS boolean AS $$
DECLARE
    ingredient_id int := 0;
BEGIN  
    SELECT id FROM ingredients WHERE name = ingredient_name INTO ingredient_id;
    IF ingredient_id = 0 then
        return false;
    ELSE
        IF ingredient_name is not NULL then
            DELETE FROM ingredients where id = ingredient_id;
            return true;
        ELSE
            return false;
        end if;
        return false;
    end if;
END;
$$ LANGUAGE plpgsql;