from fastapi.testclient import TestClient
from main import app
from queries.budgets import BudgetQueries
from datetime import date
from authenticator import authenticator




client = TestClient(app=app)


def fakeAccountData():
   return {
       "id": 1,
       "email": "string@string.com",
   }




class FakeBudgetQueries:
   def get_all(self):
       return [
           {
               "id": 1,
               "description": "Fake Description",
               "amount": 21,
               "date": date(2024, 2, 1).isoformat(),
               "payment_method": "Fake Payment",
           },
       ]




def test_get_all():
       #Arrange
       app.dependency_overrides[BudgetQueries] = FakeBudgetQueries
       app.dependency_overrides[authenticator.get_current_account_data] = (fakeAccountData)
       #Act
       res = client.get("/api/budgets")
       data = res.json()
       #Assert
       assert res.status_code == 200
       assert data == [
                   {
                       "id": 1,
                       "description": "Fake Description",
                       "amount": 21,
                       "date": date(2024, 2, 1).isoformat(),
                       "payment_method": "Fake Payment",
                   },
           ]



