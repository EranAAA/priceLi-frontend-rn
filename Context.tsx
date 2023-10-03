import { createContext } from "react"

import { PriceService } from "./src/services/price.service"
import { PriceStore } from "./src/stores/price.store"

const priceService = new PriceService()
const priceStore = new PriceStore(priceService)

export const StoreContext = createContext<PriceStore>(priceStore)
