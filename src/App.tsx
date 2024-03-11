import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import HookForm from "./components/HookForm"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" p="4">
      <HookForm/>
    </Box>
  </ChakraProvider>
)
