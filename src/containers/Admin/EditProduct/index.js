import React, { useEffect, useState } from 'react'
import { ButtonStyles, Container, Input, Label, LabelUpload, ContainerInput } from './styles'
import api from '../../../services/api'
import * as Yup from 'yup'
import ReactSelect from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '../../../components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import paths from '../../../constants/paths'



const EditProduct = () => {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const {
        push,
        location: {
            state: { product }
        }
    } = useHistory()

    console.log(product)


    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do produto'),
        price: Yup.number().required('Digite o preço do produto'),
        category: Yup.object().required('Selecione uma categoria'),
        offer: Yup.bool()

    })


    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async data => {
        const productDataFormData = new FormData()

        productDataFormData.append('name', data.name)
        productDataFormData.append('price', data.price)
        productDataFormData.append('category_id', data.category.id)
        productDataFormData.append('file', data.file[0])
        productDataFormData.append('offer', data.offer)

        await toast.promise(
            api.put(`products/${product.id}`, productDataFormData), {
            pending: 'Editando novo produto',
            success: 'Produto editado com sucesso',
            error: 'Falha ao editar o produto',
        })

        setTimeout(() => {
            push(paths.ProductsList)

        }, 2000);





    }



    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await api.get('categories')
            setCategories(data)

        }
        loadCategories()

    }, [])





    return (
        <Container>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input type='text' {...register('name')} defaultValue={product.name} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>
                <div>
                    <Label>Preço</Label>
                    <Input type='number' {...register('price')} defaultValue={product.price} />
                    <ErrorMessage>{errors.price?.message}</ErrorMessage>
                </div>

                <div>
                    <LabelUpload>
                        {fileName || (
                            <>
                                <CloudUploadIcon />
                                Carregue uma imagem
                            </>
                        )}
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            {...register('file')}
                            onChange={(value) => { setFileName(value.target.files[0]?.name) }}

                        />
                    </LabelUpload>
                    <ErrorMessage>{errors.file?.message}</ErrorMessage>
                </div>

                <div>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Selecione uma categoria"
                                    defaultValue={product.category}
                                />
                            )
                        }}
                    >

                    </Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ContainerInput>

                    <input type="checkbox"
                        {...register('offer')}
                        defaultChecked={product.offer}
                    />

                    <Label>Produto em oferta?</Label>
                </ContainerInput>
                <ButtonStyles type='submit'>Editar produto</ButtonStyles>

            </form>
        </Container >

    )
}

export default EditProduct

