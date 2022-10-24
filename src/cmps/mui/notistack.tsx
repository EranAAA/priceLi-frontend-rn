import React, { useContext } from "react"
import { StoreContext } from "../../App"
import { observer } from "mobx-react"

import { SnackbarProvider, VariantType, useSnackbar } from "notistack"
import { IItem } from "../../interfaces/interfaces"

const SnackBar = ({ importantPrice }: { importantPrice: IItem | undefined }) => {
	const { enqueueSnackbar } = useSnackbar()
	const variant: VariantType = "info"

	// importantPrice && enqueueSnackbar(`Price ${importantPrice.priceNumber} change her stats to malfunction`, { variant })

	return <React.Fragment></React.Fragment>
}

const IntegrationNotistack = () => {
	const priceStore = useContext(StoreContext)
	// const importantPrice = priceStore.getImportantPrice

	// if (!importantPrice) return <React.Fragment></React.Fragment>
	// console.log("Rendering SnackBar" + importantPrice?.priceNumber)

	return (
		<SnackbarProvider maxSnack={5}>
			{/* <SnackBar importantPrice={importantPrice} /> */}
		</SnackbarProvider>
	)
}

export default observer(IntegrationNotistack)
