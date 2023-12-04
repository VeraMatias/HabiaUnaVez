import './ProductCreateContainer.css'

import { useEffect, useState } from 'react'
import Input from '../components/General/Input/Input'
import InputSelect from '../components/General/InputSelect/InputSelect'
import { useCategoryContainer } from '../hooks/useCategoryContainer'
import { useSupplierContainer } from '../hooks/useSupplierContainer'
import { useProductList } from '../hooks/useProductList'
import { useProductCreate } from '../hooks/useProductCreate'
import InputImage from '../components/General/InputImage/InputImage'

const ProductCreateContainer = () => {

    const {data, errorCode, handleInput, handleOnBlur, handleCreateWithFile} = useProductCreate('/products/product/')
    const { loadCategory, category } = useCategoryContainer()
    const { loadSupplier, supplier } = useSupplierContainer()
    const { loadProducts, products } = useProductList()

    const [imagePreview, setImagePreview] = useState()
    const [nextCode, setNextCode] = useState()

    useEffect(() =>{
        loadSupplier()
        loadCategory()
        loadProducts(setNextCode)
    },[])

    return(
        <div className="container-product-create">
            <div className="product-create-header">
                <h2 className='header-title'>CREAR PRODUCTO</h2>
            </div>
            <div className="product-create">
                <div className="product-create-new">
                    <form onSubmit={handleCreateWithFile} id='form-submit' encType="multipart/form-data"> 
                        <Input label={'Código'} type={'text'} name={'code'} handleOnBlur={() => handleOnBlur(nextCode)} maxLength={'6'} value={nextCode}/>
                        {errorCode? <p className='msg-error-code'>Este campo solo debe contener números de 6 cifras</p> : null}

                        <Input label={'Cantidad'} type={'number'} name={'quantity'} handleInput={handleInput} handleOnBlur={() => handleOnBlur(nextCode)}/>
                        <Input label={'Costo'} type={'number'} name={'cost'} handleInput={handleInput}/>
                        <Input label={'Precio'} type={'number'} name={'price'} handleInput={handleInput} value={data.price}/>
                        <Input label={'Descripción'} type={'text'} name={'description'} handleInput={handleInput}/>

                        <InputSelect label={'Categoría'} name={'category'} onChange={handleInput} data={category} />
                        <InputSelect label={'Proveedor'} name={'supplier'} onChange={handleInput} data={supplier} />

                        <InputImage label={'Imagen'} onChange={(e) => {handleInput(e); setImagePreview(URL.createObjectURL(e.target.files[0]))}}/>
                        <div className="container-button-create">
                            <button className=" btn-create" type='submit' form='form-submit'>Guardar</button>
                        </div>
                    </form>
                </div>
                <div className="last-products">
                    <table className="table-products">
                        <thead>
                            <tr className="table-products-head">
                                <th className="head-column1">Código</th>
                                <th className="head-column2">Cantidad</th>
                                <th className="head-column3">Costo</th>
                                <th className="head-column4">Precio</th>
                                <th className="head-column5">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            { products.slice(0,12).map((product, index) =>(
                                <tr key={product.code} className={index % 2 === 0 ? 'body-column': null}>
                                    <td>{product.code}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.cost}</td>
                                    <td>${product.price}</td>
                                    <td>{product.description === 'undefined' ? null : product.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="buttons-table">
                        <button className=" btn-save save" type='submit' form='form-submit'>Guardar</button>
                        <button className=" btn-save save" type='submit' form='form-submit'>Guardar</button>
                        <button className=" btn-save save" type='submit' form='form-submit'>Guardar</button>
                    </div>
                    {imagePreview? 
                    <>
                        <p>Previsualización</p>
                        <img className="image-preview" src={imagePreview} alt='previsualización de imagen'/>
                    </>
                    : null}
                </div>
            </div>
        </div>
        )
}

export default ProductCreateContainer