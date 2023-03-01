import { useEffect, useReducer, useState } from "react";
import {Form, Button, ListGroup} from "react-bootstrap";
import Product from "./Product";

const productReducer = (state, action) => {
	switch(action.type) {
		case 'POPULATE_PRODUCTS':
			return action.products
		case 'ADD_PRODUCT':
			return [
				...state,
				{id: action.id, name: action.name}
			]
		case 'REMOVE_PRODUCT':
			return state.filter((product) => product.id !== action.id)
		default:
			return state
	}
}

const ProductApp = () => {
	const [products, dispatch] = useReducer(productReducer, [])
	const [name, setName] = useState('')

	const addProduct = (e) => {
		e.preventDefault()
		const id = products.length > 0 ? products[products.length - 1].id + 1 : 0
		dispatch({
			type: 'ADD_PRODUCT',
			id,
			name
		})
		setName('')
	}

	const removeProduct = (id) => {
		dispatch({
			type: 'REMOVE_PRODUCT',
			id
		})
	}

	useEffect(() => {
		const productData = JSON.parse(localStorage.getItem('products'))
		if(productData) {
			console.dir(productData)
			dispatch({type: 'POPULATE_PRODUCTS', products: productData})
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products))	
	}, [products])

	return (
		<Form onSubmit={addProduct}>
			<div className="d-flex">
				<Form.Control 
				type="text" 
				className="pr-5" 
				style={{marginRight: '1rem'}} 
				name="productName" 
				placeholder="Product Name"
				onChange={(e) => setName(e.target.value)} 
				value={name} 
				/>
				
				<Button className="px-4" type="submit">Додати</Button>
			</div>

			<ListGroup className="mt-2 fs-1">
				{products.map((product) => (
					<Product key={product.id} product={product} removeProduct={removeProduct} />
				))}
			</ListGroup>
		</Form>
	)
}

export default ProductApp
