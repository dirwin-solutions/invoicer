# invoicer

App that generates invoices for customers

## You will need
 - [node](https://nodejs.org/en) `>= v22.0.0`
 - [Docker](https://docs.docker.com/desktop/)
 - GNU Make (optional)

## Getting Started
 - `npm i`
 - `make refresh` or `npx tsc && docker compose build && docker compose up -d`
- `docker exec -it invoicer-api sh`
   - Then while inside the container:
     - `cd invoicer`
     - `npm run migrate up`

## Roadmap (mvp)
 - CRUD on clients (*done*)
 - CRUD on chargeable types (*to do*)
 - CRUD on chargeables (services or items you sell/rent) your company provides (*to do*)
 - create invoices for your clients (*to do*)
    - add discountable chargeables to those invoices (*to do*)
    - calculate invoice totals based on the chargeables on a given invoice (*to do*)
    - generate pdf from invoice (*to do*)
 - view all invoices for a given client (*to do*)
 - frontend (*to do*)
    - CRUD on clients
        - list invoices per client
    - CRUD on chargeables
    - create invoice UI

## Dev QOL Todo
 - unit tests
 - implement logging
 - implement better error handling
 - github actions builds
 - deploy on AWS
