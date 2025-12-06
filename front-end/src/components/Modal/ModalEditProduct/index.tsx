import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "../../../validations/product"
import { IProductForm } from "../../../validations/types"
import { ChangeEvent } from "react"

export const ModalEditProduct = () => {
  const {
    isOpen,
    onClose,
    adminProducts,
    updateProduct,
    setCurrentProduct,
    currentProduct,
  } = useAdminContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProductForm>({
    resolver: zodResolver(Product),
    defaultValues: currentProduct
      ? {
          name: currentProduct.name,
          description: currentProduct.description,
          imgUrl: currentProduct.imgUrl,
          inventory: currentProduct.inventory,
          price: currentProduct.price,
        }
      : undefined,
  })

  const changeProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value
    const product = adminProducts.find((product) => product.id === productId)
    setCurrentProduct(product)

    setValue("name", product!.name)
    setValue("description", product!.description)
    setValue("imgUrl", product!.imgUrl)
    setValue("inventory", product!.inventory)
    setValue("price", product!.price)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent mx={{ base: "16px", sm: "0" }}>
        <ModalHeader>
          Editar produto {currentProduct ? "- " + currentProduct?.name : ""}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(updateProduct)}>
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
            <FormControl isInvalid={Boolean(errors.name?.message)}>
              <FormLabel>Nome do produto</FormLabel>
              <Input
                type="text"
                placeholder="Digite o nome do produto"
                variant="filled"
                {...register("name")}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.description?.message)}>
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                placeholder="Digite uma descrição(opcional)"
                variant="filled"
                {...register("description")}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.imgUrl?.message)}>
              <FormLabel>Imagem</FormLabel>
              <Input
                type="text"
                placeholder="Url da imagem aqui(opcional)"
                variant="filled"
                {...register("imgUrl")}
              />
              <FormErrorMessage>{errors.imgUrl?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.inventory?.message)}>
              <FormLabel>Estoque</FormLabel>
              <Input
                type="number"
                placeholder="Digite a quantidade do produto"
                variant="filled"
                {...register("inventory")}
              />
              <FormErrorMessage>{errors.inventory?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.price?.message)}>
              <FormLabel>Preço</FormLabel>
              <Input
                type="number"
                placeholder="Digite o preço do produto"
                variant="filled"
                {...register("price")}
              />
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
            </FormControl>

            <Button w="100%" mt="16px" type="submit">
              Atualizar produto
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
