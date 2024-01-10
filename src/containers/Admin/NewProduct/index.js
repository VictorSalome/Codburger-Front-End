import React, { useEffect, useState } from 'react'
import { ButtonStyles, Container, Input, Label, LabelUpload } from './styles'
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



const NewProduct = () => {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const { push } = useHistory()


    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do produto'),
        price: Yup.number().required('Digite o preço do produto'),
        category: Yup.object().required('Selecione uma categoria'),
        file: Yup.mixed()
            .test('required', 'Carregue um arquivo', value => {
                return value?.length > 0;
            }).test('fileSize', 'Arquivo muito grande, carregue até 5mb', value => {
                return value[0]?.size <= 5242880;
            }).test('type', 'Carregue apenas arquivos JPEG ou PNG', value => {
                return value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png';
            })
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

        await toast.promise(api.post('products', productDataFormData), {
            pending: 'Criando novo produto',
            success: 'Produto criado com sucesso',
            error: 'Falha ao criar o produto',
        })

        setTimeout(() => {
            push(paths.AdminProducts)

        }, 2000);


        console.log(productDataFormData)


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
                    <Input type='text' {...register('name')} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>
                <div>
                    <Label>Preço</Label>
                    <Input type='number' {...register('price')} />
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
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Selecione uma categoria"
                                />
                            )
                        }}
                    >

                    </Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ButtonStyles type='submit'>Adicionar produto</ButtonStyles>
            </form>
        </Container >

    )
}

export default NewProduct

