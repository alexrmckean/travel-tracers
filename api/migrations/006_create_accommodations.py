steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS accommodations (
            id SERIAL PRIMARY KEY NOT NULL,
            hotel VARCHAR(100) NOT NULL,
            flight_number VARCHAR(25) NOT NULL,
            notes TEXT
        );
        """,
        """
        DROP TABLE accommodations;
        """
    ],
]
