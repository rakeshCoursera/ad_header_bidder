# HackerNews Clone

Heroku app url: https://mighty-chamber-04970.herokuapp.com

## Project Setup (Client-Side)
1. Clone the project repository from github
```
git clone https://github.com/rakeshCoursera/hacker_news_clone.git
```
2. cd into the project folder
```
cd hacker_news_clone
```
3. Run npm install to install all dependencies
```
npm install
```
4. Now run npm start
```
npm start
```
This will run the project where all the ui-rendering happening at client side.



## Project Setup (Server-Side)
1. Clone the project repository from github
```
git clone https://github.com/rakeshCoursera/hacker_news_clone.git
```
2. cd into the project folder
```
cd hacker_news_clone
```
3. Run npm install to install all dependencies
```
npm install
```
4. Now build the application with webpack using cmd
```
npm run build-server
```
5. Run the application 
```
npm run start-server
```
This will run the project where the first page is rendered from server side then client side take over for rest of the session.

## Approach
1. Made a parent function `<App />` component which will have `<NewsContainer />` as child.
2. The `<NewsContainer />` component is a redux store connected component. It fetches the store state and dispatches events to update store state with user events.
3. The `<NewsContainer />` component contains `<Table />`, `<Pagination />`, and `< LineChart/>` components as children.
4. The `<Table />` connected component render the table according the passed news data and handles user events. A `TableRow` child component render eact row of this table. 
5. The `<Pagination />` component dispatch an async action when user request Previous, Next page.
6. The `<LineChart />` component changes the chart with the state change.


## Important NPM libraries used in the project
* [redux-persist](https://www.npmjs.com/package/redux-persist)
  * Persist and rehydrate a redux store for in-browser storage.
* [connected-react-router](https://www.npmjs.com/package/connected-react-router)
  * A Redux binding for React Router v4 and v5.
* [react-apexcharts](https://www.npmjs.com/package/react-apexcharts)
  * React.js wrapper for ApexCharts to build interactive visualizations in react.
* [redux-thunk](https://www.npmjs.com/package/redux-thunk)
  * Allows to write action creators that return a function instead of an action.






