import { useEffect } from "react";
import {ListGroupItem, Button} from "react-bootstrap";
import {BsFillTrashFill} from "react-icons/bs"

const Product = ({product, removeProduct}) => {
	useEffect(() => {
		console.log("Start")

		return () => {
			console.log("Finish")
		}
	}, [])

	return (
		<ListGroupItem variant="secondary" className="text-start d-flex justify-content-between" style={{fontSize: '1rem'}} key={product.id}>
			<div className="my-auto">{product.name}</div>
			<Button variant="outline-danger" className="p-1 px-2" style={{fontSize: '1rem'}} onClick={() => removeProduct(product.id)}><BsFillTrashFill size={15} /></Button>
		</ListGroupItem>
	)
}

export default Product
