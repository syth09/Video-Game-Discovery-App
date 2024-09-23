# Project: Building a Video Game Discovery App:

### Setting up project:

- Using vite version 4.1.0.
- Setting git repository at: https://github.com/syth09/Video-Game-Discovery-App.git

### Installing Chakra:

- Because we're using Vite so we'll install the library as guide in the chakra page:https://v2.chakra-ui.com/getting-started/vite-guide

* 1. Installation: `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
* 2. Provider Setup:

```
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

### Creating a Responsive Layout:

- Using the `Grid` components from chakra to create a responsive layout throughout our application.
- The `Grid` components from chakra also work exactly like `HTML grid`

```
import { Grid } from "@chakra-ui/react";

function App() {
  return <Grid templateAreas={}></Grid>;
}

export default App;
```

- After adding the `Grid` we set a `templateAreas` to define the layout of our `Grid` and then we add the `GridItem` inside our `Grid` to map it's location/area of display on our screen:

```
function App() {
  return (
    <Grid templateAreas={`"nav nav" "aside main"`}>
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <GridItem area="aside" bg="gold">
        Aside
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}
```

![image](https://gist.github.com/user-attachments/assets/61c2ee08-3bf8-4ac6-9104-4c930fd10304)

- To make it more user-friendly we would had to hide the `side panel` on mobile devices, so back to our `App` components instead of setting the `templateAreas` to a `String`, we should set it to an object and inside that object we can set various properties like: `base`, `sm` (small), `md` (medium), `lg`(large), `xl` (extra large), etc. These are our break points:
  ![image](https://gist.github.com/user-attachments/assets/409967b8-34a4-42e7-af0c-c92b9fc52cea)
- Next, within our object we'd needed to define 2 different layouts, one for mobile devices and other for large devices with screen wider than 1024px. Now, after defining the layout we need to make sure the our `side panel` only shown when the layout of the user screen are `lg` or bigger, and with that we going to use the `Show` components and `above` methods from chakra.

```
function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" " main"`,
        lg: `"nav nav" "aside main"`
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}
```

- Mobile:
  ![image](https://gist.github.com/user-attachments/assets/96a00dbd-b846-4439-8aaf-a45732a83a98)
- Larger devices:
  ![image](https://gist.github.com/user-attachments/assets/5fa00ea9-4a83-44af-900b-040618132e50)

### Building a Navigation Bar:

- Let's start with creating a components folder then we create our `NavBar` components.
- In our `NavBar` components we want to layout our items horizontally, and to do that we can use the components call `HStack` from our chakra library.

```
import { HStack } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <HStack>
    </HStack>
  );
};

export default NavBar;
```

- Now to create a place holder for our project icon simply create an `Image` components that come from the library, then we import our logo just liked any other JS module:

```
import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize={"60px"} />
      <Text>NavBar</Text>
    </HStack>
  );
};
```

- After finished the logo we will head to our `App` components and add it into our `GridItem` and test out the functionality of our components:

```
<GridItem area="nav" bg="coral">
  <NavBar />
</GridItem>
```

![image](https://gist.github.com/user-attachments/assets/e94e71b3-9b56-4a7f-9745-99d7f79dd1f2)

### Implementing the Dark Mode:

- Creating dark mode using chakra `Color Mode`.
- We first and foremost going to create a file inside our `src` folder and named it `theme.ts`. With this file we going to customize the default theme that come with chakra.
- First, we import a function call `extendTheme` as well as an interface named `ThemeConfig`, then we need to create a configuration object and annotate it with the `ThemeConfig` to access its properties. After that we call the `extendTheme` pass it the `config` object, and then extract it:

```
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark"
};

const theme = extendTheme({ config });

export default theme;
```

- When finished extracting it, we import it in our `main.tsx` and then pass it onto the `ChakraProvider` and a `ColorModeScript` to set the color as default value when we run our application:

```
// other imports
import theme from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

