import AppDataSource from "../../data-source"
import { Cart } from "../../entities/cart.entity"
import { User } from "../../entities/user.entity"
import { getTemplateMail, sendMail } from "../../utils/nodemailer"

const cartCheckoutService = async (userId: string): Promise<Cart> => {
  const cartRepo = AppDataSource.getRepository(Cart)
  const userRepo = AppDataSource.getRepository(User)

  const user = await userRepo.findOneBy({ id: userId })

  const cart = await cartRepo.findOne({
    where: {
      status: "PENDING",
      user: {
        id: userId,
      },
    },
    relations: {
      productCart: {
        product: true,
      },
    },
  })

  const completedCart = await cartRepo.save({ ...cart, status: "FINISHED" })

  const emailTemplate = getTemplateMail(user?.email!, completedCart.productCart)

  // await sendMail(emailTemplate)

  return completedCart
}

export default cartCheckoutService
