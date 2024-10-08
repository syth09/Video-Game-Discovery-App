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

- Now our component is no longer need to make any HTTP request and it's primary responsible for returning markup, so now we should also make the `useGames` hook handle the cancellation:

```
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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
    // cancellation
    const controller = new AbortController();
    // use angle brackets to provide  generics type args
    apiClient
      .get<FetchGamesRespond>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
```

### Building Game Cards:

- Now we had to replaced the bullet point with a game cards component.
- To create a card like layout/ design we can use the `Card` components from chakra, then inside this card we going to create a `Image` component and se should set the `src` to `game.background_image`.

```
interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <Image src={game.background_image} />
    </Card>
  );
};
```

- According to the rawg games api documentation we have this properties called `background_image` which help get the image and we have to added it to our `game` interface to be able to set the source.

```
export interface Game {
  id: number;
  name: string;
  background_image: string;
}
```

- Right after our `Image` we need to add a `CardBody` component and simply render a heading: `<Heading>{game.name}</Heading>` to test out our applications.

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <Image src={game.background_image} />
      <CardBody>
        <Heading>{game.name}</Heading>
      </CardBody>
    </Card>
  );
};
```

- To test out the implementation, we head back to our `GameGrid` components and change the `ul` to `SimpleGrid` components and set the columns to `columns={3}` and spacing our card components by 10 pixels each `spacing={10}`. Finally we replace our `li` with our new `GameCard` components:

```
const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={3} spacing={10}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};
```

- The result:
  ![image](https://gist.github.com/user-attachments/assets/69f3f19e-0d0d-40c8-83b5-8ad618f46a3d)

- Currently, our game card component have a really sharp corner and it's really not have a look that's inviting so we'd prefer to create a more rounded corner.

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading>{game.name}</Heading>
      </CardBody>
    </Card>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/4703c63e-d1bf-4823-89d3-c5b279b032c0)

- There's one more thing we can improve and that is our game heading, because right now the game heading is literally too big, so back to our card and here in the `Heading` component we simply set the `fontSize` to `2xl` (pre-declare font size in chakra documentation.)

```
<Card borderRadius={10} overflow="hidden">
  <Image src={game.background_image} />
  <CardBody>
    <Heading fontSize="2xl">{game.name}</Heading>
  </CardBody>
</Card>
```

- With the simple display experience aside, we can now make our layout be responsive for each display screen it is shown to. In moblie devices we want it to have a single columns, on tablet we want to add 2 columns, on larger screen we want to have 3 or more columns.

```
<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
  {games.map((game) => (
    <GameCard key={game.id} game={game} />
  ))}
</SimpleGrid>
```

- Mobile devices:
  ![image](https://gist.github.com/user-attachments/assets/fe08fa5b-a159-4842-9326-51a6115909a9)

- Tablet:
  ![image](https://gist.github.com/user-attachments/assets/9d34e080-5256-4abc-9f62-468e5c790f9e)

- Laptop(large screen):
  ![image](https://gist.github.com/user-attachments/assets/e4b401eb-d707-49d1-98e8-61aca733cc3a)

- Larger devices:
  ![image](https://gist.github.com/user-attachments/assets/5f44b2b3-bf40-40c6-a085-53ef970db7ec)

### Displaying Platform Icons:

- Displaying different icons for different platforms like: Windows, PlayStation, XBox, etc.
- Each of our game objects which get return as a result from the HTTP request and each game have a properties called parent platform which show a object that represent each platform (We also had a `platform` properties which is a more comprehensive list which can indicate many version of the platform that a game can be use on).
- To show the Icon we would had to look at the `parent_platform` properties:
  ![image](https://gist.github.com/user-attachments/assets/c2eac1a7-7025-4ddf-adab-999985f9964e)
- In this Array we have a bunch of object but each object is not a platform object, when we expend one of the object inside it would had a platform properties which is a platform object, so by following the design now we will have to add the `parent_platform` to our `Game` interface and we'd also had to define another interface which represent our `platform` object:

```
interface Platform {
  id: number;
  name: string;
  slug: string;
}

// Create a interface to fulfill the shape of the response object with the schema on rawg
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
}
```

- The tricky part here is that the design make the `parent_platform` here is not a array of platform (`Platform[]`) it's an array of object where each object has a properties call platform of type platform (`{ platform: Platform }[]`).
- When we finish with the interface we can head back to our `GameCard` components and test out first if we can render the platform as a simple text in the card before showing an icon.

```
<CardBody>
  <Heading fontSize="2xl">{game.name}</Heading>
  {game.parent_platforms.map(({ platform }) => (
    <Text>{platform.name}</Text>
  ))}
</CardBody>
```

![image](https://gist.github.com/user-attachments/assets/7094a10d-9b29-4581-b6a9-52f9dd165932)

- Re-render the display columns and the fonts before rendering the platform icon by using the React icon library:
  ![image](https://gist.github.com/user-attachments/assets/2f21624a-2ed5-44d0-8285-f8ec7c7a8101)
- To implement the icon first we install the library `npm i react-icons@versions`. Now to implement the icon we need a mapping between the name of the platform and an icon.
- To render the icons we would needed a mapping between the name of a platform and an icon. The best implementation is that we move this entire logic to an separate components because if we keep the logic inside our `GameCard` it would be a distraction of what the `GameCard` components suppose to do which is rendering the game card itself:

```
{game.parent_platforms.map(({ platform }) => (
  <Text>{platform.name}</Text>
))}
```

- To an separate components call `PlatfromIconList.tsx` and in that component we should give it a `Props` which is going to be an array of platform objects, and before rendering the icon we should test out te component with text to see if it work with our `GameCard` properly or not:

```
import { Text } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";

interface PlatformIconListProps {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  return (
    <>
      {platforms.map((platform) => (
        <Text>{platform.name}</Text>
      ))}
    </>
  );
};

export default PlatformIconList;
```

- Now we implement it into our `GameCard` components:

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        // Rendering the Icon (Testing out with text)
        <PlatformIconList
          platforms={game.parent_platforms.map((p) => p.platform)}
        />
      </CardBody>
    </Card>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/59145da3-5589-4d5f-90f1-d99f3f8672ad)

- They are working as expected so the only thing we need to do is to replace the text with the platform icons. Back to our `PlatformIconList` components, we should import the a bunch of component from the react icons library:

```
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
```

- Next step is to map the name of each platform to an icon by using an `iconMap` object as a map, and this `iconMap` object would need to contain a key that represent the slug of each platform, because in each platform has a name and a slug:

```
  const iconMap = {
    // name : PlayStation
    // slug: playstation
  };
```

- Implementing it:

```
  const iconMap = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    ios: MdPhoneIphone,
    web: BsGlobe
  };
```

- Now that we have this map object we can replace the `Text` component with an `Icon` components and we should annotate our `iconMap` to an object that have any type of string key in them (also call an `Index Signature` which represent a key or properties in this object).
- By specify the `Index Signature` syntax we don't have to specify the name of these key inside `iconMap` and each key is also need to be map to a value of type `IconType` which is define in the react icons library:

```
const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe
  };

  return (
    <HStack>
      {platforms.map((platform) => (
        <Icon as={iconMap[platform.slug]} />
      ))}
    </HStack>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/ee4232be-1917-401e-a6b0-21bbe7fd296a)

- Improvement by altering the style of icon to be differ from the heading text:

```
  return (
    // Spacing the icon for clearer view
    <HStack margin={1}>
      {platforms.map((platform) => (
        // Darker shade of color for the icon to easier to dissect it from the heading
        <Icon as={iconMap[platform.slug]} color="gray.500" />
      ))}
    </HStack>
  );
```

![image](https://gist.github.com/user-attachments/assets/13ce4442-4725-4878-8434-e61a0bdbf3b5)

### Displaying Critic Score:

- Now we going to add a badge that contain the score that the game critic has assign to each game.
- Each of our game properties that got fetch have a properties call `metacritic` and this is a number which value from 0 between 100. The color of the badge will be dependent on the score. The high score will be green, medium score will be yellow.
- To create a component that sole use for displaying the critic score, first we'd need to go to our `useGames` hooks and add a new properties call metacritic to our `Game` interface:

```
export interface Game {
  // same properties as before.
  metacritic: number;
}
```

- Next, we create a new components and call it `CriticScore.tsx`, inside the components let's use an interface to define the shape of props:

```
interface CriticScoreProps {
  score: number;
}

const CriticScore = ({ score }: CriticScoreProps) => {
  return <div>CriticScore</div>;
};

export default CriticScore;
```

- To render the score badge we'd needed to use the `Badge` components from chakra UI

```
const CriticScore = ({ score }: CriticScoreProps) => {
  return <Badge>{score}</Badge>;
};
```

- Now let's test it our by adding our new `CriticScore` components to our `GameCard`:

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <PlatformIconList
          platforms={game.parent_platforms.map((p) => p.platform)}
        />
        <CriticScore score={game.metacritic} />
      </CardBody>
    </Card>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/309dd95d-6013-449f-84cf-6b3e5f867fe9)

