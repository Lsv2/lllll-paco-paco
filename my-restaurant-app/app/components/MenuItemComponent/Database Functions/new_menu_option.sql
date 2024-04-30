CREATE FUNCTION new_menu_option(new_menu_name text, new_menu_cost float, ingredients_list text[])
RETURNS boolean AS $$
DECLARE
    check_for_menu_item int := 0;
BEGIN 
    SELECT id FROM menu_item WHERE name = new_menu_name INTO check_for_menu_item;
    if NOT check_for_menu_item = 0 then
        RETURN false;
    else 
        if new_menu_name is not NULL then
            if new_menu_cost is not NULL then
                if ingredients_list is not NULL then
                    INSERT INTO menu_item(name,price) VALUES (new_menu_name,new_menu_cost);
                    PERFORM update_menu_item_ingredients(new_menu_name,ingredients_list);
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
        return false;
    end if;
END;
$$ LANGUAGE plpgsql;