// import './ProductCreateContainer.css'

import { useModal } from "../hooks/useModal"



const ProductCreateContainer = ({}) => {

    const {handleInput, handleCreateWithFile} = useModal('', '/products/product/')

    return(
        <div className="container-product-create">
            <form onSubmit={handleCreateWithFile} id='form-submit' encType="multipart/form-data"> 
                <label>Codigo</label>
                <input type='text' name='code' onChange={handleInput} maxLength={'6'} className='input-name'></input>
                <label>Cantidad</label>
                <input type='text' name='quantity' onChange={handleInput} maxLength={'2'} className='input-name'></input>
                <label>Costo</label>
                <input type='text' name='cost' onChange={handleInput} maxLength={'5'} className='input-name'></input>
                <label>Precio</label>
                <input type='text' name='price' onChange={handleInput} maxLength={'5'} className='input-name'></input>
                <label>Descripcion</label>
                <input type='text' name='description' onChange={handleInput} maxLength={'50'} className='input-name'></input> 
                <label>Categoria</label>
                <input type='text' name='category_product' onChange={handleInput} maxLength={'1'} className='input-name'></input>
                <label>Proveedor</label>
                <input type='text' name='supplier' onChange={handleInput} maxLength={'1'} className='input-name'></input>
                <label>Imaageen</label>
                <input type='file' accept="image/*" name='image' onChange={handleInput} maxLength={'1'} className='input-name'></input>
                <button className=" btn-save save" type='submit' form='form-submit'>Guardar</button>
            </form>
        </div>
        )
}

export default ProductCreateContainer