- The next step is to style the `Badge` by putting the platform icons and the critic score side by side using the `HStack` to warp both the icon and the badge together, then to move the badge to the rightside of the card we need to use a flex style element `justifyContent={"space-between"}` so all the available spaces could be distributed to this 2 items:

```
  <CardBody>
    <Heading fontSize="2xl">{game.name}</Heading>
    <HStack justifyContent={"space-between"}>
      <PlatformIconList
        platforms={game.parent_platforms.map((p) => p.platform)}
      />
      <CriticScore score={game.metacritic} />
    </HStack>
  </CardBody>
```

![image](https://gist.github.com/user-attachments/assets/90da56b9-bd01-4313-b67d-8b048495611c)

- Final improvement we can make on this badge is to make the look and feel of the badge more distinct. Back to our `CriticScore` components we can make the font-size bigger, so is the badge, and we can also make the badge border rounder:

```
const CriticScore = ({ score }: CriticScoreProps) => {
  return (
    <Badge fontSize="14px" paddingX={2} borderRadius='4px'>
      {score}
    </Badge>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/9bff1763-acc1-44c0-82c6-ffda10b85ed5)

- Last but not least we should make the color of our badge dependent on the score by setting up rules for it (e.g if the score is above 75 it should be green, if it's greater than 60 it should be yellow and so on). To implement this we declare a variable call `color` and set the rule to the `color` variable:

```
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";
```

- After that we should set the `colorScheme` to `color`:

```
return (
  <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
    {score}
  </Badge>
);
```

![image](https://gist.github.com/user-attachments/assets/1711a553-2a97-47bc-afdf-5324c0a54b6c)

### Getting Optimize Images:

- Optimizing the image of the game card to speed up the loading process of the pages.
- To render optimize images we need to modify the images URL and insert the `crop` parameter and to do that we'll need a new utilities or new services class to solve the problem.
  - To “crop” an image is to remove or adjust the outside edges of an image (typically a photo) to improve framing or composition, draw a viewer's eye to the subject, or change the size or aspect ratio.
- First, we added a new file in the `services` folder, name it `image-url.ts`, and in this module we should define a function `getCroppedImageURL` and this function should take `url` as a `string` then return a new `url`:

```
const getCroppedImageURL = (url: string) {

}

export default getCroppedImageURL;
```

- Inside our function we should find the `indexOf('media/')` then store it in a variable or a constanst `index`. Now to insert the `crop` parameter after `media` we should call `url.slice(0, index)` to slice the string and grab all the character from the beginning to `index`:

```
const getCroppedImageURL = (url: string) => {
  const index = url.indexOf("media/");
  url.slice(0, index);
};

export default getCroppedImageURL;
```

- But the index represent the starting position of our `media` parameter while we need to add the `crop` parameter after `media`, so up on the `index` constant we need to add the length of `media` parameter:

```
const getCroppedImageURL = (url: string) => {
  // store media on a separate constant because we've repeated "media/" couple times.
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  url.slice(0, index);
};

export default getCroppedImageURL;
```

- Then we should add the `"crop/600/400/"` along with the rest of the character in the string `url.slice(index)`. Finally, we return the new url:

```
const getCroppedImageURL = (url: string) => {
  // store media on a separate constant because we've repeated "media/" couple times.
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
};

export default getCroppedImageURL;
```

- Now we can test out implementation and see it in action by calling the `getCroppedImageURL` inside the `Image` component of our `GameCard` and pass the `game.background_image` as an argument:

```
<Image src={getCroppedImageURL(game.background_image)} />
```

- To verify that we are downloading smaller images, we open up the network tab in the dev tool and select `img` then we click on one of the images to inspect it and copy it url to new tab to verify it:
  ![image](https://gist.github.com/user-attachments/assets/a031c177-cd9b-4b85-8b74-184e9e58536a)
  ![image](https://gist.github.com/user-attachments/assets/7113bdcf-1f82-4877-9ea2-a4b0816a776d)

### Improving User Experience with the Loading Skeleton:

- To improve the UX we can add a loading skeleton on this page, so while we are waiting for our backend to fetch the data we gonna show the loading sheleton of the game card and the pages.
- First we need to track the loading state of our hook by declaring another `useState` in our `useGames` hook then initialize it to false:

```
const useGames = () => {
  // other useState hooks
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // same as before
      });

    return () => controller.abort();
  }, []);

  return { games, error };
};
```

- And just before we call our `api` we set the loading to true `setLoading(true);` and then after we finish loading we set it back to false and also need to return the `isLoad` from our hook:

```
const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // cancellation
    const controller = new AbortController();
    // use angle brackets to provide  generics type args

    setLoading(true);
    apiClient
      .get<FetchGamesRespond>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};
```

- To render a Skeleton we should create a separate components and that components gonna look like a `GameCard` but it's not a `GameCard` because we can only render a `GameCard` if we had a game object and in this case we don't have a game object, so we want to render a skeleton.
- Starting by creating a new file in the `components` folder and name it `GameCardSkeleton.tsx`.
- Now in this component first we add a `Card` component from chakra, but inside our card we are not going to have an image instead we going to add a `Skeleton` (`Skeleton` define in chakra, it's like a placeholder for an image that is being loaded) then give it a height of 200px or something to test it out later.

```
import { Card, Skeleton } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
    </Card>
  );
};

export default GameCardSkeleton;
```

- After we add a body and other element to mimic our `GameCard` components:

```
const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};
```

- Testing it out by adding it to our `GameGrid`. First we need to add the `isLoading` to our `useGames` in `GameGrid`, to render a skeleton we would needed an array with around 6 items as 6 skeleton being load on the screen:

```
const GameGrid = () => {
  const { games, error, isLoading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      // grid content
    </>
  );
};
```

- With our newly define skeleton now we can add a skeleton to the grid by the condition if the page is loading, and if the loading is true we going to `map()` each skeleton to a `GameCardSkeleton` components and set the key to skeleton:

```
<SimpleGrid
  columns={{ sm: 1, md: 2, lg: 3, "2xl": 5 }}
  padding="10px"
  spacing={10}
