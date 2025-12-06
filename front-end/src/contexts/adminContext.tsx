import { createContext, useContext, useEffect, useState } from "react"
import { IAdminContext, IModal, IProduct } from "./types"
import { useDisclosure } from "@chakra-ui/react"
import { IProductForm } from "../validations/types"
import { toast } from "react-hot-toast"
import api from "../utils/axios"

const AdminContext = createContext({} as IAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onClose: closeModal, onOpen } = useDisclosure()

  const [adminProducts, setAdminProducts] = useState<IProduct[]>([])
  const [currentProduct, setCurrentProduct] = useState<IProduct>()
  const [modal, setModal] = useState<IModal>("addProduct")

  const onClose = () => {
    setCurrentProduct(undefined)
    closeModal()
  }

  const openModalAddProduct = () => {
    setModal("addProduct")
    onOpen()
  }
  const openModalEditProduct = () => {
    setModal("editProduct")
    onOpen()
  }
  const openModalDeleteProduct = () => {
    setModal("deleteProduct")
    onOpen()
  }

  useEffect(() => {
    getAdminProducts()
  }, [])

  const getAdminProducts = async () => {
    try {
      const token = localStorage.getItem("@BESTSHOP:TOKEN")

      const { data } = await api.get("/products/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setAdminProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const createProduct = async (productData: IProductForm) => {
    try {
      const token = localStorage.getItem("@BESTSHOP:TOKEN")

      const { data } = await api.post("/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setAdminProducts((state) => [...state, data])
      toast.success("Produto adicionado")
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const updateProduct = async (productData: IProductForm) => {
    try {
      const token = localStorage.getItem("@BESTSHOP:TOKEN")

      const { data } = await api.patch(
        `/products/${currentProduct?.id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const updateAdminProducts = adminProducts.map((product) => {
        if (product.id === currentProduct?.id) {
          return { ...currentProduct, ...data }
        }
        return product
      })

      setAdminProducts(updateAdminProducts)

      toast.success("Produto atualizado")
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("@BESTSHOP:TOKEN")

      await api.delete(`/products/${currentProduct?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const updateAdminProducts = adminProducts.filter(
        (product) => product.id !== currentProduct?.id
      )

      setAdminProducts(updateAdminProducts)

      toast.success("Produto deletado")
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        isOpen,
        modal,
        currentProduct,
        adminProducts,
        onClose,
        openModalAddProduct,
        openModalEditProduct,
        openModalDeleteProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        setCurrentProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminContext = (): IAdminContext => useContext(AdminContext)
