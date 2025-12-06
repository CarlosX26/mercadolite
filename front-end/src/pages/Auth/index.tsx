import { Flex, Heading } from "@chakra-ui/react"
import { FormLogin } from "../../components/Forms/Login"
import { useState } from "react"
import { FormRegister } from "../../components/Forms/Register"
import { motion } from "framer-motion"

export type IForm = "Login" | "Register"

export const AuthPage = () => {
  const [form, setForm] = useState<IForm>("Login")

  const forms = {
    Login: <FormLogin setForm={setForm} />,
    Register: <FormRegister setForm={setForm} />,
  }

  return (
    <Flex minH="100vh" justifyContent="center">
      <Flex
        as={motion.div}
        w={{ base: "90%", md: "50%" }}
        px="1rem"
        justifyContent="center"
        alignItems="center"
        animate={{ opacity: [0, 1] }}
      >
        {forms[form]}
      </Flex>

      <Flex
        display={{ base: "none", md: "flex" }}
        w="50%"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        borderRadius="56px 0 0 56px"
        bgGradient="linear(to-r, teal.600, gray.700)"
      >
        <Heading color="white">MERCADO</Heading>
        <Heading color="white">LITE</Heading>
      </Flex>
    </Flex>
  )
}