>
  {isLoading &&
    skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
  {games.map((game) => (
    <GameCard key={game.id} game={game} />
  ))}
</SimpleGrid>
```

![image](https://gist.github.com/user-attachments/assets/07029c3f-2009-4e7f-90ab-a58beda20d18)

- Our current skeleton implementation has a layout issue because our skeleton don't have the same width as our `GameCard`, so to ensure the consistencies we have to applied the same width to both our skeleton and our card.
- Testing out by giving the card the width of 300px:

  - Skeleton:

  ```
  <Card width="300px" borderRadius={10} overflow="hidden">
    <Skeleton height="200px" />
    <CardBody>
      <SkeletonText />
    </CardBody>
  </Card>
  ```

  ![image](https://gist.github.com/user-attachments/assets/4e6afdb2-2853-401b-8bd9-c6a283ff7f1f)

  - Card:

  ```
  <Card width="300px" borderRadius={10} overflow="hidden">
    <Image src={getCroppedImageURL(game.background_image)} />
    <CardBody>
      <Heading fontSize="2xl">{game.name}</Heading>
      <HStack justifyContent="space-between">
        <PlatformIconList
          platforms={game.parent_platforms.map((p) => p.platform)}
        />
        <CriticScore score={game.metacritic} />
      </HStack>
    </CardBody>
  </Card>
  ```

  ![image](https://gist.github.com/user-attachments/assets/fe695fd1-d9a8-424e-9100-8b7f6437be87)

### Refactor: Removing Duplicate Styles

- Removing the duplicated styles by creating a component that will be acting as a container for our card. In this container we going to return a `Box` component which is defined in chakra when it got render it return a `div` and we going to apply those style to the `Box`:

```
import { Box } from "@chakra-ui/react";

const GameCardContainer = () => {
  return <Box width="300px" borderRadius={10} overflow="hidden"></Box>;
};

export default GameCardContainer;
```

- After having a single place where we define the basic style of our card, now we should pass a `GameCard` or `GameCardSkeleton` as a child to this components:

```
import { ReactNode } from "react";

interface GameCardContainerProps {
  children: ReactNode;
}

const GameCardContainer = ({ children }: GameCardContainerProps) => {
  return <Box width="300px" borderRadius={10} overflow="hidden"></Box>;
};
```

- Then we go back to our `GameGrid` components to wrap our `GameCard` and `GameCardSkeleton` inside our container:

```
<SimpleGrid
  columns={{ sm: 1, md: 2, lg: 3, "2xl": 5 }}
  padding="10px"
  spacing={10}
>
  {isLoading &&
    skeletons.map((skeleton) => (
      <GameCardContainer>
        <GameCardSkeleton key={skeleton} />
      </GameCardContainer>
    ))}
  {games.map((game) => (
    <GameCardContainer>
      <GameCard key={game.id} game={game} />
    </GameCardContainer>
  ))}
</SimpleGrid>
```

![image](https://gist.github.com/user-attachments/assets/1b6647b7-4322-4c56-92ad-e8ef823134db)

### Fetching the Genre:

- Building the side panel to display the game genre.
- First build a component to fetch the genre and to fetch the genre we will also be needing a hooks that work similar to the hook that we use to fetch the game.
- Creating a hooks for fetching the genre:

```
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresRespond {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresRespond>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
```

- Implement the hooks onto the component:

```
const GenreList = () => {
  const { genres } = useGenres();

  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};
```

- Adding it to the side panel in the `App` components to test it out:

```
<Show above="lg">
  <GridItem area="aside">
    <GenreList />
  </GridItem>
</Show>
```

![image](https://gist.github.com/user-attachments/assets/3351b891-bf5b-4ba7-a5d8-e44009c07ee3)

### Fetching the Genre:

- Building the side panel to display the game genre.
- First build a component to fetch the genre and to fetch the genre we will also be needing a hooks that work similar to the hook that we use to fetch the game.
- Creating a hooks for fetching the genre:

```
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresRespond {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresRespond>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
```

- Implement the hooks onto the component:

```
const GenreList = () => {
  const { genres } = useGenres();

  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};
```

- Adding it to the side panel in the `App` components to test it out:

```
<Show above="lg">
  <GridItem area="aside">
    <GenreList />
  </GridItem>
</Show>
```

![image](https://gist.github.com/user-attachments/assets/3351b891-bf5b-4ba7-a5d8-e44009c07ee3)

### Creating a Generic Data Fetching:

- Creating a generic data fetching hook to avoid duplicated code in our applications, make it reusable easier to maintain and refactor.

```
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchRespond<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchRespond<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
```

- Now we going to test it out on our `GenreList`, but first we need to export the data to the `useGenre` hooks:
- `useGenres` Hooks:

```
import useData from "./useData";

export interface Genre {
  id: number;
  name: string;
}

const useGenres = () => useData<Genre>('/genres')

export default useGenres;
```

![image](https://gist.github.com/user-attachments/assets/bdc0e25e-01eb-447f-b114-e60870c94d10)

- Also need to implement the same implementation onto the `useGames`:

```
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = () => useData<Game>('/games');

export default useGames;
```

- As we alter our `useGames` to implement the generic fetch, we'd also need to switch up the mapping of each game in our game card by changing our implementation where we are mapping our game which is the `GameGrid` components:

```
const GameGrid = () => {
  // change from games to data
  const { data, error, isLoading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, "2xl": 5 }}
        padding="10px"
        spacing={10}
      >
        // genre
        // change the `games.map` to `data.map`
        {data.map((game) => (
          <GameCardContainer>
            <GameCard key={game.id} game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};
```

### Displaying the Genre:

- Displaying the genre with it corresponding images that's provide by rawg api. First and foremost, we need to add a new properties call image_background to our `Genre` inteface:

```
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}
```

- Then we go to our `GenreList` components and replace the `ul` element with the `List` component that help us render a list without any bullet points that's pre-define by chakra. Similarly, we should change our `li` to `ListItem`.
- Now in the `ListItem` we should add a horizontal stack `HStack` so we can line up the image and the label of the genre horizontally.

```
const GenreList = () => {
  const { data } = useGenres();

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id}>
          <HStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
```

- Inside the `HStack` we add an `Image` by chakra and because we rendering the list of genre on our side panel our image should be small so we will set our `boxSize` to 32px and also we should set the `borderRadius` to make the image rounder, finally we set the `src` to the background image:

```
const GenreList = () => {
  const { data } = useGenres();

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id}>
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageURL(genre.image_background)}
            />
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/dfc28b73-1673-46c5-bdd2-473f5f982fb4)

- Now we render the label using the `Text` components:

```
<List>
  {data.map((genre) => (
    <ListItem key={genre.id} paddingY="5px">
      <HStack>
        <Image
          boxSize="32px"
          borderRadius={8}
          src={getCroppedImageURL(genre.image_background)}
        />
        <Text>{genre.name}</Text>
      </HStack>
    </ListItem>
  ))}
</List>
```

![image](https://gist.github.com/user-attachments/assets/ce908b3b-80b6-4c30-ad9b-02badef85ea5)

- Small styles apply to our `App.tsx` component make the side panel have a horizontal padding

```
<Show above="lg">
  <GridItem area="aside" paddingX="10px">
    <GenreList />
  </GridItem>
</Show>
```

![image](https://gist.github.com/user-attachments/assets/76829497-ca52-46e1-bd0d-88b95984dc08)

- Applying a fixed width to the side panel columns so if we ever had more real estate on the screen our `GameGrid` would stretched and takes up the available space.
- To define the width for our columns first we define a `templateColumns` and set it to an object because we have 2 different scenario:

  - The base scenario where we have only a single columns and a second scenario where we have 2 columns:

  ```
  <Grid
    templateAreas={{
      base: `"nav" " main"`,
      lg: `"nav nav" "aside main"`
    }}
    templateColumns={{

    }}
  >
  ```

  - On the second scenario on our `GameCard` we should make it responsive by removing the fix width that we apply to them earlier in our project:

  ```
  const GameCardContainer = ({ children }: GameCardContainerProps) => {
    return (
      <Box borderRadius={10} overflow="hidden">
        {children}
      </Box>
    );
  };
  ```

  - We can also remove some extra spacing to make the card bigger

  ```
  <SimpleGrid
    columns={{ sm: 1, md: 2, lg: 3, "2xl": 5 }}
    padding="10px"
    spacing={3}
  >
  ```

  ![image](https://gist.github.com/user-attachments/assets/27268c1a-1d08-454b-b8dd-a733907f9206)

- Check working status with compatible devices:

  - Mobile:
    ![image](https://gist.github.com/user-attachments/assets/29571e2c-4d9a-4445-9d0c-06afd70a7d17)

  - Tablet:
    ![image](https://gist.github.com/user-attachments/assets/b1b75336-1f92-4c2d-91e8-7f1ebf03d502)

  - Laptop:
    ![image](https://gist.github.com/user-attachments/assets/cc2ad2c7-12c2-4246-9a7a-b7c1b6604149)(Laptop 1024px)
    ![image](https://gist.github.com/user-attachments/assets/e6ccc902-9960-4d36-9712-9d9d7b3aa268)(Laptop large screen 1440px)

  - Bigger devices:
    ![image](https://gist.github.com/user-attachments/assets/4dbbd39d-c966-4e91-8aeb-8a43b06bdb31)

### Showing the Spinner:

- Showing a loading spinner while we are waiting for the genre to be fetch.
- In our `GenreList` we simply grab the `isLoading` from the hook, then we define the logic by saying if the `isLoading` is true then we simply return the `Spinner` component from chakra:

```
const { data, isLoading } = useGenres();

if (isLoading) return <Spinner />;
```

![image](https://gist.github.com/user-attachments/assets/1b0e5c6c-9922-43dc-8bc3-5015bc1afcd5)

- Error handler:

```
const { data, isLoading, error } = useGenres();

if (error) return null;
if (isLoading) return <Spinner />;
```

- Implement error to test out the handler:

```
const useGenres = () => useData<Genre>("/genresx");
```

![image](https://gist.github.com/user-attachments/assets/d228fd1f-3b49-4742-8dc3-91a383609f20)

### Filtering the Games by Genre:

- The first thing we need to do is replace our `Text` component in the `GenreList` to a `Button` so we can click on our genre then we should set the `variant` to a link so our button have an appearance similar to a link:

```
<Button fontSize="lg" variant="link">
  {genre.name}
</Button>
```

![image](https://gist.github.com/user-attachments/assets/d850c499-e286-4a7c-a7fa-672d7fea0d66)

- Now let handle the click event, let's test it out by printing it on the console.

```
<Button
  onClick={() => console.log(genre)}
  fontSize="lg"
  variant="link"
>
  {genre.name}
</Button>
```

![image](https://gist.github.com/user-attachments/assets/9bd14cb9-4dea-4e70-a32b-8ebfedb6ab97)

- Now we need to share a state from our selected genre with our `GameGrid`, and to share a state between two components we would need to lift the state to the closest parent, the closet parent of the `GenreList` and the `GameGrid` is our `App` component.
- We now have to go to our `App` component and declare a `useState` variable for storing the selected genre:

```
function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" " main"`,
        lg: `"nav nav" "aside main"`
      }}
      templateColumns={{}}
    >
     // same grid content as before
    </Grid>
  );
}
```

- With this implementation we cannot set `selectedGenre` to a different value other than `null` because the react compiler doesn't know that this variable can store `Genre` object, so in our `useState` we need to type in a generic type argument and say `Genre`, so that our variable can hold either a `Genre` object or `null`:

```
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
```

- Now when we select a genre our `GenreList` component should notice our `App` component to set the `selectedGenre` because the component that hold the state should be the one to update it, so we should go back to our `GenreList` and add a props for passing a callback function:

```
interface Props {
  onSelectGenre: (genre: Genre) => void;
}
```

- Then instead of logging the genre on the console pass it to the `onSelectGenre`:

```
  <Button
    onClick={() => onSelectGenre(genre)}
    fontSize="lg"
    variant="link"
  >
    {genre.name}
  </Button>
```

- And we also had to pass it to our `GenreList` on our `App` components:

```
  <Show above="lg">
    <GridItem area="aside" paddingX="10px">
      <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} />
    </GridItem>
  </Show>
```

![image](https://gist.github.com/user-attachments/assets/b12ad817-1360-46b6-83e6-394302f36a4a)

- In our `App` component we have a state variable that hold the selected components.
- The next step is passing this onto our `GameGrid` so it can be pass onto the backend while fetching the game.
- In our `GameGrid` we should also add a props:

```
interface Props {
  selectedGenre: Genre | null;
}

const GameGrid = ({ selectedGenre }: Props) => {
  const { data, error, isLoading } = useGames(selectedGenre);
  const skeletons = [1, 2, 3, 4, 5, 6];
```

- Because we pass it on our `useGames` hook we also had to modify the hooks to have a parameter of `selectedGenre: Genre | null`:

```
const useGames = (selectedGenre: Genre | null) => useData<Game>('/games');
```

- then we pass it on our `useData` hook by change from taking only the `endpoint` data to `AxiosRequestConfig` object.
- We can give this hook a second parameter call `requestConfig` of type `AxiosRequestConfig` and make it optional so we don't always have to pass it:

```
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig)
```

- Now to filter game by genre, we have to passed the genre as a query string parameter because in our rawg api documentation in the games endpoint at the list of games we have a parameter call genre:

![image](https://gist.github.com/user-attachments/assets/3fa6fbe3-c2eb-4265-a8f6-9228ccaf284d)

- Which include a bunch of value and separate by comma, we can pass genre id or genre slug. Back to the `useGames` hook we add an object, in this object we set `params` and we set `params` to an object and in that object we set `genres` to `selectedGenre.id`

```
const useGames = (selectedGenre: Genre | null) => useData<Game>('/games', { params: {genres: selectedGenre?.id}});
```

- After that we get back to our `useData` hooks and spread the `requestConfig` object to add any additional properties:

```
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig) => {
  // useState variable same as before

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchRespond<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {
        // same as before
      })
      .catch((err) => {
        // same as before
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};
```

- Because we're passing to our `useData` hook an empty array of dependencies we're only fetching the only once, the first time when a component is render, to solve this issue we need to pass an array of dependecies there, so when the `selectedGenre` is rendered we send another request to get the game that match the `selectedGenre`
- We will start with adding a third parameter as our dependencies:

```
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // useState variable same as before

  useEffect(() => {
    // same as before
  }, []);

  return { data, error, isLoading };
};
```

- Here we call this `deps` which is going to be an array of dependencies, at this point we don't know the type of those denpendencies so we have to use the `any[]` array, then we need to spread the dependencies array:

```
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // useState variable same as before

  useEffect(() => {
    // same as before
  }, [...deps]);

  return { data, error, isLoading };
};
```

- But this spread operator on the dependencies have an error:
  ![image](https://gist.github.com/user-attachments/assets/353871dc-4a22-4d20-ae02-f0249eede6cd)
- Basically what it's trying to say is that because we declare the `deps` as optional it could be undefined and we cannot spread an undefined object, so here we need to say if `deps` is truthy we going to spread it `[...deps]` otherwise we're going to pass an empty array `[]`:

```
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // useState variable same as before

  useEffect(() => {
    // same as before
  }, deps ? [...deps] : []);

  return { data, error, isLoading };
};
```

- Now that our `useData` hooks receive an dependencies we should specify them when call an `useData` hook, so after we pass the `requestConfig` we add another argument as our array of dependencies and in this case we want to be dependent on `selectedGenre?.id`:

```
const useGames = (selectedGenre: Genre | null) => useData<Game>('/games', { params: {genres: selectedGenre?.id}}, [selectedGenre?.id]);
```

- Finally, we go back to our `App` component and pass the `selectedGenre` to our `GameGrid` :

```
<GridItem area="main">
  <GameGrid selectedGenre={selectedGenre} />
</GridItem>
```

- Indie game result:

![image](https://gist.github.com/user-attachments/assets/5c84ff15-5b09-40b2-9387-989dcefaf93d)

- action game result:

![image](https://gist.github.com/user-attachments/assets/a41aa42b-52f0-4f1e-9520-c11ba9b8d20b)

- Racing game result:

![image](https://gist.github.com/user-attachments/assets/dcc3b21c-b8bb-4db5-b3f7-d0325bd2b960)

### Highlighting the Selected Genre:

- To improved the user experienced we're going to highlight the selected genre.
- We should have the `App` component pass the `selectedGenre` to our `GenreList` and in the `GenreList` components when we render the button we'll set the font-weight dynamically. If we rendering the selected genre we make the font bold otherwise we rendered it as normal.
- So in our `GenreList` we need to add a new properties call `selectedGenre` of type `Genre` or `null`:

```
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageURL(genre.image_background)}
            />
            <Button
              fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
              onClick={() => onSelectGenre(genre)}
              fontSize="lg"
              variant="link"
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
```

- Next we pass the `selectedGenre` to the `GenreList` in our `App` components:

```
<Show above="lg">
  <GridItem area="aside" paddingX="10px">
    <GenreList
      selectedGenre={selectedGenre}
      onSelectGenre={(genre) => setSelectedGenre(genre)}
    />
  </GridItem>
</Show>
```

- Action game result:

![image](https://gist.github.com/user-attachments/assets/1829e97b-2261-42e3-9298-c7c749fd0ba8)

- Indie game result:

![image](https://gist.github.com/user-attachments/assets/1e51795f-470c-401d-bd1d-391231b9a98f)

### Building a Platform Selector:

- Now we going to add a dropdown list for selecting the platform of the games.
- First, let's go ahead and add a new component and name it `PlatformSelector.tsx`. In this component we going to return a `Menu` define in chakra, it's use to render a beautiful dropdown list.
- The `Menu` component is a composite component so it has different children. For starter we should add a `MenuButton` and we want to render it as a regular button then we give it a label like `Platforms`:

```
import { Button, Menu, MenuButton } from "@chakra-ui/react";

const PlatformSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button}>Platforms</MenuButton>
    </Menu>
  );
};

export default PlatformSelector;
```

- When the user click on this button the menu gonna be open then we'll see the item. We can also improve this by adding an icon using bootsrap:

```
<Menu>
  <MenuButton as={Button} rightIcon={<BsChevronDown />}></MenuButton>
</Menu>
```

- Right after we would wanted to add a `MenuList` and inside the `MenuList` we add one or more `MenuItem`:

```
const PlatformSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}></MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
};
```

- Now let's test our application by adding the component to our `App` component and add our `PlatformSelector` above our `GameGrid`:

```
function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" " main"`,
        lg: `"nav nav" "aside main"`
      }}
      templateColumns={{}}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        // same as before
      </Show>
      <GridItem area="main">
        <PlatformSelector />
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}
```

![image](https://gist.github.com/user-attachments/assets/ae1dcf7e-00d6-4a02-8690-21a8355b8445)

- Now we should render these `MenuItem` dynamically and to do that we going to use a different endpoint in our rawg api documentation. Here in the documentation we have an platforms endpoint and we have two options it's to render either the list video game platforms or the list of parent platforms.
  ![image](https://gist.github.com/user-attachments/assets/76db95b0-a955-437f-9b24-2b4a125063d4)

- In the `Menu` situation we want to render the list of parent platforms which is shorter and easier to use. Now we're going to create a hook to fetch data from the platforms endpoint:
  ![image](https://gist.github.com/user-attachments/assets/735145eb-ea76-4fb7-89f9-d2b7fa047dc2)

- In the `usePlatforms` hook first we need to define an interface call `Platfrom` and our `Platform` object have 3 properties namely id, name, slug:

```
interface Platform {
  id: number;
  name: string;
  slug: string;
}
```

- Then we define a custom hook `usePlatforms` to call the `useData` hook as the endpoint we pass `'/platforms/lists/parents'`, and we should also add our interface to it:

```
import useData from "./useData";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => useData<Platform>('/platforms/lists/parents')

