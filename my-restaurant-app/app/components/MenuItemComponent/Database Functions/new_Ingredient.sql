CREATE FUNCTION new_ingredient(new_name text, set_stock int, add_price float, set_min_stock int)
RETURNS boolean AS $$
DECLARE
    check_for_ingredient int := 0;
BEGIN
    SELECT id FROM ingredients WHERE name = new_name INTO check_for_ingredient;
    if NOT check_for_ingredient = 0 then
        RETURN false;
    else 
        if new_name is not NULL then
            if set_stock is not NULL then
                if add_price is not NULL then
                    if set_min_stock is not NULL then
                        INSERT INTO ingredients(name, stock, add_on_price, min_stock) VALUES (new_name, set_stock, add_price, set_min_stock);
                        RETURN true;
                    ELSE    
                        return false;
                    end if;
                ELSE
                    return false;
                end if;
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
