Justin's Journal

3/1/2024
Today we started to(almost) finalize our backend auth. I had tried to drive but ran into some errors in my computer, so we decided to push and let someone else try. So Ben started driving while we all tried to help, eventually figuring it out later.

3/4/2024
Started working on URL routes and models. We started pair programing today, however since we have an uneven amount of group members, we split in groups of 2 and 3. I was in the group of three and we worked on the landing page and itinerary creates. We managed to finish up the GET and POST routers for itinerary and started the issue for the PUT/DELETE. After our well deserved break :) we worked and finished up the PUT/DELETE routers while the other pair programing group worked on the budget models and routers. We both did run into some git troubles but was able to solve them out in the end. Aha moment we had: Itinerary was misspelled as ‘intinerary’ which caused us to go down a loophole of why it won’t work for 10mins, just for a wording error.


3/5/2024
Had a standup to see how far we’ve gotten, and then started a mob programming session to finish up our last backend routers and models. It was a mob programming sessions because there seemed to only be one major backend part to work on left and one of our teammates had an internet emergency which was solved relatively soon. After finishing the routers and queries for our accounts, budgets, itinerary, and packing lists, we got a little stumped and stuck on where to go after this. We planned on splitting in half with half of us finishing up the new days routers and queries and the other half starting to look up and researching how Redux and frontend Auth would go, but we couldn’t decided how we were gonna relate our days model with the itinerary model as we weren’t taught how a ForeignKey would work for React Redux


3/6/2024
Started this morning finishing up the accommodations api routers. We ran into some trouble trying to relate some of the accommodations data/info with the packing list and itinerary, specifically the to_date and from_date fields.


3/7/2024
Not too much was done today, we got the backend all done. We hadn’t done too much today and just started researching and attempting the Redux frontend.


3/8/2024

Didn’t have the best/easiest time these couple days. After finally implementing and confirming that we were done(or at least mostly done) with our backend. I say mostly in case we every decide to go back and implement other functions that we thought of later. What really stumped all of us was the frontend Authentication setup. I can understand why Riley and Dalonte said authentication material would be handled by senior developers rather than junior developers due to its complexity. After a rather defeating couple days we all decided to take the weekend to relearn all there is to redux and frontend auth.


3/12/2024

Stuff for next time:
Learn how to make it so users can’t make a new itinerary if there already is one. For tomorrow be sure to check up on the BudgetIn baseModel.


3/13/2024

Split up into groups again with me in the three person group. In the morning we worked on getting the POST for budgets to actually work in the frontend and also added Updated and Delete functions for budgets as well. Update took one whole new form while delete was just an added function on the Budget list page. After figuring out how it works for budgets, we then decided to take that same format and essentially reapply it to the other components that required the CRUD frontend. So I ended up taking the accommodations portion and finishing up majority of what needs to be done for the frontend. At the end of the day we all git pushed and pulled for the new forms.


3/14/2024

Split up into the same groups where the other group continued to work on Tailwind. Our group continued to work on the frontend queries and mutations as needed, added some error handling, figured out how to relink some buttons to relocate to a different page, made it so when a delete, update, or create happens it would show on the correct page without having to refresh the page. For that we added some provideTags and invalidatesTags in the slice files.


3/18/2024

Started the morning with the mock exam so we didn't have as much time to work on it today. Added some tailwind css to the edit a budget page and made it look like the other page forms.


3/19/2024

Today, Ben and I researched how to create unit tests for our application. We were able to get a packing list and accommodations list test up and passing. After confirming the tests pass, we then started helping out with the frontend authentication process with William, who had been tackling it for some time. While that was going on, the other group kept working on the tailwind side and attempted to make our itinerary pages more streamline.


3/20/2024

Today I had finished up little bits and minor fixes that were needed to be made and went to try to help Ben and William again. We got Ben’s side of code to work and all we really needed was the frontend authentication to start working properly so that some pages are unable to be accessed unless users are logged in. We had finally gotten that to work in our code, but in order to make those listings unique to a user’s account, we would have to reach back into our migrations table and have to add an extra field to all of our ‘IN” models. We had also found out that in order to create the tabs function in our project, we would need to have the accommodations details become a foreign key and get called to the itinerary details page. Since this was all postgreSQL, fastapi, and redux, we weren’t all too sure how to create a foreign key and decided to shelve the idea as a stretch goal as per advice from our SEIRs and instructors. After deciding to try the tabs idea at a later date, and deciding not to touch the frontend authentication as much after getting it to work(somewhat), we decided to add the “credentials: “include” ” line to the basQuery in all our slice files. We also attempted to merge all of our slice files into one big apiSlice.js file, because that’s the proper way of doing this apparently, but there were conflicts popping up left and right, even after fixing all the import names, so we decided to stop that for now and wait until everyone was grouped up to talk about it. I also ended up learning more about gitlab stuff after helping Ben out with his merge request.


3/21/2024

Today we went over some more frontend authentication regarding the logout function and how to hide/disable certain functions when people aren’t logged in. We realized that the unit tests that were made yesterday needed to be updated because we had added the authentication to those pages the test was for. It was a simple fix with just adding: app.dependency_overrides[authenticator.get_current_account_data] = (fakeAccountData) and adding a new function called fakeAccoundData that gave a fake login. We then only had some tailwind functionality to start working, which I believe Kaitlyn was tackling, the Read.me which Alex was taking a stab at, and the rest of frontend authentication. We also looked throught the code in order to try and catch some minor problems.


3/22/2024
Last day of the project before we turn it in for a grade! We started the morning cleaning up code using the linter flake8. We were able to get a pipeline test passing for that same merge. There wasn’t much else left to fix up after cleaning up unnecessary code. We then all submitted our journals and that was that. Overall a great project with some great people!