export default usePlatforms;
```

- Now we go back to our `PlatformSelector` and use our newly created hook then get the `data`. Finally use it to render the `MenuItem`

```
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";

const PlatformSelector = () => {
  const { data } = usePlatforms();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Platforms
      </MenuButton>
      <MenuList>
        {data.map((platform) => (
          <MenuItem key={platform.id}>{platform.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
```

![image](https://gist.github.com/user-attachments/assets/cdbeff04-ab14-4e94-b182-55f47b19a1cf)

- Error handling by simply grab the `error` from our hook and render it same as the `Genre`:

```
const { data, error } = usePlatforms();

if (error) return null;
```

- Testing it out by messing up the endpoint to see if it's gone or not on the wrong endpoint:

```
import useData from "./useData";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => useData<Platform>('/xplatforms/lists/parents')

export default usePlatforms;
```

![image](https://gist.github.com/user-attachments/assets/d11ad219-3f88-4048-b680-3f7ee477090c)

### Filtering the Games by Platform:

- Implementing filtering by platform using the same approach as before.
- In our `App` component we will declare a new `useState` variable for keeping track of the `selectedPlatform`, when the platform changes we pass the `selectedPlatform` to the `GameGrid` for filtering:

  - Declaring a new `useState` variable:

  ```
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  ```

  - Now we go to our `PlatformSelector` and notify our `App` component when the user select a platform. First let's create a props:

  ```
  interface Props {
    onSelectPlatform: (platform: Platform) => void;
  }

  const PlatformSelector = ({ onSelectPlatform }: Props) => {
    const { data, error } = usePlatforms();

    if (error) return null;
    return (
      <Menu>
        // same as before
      </Menu>
    );
  };
  ```

  - For handling selection: On the part where we handle `MenuItem`, we handle an `onClick` event and set it to a function then call the `onSelectPlatform` finally we pass the current platform that we are rendering:

  ```
  interface Props {
    onSelectPlatform: (platform: Platform) => void;
  }

  const PlatformSelector = ({ onSelectPlatform }: Props) => {
    const { data, error } = usePlatforms();

    if (error) return null;
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          Platforms
        </MenuButton>
        <MenuList>
          {data.map((platform) => (
            <MenuItem onClick={() => onSelectPlatform(platform)} key={platform.id}>
              {platform.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };
  ```

  - Now we can go back to our `App` component and set the `onSelectPlatform`:

  ```
  <GridItem area="main">
    <PlatformSelector onSelectPlatform={(platform) => setSelectedPlatform(platform)} />
    <GameGrid selectedGenre={selectedGenre} />
  </GridItem>
  ```

  ![image](https://gist.github.com/user-attachments/assets/0cc8e91f-9563-4e83-a1df-5a33d9f65526)
  -> The implementation is working perfectly that's why our `App` component show the 2nd `useState` hook and declare what was selected

- Because the implementation is working we can now pass it on our `GameGrid`:

  - `App` components:

  ```
  <GameGrid
    selectedPlatform={selectedPlatform}
    selectedGenre={selectedGenre}
  />
  ```

  - Adding a new properties to the `GameGrid` interface, then we pass it onto our `useGames` hook:

  ```
  interface Props {
    selectedGenre: Genre | null;
    selectedPlatform: Platform | null;
  }

  const GameGrid = ({ selectedGenre, selectedPlatform }: Props) => {
    const { data, error, isLoading } = useGames(selectedGenre, selectedPlatform);
    const skeletons = [1, 2, 3, 4, 5, 6];

    return (
      <>
        // Same as before
      </>
    );
  };

  export default GameGrid;
  ```

  - Now we had to pass the `selectedPlatform` as a parameter in our `useGames` hook, and then we pass it to the api to the `params` object. Finally, we also need to add it as an dependencies so later on when it changes our `useEffect` re-fetch the data:

  ```
  const useGames = (
    selectedGenre: Genre | null,
    selectedPlatform: Platform | null
  ) =>
    useData<Game>(
      "/games",
      {
        params: {
          genres: selectedGenre?.id,
          platforms: selectedPlatform?.id
        }
      },
      [selectedGenre?.id, selectedPlatform?.id]
    );
  ```

- Final step is to test out our components:

  - Trying out Xbox platforms:
    ![image](https://gist.github.com/user-attachments/assets/1b6c508c-7511-4a66-be5f-4937be257bbf)

  * It's working good, but it's not clear what platforms is selected because our platform label are yet to be rendered dynamically, so the final improvement we need to make is to render the platfrom label dynamically.
  * Back to our `App` component we should add the `selectedPlatform` to the `PlatformSelector` component:

  ```
  <PlatformSelector
    selectedPlatform={selectedPlatform}
    onSelectPlatform={(platform) => setSelectedPlatform(platform)}
  />
  ```

  - We also need to add the props, and then instead of rendering plain text `platform` in our `MenuButton`, we're going to render an expression like `selectedPlatform?.name || 'Platforms'`:

  ```
  <Menu>
    <MenuButton as={Button} rightIcon={<BsChevronDown />}>
      {selectedPlatform?.name || "Platforms"}
    </MenuButton>
    <MenuList>
      {data.map((platform) => (
        <MenuItem
          onClick={() => onSelectPlatform(platform)}
          key={platform.id}
        >
          {platform.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  ```

  - Filtering `selectedPlatform`:

  ![image](https://gist.github.com/user-attachments/assets/061afb04-e791-4456-ae1d-b24d030b779b)

  - Non platform select render `'Platform'`:

  ![image](https://gist.github.com/user-attachments/assets/25f65811-4a2b-48ad-9e6e-c16dce3c34d1)

### Refactoring: Extracting a Query Object:

- Currently our `App` component only have 2 state variable but as our App grow and have more featured we'll need even more variable for tracking thing like sort order and search, etc. Adding a bunch of variable in our `App` component and passing them around is just ugly and hard to maintain, it caused clogging in our code and make it stink.
- A way to solve this problem is that we should pack relate variable inside an object.
- By using a `Query Object Pattern` to solve this problem, so we'll create a query object that contain all the information we need to query the game, with this our code will be cleaner and easier to understand.
- First we're going to define an interface name `GameQuery` in our `App` component:

```
interface GameQuery {

}
```

- In this interface we'll add 2 properties, an `genre` which can be a `Genre` object or `null` as well as `platform` having the same implement:

```
interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
}
```

- Now we going to replace the two old `useState` variable with a `useState` variable of type `GameQuery`, and we should initialize it with an empty object not `null` because we will always have a query object, but the properties of the imply object maybe null:

```
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
```

- Next step is to refactor each item step by step:

  - On our `GenreList` we should pass it the `gameQuery.genre` referencing the genre of it instead of using `selectedGenre`:

  ```
  <GridItem area="aside" paddingX="10px">
    <GenreList
      selectedGenre={gameQuery.genre}
      onSelectGenre={(genre) => setSelectedGenre(genre)}
    />
  </GridItem>
  ```

  - Same goes for the `setGameQuery` function but we should pass a new object for it. First we should spread the `gameQuery` object then we add the new genre:

  ```
  <GridItem area="aside" paddingX="10px">
    <GenreList
      selectedGenre={gameQuery.genre}
      onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
    />
  </GridItem>
  ```

  - Similarly on the main code we should implement the same thing:

  ```
  <GridItem area="main">
    <PlatformSelector
      selectedPlatform={gameQuery.platform}
      onSelectPlatform={(platform) => setGameQuery({...gameQuery, platform})}
    />
    <GameGrid
      selectedPlatform={gameQuery.platform}
      selectedGenre={gameQuery.genre}
    />
  </GridItem>
  ```

- Now we need to use the same technique in our `GameGrid`. Instead of passing a bunch of variable here, we should pass an object. First off before we implement anything we should export our `GameQuery` interface in the `App` component.
- Next thing is we have to change the props in our `GameGrid` to `gameQuery` of type `gameQuery`:

```
// Same import as before
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      // Same logic as before
    </>
  );
};

export default GameGrid;
```

- Now we have to modify our `useGames` hook:

```
const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id
      }
    },
    [gameQuery]
  );
```

- But with this implementation we have a tiny issue with our `App` component on the `GameGrid` part, because we have changed the props of `GameGrid` we no longer have any `selectedPlatform` or `selectedGenre` properties anymore, so in the `GameGrid` part we should set a new type to it:

```
<GridItem area="main">
  <PlatformSelector
    selectedPlatform={gameQuery.platform}
    onSelectPlatform={(platform) =>
      setGameQuery({ ...gameQuery, platform })
    }
  />
  <GameGrid gameQuery={gameQuery} />
</GridItem>
```

-> Testing it out on selecting genre and platform:
![image](https://gist.github.com/user-attachments/assets/a15cc5a3-b52e-4982-a5e4-6ef8be7733c5)

### Building Sort Selector:

- Adding a dropdown list for sorting our game.
- Creating a new component call `SortSelector` then we simply copy the return statement from our `PlatformSelector` since they are identical component, and we want to render them statically:

```
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
      <MenuList>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Date added</MenuItem>
        <MenuItem>Name</MenuItem>
        <MenuItem>Release date</MenuItem>
        <MenuItem>Popularity</MenuItem>
        <MenuItem>Average rating</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
```

- Then we will test out the implementation on our `App` component:

```
<GridItem area="main">
  <PlatformSelector
    selectedPlatform={gameQuery.platform}
    onSelectPlatform={(platform) =>
      setGameQuery({ ...gameQuery, platform })
    }
  />
  <SortSelector />
  <GameGrid gameQuery={gameQuery} />
</GridItem>
```

![image](https://gist.github.com/user-attachments/assets/55362cac-d032-4ac4-9cc4-13120ad845ef)

- Warping both the selector in a horizontal stack `HStack` to implement spacing style:

```
<HStack spacing={5} paddingLeft={2} marginBottom={5}>
  <PlatformSelector
    selectedPlatform={gameQuery.platform}
    onSelectPlatform={(platform) =>
      setGameQuery({ ...gameQuery, platform })
    }
  />
  <SortSelector />
</HStack>
```

![image](https://gist.github.com/user-attachments/assets/68e85adb-0c34-48e9-b582-9eecd844274e)

### Sorting Games:

- Using the query parameter `ordering` in the rawg api to sorting data.
- Back to out `SortSelector` component, now we should store all the `sortOrder` item in an array then we map each item in the array to a `MenuItem`:

```
const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-release", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" }
  ];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem key={order.value} value={order.value}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
```

- And for each `MenuItem` we need to handle the click event, in the click event we should notify the `App` component and to do that we should create a props as `onSelectSortOrder`, this is a function that take `sortOrder: string` and return `void`. After we add the props to the parameter we should go ahead and pass a function to the `onClick` event then call `onSelectSortOrder` then pass the `order.value`:

```
interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
}

const SortSelector = ({ onSelectSortOrder }: Props) => {
  const sortOrders = [
    // Same as before
  ];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.value} value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
```

- Next we head back to our `App` component and add a new query to our `GameQuery` call `sortOrder` of type `string`:

```
export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}
```

- Then in our `SortSelector` part of the `App` component, we set the `onSelectSortOrder` to a function that take the new `sortOrder` then we call `setGameQuery` pass it a new object by spreading the `gameQuery` then we add the new `sortOrder` :

```
export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" " main"`,
        lg: `"nav nav" "aside main"`
      }}
      templateColumns={{}}
    >
      // Same implementation as before
      <GridItem area="main">
        <HStack spacing={5} paddingLeft={2} marginBottom={5}>
          // Same platform component
          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...gameQuery, sortOrder })
            }
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}
```

- After making sure the our `SortSelector` cause the `App` component to re-render, in the next render we going to pass the new `GameQuery` object to our `GameGrid` by altering our `useGames` hook:

```
const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder
      }
    },
    [gameQuery]
  );
