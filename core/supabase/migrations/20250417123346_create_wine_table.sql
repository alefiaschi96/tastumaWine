CREATE TABLE IF NOT EXISTS wine (
    id SERIAL PRIMARY KEY,
    wine_name TEXT,
    type TEXT,
    region TEXT,
    denomination TEXT,
    menu_name TEXT,
    company TEXT,
    vine TEXT,
    year TEXT,
    reseller TEXT,
    price NUMERIC,
    sciolze_vinery TEXT,
    tastuma_vinery TEXT,
    service_temp TEXT,
    fridge_temp TEXT,
    fridge_type TEXT
);
