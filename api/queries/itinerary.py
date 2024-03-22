from pydantic import BaseModel
from queries.pool import pool
from datetime import date, timedelta, datetime, timezone
from typing import List, Optional, Union


class Error(BaseModel):
    message: str


class ItineraryIn(BaseModel):
    name: str
    destination: str
    from_date: date
    to_date: date
    num_travelers: str


class ItineraryOut(BaseModel):
    id: int
    name: str
    destination: str
    from_date: date
    to_date: date
    num_travelers: str


class ItineraryQueries:
    def get(self, itinerary_id: int) -> Optional[ItineraryOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM itinerary
                        WHERE id = %s
                        """,
                        [itinerary_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_itinerary_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not find itinerary"}

    def create(self, itinerary: ItineraryIn) -> ItineraryOut:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO itinerary
                        (name, destination, from_date, to_date, num_travelers)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        itinerary.name,
                        itinerary.destination,
                        itinerary.from_date,
                        itinerary.to_date,
                        itinerary.num_travelers,
                    ],
                )
                id = result.fetchone()[0]
                return self.itinerary_in_to_out(id, itinerary)

    def delete(self, itinerary_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM itinerary
                        WHERE id = %s
                        """,
                        [itinerary_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, itinerary_id: int, itinerary: ItineraryIn
    ) -> Union[ItineraryOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE itinerary
                        SET name = %s
                            , destination = %s
                            , from_date = %s
                            , to_date = %s
                            , num_travelers = %s
                        WHERE id = %s
                        """,
                        [
                            itinerary.name,
                            itinerary.destination,
                            itinerary.from_date,
                            itinerary.to_date,
                            itinerary.num_travelers,
                            itinerary_id,
                        ],
                    )

                    return self.itinerary_in_to_out(itinerary_id, itinerary)
        except Exception as e:
            print(e)
            return {"message": "Could not update the itinerary"}

    def get_all(self) -> Union[Error, List[ItineraryOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id,
                        name,
                        destination,
                        from_date,
                        to_date,
                        num_travelers
                        FROM itinerary
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_itinerary_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all itineraries"}

    def itinerary_in_to_out(self, id: int, itinerary: ItineraryIn):
        old_data = itinerary.dict()
        return ItineraryOut(id=id, **old_data)

    def record_to_itinerary_out(self, record):
        return ItineraryOut(
            id=record[0],
            name=record[1],
            destination=record[2],
            from_date=record[3],
            to_date=record[4],
            num_travelers=record[5],
        )

    def get_weekly_calendar(self) -> List[List[Union[str, datetime]]]:
        try:
            today = datetime.now(timezone.utc).date()
            start_of_week = today - timedelta(days=today.weekday())
            date_range = [
                [(start_of_week + timedelta(days=i)).isoformat()]
                for i in range(7)
            ]
            return date_range
        except Exception as e:
            print(e)
            return []
