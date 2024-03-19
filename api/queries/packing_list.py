from pydantic import BaseModel, Field
from typing import Optional, Union, List
from datetime import date
from queries.pool import pool


class Error (BaseModel):
    message: str


class PackingListIn(BaseModel):
    item: str
    quantity: int
    category: str
    priority: int
    checklist_status: bool = Field(default=False)
    notes: Optional[str]
    deadline: Optional[date]


class PackingListOut(BaseModel):
    id: int
    item: str
    quantity: int
    category: str
    priority: int
    checklist_status: bool = Field(default=False)
    notes: Optional[str]
    deadline: Optional[date]


class PackingListQueries:
    def get_one(self, packing_list_id: int) -> Optional[PackingListOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                                , item
                                , quantity
                                , category
                                , priority
                                , checklist_status
                                , notes
                                , deadline
                        FROM packing_list
                        WHERE id = %s
                        """,
                        [packing_list_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_packing_list_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that packing list"}

    def delete(self, packing_list_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM packing_list
                        WHERE id = %s
                        """,
                        [packing_list_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, packing_list_id: int, packing_list: PackingListIn) -> Union[PackingListOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE packing_list
                        SET item = %s
                            , quantity = %s
                            , category = %s
                            , priority = %s
                            , checklist_status = %s
                            , notes = %s
                            , deadline = %s
                        WHERE id = %s
                        """,
                        [
                            packing_list.item,
                            packing_list.quantity,
                            packing_list.category,
                            packing_list.priority,
                            packing_list.checklist_status,
                            packing_list.notes,
                            packing_list.deadline,
                            packing_list_id
                        ]
                    )
                    return self.packing_list_in_to_out(packing_list_id, packing_list)
        except Exception as e:
            print(e)
            return {"message": "Could not update that packing list"}

    def get_all(self) -> Union[Error, List[PackingListOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, item, quantity, category, priority, checklist_status, notes, deadline
                        FROM packing_list
                        ORDER BY deadline;
                        """
                    )
                    return [
                        self.record_to_packing_list_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all packing lists"}

    def create(self, packing_list: PackingListIn) -> Union[PackingListOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO packing_list
                            (item, quantity, category, priority, checklist_status, notes, deadline)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            packing_list.item,
                            packing_list.quantity,
                            packing_list.category,
                            packing_list.priority,
                            packing_list.checklist_status,
                            packing_list.notes,
                            packing_list.deadline,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.packing_list_in_to_out(id, packing_list)
        except Exception:
            return {"message": "Create did not work"}

    def packing_list_in_to_out(self, id: int, packing_list: PackingListIn):
        old_data = packing_list.dict()
        return PackingListOut(id=id, **old_data)

    def record_to_packing_list_out(self, record):
        return PackingListOut(
            id=record[0],
            item=record[1],
            quantity=record[2],
            category=record[3],
            priority=record[4],
            checklist_status=record[5],
            notes=record[6],
            deadline=record[7],
        )


