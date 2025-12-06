import { Heading, Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Image, Text } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { Header } from "../../components/Header"
import { Container } from "../../components/Container"
import { ModalAddProduct } from "../../components/Modal/ModalAddProduct"
import { DashboardOptions } from "../../components/DashboardOptions"
import { ModalEditProduct } from "../../components/Modal/ModalEditProduct"
import { useAdminContext } from "../../contexts/adminContext"
import { ModalDeleteProduct } from "../../components/Modal/ModalDeleteProduct"
import noImg from "../../assets/noImg.jpg"

export const Dashboard = () => {
  const { modal, adminProducts, setCurrentProduct, openModalEditProduct, openModalDeleteProduct } = useAdminContext()

  const modals: {
    [key: string]: JSX.Element
  } = {
    addProduct: <ModalAddProduct />,
    editProduct: <ModalEditProduct />,
    deleteProduct: <ModalDeleteProduct />,
  }

  const handleEdit = (product: any) => {
    setCurrentProduct(product)
    openModalEditProduct()
  }

  const handleDelete = (product: any) => {
    setCurrentProduct(product)
    openModalDeleteProduct()
  }

  return (
    <>
      <Header />
      <Container>
        <Heading py="32px">Controle</Heading>
        <DashboardOptions />

        <Box mt="40px" mb="40px">
          <Heading size="md" mb="20px">Produtos</Heading>
          <Box overflowX="auto" border="1px" borderColor="gray.200" borderRadius="md">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th isNumeric>Preço</Th>
                  <Th isNumeric>Estoque</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {adminProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Image src={product.imgUrl || noImg} alt={product.name} boxSize="50px" objectFit="cover" borderRadius="md" />
                    </Td>
                    <Td>{product.name}</Td>
                    <Td maxW="300px">
                      <Text noOfLines={2}>{product.description}</Text>
                    </Td>
                    <Td isNumeric>R$ {product.price.toFixed(2)}</Td>
                    <Td isNumeric>{product.inventory}</Td>
                    <Td>
                      <IconButton
                        aria-label="Editar produto"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        mr="2"
                        onClick={() => handleEdit(product)}
                      />
                      <IconButton
                        aria-label="Deletar produto"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(product)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Container>

      {modals[modal]}
    </>
  )
}