```

- Now our application could sort the games by what the user choose, but our `App` broke because some of the game do not have any image:
  ![image](https://gist.github.com/user-attachments/assets/d6ebcde4-3ec1-4210-ad01-b2cca33f9bd3)

- Temporary fixation for it is we should handle the case with `null` URL in the function. To do that first we check if falsy or not if so then we going to return an empty `string`:

```
const getCroppedImageURL = (url: string) => {
  if (!url) return '';
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
};

export default getCroppedImageURL;
```

- Now we can sorting the games properly:

  - Sorting by Name:

  ![image](https://gist.github.com/user-attachments/assets/6b72d56e-e6e9-466b-8176-ac742a1ea290)

  - Sorting by Date added:

  ![image](https://gist.github.com/user-attachments/assets/60c4ea2f-2875-4977-a59f-6098b538daaf)

  - Sorting + filtering by platforms:

  ![image](https://gist.github.com/user-attachments/assets/4992488d-0c5e-4b29-8d08-ada2034503b5)

  ![image](https://gist.github.com/user-attachments/assets/3da4dc73-9b99-4c79-8912-664932d0b42c)

### Handling Games without an Image:

- To handle games without an image we'll use a default `no-image-placeholder.webp` image as a placeholder.
- Next up, we should go to the `image-url.ts` component and import the new image like a module on the top of the component:

```
import noImage from '../assets/no-image-placeholder.webp'

