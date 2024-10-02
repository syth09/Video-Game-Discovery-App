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