![image](https://gist.github.com/user-attachments/assets/5cc5158e-2a54-41c3-921d-2d8fba8fb480)

### Building a Color Mode Switch:

- Add a switch whose sole purpose is to toggle the colour mode. To work with the colour mode, we must use a custom hook defined in the `useColorMode` chakra.
- When declaring our `Switch` component give it a `isChecked={colorMode === "dark"}` to see if our theme was assign as dark mode or not, then apply `onChange` to `onChange={toggleColorMode}`. All the functionality has already built for us so nothing much to be done here.

```
import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text>Dark mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
```

- With this new code snippet implement on our `ColorModeSwitch` component, the only job left for us to do is add this component to our `NavBar`:

```
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize={"60px"} />
      // switch our the `Text` and import color mode switch button instead.
      <ColorModeSwitch />
    </HStack>
  );
};
```

- Dark:
  ![image](https://gist.github.com/user-attachments/assets/232a667b-032e-4e4a-b003-9c8b31540eb4)
  -Light:
  ![image](https://gist.github.com/user-attachments/assets/c2002adc-54d3-4808-8791-0093e6a3ef52)
- The last thing we want to do to improve the UI is by placing the switch button on the right side of the `NavBar`, and to do that we can simply set our `HStack` content in `NavBar` to have a display of flex and use the element `justify-content: space-between` to even out the display of the `NavBar` (also we need to add some padding to make the text not so close to the edge of the screen):

```
<HStack justifyContent="space-between" padding="10px">
  <Image src={logo} boxSize={"60px"} />
  <ColorModeSwitch />
</HStack>
```

![image](https://gist.github.com/user-attachments/assets/47ab717c-5a53-4a88-b3d7-c3579d7e973f)

### Fetching the Games:

- Fetch a list of games from rawg api.
- Then install axios on our project `npm i axios`.
- Now we've got to create an axios instance with custom configuration and in the configuration we're going to include our object key that we got from rawg.
- Add a new folder in our `src` folder and name it `services`, create a new files call `api-client.ts`. Then in our new files we import axios then use the syntax `axios.create({})` to create a new instance with a custom configuration. Set the params to an object and in this object we set the key to the value that we get from rawg:

```
import axios from "axios";

export default axios.create({
  params: {
    key: "9eae00bfd5b94fa5859c69d91e6d5e7d"
  }
});
```

- With this configuration, this key will be included in the query string of every HTTP request that we send to our backend, and we should also set the `baseURL` of it to the games api that got provide by rawg's api documentation:

```
import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "9eae00bfd5b94fa5859c69d91e6d5e7d"
  }
});
```

- Next we need to create a components that can fetch our games data, inside of our components we create a `useState` variables to store our game object and error messages:

```
const [games, setGames] = useState([]);
const [error, setError] = useState("");
```

- Now we need to use the `useEffect` hook to send a fetch request to the backend.

```
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

// Create a interface to fulfill the shape of the response object with the schema on rawg
interface Game {
  id: number;
  name: string;
}

interface FetchGamesRespond {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // use angle brackets to provide  generics type args
    apiClient
      .get<FetchGamesRespond>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });

  return <div>GameGrid</div>;
};

export default GameGrid;
```

- Testing it out with unordered list:

```
return (
  <ul>
    {games.map((game) => (
      <li key={game.id}>{game.name}</li>
    ))}
  </ul>
);
```

- Added it to the `App` components:

```
<GridItem area="main">
  <GameGrid />
</GridItem>
```

- Final result:
  ![image](https://gist.github.com/user-attachments/assets/989e54ac-5438-4dfd-9a9a-fb034ca6ea23)
- Rendering error in `GameGrid` components markup:

```
return (
  <>
    {error && <Text>{error}</Text>}
    <ul>
      {games.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  </>
);
```

- Alter the api to test out the error text message `apiClient.get<FetchGamesRespond>("/xgames")`:
  ![image](https://gist.github.com/user-attachments/assets/05f35e94-b342-4ca0-ac3d-f05b34b51cb6)

### Creating a Custom Hook for Fetching Games:

- Currently our `GameGrid` components is involve in the process of making a HTTP requests, it knows about the type of request we going to send, knows about the endpoint and it should also need to know about the canceling requests in the future and this is something that we don't want in our components. Simply because our component should be primary responsible for returning markup and handling user interaction in high level.
- Now we can either move our logic of making HTTP request inside a `Service` or moving the entire logic meaning the `useState` variable and `useEffect` inside a hook.
- We going to follow the hook way this time:

  - Add a new folder call `hook` in the `src` folder, then add a new file call `useGames.ts`
  - In the new file we define a function `const useGames = () => {}` and export it. Now we get back to our `GameGrid` and moved the entire logic code to our `useGames.ts` and we also need to return the `games` and `error` object so we can use them in our components.

  ```
  import { useEffect, useState } from "react";
  import apiClient from "../services/api-client";

  // Create a interface to fulfill the shape of the response object with the schema on rawg
  interface Game {
    id: number;
    name: string;
  }

  interface FetchGamesRespond {
    count: number;
    results: Game[];
  }

  const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
      // use angle brackets to provide  generics type args
      apiClient
        .get<FetchGamesRespond>("/xgames")
        .then((res) => setGames(res.data.results))
        .catch((err) => setError(err.message));
    });

    return { games, error };
  };

  export default useGames;
  ```

  - Our new `GameGrid` components:

  ```
  import { Text } from "@chakra-ui/react";
  import useGames from "../hooks/useGames";

  const GameGrid = () => {
    const { games, error } = useGames();

    return (
      <>
        {error && <Text>{error}</Text>}
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      </>
    );
  };

  export default GameGrid;
  ```