const getCroppedImageURL = (url: string) => {
  if (!url) return '';
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
};

export default getCroppedImageURL;
```

- Now instead of returning an empty string we can return the `noImage`:

```
const getCroppedImageURL = (url: string) => {
  if (!url) return noImage;
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
};
```

![image](https://gist.github.com/user-attachments/assets/d815951d-b5c1-470e-9138-7f16e618d19d)

### Building a Search Input:

- To add an input box to at the `navbar` to search for the game we create a new component and instead of returning a `div` we return an `Input`:

```
import { Input } from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <Input borderRadius={20} placeholder="Search games..." variant="filled" />
  );
};

export default SearchInput;
```

- Now we add it to our `NavBar`:

```
const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize={"60px"} />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
```

![image](https://gist.github.com/user-attachments/assets/8100d59e-ecaa-4035-a040-720e70498232)

- Our label beside the color switch is getting wrap up and we need to adjust it, and we simply set the `Text` component inside our `ColorModeSwitch` to `whiteSpace='nowrap'`:

```
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text whiteSpace="nowrap">Dark mode</Text>
    </HStack>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/f3f1995f-4808-481f-83ab-56fa858d0b95)

- Now we should add an icon to our search input:

```
const SearchInput = () => {
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input borderRadius={20} placeholder="Search games..." variant="filled" />
    </InputGroup>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/ee528fba-3f05-48b0-b4cf-5a174e1e3ee2)

- Next thing is to make sure this implementation look good on mobile devices:

  - Mobile:
    ![image](https://gist.github.com/user-attachments/assets/d81a5dd1-f883-4679-aa1d-96fd554ee955)

  - Tablet:
    ![image](https://gist.github.com/user-attachments/assets/558ec868-078e-4ae8-bc7d-66e167dbe098)

### Searching Games:

- Using the same appoarch as before now we need to make it so when the user's input a value into our `SearchInput` then hit `Enter`, this component will notify the `App` component then the `App` component will take the search text and stored in our query object and then pass it down to the `GameGrid`.
- First we should warp everything in our `SearchInput` inside a `form` element:

```
const SearchInput = () => {
  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};
