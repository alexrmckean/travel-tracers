steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS budgets (
            id SERIAL PRIMARY KEY NOT NULL,
            description TEXT,
            amount NUMERIC(10, 2) NOT NULL,
            date DATE NOT NULL,
            payment_method VARCHAR(100) NOT NULL,
            user_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE budgets;
        """
    ],
]
