CREATE FUNCTION new_drink_size(drink_size text, price float)
RETURNS boolean AS $$
DECLARE
	check_for_drink int := 0;
BEGIN
	SELECT id FROM drinks WHERE size = drink_size INTO check_for_drink;
	if NOT check_for_drink = 0 then
		return false;
	else
		if drink_size is not NULL then
			if price is not Null then
				INSERT INTO drinks(size, price) VALUES (drink_size, price);
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