```

- As we wrap our `Input` in the new `form` it cause a little visual issue, because the search input is no longer taking up 100% width of the `Nav` component anymore
  ![image](https://gist.github.com/user-attachments/assets/eac2e578-0b6b-41a6-ace8-801d27ae9cf2)

- To solve this problem we can add a rule to our global style sheet, so let's go to `index.css` and give form a width of 100%:

```
form {
  width: 100%;
}
```

![image](https://gist.github.com/user-attachments/assets/5d8b52c7-b3d5-4b9f-b3aa-c6bf9f33ef9b)

- With everything back in order we can now go over to handle the `onSubmit` event. In the `onSubmit` we pass a function that take an `event` and in this function first we call `event.preventDefault();` to prevent the `form` from being posted to the server:

```
const SearchInput = () => {
  return (
    <form onSubmit={(event) => {
        event.preventDefault();
    }}>
      // Same as before
    </form>
  );
};
```

- Next up, we need to get access to the value inside the `Input` field, here we can use the `useRef` hook or maintain the state by using the `useState` hook. Because we have a simple `form` with a single `Input` field it's easier to use the `useRef` hook.
- So let's implement the `useRef` hook and we going to reference the `HTMLInputElement` and then initialize it to `null` just liked always and then get a `ref` object:

```
  const ref = useRef<HTMLInputElement>(null);
```

- Now that we need to associate the `ref` object with our `Input` component and then when we submitting the `form` we check it out and print it on the console for now to test out the application:

```
const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (ref.current) console.log(ref.current.value);
    }}>
      <InputGroup>
        // ...
        <Input
          ref={ref}
          // Same as before
        />
      </InputGroup>
    </form>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/87b0d8b5-68ec-444c-91f3-60c5b67e784f)

- With our implementation working perfectly, we should go ahead and pass it to our `App` component:

  - Before adding it to our `App` component we need to add a new props to our `SearchInput` component. Add a props call `onSearch` which is going to be a function that take `searchText` as a `string` and return `void`, next we add it to our parameter and finally instead of logging the `ref.current.value` on the console we pass it to `onSearch`:

  ```
  interface Props {
    onSearch: (searchText: string) => void;
  }

  const SearchInput = ({ onSearch }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <InputGroup>
          // Same as before
        </InputGroup>
      </form>
    );
  };
  ```

  - Now we should go to our `App` component and implement it. First, we should add our `searchText` to our `GameQuery`. Since the `SearchInput` is not a direct child of our `App` component, but the `NavBar` itself, so we should went over to our `NavBar` component and add the same props to it then we simply set the `onSearch` to our `SearchInput`:

  ```
  interface Props {
    onSearch: (searchText: string) => void;
  }

  const NavBar = ({ onSearch }: Props) => {
    return (
      <HStack padding="10px">
        <Image src={logo} boxSize={"60px"} />
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
    );
  };
  ```

  - After that we set the `onSearch` to our `NavBar` component on our `App` component. We set it to a function that take `searchText` then we call `setGameQuery` to a new object by spreading the `gameQuery` and take the `searchText`:

  ```
  <GridItem area="nav">
    <NavBar onSearch={(searchText) => setGameQuery({...gameQuery, searchText})}/>
  </GridItem>
  ```

