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
