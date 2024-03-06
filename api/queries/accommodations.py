from pydantic import BaseModel, Field
from typing import Optional, Union, List
from queries.pool import pool


class Error (BaseModel):
    message: str


class AccommodationsIn(BaseModel):
    hotel: str
    flight_number: str
    notes: Optional[str]


class AccommodationsOut(BaseModel):
    id: int
    hotel: str
    flight_number: str
    notes: Optional[str]


class AccommodationsQueries:
    def create(self, accommodations: AccommodationsIn) -> Union[AccommodationsOut, Error]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO accommodations
                                (hotel, flight_number, notes)
                            VALUES
                                (%s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                accommodations.hotel,
                                accommodations.flight_number,
                                accommodations.notes,
                            ]
                        )
                        id = result.fetchone()[0]
                        return self.accommodations_in_to_out(id, accommodations)
            except Exception:
                return {"message": "Create did not work"}

    def get_one(self, accommodations_id: int) -> Optional[AccommodationsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                                , hotel
                                , flight_number
                                , notes
                        FROM accommodations
                        WHERE id = %s
                        """,
                        [accommodations_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_accommodations_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get accommodations"}


    def get_all(self) -> Union[Error, List[AccommodationsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, hotel, flight_number, notes
                        FROM accommodations
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_accommodations_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accommodations"}


    def update(self, accommodations_id: int, accommodations: AccommodationsIn) -> Union[AccommodationsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accommodations
                        SET hotel = %s
                            , flight_number = %s
                            , notes = %s
                        WHERE id = %s
                        """,
                        [
                            accommodations.hotel,
                            accommodations.flight_number,
                            accommodations.notes,
                            accommodations_id
                        ]
                    )
                    return self.accommodations_in_to_out(accommodations_id, accommodations)
        except Exception as e:
            print(e)
            return {"message": "Could not update accommodations"}


    def delete(self, accommodations_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accommodations
                        WHERE id = %s
                        """,
                        [accommodations_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def accommodations_in_to_out(self, id: int, accommodations: AccommodationsIn):
            old_data = accommodations.dict()
            return AccommodationsOut(id=id, **old_data)


    def record_to_accommodations_out(self, record):
        return AccommodationsOut(
            id=record[0],
            hotel=record[1],
            flight_number=record[2],
            notes=record[3],
        )
