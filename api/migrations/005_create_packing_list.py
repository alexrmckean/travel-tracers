steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS packing_list (
            id SERIAL PRIMARY KEY NOT NULL,
            item VARCHAR(100) NOT NULL,
            quantity SMALLINT NOT NULL,
            category VARCHAR(100) NOT NULL,
            priority SMALLINT NOT NULL,
            checklist_status BOOLEAN NOT NULL,
            notes TEXT,
            deadline DATE

        );
        """,
        """
        DROP TABLE packing_list;
        """,
    ],
]
