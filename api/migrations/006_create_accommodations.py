steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS accommodations (
            id SERIAL PRIMARY KEY NOT NULL,
            hotel VARCHAR(100),
            flight_number VARCHAR(25),
            flight_number_2 VARCHAR(25),
            from_date DATE NOT NULL,
            to_date DATE NOT NULL,
            notes TEXT
        );
        """,
        """
        DROP TABLE accommodations;
        """
    ],
]
