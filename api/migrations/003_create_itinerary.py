steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS itinerary (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            destination VARCHAR(200) NOT NULL,
            from_date DATE NOT NULL,
            to_date DATE NOT NULL,
            num_travelers VARCHAR(200) NOT NULL
        );
        """,
        """
        DROP TABLE itinerary;
        """,
    ],
]
