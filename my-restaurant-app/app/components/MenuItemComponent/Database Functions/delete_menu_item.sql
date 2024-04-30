CREATE FUNCTION delete_menu_item(menu_item_name text)
RETURNS boolean AS $$
DECLARE
    menu_item_id int := 0;
BEGIN  
    SELECT id FROM menu_item WHERE name = menu_item_name INTO menu_item_id;
    IF menu_item_id = 0 then
        return false;
    ELSE
        IF menu_item_name is not NULL then
            DELETE FROM menu_item_ingredient where menu_id = menu_item_id;

            DELETE FROM menu_item where id = menu_item_id;
            return true;
        ELSE
            return false;
        end if;
        return false;
    end if;
END;
$$ LANGUAGE plpgsql;