CREATE FUNCTION update_stock(ingredient_name text, increased int)
RETURNS boolean AS $$
DECLARE
    check_for_ingredient int := 0;
BEGIN
    SELECT id FROM ingredients WHERE ingredient_name = name INTO check_for_ingredient;
    IF check_for_ingredient = 0 then
        return false;
    ELSE
        IF increased > 0 then
            if ingredient_name is not NULL then
                UPDATE ingredients SET stock = stock + increased WHERE ingredients.name = ingredient_name;
                return true;
            ELSE
                return false;
            end if;
        ELSE
            return false;
        end if;
        return false;
    end if;

END;
$$ LANGUAGE plpgsql;