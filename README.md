# Airbnb Clone

### Folders:
- init: Sample data Initialization
- models: All MongoDB models (tables)
- public:
    - css
    - images
- views
    - listings: contain all listing views
    - layouts: contain EJS Mate boilerplate for all views
    - includes: contain component like navbar...

### Routes (RESTful APIs):
- GET       /                   redirect to /listings
READ
- GET       /listings           show all listings
- GET       /listings/:id       show specific listing
CREATE
- GET       /listings/new       new listing details
- POST      /listings           add new listing
UPDATE
- GET       /listings/:id/edit  edit listing details
- PUT       /listings/:id       update the listing (PATCH/PUT)
DELETE
- DELETE    /listings/:id       update the listing (PATCH/PUT)

- POST      /listings/:id/reviews   for reviews
- POST      /listings/:id/reviews/:reviewId     delete specific review

### Packages:
- express, ejs, mongoose, method-override, path

## FRONTEND:

## BACKEND:
- Node.js, Express, EJS, EJS Mate

## DATABASE: (MongoDB)
Models:
- Listing (title, description, image, price, location, country)


try, catch remaining

mvc, passport

stars: https://github.com/LunarLogic/starability/blob/master/starability-css/