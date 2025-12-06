import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react"
import { useAdminContext } from "../../../contexts/adminContext"
import { ChangeEvent, FormEvent } from "react"

export const ModalDeleteProduct = () => {
  const {
    isOpen,
    onClose,
    adminProducts,
    deleteProduct,
    setCurrentProduct,
    currentProduct,
  } = useAdminContext()

  const changeProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value
    const product = adminProducts.find((product) => product.id === productId)
    setCurrentProduct(product)
  }

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    deleteProduct()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent mx={{ base: "16px", sm: "0" }}>
        <ModalHeader>
          Deletar produto {currentProduct ? "- " + currentProduct?.name : ""}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit}>
          <VStack>
            {!currentProduct && (
              <Select onChange={changeProduct}>
                <option>Selecione um produto</option>
                {adminProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            )}

            <ButtonGroup w="100%">
              <Button
                textTransform="uppercase"
                fontWeight="bold"
                mt="16px"
                variant="outline"
                onClick={onClose}
                w="50%"
              >
                Cancelar
              </Button>
              <Button w="50%" mt="16px" type="submit">
                Deletar
              </Button>
            </ButtonGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