- To confirm that our implementation of the hook works, we open up dev tools and inspect our `App` component:
  ![image](https://gist.github.com/user-attachments/assets/fa6e3c85-b5ae-4d44-a0d7-ad85f0c632c5)

- Final step is to pass it to our Backend. Now go to our `useGames` hook and simply add a new parameter call `search` and set it to `gameQuery.searchText`:

```
const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        // Same as before
        search: gameQuery.searchText
      }
    },
    [gameQuery]
  );
```

![image](https://gist.github.com/user-attachments/assets/db622d08-50d3-43ea-984d-5c2ea423ae65)
![image](https://gist.github.com/user-attachments/assets/36238bb5-47ee-4170-a2de-993386707a15)

### Adding a Dynamic Heading:

- Adding a Dynamic Heading that changes base on the current filter (e.g: user select adventure it show adventure, same with action, so on and so forth, also works with filtering the platform as well).
- First let's create a new component call `GameHeading` and return `Heading` component from chakra and have it render as an `h1` element:

```
import { Heading } from "@chakra-ui/react";

const GameHeading = () => {
  return <Heading as="h1"></Heading>;
};

export default GameHeading;
```

- To render the heading dynamically, we should receive the `GameQuery` as a props in this component:

```
interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  // Same as before
};
```

- Initially, we want to render the label as `Games`. If the user select genre like `Action` we render `Action Game, if the use select a platform like `Xbox`we should render`Xbox Games`, finally if the user select both genre and platform we render both of them starting with the platform then genre and then the `Games`like this`XBox Action Games`.
- To implement this first we should declare a variable or a constaint call `heading` and set it to a `Template Literals`. Here we can add a placeholder `${}` one for the platform and one for the genre:

```
  const heading = `${gameQuery.platform?.name} ${gameQuery.genre?.name} Games`;
```

- After that we simply render the `heading`:

```
const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.name} ${gameQuery.genre?.name} Games`;

  return <Heading as="h1">{heading}</Heading>;
};
```

- Now, let's go to our `App` component and add our `GameHeading` just before our `HStack` that wrap both the platform filtering and the sorting box then we should pass our `gameQuery`:

```
<GridItem area="main">
  <GameHeading gameQuery={gameQuery} />
  <HStack spacing={5} paddingLeft={2} marginBottom={5}>
    // Same as before
  </HStack>
  <GameGrid gameQuery={gameQuery} />
</GridItem>
```

![image](https://gist.github.com/user-attachments/assets/427f491a-05e2-415e-9725-b95445ef1dc4)

- Initially we got `undefined` but this is very easy to fix, so back to our `GameHeading` and put up a condition that if we had a platform(or genre) we should render it if not we shall render an empty string `""`:

```
  const heading = `${gameQuery.platform?.name || ""} ${gameQuery.genre?.name || ""} Games`;
```

![image](https://gist.github.com/user-attachments/assets/3d551913-131d-4e9a-816b-453fcd6b2a9f)

- Testing it out:

  - Genre:
    ![image](https://gist.github.com/user-attachments/assets/f04d76c7-84e2-40b1-8baa-6ca38b88c7a2)
    ![image](https://gist.github.com/user-attachments/assets/427117f6-fc7a-47c4-b020-aa58afc40497)

  - Platform:
    ![image](https://gist.github.com/user-attachments/assets/3fd6fadd-8c8c-41dc-886d-c4a705b9d930)
    ![image](https://gist.github.com/user-attachments/assets/0ee8207a-612d-47d9-b352-faf37e40925f)

  - Both:
    ![image](https://gist.github.com/user-attachments/assets/aa2fb7c4-a318-4cfb-a52b-1549754c7664)
    ![image](https://gist.github.com/user-attachments/assets/a0d0febc-f379-469c-ab55-cce843b734fb)

- Improved the UX by adding some spacing and altering the font to the heading:

```
  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
```

![image](https://gist.github.com/user-attachments/assets/de4efd44-2238-40fb-9879-d4990820d0d2)

### Cleaning up the Game Cards:

- First things first, let's move the icon and badge above the game name. We simply head over to our `GameCard` and move the `Heading` to after the `HStack` that contain the icon and score badge, and then add some spacing to our `HStack` and `Heading`:

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <Image src={getCroppedImageURL(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/771e5b9a-d9ef-4d79-a7b2-b2a223d17cc8)

- The next thing we can improve is the spacing between the cards, currently they are too close to each other so let's increase the space to open up the page. For that we'd had to go to our `GameGrid` component and simply increase its spacing:

```
const GameGrid = ({ gameQuery }: Props) => {
  // Same `useState` hook

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
        padding="10px"
        spacing={6}
      >
        // Same content as before
      </SimpleGrid>
    </>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/8bebaa18-e25e-484d-b383-ed7749f61189)

### Adding Emojis:

- Adding some emoji for our `GameCard`. First, we go to our `Game` interface locate in our `useGames` hook and add a new properties call `rating_top` of type `number`:

```
export interface Game {
  // Same as before
  rating_top: number;
}
```

-> in the rawg documentation api we also had this properties call `rating` and also is a `number` type but the different between the `rating_top` and `rating` this that `rating` is a float number, but `rating_top` is a whole number (it's can only be 1, 2, 3, 4, 5).

- Now we going to render different emoji base on the `rating_top`. Before that we should add 3 new image for the emoji:

  - With the rating of 3 we should render a meh emoji:
    ![meh](https://gist.github.com/user-attachments/assets/fc060b95-90d6-4f3b-b09f-059c27eae057)
  - With the rating of 4 we should render a thumbs up emoji:
    ![thumbs-up](https://gist.github.com/user-attachments/assets/8252b97a-521d-4d0b-bc92-9606bb932a54)
  - With the rating of 5 we should render a bulls eye emoji:
    ![bulls-eye](https://gist.github.com/user-attachments/assets/f60f71df-e19d-4457-9019-981d55a54e9f)

- Next we going to add a new component call `Emoji.tsx`, then we should receive the `rating` of the game as a props:

```
interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  return <div>Emoji</div>;
};

export default Emoji;
```

- Now we should implement the different emoji for different rating by using a map object, but before we do that we should import all of our image on the top of the component:

```
import bullsEye from "../assets/bulls-eye.webp";
import thumbsUp from "../assets/thumbs-up.webp";
import meh from "../assets/meh.webp";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  return <div>Emoji</div>;
};

export default Emoji;
```

- After that we should create a map object name `emojiMap`, in this object our key are number that represent the rating of a game:

```
  const emojiMap = {
    3: { src: meh, alt: "meh" },
    4: { src: thumbsUp, alt: "recommended" },
    5: { src: bullsEye, alt: "exceptional" }
  };
```

- Now instead of returning a `div` we should return an `Image` component, here we can set individual properties like `src` or `alt` but we can also render the value associated with the given key. We should add a braces then we spread the `emojiMap` of `rating, but before that we have to annotate the `emojiMap`itself by assignning a index signature to it to make it so that the`emojiMap`is notify to the React compiler that it can have any number of keys and the key are numbers, then we should map each key to an`ImageProps` object define in chakra:

```
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh" },
    4: { src: thumbsUp, alt: "recommended" },
    5: { src: bullsEye, alt: "exceptional" }
  };

  return <Image {...emojiMap[rating]} boxSize="25px" />;
};
```

- Now let's add it to our `GameCard`:

```
const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <Image src={getCroppedImageURL(game.background_image)} />
      <CardBody>
        // Same as before
        <Heading fontSize="2xl">
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};
```

![image](https://gist.github.com/user-attachments/assets/e8420145-20c2-4fa6-91fc-41c652c3e1fa)
![image](https://gist.github.com/user-attachments/assets/56cc21c6-1fb5-4ade-8e60-2191f99d0749)

- Our component is working great, but currently the size of our thumbs up emoji is a little bit bigger than the bulls eye emoji. To prevent that we should render the emoji dynamically:

```
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "recommended", boxSize: "25px" },
    5: { src: bullsEye, alt: "exceptional", boxSize: "35px" }
  };

  return <Image {...emojiMap[rating]} marginTop={1} />;
};
```

![image](https://gist.github.com/user-attachments/assets/4ab188e9-8bdc-45ab-9311-ef09fe92c10f)

### Shipping Static Data:

- In our current implementation we show a spinner while we fetch in spinner and skeleton while we fetch the game basically speaking we are dynamically loading 2 different part of the page and showing loading indicator. Now while this is not unnecessary a bad thing, over using this technique can negatively impact the UX it make the user's eyes dart around the page.
- There is a cool idea to improve the page, we can ship the list of genre with our application since the list of genre hardly ever changes we cna treat it as static data and include it with our app. That way we don't need to make an extra request to our backend and the data will be available right away, no need to wait nor show a spinner.
- First let's open up dev tool, on the Network tab we can copy the value of our genre results that we get from the server. Now back to our project and add a new folder inside our `src` folder name it `data`, then add a new file call `genre.ts`.
- Then in the `genre.ts` file we export default our copy value:

```
export default [
  {
    "id": 4,
    "name": "Action",
    "slug": "action",
    "games_count": 182685,
    "image_background": "https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 3,
    "name": "Adventure",
    "slug": "adventure",
    "games_count": 142410,
    "image_background": "https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 5,
    "name": "RPG",
    "slug": "role-playing-games-rpg",
    "games_count": 57389,
    "image_background": "https://media.rawg.io/media/games/530/5302dd22a190e664531236ca724e8726.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 10,
    "name": "Strategy",
    "slug": "strategy",
    "games_count": 57630,
    "image_background": "https://media.rawg.io/media/games/c22/c22d804ac753c72f2617b3708a625dec.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 2,
    "name": "Shooter",
    "slug": "shooter",
    "games_count": 59520,
    "image_background": "https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 40,
    "name": "Casual",
    "slug": "casual",
    "games_count": 56540,
    "image_background": "https://media.rawg.io/media/games/e31/e315213a5cb21645df8db3e5191e530c.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 14,
    "name": "Simulation",
    "slug": "simulation",
    "games_count": 71169,
    "image_background": "https://media.rawg.io/media/games/c22/c22d804ac753c72f2617b3708a625dec.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 7,
    "name": "Puzzle",
    "slug": "puzzle",
    "games_count": 97311,
    "image_background": "https://media.rawg.io/media/games/948/948fe7f00b6cba8472f5ecd07a455077.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 11,
    "name": "Arcade",
    "slug": "arcade",
    "games_count": 22659,
    "image_background": "https://media.rawg.io/media/games/370/3703c683968a54f09630dcf03366ea35.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 83,
    "name": "Platformer",
    "slug": "platformer",
    "games_count": 100810,
    "image_background": "https://media.rawg.io/media/games/9cc/9cc11e2e81403186c7fa9c00c143d6e4.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 1,
    "name": "Racing",
    "slug": "racing",
    "games_count": 24991,
    "image_background": "https://media.rawg.io/media/games/82e/82eeea65ebb047cc7f366faf2fb062b6.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 59,
    "name": "Massively Multiplayer",
    "slug": "massively-multiplayer",
    "games_count": 3792,
    "image_background": "https://media.rawg.io/media/games/d07/d0790809a13027251b6d0f4dc7538c58.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 15,
    "name": "Sports",
    "slug": "sports",
    "games_count": 21755,
    "image_background": "https://media.rawg.io/media/games/b59/b59560a7277b16b53e4786b4abe45baa.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 6,
    "name": "Fighting",
    "slug": "fighting",
    "games_count": 11757,
    "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 19,
    "name": "Family",
    "slug": "family",
    "games_count": 5404,
    "image_background": "https://media.rawg.io/media/games/3c1/3c139f67a73f0bf5ce0d8f2abf83c0d0.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 28,
    "name": "Board Games",
    "slug": "board-games",
    "games_count": 8382,
    "image_background": "https://media.rawg.io/media/screenshots/ce7/ce7d6b1018d907d7a1e2addd87079c95.jpeg",
    "games": [
      // ...
    ]
  },
  {
    "id": 34,
    "name": "Educational",
    "slug": "educational",
    "games_count": 15684,
    "image_background": "https://media.rawg.io/media/screenshots/f24/f24122a8e3d30ec3e99472e3e826d0cb.jpg",
    "games": [
      // ...
    ]
  },
  {
    "id": 17,
    "name": "Card",
    "slug": "card",
    "games_count": 4533,
    "image_background": "https://media.rawg.io/media/screenshots/ccf/ccf34a116ebff82c41cbe60aaf24a5df.jpeg",
    "games": [
      // ...
    ]
  }
]
```

- Now we head over to our `useGenres` hooks and instead of using the `useData` hooks to fetch data from the server we should return an object with 3 properties (`data: null, isLoading: false, error: null`):

```
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => ({ data: null, isLoading: false, error: null});

export default useGenres;
```

-> The reason we should return an object with these properties is to minimize the impact of these change on the consumer of this hook.

- E.g: The `GenreList` component is a consumer of the `useGenres` hook, it's expect to get an object with 3 properties:![image](https://gist.github.com/user-attachments/assets/843b2d55-8bc2-48d5-8ddc-acde834c9160)
- We don't want the changes we apply in the `useGenres` hook to impact this component and other component that use the `useGenres` hook, that's why we are returning an object with 3 properties.

* Next up we should set the `data` properties to the genre we have store in the genre module:

```
import genres from "../data/genres";

export interface Genre {
  // Same as before
}

const useGenres = () => ({ data: genres, isLoading: false, error: null});

export default useGenres;
```

- Also we can implement this on our platform and so on.
