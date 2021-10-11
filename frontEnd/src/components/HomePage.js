import "../App.css";
import "../styles/homeStyle.css";

function HomePage() {
  return (
    <div className="App">
      <h1>Welcome to Kanon Gaming Test</h1>
      <div className="information-container">
        <h3>
          On the left side you can find the menu for the diffirent parts of the
          test that being the countrys related parts under it the slot machine
          part
        </h3>

        <h3>
          For the countrys you can search a country by the provided name and see
          informations related to it, if the name of the country you provided
          couldn't be completly matched a list of potential country names that
          include the letters you wrote in their name will show you can also see
          a list of all country by clicking on the show all countrys button and
          a list of all available country will be shown, clicking on the same
          button again will hide the list furthermore your can filter the
          countrys by name by providing the name and clicking on the filter
          button
        </h3>
        <h3>
          For the slot machine you will find your coins totall at the top under
          the username which will increase or decrease according to the
          condition of the test. A little thing i added is you can provide a
          username which can be used to save the amount of coins you have and
          can come back to continue from the same spot when you reopen the page
          and put the username.
        </h3>
        <h3>
          For the sql question you will find a picture of the schema and buy
          clicking on the button you can see the code for creating the tables
          and the query to select all players with favorite game SLOT
        </h3>
      </div>
    </div>
  );
}

export default HomePage;
